"use client";

import React, { useEffect, useState } from "react";

const ConfirmEmailModel = () => {
  const [status, setStatus] = useState("checking");

 useEffect(() => {
  const checkConfirmation = () => {
    const urlParams = new URLSearchParams(window.location.search);

    const error = urlParams.get("error");
    const errorCode = urlParams.get("error_code");
    const code = urlParams.get("code");

    // Supabase error
    if (error) {
      if (errorCode === "otp_expired") {
        setStatus("expired");
      } else {
        setStatus("failed");
      }

      return;
    }

    // Supabase email confirmation
    if (code) {
      setStatus("success");

      // Remove code from URL
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );

      return;
    }

    setStatus("invalid");
  };

  checkConfirmation();
}, []);

  if (status === "checking") {
    return <div>Checking confirmation...</div>;
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#0E2A5E] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">

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
            onClick={() => {
              window.location.href =
                "intent://open#Intent;scheme=expenseall;package=com.elexoft.expenseall.app;end";
            }}
            className="mt-7 w-full rounded-lg bg-[#6C63FE] px-5 py-3 text-sm font-semibold text-white"
          >
            Open App Now
          </button>

        </div>
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div className="min-h-screen bg-[#0E2A5E] flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl text-center">
          <h1 className="text-2xl font-bold text-gray-700">
            Link Expired
          </h1>

          <p className="mt-3 text-gray-500">
            This confirmation link has expired.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E2A5E] flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl text-center">
        <h1 className="text-2xl font-bold text-gray-700">
          Invalid Access
        </h1>
        <p className="mt-3 text-gray-500">
          This is not a valid confirmation link.
        </p>
      </div>
    </div>
  );
};

export default ConfirmEmailModel;