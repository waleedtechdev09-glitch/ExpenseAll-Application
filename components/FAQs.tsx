"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { faqData } from "@/config/FAQ_Data";

const FAQs = () => {
  const [active, setActive] = useState(0);

  return (
    // px-20 → responsive px-5 sm:px-8 md:px-12 lg:px-20 (mobile pe content ka saans lene ki jagah)
    <section
      id="faqs"
      className=" lg:py-0 py-10 px-5 sm:px-8 md:px-12 lg:px-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center">
          <h2 className=" font-manrope md:text-center text-left text-4xl sm:text-3xl md:text-5xl font-medium text-white leading-tight">
            Frequently Asked{" "}
            <span className="text-cyan-400 font-bold">Questions</span>
          </h2>

          <p className="font-lato md:text-center text-left text-gray-300 mt-4 sm:mt-5 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed px-2 sm:px-0">
            Find answers to your questions right here, and don't hesitate to
            Contact us if you couldn't find what you're looking for.
          </p>

          <Link
            href="/contact-us"
            className="mt-6 sm:mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#6C63FF] hover:bg-[#5d54ff] transition px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base text-white font-medium"
          >
            <span>Contact us</span>
            <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
          </Link>
        </div>

        {/* FAQs */}
        <div className="mt-6 md:mt-3 sm:mt-16">
          {faqData.map((item, index) => {
            const open = active === index;
            const isLast = index === faqData.length - 1;

            return (
              <div
                key={index}
                className={isLast ? "" : "border-b border-white/10"}
              >
                <button
                  onClick={() => setActive(open ? -1 : index)}
                  className="w-full flex items-center justify-between gap-3 sm:gap-5 py-4 sm:py-7 text-left"
                >
                  <h3 className="text-white text-sm sm:text-base md:text-xl font-medium pr-2 sm:pr-5 leading-snug">
                    {index + 1}. {item.question}
                  </h3>

                  <div className="text-white shrink-0">
                    {open ? (
                      <ChevronUp
                        size={18}
                        className="sm:w-[22px] sm:h-[22px]"
                      />
                    ) : (
                      <ChevronDown
                        size={18}
                        className="sm:w-[22px] sm:h-[22px]"
                      />
                    )}
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    open ? "grid-rows-[1fr] pb-4 sm:pb-7" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-gray-300 text-[13px] sm:text-sm md:text-lg leading-6 sm:leading-8 max-w-4xl">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
