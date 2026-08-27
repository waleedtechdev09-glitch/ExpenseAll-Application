import React from "react";
import Image from "next/image";
import { Manrope, Lato } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import "@/app/globals.css";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "ExpenseAll ",
  description: "Manage your expenses efficiently with ExpenseAll.",
};

// Load Manrope for Titles/Headings
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"], 
  variable: "--font-manrope",
});

// Load Lato for Body/Descriptions
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${lato.variable} overflow-x-hidden`}
    >
      <body className="min-h-screen bg-[#081B3A] text-slate-100 flex flex-col font-sans relative overflow-x-hidden" suppressHydrationWarning>
        <SiteChrome>{children}
          <ToastContainer
    position="top-right"
    autoClose={4000}
    className="mt-16"
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnHover
    draggable
    theme="light"
  />
        </SiteChrome>
      </body>
    </html>
  );
}
