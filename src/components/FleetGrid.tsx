"use client";

import React, { useState } from "react";
import { YACHTS_DATA, Yacht } from "@/data/yachts";
import { Users, Bed, Anchor, Gauge, Waves, ShieldCheck, ArrowUpRight, X, Check, Fuel } from "lucide-react";

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
    <section id="fleet" className="py-24 relative bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#02509A] text-xs font-bold tracking-wider uppercase shadow-sm">
              <Anchor className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Verified Central Agency Inventory</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B1E36] tracking-tight">
              Curated Mediterranean <span className="aegean-gradient-text">Charter Fleet</span>
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              Every yacht carries active commercial registration on Greece’s <em>e-Mitroo</em> and is managed under exclusive Central Agency agreements with licensed MYBA brokers.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-white border border-slate-200 text-xs shadow-sm">
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
                className={`px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                  activeCategory === cat.key
                    ? "aegean-btn shadow-md shadow-sky-900/10"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
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
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-sky-400/60 transition-all duration-300 group flex flex-col hover:-translate-y-1.5 shadow-lg shadow-sky-950/5 hover:shadow-2xl hover:shadow-sky-900/10"
            >
              {/* Image & Badges */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                <img
                  src={yacht.heroImage}
                  alt={yacht.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/90 via-transparent to-black/30" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 border border-white font-bold tracking-wider uppercase text-[10px] shadow-sm">
                    {yacht.lengthM}m / {yacht.lengthFt}ft • {yacht.builder}
                  </span>
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-900/80 backdrop-blur-md text-emerald-200 border border-emerald-400/40 text-[10px] font-semibold shadow-sm">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    e-Mitroo Verified
                  </span>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-black text-white tracking-wide group-hover:text-sky-200 transition-colors">
                    {yacht.name}
                  </h3>
                  <p className="text-xs text-sky-100 mt-0.5 flex items-center gap-1">
                    <Anchor className="w-3 h-3 text-sky-300" />
                    {yacht.homePort}
                  </p>
                </div>
              </div>

              {/* Specs Bar */}
              <div className="grid grid-cols-4 py-3 px-4 bg-sky-50/70 border-y border-sky-100 text-center text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Guests</div>
                  <div className="font-bold text-[#0B1E36] flex items-center justify-center gap-1 mt-0.5">
                    <Users className="w-3 h-3 text-[#0284C7]" />
                    {yacht.guests}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Cabins</div>
                  <div className="font-bold text-[#0B1E36] flex items-center justify-center gap-1 mt-0.5">
                    <Bed className="w-3 h-3 text-[#0284C7]" />
                    {yacht.cabins}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Crew</div>
                  <div className="font-bold text-[#0B1E36] flex items-center justify-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3 h-3 text-[#0284C7]" />
                    {yacht.crew}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Cruising</div>
                  <div className="font-bold text-[#0B1E36] flex items-center justify-center gap-1 mt-0.5">
                    <Gauge className="w-3 h-3 text-[#0284C7]" />
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
                      className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-semibold text-slate-700"
                    >
                      {amenity}
                    </span>
                  ))}
                  {yacht.amenities.length > 3 && (
                    <span className="px-2.5 py-1 rounded-md bg-sky-50 border border-sky-200 text-[11px] font-bold text-[#02509A]">
                      +{yacht.amenities.length - 3} more
                    </span>
                  )}
                </div>

                {/* Rate & Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                      Weekly Charter Rate
                    </div>
                    <div className="text-xl font-black text-[#02509A] font-mono">
                      €{yacht.weeklyRateLow.toLocaleString()}{" "}
                      <span className="text-xs text-slate-500 font-normal font-sans">
                        - €{yacht.weeklyRateHigh.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      + 12% Greek VAT • + {yacht.apaRatePercent}% APA
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedYacht(yacht)}
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer border border-slate-200"
                      title="View Full Technical Deck & Water Toys"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onOpenInquiry(yacht.name)}
                      className="py-2.5 px-4 rounded-xl aegean-btn font-bold text-xs uppercase tracking-wider shadow-md shadow-sky-900/10 hover:opacity-95 transition-opacity cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl my-8">
            {/* Close Button */}
            <button
              onClick={() => setSelectedYacht(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-1 mb-6">
              <span className="text-xs font-bold text-[#02509A] uppercase tracking-widest">
                {selectedYacht.builder} • Delivered {selectedYacht.yearBuilt}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E36]">
                {selectedYacht.name}
              </h2>
              <p className="text-xs text-slate-500">
                Home Port: {selectedYacht.homePort} • Cruising Areas: {selectedYacht.cruisingAreas.join(", ")}
              </p>
            </div>

            {/* Main Image */}
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-inner">
              <img
                src={selectedYacht.heroImage}
                alt={selectedYacht.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg">
                <div className="text-xs text-slate-500 font-medium">Charter Rate from:</div>
                <div className="text-xl font-black text-[#02509A] font-mono">
                  €{selectedYacht.weeklyRateLow.toLocaleString()} - €{selectedYacht.weeklyRateHigh.toLocaleString()} / week
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-700 leading-relaxed mb-6">
              {selectedYacht.description}
            </p>

            {/* Two-column detailed specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-sm">
              <div className="space-y-3 p-4 rounded-xl bg-sky-50/50 border border-sky-100">
                <h4 className="font-bold text-[#02509A] uppercase text-xs tracking-wider">
                  Cabin Layout & Guest Capacities
                </h4>
                <div className="text-xs text-slate-700 space-y-1 font-medium">
                  <div><strong>Cabins:</strong> {selectedYacht.cabins} Staterooms</div>
                  <div><strong>Cabin Config:</strong> {selectedYacht.cabinConfig}</div>
                  <div><strong>Licensed Guests:</strong> {selectedYacht.guests} (SOLAS Compliance)</div>
                  <div><strong>Permanent Crew:</strong> {selectedYacht.crew} (Captain, Chef, Deckhands, Hostesses)</div>
                </div>
              </div>

              <div className="space-y-3 p-4 rounded-xl bg-sky-50/50 border border-sky-100">
                <h4 className="font-bold text-[#02509A] uppercase text-xs tracking-wider">
                  Engineering & Performance
                </h4>
                <div className="text-xs text-slate-700 space-y-1 font-medium">
                  <div><strong>Length Overall (LOA):</strong> {selectedYacht.lengthM} m ({selectedYacht.lengthFt} ft)</div>
                  <div><strong>Cruising Speed:</strong> {selectedYacht.cruisingSpeedKnots} knots</div>
                  <div><strong>Fuel Consumption:</strong> {selectedYacht.fuelConsumptionLph} Litres / hour</div>
                  <div><strong>Central Agency:</strong> {selectedYacht.centralAgent.name} ({selectedYacht.centralAgent.location})</div>
                </div>
              </div>
            </div>

            {/* Water Toys & Amenities */}
            <div className="space-y-4 mb-8">
              <h4 className="font-bold text-[#02509A] text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-[#0284C7]" />
                Water Toys & Tender Manifest
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedYacht.toys.map((toy, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{toy}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 font-medium">
                Under standard MYBA Terms. Direct booking with Zero Retail Markup.
              </div>
              <button
                onClick={() => {
                  setSelectedYacht(null);
                  onOpenInquiry(selectedYacht.name);
                }}
                className="w-full sm:w-auto py-3 px-8 rounded-xl aegean-btn font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-900/20 hover:opacity-95 transition-opacity cursor-pointer"
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
