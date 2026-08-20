"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HERO_DATA, HeroConfig } from "../config/hero";

interface HeroProps {
  data?: HeroConfig;
}

const Hero: React.FC<HeroProps> = ({ data = HERO_DATA }) => {
  return (
    <section className="relative w-full md:mt-18 mt-18 lg:mt-4 text-white flex items-center pt-6 sm:pt-10 md:pt-14 lg:pt-20 pb-2 sm:pb-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 bg-transparent md:min-h-[70vh]">
      {/* Background Glow */}
      <div className="absolute right-[-10%] md:right-[-6%] top-[12%] md:top-[18%] w-[280px] sm:w-[420px] md:w-[500px] lg:w-[600px] h-[280px] sm:h-[420px] md:h-[500px] lg:h-[600px] bg-blue-900/15 rounded-full blur-[90px] sm:blur-[120px] md:blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-6 lg:gap-8 items-center">
        {/* Left Content */}
        <div className="md:col-span-1 lg:col-span-7 xl:col-span-6 flex flex-col justify-center items-start text-left">
          <h1 className="font-manrope text-4xl sm:text-4xl md:text-[42px] lg:text-[56px] xl:text-[68px] font-medium tracking-tight leading-[1.15] mb-5">
            Take Control
            <br />
            <span className="text-white">of </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-semibold">
              Every Expense.
            </span>
          </h1>

          <p className="font-lato text-white/90 text-sm sm:text-[15px] md:text-[15px] lg:text-[17px] leading-relaxed max-w-md md:max-w-lg lg:max-w-xl mb-8">
            {data.description}
          </p>

          {/* Mobile-only Image (shows above buttons, hidden on md+) */}
          <motion.div
            className="flex md:hidden w-full justify-center relative mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Glow */}
            <div
              className="absolute w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] rounded-full blur-[90px] opacity-30 pointer-events-none top-6 right-0"
              style={{
                background: "linear-gradient(135deg, #4FD1FF 0%, #6C63FE 100%)",
              }}
            />

            {/* Image */}
            <div className="relative w-full h-[340px] sm:h-[400px] z-10">
              <Image
                src={data.heroImage}
                alt="Expense Tracker Mobile Experience"
                fill
                priority
                className="object-contain"
                sizes="(max-width:640px) 90vw, 70vw"
              />
            </div>
          </motion.div>

          {/* Store Buttons */}
          <div className="flex flex-row flex-nowrap items-center justify-center xl:justify-start gap-3 mb-6 md:mb-10 w-full max-w-md">
            {/* Google Play */}
            <div
              // href=""
              // target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 sm:gap-3
                w-[150px] sm:w-[160px]
                h-[44px] sm:h-[48px]
                px-2 sm:px-3
                cursor-pointer
                bg-black
                border border-white
                rounded-lg
                hover:bg-neutral-900
                transition-all duration-200
                hover:scale-[1.03]
                select-none overflow-hidden"
            >
              <div className="relative w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 shrink-0">
                <img
                  src={data.playStoreBadge}
                  alt="Google Play"
                  className="object-contain w-full h-full"
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

            {/* App Store */}
            <div
              // href="#"
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
                select-none overflow-hidden"
            >
              <div className="relative w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 shrink-0">
                <img
                  src={data.appStoreBadge}
                  alt="App Store"
                  className="object-contain w-full h-full"
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

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-5 lg:gap-8 w-full max-w-md md:max-w-full">
            {data.stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center md:items-start text-center md:text-left"
              >
                <span className="text-[8px] md:text-[9px] lg:text-[10px] uppercase tracking-wider text-white/70">
                  {stat.label}
                </span>

                <span className="text-[10px] md:text-[12px] md:font-semibold font-semibold lg:font-bold lg:text-[14px] xl:font-bold xl:text-lg text-white">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image (Desktop/Tablet only) with Framer Motion */}
        <motion.div
          className="hidden md:flex md:col-span-1 lg:col-span-5 xl:col-span-6 justify-center lg:justify-end relative"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Glow */}
          <div
            className="absolute w-[300px] h-[300px] md:w-[340px] md:h-[340px] lg:w-[470px] lg:h-[470px] rounded-full blur-[110px] opacity-30 pointer-events-none top-10 lg:top-20 right-0 lg:right-[-20%]"
            style={{
              background: "linear-gradient(135deg, #4FD1FF 0%, #6C63FE 100%)",
            }}
          />

          {/* Image */}
          <div className="relative w-full h-[420px] lg:h-[500px] xl:h-[600px] z-10 transition-transform duration-500 hover:scale-[1.02]">
            <Image
              src={data.heroImage}
              alt="Expense Tracker Mobile Experience"
              fill
              priority
              className="object-contain md:object-right lg:object-right-top"
              sizes="(max-width:768px) 50vw, (max-width:1024px) 45vw, 700px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
