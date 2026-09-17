"use client";

import React, { useState } from "react";
import { X, CheckCircle, ShieldCheck, FileText, Anchor, Calendar, Clock, Lock, Send } from "lucide-react";
import { SALES_FLEET } from "@/data/salesFleet";

interface SalesInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultYachtName?: string;
  defaultInquiryType?: "Viewing" | "Survey" | "LOI" | "OffMarket" | "General";
}

export default function SalesInquiryModal({
  isOpen,
  onClose,
  defaultYachtName = "",
  defaultInquiryType = "Viewing",
}: SalesInquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    buyerType: "Principal Buyer",
    preferredYacht: defaultYachtName || SALES_FLEET[0].name,
    inquiryType: defaultInquiryType,
    preferredLocation: "Marina Flisvos, Athens",
    preferredDate: "",
    ndaAgreed: true,
    surveyRequirements: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-lg shadow-emerald-500/10">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-[#02509A] bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                S&P Desk Priority Dispatch
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0B1E36]">
                Viewing & Dossier Request Registered
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-medium">
                Our Senior S&P Broker for <strong>{formData.preferredYacht}</strong> has been notified. You will receive the comprehensive engineering specification dossier and private viewing boarding passes within <strong>2 business hours</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left space-y-2 max-w-md mx-auto text-xs text-slate-700">
              <div className="flex justify-between pb-1 border-b border-slate-200">
                <span className="text-slate-500">Vessel:</span>
                <span className="font-bold text-[#0B1E36]">{formData.preferredYacht}</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-200">
                <span className="text-slate-500">Request Type:</span>
                <span className="font-semibold">{formData.inquiryType}</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-200">
                <span className="text-slate-500">Escrow / CA Office:</span>
                <span className="font-semibold text-[#02509A]">Athens Flisvos & Monaco Desk</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Emergency S&P Line:</span>
                <span className="font-mono font-bold text-slate-900">+30 210 980 4410</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full aegean-btn text-xs font-bold tracking-wider uppercase shadow-md cursor-pointer hover:opacity-95"
              >
                Return to Fleet
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#02509A] text-xs font-bold tracking-wider uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>Confidential S&P Transaction Desk</span>
              </div>
              <h3 className="text-2xl font-black text-[#0B1E36]">
                Schedule Private Viewing or Survey
              </h3>
              <p className="text-xs text-slate-600">
                Direct access to Central Agency representation, certified surveyor reports, and MYBA Memorandum of Agreement (MOA) purchase protocols.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Target Vessel & Inquiry Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    Target Vessel
                  </label>
                  <select
                    value={formData.preferredYacht}
                    onChange={(e) => setFormData({ ...formData, preferredYacht: e.target.value })}
                    className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                    required
                  >
                    {SALES_FLEET.map((yacht) => (
                      <option key={yacht.id} value={yacht.name}>
                        {yacht.name} — €{(yacht.askingPriceEur / 1000000).toFixed(1)}M ({yacht.technicalSpecs.lengthM}m)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    Action Required
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value as any })}
                    className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                  >
                    <option value="Viewing">Schedule In-Person VIP Boarding & Viewing</option>
                    <option value="Survey">Request Class Survey & Machinery Oil History</option>
                    <option value="LOI">Submit Letter of Intent (LOI) / Offer</option>
                    <option value="OffMarket">Inquire for Off-Market Mediterranean Fleet</option>
                    <option value="General">General Sale & Purchase Inquiries</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Sterling / Family Office"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    Direct Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="principal@familyoffice.ch"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    Telephone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+44 7911 123456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                  />
                </div>
              </div>

              {/* Row 3: Buyer Role & Preferred Date/Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    Buyer Representation
                  </label>
                  <select
                    value={formData.buyerType}
                    onChange={(e) => setFormData({ ...formData, buyerType: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                  >
                    <option value="Principal Buyer">Principal UHNW Buyer</option>
                    <option value="Family Office">Family Office Executive</option>
                    <option value="Licensed Broker">Accredited MYBA Yacht Broker</option>
                    <option value="Captain">Owner's Representative / Captain</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    Preferred Location
                  </label>
                  <select
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                  >
                    <option value="Marina Flisvos, Athens">Marina Flisvos (Athens)</option>
                    <option value="Marina Alimos, Athens">Marina Alimos (Athens)</option>
                    <option value="Port Hercule, Monaco">Port Hercule (Monaco)</option>
                    <option value="Gouvia Marina, Corfu">Gouvia Marina (Corfu)</option>
                    <option value="Rhodes Mandraki">Mandraki Port (Rhodes)</option>
                    <option value="Virtual Sea Trial">High-Resolution Video Walkthrough</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    Target Date / Window
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                  />
                </div>
              </div>

              {/* Specific technical requirements */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Technical, Survey or Purchase Inquiries
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Request full Lloyd's/RINA class status report, MTU 12V 4000 fluid analysis, or arrange sea trial during Athens stopover..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                />
              </div>

              {/* Confidentiality & Escrow Badge */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-[11px] text-slate-600">
                <Lock className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                <span>
                  <strong>Strict Confidentiality Guaranteed:</strong> All buyer inquiries are handled under reciprocal bilateral Non-Disclosure Agreements. Purchase escrows are held in segregated client stakeholder accounts in accordance with standard MYBA Sales & Purchase Memorandums of Agreement.
                </span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <div className="text-[11px] text-slate-500 hidden sm:block">
                  Direct dispatch to <span className="font-mono text-slate-700">sales@yachtdesk.com</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-full aegean-btn text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-sky-900/20 hover:opacity-95 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit S&P Request
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
