"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeftRight, Receipt, Wallet } from "lucide-react";

const FEATURES = [
  {
    iconSrc: "/assets/record-income-icon.svg",
    icon: Wallet,
    heading: "Record Your Income",
    description:
      "Add salary payments or other money you receive. Keep your income records together with your regular expense entries.",
  },
  {
    iconSrc: "/assets/record-expense-icon.svg",
    icon: Receipt,
    heading: "Record Your Expenses",
    description:
      'Simply say, "Spent Rs. 500 on groceries today." The app understands your command, extracts the details, and prepares the transaction for confirmation.',
  },
  {
    iconSrc: "/assets/review-icon.svg",
    icon: ArrowLeftRight,
    heading: "Review Your Transfers",
    description:
      "See recorded transfers alongside your other transactions. Keep track of money movement without confusing it with everyday spending.",
  },
];

const DailyIncome = () => {
  return (
    <section
      id="daily-income"
      className="relative w-full text-white px-6 md:px-16 lg:px-24 py-16 md:py-20"
    >
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* ==================== TEXT ==================== */}
        <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start text-left">
          <h2 className="font-manrope text-4xl md:text-[42px] lg:text-[46px] font-normal tracking-tight leading-[1.15] mb-5">
            Track Daily{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-bold">
              Income
            </span>{" "}
            and{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-bold">
              Expenses
            </span>{" "}
            in One Place
          </h2>

          <p className="font-lato text-white/90 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mb-10">
            <span className="font-semibold text-white">ExpenseAll</span> works as an{" "}
            <span className="font-semibold text-white">Income and Expense Tracker</span>{" "}
            so you can review both sides of your everyday finances.
          </p>

          <div className="flex flex-col gap-7 w-full max-w-xl">
            {FEATURES.map(({ iconSrc, icon: Icon, heading, description }) => (
              <div key={heading} className="flex items-start gap-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center">
                  {iconSrc ? (
                    <Image src={iconSrc} alt="" width={22} height={22} />
                  ) : (
                    <Icon size={20} className="text-cyan-400" />
                  )}
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
        </div>

        {/* ==================== PHONE MOCKUP ==================== */}
        <motion.div
          className="lg:col-span-5 xl:col-span-6 flex justify-center lg:justify-end lg:-translate-x-56 xl:-translate-x-64"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative w-[200px] h-[410px] sm:w-[225px] sm:h-[460px] lg:w-[250px] lg:h-[510px] transition-transform duration-500 ease-out hover:scale-[1.02]">
            {/* Glow behind the phone, same treatment as the hero */}
            <div
              className="hidden md:block absolute right-0 top-0 translate-x-1/2 -translate-y-1/4 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full blur-[110px] opacity-30 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, #4FD1FF 0%, #6C63FE 100%)",
              }}
            />
            <Image
              src="/assets/daily-income.svg"
              alt="ExpenseAll app showing income and expense transactions"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 200px, (max-width: 1024px) 225px, 250px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DailyIncome;
