"use client";

import React, { useState } from "react";
import { X, CheckCircle, Send, Sparkles } from "lucide-react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultYachtName?: string;
  defaultBudget?: number;
}

export default function InquiryModal({
  isOpen,
  onClose,
  defaultYachtName = "",
  defaultBudget,
}: InquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredYacht: defaultYachtName || "Any Suitable Vessel",
    dates: "",
    guestCount: "8",
    destination: "Cyclades (Mykonos, Paros, Santorini)",
    budgetRange: defaultBudget ? `€${defaultBudget.toLocaleString()}` : "€75,000 - €150,000",
    specialNotes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-[#0B1E36]">
                Charter Proposal Dispatched to Queue
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-medium">
                Thank you, <strong>{formData.fullName}</strong>. Our algorithmic charter desk has received your brief for <strong>{formData.preferredYacht}</strong> in the {formData.destination}.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-slate-700 max-w-md mx-auto text-left space-y-2 font-mono font-semibold">
              <div>• Booking Ref: YD-{Math.floor(100000 + Math.random() * 900000)}</div>
              <div>• Calendar Hold: Checking Central Agency live slots</div>
              <div>• Turnaround: Formal PDF proposal delivered within 30 minutes</div>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="py-3 px-8 rounded-xl aegean-btn font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-900/20 hover:opacity-95 transition-opacity"
            >
              Return to Fleet
            </button>
          </div>
        ) : (
          <div>
            <div className="space-y-2 mb-6">
              <span className="text-xs font-bold text-[#02509A] uppercase tracking-widest flex items-center gap-1.5 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
                Direct Charter Request • Zero Retail Markup
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0B1E36]">
                Request Your Private Proposal
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {defaultYachtName
                  ? `Inquiring for ${defaultYachtName}. Receive verified availability and net Central Agency rates.`
                  : "Specify your dates and requirements. Our desk prepares a 30-second bespoke proposal deck."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Full Name / Family Office
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Alexander Wright"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Corporate / Private Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alexander@familyoffice.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Phone / WhatsApp (With Country Code)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+44 7000 000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Target Dates / Season
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 15–22 July 2027"
                    value={formData.dates}
                    onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Cruising Area
                  </label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0284C7] cursor-pointer"
                  >
                    <option value="Cyclades (Mykonos, Paros, Santorini)">Cyclades (Mykonos, Santorini)</option>
                    <option value="Ionian (Corfu, Paxos, Lefkada)">Ionian (Corfu, Paxos)</option>
                    <option value="Saronic & Peloponnese">Saronic & Peloponnese</option>
                    <option value="Dodecanese & Rhodes">Dodecanese & Rhodes</option>
                    <option value="French Riviera & Monaco">French Riviera & Monaco</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Guest Count
                  </label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0284C7] cursor-pointer"
                  >
                    <option value="2-4">2 to 4 Guests</option>
                    <option value="5-8">5 to 8 Guests</option>
                    <option value="9-10">9 to 10 Guests</option>
                    <option value="11-12">11 to 12 Guests (SOLAS Max)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Estimated Budget Cap
                  </label>
                  <input
                    type="text"
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Special Requests (Chef preferences, e-Foils, Seabobs, Helicopter transfer)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Require zero-speed stabilizers for Cycladic crossing, 2x Seabobs, private chef menu."
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0284C7]"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl aegean-btn font-black text-xs uppercase tracking-wider hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-sky-900/20 cursor-pointer"
                >
                  <Send className="w-4 h-4 stroke-[2.5]" />
                  Dispatch Inquiry to Central Agency Desk
                </button>
              </div>

              <div className="text-center text-[10px] text-slate-500 pt-1 font-medium">
                Protected by standard MYBA escrow protocols & Greek Law 4926/2022 commercial registration.
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
