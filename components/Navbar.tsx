"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { NavItem, NAV_ITEMS, BRAND_INFO } from "../config/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  brandName?: string;
  logoSrc?: string;
  logoAlt?: string;
  navItems?: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({
  brandName = BRAND_INFO.name,
  logoSrc = BRAND_INFO.logoSrc,
  logoAlt = BRAND_INFO.altText || "Brand Logo",
  navItems = NAV_ITEMS,
}) => {
  const [imageError, setImageError] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const clickingRef = useRef(false);
  const scrollStopTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let ticking = false;

    const updateActiveTab = () => {
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      let current = "";

      const sectionToTab: Record<string, string> = {
        features: "#features",
        "ai-features": "#features",
        rating: "#features",
        reviews: "#reviews",
        pricing: "#pricing",
        faqs: "#faqs",
      };

      Object.entries(sectionToTab).forEach(([id, tab]) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + rect.height;

        if (viewportCenter >= top && viewportCenter < bottom) {
          current = tab;
        }
      });

      setActiveTab(current);
    };

    const onScroll = () => {
      if (!ticking && !clickingRef.current) {
        requestAnimationFrame(() => {
          updateActiveTab();
          ticking = false;
        });
        ticking = true;
      }

      if (clickingRef.current) {
        if (scrollStopTimerRef.current)
          clearTimeout(scrollStopTimerRef.current);
        scrollStopTimerRef.current = setTimeout(() => {
          clickingRef.current = false;
          scrollStopTimerRef.current = null;
          updateActiveTab();
        }, 200);
      }
    };

    updateActiveTab();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
    };
  }, [navItems]);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const offset = navRef.current.getBoundingClientRect().top;
        setIsScrolled(offset <= 0);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (href) {
      setActiveTab(href);
      clickingRef.current = true;
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "/" + href;
      }
      setMobileMenuOpen(false);
    }
  };

  const navBgClass = isScrolled
    ? "fixed top-0 left-0 right-0 z-50 bg-[#081B3A]/90 backdrop-blur-md shadow-xl"
    : "sticky top-0 z-50 bg-transparent";

  return (
    <nav
      ref={navRef}
      className={`w-full border-b border-[#374151]/60 text-white transition-all duration-300 ${navBgClass}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          {logoSrc && !imageError ? (
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 transition-transform group-hover:scale-105">
              <Image
                src={logoSrc}
                alt={logoAlt}
                fill
                className="object-contain"
                sizes="36px"
                priority
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="w-8 h-8 text-[#4FD1FF]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
            </div>
          )}

          <span className="font-semibold text-base sm:text-lg tracking-tight group-hover:text-[#4FD1FF] transition-colors">
            {brandName}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm">
          {navItems.map((item) => {
            const isActive = activeTab === item.href;
            const linkClass = isActive
              ? "text-[#4FD1FF] font-semibold"
              : "text-slate-300 hover:text-white";

            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`transition-colors duration-200 relative py-1 ${linkClass}`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center gap-2 px-6 h-10 rounded-full bg-[#6C63FF] text-white text-sm font-medium transition-all duration-300 hover:bg-[#5B54E8] hover:shadow-lg hover:shadow-[#6C63FF]/30 active:scale-95"
          >
            <span>Contact us</span>
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className="md:hidden overflow-hidden transition-all duration-200 ease-out will-change-[max-height,opacity]"
        style={{
          maxHeight: mobileMenuOpen ? "300px" : "0px",
          opacity: mobileMenuOpen ? 1 : 0,
        }}
      >
        <div className="bg-[#081B3A]/95 backdrop-blur-xl px-5 py-5 space-y-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.href;
            const mobileLinkClass = isActive
              ? "text-[#4FD1FF] bg-[#4FD1FF]/10 font-semibold border-l-2 border-[#4FD1FF]"
              : "text-slate-300 hover:text-white hover:bg-slate-800/40";

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={`block px-4 py-2.5 rounded-lg text-base transition-all duration-200 ${mobileLinkClass}`}
              >
                {item.label}
              </a>
            );
          })}

          {/* Mobile CTA Button */}
          <div className="pt-3">
            <Link
              href="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#6C63FF] text-white font-medium text-sm transition-all active:scale-[0.98] shadow-md shadow-[#6C63FF]/20"
            >
              <span>Contact us</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
