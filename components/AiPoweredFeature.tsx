"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const data = {
  playStoreUrl: "#",
  playStoreBadge: "/assets/playStore.png",
  appStoreUrl: "#",
  appStoreBadge: "/assets/apple.png",
};

const AiPoweredFeature = () => {
  return (
    <section
      id="ai-features"
      className="relative w-full text-white lg:py-16 py-10 px-6 md:px-16 lg:px-24 overflow-visible flex items-center"
    >
      {/* Gradient glow behind the fluid shape */}
      <motion.div
        className="hidden lg:block absolute lg:-right-[20%] lg:-top-[18%] w-[550px] h-[550px] rounded-full blur-3xl opacity-50 pointer-events-none select-none z-10 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.55)_0%,_rgba(99,102,241,0.45)_35%,_rgba(236,72,153,0.35)_65%,_transparent_100%)]"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 0.5, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      />

      {/* Top Right Abstract Fluid Shape Asset */}
      <motion.div
        className="hidden lg:block absolute lg:-right-[30%] lg:-top-[16%] xl:-right-[20%] xl:-top-[13%] w-[550px] h-[550px] pointer-events-none select-none z-30 opacity-90 mix-blend-screen"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 0.9, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        <Image
          src="/assets/fluid.png"
          alt="Abstract Decorative Fluid"
          width={420}
          height={442}
          className="object-contain"
          priority
        />
      </motion.div>

      <div className="max-w-7xl mx-auto w-full relative z-20">
        {/* Header Title Section - Left aligned on all screens */}
        <div className="max-w-3xl mx-auto text-left sm:text-center mb-6 sm:mb-10 md:mb-16 lg:mb-24">
          <h2 className="font-manrope text-4xl sm:text-4xl md:text-4xl font-medium tracking-tight mb-4 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-semibold">
              AI-Powered
            </span>{" "}
            Features
          </h2>

          <p className="font-lato text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed sm:mx-auto">
            Let AI simplify expense tracking by instantly processing receipts
            and voice entries.
          </p>
        </div>

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT SIDE: AI Description & Feature Points */}
          <div className="lg:col-span-5 flex flex-col gap-10 max-w-xl">
            {/* Feature 1: AI Receipt Scanner - Hide icon on mobile */}
            <div className="flex gap-4 items-start group">
              <div className="hidden sm:flex mt-1 flex-shrink-0 w-10 h-10 rounded-lg items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-all duration-300">
                <Image
                  src="/assets/scanner.png"
                  alt="Receipt Scanner"
                  width={25}
                  height={25}
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-manrope text-xl font-medium mb-2 tracking-wide text-white">
                  AI <span className="text-[#818CF8]">Receipt Scanner</span>
                </h3>
                <p className="font-lato text-white/90 text-sm sm:text-[15px] leading-relaxed italic font-light">
                  Capture paper receipts with your camera. AI instantly extracts
                  the merchant, amount, date, and category, turning them into
                  ready-to-save expense entries.
                </p>
              </div>
            </div>

            {/* Feature 2: Voice Expense Entry - Hide icon on mobile */}
            <div className="flex gap-4 items-start group">
              <div className="hidden sm:flex flex-shrink-0 w-10 h-10 rounded-lg items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-all duration-300">
                <Image
                  src="/assets/voice.png"
                  alt="Voice Entry"
                  width={25}
                  height={25}
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-manrope text-xl font-medium mb-2 tracking-wide text-[#818CF8]">
                  Voice Expense <span className="text-white">Entry</span>
                </h3>
                <p className="font-lato text-white/90 text-sm sm:text-[15px] leading-relaxed italic font-light">
                  Simply say, &quot;Spent Rs. 500 on groceries today.&quot; The
                  app understands your command, extracts the details, and
                  prepares the transaction for confirmation.
                </p>
              </div>
            </div>

            {/* Mobile-only Phone Mockup (shows above app badges, hidden on md+) */}
            <motion.div
              className="flex md:hidden items-center justify-center relative w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div
                className="
                  relative
                  w-full
                  max-w-[240px] sm:max-w-[300px]
                  aspect-[900/700]
                  mx-auto
                "
              >
                <Image
                  src="/assets/phone-groups.png"
                  alt="Voice Entry Feature Showcase"
                  fill
                  priority
                  quality={100}
                  className="object-contain"
                  sizes="(max-width: 640px) 240px, 300px"
                />
              </div>
            </motion.div>

            {/* App Badges Container */}
            <div className="flex flex-row flex-nowrap lg:px-14 items-center justify-center xl:justify-start gap-3 mb-10 md:mb-14 w-full">
              {/* Google Play Button */}
              <div
                // href={data.playStoreUrl}
                // target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 sm:gap-3
                  w-[150px] sm:w-[160px]
                  h-[44px] sm:h-[48px]
                  px-2 sm:px-3
                  bg-black
                  cursor-pointer
                  border border-white
                  rounded-lg
                  hover:bg-neutral-900
                  transition-all duration-200
                  hover:scale-[1.03]
                  select-none"
              >
                <div className="relative w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 shrink-0">
                  <Image
                    src={data.playStoreBadge}
                    alt="Google Play"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex flex-col items-start leading-none min-w-0">
                  <span className="text-[7px] sm:text-[8px] uppercase tracking-wider font-medium text-white">
                    Get it on
                  </span>
                  <span className="text-[10px] sm:text-[12px] md:text-[16px] font-medium font-manrope text-white mt-[2px] truncate">
                    Google Play
                  </span>
                </div>
              </div>

              {/* App Store Button */}
              <div
                // href={data.appStoreUrl}
                // target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 sm:gap-3
                  w-[150px] sm:w-[160px]
                  h-[44px] sm:h-[48px]
                  px-2 sm:px-3
                  bg-black
                  cursor-pointer
                  border border-white
                  rounded-lg
                  hover:bg-neutral-900
                  transition-all duration-200
                  hover:scale-[1.03]
                  select-none"
              >
                <div className="relative w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 shrink-0">
                  <Image
                    src={data.appStoreBadge}
                    alt="App Store"
                    fill
                    className="object-contain"
                  />
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
          </div>

          {/* RIGHT SIDE: Phone Mockups (Tablet/Desktop only) - Hidden on mobile */}
          <motion.div
            className="hidden md:flex lg:col-span-7 items-center justify-center lg:justify-end relative mt-6 lg:mt-0"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          >
            <div
              className="
                relative
                w-full
                max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[750px]
                aspect-[900/700]
                transition-all
                duration-500
                hover:scale-[1.03]
                rotate-[-4deg]
                lg:-translate-y-10
                lg:translate-x-12
                mx-auto
              "
            >
              <Image
                src="/assets/phone-groups.png"
                alt="Voice Entry Feature Showcase"
                fill
                priority
                quality={100}
                className="object-contain"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 400px, (max-width: 1024px) 500px, 750px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AiPoweredFeature;