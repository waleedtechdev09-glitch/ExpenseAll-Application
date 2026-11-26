"use client";
import React, { useEffect, useRef, useState } from "react";

type Subsection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

type Section = {
  id: string;
  title: string;
  content?: React.ReactNode;
  list?: string[];
  paragraphs?: string[];
  subsections?: Subsection[];
};

const sections: Section[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content:
      "By accessing or using the ExpenseAll application, you acknowledge that you have read, understood, and agreed to these Terms & Conditions. If you do not agree with any part of these terms, please discontinue using the service.",
  },
  {
    id: "eula",
    title: "End User License Agreement (EULA)",
    paragraphs: [
      "ExpenseAll is licensed to you, not sold. By downloading or using the app, you agree to this agreement. If Elexoft provides a separate custom agreement, that one applies instead. Elexoft (“Licensor”) keeps all rights not expressly granted to you.",
    ],
    subsections: [
      {
        title: "Scope of License",
        paragraphs: [
          "Elexoft grants you a limited, non-transferable license to use ExpenseAll on Apple devices you own or control, as permitted by the App Store usage rules. This covers any updates, content, or services within the app unless they come with a separate agreement. You may not:",
        ],
        list: [
          "Make the app available over a network for simultaneous use by multiple devices.",
          "Transfer, redistribute, or sublicense the app. If you sell your device, you must remove the app first.",
          "Copy, modify, reverse-engineer, or extract the source code of the app, or create derivative works, except where the law or open-source terms allow it.",
        ],
      },
      {
        title: "Consent to Use of Data",
        paragraphs: [
          "Elexoft may collect technical information about your device and software to provide updates, support, and services. This data is used in a form that does not personally identify you, and may help improve our products.",
        ],
      },
      {
        title: "Termination",
        paragraphs: [
          "This agreement lasts until you or Elexoft ends it. It ends automatically if you breach any of its terms.",
        ],
      },
      {
        title: "External Services",
        paragraphs: [
          "The app may link to services or websites from Elexoft or third parties. You use them at your own risk, and Elexoft is not responsible for their content or accuracy. Information shown in the app, including financial, medical, or location data, is for general purposes only and not guaranteed. You must not use these services to harass, abuse, threaten, or defame anyone, or to break the law. Services may be changed, suspended, or restricted at any time without notice, and you are responsible for following your local laws.",
        ],
      },
      {
        title: "Disclaimer of Warranty",
        paragraphs: [
          "To the fullest extent allowed by law, the app and its services are provided “as is” and “as available,” without warranties of any kind, express, implied, or statutory. You bear the cost of any servicing or repair if the app proves defective. Some regions do not allow these exclusions, so they may not apply to you.",
        ],
      },
      {
        title: "Limitation of Liability",
        paragraphs: [
          "To the extent allowed by law, Elexoft is not liable for personal injury or for incidental, special, indirect, or consequential damages, including loss of profits or data, arising from your use of or inability to use the app. Our total liability to you will not exceed fifty dollars ($50.00). Some regions do not allow these limits, so they may not apply to you.",
        ],
      },
      {
        title: "Export Compliance",
        paragraphs: [
          "You may not export or re-export the app except as permitted by U.S. law and the laws of the country where you obtained it. You confirm you are not in a U.S.-embargoed country or on any U.S. restricted-party list, and will not use the app for purposes prohibited by U.S. law, including weapons development.",
        ],
      },
      {
        title: "U.S. Government Users",
        paragraphs: [
          "The app and its documentation are “Commercial Items” under U.S. federal regulations, and U.S. Government users receive only the rights granted to all other users.",
        ],
      },
      {
        title: "Governing Law",
        paragraphs: [
          "This agreement is governed by the laws of the State of California, and disputes will be handled by the courts in Santa Clara County, California. Residents of the European Union, Switzerland, Norway, or Iceland are governed by the laws and courts of their place of residence. The UN Convention on the International Sale of Goods does not apply.",
        ],
      },
    ],
  },
  {
    id: "accounts",
    title: "User Accounts",
    content:
      "To access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.",
  },
  {
    id: "acceptable",
    title: "Acceptable Use",
    list: [
      "You agree to use the application only for lawful purposes. You must not:",
      " Violate applicable laws or regulations.",
      "Attempt unauthorized access to our systems.",
      "Distribute harmful software or malicious code.",
      "Interfere with the normal operation of the platform.",
      "Misuse or abuse any features or services.",
    ],
  },
  {
    id: "responsibilities",
    title: "User Responsibilities",
    content:
      "You are responsible for ensuring that the information you provide is accurate and up to date. You agree to use the application responsibly and protect your account credentials from unauthorized access.",
  },
  {
    id: "property",
    title: "Intellectual Property",
    content:
      "All content, software, branding, logos, graphics, and features available within the ExpenseAll application are the property of Elexoft or its licensors and are protected by applicable intellectual property laws.",
  },
  {
    id: "payments",
    title: "Payments & Subscriptions",
    content:
      "If you subscribe to a paid plan, you agree to pay all applicable fees. Subscription charges, renewals, cancellations, and refunds will be handled according to the selected subscription plan.",
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content:
      "While we strive to provide a reliable and secure service, Elexoft shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the application.",
  },
  {
    id: "termination",
    title: "Termination",
    content:
      "We reserve the right to suspend or terminate your account if you violate these Terms & Conditions or misuse the application.",
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    content:
      "We may update these Terms & Conditions from time to time. Any changes will become effective upon publication on this page. Continued use of the application constitutes acceptance of the updated terms.",
  },
  {
    id: "contact",
    title: "Contact Information",
    content: (
      <div className="space-y-2">
        <p className="text-gray-300 text-normal font-normal font-lato">
          Questions about your data?
        </p>

        <p className="text-gray-300 leading-8 max-w-3xl text-normal font-normal font-lato">
          Have questions about how we collect, use, or protect your personal
          information? Our team is here to help. Reach out to us, and we'll
          respond as soon as possible.
        </p>

        <p className="text-gray-300">
          Email:{" "}
          <a
            href="mailto:info@elexoft.com"
            className=" text-cyan-300 underline-offset-2 hover:text-cyan-300 transition"
          >
            info@elexoft.com
          </a>
        </p>
      </div>
    ),
  },
];

// Hero (heading + description + date) ke neeche kitna extra gap chahiye
// jab sidebar wahan lock ho jaye
const EXTRA_GAP_AFTER_HERO = 24;

export default function TermConditions() {
  const [active, setActive] = useState("acceptance");

  const [stickyTop, setStickyTop] = useState(96);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measureHero = () => {
      if (heroRef.current) {
        setStickyTop(heroRef.current.offsetHeight + EXTRA_GAP_AFTER_HERO);
      }
    };

    measureHero();
    const timeoutId = setTimeout(measureHero, 100);
    window.addEventListener("resize", measureHero);

    return () => {
      window.removeEventListener("resize", measureHero);
      clearTimeout(timeoutId);
    };
  }, []);

  const gotoSection = (id: string) => {
    setActive(id);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="bg-[#071B3B] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 py-8 sm:py-16">
        {/* Hero: heading + description + date. Sidebar unlocks right after this. */}
        <div ref={heroRef}>
          <h1 className="text-3xl sm:text-4xl mt-20 sm:mt-14 md:text-[54px] font-medium font-manrope">
            Terms & Conditions
          </h1>

          <p className="mt-4 sm:mt-6 text-gray-300 text-sm sm:text-base max-w-5xl leading-7 sm:leading-8 font-lato">
            Please read these Terms & Conditions carefully before using the
            ExpenseAll application. By accessing or using our services, you
            agree to be bound by these terms.
          </p>

          <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-[rgba(144,165,202,1)]">
            Effective as of: June 2, 2026
          </p>
        </div>

        {/* Grid layout - sidebar hidden on mobile/tablet, visible on desktop */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 sm:gap-10 mt-8 sm:mt-12">
          {/* Sidebar - Hidden on small and medium devices, shown on large screens */}
          <aside className="hidden lg:block">
            <div className="sticky space-y-2" style={{ top: stickyTop }}>
              {sections.map((item) => (
                <button
                  key={item.id}
                  onClick={() => gotoSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition
                  ${
                    active === item.id
                      ? "bg-white/10 border-l-4 border-white text-white"
                      : "text-gray-400 hover:bg-white/5"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </aside>

          {/* Content - Full width on mobile/tablet */}
          <div className="min-w-0 lg:col-span-1">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className={`scroll-mt-24 sm:scroll-mt-28 pb-6 sm:pb-10 ${
                  section.id !== "contact"
                    ? "border-b border-white/10 mb-6 sm:mb-10"
                    : ""
                }`}
              >
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
                  {section.title}
                </h2>

                {section.content && typeof section.content === "string" && (
                  <p className="text-gray-300 text-sm sm:text-lg leading-7 sm:leading-8">
                    {section.content}
                  </p>
                )}

                {React.isValidElement(section.content) && section.content}

                {section.list && (
                  <ul className="list-disc ml-4 sm:ml-6 mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-gray-300 text-sm sm:text-base">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.paragraphs?.map((text, i) => (
                  <p
                    key={i}
                    className="text-gray-300 text-sm sm:text-lg leading-7 sm:leading-8 mb-3"
                  >
                    {text}
                  </p>
                ))}

                {section.subsections?.map((sub) => (
                  <div key={sub.title} className="mt-6 sm:mt-8">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                      {sub.title}
                    </h3>

                    {sub.paragraphs.map((text, i) => (
                      <p
                        key={i}
                        className="text-gray-300 text-sm sm:text-lg leading-7 sm:leading-8 mb-3"
                      >
                        {text}
                      </p>
                    ))}

                    {sub.list && (
                      <ul className="list-disc ml-4 sm:ml-6 mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-gray-300 text-sm sm:text-base">
                        {sub.list.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
