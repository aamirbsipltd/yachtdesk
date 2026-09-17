"use client";

import React, { useState } from "react";
import { ITINERARY_PRESETS } from "@/data/yachts";
import { Compass } from "lucide-react";

interface ItineraryGuidesProps {
  onOpenInquiry: (itineraryName?: string) => void;
}

export default function ItineraryGuides({ onOpenInquiry }: ItineraryGuidesProps) {
  const [activeItineraryId, setActiveItineraryId] = useState(ITINERARY_PRESETS[0].id);

  const activeItinerary = ITINERARY_PRESETS.find((it) => it.id === activeItineraryId) || ITINERARY_PRESETS[0];

  return (
    <section id="itineraries" className="py-24 relative bg-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-sky-200 text-[#02509A] text-xs font-bold tracking-wider uppercase shadow-sm">
            <Compass className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>Curated Mediterranean Passages</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B1E36] tracking-tight">
            Handcrafted 7-Day <span className="aegean-gradient-text">Charter Itineraries</span>
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
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
                  ? "aegean-btn border-[#02509A] shadow-xl shadow-sky-900/20"
                  : "bg-white text-slate-700 border-slate-200 hover:border-sky-300"
              }`}
            >
              {it.title.split(":")[0]}
            </button>
          ))}
        </div>

        {/* Itinerary Card Layout */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 max-w-5xl mx-auto space-y-8 shadow-xl shadow-sky-950/5">
          {/* Header Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold text-[#02509A] uppercase tracking-widest">
                {activeItinerary.region} • {activeItinerary.days} Days / 7 Nights
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0B1E36] mt-1">
                {activeItinerary.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                <strong>Embark:</strong> {activeItinerary.embarkation} → <strong>Disembark:</strong> {activeItinerary.disembarkation}
              </p>
            </div>

            <button
              onClick={() => onOpenInquiry(`Itinerary: ${activeItinerary.title}`)}
              className="py-3 px-6 rounded-xl aegean-btn font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-900/20 hover:opacity-95 transition-opacity self-start md:self-auto cursor-pointer"
            >
              Request Custom Quote For This Route
            </button>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeItinerary.daysList.map((day) => (
              <div
                key={day.day}
                className="p-4 rounded-2xl bg-sky-50/40 border border-sky-100 hover:border-sky-300 transition-all group"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-[#02509A] text-white text-xs font-black flex items-center justify-center font-mono">
                    {day.day}
                  </span>
                  <h4 className="text-sm font-bold text-[#0B1E36] group-hover:text-[#02509A] transition-colors">
                    {day.port}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-8">
                  {day.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>*All itineraries are customized by your private Captain based on weather and Meltemi forecasts.</span>
            <span className="text-[#02509A] font-bold flex items-center gap-1">
              Bespoke Tender Transfers Available
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
