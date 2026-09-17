"use client";

import React, { useState } from "react";
import { ITINERARY_PRESETS } from "@/data/yachts";
import { Compass, MapPin, Calendar, Sun, Waves, Sparkles, ChevronRight } from "lucide-react";

interface ItineraryGuidesProps {
  onOpenInquiry: (itineraryName?: string) => void;
}

export default function ItineraryGuides({ onOpenInquiry }: ItineraryGuidesProps) {
  const [activeItineraryId, setActiveItineraryId] = useState(ITINERARY_PRESETS[0].id);

  const activeItinerary = ITINERARY_PRESETS.find((it) => it.id === activeItineraryId) || ITINERARY_PRESETS[0];

  return (
    <section id="itineraries" className="py-24 relative bg-[#060A16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Curated Mediterranean Passages</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Handcrafted 7-Day <span className="gold-gradient-text">Charter Itineraries</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Engineered around prevailing Greek Meltemi summer winds, secluded anchorages, private tenders, and Michelin-caliber island dining.
          </p>
        </div>

        {/* Itinerary Selectors */}
        <div className="flex justify-center gap-3 mb-12">
          {ITINERARY_PRESETS.map((it) => (
            <button
              key={it.id}
              onClick={() => setActiveItineraryId(it.id)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all cursor-pointer border ${
                activeItineraryId === it.id
                  ? "bg-amber-400 text-slate-950 border-amber-400 shadow-xl shadow-amber-500/20"
                  : "glass-panel text-slate-400 border-white/10 hover:text-white"
              }`}
            >
              {it.title.split(":")[0]}
            </button>
          ))}
        </div>

        {/* Itinerary Card Layout */}
        <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
          {/* Header Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                {activeItinerary.region} • {activeItinerary.days} Days / 7 Nights
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {activeItinerary.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                <strong>Embark:</strong> {activeItinerary.embarkation} → <strong>Disembark:</strong> {activeItinerary.disembarkation}
              </p>
            </div>

            <button
              onClick={() => onOpenInquiry(`Itinerary: ${activeItinerary.title}`)}
              className="py-3 px-6 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:opacity-95 transition-opacity self-start md:self-auto cursor-pointer"
            >
              Request Custom Quote For This Route
            </button>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeItinerary.daysList.map((day) => (
              <div
                key={day.day}
                className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-amber-400/30 transition-all group"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center justify-center font-mono">
                    {day.day}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {day.port}
                  </h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-8">
                  {day.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>*All itineraries are customized by your private Captain based on weather and Meltemi forecasts.</span>
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              Bespoke Tender Transfers Available
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
