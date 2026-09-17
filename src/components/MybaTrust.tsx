"use client";

import React from "react";
import { ShieldCheck, Scale, Lock, Anchor, FileCheck2, Award } from "lucide-react";

export default function MybaTrust() {
  const standards = [
    {
      icon: <FileCheck2 className="w-6 h-6 text-amber-400" />,
      title: "MYBA Standard Worldwide Agreement",
      desc: "Every charter operates under the gold-standard MYBA contract, providing institutional legal protection, standardized cancellation terms, and verified stakeholder accountability for both charterer and owner."
    },
    {
      icon: <Scale className="w-6 h-6 text-amber-400" />,
      title: "Greek Maritime Law 4926/2022 Compliance",
      desc: "Strict adherence to Greek legislation governing commercial yacht operations. All vessels are verified on the Greek electronic registry (e-Mitroo) with authorized charter permits and discounted 12% VAT regimes."
    },
    {
      icon: <Lock className="w-6 h-6 text-amber-400" />,
      title: "Regulated Stakeholder Escrow",
      desc: "Funds never sit in general operational accounts. All charter fees and APA deposits are held in segregated, audited stakeholder trust accounts and disbursed in strict milestones as the charter progresses."
    },
    {
      icon: <Award className="w-6 h-6 text-amber-400" />,
      title: "STCW Certified Professional Crews",
      desc: "Zero bareboat compromises. Every yacht in the YachtDesk network is manned by full-time, commercially licensed Captains, marine engineers, and Michelin-trained private culinary talent."
    }
  ];

  return (
    <section id="standards" className="py-24 relative bg-[#050811]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Governance & Maritime Standards</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Institutional Trust in <span className="gold-gradient-text">Private Yachting</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            We reject the unregulated grey charter market. Every booking through YachtDesk conforms to international maritime conventions and regulated escrow frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {standards.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 text-[11px] text-amber-400/80 font-medium">
                Verified Standard
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
