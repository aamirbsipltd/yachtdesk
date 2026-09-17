"use client";

import React, { useState } from "react";
import Image from "next/image";
import { YACHTS_DATA, Yacht } from "@/data/yachts";
import { Users, Bed, Anchor, Gauge, Waves, ShieldCheck, ArrowUpRight, Sparkles, X, Check, FileDown, Fuel } from "lucide-react";

interface FleetGridProps {
  onOpenInquiry: (yachtName?: string) => void;
  filterRegion?: string;
  filterCategory?: string;
  filterGuests?: number;
  filterMaxBudget?: number;
}

export default function FleetGrid({
  onOpenInquiry,
  filterRegion = "all",
  filterCategory = "all",
  filterGuests = 12,
  filterMaxBudget = 350000,
}: FleetGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>(filterCategory);
  const [selectedYacht, setSelectedYacht] = useState<Yacht | null>(null);

  // Filter yachts based on state
  const filteredYachts = YACHTS_DATA.filter((yacht) => {
    if (activeCategory !== "all" && yacht.category !== activeCategory) return false;
    if (filterRegion !== "all" && !yacht.cruisingAreas.some((a) => a.toLowerCase().includes(filterRegion.toLowerCase()))) {
      return false;
    }
    if (yacht.guests < filterGuests && filterGuests > 8) return false;
    if (yacht.weeklyRateLow > filterMaxBudget) return false;
    return true;
  });

  return (
    <section id="fleet" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
              <Anchor className="w-3.5 h-3.5 text-amber-400" />
              <span>Verified Central Agency Inventory</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Curated Mediterranean <span className="gold-gradient-text">Charter Fleet</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Every yacht carries active commercial registration on Greece’s <em>e-Mitroo</em> and is managed under exclusive Central Agency agreements with licensed MYBA brokers.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs">
            {[
              { key: "all", label: "All Vessels" },
              { key: "motor", label: "Motor Superyachts" },
              { key: "mega", label: "Mega Yachts (50m+)" },
              { key: "catamaran", label: "Luxury Catamarans" },
              { key: "sailing", label: "Sailing Yachts" },
            ].map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3.5 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                  activeCategory === cat.key
                    ? "bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Yacht Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredYachts.map((yacht) => (
            <div
              key={yacht.id}
              className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all duration-300 group flex flex-col hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/5"
            >
              {/* Image & Badges */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-950">
                <img
                  src={yacht.heroImage}
                  alt={yacht.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-black/40" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/30 font-semibold tracking-wider uppercase text-[10px]">
                    {yacht.lengthM}m / {yacht.lengthFt}ft • {yacht.builder}
                  </span>
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/30 text-[10px] font-medium">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    e-Mitroo Verified
                  </span>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-amber-300 transition-colors">
                    {yacht.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1">
                    <Anchor className="w-3 h-3 text-amber-400" />
                    {yacht.homePort}
                  </p>
                </div>
              </div>

              {/* Specs Bar */}
              <div className="grid grid-cols-4 py-3 px-4 bg-slate-950/60 border-y border-white/5 text-center text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Guests</div>
                  <div className="font-bold text-white flex items-center justify-center gap-1 mt-0.5">
                    <Users className="w-3 h-3 text-amber-400" />
                    {yacht.guests}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Cabins</div>
                  <div className="font-bold text-white flex items-center justify-center gap-1 mt-0.5">
                    <Bed className="w-3 h-3 text-amber-400" />
                    {yacht.cabins}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Crew</div>
                  <div className="font-bold text-white flex items-center justify-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3 h-3 text-amber-400" />
                    {yacht.crew}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Cruising</div>
                  <div className="font-bold text-white flex items-center justify-center gap-1 mt-0.5">
                    <Gauge className="w-3 h-3 text-amber-400" />
                    {yacht.cruisingSpeedKnots} kn
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                {/* Amenity tags */}
                <div className="flex flex-wrap gap-1.5">
                  {yacht.amenities.slice(0, 3).map((amenity, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-slate-300"
                    >
                      {amenity}
                    </span>
                  ))}
                  {yacht.amenities.length > 3 && (
                    <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-amber-400">
                      +{yacht.amenities.length - 3} more
                    </span>
                  )}
                </div>

                {/* Rate & Actions */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                      Weekly Charter Rate
                    </div>
                    <div className="text-lg font-extrabold text-amber-400 font-mono">
                      €{yacht.weeklyRateLow.toLocaleString()}{" "}
                      <span className="text-xs text-slate-400 font-normal font-sans">
                        - €{yacht.weeklyRateHigh.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      + 12% Greek VAT • + {yacht.apaRatePercent}% APA
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedYacht(yacht)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="View Full Technical Deck & Water Toys"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onOpenInquiry(yacht.name)}
                      className="py-2 px-3.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity shadow-md shadow-amber-500/20 cursor-pointer"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Yacht Modal */}
      {selectedYacht && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#090E1D] border border-amber-500/30 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl my-8">
            {/* Close Button */}
            <button
              onClick={() => setSelectedYacht(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-1 mb-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                {selectedYacht.builder} • Delivered {selectedYacht.yearBuilt}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedYacht.name}
              </h2>
              <p className="text-xs text-slate-400">
                Home Port: {selectedYacht.homePort} • Cruising Areas: {selectedYacht.cruisingAreas.join(", ")}
              </p>
            </div>

            {/* Main Image */}
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden mb-6 bg-slate-950">
              <img
                src={selectedYacht.heroImage}
                alt={selectedYacht.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 px-4 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                <div className="text-xs text-slate-400">Charter Rate from:</div>
                <div className="text-xl font-bold text-amber-400 font-mono">
                  €{selectedYacht.weeklyRateLow.toLocaleString()} - €{selectedYacht.weeklyRateHigh.toLocaleString()} / week
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {selectedYacht.description}
            </p>

            {/* Two-column detailed specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-sm">
              <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/5">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider text-amber-400">
                  Cabin Layout & Guest Capacities
                </h4>
                <div className="text-xs text-slate-300 space-y-1">
                  <div><strong>Cabins:</strong> {selectedYacht.cabins} Staterooms</div>
                  <div><strong>Cabin Config:</strong> {selectedYacht.cabinConfig}</div>
                  <div><strong>Licensed Guests:</strong> {selectedYacht.guests} (SOLAS Compliance)</div>
                  <div><strong>Permanent Crew:</strong> {selectedYacht.crew} (Captain, Chef, Deckhands, Hostesses)</div>
                </div>
              </div>

              <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/5">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider text-amber-400">
                  Engineering & Performance
                </h4>
                <div className="text-xs text-slate-300 space-y-1">
                  <div><strong>Length Overall (LOA):</strong> {selectedYacht.lengthM} m ({selectedYacht.lengthFt} ft)</div>
                  <div><strong>Cruising Speed:</strong> {selectedYacht.cruisingSpeedKnots} knots</div>
                  <div><strong>Fuel Consumption:</strong> {selectedYacht.fuelConsumptionLph} Litres / hour</div>
                  <div><strong>Central Agency:</strong> {selectedYacht.centralAgent.name} ({selectedYacht.centralAgent.location})</div>
                </div>
              </div>
            </div>

            {/* Water Toys & Amenities */}
            <div className="space-y-4 mb-8">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5 text-amber-400">
                <Waves className="w-4 h-4 text-amber-400" />
                Water Toys & Tender Manifest
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedYacht.toys.map((toy, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-300 bg-white/5 px-3 py-2 rounded-lg">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{toy}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                Under standard MYBA Terms. Direct booking with Zero Retail Markup.
              </div>
              <button
                onClick={() => {
                  setSelectedYacht(null);
                  onOpenInquiry(selectedYacht.name);
                }}
                className="w-full sm:w-auto py-3 px-8 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:opacity-95 transition-opacity cursor-pointer"
              >
                Inquire For {selectedYacht.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
