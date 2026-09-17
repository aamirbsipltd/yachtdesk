"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SalesInquiryModal from "@/components/SalesInquiryModal";
import InquiryModal from "@/components/InquiryModal";
import { SALES_FLEET, SaleYacht } from "@/data/salesFleet";
import {
  Anchor,
  ShieldCheck,
  Compass,
  Gauge,
  Waves,
  Euro,
  DollarSign,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  FileCheck,
  Calendar,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  Eye,
  Layers,
  Scale
} from "lucide-react";

export default function YachtsForSalePage() {
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [lengthFilter, setLengthFilter] = useState<string>("all");
  const [currency, setCurrency] = useState<"EUR" | "USD">("EUR");
  const eurToUsdRate = 1.085;

  // Modal states
  const [salesModalOpen, setSalesModalOpen] = useState(false);
  const [selectedYachtForModal, setSelectedYachtForModal] = useState<string>("");
  const [inquiryTypeForModal, setInquiryTypeForModal] = useState<"Viewing" | "Survey" | "LOI" | "OffMarket" | "General">("Viewing");
  const [charterModalOpen, setCharterModalOpen] = useState(false);

  // Helper currency formatter
  const formatPrice = (priceEur: number) => {
    if (currency === "USD") {
      const usdVal = priceEur * eurToUsdRate;
      return `$${(usdVal / 1000000).toFixed(usdVal >= 10000000 ? 1 : 2)}M`;
    }
    return `€${(priceEur / 1000000).toFixed(priceEur >= 10000000 ? 1 : 2)}M`;
  };

  const formatRawPrice = (priceEur: number) => {
    if (currency === "USD") {
      const usdVal = priceEur * eurToUsdRate;
      return `$${Math.round(usdVal).toLocaleString()}`;
    }
    return `€${priceEur.toLocaleString()}`;
  };

  // Filter logic
  const filteredYachts = SALES_FLEET.filter((yacht) => {
    // Category
    if (selectedCategory !== "all" && yacht.category !== selectedCategory) {
      return false;
    }
    // Price range
    if (priceRange === "under-10m" && yacht.askingPriceEur >= 10000000) return false;
    if (priceRange === "10m-20m" && (yacht.askingPriceEur < 10000000 || yacht.askingPriceEur > 20000000)) return false;
    if (priceRange === "over-20m" && yacht.askingPriceEur <= 20000000) return false;

    // Length
    if (lengthFilter === "under-35m" && yacht.technicalSpecs.lengthM >= 35) return false;
    if (lengthFilter === "35m-45m" && (yacht.technicalSpecs.lengthM < 35 || yacht.technicalSpecs.lengthM > 45)) return false;
    if (lengthFilter === "over-45m" && yacht.technicalSpecs.lengthM <= 45) return false;

    return true;
  });

  const handleOpenViewingModal = (
    yachtName: string,
    type: "Viewing" | "Survey" | "LOI" | "OffMarket" | "General" = "Viewing"
  ) => {
    setSelectedYachtForModal(yachtName);
    setInquiryTypeForModal(type);
    setSalesModalOpen(true);
  };

  const handleCharterInquiry = (yachtName?: string) => {
    setCharterModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0B1E36] selection:bg-sky-200 selection:text-sky-950 relative">
      <Navbar onOpenInquiry={handleCharterInquiry} />

      {/* Top Hero Banner */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-[#071526] via-[#0B1E36] to-[#0F2D52] text-white overflow-hidden">
        {/* Subtle decorative radial grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#0284C7_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#0284C7]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#D4AF37]/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold tracking-widest uppercase text-sky-300">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Direct Central Agency Brokerage Suite</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              Pre-Owned Luxury <br />
              <span className="aegean-gradient-text">Superyachts For Sale</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Acquire verified Mediterranean and global tonnage with institutional due diligence. Every yacht features audited Class status, complete machinery fluid histories, and proforma Central Agency charter income modeling to offset annual OPEX.
            </p>
          </div>

          {/* S&P Highlights Ticker */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-white">€100.9M</div>
              <div className="text-xs text-sky-300 font-medium">Curated Fleet Asking Value</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-[#D4AF37]">100%</div>
              <div className="text-xs text-slate-300 font-medium">MYBA MOA & Escrow Protected</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-white">8-Week</div>
              <div className="text-xs text-sky-300 font-medium">Charter OPEX Offset Modeling</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">Greek e-Mitroo</div>
              <div className="text-xs text-slate-300 font-medium">Commercial Compliance Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Control Bar */}
      <section className="sticky top-[73px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {[
              { key: "all", label: "All Vessels" },
              { key: "mega", label: "Mega Yachts (50m+)" },
              { key: "motor", label: "Motor Superyachts" },
              { key: "sailing", label: "Sailing Yachts" },
              { key: "catamaran", label: "Eco Catamarans" },
              { key: "explorer", label: "Expedition / Explorer" },
            ].map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.key
                    ? "aegean-btn shadow-md shadow-sky-900/15"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Secondary Dropdown filters & Currency Toggle */}
          <div className="flex items-center gap-3">
            {/* Price Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
            >
              <option value="all">Any Price</option>
              <option value="under-10m">Under €10M</option>
              <option value="10m-20m">€10M – €20M</option>
              <option value="over-20m">Over €20M</option>
            </select>

            {/* Length Filter */}
            <select
              value={lengthFilter}
              onChange={(e) => setLengthFilter(e.target.value)}
              className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
            >
              <option value="all">Any Length</option>
              <option value="under-35m">Under 35m (115ft)</option>
              <option value="35m-45m">35m – 45m (115–148ft)</option>
              <option value="over-45m">Over 45m (148ft+)</option>
            </select>

            {/* Currency Switcher */}
            <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200">
              <button
                onClick={() => setCurrency("EUR")}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  currency === "EUR" ? "bg-white text-[#02509A] shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                € EUR
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  currency === "USD" ? "bg-white text-[#02509A] shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                $ USD
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Catalogue Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E36]">
              {filteredYachts.length} {filteredYachts.length === 1 ? "Vessel" : "Vessels"} Available for Acquisition
            </h2>
          </div>

          <button
            onClick={() => handleOpenViewingModal(SALES_FLEET[0].name, "OffMarket")}
            className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-[#02509A] hover:text-[#0284C7] transition-colors"
          >
            <span>Request Off-Market Greek Fleet (NDA Required)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredYachts.map((yacht) => (
            <div
              key={yacht.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                <img
                  src={yacht.heroImage}
                  alt={yacht.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-white/95 text-[#0B1E36] backdrop-blur-md shadow-sm">
                      {yacht.technicalSpecs.lengthM}m / {yacht.technicalSpecs.lengthFt}ft
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-md ${
                      yacht.classification.vatStatus === "EU VAT Paid"
                        ? "bg-emerald-500/90 text-white"
                        : "bg-sky-600/90 text-white"
                    }`}>
                      {yacht.classification.vatStatus}
                    </span>
                  </div>

                  {yacht.badgeHighlight && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#D4AF37] text-slate-950 shadow-sm">
                      {yacht.badgeHighlight}
                    </span>
                  )}
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-semibold text-sky-200 uppercase tracking-widest">
                    {yacht.builder} • {yacht.yearBuilt}{yacht.yearRefit ? ` / ${yacht.yearRefit}` : ""}
                  </div>
                  <h3 className="text-xl font-black tracking-tight">{yacht.name}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                {/* Asking Price & Location */}
                <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Asking Price
                    </div>
                    <div className="text-2xl font-black text-[#02509A] tracking-tight">
                      {formatPrice(yacht.askingPriceEur)}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500">
                      {formatRawPrice(yacht.askingPriceEur)}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Berth Location
                    </div>
                    <div className="text-xs font-bold text-slate-800">
                      {yacht.location.split(",")[0]}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {yacht.classification.flagState} Flag
                    </div>
                  </div>
                </div>

                {/* Technical Metric Pills */}
                <div className="grid grid-cols-4 gap-2 text-center py-1 bg-slate-50 rounded-2xl border border-slate-100 p-2 text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Cabins</div>
                    <div className="font-extrabold text-[#0B1E36]">{yacht.cabins}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Guests</div>
                    <div className="font-extrabold text-[#0B1E36]">{yacht.guests}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Tonnage</div>
                    <div className="font-extrabold text-[#0B1E36]">{yacht.technicalSpecs.grossTonnage} GT</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Speed</div>
                    <div className="font-extrabold text-[#0B1E36]">{yacht.technicalSpecs.cruisingSpeedKnots} kn</div>
                  </div>
                </div>

                {/* Short Technical Description */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                  {yacht.shortDescription}
                </p>

                {/* Technical badges bar */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-sky-50 text-[#02509A] px-2 py-0.5 rounded-md border border-sky-100">
                    <ShieldCheck className="w-3 h-3 text-[#0284C7]" />
                    {yacht.classification.society.split("/")[0].trim()}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                    <Waves className="w-3 h-3 text-[#0284C7]" />
                    Zero-Speed Fins
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-100">
                    <Scale className="w-3 h-3 text-emerald-600" />
                    e-Mitroo Ready
                  </span>
                </div>

                {/* Financial Proforma Callout */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-sky-50/80 to-blue-50/50 border border-sky-100 text-xs">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-600 font-medium">8-Wk Charter Revenue:</span>
                    <span className="font-bold text-emerald-600">
                      +€{(yacht.opexProforma.estimatedGrossCharterRevenue / 1000).toLocaleString()}k
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] mt-0.5">
                    <span className="text-slate-600 font-medium">Annual OPEX Offset:</span>
                    <span className="font-black text-[#02509A]">
                      {yacht.opexProforma.netAnnualCostOfOwnership <= 0 ? "100% (Surplus Yield)" : `~${Math.round((yacht.opexProforma.netCharterIncome / yacht.opexProforma.totalAnnualOpex) * 100)}% Covered`}
                    </span>
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="pt-2 grid grid-cols-2 gap-3">
                  <Link
                    href={`/sales/${yacht.slug}`}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-800 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Full Dossier</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => handleOpenViewingModal(yacht.name, "Viewing")}
                    className="w-full py-2.5 px-3 rounded-xl aegean-btn text-center font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-sky-900/10 hover:opacity-95 transition-all cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>View / Survey</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredYachts.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-sky-50 text-[#02509A] flex items-center justify-center mx-auto border border-sky-200">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0B1E36]">No vessels match this filter combination</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Our Central Agency desk has off-market inventory matching specialized requirements across Greece, Monaco, and Italy.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setPriceRange("all");
                setLengthFilter("all");
              }}
              className="px-5 py-2 rounded-full aegean-btn text-xs font-bold uppercase tracking-wider"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>

      {/* S&P Institutional Due Diligence Process Section */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#02509A] text-xs font-bold tracking-wider uppercase">
              <FileCheck className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Institutional Acquisition Protocol</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1E36]">
              How YachtDesk Facilitates <span className="aegean-gradient-text">Superyacht Acquisitions</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              From initial Letter of Intent to Hellenic Maritime Registry registration and MYBA Worldwide Yachting Agreement charter deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "LOI & 10% Escrow",
                desc: "Formal Letter of Intent prepared under MYBA MOA terms. 10% deposit held securely in a segregated stakeholder client escrow account at premier European financial institutions."
              },
              {
                step: "02",
                title: "Haul-Out & Sea Trial",
                desc: "Comprehensive drydock inspection, ultrasonic hull plate thickness gauging, MTU/CAT engine oil spectrometry, generator load tests, and 4-hour underway sea trial."
              },
              {
                step: "03",
                title: "Legal & Flag Registry",
                desc: "Title search verifying clean maritime liens, Lloyd's/RINA Class records audit, Greek e-Mitroo commercial registration under Law 4926/2022, and VAT certification."
              },
              {
                step: "04",
                title: "Charter OPEX Offset",
                desc: "Vessel immediately transitions into YachtDesk Central Agency fleet. Projected 8-week summer charter season generates gross income covering ~100% of annual operating expenditure."
              }
            ].map((item) => (
              <div key={item.step} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 relative group hover:border-[#0284C7] transition-colors">
                <div className="text-3xl font-black text-[#0284C7]/20 group-hover:text-[#0284C7]/40 transition-colors mb-2">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-[#0B1E36] mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 bg-[#0B1E36] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">
            Looking for Off-Market Mediterranean Vessels?
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
            Over 40% of Mediterranean superyacht transactions occur discreetly without public MLS advertising. Our S&P brokers maintain direct mandates from Greek shipowners, European family offices, and Vernicos fleet partners.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => handleOpenViewingModal(SALES_FLEET[0].name, "OffMarket")}
              className="px-7 py-3 rounded-full aegean-btn text-xs font-bold uppercase tracking-wider shadow-xl shadow-sky-950/40 hover:opacity-95 transition-all cursor-pointer"
            >
              Request Confidential Off-Market Catalogue
            </button>
            <Link
              href="/sell"
              className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/20 transition-all"
            >
              List Your Yacht With Central Agency
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Sales Modal */}
      <SalesInquiryModal
        isOpen={salesModalOpen}
        onClose={() => setSalesModalOpen(false)}
        defaultYachtName={selectedYachtForModal}
        defaultInquiryType={inquiryTypeForModal}
      />

      {/* Charter Modal */}
      <InquiryModal
        isOpen={charterModalOpen}
        onClose={() => setCharterModalOpen(false)}
      />
    </main>
  );
}
