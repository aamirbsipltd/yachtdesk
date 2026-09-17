"use client";

import React, { useState } from "react";
import { Calculator, Info, FileText } from "lucide-react";

interface CostCalculatorProps {
  onOpenInquiry: (initialBudget?: number) => void;
}

export default function CostCalculator({ onOpenInquiry }: CostCalculatorProps) {
  const [baseRate, setBaseRate] = useState<number>(85000);
  const [durationDays, setDurationDays] = useState<number>(7);
  const [cruisingStyle, setCruisingStyle] = useState<"relaxed" | "active" | "highSpeed">("active");

  // APA percentage based on cruising pace (fuel consumption)
  const apaPercent = cruisingStyle === "relaxed" ? 25 : cruisingStyle === "active" ? 30 : 35;
  const greekVatPercent = 12; // Law 4926/2022 standard Category II rate

  // Pro-rate for duration: weekly rate / 7 * days
  const effectiveBase = Math.round((baseRate / 7) * durationDays);
  const vatAmount = Math.round((effectiveBase * greekVatPercent) / 100);
  const apaAmount = Math.round((effectiveBase * apaPercent) / 100);
  const totalEstimatedWire = effectiveBase + vatAmount + apaAmount;

  return (
    <section id="calculator" className="py-24 bg-gradient-to-b from-[#F1F5F9] via-white to-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#02509A] text-xs font-bold tracking-wider uppercase shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>Institutional Financial Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B1E36] tracking-tight">
            Live Charter Cost & <span className="aegean-gradient-text">APA Calculator</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            In luxury yachting, retail brokers frequently hide taxes, fuel, and provisioning behind inflated markups. YachtDesk calculates your true, itemized charter investment down to the euro under standard MYBA rules.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-200 shadow-xl shadow-sky-950/5">
            <h3 className="text-lg font-bold text-[#0B1E36] flex items-center justify-between">
              <span>Charter Parameters</span>
              <span className="text-xs text-[#02509A] uppercase tracking-widest font-mono font-bold bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                MYBA Guidelines
              </span>
            </h3>

            {/* Base Rate Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="text-slate-700 font-bold">Weekly Base Charter Rate (Net)</label>
                <span className="text-2xl font-black text-[#02509A] font-mono">
                  €{baseRate.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={30000}
                max={300000}
                step={5000}
                value={baseRate}
                onChange={(e) => setBaseRate(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#02509A]"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>€30,000 (Catamaran)</span>
                <span>€150,000 (Tri-Deck)</span>
                <span>€300,000+ (Mega)</span>
              </div>
            </div>

            {/* Duration Selector */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Charter Duration</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { days: 7, label: "7 Days (1 Week)" },
                  { days: 10, label: "10 Days" },
                  { days: 14, label: "14 Days (2 Weeks)" },
                ].map((item) => (
                  <button
                    key={item.days}
                    type="button"
                    onClick={() => setDurationDays(item.days)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      durationDays === item.days
                        ? "bg-sky-50 border-[#0284C7] text-[#02509A] shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cruising Style & Fuel Consumption */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label className="font-bold text-slate-700">
                  Cruising Pace (APA Fuel Allocation)
                </label>
                <span className="text-xs text-[#02509A] font-mono font-bold">APA {apaPercent}%</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setCruisingStyle("relaxed")}
                  className={`p-3 rounded-xl text-xs text-left border transition-all cursor-pointer ${
                    cruisingStyle === "relaxed"
                      ? "bg-sky-50 border-[#0284C7] text-[#02509A]"
                      : "bg-slate-50 border-slate-200 text-slate-600"
                  }`}
                >
                  <div className="font-bold">Serene Bay</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 font-medium">Anchored, low fuel (25%)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setCruisingStyle("active")}
                  className={`p-3 rounded-xl text-xs text-left border transition-all cursor-pointer ${
                    cruisingStyle === "active"
                      ? "bg-sky-50 border-[#0284C7] text-[#02509A]"
                      : "bg-slate-50 border-slate-200 text-slate-600"
                  }`}
                >
                  <div className="font-bold">Island Hopper</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 font-medium">Cyclades daily cruise (30%)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setCruisingStyle("highSpeed")}
                  className={`p-3 rounded-xl text-xs text-left border transition-all cursor-pointer ${
                    cruisingStyle === "highSpeed"
                      ? "bg-sky-50 border-[#0284C7] text-[#02509A]"
                      : "bg-slate-50 border-slate-200 text-slate-600"
                  }`}
                >
                  <div className="font-bold">Rapid Transit</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 font-medium">Fast planing (35%)</div>
                </button>
              </div>
            </div>

            {/* Note box */}
            <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 flex items-start gap-2.5 text-xs text-sky-950 font-medium">
              <Info className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
              <span>
                <strong>Zero Retail Markup Guarantee:</strong> YachtDesk contracts directly with Central Agency managers at net rates. You never pay retail broker markups.
              </span>
            </div>
          </div>

          {/* Breakdown & Totals Column */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 space-y-6 border border-sky-200 shadow-2xl shadow-sky-900/10 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                Itemized Charter Wire Breakdown
              </span>
              <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-md font-bold">
                Official MYBA Proforma
              </span>
            </div>

            <div className="space-y-4 text-sm">
              {/* Base Fee */}
              <div className="flex justify-between items-center py-1">
                <div>
                  <div className="font-bold text-[#0B1E36]">Base Vessel Hire ({durationDays} Days)</div>
                  <div className="text-xs text-slate-500">Covers yacht, Captain & crew wages, marine insurance</div>
                </div>
                <div className="text-lg font-black text-[#0B1E36] font-mono">
                  €{effectiveBase.toLocaleString()}
                </div>
              </div>

              {/* Greek VAT */}
              <div className="flex justify-between items-center py-1 border-t border-slate-100">
                <div>
                  <div className="font-bold text-[#0B1E36] flex items-center gap-1.5">
                    Greek Maritime VAT ({greekVatPercent}%)
                    <span className="text-[10px] text-[#02509A] bg-sky-50 border border-sky-200 px-1.5 py-0.2 rounded font-bold">
                      Law 4926/2022
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">Reduced 12% statutory rate for registered commercial charters</div>
                </div>
                <div className="text-lg font-black text-[#0B1E36] font-mono">
                  €{vatAmount.toLocaleString()}
                </div>
              </div>

              {/* APA */}
              <div className="flex justify-between items-center py-1 border-t border-slate-100">
                <div>
                  <div className="font-bold text-[#0B1E36] flex items-center gap-1.5">
                    Advance Provisioning Allowance (APA {apaPercent}%)
                  </div>
                  <div className="text-xs text-slate-500">
                    Fuel, provisioning, dockage at Mykonos/Santorini, canal dues. Audited.
                  </div>
                </div>
                <div className="text-lg font-black text-[#02509A] font-mono">
                  €{apaAmount.toLocaleString()}
                </div>
              </div>

              {/* Retail Markup */}
              <div className="flex justify-between items-center py-1 border-t border-slate-100 text-emerald-600">
                <div className="font-bold">YachtDesk Retail Markup</div>
                <div className="text-lg font-black font-mono">€0.00 (Direct Rate)</div>
              </div>
            </div>

            {/* Total Highlight Box */}
            <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-widest text-slate-600 font-bold">
                  Total Estimated Wire Transfer
                </span>
                <span className="text-3xl font-black text-[#02509A] font-mono">
                  €{totalEstimatedWire.toLocaleString()}
                </span>
              </div>
              <div className="text-[11px] text-slate-600 leading-relaxed font-medium">
                *Includes 50% deposit upon MYBA signature, 50% balance + 100% VAT + 100% APA 30 days prior to embarkation into a regulated stakeholder escrow account. Unspent APA refunded in full at redelivery.
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => onOpenInquiry(totalEstimatedWire)}
              className="w-full py-3.5 px-6 rounded-xl aegean-btn font-black text-xs uppercase tracking-wider hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-sky-900/20 cursor-pointer"
            >
              <FileText className="w-4 h-4 stroke-[2.5]" />
              Generate Official MYBA Proposal Deck
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
