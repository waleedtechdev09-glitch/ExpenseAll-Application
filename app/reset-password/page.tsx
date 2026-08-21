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
      /*
       * Listen for password recovery event
       */
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(
        (event, session) => {
          console.log("Auth event:", event);
          console.log("Session:", session);

          if (!mounted) return;

          if (event === "PASSWORD_RECOVERY") {
            if (session) {
              setStatus("ready");
            } else {
              setStatus("failed");
              setMessage(
                "This password reset link is invalid or has expired."
              );
            }
          }
        }
      );

      /*
       * Wait a little for Supabase to process
       * the URL fragment.
       */
      setTimeout(async () => {
        if (!mounted) return;

        const {
          data: { session },
        } = await supabase.auth.getSession();

        console.log("Recovery session:", session);

        if (!mounted) return;

        if (session) {
          setStatus("ready");
        } else {
          setStatus("failed");
          setMessage(
            "This password reset link is invalid or has expired."
          );
        }
      }, 500);

      return subscription;
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

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      /*
       * Verify recovery session
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
       * Change password
       */
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        console.error("Password update failed:", error);

        setMessage(error.message);
        return;
      }

      /*
       * Success
       */
      setStatus("success");

      setPassword("");
      setConfirmPassword("");

      /*
       * Remove recovery session
       */
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Password reset failed:", error);

      setMessage(
        "Something went wrong while changing your password."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * Checking
   */
  if (status === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">
            Checking reset link...
          </h1>

          <p className="mt-2 text-gray-500">
            Please wait while we verify your reset link.
          </p>
        </div>
      </main>
    );
  }

  /*
   * Failed
   */
  if (status === "failed") {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-lg border p-6 text-center">
          <h1 className="text-2xl font-semibold text-red-600">
            Reset Link Invalid
          </h1>

          <p className="mt-3 text-gray-600">
            {message}
          </p>
        </div>
      </main>
    );
  }

  /*
   * Success
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
   * Ready
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
          <div>
            <label className="mb-1 block text-sm font-medium">
              New Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              minLength={6}
              required
              disabled={loading}
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm new password"
              minLength={6}
              required
              disabled={loading}
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          {message && (
            <p className="text-sm text-red-600">
              {message}
            </p>
          )}

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