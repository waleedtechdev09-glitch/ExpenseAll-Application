"use client";

import React, { useEffect, useRef, useState } from "react";
import { STATS_DATA } from "@/config/Stat_Data";

const Rating = () => {
  const [counts, setCounts] = useState(STATS_DATA.map(() => "0"));
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  useEffect(() => {
    // Check if screen is medium (768px and above)
    const checkScreenSize = () => {
      setIsMediumScreen(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    // Only set up observer if on medium or larger screen
    if (!isMediumScreen) {
      // On small screens, just show the final values
      const finalCounts = STATS_DATA.map((stat) => stat.value);
      setCounts(finalCounts);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounts();
          }
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isMediumScreen, hasAnimated]);

  const animateCounts = () => {
    const duration = 2500; // 2.5 seconds for smoother animation
    const startTime = Date.now();

    // Parse all target values
    const targets = STATS_DATA.map((stat) => {
      const value = stat.value;
      // Handle decimal numbers (like 4.9)
      if (value.includes(".")) {
        return parseFloat(value);
      }
      // Handle numbers with K (like 10K)
      if (value.includes("K") && !value.includes("+")) {
        return parseFloat(value.replace("K", "")) * 1000;
      }
      // Handle numbers with K+ (like 10K+)
      if (value.includes("K") && value.includes("+")) {
        return parseFloat(value.replace("K+", "")) * 1000;
      }
      // Handle numbers with + (like 50+)
      if (value.includes("+")) {
        return parseFloat(value.replace("+", ""));
      }
      // Regular numbers
      return parseInt(value);
    });

    const updateCounts = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      const newCounts = STATS_DATA.map((stat, index) => {
        const target = targets[index];
        const current = target * easeOutQuart;

        // Handle different formats
        if (stat.value.includes(".")) {
          // For decimal numbers like 4.9 - show 1 decimal place
          return current.toFixed(1);
        } else if (stat.value.includes("K") && !stat.value.includes("+")) {
          // For numbers with K like 10K
          const valueInK = Math.floor(current / 1000);
          return valueInK + "K";
        } else if (stat.value.includes("K") && stat.value.includes("+")) {
          // For numbers with K+ like 10K+
          const valueInK = Math.floor(current / 1000);
          return valueInK + "K+";
        } else if (stat.value.includes("+")) {
          // For numbers with + like 50+
          return Math.floor(current) + "+";
        } else {
          // Regular numbers
          return Math.floor(current).toString();
        }
      });

      setCounts(newCounts);

      if (progress < 1) {
        requestAnimationFrame(updateCounts);
      } else {
        // Final values - show exactly as in data
        const finalCounts = STATS_DATA.map((stat) => stat.value);
        setCounts(finalCounts);
      }
    };

    updateCounts();
  };

  const getDisplayValue = (index: number) => {
    return counts[index] !== undefined
      ? counts[index]
      : STATS_DATA[index].value;
  };

  return (
    <section
      ref={sectionRef}
      id="rating"
      className="w-full bg-transparent md:py-10 py-0 px-6 sm:px-16 lg:px-24 flex justify-center items-center"
    >
      <div className="relative w-full max-w-7xl overflow-hidden rounded-2xl md:rounded-3xl border border-white/[0.08] bg-white/10 p-6 md:p-10 lg:py-12">
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0 items-center text-center">
          {STATS_DATA.map((stat, index) => (
            <div
              key={stat.id}
              className={`flex flex-col items-center justify-center px-4 relative ${
                // Mobile dynamic borders: Right border for odd items on small screens
                index % 2 === 0
                  ? "border-r border-white/[0.08] md:border-r-0"
                  : ""
              } ${
                // Desktop dynamic borders: Add left border starting from second column
                index > 0 ? "md:border-l md:border-white/20" : ""
              }`}
            >
              <h3 className="font-manrope text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white mb-2">
                {getDisplayValue(index)}
              </h3>
              <p className="font-lato text-xs sm:text-sm text-slate-300 font-normal tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rating;
