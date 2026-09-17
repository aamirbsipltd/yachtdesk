"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Anchor, ShieldCheck, Compass, Menu, X, ChevronRight, Briefcase, Tag, Ship } from "lucide-react";

interface NavbarProps {
  onOpenInquiry: (yachtName?: string) => void;
}

export default function Navbar({ onOpenInquiry }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const isSales = pathname.startsWith("/sales");
  const isSell = pathname === "/sell";
  const isOps = pathname === "/operations";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md shadow-sky-950/5 py-3"
          : "bg-white/85 backdrop-blur-sm border-b border-slate-200/60 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#02509A] via-[#0284C7] to-[#0369A1] flex items-center justify-center shadow-md shadow-sky-900/20 group-hover:scale-105 transition-transform">
            <Anchor className="w-5 h-5 text-white stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-widest text-[#0B1E36] uppercase flex items-center gap-1">
              YACHT<span className="text-[#0284C7]">DESK</span>
            </span>
            <span className="text-[10px] tracking-[0.25em] text-slate-500 uppercase font-semibold">
              Charter & Sale / Purchase
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold">
          <Link
            href="/#fleet"
            className={`transition-colors py-1 flex items-center gap-1.5 ${
              isHome ? "text-[#02509A] font-bold" : "text-slate-700 hover:text-[#02509A]"
            }`}
          >
            <Ship className="w-4 h-4 text-[#0284C7]" />
            Charter Fleet
          </Link>

          <Link
            href="/sales"
            className={`transition-colors py-1 flex items-center gap-1.5 ${
              isSales ? "text-[#02509A] font-bold" : "text-slate-700 hover:text-[#02509A]"
            }`}
          >
            <Tag className="w-4 h-4 text-[#D4AF37]" />
            Yachts for Sale
          </Link>

          <Link
            href="/sell"
            className={`transition-colors py-1 flex items-center gap-1.5 ${
              isSell ? "text-[#02509A] font-bold" : "text-slate-700 hover:text-[#02509A]"
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
            Sell a Yacht
          </Link>

          <Link
            href="/operations"
            className={`transition-colors py-1 px-3 rounded-full flex items-center gap-1.5 ${
              isOps
                ? "bg-sky-50 text-[#02509A] font-extrabold border border-sky-200"
                : "text-slate-700 hover:text-[#02509A] hover:bg-slate-50"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-[#0284C7]" />
            Operations Console
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-900 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-full shadow-sm">
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
            className="px-3 py-1.5 rounded-full aegean-btn text-white font-bold text-xs uppercase cursor-pointer"
          >
            Inquire
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-950 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 mt-3 space-y-4 shadow-xl">
          <Link
            href="/#fleet"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-base font-semibold text-slate-800 hover:text-[#02509A]"
          >
            <Ship className="w-4 h-4 text-[#0284C7]" />
            Charter Fleet
          </Link>
          <Link
            href="/sales"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-base font-semibold text-slate-800 hover:text-[#02509A]"
          >
            <Tag className="w-4 h-4 text-[#D4AF37]" />
            Yachts for Sale
          </Link>
          <Link
            href="/sell"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-base font-semibold text-slate-800 hover:text-[#02509A]"
          >
            <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
            Sell a Yacht (Central Agency)
          </Link>
          <Link
            href="/operations"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-base font-bold text-[#02509A]"
          >
            <Briefcase className="w-4 h-4 text-[#0284C7]" />
            Operations Console
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </Link>
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-2.5 rounded-full aegean-btn text-xs font-bold uppercase tracking-wider text-center"
            >
              Request Charter or S&P Viewing
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
