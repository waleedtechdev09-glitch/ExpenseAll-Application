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
  decorImage: "/assets/finance.png", // the swirly 3D shape
};

const Finances = () => {
  return (
    <section className="relative w-full py-4 sm:py-14 md:py-20 px-5 sm:px-8 md:px-12 lg:px-20">
      <div
        className="relative w-full mx-auto rounded-3xl overflow-hidden
          bg-white/10
          px-6 sm:px-10 md:px-14 lg:px-20
          py-10 sm:py-14 md:py-16
          min-h-[280px] sm:min-h-[320px]
          flex flex-col items-center justify-center text-center"
      >
        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-manrope text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-medium text-white leading-tight text-center">
            Ready to Take Control of Your{" "}
            <span className="text-cyan-400">Finances</span>?
          </h2>

          <p className="font-lato mt-3 sm:mt-4 text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed text-center">
            Track expenses, manage budgets, and unlock AI-powered money
            management—all from one beautifully designed app.
          </p>

          {/* Store Badges */}
          <div className="mt-6 sm:mt-8 flex flex-nowrap items-center justify-center gap-2 sm:gap-3">
            {/* Google Play */}
            <div
              // href={data.playStoreUrl}
              // target="_blank"
              rel="noopener noreferrer"
              className="flex items-center cursor-pointer gap-1.5 sm:gap-2 w-[125px] sm:w-[155px] md:w-[170px] h-[42px] sm:h-[48px] md:h-[54px] px-2.5 sm:px-3 bg-black border border-white rounded-lg hover:bg-neutral-900 transition-all duration-200 hover:scale-[1.03] shrink-0"
            >
              <div className="relative w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 shrink-0">
                <Image
                  src={data.playStoreBadge}
                  alt="Google Play"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="leading-none">
                <p className="text-[7px] sm:text-[8px] text-white uppercase tracking-wider">
                  Get it on
                </p>
                <p className="text-[11px] sm:text-[12px] md:text-[16px] font-medium text-white">
                  Google Play
                </p>
              </div>
            </div>

            {/* App Store */}
            <div
              // href={data.appStoreUrl}
              // target="_blank"
              rel="noopener noreferrer"
              className="flex items-center cursor-pointer gap-1.5 sm:gap-2 w-[125px] sm:w-[155px] md:w-[170px] h-[42px] sm:h-[48px] md:h-[54px] px-2.5 sm:px-3 bg-black border border-white rounded-lg hover:bg-neutral-900 transition-all duration-200 hover:scale-[1.03] shrink-0"
            >
              <div className="relative w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 shrink-0">
                <Image
                  src={data.appStoreBadge}
                  alt="App Store"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="leading-none">
                <p className="text-[7px] sm:text-[8px] text-white tracking-wider">
                  Download on the
                </p>
                <p className="text-[11px] sm:text-[12px] md:text-[16px] font-medium text-white">
                  App Store
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glow gradient behind the decorative image */}
      <motion.div
        className="pointer-events-none absolute
          -bottom-6 -right-4
          sm:-bottom-8 sm:-right-4
          md:-bottom-10 md:-right-6
          lg:-bottom-10 lg:-right-25
          z-10
          w-[140px] h-[140px]
          sm:w-[200px] sm:h-[200px]
          md:w-[300px] md:h-[300px]
          lg:w-[400px] lg:h-[400px]
          rounded-full blur-3xl opacity-60
          bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.6)_0%,_rgba(236,72,153,0.5)_35%,_rgba(56,189,248,0.4)_65%,_transparent_75%)]"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 0.6, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      />

      {/* Decorative bottom-right image — sibling of the card, so overflow-hidden doesn't clip it */}
      <motion.div
        className="pointer-events-none absolute
          -bottom-6 -right-10
          sm:-bottom-8 sm:-right-8
          md:-bottom-10 md:-right-30
          lg:-bottom-10 lg:-right-28
          z-20
          w-[180px] h-[180px]
          sm:w-[200px] sm:h-[200px]
          md:w-[350px] md:h-[350px]
          lg:w-[400px] lg:h-[400px]
          opacity-90"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 0.9, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        <Image
          src={data.decorImage}
          alt=""
          fill
          className="md:block hidden object-contain rotate-[270.85deg]"
        />
      </motion.div>
    </section>
  );
};

export default Finances;
