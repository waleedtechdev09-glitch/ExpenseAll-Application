import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Link from "next/link";
const Footer = () => {
  const links = [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Reviews", href: "/#reviews" },
    { name: "Contact", href: "/contact-us" },
    { name: "FAQs", href: "/#faqs" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Term & Condition", href: "/term-condition" },
  ];

  return (
    <footer className="bg-[#071B3B] border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Logo */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <div className="w-11 h-11 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center">
              <img
                src="/assets/expenselogo.png"
                alt="Logo"
                className="w-7 h-7 object-contain"
              />
            </div>

            <span className="text-sm md:text-base font-medium">
              ExpenseAll
            </span>
          </div>

          <p className="text-white/90 font-lato font-normal text-sm mt-5 max-w-xl leading-relaxed">
            AI-powered expense management designed to simplify your finances.
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-5 text-sm">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-white hover:text-gray-300 transition duration-300 ${
                link.name === "Privacy Policy" || link.name === "Term & Condition"
                  ? "underline"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Social Icons */}
        <div className="mt-8 flex justify-center gap-6">
          <a
            href="#"
            className="text-gray-300 hover:text-[#4FD1FF] transition text-lg"
          >
            <FaFacebookF />
          </a>

          <a
            href="#"
            className="text-gray-300 hover:text-[#4FD1FF] transition text-lg"
          >
            <FaTwitter />
          </a>

          <a
            href="#"
            className="text-gray-300 hover:text-[#4FD1FF] transition text-lg"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-white/10"></div>

        {/* Copyright */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © 2026 Smart Expense Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
