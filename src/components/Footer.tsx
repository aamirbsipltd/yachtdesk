"use client";

import React from "react";
import { Anchor, ShieldCheck, Mail, MapPin, Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B1E36] text-slate-300 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0284C7] to-[#38BDF8] flex items-center justify-center shadow-md">
                <Anchor className="w-5 h-5 text-slate-950 stroke-[2.2]" />
              </div>
              <span className="text-xl font-black tracking-widest text-white uppercase">
                YACHT<span className="text-[#38BDF8]">DESK</span>
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              The Mediterranean Algorithmic Charter Desk. Sourcing verified Central Agency fleets across Athens, the Cyclades, Ionian, and the French Riviera with zero retail markups.
            </p>

            <div className="pt-2 flex items-center gap-3 text-[11px] text-slate-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                MYBA Guidelines
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                Greek Law 4926/2022
              </span>
            </div>
          </div>

          {/* Col 2: Ports & Bases */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              Mediterranean Hubs
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              <li>Marina Alimos (Athens, Greece)</li>
              <li>Marina Flisvos (Athens, Greece)</li>
              <li>Gouvia Marina (Corfu, Ionian)</li>
              <li>Mandraki Port (Rhodes, Dodecanese)</li>
              <li>Port Hercule (Monaco)</li>
              <li>Port de Saint-Tropez (France)</li>
            </ul>
          </div>

          {/* Col 3: Fleet Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              Charter Classes
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              <li><a href="#fleet" className="hover:text-white transition-colors">Motor Superyachts (30m–45m)</a></li>
              <li><a href="#fleet" className="hover:text-white transition-colors">Tri-Deck Mega Yachts (50m+)</a></li>
              <li><a href="#fleet" className="hover:text-white transition-colors">Crewed Luxury Catamarans</a></li>
              <li><a href="#fleet" className="hover:text-white transition-colors">High-Performance Sailing</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">APA & Fuel Cost Estimator</a></li>
            </ul>
          </div>

          {/* Col 4: Central Agency Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              Desk Operations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <div className="text-slate-400">Charter Desk:</div>
                <div className="text-white font-mono font-semibold">charter@yachtdesk.com</div>
              </li>
              <li>
                <div className="text-slate-400">Central Agency Liaison:</div>
                <div className="text-white font-mono font-semibold">fleet@yachtdesk.com</div>
              </li>
              <li>
                <div className="text-slate-400">Emergency Operations:</div>
                <div className="text-white font-mono font-semibold">+30 210 980 4400</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="pt-8 border-t border-slate-700/60 text-[11px] text-slate-400 leading-relaxed space-y-2">
          <p>
            <strong>Regulatory & Escrow Statement:</strong> All yacht charters arranged through YachtDesk are executed under standard MYBA Worldwide Yachting Agreement (WYA) terms or HYBA agreements. Charter deposits and Advance Provisioning Allowances (APA) are deposited into segregated, regulated stakeholder client accounts. Vessels operating in Greek waters hold active commercial certification in the Greek Electronic Registry of Commercial Ships (e-Mitroo) under Law 4926/2022.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-slate-400">
            <div>
              © {new Date().getFullYear()} YachtDesk International Ltd. All rights reserved.
            </div>
            <div className="flex gap-4 font-medium">
              <span className="hover:text-white cursor-pointer">MYBA Charter Terms</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">Greek VAT Circular A.1118</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">Stakeholder Escrow Protocol</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
