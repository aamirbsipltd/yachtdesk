"use client";

import React, { useState, useEffect } from "react";
import { Anchor, ShieldCheck, Compass, Menu, X, PhoneCall, ChevronRight } from "lucide-react";

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
          ? "bg-[#050811]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl shadow-black/40"
          : "bg-gradient-to-b from-[#050811]/80 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Anchor className="w-5 h-5 text-slate-950 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-widest text-white uppercase flex items-center gap-1.5">
              YACHT<span className="text-amber-400">DESK</span>
            </span>
            <span className="text-[10px] tracking-[0.25em] text-slate-400 uppercase font-medium">
              Mediterranean Charter
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a
            href="#fleet"
            className="hover:text-amber-400 transition-colors cursor-pointer py-1"
          >
            Curated Fleet
          </a>
          <a
            href="#calculator"
            className="hover:text-amber-400 transition-colors cursor-pointer py-1"
          >
            APA & VAT Calculator
          </a>
          <a
            href="#itineraries"
            className="hover:text-amber-400 transition-colors cursor-pointer py-1"
          >
            Itineraries
          </a>
          <a
            href="#fleet-managers"
            className="hover:text-amber-400 transition-colors cursor-pointer py-1 flex items-center gap-1 text-amber-200/90"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Central Agency Portal
          </a>
          <a
            href="#standards"
            className="hover:text-amber-400 transition-colors cursor-pointer py-1"
          >
            MYBA Standards
          </a>
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Greek Law 4926/2022 Certified</span>
          </div>

          <button
            onClick={() => onOpenInquiry()}
            className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-600 rounded-full" />
            <span className="relative block px-5 py-2 rounded-full bg-[#070B14] group-hover:bg-opacity-80 transition-all text-xs font-semibold tracking-wider uppercase text-amber-300 flex items-center gap-1.5">
              Request Charter
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => onOpenInquiry()}
            className="px-3 py-1.5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs uppercase"
          >
            Inquire
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0F1F] border-b border-white/10 px-6 py-6 mt-3 space-y-4">
          <a
            href="#fleet"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base text-slate-200 hover:text-amber-400"
          >
            Curated Fleet
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base text-slate-200 hover:text-amber-400"
          >
            APA & VAT Calculator
          </a>
          <a
            href="#itineraries"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base text-slate-200 hover:text-amber-400"
          >
            Curated Itineraries
          </a>
          <a
            href="#fleet-managers"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base text-amber-300 font-medium"
          >
            Central Agency & Fleet Managers
          </a>
          <a
            href="#standards"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base text-slate-200 hover:text-amber-400"
          >
            MYBA & Maritime Regulations
          </a>
        </div>
      )}
    </header>
  );
}
