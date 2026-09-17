"use client";

import React, { useState, useEffect } from "react";
import { Anchor, ShieldCheck, Compass, Menu, X, ChevronRight } from "lucide-react";

interface NavbarProps {
  onOpenInquiry: (yachtName?: string) => void;
}

export default function Navbar({ onOpenInquiry }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md shadow-sky-950/5 py-3"
          : "bg-white/80 backdrop-blur-sm border-b border-slate-200/60 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#02509A] via-[#0284C7] to-[#0369A1] flex items-center justify-center shadow-md shadow-sky-900/20 group-hover:scale-105 transition-transform">
            <Anchor className="w-5 h-5 text-white stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-widest text-[#0B1E36] uppercase flex items-center gap-1">
              YACHT<span className="text-[#0284C7]">DESK</span>
            </span>
            <span className="text-[10px] tracking-[0.25em] text-slate-500 uppercase font-semibold">
              Mediterranean Charter
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <a
            href="#fleet"
            className="hover:text-[#02509A] transition-colors cursor-pointer py-1"
          >
            Curated Fleet
          </a>
          <a
            href="#calculator"
            className="hover:text-[#02509A] transition-colors cursor-pointer py-1"
          >
            APA & VAT Calculator
          </a>
          <a
            href="#itineraries"
            className="hover:text-[#02509A] transition-colors cursor-pointer py-1"
          >
            Itineraries
          </a>
          <a
            href="#fleet-managers"
            className="hover:text-[#02509A] transition-colors cursor-pointer py-1 flex items-center gap-1.5 text-[#02509A]"
          >
            <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
            Central Agency Portal
          </a>
          <a
            href="#standards"
            className="hover:text-[#02509A] transition-colors cursor-pointer py-1"
          >
            MYBA Standards
          </a>
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-900 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Greek Law 4926 Certified</span>
          </div>

          <button
            onClick={() => onOpenInquiry()}
            className="px-5 py-2.5 rounded-full aegean-btn text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-md shadow-sky-900/20 hover:opacity-95 transition-all cursor-pointer"
          >
            Request Charter
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => onOpenInquiry()}
            className="px-3 py-1.5 rounded-full aegean-btn text-white font-bold text-xs uppercase"
          >
            Inquire
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-950"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 mt-3 space-y-4 shadow-xl">
          <a
            href="#fleet"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 hover:text-[#02509A]"
          >
            Curated Fleet
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 hover:text-[#02509A]"
          >
            APA & VAT Calculator
          </a>
          <a
            href="#itineraries"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 hover:text-[#02509A]"
          >
            Curated Itineraries
          </a>
          <a
            href="#fleet-managers"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-bold text-[#02509A]"
          >
            Central Agency & Fleet Managers
          </a>
          <a
            href="#standards"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 hover:text-[#02509A]"
          >
            MYBA & Maritime Regulations
          </a>
        </div>
      )}
    </header>
  );
}
