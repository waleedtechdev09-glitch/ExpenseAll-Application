import React from "react";
import Image from "next/image";
import { Manrope, Lato } from "next/font/google";
import Navbar from "@/components/Navbar";
import "@/app/globals.css";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Manage your expenses efficiently with Expense Tracker.",
};

// Load Manrope for Titles/Headings
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"], // Added 500 & 600 weights for precise font styling
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
        {/* Header/Navbar Section */}
        <Navbar />

        {/* Main Content (Hero & Powerful Feature will render here with transparent backgrounds) */}
        <main className="grow relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
