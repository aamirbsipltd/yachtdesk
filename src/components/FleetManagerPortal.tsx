"use client";

import React, { useState } from "react";
import { ShieldCheck, Clock, CheckCircle, Zap, Building2, Send } from "lucide-react";

export default function FleetManagerPortal() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    agencyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    fleetSize: "3-5",
    primaryBase: "Marina Alimos, Athens",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="fleet-managers" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#EDF6FF] to-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-sky-200 text-[#02509A] text-xs font-bold tracking-wider uppercase shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>For Central Agents & Fleet Managers</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B1E36] tracking-tight">
            Automate Your Fleet Desk with <br className="hidden sm:block" />
            <span className="aegean-gradient-text">Zero SaaS Subscription Fees</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Traditional yacht management houses in Athens and Monaco pay full-time assistants to manually format PDF decks, answer broker availability emails, and calculate APA. YachtDesk connects your central agency fleet directly to corporate and family office demand.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Feature Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md shadow-sky-950/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#02509A]">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1E36]">
                30-Second Inquiry Turnaround
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                When retail brokers and direct charterers query your yachts, YachtDesk checks calendar availability, calculates exact Greek Law 4926 VAT & APA, and issues branded PDF presentations within 30 seconds.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md shadow-sky-950/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1E36]">
                Guaranteed 5% Central Agency Protection
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Under standard MYBA rules, your Central Agency commission (5%) is locked into every fixture. YachtDesk never circumvents Central Agents and enforces strict stakeholder escrow protocols.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md shadow-sky-950/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0284C7]">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1E36]">
                Zero Fixed Cost (€0/Month)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                No monthly software subscription, no setup fees. We operate purely on performance, bringing incremental high-season and shoulder-season bookings to your managed vessels.
              </p>
            </div>
          </div>

          {/* Onboarding Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-sky-200 shadow-xl shadow-sky-900/10 relative">
            <div className="space-y-2 mb-6">
              <span className="text-xs font-bold text-[#02509A] uppercase tracking-widest font-mono">
                Fleet Partner Application
              </span>
              <h3 className="text-2xl font-black text-[#0B1E36]">
                Connect Your Managed Fleet
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Join our private Mediterranean charter distribution network. Tailored for Hellenic Yacht Brokers and Central Agencies.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-[#0B1E36]">Application Received</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Thank you. Our charter operations desk will review your fleet profile and contact you within 24 hours to integrate your Yachtfolio / Central Agency calendar.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-800 hover:bg-slate-200"
                >
                  Submit Another Fleet
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Company / Agency Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vernicos Yachts S.A."
                      value={formData.agencyName}
                      onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Commercial Contact
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Charter Director"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Corporate Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="charter@your-agency.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Direct Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+30 210 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Managed Fleet Size
                    </label>
                    <select
                      value={formData.fleetSize}
                      onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0284C7] cursor-pointer"
                    >
                      <option value="1-2">1 to 2 Yachts</option>
                      <option value="3-5">3 to 5 Yachts</option>
                      <option value="6-15">6 to 15 Yachts</option>
                      <option value="15+">15+ Commercial Yachts</option>
                    </select>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Primary Operating Base
                    </label>
                    <select
                      value={formData.primaryBase}
                      onChange={(e) => setFormData({ ...formData, primaryBase: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0284C7] cursor-pointer"
                    >
                      <option value="Marina Alimos, Athens">Marina Alimos, Athens</option>
                      <option value="Marina Flisvos, Athens">Marina Flisvos, Athens</option>
                      <option value="Marina Zeas, Piraeus">Marina Zeas, Piraeus</option>
                      <option value="Gouvia Marina, Corfu">Gouvia Marina, Corfu</option>
                      <option value="Rhodes / Dodecanese">Rhodes / Dodecanese</option>
                      <option value="Monaco / French Riviera">Monaco / French Riviera</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl aegean-btn font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-900/20 cursor-pointer"
                  >
                    <Send className="w-4 h-4 stroke-[2.5]" />
                    Register Central Agency Fleet
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
