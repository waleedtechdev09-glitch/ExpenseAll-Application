"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
type Feature = {
  iconSrc: string;
  heading: string;
  description: string;
};

const BUDGET_FEATURES: Feature[] = [
  {
    iconSrc: "/assets/spending-icon.svg",
    heading: "Set Your Spending Budget",
    description:
      "Create a budget for a week or month. Choose an amount that makes sense for your income and regular expenses.",
  },
  {
    iconSrc: "/assets/progress-icon.svg",
    heading: "Follow Your Budget Progress",
    description:
      "Check how much of your planned budget you have used. See how your recorded purchases affect the amount left.",
  },
  {
    iconSrc: "/assets/spending-habits.svg",
    heading: "Review Your Spending Habits",
    description:
      "Look at your spending over time. Find categories where you may need to make changes in the next budget.",
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

const BudgetPlanning = () => {
  return (
    <section
      id="budget-planning"
      className="relative w-full text-white px-6 md:px-16 lg:px-24 py-16 md:py-20"
    >
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start text-left">
          <h2 className="font-manrope text-4xl md:text-[42px] lg:text-[46px] font-normal tracking-tight leading-[1.15] mb-5">
            Plan Weekly and Monthly{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-bold">
              Budgets
            </span>
          </h2>

          <p className="font-lato text-white/90 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mb-10">
            Tracking expenses shows where your money went. A budget helps you decide how much you want to
            spend before the month is over. ExpenseAll combines expense records with{" "}
            <span className="font-semibold text-white">Budget Planning</span> so you can follow your
            spending more easily.
          </p>

          <FeatureList features={BUDGET_FEATURES} />
        </div>

        <motion.div
          className="lg:col-span-5 xl:col-span-6 flex justify-center lg:justify-end lg:-translate-x-32 xl:-translate-x-40"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative w-[210px] h-[430px] sm:w-[240px] sm:h-[490px] lg:w-[270px] lg:h-[550px] transition-transform duration-500 ease-out hover:scale-[1.02]">
            {/* Glow behind the phone, same treatment as the hero */}
            <div
              className="hidden md:block absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full blur-[110px] opacity-30 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, #4FD1FF 0%, #6C63FE 100%)",
              }}
            />
            <Image
              src="/assets/budget.svg"
              alt="ExpenseAll budget planning screen"
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

export default BudgetPlanning;
