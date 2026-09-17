"use client";

import React, { useState } from "react";
import { Search, Compass, Calendar, Users, SlidersHorizontal, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

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
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-sky-900/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-amber-500/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>The Mediterranean Algorithmic Charter Desk</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Direct-to-Fleet <br className="hidden sm:block" />
            <span className="gold-gradient-text">Luxury Yacht Charters</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Eliminating opaque retail broker layers. Connecting private charterers directly to certified Central Agency fleets across Athens, the Cyclades, Ionian, and the French Riviera.
          </p>

          {/* Quick value badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Standard MYBA Contract Terms
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              Transparent Greek Law 4926 VAT & APA
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              Verified e-Mitroo Commercial Vessels
            </span>
          </div>
        </div>

        {/* Global Search & Filtration Engine */}
        <div className="mt-12 max-w-5xl mx-auto glass-panel-gold rounded-2xl p-4 sm:p-6 shadow-2xl shadow-black/60 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Region selector */}
            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                Cruising Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
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
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                Vessel Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
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
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                Guests (SOLAS Max 12)
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
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
                className="w-full py-2.5 px-6 rounded-xl gold-gradient-bg text-slate-950 font-bold text-sm uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                Query Fleet
              </button>
            </div>
          </div>

          {/* Quick Filter Bar */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 text-slate-400">
              <span className="font-semibold text-slate-300">Quick Filters:</span>
              <button
                onClick={() => { setSelectedCategory("catamaran"); handleSearchClick(); }}
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
              >
                Crewed Catamarans (&lt;€60k)
              </button>
              <button
                onClick={() => { setSelectedRegion("Cyclades"); handleSearchClick(); }}
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
              >
                Cyclades Stabilized
              </button>
              <button
                onClick={() => { setSelectedCategory("mega"); handleSearchClick(); }}
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
              >
                50m+ with Helipad
              </button>
            </div>

            <div className="text-amber-400 font-medium">
              Indicative Budget: €30,000 to €350,000+ / week
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
