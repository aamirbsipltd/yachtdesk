"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SalesInquiryModal from "@/components/SalesInquiryModal";
import InquiryModal from "@/components/InquiryModal";
import { SaleYacht } from "@/data/salesFleet";
import {
  Anchor,
  ShieldCheck,
  Compass,
  Gauge,
  Waves,
  Euro,
  DollarSign,
  Calendar,
  Layers,
  Fuel,
  Users,
  Bed,
  CheckCircle2,
  FileText,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Sliders,
  DollarSignIcon,
  Award,
  Maximize,
  HelpCircle,
  TrendingDown,
  Percent,
  Check,
  Printer
} from "lucide-react";

interface SaleYachtDossierClientProps {
  yacht: SaleYacht;
}

export default function SaleYachtDossierClient({ yacht }: SaleYachtDossierClientProps) {
  // State for gallery
  const [activeImage, setActiveImage] = useState<string>(yacht.gallery[0] || yacht.heroImage);
  const [currency, setCurrency] = useState<"EUR" | "USD">("EUR");
  const eurToUsdRate = 1.085;

  // State for GA Deck Plan tabs
  const [activeDeckIndex, setActiveDeckIndex] = useState<number>(0);

  // State for Interactive Proforma Charter Weeks Slider
  const [charterWeeks, setCharterWeeks] = useState<number>(yacht.opexProforma.projectedCharterWeeks || 8);

  // Modals
  const [salesModalOpen, setSalesModalOpen] = useState(false);
  const [modalInquiryType, setModalInquiryType] = useState<"Viewing" | "Survey" | "LOI" | "OffMarket" | "General">("Viewing");
  const [charterModalOpen, setCharterModalOpen] = useState(false);

  // Dynamic calculations based on slider
  const grossCharterRevenue = charterWeeks * yacht.opexProforma.summerWeeklyCharterRate;
  const caCommission = grossCharterRevenue * (yacht.opexProforma.caCommissionAndOpsPercent / 100);
  const netCharterIncome = grossCharterRevenue - caCommission;
  const netAnnualCost = yacht.opexProforma.totalAnnualOpex - netCharterIncome;
  const offsetPercentage = Math.round((netCharterIncome / yacht.opexProforma.totalAnnualOpex) * 100);

  const formatMoney = (valEur: number) => {
    const val = currency === "USD" ? valEur * eurToUsdRate : valEur;
    const symbol = currency === "USD" ? "$" : "€";
    return `${symbol}${Math.round(val).toLocaleString()}`;
  };

  const handleOpenModal = (type: "Viewing" | "Survey" | "LOI") => {
    setModalInquiryType(type);
    setSalesModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0B1E36] selection:bg-sky-200 selection:text-sky-950 relative">
      <Navbar onOpenInquiry={() => setCharterModalOpen(true)} />

      {/* Breadcrumb Header */}
      <div className="pt-28 pb-4 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#02509A] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/sales" className="hover:text-[#02509A] transition-colors">
              Yachts For Sale
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0B1E36] font-bold">{yacht.name}</span>
          </nav>

          <div className="flex items-center gap-3">
            {/* Currency toggle */}
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

            <button
              onClick={() => handleOpenModal("Viewing")}
              className="px-4 py-2 rounded-xl aegean-btn text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer hover:opacity-95"
            >
              Schedule VIP Viewing
            </button>
          </div>
        </div>
      </div>

      {/* Hero Showcase Section */}
      <section className="bg-[#0B1E36] text-white py-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Gallery Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Main Image */}
              <div className="relative h-[340px] sm:h-[460px] rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl">
                <img
                  src={activeImage}
                  alt={yacht.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-white/95 text-[#0B1E36] backdrop-blur-md">
                    {yacht.technicalSpecs.lengthM}m / {yacht.technicalSpecs.lengthFt}ft
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-500 text-white">
                    {yacht.classification.vatStatus}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#0284C7] text-white">
                    {yacht.classification.society}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {yacht.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImage === img ? "border-[#0284C7] scale-105 shadow-md" : "border-white/20 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Vessel Information & Asking Price Box (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-widest text-[#38BDF8] flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{yacht.builder} • {yacht.model}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                  {yacht.name}
                </h1>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>Lying: <strong>{yacht.location}</strong> ({yacht.classification.flagState} Flag)</span>
                </div>
              </div>

              {/* Asking Price Card */}
              <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                      Official Asking Price
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {formatMoney(yacht.askingPriceEur)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#D4AF37] text-slate-950">
                      Central Agency Direct
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Summer Charter Rate</span>
                    <span className="font-bold text-emerald-400">
                      €{(yacht.opexProforma.summerWeeklyCharterRate / 1000).toLocaleString()}k / week
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Greek Registry Status</span>
                    <span className="font-bold text-sky-300">e-Mitroo Compliant</span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-2 space-y-2.5">
                  <button
                    onClick={() => handleOpenModal("Viewing")}
                    className="w-full py-3.5 rounded-2xl aegean-btn font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-sky-950/40 hover:opacity-95 transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Private Viewing / Boarding</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => handleOpenModal("Survey")}
                      className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-sky-400" />
                      <span>Class & Oil Survey</span>
                    </button>
                    <button
                      onClick={() => handleOpenModal("LOI")}
                      className="py-2.5 px-3 rounded-xl bg-[#D4AF37] hover:bg-[#C59B27] text-slate-950 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
                      <span>Submit LOI Offer</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Central Broker Contact Card */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0284C7] to-[#02509A] flex items-center justify-center font-bold text-sm text-white">
                    {yacht.centralBroker.name.split(" ")[0][0]}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{yacht.centralBroker.name}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="text-[10px] text-slate-300">{yacht.centralBroker.title}</div>
                    <div className="text-[10px] text-sky-300">{yacht.centralBroker.office}</div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 text-right">
                  <a
                    href={`tel:${yacht.centralBroker.phone}`}
                    className="text-xs font-mono font-bold text-white hover:text-sky-300 flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-emerald-400" />
                    <span>{yacht.centralBroker.phone}</span>
                  </a>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {yacht.centralBroker.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Spec KPI Banner */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
            <div className="p-2 border-r border-slate-100 last:border-0">
              <div className="text-[10px] font-bold uppercase text-slate-400">Length (LOA)</div>
              <div className="text-lg font-black text-[#0B1E36]">{yacht.technicalSpecs.lengthM}m</div>
              <div className="text-[10px] text-slate-500 font-medium">{yacht.technicalSpecs.lengthFt} ft</div>
            </div>

            <div className="p-2 border-r border-slate-100 last:border-0">
              <div className="text-[10px] font-bold uppercase text-slate-400">Beam</div>
              <div className="text-lg font-black text-[#0B1E36]">{yacht.technicalSpecs.beamM}m</div>
              <div className="text-[10px] text-slate-500 font-medium">{yacht.technicalSpecs.beamFt} ft</div>
            </div>

            <div className="p-2 border-r border-slate-100 last:border-0">
              <div className="text-[10px] font-bold uppercase text-slate-400">Draft</div>
              <div className="text-lg font-black text-[#0B1E36]">{yacht.technicalSpecs.draftM}m</div>
              <div className="text-[10px] text-slate-500 font-medium">{yacht.technicalSpecs.draftFt} ft</div>
            </div>

            <div className="p-2 border-r border-slate-100 last:border-0">
              <div className="text-[10px] font-bold uppercase text-slate-400">Gross Tonnage</div>
              <div className="text-lg font-black text-[#0B1E36]">{yacht.technicalSpecs.grossTonnage}</div>
              <div className="text-[10px] text-slate-500 font-medium">GT (ITC 69)</div>
            </div>

            <div className="p-2 border-r border-slate-100 last:border-0">
              <div className="text-[10px] font-bold uppercase text-slate-400">Guests</div>
              <div className="text-lg font-black text-[#02509A]">{yacht.guests}</div>
              <div className="text-[10px] text-slate-500 font-medium">{yacht.cabins} Cabins</div>
            </div>

            <div className="p-2 border-r border-slate-100 last:border-0">
              <div className="text-[10px] font-bold uppercase text-slate-400">Crew</div>
              <div className="text-lg font-black text-[#0B1E36]">{yacht.crew}</div>
              <div className="text-[10px] text-slate-500 font-medium">Officers & Crew</div>
            </div>

            <div className="p-2 border-r border-slate-100 last:border-0">
              <div className="text-[10px] font-bold uppercase text-slate-400">Cruising Speed</div>
              <div className="text-lg font-black text-[#0B1E36]">{yacht.technicalSpecs.cruisingSpeedKnots} kn</div>
              <div className="text-[10px] text-slate-500 font-medium">Max {yacht.technicalSpecs.maxSpeedKnots} kn</div>
            </div>

            <div className="p-2">
              <div className="text-[10px] font-bold uppercase text-slate-400">Range</div>
              <div className="text-lg font-black text-emerald-600">{yacht.technicalSpecs.rangeNm.toLocaleString()}</div>
              <div className="text-[10px] text-slate-500 font-medium">Nautical Miles</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Section 1: Overview & Naval Architecture Narrative */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-[#02509A] font-bold text-xs uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>Naval Architecture & Vessel Pedigree</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E36]">
                Architectural Integrity & Craftsmanship
              </h2>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {yacht.fullOverview}
            </p>

            {/* Key Architectural Credits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-400">Naval Architect</div>
                <div className="text-xs font-bold text-[#0B1E36] mt-0.5">{yacht.technicalSpecs.navalArchitect}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-400">Exterior Styling</div>
                <div className="text-xs font-bold text-[#0B1E36] mt-0.5">{yacht.technicalSpecs.exteriorDesigner}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-400">Interior Architecture</div>
                <div className="text-xs font-bold text-[#0B1E36] mt-0.5">{yacht.technicalSpecs.interiorDesigner}</div>
              </div>
            </div>

            {/* Key Amenities Grid */}
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-bold text-[#0B1E36]">Distinguished Shipboard Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {yacht.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-100 text-xs font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Specs Side Matrix (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-[#0B1E36] flex items-center gap-2">
                <Gauge className="w-5 h-5 text-[#0284C7]" />
                Technical Specification Matrix
              </h3>
              <span className="text-[11px] font-mono font-bold text-[#02509A]">
                {yacht.classification.society.split("/")[0]}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Classification Society:</span>
                <span className="font-bold text-[#0B1E36] text-right">{yacht.classification.society}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Class Notation:</span>
                <span className="font-mono text-[11px] text-right font-semibold text-slate-800">{yacht.classification.notation}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Flag of Registry:</span>
                <span className="font-bold text-[#0B1E36]">{yacht.classification.flagState}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">EU VAT Status:</span>
                <span className="font-bold text-emerald-600">{yacht.classification.vatStatus}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Commercial Registry:</span>
                <span className="font-bold text-[#02509A]">{yacht.classification.commercialStatus}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Hull Construction:</span>
                <span className="font-semibold text-slate-800">{yacht.technicalSpecs.hullMaterial}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Superstructure:</span>
                <span className="font-semibold text-slate-800">{yacht.technicalSpecs.superstructureMaterial}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Decks:</span>
                <span className="font-semibold text-slate-800">{yacht.technicalSpecs.deckMaterial}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Stabilizer System:</span>
                <span className="font-bold text-[#0284C7] text-right">{yacht.technicalSpecs.stabilizers}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Fuel Capacity:</span>
                <span className="font-semibold text-slate-800">{yacht.technicalSpecs.fuelCapacityL.toLocaleString()} Liters</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Freshwater Capacity:</span>
                <span className="font-semibold text-slate-800">{yacht.technicalSpecs.waterCapacityL.toLocaleString()} Liters</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleOpenModal("Survey")}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#02509A] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Request Certified Class Survey Pack</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: Engineering, Machinery & Propulsion */}
        <section className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#02509A]">
                <Fuel className="w-4 h-4 text-[#0284C7]" />
                <span>Engine Room & Machinery Specifications</span>
              </div>
              <h2 className="text-2xl font-black text-[#0B1E36]">
                Propulsion & Auxiliary Systems
              </h2>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                Zero-Hour Service History Audited
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Main Propulsion Machinery
              </div>
              <div className="text-base font-black text-[#0B1E36]">
                {yacht.engineSpecs.manufacturer}
              </div>
              <div className="text-xs text-slate-600 font-medium">
                {yacht.engineSpecs.model}
              </div>
              <div className="pt-2 text-xs font-bold text-[#02509A]">
                Total Output: {yacht.engineSpecs.totalPowerHp.toLocaleString()} HP
              </div>
              <div className="text-[11px] text-slate-500">
                Recorded Hours: ~{yacht.engineSpecs.engineHours} hrs
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Electrical Generation & Power
              </div>
              <div className="text-base font-black text-[#0B1E36]">
                Auxiliary Generators
              </div>
              <div className="text-xs text-slate-600 font-medium leading-relaxed">
                {yacht.engineSpecs.generators}
              </div>
              <div className="pt-2 text-xs font-bold text-[#02509A]">
                Parallel Sync & Emergency Load Panel
              </div>
              <div className="text-[11px] text-slate-500">
                Seamless Shore Power Converter (400V 50Hz)
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Propulsion & Shafting
              </div>
              <div className="text-base font-black text-[#0B1E36]">
                Drivetrain & Steering
              </div>
              <div className="text-xs text-slate-600 font-medium leading-relaxed">
                {yacht.engineSpecs.propulsionType}
              </div>
              <div className="pt-2 text-xs font-bold text-emerald-600">
                Stabilization: {yacht.technicalSpecs.stabilizers.split(" ")[0]} Active Roll System
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: General Arrangement (GA) Deck Plans */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#02509A]">
              <Layers className="w-4 h-4 text-[#0284C7]" />
              <span>General Arrangement & Accommodation Layout</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E36]">
              Deck-by-Deck GA Architectural Layout
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Optimized for private owner seclusion, seamless guest hospitality, and discrete crew service passageways.
            </p>
          </div>

          {/* Deck Selectors */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
            {yacht.deckPlans.map((deck, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDeckIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeDeckIndex === idx
                    ? "aegean-btn shadow-md shadow-sky-900/15"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {deck.deckName}
              </button>
            ))}
          </div>

          {/* Selected Deck Overview Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-black text-[#0B1E36]">
                {yacht.deckPlans[activeDeckIndex].deckName}
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed max-w-3xl">
                {yacht.deckPlans[activeDeckIndex].description}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Key Architectural Highlights on this Deck:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {yacht.deckPlans[activeDeckIndex].features.map((feat, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-[#0B1E36] flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Tenders & Toys */}
        <section className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#02509A]">
              <Waves className="w-4 h-4 text-[#0284C7]" />
              <span>Equipment, Tenders & Water Sports Garage</span>
            </div>
            <h2 className="text-2xl font-black text-[#0B1E36]">
              Inventory Included in Sale Price
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {yacht.tendersToys.map((toy, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-100 text-xs font-semibold text-slate-800 flex items-start gap-2.5"
              >
                <Check className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                <span>{toy}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Interactive Operating Cost & Charter Offset Proforma */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0B1E36] via-[#0F2D52] to-[#071526] text-white shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#0284C7]/20 blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="space-y-3 relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-sky-300 font-bold text-xs uppercase tracking-widest border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Commercial Proforma & Yield Engineering</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Annual OPEX & Charter Income Offset Model
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Superyacht ownership operating expenditure typically averages 8% to 10% of vessel acquisition value. By enrolling {yacht.name} into YachtDesk’s Central Agency charter management program, peak Mediterranean summer charter bookings offset operating overhead while preserving exclusive owner usage.
            </p>
          </div>

          {/* Slider & Dynamic Calculation Controls */}
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-4 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#38BDF8]" />
                  Projected Summer Charter Weeks per Season
                </label>
                <span className="text-xs text-slate-300">
                  (Mediterranean high season June through September = 16 available weeks)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl font-black text-[#D4AF37] font-mono">
                  {charterWeeks} Weeks
                </span>
                <span className="text-xs text-slate-300">
                  (@ €{(yacht.opexProforma.summerWeeklyCharterRate / 1000).toLocaleString()}k/wk)
                </span>
              </div>
            </div>

            <input
              type="range"
              min={4}
              max={12}
              step={1}
              value={charterWeeks}
              onChange={(e) => setCharterWeeks(Number(e.target.value))}
              className="w-full accent-[#0284C7] cursor-pointer h-2 bg-slate-700 rounded-lg"
            />

            <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <span>4 Weeks (Conservative)</span>
              <span>8 Weeks (Vernicos Average Baseline)</span>
              <span>12 Weeks (Max High Yield)</span>
            </div>
          </div>

          {/* Financial Breakdown Grid: OPEX vs Revenue */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
            {/* Left: Annual OPEX Budget Breakdown */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-rose-400" />
                  Estimated Annual OPEX Budget
                </h3>
                <span className="text-xs font-mono text-slate-300">Annual Run-Rate</span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Crew Salaries & Onboard Provisions ({yacht.crew} crew):</span>
                  <span className="font-mono font-bold text-white">{formatMoney(yacht.opexProforma.crewSalaries)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Home Berth / Marina Flisvos / Alimos:</span>
                  <span className="font-mono font-bold text-white">{formatMoney(yacht.opexProforma.berthMooring)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Marine Hull & Machinery (H&M) / P&I Insurance:</span>
                  <span className="font-mono font-bold text-white">{formatMoney(yacht.opexProforma.insuranceHullPI)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Scheduled Maintenance, Haul-out & Drydock:</span>
                  <span className="font-mono font-bold text-white">{formatMoney(yacht.opexProforma.maintenanceYard)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Commercial Class Audits & ISM/ISPS Management:</span>
                  <span className="font-mono font-bold text-white">{formatMoney(yacht.opexProforma.managementCompliance)}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                <span className="text-xs font-bold text-white uppercase">Total Annual Operating OPEX:</span>
                <span className="text-xl font-black text-white font-mono">
                  {formatMoney(yacht.opexProforma.totalAnnualOpex)}
                </span>
              </div>
            </div>

            {/* Right: Charter Income Offset Breakdown */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Projected Charter Income Offset ({charterWeeks} Weeks)
                </h3>
                <span className="text-xs font-mono text-emerald-400">YachtDesk Central Agency</span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Gross Summer Charter Revenue ({charterWeeks} wks @ {formatMoney(yacht.opexProforma.summerWeeklyCharterRate)}):</span>
                  <span className="font-mono font-bold text-emerald-400">+{formatMoney(grossCharterRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Central Agency Commission & Ops (15%):</span>
                  <span className="font-mono text-slate-400">-{formatMoney(caCommission)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Charterer APA & Greek VAT (Law 4926):</span>
                  <span className="font-mono text-slate-400">Paid by Charterer (Direct)</span>
                </div>
                <div className="flex justify-between font-bold text-emerald-300 pt-1">
                  <span>Net Charter Income to Owner Account:</span>
                  <span className="font-mono text-base">+{formatMoney(netCharterIncome)}</span>
                </div>
              </div>

              {/* Bottom Result Callout */}
              <div className="pt-3 border-t border-white/10 p-4 rounded-xl bg-white/10 space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase font-bold text-slate-200">
                    Net Annual Cost of Ownership:
                  </span>
                  <span className={`text-2xl font-black font-mono ${
                    netAnnualCost <= 0 ? "text-emerald-400" : "text-[#D4AF37]"
                  }`}>
                    {netAnnualCost <= 0 ? `+${formatMoney(Math.abs(netAnnualCost))} (Net Surplus)` : formatMoney(netAnnualCost)}
                  </span>
                </div>
                <div className="text-[11px] text-sky-200">
                  Charter bookings cover <strong>{offsetPercentage}%</strong> of vessel running costs while leaving 8+ weeks open for private family cruising.
                </div>
              </div>
            </div>
          </div>

          {/* CTA Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 relative z-10">
            <div className="text-xs text-slate-300">
              Request a custom proforma tailored to your tax residency and preferred flag state.
            </div>
            <button
              onClick={() => handleOpenModal("LOI")}
              className="px-6 py-3 rounded-full bg-[#D4AF37] hover:bg-[#C59B27] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
            >
              Request Formal Financial Dossier
            </button>
          </div>
        </section>

        {/* Section 6: S&P Purchase Procedure */}
        <section className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#02509A]">
              <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
              <span>Standard S&P Transaction Roadmap</span>
            </div>
            <h2 className="text-2xl font-black text-[#0B1E36]">
              MYBA Memorandum of Agreement (MOA) Procedure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-[#02509A]">PHASE 1</div>
              <div className="text-sm font-bold text-[#0B1E36]">Letter of Intent (LOI)</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Initial binding purchase offer subject to condition survey, sea trial, and class record inspection.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-[#02509A]">PHASE 2</div>
              <div className="text-sm font-bold text-[#0B1E36]">10% Escrow Deposit</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                10% purchase deposit lodged in regulated stakeholder client escrow account prior to haul-out.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-[#02509A]">PHASE 3</div>
              <div className="text-sm font-bold text-[#0B1E36]">Surveys & Sea Trial</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Drydock inspection, hull thickness analysis, main engine oil spectrometry, and 4-hour sea trial.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-black text-[#02509A]">PHASE 4</div>
              <div className="text-sm font-bold text-[#0B1E36]">Protocol of Delivery</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bill of Sale execution, deletion certificate, e-Mitroo registration transfer, and escrow disbursement.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      {/* S&P Inquiries Modal */}
      <SalesInquiryModal
        isOpen={salesModalOpen}
        onClose={() => setSalesModalOpen(false)}
        defaultYachtName={yacht.name}
        defaultInquiryType={modalInquiryType}
      />

      {/* Charter Inquiries Modal */}
      <InquiryModal
        isOpen={charterModalOpen}
        onClose={() => setCharterModalOpen(false)}
        defaultYachtName={yacht.name}
      />
    </main>
  );
}
