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
        console.log("FULL URL:", window.location.href);
        console.log("HASH:", window.location.hash);

        /*
         * --------------------------------------------------
         * Read tokens from URL hash
         *
         * /reset-password#access_token=...
         * &refresh_token=...
         * &type=recovery
         * --------------------------------------------------
         */

        const hash = window.location.hash;

        if (hash) {
          const hashParams = new URLSearchParams(
            hash.substring(1)
          );

          const accessToken =
            hashParams.get("access_token");

          const refreshToken =
            hashParams.get("refresh_token");

          const type = hashParams.get("type");

          console.log(
            "Has access token:",
            !!accessToken
          );

          console.log(
            "Has refresh token:",
            !!refreshToken
          );

          console.log("Recovery type:", type);

          if (accessToken && refreshToken) {
            /*
             * Explicitly create the session
             */
            const { data, error } =
              await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              });

            if (error) {
              console.error(
                "Failed to create recovery session:",
                error
              );

              if (mounted) {
                setStatus("failed");
                setMessage(
                  "This password reset link is invalid or has expired."
                );
              }

              return;
            }

            console.log(
              "Recovery session created:",
              !!data.session
            );

            if (data.session) {
              if (mounted) {
                setStatus("ready");
              }

              /*
               * Remove tokens from browser URL
               *
               * This changes:
               *
               * /reset-password#access_token=...
               *
               * into:
               *
               * /reset-password
               */
              window.history.replaceState(
                {},
                document.title,
                window.location.pathname
              );

              return;
            }
          }
        }

        /*
         * --------------------------------------------------
         * If there was no hash, check existing session
         * --------------------------------------------------
         */

        const {
          data: { session },
        } = await supabase.auth.getSession();

        console.log(
          "Existing session:",
          !!session
        );

        if (session) {
          if (mounted) {
            setStatus("ready");
          }

          return;
        }

        /*
         * --------------------------------------------------
         * Nothing found
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
          "Recovery initialization error:",
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

    if (password.length < 6) {
      setMessage(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      /*
       * Check recovery session
       */
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log(
        "Session before password update:",
        !!session
      );

      if (!session) {
        setStatus("failed");
        setMessage(
          "Your password reset session has expired. Please request a new reset link."
        );

        return;
      }

      /*
       * Update password
       */
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        console.error(
          "Password update failed:",
          error
        );

        setMessage(error.message);

        return;
      }

      /*
       * Password successfully changed
       */
      setStatus("success");

      setPassword("");
      setConfirmPassword("");

      /*
       * Remove recovery session
       */
      await supabase.auth.signOut();
    } catch (error) {
      console.error(
        "Password reset error:",
        error
      );

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
      <main className="flex min-h-screen items-center justify-center px-4">
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
          <div>
            <label className="mb-1 block text-sm font-medium">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
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