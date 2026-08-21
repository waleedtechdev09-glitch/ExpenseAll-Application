"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, CheckCircle2, XCircle, Loader2, Check, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Status = "checking" | "ready" | "success" | "failed";

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

// ---- Requirement rules used for the live checklist ----
const requirements = [
  { label: "8-20 characters", test: (v: string) => v.length >= 8 && v.length <= 20 },
  { label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "One lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { label: "One number", test: (v: string) => /[0-9]/.test(v) },
  {
    label: "One special character",
    test: (v: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(v),
  },
];

export default function ResetPasswordPage() {
  const [status, setStatus] = useState<Status>("checking");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    defaultValues: { password: "", confirmPassword: "" },
  });

  const passwordValue = watch("password") || "";

  useEffect(() => {
    let mounted = true;

    const initializeRecovery = async () => {
      try {
        const hash = window.location.hash;

        if (hash) {
          const hashParams = new URLSearchParams(hash.substring(1));

          const accessToken = hashParams.get("access_token");
          const refreshToken = hashParams.get("refresh_token");

          if (accessToken && refreshToken) {
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (error) {
              if (mounted) {
                setStatus("failed");
                setFormError(
                  "This password reset link is invalid or has expired."
                );
              }
              return;
            }

            if (data.session) {
              if (mounted) setStatus("ready");

              window.history.replaceState(
                {},
                document.title,
                window.location.pathname
              );

              return;
            }
          }
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          if (mounted) setStatus("ready");
          return;
        }

        if (mounted) {
          setStatus("failed");
          setFormError("This password reset link is invalid or has expired.");
        }
      } catch (error) {
        console.error("Recovery initialization error:", error);
        if (mounted) {
          setStatus("failed");
          setFormError("Something went wrong while verifying the reset link.");
        }
      }
    };

    initializeRecovery();

    return () => {
      mounted = false;
    };
  }, []);

  const onSubmit = async (values: PasswordFormValues) => {
    setFormError("");
    setLoading(true);

    try {
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

      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) {
        setFormError(error.message);
        return;
      }

      setStatus("success");
      reset();

      await supabase.auth.signOut();
    } catch (error) {
      console.error("Password reset error:", error);
      setFormError("Something went wrong while changing your password.");
    } finally {
      setLoading(false);
    }
  };

  // Shared shell so every state sits inside the same card frame
  const Shell = ({ children }: { children: React.ReactNode }) => (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
        {children}
      </div>
    </main>
  );

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
            {formError || "This password reset link is invalid or has expired."}
          </p>
        </div>
      </Shell>
    );
  }

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
            Your password has been updated. You can now sign in with it.
          </p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <h1 className="text-xl font-semibold text-slate-900">
        Set a new password
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Choose something you haven't used before.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            New password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              disabled={loading}
              {...register("password")}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 pr-10 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Live requirements checklist */}
          <ul className="mt-2 space-y-1">
            {requirements.map((req) => {
              const passed = req.test(passwordValue);
              return (
                <li
                  key={req.label}
                  className={`flex items-center gap-1.5 text-xs ${
                    passed ? "text-green-600" : "text-slate-400"
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

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Confirm password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              disabled={loading}
              {...register("confirmPassword")}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 pr-10 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              tabIndex={-1}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
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

        {(errors.password?.message || formError) && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {errors.password?.message || formError}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Changing password..." : "Change password"}
        </button>
      </form>
    </Shell>
  );
}