"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AudioLines, ScanLine } from "lucide-react";

const data = {
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.elexoft.expenseall.app",
  playStoreBadge: "/assets/playStore.png",
  appStoreUrl: "#",
  appStoreBadge: "/assets/apple.png",
};

const SCANNER_STEPS = [
  {
    title: "Capture Your Receipt",
    description:
      "Open the receipt scanner and take a clear picture. You can also select a receipt image from your phone.",
  },
  {
    title: "Check the Details",
    description:
      "The app processes the image to identify information such as the store name, amount, date and expense category.",
  },
  {
    title: "Save Your Expense",
    description:
      "Check the suggested information before saving it. Review any details that need correction to keep your records correct.",
  },
];

const VOICE_STEPS = [
  {
    title: "Say What You Spent",
    description:
      'For example, say "Spent 500 rupees on groceries today." The app processes your voice and prepares the expense information.',
  },
  {
    title: "Check the Expense Details",
    description:
      "Review the suggested amount and category. Make sure the information matches what you said before saving it.",
  },
  {
    title: "Save Your Transaction",
    description:
      "Confirm the expense and keep it with your other financial records. You can return to it later through your transaction history.",
  },
];

const StoreBadges = () => (
  <div className="flex flex-row flex-nowrap items-center gap-3 mt-8">
    {/* Google Play */}
    <a
      href={data.playStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 sm:gap-3 w-[150px] sm:w-[160px] h-[44px] sm:h-[48px] px-2 sm:px-3 bg-black cursor-pointer border border-white rounded-lg hover:bg-neutral-900 transition-all duration-200 hover:scale-[1.03] select-none"
    >
      <div className="relative w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 shrink-0">
        <Image src={data.playStoreBadge} alt="Google Play" fill className="object-contain" />
      </div>
      <div className="flex flex-col items-start leading-none min-w-0">
        <span className="text-[7px] sm:text-[8px] uppercase tracking-wider font-medium text-white">
          Get it on
        </span>
        <span className="text-[10px] sm:text-[12px] md:text-[16px] font-medium font-manrope text-white mt-[2px] truncate">
          Google Play
        </span>
      </div>
    </a>

    {/* App Store */}
    <div className="flex items-center justify-center gap-2 sm:gap-3 w-[150px] sm:w-[160px] h-[44px] sm:h-[48px] px-2 sm:px-3 bg-black cursor-pointer border border-white rounded-lg hover:bg-neutral-900 transition-all duration-200 hover:scale-[1.03] select-none">
      <div className="relative w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 shrink-0">
        <Image src={data.appStoreBadge} alt="App Store" fill className="object-contain" />
      </div>
      <div className="flex flex-col items-start leading-none min-w-0">
        <span className="text-[7px] sm:text-[8px] tracking-wider font-medium text-white">
          Download on the
        </span>
        <span className="text-[10px] sm:text-[12px] md:text-[16px] font-medium font-manrope text-white mt-[2px] truncate">
          App Store
        </span>
      </div>
    </div>
  </div>
);

const StepList = ({ steps }: { steps: { title: string; description: string }[] }) => (
  <ul className="mt-6 flex flex-col gap-5 list-disc pl-5 marker:text-cyan-400">
    {steps.map((step) => (
      <li key={step.title} className="pl-1">
        <h4 className="font-manrope text-base md:text-lg font-semibold italic text-white mb-1">
          {step.title}
        </h4>
        <p className="font-lato italic text-slate-300 text-sm md:text-[15px] leading-relaxed">
          {step.description}
        </p>
      </li>
    ))}
  </ul>
);

const AiPoweredFeature = () => {
  return (
    <section
      id="ai-features"
      className="relative w-full text-white py-14 md:py-20 px-6 md:px-16 lg:px-24"
    >
      {/* Decorative fluid shape, top right (same asset as before) */}
      <div className="hidden lg:block absolute -right-[12%] -top-[4%] w-[420px] h-[420px] pointer-events-none select-none z-0 opacity-90 mix-blend-screen">
        <Image
          src="/assets/fluid.png"
          alt=""
          width={420}
          height={442}
          className="object-contain"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* ==================== HEADER ==================== */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="font-manrope text-3xl sm:text-4xl md:text-[40px] font-normal tracking-tight leading-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-bold">
              Scan Receipts
            </span>{" "}
            and{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-bold">
              Record Expenses
            </span>{" "}
            with AI
          </h2>
          <p className="font-lato text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
            Let AI simplify expense tracking by instantly processing receipts and voice entries.
          </p>
        </div>

        {/* ==================== ROW 1: AI RECEIPT SCANNER ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="flex items-center gap-3">
              <ScanLine size={22} className="text-cyan-400" />
              <h3 className="font-manrope text-xl md:text-2xl font-semibold text-white">
                AI <span className="text-cyan-400">Receipt Scanner</span>
              </h3>
            </div>
            <p className="font-lato italic text-slate-300 text-sm md:text-[15px] leading-relaxed mt-4 max-w-lg">
              ExpenseAll includes an AI Receipt Scanner that helps turn a receipt image into an expense record.
            </p>
            <StepList steps={SCANNER_STEPS} />
            <StoreBadges />
          </div>

          <motion.div
            className="lg:col-span-6 flex justify-center lg:justify-end lg:-translate-x-32 xl:-translate-x-40"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-[220px] h-[450px] sm:w-[250px] sm:h-[510px] lg:w-[270px] lg:h-[550px] transition-transform duration-500 ease-out hover:scale-[1.02]">
              {/* Glow behind the phone, same treatment as the hero */}
              <div
                className="hidden md:block absolute right-0 top-0 translate-x-3/4 -translate-y-1/2 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full blur-[110px] opacity-30 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, #4FD1FF 0%, #6C63FE 100%)",
                }}
              />
              <Image
                src="/assets/scanner-image.svg"
                alt="ExpenseAll receipt scanner screen"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 220px, (max-width: 1024px) 250px, 270px"
              />
            </div>
          </motion.div>
        </div>

        {/* ==================== ROW 2: VOICE EXPENSE ENTRY ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mt-20 md:mt-28">
          <motion.div
            className="lg:col-span-6 flex justify-center lg:justify-start lg:translate-x-16 xl:translate-x-24 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-[220px] h-[450px] sm:w-[250px] sm:h-[510px] lg:w-[270px] lg:h-[550px] transition-transform duration-500 ease-out hover:scale-[1.02]">
              <Image
                src="/assets/record-expense.svg"
                alt="ExpenseAll voice expense entry screen"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 220px, (max-width: 1024px) 250px, 270px"
              />
            </div>
          </motion.div>

          <div className="lg:col-span-6 flex flex-col items-start text-left order-1 lg:order-2">
            <div className="flex items-center gap-3">
              <AudioLines size={22} className="text-indigo-400" />
              <h3 className="font-manrope text-xl md:text-2xl font-semibold text-white">
                Record Expenses <span className="text-[#818CF8]">Using Your Voice</span>
              </h3>
            </div>
            <p className="font-lato italic text-slate-300 text-sm md:text-[15px] leading-relaxed mt-4 max-w-lg">
              Sometimes speaking is easier than typing. You can be carrying shopping bags or want to make a quick purchase.
            </p>
            <p className="font-lato italic text-slate-300 text-sm md:text-[15px] leading-relaxed mt-3 max-w-lg">
              With <span className="font-semibold text-white">Voice Expense Entry</span>, you can describe a transaction in your own words.
            </p>
            <StepList steps={VOICE_STEPS} />
            <StoreBadges />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiPoweredFeature;
