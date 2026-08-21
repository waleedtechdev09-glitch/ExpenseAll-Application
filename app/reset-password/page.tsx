"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const [status, setStatus] = useState<
    "checking" | "ready" | "success" | "failed"
  >("checking");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    let recoveryDetected = false;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth event:", event);
      console.log("Session:", session);

      if (event === "PASSWORD_RECOVERY") {
        recoveryDetected = true;

        if (!session) {
          setStatus("failed");
          setMessage("Invalid or expired reset link.");
          return;
        }

        setStatus("ready");
      }
    });

    // Check if session is already available
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log("Current session:", session);

      if (session && !recoveryDetected) {
        setStatus("ready");
      }
    };

    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleResetPassword = async (
    e: React.FormEvent
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

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.error("Password update failed:", error);

      setStatus("failed");
      setMessage(error.message);
      return;
    }

    setStatus("success");

    // Optional
    await supabase.auth.signOut();
  };

  if (status === "checking") {
    return (
      <div>
        <h1>Checking reset link...</h1>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div>
        <h1>Reset Link Invalid</h1>

        <p>
          {message || "This password reset link is invalid or expired."}
        </p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div>
        <h1>Password Changed!</h1>

        <p>
          Your password has been successfully changed.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Reset Password</h1>

      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">
          Change Password
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}