
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Loader2,
  Check,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Status = "checking" | "ready" | "success" | "failed";

// How long a reset request stays valid, in milliseconds.
const RESET_WINDOW_MS = 2 * 60 * 1000; // 2 minutes

// ---- Zod schema for password validation ----
const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(20, "Password must not exceed 20 characters.")
      .regex(/[a-z]/, "Password must include one lowercase letter.")
      .regex(/[A-Z]/, "Password must include one uppercase letter.")
      .regex(/[0-9]/, "Password must include one number.")
      .regex(
        /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
        "Password must include one special character."
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

// ---- Password requirement rules ----
const requirements = [
  {
    label: "8-20 characters",
    test: (v: string) => v.length >= 8 && v.length <= 20,
  },
  {
    label: "One uppercase letter",
    test: (v: string) => /[A-Z]/.test(v),
  },
  {
    label: "One lowercase letter",
    test: (v: string) => /[a-z]/.test(v),
  },
  {
    label: "One number",
    test: (v: string) => /[0-9]/.test(v),
  },
  {
    label: "One special character",
    test: (v: string) =>
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(v),
  },
];

// ---- Shell ----
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
        {children}
      </div>
    </main>
  );
}

/**
 * Checks whether the password reset request is still
 * inside the configured 2-minute window.
 */
async function checkResetRequestWindow(
  email: string
): Promise<{ valid: boolean; reason?: string }> {
  const { data, error } = await supabase
    .from("password_reset_requests")
    .select("last_sent_at")
    .eq("email", email)
    .maybeSingle();

  console.log("checkResetRequestWindow data:", data, "error:", error);

  if (error) {
    console.error(
      "password_reset_requests lookup error:",
      error
    );

    return {
      valid: false,
      reason:
        "Something went wrong while verifying your reset request.",
    };
  }

  if (!data) {
    return {
      valid: false,
      reason:
        "This password reset link is invalid or has expired.",
    };
  }

  const lastSentAt = new Date(data.last_sent_at).getTime();
  const elapsed = Date.now() - lastSentAt;

  console.log(
    `Reset request for ${email} was sent at ${data.last_sent_at} (${lastSentAt}), elapsed: ${elapsed} ms`
  );

  if (elapsed > RESET_WINDOW_MS) {
    return {
      valid: false,
      reason:
        "This password reset link has expired. Please request a new one.",
    };
  }

  return { valid: true };
}

/**
 * Revokes all registered devices for the user after
 * a successful password reset.
 */
async function revokeUserDevices(userId: string) {
  const { error } = await supabase
    .from("user_devices")
    .update({
      status: "revoked",
      revoked_at: new Date().toISOString(),
      revoked_reason: "password_reset",
    })
    .eq("user_id", userId);

  if (error) {
    console.error(
      "Failed to revoke user devices:",
      error
    );

    return {
      success: false,
      error,
    };
  }

  console.log(
    "All user devices revoked successfully for User ID:",
    userId
  );

  return {
    success: true,
  };
}

export default function ResetPasswordPage() {
  const [status, setStatus] = useState<Status>("checking");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password") || "";

  // =============================================================
  // INITIALIZE PASSWORD RECOVERY
  // =============================================================
  useEffect(() => {
    let mounted = true;

    const initializeRecovery = async () => {
      try {
        const hash = window.location.hash;

        // =========================================================
        // RESET LINK CONTAINS ACCESS TOKEN + REFRESH TOKEN
        // =========================================================
        if (hash) {
          const hashParams = new URLSearchParams(
            hash.substring(1)
          );

          const accessToken =
            hashParams.get("access_token");

          const refreshToken =
            hashParams.get("refresh_token");

          if (accessToken && refreshToken) {
            const { data, error } =
              await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              });

            if (error) {
              console.error(
                "Supabase setSession error:",
                error
              );

              if (mounted) {
                setStatus("failed");
                setFormError(
                  "This password reset link is invalid or has expired."
                );
              }

              return;
            }

            if (data.session) {
              // =================================================
              // GET USER ID + EMAIL
              // =================================================
              const userId = data.session.user.id;
              const email = data.session.user.email;

              console.log(
                "================================="
              );
              console.log(
                "PASSWORD RESET RECOVERY SESSION"
              );
              console.log("User ID:", userId);
              console.log("Email:", email);
              console.log(
                "================================="
              );

              // Remove tokens from URL
              window.history.replaceState(
                {},
                document.title,
                window.location.pathname
              );

              if (!email) {
                if (mounted) {
                  setStatus("failed");
                  setFormError(
                    "This password reset link is invalid or has expired."
                  );
                }

                return;
              }

              // =================================================
              // CHECK 2-MINUTE RESET WINDOW
              // =================================================
              const windowCheck =
                await checkResetRequestWindow(email);

              if (!windowCheck.valid) {
                if (mounted) {
                  setStatus("failed");
                  setFormError(
                    windowCheck.reason ||
                      "This password reset link has expired."
                  );
                }

                await supabase.auth.signOut();

                return;
              }

              if (mounted) {
                setStatus("ready");
              }

              return;
            }
          }

          // Tokens missing
          if (mounted) {
            setStatus("failed");
            setFormError(
              "This password reset link is invalid or has expired."
            );
          }

          return;
        }

        // =========================================================
        // NO HASH - CHECK EXISTING SESSION
        // =========================================================
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          const userId = session.user.id;
          const email = session.user.email;

          console.log(
            "================================="
          );
          console.log(
            "EXISTING PASSWORD RESET SESSION"
          );
          console.log("User ID:", userId);
          console.log("Email:", email);
          console.log(
            "================================="
          );

          if (!email) {
            if (mounted) {
              setStatus("failed");
              setFormError(
                "This password reset link is invalid or has expired."
              );
            }

            return;
          }

          // =======================================================
          // CHECK 2-MINUTE RESET WINDOW
          // =======================================================
          const windowCheck =
            await checkResetRequestWindow(email);

          if (!windowCheck.valid) {
            if (mounted) {
              setStatus("failed");
              setFormError(
                windowCheck.reason ||
                  "This password reset link has expired."
              );
            }

            await supabase.auth.signOut();

            return;
          }

          if (mounted) {
            setStatus("ready");
          }

          return;
        }

        // No session
        if (mounted) {
          setStatus("failed");
          setFormError(
            "This password reset link is invalid or has expired."
          );
        }
      } catch (error) {
        console.error(
          "Recovery initialization error:",
          error
        );

        if (mounted) {
          setStatus("failed");
          setFormError(
            "Something went wrong while verifying the reset link."
          );
        }
      }
    };

    initializeRecovery();

    return () => {
      mounted = false;
    };
  }, []);

  // =============================================================
  // CHANGE PASSWORD
  // =============================================================
  const onSubmit = async (
    values: PasswordFormValues
  ) => {
    setFormError("");
    setLoading(true);

    try {
      // =========================================================
      // GET CURRENT RECOVERY SESSION
      // =========================================================
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setStatus("failed");

        setFormError(
          "Your password reset session has expired. Please request a new reset link."
        );

        return;
      }

      // =========================================================
      // GET USER ID + EMAIL
      // =========================================================
      const userId = session.user.id;
      const email = session.user.email;

      console.log(
        "================================="
      );
      console.log("CHANGING PASSWORD");
      console.log("User ID:", userId);
      console.log("Email:", email);
      console.log(
        "================================="
      );

      // =========================================================
      // RE-CHECK 2-MINUTE RESET WINDOW
      // =========================================================
      if (email) {
        const windowCheck =
          await checkResetRequestWindow(email);

        if (!windowCheck.valid) {
          setStatus("failed");

          setFormError(
            windowCheck.reason ||
              "This password reset link has expired."
          );

          await supabase.auth.signOut();

          return;
        }
      }

      // =========================================================
      // UPDATE PASSWORD
      // =========================================================
      const { error: passwordError } =
        await supabase.auth.updateUser({
          password: values.password,
        });

      if (passwordError) {
        console.error(
          "Password update error:",
          passwordError
        );

        setFormError(passwordError.message);

        return;
      }

      console.log(
        "Password successfully changed for User ID:",
        userId
      );

      // =========================================================
      // REVOKE ALL USER DEVICES
      // =========================================================
      const revokeResult =
        await revokeUserDevices(userId);

      if (!revokeResult.success) {
        console.error(
          "Password changed, but device revocation failed."
        );

        // Password has already been changed.
        // We don't show password update as failed.
        // We just log the device revocation issue.
      }

      // =========================================================
      // SUCCESS
      // =========================================================
      setStatus("success");

      reset();

      // Logout recovery session
      await supabase.auth.signOut();
    } catch (error) {
      console.error(
        "Password reset error:",
        error
      );

      setFormError(
        "Something went wrong while changing your password."
      );
    } finally {
      setLoading(false);
    }
  };

  // =============================================================
  // CHECKING
  // =============================================================
  if (status === "checking") {
    return (
      <Shell>
        <div className="flex flex-col items-center py-6 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />

          <h1 className="mt-4 text-xl font-semibold text-slate-900">
            Checking your link
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Give us a second while we verify it.
          </p>
        </div>
      </Shell>
    );
  }

  // =============================================================
  // FAILED
  // =============================================================
  if (status === "failed") {
    return (
      <Shell>
        <div className="flex flex-col items-center py-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <XCircle className="h-6 w-6 text-red-500" />
          </div>

          <h1 className="mt-4 text-xl font-semibold text-slate-900">
            Link invalid or expired
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {formError ||
              "This password reset link is invalid or has expired."}
          </p>
        </div>
      </Shell>
    );
  }

  // =============================================================
  // SUCCESS
  // =============================================================
  if (status === "success") {
    return (
      <Shell>
        <div className="flex flex-col items-center py-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          </div>

          <h1 className="mt-4 text-xl font-semibold text-slate-900">
            Password changed
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Your password has been updated. You can now sign in
            with it.
          </p>
        </div>
      </Shell>
    );
  }

  // =============================================================
  // READY - PASSWORD FORM
  // =============================================================
  return (
    <Shell>
      <h1 className="text-xl font-semibold text-slate-900">
        Set a new password
      </h1>

      <p className="mt-1 text-sm text-slate-500">
        Choose something you haven't used before.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-4"
      >
        {/* ===================================================== */}
        {/* NEW PASSWORD */}
        {/* ===================================================== */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            New password
          </label>

          <div className="relative">
            <input
              type={
                showPassword ? "text" : "password"
              }
              placeholder="Enter new password"
              disabled={loading}
              {...register("password")}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 pr-10 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900 disabled:opacity-50"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((v) => !v)
              }
              tabIndex={-1}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* LIVE PASSWORD REQUIREMENTS */}
          <ul className="mt-2 space-y-1">
            {requirements.map((req) => {
              const passed =
                req.test(passwordValue);

              return (
                <li
                  key={req.label}
                  className={`flex items-center gap-1.5 text-xs ${
                    passed
                      ? "text-green-600"
                      : "text-slate-400"
                  }`}
                >
                  {passed ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <X className="h-3.5 w-3.5" />
                  )}

                  {req.label}
                </li>
              );
            })}
          </ul>
        </div>

        {/* ===================================================== */}
        {/* CONFIRM PASSWORD */}
        {/* ===================================================== */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Confirm password
          </label>

          <div className="relative">
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm new password"
              disabled={loading}
              {...register("confirmPassword")}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 pr-10 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900 disabled:opacity-50"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword((v) => !v)
              }
              tabIndex={-1}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
              aria-label={
                showConfirmPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* ===================================================== */}
        {/* ERROR */}
        {/* ===================================================== */}
        {(errors.password?.message ||
          formError) && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {errors.password?.message ||
              formError}
          </p>
        )}

        {/* ===================================================== */}
        {/* SUBMIT */}
        {/* ===================================================== */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}

          {loading
            ? "Changing password..."
            : "Change password"}
        </button>
      </form>
    </Shell>
  );
}

