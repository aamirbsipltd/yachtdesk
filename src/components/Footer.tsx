"use client";

import React from "react";
import Link from "next/link";
import { Anchor, ShieldCheck, Mail, MapPin, Compass, Briefcase, Tag, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B1E36] text-slate-300 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0284C7] to-[#38BDF8] flex items-center justify-center shadow-md">
                  <Anchor className="w-5 h-5 text-slate-950 stroke-[2.2]" />
                </div>
                <span className="text-xl font-black tracking-widest text-white uppercase">
                  YACHT<span className="text-[#38BDF8]">DESK</span>
                </span>
              </Link>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              The Mediterranean Algorithmic Charter Desk and Sale & Purchase (S&P) Suite. Direct Central Agency representation across Athens, the Cyclades, Ionian, and the French Riviera with institutional due diligence and zero retail markups.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                MYBA Guidelines
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                Greek Law 4926/2022
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                e-Mitroo Certified
              </span>
            </div>
          </div>

          {/* Col 2: Sale & Purchase (S&P) */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
              Sale & Purchase (S&P)
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              <li>
                <Link href="/sales" className="hover:text-white transition-colors">
                  Yachts for Sale Hub
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-white transition-colors">
                  Sell a Yacht (Central Agency)
                </Link>
              </li>
              <li>
                <Link href="/sales" className="hover:text-white transition-colors">
                  Off-Market Private Placement
                </Link>
              </li>
              <li>
                <Link href="/sales" className="hover:text-white transition-colors">
                  Charter OPEX Offset Modeling
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-white transition-colors">
                  Valuation & Comps Analysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Operations & Charter Desk */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-sky-400" />
              Fleet Operations
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              <li>
                <Link href="/fleet-partners" className="hover:text-white transition-colors flex items-center gap-1.5 font-bold text-[#38BDF8]">
                  Fleet Partners (Central Agents)
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">€0 / mo</span>
                </Link>
              </li>
              <li>
                <Link href="/operations" className="hover:text-white transition-colors flex items-center gap-1.5 font-bold text-sky-300">
                  Operations Console
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </Link>
              </li>
              <li>
                <Link href="/operations" className="hover:text-white transition-colors">
                  Live Fleet Calendar & 48h Holds
                </Link>
              </li>
              <li>
                <Link href="/operations" className="hover:text-white transition-colors">
                  Instant Client Proposal Generator
                </Link>
              </li>
              <li>
                <Link href="/operations" className="hover:text-white transition-colors">
                  Automated MYBA Contract Pre-Filler
                </Link>
              </li>
              <li>
                <Link href="/operations" className="hover:text-white transition-colors">
                  S&P Transaction Desk & Escrows
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="hover:text-white transition-colors">
                  APA & Greek VAT Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Central Agency Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              Brokerage Desk
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <div className="text-slate-400">Sale & Purchase (S&P):</div>
                <div className="text-white font-mono font-semibold">sales@yachtdesk.com</div>
              </li>
              <li>
                <div className="text-slate-400">Charter Operations:</div>
                <div className="text-white font-mono font-semibold">charter@yachtdesk.com</div>
              </li>
              <li>
                <div className="text-slate-400">Central Agency Fleet:</div>
                <div className="text-white font-mono font-semibold">fleet@yachtdesk.com</div>
              </li>
              <li>
                <div className="text-slate-400">Athens Flisvos Office:</div>
                <div className="text-white font-mono font-semibold">+30 210 980 4410</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="pt-8 border-t border-slate-700/60 text-[11px] text-slate-400 leading-relaxed space-y-2">
          <p>
            <strong>Regulatory & Escrow Statement:</strong> All yacht charters and purchase transactions arranged through YachtDesk are executed under standard MYBA Worldwide Yachting Agreement (WYA) or MYBA Memorandum of Agreement (MOA) terms. Charter deposits, purchase funds, and Advance Provisioning Allowances (APA) are deposited into segregated, regulated stakeholder client escrow accounts at designated European financial institutions. Commercial vessels operating in Greek waters hold active certification in the Hellenic Electronic Registry of Commercial Ships (e-Mitroo) under Law 4926/2022.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-slate-400">
            <div>
              © {new Date().getFullYear()} YachtDesk International Ltd. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4 font-medium">
              <Link href="/fleet-partners" className="hover:text-white transition-colors text-sky-300 font-bold">
                Fleet Partner Onboarding (€0)
              </Link>
              <span>•</span>
              <Link href="/sales" className="hover:text-white transition-colors">
                Yachts For Sale
              </Link>
              <span>•</span>
              <Link href="/sell" className="hover:text-white transition-colors">
                List With Central Agency
              </Link>
              <span>•</span>
              <Link href="/operations" className="hover:text-white transition-colors">
                Operations Console
              </Link>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">Stakeholder Escrow Protocol</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
