"use client";

import React, { useEffect, useState } from "react";

const ConfirmEmailModel = () => {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const checkConfirmation = () => {
      // Supabase error parameters
      const urlParams = new URLSearchParams(window.location.search);

      const error = urlParams.get("error");
      const errorCode = urlParams.get("error_code");

      // Expired / invalid Supabase link
      if (error) {
        if (errorCode === "otp_expired") {
          setStatus("expired");
        } else {
          setStatus("failed");
        }

        return;
      }

      // Supabase success parameters
      const hashParams = new URLSearchParams(
        window.location.hash.substring(1)
      );

      const accessToken = hashParams.get("access_token");
      const type = hashParams.get("type");

      // Valid email confirmation
      if (accessToken && type === "signup") {
        setStatus("success");

        // Remove token from browser URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );

        return;
      }

      // Someone opened page directly
      setStatus("invalid");
    };

    checkConfirmation();
  }, []);

  // Checking
  if (status === "checking") {
    return (
      <div className="min-h-screen bg-[#0E2A5E] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
          <p className="text-gray-500">
            Checking confirmation status...
          </p>
        </div>
      </div>
    );
  }

  // SUCCESS
  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#0E2A5E] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">

          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-700">
            Email Verified!
          </h1>

          <p className="mt-3 text-md leading-6 text-gray-500">
            Your email address has been successfully verified.
            You can now continue using your account.
          </p>

          <button
            type="button"
            className="mt-7 w-full rounded-lg bg-[#6C63FE] cursor-pointer px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Open App Now
          </button>
        </div>
      </div>
    );
  }

  // EXPIRED
  if (status === "expired") {
    return (
      <div className="min-h-screen bg-[#0E2A5E] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">

          <h1 className="text-2xl font-bold text-gray-700">
            Link Expired
          </h1>

          <p className="mt-3 text-md leading-6 text-gray-500">
            This confirmation link has expired.
            Please request a new confirmation email.
          </p>

        </div>
      </div>
    );
  }

  // INVALID / DIRECT ACCESS
  return (
    <div className="min-h-screen bg-[#0E2A5E] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500">
            <span className="text-2xl font-bold text-white">
              !
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-700">
          Invalid Access
        </h1>

        <p className="mt-3 text-md leading-6 text-gray-500">
          This page can only be accessed through a valid
          email confirmation link.
        </p>

      </div>
    </div>
  );
};

export default ConfirmEmailModel;