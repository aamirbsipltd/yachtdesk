"use client";

import React from "react";
import { ShieldCheck, Scale, Lock, FileCheck2, Award } from "lucide-react";

export default function MybaTrust() {
  const standards = [
    {
      icon: <FileCheck2 className="w-6 h-6 text-[#02509A]" />,
      title: "MYBA Standard Worldwide Agreement",
      desc: "Every charter operates under the gold-standard MYBA contract, providing institutional legal protection, standardized cancellation terms, and verified stakeholder accountability for both charterer and owner."
    },
    {
      icon: <Scale className="w-6 h-6 text-[#02509A]" />,
      title: "Greek Maritime Law 4926/2022 Compliance",
      desc: "Strict adherence to Greek legislation governing commercial yacht operations. All vessels are verified on the Greek electronic registry (e-Mitroo) with authorized charter permits and discounted 12% VAT regimes."
    },
    {
      icon: <Lock className="w-6 h-6 text-[#02509A]" />,
      title: "Regulated Stakeholder Escrow",
      desc: "Funds never sit in general operational accounts. All charter fees and APA deposits are held in segregated, audited stakeholder trust accounts and disbursed in strict milestones as the charter progresses."
    },
    {
      icon: <Award className="w-6 h-6 text-[#02509A]" />,
      title: "STCW Certified Professional Crews",
      desc: "Zero bareboat compromises. Every yacht in the YachtDesk network is manned by full-time, commercially licensed Captains, marine engineers, and Michelin-trained private culinary talent."
    }
  ];

  return (
    <section id="standards" className="py-24 relative bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#02509A] text-xs font-bold tracking-wider uppercase shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>Governance & Maritime Standards</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B1E36] tracking-tight">
            Institutional Trust in <span className="aegean-gradient-text">Private Yachting</span>
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            We reject the unregulated grey charter market. Every booking through YachtDesk conforms to international maritime conventions and regulated escrow frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {standards.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-sky-300 transition-all flex flex-col justify-between space-y-4 group shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-[#0B1E36] group-hover:text-[#02509A] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 text-[11px] text-[#02509A] font-bold">
                Verified Standard
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
