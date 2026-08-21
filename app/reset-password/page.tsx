"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Status = "checking" | "ready" | "success" | "failed";

export default function ResetPasswordPage() {
  const [status, setStatus] = useState<Status>("checking");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initializeRecovery = async () => {
      try {
        // Get ?code=... from URL
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        console.log("Reset code:", code);

        /*
         * --------------------------------------------------
         * CASE 1:
         * Supabase redirected with ?code=...
         * --------------------------------------------------
         */
        if (code) {
          const { data, error } =
            await supabase.auth.exchangeCodeForSession(code);

          if (error) {
            console.error("Code exchange failed:", error);

            if (mounted) {
              setStatus("failed");
              setMessage(
                "This password reset link is invalid or has expired."
              );
            }

            return;
          }

          console.log("Recovery session:", data.session);

          if (!data.session) {
            if (mounted) {
              setStatus("failed");
              setMessage(
                "Unable to create a password reset session."
              );
            }

            return;
          }

          if (mounted) {
            setStatus("ready");
          }

          return;
        }

        /*
         * --------------------------------------------------
         * CASE 2:
         * Maybe Supabase already created a session
         * --------------------------------------------------
         */
        const {
          data: { session },
        } = await supabase.auth.getSession();

        console.log("Existing session:", session);

        if (session) {
          if (mounted) {
            setStatus("ready");
          }

          return;
        }

        /*
         * --------------------------------------------------
         * No code + no session
         * --------------------------------------------------
         */
        if (mounted) {
          setStatus("failed");
          setMessage(
            "This password reset link is invalid or has expired."
          );
        }
      } catch (error) {
        console.error(
          "Password recovery initialization failed:",
          error
        );

        if (mounted) {
          setStatus("failed");
          setMessage(
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

  const handleResetPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setMessage("");

    // Validate password
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    // Validate confirmation
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      /*
       * Make sure the recovery session still exists
       */
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setStatus("failed");
        setMessage(
          "Your reset session has expired. Please request a new reset link."
        );

        return;
      }

      /*
       * Update password
       */
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        console.error("Password update failed:", error);

        setMessage(error.message);
        setStatus("failed");

        return;
      }

      /*
       * Password successfully changed
       */
      setStatus("success");
      setMessage("Your password has been successfully changed.");

      setPassword("");
      setConfirmPassword("");

      /*
       * Sign out after password reset.
       * This prevents the recovery session from
       * remaining active in the browser.
       */
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Password reset failed:", error);

      setStatus("failed");
      setMessage(
        "Something went wrong while changing your password."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * --------------------------------------------------
   * CHECKING
   * --------------------------------------------------
   */
  if (status === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">
            Checking reset link...
          </h1>

          <p className="mt-2 text-gray-500">
            Please wait while we verify your password reset link.
          </p>
        </div>
      </main>
    );
  }

  /*
   * --------------------------------------------------
   * FAILED
   * --------------------------------------------------
   */
  if (status === "failed") {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-lg border p-6 text-center">
          <h1 className="text-2xl font-semibold text-red-600">
            Reset Link Invalid
          </h1>

          <p className="mt-3 text-gray-600">
            {message ||
              "This password reset link is invalid or has expired."}
          </p>
        </div>
      </main>
    );
  }

  /*
   * --------------------------------------------------
   * SUCCESS
   * --------------------------------------------------
   */
  if (status === "success") {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-lg border p-6 text-center">
          <h1 className="text-2xl font-semibold text-green-600">
            Password Changed!
          </h1>

          <p className="mt-3 text-gray-600">
            Your password has been successfully changed.
          </p>
        </div>
      </main>
    );
  }

  /*
   * --------------------------------------------------
   * READY
   * --------------------------------------------------
   */
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border p-6">
        <h1 className="text-2xl font-semibold">
          Reset Password
        </h1>

        <p className="mt-2 text-gray-500">
          Enter your new password below.
        </p>

        <form
          onSubmit={handleResetPassword}
          className="mt-6 space-y-4"
        >
          {/* New password */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              disabled={loading}
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          {/* Confirm password */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              minLength={6}
              required
              disabled={loading}
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          {/* Message */}
          {message && (
            <p className="text-sm text-red-600">
              {message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {loading
              ? "Changing Password..."
              : "Change Password"}
          </button>
        </form>
      </div>
    </main>
  );
}