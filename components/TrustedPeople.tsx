"use client";
import React from "react";

const StarIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="#FFC107"
    className="text-yellow-400"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
  </svg>
);

const testimonials = [
  {
    name: "Jessica John",
    platform: "iOS App Store",
    review:
      "The easiest expense tracker I've ever used. The AI receipt scanner saves me so much time, and the budgeting tools help me stay on track every month. Everything feels simple and intuitive.",
  },
  {
    name: "Clément",
    platform: "Google Play Store",
    review:
      "The interface feels polished, the performance is smooth, and the insights help me make better financial decisions every month.",
  },
  {
    name: "FortierP",
    platform: "Google Play Store",
    review:
      "Smart, secure, and beautifully designed. The insights and spending reports have completely changed the way I manage my money. Highly recommended for anyone serious about budgeting.",
  },
  {
    name: "Jessica John",
    platform: "iOS App Store",
    review:
      "I love how it combines budgeting, bill reminders, multiple accounts, and AI automation in one beautifully designed app. It keeps my finances organized without any hassle.",
  },
  {
    name: "Jessica John",
    platform: "iOS App Store",
    review:
      "I can record expenses using my voice while driving or shopping. The app is fast, accurate, and works even when I'm offline.",
  },
  {
    name: "Jessica John",
    platform: "iOS App Store",
    review:
      "The interface is modern, clean, and intuitive. I was able to start tracking my finances within minutes.",
  },
];

const TrustedPeople = () => {
  return (
    <section id="reviews" className="relative overflow-hidden lg:py-20 xl:py-16 md:py-14 py-10">
      <div className="relative max-w-7xl mx-auto px-5">
        {/* Heading - Left aligned on mobile, center on larger screens */}
        <div className="text-left md:text-center mb-14">
          <h2 className="font-manrope text-4xl md:text-4xl lg:text-3xl xl:text-5xl font-medium text-white leading-tight">
            <span className="text-cyan-400 font-bold">Trusted by People</span>{" "}
            Who Value Every Rupee
          </h2>

          <p className="text-gray-300 mt-5 text-base md:text-xl max-w-3xl mx-auto">
            Built to make everyday money management simpler, faster, and more
            intuitive.
          </p>
        </div>

        <div
          className="grid grid-cols-1 items-start md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6
            lg:[mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]
            lg:[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]"
        >
          {testimonials.map((item, index) => (
<div
               key={index}
               className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-7 transition duration-300 hover:border-cyan-400/30"
             >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-200 font-lato font-medium leading-8 text-[16px]">
                {item.review}
              </p>

              {/* User */}
              <div className="mt-8">
                <h4 className="text-white font-manrope font-semibold text-lg">
                  {item.name}
                </h4>

                <p className="text-gray-400 font-lato font-normal mt-1">
                  {item.platform}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedPeople;
