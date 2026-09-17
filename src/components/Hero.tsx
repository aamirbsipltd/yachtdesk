"use client";

import React, { useState } from "react";
import { Search, Compass, Users, SlidersHorizontal, CheckCircle2, Anchor } from "lucide-react";

interface HeroProps {
  onSearch: (filters: {
    region: string;
    category: string;
    guests: number;
    maxBudget: number;
  }) => void;
  onOpenInquiry: () => void;
}

export default function Hero({ onSearch, onOpenInquiry }: HeroProps) {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [guestCount, setGuestCount] = useState(8);
  const [budgetCap, setBudgetCap] = useState(150000);

  const handleSearchClick = () => {
    onSearch({
      region: selectedRegion,
      category: selectedCategory,
      guests: guestCount,
      maxBudget: budgetCap,
    });
    const element = document.getElementById("fleet");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-[#F8FAFC]">
      {/* End-to-End Cinematic Hero Banner */}
      <div className="relative w-full min-h-[580px] lg:min-h-[680px] flex flex-col justify-between pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Full-width Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/aegean-odyssey.jpg"
            alt="Mediterranean Luxury Superyacht in the Cyclades"
            className="w-full h-full object-cover object-[center_35%]"
          />
          {/* Gentle cinematic overlay for text legibility without turning dark */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/40" />
          {/* Seamless fade to light page canvas at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/60 to-transparent pointer-events-none" />
        </div>

        {/* Hero Headline & Value Props */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-5 pt-8 my-auto">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-wider uppercase shadow-md">
            <Anchor className="w-3.5 h-3.5 text-amber-300" />
            <span>The Mediterranean Algorithmic Charter Desk</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow-md leading-[1.1]">
            Direct-to-Fleet <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-amber-200">
              Mediterranean Charters
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-100 max-w-2xl mx-auto leading-relaxed drop-shadow font-medium">
            Connecting private charterers directly to certified Central Agency fleets across Athens, Mykonos, Corfu & Monaco. 100% transparent Greek Law 4926/2022 VAT & APA calculations with zero retail broker markups.
          </p>

          {/* Key Trust Pillars */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-100 font-semibold drop-shadow-sm">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Standard MYBA Worldwide Agreement
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-300" />
              Transparent 12% Greek Maritime VAT
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
              Verified e-Mitroo Commercial Vessels
            </span>
          </div>
        </div>

        {/* Floating Interactive Search Deck (Integrated Seamlessly in Banner Flow) */}
        <div className="relative z-20 max-w-5xl w-full mx-auto mt-8">
          <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-2xl shadow-sky-950/20 border border-slate-200/90">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Region selector */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#0284C7]" />
                  Cruising Region
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#0284C7] shadow-sm cursor-pointer"
                >
                  <option value="all">All Mediterranean Destinations</option>
                  <option value="Cyclades">Cyclades (Mykonos, Santorini, Paros)</option>
                  <option value="Ionian">Ionian (Corfu, Paxos, Lefkada)</option>
                  <option value="Saronic">Saronic & Peloponnese (Athens, Hydra)</option>
                  <option value="Dodecanese">Dodecanese & Rhodes</option>
                  <option value="French Riviera">French Riviera & Monaco</option>
                </select>
              </div>

              {/* Category selector */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#0284C7]" />
                  Vessel Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#0284C7] shadow-sm cursor-pointer"
                >
                  <option value="all">All Vessel Classes</option>
                  <option value="motor">Motor Superyachts (30m–45m)</option>
                  <option value="mega">Tri-Deck Mega Yachts (50m+)</option>
                  <option value="catamaran">Luxury Catamarans (Sunreef/Lagoon)</option>
                  <option value="sailing">High-Performance Sailing Yachts</option>
                </select>
              </div>

              {/* Guests selector */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#0284C7]" />
                  Guests (SOLAS Max 12)
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#0284C7] shadow-sm cursor-pointer"
                >
                  <option value={4}>Up to 4 Guests (2 Cabins)</option>
                  <option value={6}>Up to 6 Guests (3 Cabins)</option>
                  <option value={8}>Up to 8 Guests (4 Cabins)</option>
                  <option value={10}>Up to 10 Guests (5 Cabins)</option>
                  <option value={12}>Up to 12 Guests (6+ Cabins)</option>
                </select>
              </div>

              {/* Search CTA */}
              <div className="flex flex-col justify-end">
                <button
                  onClick={handleSearchClick}
                  className="w-full py-2.5 px-6 rounded-xl aegean-btn font-bold text-sm uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-sky-900/20 cursor-pointer"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                  Query Fleet
                </button>
              </div>
            </div>

            {/* Quick Filter Bar */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3 text-slate-500 font-medium">
                <span className="font-bold text-slate-700">Quick Filters:</span>
                <button
                  onClick={() => { setSelectedCategory("catamaran"); handleSearchClick(); }}
                  className="px-2.5 py-1 rounded-md bg-sky-50 hover:bg-sky-100 text-sky-800 transition-colors font-semibold"
                >
                  Crewed Catamarans (&lt;€60k)
                </button>
                <button
                  onClick={() => { setSelectedRegion("Cyclades"); handleSearchClick(); }}
                  className="px-2.5 py-1 rounded-md bg-sky-50 hover:bg-sky-100 text-sky-800 transition-colors font-semibold"
                >
                  Cyclades Stabilized
                </button>
                <button
                  onClick={() => { setSelectedCategory("mega"); handleSearchClick(); }}
                  className="px-2.5 py-1 rounded-md bg-sky-50 hover:bg-sky-100 text-sky-800 transition-colors font-semibold"
                >
                  50m+ with Helipad
                </button>
              </div>

              <div className="text-[#02509A] font-bold">
                Direct Net Rates: €30,000 to €350,000+ / week
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
