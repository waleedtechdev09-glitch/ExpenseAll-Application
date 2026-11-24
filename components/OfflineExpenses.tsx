"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Feature = {
  iconSrc: string;
  heading: string;
  description: string;
};

const OFFLINE_FEATURES: Feature[] = [
  {
    iconSrc: "/assets/expense-offline-icon.svg",
    heading: "Add Expenses Offline",
    description:
      "Record purchases even when your phone is not connected to the internet. Keep track of spending during travel or in the event of network problems.",
  },
  {
    iconSrc: "/assets/review-record-icon.svg",
    heading: "Review Your Records",
    description:
      "Access supported expense management features while offline. Continue recording daily transactions when a connection is unavailable.",
  },
  {
    iconSrc: "/assets/sync-icon.svg",
    heading: "Sync When Connected",
    description:
      "When your internet connection returns, supported changes can sync with your cloud records.",
  },
];

const FeatureList = ({ features }: { features: Feature[] }) => (
  <div className="flex flex-col gap-7 w-full max-w-xl">
    {features.map(({ iconSrc, heading, description }) => (
      <div key={heading} className="flex items-start gap-4">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center">
          <Image src={iconSrc} alt="" width={22} height={22} />
        </div>
        <div className="flex flex-col">
          <h3 className="font-manrope text-lg md:text-xl font-semibold text-white mb-1">
            {heading}
          </h3>
          <p className="font-lato italic text-slate-300 text-sm md:text-[15px] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    ))}
  </div>
);

const OfflineExpenses = () => {
  return (
    <section
      id="offline-expenses"
      className="relative w-full text-white px-6 md:px-16 lg:px-24 py-16 md:py-20"
    >
      {/* Decorative iridescent side graphic */}
      <div className="hidden lg:block absolute left-[-2%] top-[12%] -translate-y-1/2 w-[161px] h-[392px] pointer-events-none select-none opacity-90">
        <Image
          src="/assets/offline-side.svg"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* ==================== PHONE ==================== */}
        <motion.div
          className="lg:col-span-5 xl:col-span-6 flex justify-center lg:justify-start lg:translate-x-24 xl:translate-x-32 order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative w-[210px] h-[430px] sm:w-[240px] sm:h-[490px] lg:w-[270px] lg:h-[550px] transition-transform duration-500 ease-out hover:scale-[1.02]">
            {/* Glow behind the phone, same treatment as the hero */}
            <div
              className="hidden md:block absolute right-0 top-0 -translate-x-1/4 -translate-y-1/2 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full blur-[110px] opacity-30 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, #4FD1FF 0%, #6C63FE 100%)",
              }}
            />
            <Image
              src="/assets/offline-phone.svg"
              alt="ExpenseAll offline expense tracking screen"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 210px, (max-width: 1024px) 240px, 270px"
            />
          </div>
        </motion.div>

        {/* ==================== TEXT ==================== */}
        <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start text-left order-1 lg:order-2">
          <h2 className="font-manrope text-4xl md:text-[42px] lg:text-[46px] font-normal tracking-tight leading-[1.15] mb-5">
            Record Expenses{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-bold">
              Offline
            </span>
          </h2>

          <p className="font-lato text-white/90 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mb-10">
            You may not always have a working internet connection. That should not stop you from writing
            down a purchase. ExpenseAll supports{" "}
            <span className="font-semibold text-white">Offline Expense Tracking</span> for regular expense
            management.
          </p>

          <FeatureList features={OFFLINE_FEATURES} />
        </div>
      </div>
    </section>
  );
};

export default OfflineExpenses;
