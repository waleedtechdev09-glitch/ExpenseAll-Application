import React from "react";

const ConfirmEmailModel = () => {
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

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-700">
          Email Verified!
        </h1>

        {/* Description */}
        <p className="mt-3 text-md leading-6 text-gray-500">
          Your email address has been successfully verified.
          You can now continue using your account.
        </p>

        {/* Button */}
        <button
          type="button"
          className="mt-7 w-full rounded-lg bg-[#6C63FE] cursor-pointer px-5 py-3 text-sm font-semibold text-white transition hover:bg-bg-[#6C63FE]"
        >
          Open App Now
        </button>
      </div>
    </div>
  );
};

export default ConfirmEmailModel;