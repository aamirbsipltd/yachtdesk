"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";
import {
  Anchor,
  ShieldCheck,
  Building2,
  Lock,
  Globe,
  Camera,
  CheckCircle2,
  Send,
  Sparkles,
  Layers,
  ArrowRight,
  TrendingUp,
  FileText,
  BadgeCheck,
  Scale,
  Compass,
  Phone,
  Mail,
  Clock
} from "lucide-react";

export default function SellYourYachtPage() {
  const [charterModalOpen, setCharterModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Vessel details
    builder: "",
    model: "",
    yearBuilt: "",
    yearRefit: "",
    lengthM: "",
    grossTonnage: "",
    askingPriceEur: "",
    currentLocation: "",
    flagState: "",
    vatStatus: "EU VAT Paid",
    classSociety: "RINA",

    // Listing Strategy
    listingType: "off-market", // "public-mls" | "off-market"
    enrollInCharterFleet: true,

    // Owner / Rep contact
    ownerName: "",
    ownerRole: "Owner / Principal", // "Owner / Principal" | "Family Office" | "Captain" | "Broker"
    email: "",
    phone: "",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "sell_yacht",
          name: formData.ownerName,
          email: formData.email,
          phone: formData.phone,
          company: `${formData.ownerRole} (${formData.listingType})`,
          yachtName: `${formData.builder} ${formData.model} (${formData.yearBuilt})`,
          budget: `Asking: €${formData.askingPriceEur} | VAT: ${formData.vatStatus}`,
          notes: `LOA: ${formData.lengthM}m | GT: ${formData.grossTonnage} | Flag: ${formData.flagState} | Location: ${formData.currentLocation} | Class: ${formData.classSociety} | Dual-Track Charter: ${formData.enrollInCharterFleet ? "Yes" : "No"} | Notes: ${formData.notes}`,
        }),
      });
    } catch (err) {
      console.warn("Sell yacht submission error:", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0B1E36] selection:bg-sky-200 selection:text-sky-950 relative">
      <Navbar onOpenInquiry={() => setCharterModalOpen(true)} />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-[#071526] via-[#0B1E36] to-[#0F2D52] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#0284C7_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#0284C7]/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold tracking-widest uppercase text-sky-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Central Agency Representation</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              Sell Your Superyacht <br />
              <span className="aegean-gradient-text">With Institutional Reach</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Achieve maximum asset valuation through YachtDesk’s dual-track brokerage methodology: Global MLS syndication or confidential Off-Market Private Placement, combined with Central Agency charter income to offset holding OPEX during the sales window.
            </p>
          </div>

          {/* Quick Pillars */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
              <Lock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
              <div>
                <h4 className="text-sm font-bold text-white">Confidential Off-Market Desk</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Marketed exclusively under bilateral NDAs to verified family offices and UHNW buyers without public price discovery.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-sky-400 shrink-0 mt-1" />
              <div>
                <h4 className="text-sm font-bold text-white">OPEX Offset Guarantee</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Keep your crew and systems operational by placing your yacht into our active Greek charter fleet during the listing term.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
              <Scale className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
              <div>
                <h4 className="text-sm font-bold text-white">Hellenic & MYBA Compliance</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Seamless handling of Greek Law 4926/2022 e-Mitroo registries, EU VAT certifications, and MYBA MOA escrow contracts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Intake Form Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Container (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-xl">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-3">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#02509A] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-200">
                    Direct Central Agency Intake
                  </span>
                  <h2 className="text-3xl font-black text-[#0B1E36]">
                    Yacht Dossier Dispatched to S&P Partners
                  </h2>
                  <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                    Your vessel intake for <strong>{formData.builder} {formData.model}</strong> has been assigned to our Senior S&P Brokerage Desk in Athens & Monaco. A formal Mediterranean market comp valuation and Central Agency representation proposal will be presented within <strong>4 business hours</strong>.
                  </p>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-left space-y-2 max-w-md mx-auto text-xs text-slate-700">
                  <div className="flex justify-between pb-1 border-b border-slate-200">
                    <span className="text-slate-500">Listing Mandate:</span>
                    <span className="font-bold text-[#0B1E36] uppercase">
                      {formData.listingType === "off-market" ? "Confidential Off-Market Placement" : "Global MLS Syndication"}
                    </span>
                  </div>
                  <div className="flex justify-between pb-1 border-b border-slate-200">
                    <span className="text-slate-500">Charter Fleet Placement:</span>
                    <span className="font-bold text-emerald-600">
                      {formData.enrollInCharterFleet ? "Enrolled (Holding OPEX Offset)" : "Sale Only"}
                    </span>
                  </div>
                  <div className="flex justify-between pb-1 border-b border-slate-200">
                    <span className="text-slate-500">Target Asking Price:</span>
                    <span className="font-bold font-mono text-[#02509A]">
                      €{Number(formData.askingPriceEur || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Direct Broker Hotline:</span>
                    <span className="font-bold font-mono text-slate-900">+30 210 980 4410</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full aegean-btn text-xs font-bold uppercase tracking-wider"
                  >
                    Submit Another Vessel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="space-y-2 mb-8">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-[#02509A] font-bold text-xs uppercase tracking-wider">
                    <FileText className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>Central Agency Intake Dossier</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E36]">
                    List Your Yacht For Sale
                  </h2>
                  <p className="text-xs text-slate-600">
                    Submissions are transmitted securely to <code className="text-[#02509A] font-bold">sales@yachtdesk.com</code> and reviewed exclusively by verified Mediterranean Central Agency brokers.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Section 1: Listing Strategy */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider">
                      1. Preferred Representation & Marketing Track
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                          formData.listingType === "off-market"
                            ? "border-[#0284C7] bg-sky-50/50"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-black text-[#0B1E36] flex items-center gap-1.5">
                            <Lock className="w-4 h-4 text-[#D4AF37]" />
                            Strict Off-Market / Private
                          </span>
                          <input
                            type="radio"
                            name="listingType"
                            value="off-market"
                            checked={formData.listingType === "off-market"}
                            onChange={() => setFormData({ ...formData, listingType: "off-market" })}
                            className="accent-[#0284C7]"
                          />
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          No public advertising or online photos. Shared only under signed bilateral NDAs with pre-vetted family offices and direct buyers.
                        </p>
                      </label>

                      <label
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                          formData.listingType === "public-mls"
                            ? "border-[#0284C7] bg-sky-50/50"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-black text-[#0B1E36] flex items-center gap-1.5">
                            <Globe className="w-4 h-4 text-[#02509A]" />
                            Public MLS & Global Syndicate
                          </span>
                          <input
                            type="radio"
                            name="listingType"
                            value="public-mls"
                            checked={formData.listingType === "public-mls"}
                            onChange={() => setFormData({ ...formData, listingType: "public-mls" })}
                            className="accent-[#0284C7]"
                          />
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          Full global campaign across YachtDesk, YachtWorld, SuperYacht Times, Boat International, and the international MYBA broker network.
                        </p>
                      </label>
                    </div>
                  </div>

                  {/* Section 2: Vessel Details */}
                  <div className="space-y-4 pt-2">
                    <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider">
                      2. Vessel Identification & Commercial Metrics
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Shipyard / Builder *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Benetti, Sanlorenzo, Sunseeker, Perini Navi"
                          value={formData.builder}
                          onChange={(e) => setFormData({ ...formData, builder: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Model / Custom Designation *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 52M Tri-Deck, Alloy 40, Sunseeker 116"
                          value={formData.model}
                          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Year Built *
                        </label>
                        <input
                          type="number"
                          required
                          placeholder="2021"
                          value={formData.yearBuilt}
                          onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Year Refit
                        </label>
                        <input
                          type="number"
                          placeholder="2025"
                          value={formData.yearRefit}
                          onChange={(e) => setFormData({ ...formData, yearRefit: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          LOA (Meters) *
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          required
                          placeholder="42.5"
                          value={formData.lengthM}
                          onChange={(e) => setFormData({ ...formData, lengthM: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Gross Tonnage (GT)
                        </label>
                        <input
                          type="number"
                          placeholder="499"
                          value={formData.grossTonnage}
                          onChange={(e) => setFormData({ ...formData, grossTonnage: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Target Asking Price (€ EUR) *
                        </label>
                        <input
                          type="number"
                          required
                          placeholder="e.g. 18500000"
                          value={formData.askingPriceEur}
                          onChange={(e) => setFormData({ ...formData, askingPriceEur: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Current Berth / Location *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Marina Flisvos, Athens / Monaco"
                          value={formData.currentLocation}
                          onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Flag of Registry
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Cayman, Malta, Greece"
                          value={formData.flagState}
                          onChange={(e) => setFormData({ ...formData, flagState: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          EU VAT Fiscal Status
                        </label>
                        <select
                          value={formData.vatStatus}
                          onChange={(e) => setFormData({ ...formData, vatStatus: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                        >
                          <option value="EU VAT Paid">EU VAT Paid</option>
                          <option value="EU VAT Not Paid">EU VAT Not Paid</option>
                          <option value="Commercial Exemption">Commercial License Exemption (e-Mitroo)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Classification Society
                        </label>
                        <select
                          value={formData.classSociety}
                          onChange={(e) => setFormData({ ...formData, classSociety: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                        >
                          <option value="RINA">RINA</option>
                          <option value="Lloyd's Register">Lloyd's Register</option>
                          <option value="ABS">ABS (American Bureau of Shipping)</option>
                          <option value="Bureau Veritas">Bureau Veritas (BV)</option>
                          <option value="Private / Other">Private / Other Classification</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Central Agency Charter Enrollment Checkbox */}
                  <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="charterEnroll"
                      checked={formData.enrollInCharterFleet}
                      onChange={(e) => setFormData({ ...formData, enrollInCharterFleet: e.target.checked })}
                      className="accent-[#0284C7] mt-1 w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="charterEnroll" className="cursor-pointer">
                      <span className="text-xs font-bold text-[#0B1E36] block">
                        Enroll in YachtDesk Central Agency Charter Fleet (Offset Holding OPEX)
                      </span>
                      <span className="text-[11px] text-slate-600 leading-relaxed block mt-0.5">
                        Our charter desk will market select summer charter weeks in Greece to generate positive cashflow while the vessel is listed for sale.
                      </span>
                    </label>
                  </div>

                  {/* Section 4: Owner / Broker Contact Details */}
                  <div className="space-y-4 pt-2">
                    <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider">
                      3. Owner / Legal Representative Contact
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Full Legal Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name or Designated Attorney"
                          value={formData.ownerName}
                          onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Relationship to Vessel
                        </label>
                        <select
                          value={formData.ownerRole}
                          onChange={(e) => setFormData({ ...formData, ownerRole: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                        >
                          <option value="Owner / Principal">Beneficial Owner / Principal</option>
                          <option value="Family Office">Family Office Executive / Trustee</option>
                          <option value="Captain">Yacht Captain / Technical Manager</option>
                          <option value="Broker">Co-Broker / Central Agent</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Direct Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="principal@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Direct Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+30 690 123 4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Additional Notes, Refit History, or Survey Date
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Recent MTU 1,000-hour service, new teak decks 2024, RINA special survey completed..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
                      />
                    </div>
                  </div>

                  {/* Submission Row */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
                    <div className="text-[11px] text-slate-500">
                      Dispatched to <span className="font-mono font-bold text-slate-700">sales@yachtdesk.com</span>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full aegean-btn text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-sky-900/20 hover:opacity-95 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {submitting ? "Submitting Valuation..." : "Submit For Valuation & Listing"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right Column: Why List with YachtDesk & S&P Roadmap (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Value Prop Card */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#02509A]">
                  Central Agency Advantage
                </span>
                <h3 className="text-xl font-black text-[#0B1E36]">
                  Why Greek Shipowners List With YachtDesk
                </h3>
              </div>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0 font-bold">
                    01
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B1E36]">Dual Revenue Engineering</h4>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">
                      While traditional brokers let yachts sit idle accumulating dockage and crew salaries, our operations team coordinates high-yield charter contracts.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0 font-bold">
                    02
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B1E36]">UHNW Buyer Matching</h4>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">
                      Our active charterers are prospective buyers. Over 35% of Mediterranean yacht purchases are initiated by clients who first chartered in the Cyclades or Ionian.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0 font-bold">
                    03
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B1E36]">Hellenic Law 4926/2022 Expertise</h4>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">
                      Instant verification on the e-Mitroo digital registry, securing the 12% reduced Greek charter VAT and clean flag deletions at closing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct S&P Desk Contact */}
            <div className="p-6 rounded-3xl bg-[#0B1E36] text-white space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0284C7] to-[#02509A] flex items-center justify-center">
                  <Anchor className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-wide">Direct S&P Broker Desk</h4>
                  <p className="text-xs text-slate-300">Marina Flisvos & Piraeus Headquarters</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs border-t border-white/10">
                <div className="flex justify-between">
                  <span className="text-slate-400">Brokerage Phone:</span>
                  <a href="tel:+302109804410" className="font-mono font-bold text-sky-300 hover:underline">
                    +30 210 980 4410
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sales Inquiries:</span>
                  <span className="font-mono font-semibold text-white">sales@yachtdesk.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Charter Operations:</span>
                  <span className="font-mono font-semibold text-white">charter@yachtdesk.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <InquiryModal
        isOpen={charterModalOpen}
        onClose={() => setCharterModalOpen(false)}
      />
    </main>
  );
}
