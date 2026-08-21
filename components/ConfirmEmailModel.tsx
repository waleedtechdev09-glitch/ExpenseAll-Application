"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Status = "checking" | "success" | "expired" | "failed";

const ConfirmEmailModel = () => {
  const [status, setStatus] = useState<Status>("checking");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    const checkConfirmation = async () => {
      try {
        console.log("Current URL:", window.location.href);
        console.log("Hash:", window.location.hash);

        /*
         * --------------------------------------------------
         * 1. Check URL for Supabase errors
         * --------------------------------------------------
         */

        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );

        const queryParams = new URLSearchParams(
          window.location.search
        );

        const error =
          hashParams.get("error") ||
          queryParams.get("error");

        const errorCode =
          hashParams.get("error_code") ||
          queryParams.get("error_code");

        const errorDescription =
          hashParams.get("error_description") ||
          queryParams.get("error_description");

        if (error) {
          console.error(
            "Supabase confirmation error:",
            error,
            errorCode,
            errorDescription
          );

          if (!mounted) return;

          setMessage(
            errorDescription ||
              error ||
              "Invalid confirmation link."
          );

          if (errorCode === "otp_expired") {
            setStatus("expired");
          } else {
            setStatus("failed");
          }

          return;
        }

        /*
         * --------------------------------------------------
         * 2. Check whether Supabase already created session
         * --------------------------------------------------
         */

        const {
          data: { session },
        } = await supabase.auth.getSession();

        console.log(
          "Confirmation session:",
          session
        );

        if (session?.user) {
          console.log(
            "Confirmed user:",
            session.user
          );

          if (!mounted) return;

          setStatus("success");

          /*
           * Remove authentication information
           * from the browser URL.
           */
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );

          return;
        }

        /*
         * --------------------------------------------------
         * 3. Listen for auth state change
         * --------------------------------------------------
         */

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(
          (event, session) => {
            console.log(
              "Auth event:",
              event
            );

            console.log(
              "Session:",
              session
            );

            if (!mounted) return;

            if (
              session?.user &&
              (
                event === "SIGNED_IN" ||
                event === "INITIAL_SESSION"
              )
            ) {
              console.log(
                "Email confirmation successful"
              );

              setStatus("success");

              window.history.replaceState(
                {},
                document.title,
                window.location.pathname
              );
            }
          }
        );

        /*
         * --------------------------------------------------
         * 4. Give Supabase a moment to process URL
         * --------------------------------------------------
         */

        setTimeout(async () => {
          if (!mounted) return;

          const {
            data: { session: currentSession },
          } = await supabase.auth.getSession();

          console.log(
            "Session after processing URL:",
            currentSession
          );

          if (currentSession?.user) {
            setStatus("success");

            window.history.replaceState(
              {},
              document.title,
              window.location.pathname
            );
          } else {
            setStatus("failed");
            setMessage(
              "Invalid confirmation link."
            );
          }
        }, 1000);

        return () => {
          subscription.unsubscribe();
        };
      } catch (err) {
        console.error(
          "Confirmation error:",
          err
        );

        if (!mounted) return;

        setStatus("failed");
        setMessage(
          "An unexpected error occurred."
        );
      }
    };

    const cleanup = checkConfirmation();

    return () => {
      mounted = false;

      cleanup.then((unsubscribe) => {
        if (typeof unsubscribe === "function") {
          unsubscribe();
        }
      });
    };
  }, []);

  /*
   * --------------------------------------------------
   * CHECKING
   * --------------------------------------------------
   */

  if (status === "checking") {
    return (
      <div className="min-h-screen bg-[#0E2A5E] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
          <h1 className="text-2xl font-bold text-gray-700">
            Checking confirmation...
          </h1>

          <p className="mt-3 text-gray-500">
            Please wait while we verify your email.
          </p>
        </div>
      </div>
    );
  }

  /*
   * --------------------------------------------------
   * SUCCESS
   * --------------------------------------------------
   */

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
            Your email address has been successfully
            verified. You can now continue using your
            account.
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

  /*
   * --------------------------------------------------
   * EXPIRED
   * --------------------------------------------------
   */

  if (status === "expired") {
    return (
      <div className="min-h-screen bg-[#0E2A5E] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">

          <h1 className="text-2xl font-bold text-gray-700">
            Link Expired
          </h1>

          <p className="mt-3 text-gray-500">
            {message ||
              "This confirmation link has expired. Please request a new one."}
          </p>

        </div>
      </div>
    );
  }

  /*
   * --------------------------------------------------
   * FAILED
   * --------------------------------------------------
   */

  return (
    <div className="min-h-screen bg-[#0E2A5E] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">

        <h1 className="text-2xl font-bold text-gray-700">
          Invalid Access
        </h1>

        <p className="mt-3 text-gray-500">
          {message ||
            "This is not a valid confirmation link."}
        </p>

      </div>
    </div>
  );
};

export default ConfirmEmailModel;