"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { RefreshCw, Tags, Wallet } from "lucide-react";

const FEATURES = [
  {
    iconSrc: "/assets/record-income-icon.svg",
    icon: Wallet,
    heading: "View Your Balance",
    description:
      "See your total income, total expenses and available balance together.",
  },
  {
    iconSrc: "/assets/record-expense-icon.svg",
    icon: Tags,
    heading: "Review Spending Categories",
    description:
      "Check the areas where you spend money. Compare everyday costs such as groceries, transport, shopping and bills.",
  },
  {
    iconSrc: "/assets/review-icon.svg",
    icon: RefreshCw,
    heading: "Check Monthly Reports",
    description:
      "Review your spending over a selected period. Use the information to understand your habits and plan the next month.",
  },
];

const ExpenseReport = () => {
  return (
    <section
      id="expense-reports"
      className="relative w-full text-white px-6 md:px-16 lg:px-24 py-16 md:py-20"
    >
      {/* Soft glow behind the phone */}
      <div className="hidden md:block absolute right-[-5%] top-1/2 -translate-y-1/2 w-[420px] h-[420px] lg:w-[520px] lg:h-[520px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* ==================== TEXT ==================== */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left">
          <h2 className="font-manrope text-4xl md:text-[38px] lg:text-[40px] xl:text-[42px] font-normal tracking-tight leading-[1.15] mb-5">
            <span className="whitespace-nowrap">Understand Your Spending with</span>{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-bold">
              Expense Reports
            </span>
          </h2>

          <p className="font-lato text-white/90 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mb-10">
            Saving transactions is useful. Understanding what those transactions mean is even more helpful.
            ExpenseAll provides a financial dashboard and{" "}
            <span className="font-semibold text-white">Expense Reports</span> to help you review your
            spending.
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
          className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end lg:-translate-x-32 xl:-translate-x-40"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative w-[210px] h-[430px] sm:w-[240px] sm:h-[490px] lg:w-[270px] lg:h-[550px] transition-transform duration-500 ease-out hover:scale-[1.02]">
            {/* Glow behind the phone, same treatment as the hero */}
            <div
              className="hidden md:block absolute right-0 top-0 translate-x-1/4 translate-y-0 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full blur-[110px] opacity-30 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, #4FD1FF 0%, #6C63FE 100%)",
              }}
            />
            <Image
              src="/assets/expense-report.svg"
              alt="ExpenseAll expense reports screen"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 210px, (max-width: 1024px) 240px, 270px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpenseReport;
