"use client";

import React, { useState } from "react";
import { Calculator, Info, ShieldAlert, CheckCircle, ArrowRight, HelpCircle, FileText } from "lucide-react";

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

  // Pro-rate for duration: weekly rate / 7 * days (or /6 for <7 days standard MYBA rule)
  const effectiveBase = Math.round((baseRate / 7) * durationDays);
  const vatAmount = Math.round((effectiveBase * greekVatPercent) / 100);
  const apaAmount = Math.round((effectiveBase * apaPercent) / 100);
  const totalEstimatedWire = effectiveBase + vatAmount + apaAmount;

  return (
    <section id="calculator" className="py-24 bg-gradient-to-b from-[#050811] via-[#080E1E] to-[#050811] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span>Institutional Financial Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Live Charter Cost & <span className="gold-gradient-text">APA Calculator</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            In luxury yachting, retail brokers frequently hide taxes, fuel, and provisioning behind inflated markups. YachtDesk calculates your true, itemized charter investment down to the euro under standard MYBA rules.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Controls Column */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-6 sm:p-8 space-y-6 border border-white/10">
            <h3 className="text-lg font-bold text-white flex items-center justify-between">
              <span>Charter Parameters</span>
              <span className="text-xs text-amber-400 uppercase tracking-widest font-mono">
                MYBA Guidelines
              </span>
            </h3>

            {/* Base Rate Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="text-slate-300 font-medium">Weekly Base Charter Rate (Net)</label>
                <span className="text-xl font-bold text-amber-400 font-mono">
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
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>€30,000 (Catamaran/Flybridge)</span>
                <span>€150,000 (Tri-Deck)</span>
                <span>€300,000+ (Mega)</span>
              </div>
            </div>

            {/* Duration Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Charter Duration</label>
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
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      durationDays === item.days
                        ? "bg-amber-400/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/10"
                        : "bg-slate-900 border-slate-700 text-slate-400 hover:text-white"
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
                <label className="font-medium text-slate-300">
                  Cruising Pace (Determines APA Fuel Allocation)
                </label>
                <span className="text-xs text-slate-400 font-mono">APA {apaPercent}%</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setCruisingStyle("relaxed")}
                  className={`p-3 rounded-xl text-xs text-left border transition-all cursor-pointer ${
                    cruisingStyle === "relaxed"
                      ? "bg-amber-400/20 border-amber-400 text-amber-300"
                      : "bg-slate-900 border-slate-700 text-slate-400"
                  }`}
                >
                  <div className="font-bold">Serene Bay</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Anchored coves, low fuel (25% APA)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setCruisingStyle("active")}
                  className={`p-3 rounded-xl text-xs text-left border transition-all cursor-pointer ${
                    cruisingStyle === "active"
                      ? "bg-amber-400/20 border-amber-400 text-amber-300"
                      : "bg-slate-900 border-slate-700 text-slate-400"
                  }`}
                >
                  <div className="font-bold">Island Hopper</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Cyclades daily cruise (30% APA)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setCruisingStyle("highSpeed")}
                  className={`p-3 rounded-xl text-xs text-left border transition-all cursor-pointer ${
                    cruisingStyle === "highSpeed"
                      ? "bg-amber-400/20 border-amber-400 text-amber-300"
                      : "bg-slate-900 border-slate-700 text-slate-400"
                  }`}
                >
                  <div className="font-bold">Rapid Transit</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">High-speed planing (35% APA)</div>
                </button>
              </div>
            </div>

            {/* Note box */}
            <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-800/50 flex items-start gap-2.5 text-xs text-sky-200">
              <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>
                <strong>Zero Retail Markup Guarantee:</strong> YachtDesk contracts directly with Central Agency managers at net rates. You never pay intermediate retail markups.
              </span>
            </div>
          </div>

          {/* Breakdown & Totals Column */}
          <div className="lg:col-span-6 glass-panel-gold rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Itemized Charter Wire Breakdown
              </span>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-md font-semibold">
                Official MYBA Proforma
              </span>
            </div>

            <div className="space-y-4 text-sm">
              {/* Base Fee */}
              <div className="flex justify-between items-center py-1">
                <div>
                  <div className="font-semibold text-white">Base Vessel Hire ({durationDays} Days)</div>
                  <div className="text-xs text-slate-400">Covers yacht, Captain & crew wages, marine insurance</div>
                </div>
                <div className="text-base font-bold text-white font-mono">
                  €{effectiveBase.toLocaleString()}
                </div>
              </div>

              {/* Greek VAT */}
              <div className="flex justify-between items-center py-1 border-t border-white/5">
                <div>
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    Greek Maritime VAT ({greekVatPercent}%)
                    <span className="text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded">
                      Law 4926/2022
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">Reduced 12% statutory rate for registered commercial charters</div>
                </div>
                <div className="text-base font-bold text-white font-mono">
                  €{vatAmount.toLocaleString()}
                </div>
              </div>

              {/* APA */}
              <div className="flex justify-between items-center py-1 border-t border-white/5">
                <div>
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    Advance Provisioning Allowance (APA {apaPercent}%)
                  </div>
                  <div className="text-xs text-slate-400">
                    Fuel, provisioning, dockage at Mykonos/Santorini, canal dues. Fully audited.
                  </div>
                </div>
                <div className="text-base font-bold text-amber-400 font-mono">
                  €{apaAmount.toLocaleString()}
                </div>
              </div>

              {/* Retail Markup */}
              <div className="flex justify-between items-center py-1 border-t border-white/5 text-emerald-400">
                <div className="font-semibold">YachtDesk Retail Markup</div>
                <div className="text-base font-bold font-mono">€0.00 (Direct Rate)</div>
              </div>
            </div>

            {/* Total Highlight Box */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-amber-500/40 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                  Total Estimated Wire Transfer
                </span>
                <span className="text-3xl font-extrabold text-amber-300 font-mono">
                  €{totalEstimatedWire.toLocaleString()}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 leading-relaxed">
                *Includes 50% deposit upon MYBA signature, 50% balance + 100% VAT + 100% APA 30 days prior to embarkation into a regulated stakeholder escrow account. Unspent APA refunded in full at redelivery.
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => onOpenInquiry(totalEstimatedWire)}
              className="w-full py-3.5 px-6 rounded-xl gold-gradient-bg text-slate-950 font-extrabold text-sm uppercase tracking-wider hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 cursor-pointer"
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
