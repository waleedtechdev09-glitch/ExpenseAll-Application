"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Status = "checking" | "ready" | "success" | "failed";

export default function ResetPasswordPage() {
  const [status, setStatus] = useState<Status>("checking");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
                setMessage(
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
          setMessage("This password reset link is invalid or has expired.");
        }
      } catch (error) {
        console.error("Recovery initialization error:", error);
        if (mounted) {
          setStatus("failed");
          setMessage("Something went wrong while verifying the reset link.");
        }
      }
    };

    initializeRecovery();

    return () => {
      mounted = false;
    };
  }, []);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setStatus("failed");
        setMessage(
          "Your password reset session has expired. Please request a new reset link."
        );
        return;
      }

      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setMessage(error.message);
        return;
      }

      setStatus("success");
      setPassword("");
      setConfirmPassword("");

      await supabase.auth.signOut();
    } catch (error) {
      console.error("Password reset error:", error);
      setMessage("Something went wrong while changing your password.");
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
            {message || "This password reset link is invalid or has expired."}
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

      <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            New password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              disabled={loading}
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
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Confirm password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={6}
              required
              disabled={loading}
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
        </div>

        {message && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {message}
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