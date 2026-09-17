"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";
import {
  Anchor,
  ShieldCheck,
  Building2,
  Lock,
  Clock,
  Zap,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  Send,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Download,
  Share2,
  RefreshCw,
  Sliders,
  DollarSign,
  Euro,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Ship,
  Phone,
  MessageSquare,
  Check,
  X,
  Layers,
  Award,
  Globe2,
  ExternalLink,
  Compass
} from "lucide-react";

export default function FleetPartnersPage() {
  const [charterModalOpen, setCharterModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"partner" | "whitelabel">("partner");
  const [demoTab, setDemoTab] = useState<"holds" | "vat" | "proposal" | "myba">("holds");

  // Form State
  const [formData, setFormData] = useState({
    fleetName: "",
    contactName: "",
    role: "Central Agent / Fleet Director",
    email: "",
    phone: "",
    fleetSize: "6-15 yachts",
    fleetBase: "Athens / Marina Alimos",
    listingLink: "",
    plan: "partner", // "partner" | "whitelabel"
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionRef, setSubmissionRef] = useState("");

  // Interactive VAT / Commission Simulator State
  const [simWeeklyRate, setSimWeeklyRate] = useState<number>(85000);
  const simVatRate = 0.12; // Greek Law 4926/2022 commercial charter VAT 12%
  const simApaRate = 0.35; // Standard 35% APA
  const simCaCommissionRate = 0.05; // 5% CA Commission (100% retained by Fleet Manager)

  const simVatAmount = Math.round(simWeeklyRate * simVatRate);
  const simApaAmount = Math.round(simWeeklyRate * simApaRate);
  const simCaCommission = Math.round(simWeeklyRate * simCaCommissionRate);
  const simTotalEscrow = simWeeklyRate + simVatAmount + simApaAmount;

  // Interactive 48-Hour Hold Countdown Simulation
  const [holdHoursRemaining, setHoldHoursRemaining] = useState<number>(37);
  const [holdMinutesRemaining, setHoldMinutesRemaining] = useState<number>(42);
  const [holdSecondsRemaining, setHoldSecondsRemaining] = useState<number>(18);
  const [holdStatus, setHoldStatus] = useState<"hold" | "released" | "confirmed">("hold");

  useEffect(() => {
    if (holdStatus !== "hold") return;
    const interval = setInterval(() => {
      setHoldSecondsRemaining((prev) => {
        if (prev > 0) return prev - 1;
        setHoldMinutesRemaining((m) => (m > 0 ? m - 1 : 59));
        return 59;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [holdStatus]);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "fleet_partner",
          company: formData.fleetName,
          name: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          plan: formData.plan,
          fleetSize: formData.fleetSize,
          fleetBase: formData.fleetBase,
          listingLink: formData.listingLink,
          notes: formData.notes,
        }),
      });
      const data = await res.json();
      const ref = data.leadId || ("ATH-CA-" + Math.floor(1000 + Math.random() * 9000));
      setSubmissionRef(ref);
      setSubmitted(true);
    } catch (err) {
      console.warn("Intake submission error:", err);
      const fallbackRef = "ATH-CA-" + Math.floor(1000 + Math.random() * 9000);
      setSubmissionRef(fallbackRef);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
      const target = document.getElementById("intake-form");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const selectPlanForForm = (plan: "partner" | "whitelabel") => {
    setSelectedPlan(plan);
    setFormData((prev) => ({ ...prev, plan }));
    const formElement = document.getElementById("intake-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const faqs = [
    {
      q: "Do I have to get on a sales call to start?",
      a: "No. YachtDesk is built for 100% autonomous, self-serve onboarding. Greek fleet managers and central agents are busy running peak-season turnarounds in Alimos, Flisvos, and Lavrion. Simply enter your fleet details, Yachtfolio ID, or website link. Our desk verifies commercial e-Mitroo status and syncs your calendar within 4 business hours without scheduling a single Zoom or sales pitch call."
    },
    {
      q: "How is my 5.0% Central Agency (CA) commission protected?",
      a: "Under standard MYBA Worldwide Yachting Agreement (WYA) terms, when YachtDesk introduces a retail charterer or family office, YachtDesk acts as the Introducing Broker (IB). You retain 100% of your contractual 5.0% Central Agency commission. We never request a cut of your CA fee, and all commission splits are explicitly codified in the standard MYBA charter agreement."
    },
    {
      q: "Where do client charter deposits and APA funds get wired?",
      a: "All client charter funds, VAT, and Advance Provisioning Allowances (APA) are wired directly into your designated Hellenic or European stakeholder client escrow account (e.g., National Bank of Greece, Eurobank, Alpha Bank). YachtDesk never intercepts or holds your client charter funds. You maintain total financial custody at all times."
    },
    {
      q: "Can I sync my existing Yachtfolio or Booking Manager calendars?",
      a: "Yes. YachtDesk provides automated two-way synchronization with Yachtfolio, Booking Manager (MMK), and standard iCal feeds. When a 48-hour option hold or confirmed booking is logged on YachtDesk, your availability updates automatically to prevent double bookings across all retail broker channels."
    },
    {
      q: "What if one of my charter yachts is also listed for sale?",
      a: "If your yacht is on the market, YachtDesk places it for free into our €5M–€30M S&P acquisition suite. High-net-worth international family offices actively seek turnkey Hellenic commercial vessels with proven charter revenue to offset holding OPEX. You maintain full Central Agency sale representation and standard broker commissions."
    },
    {
      q: "What is the exact difference between the €0 Partner plan and the White-Label OS?",
      a: "The Central Agency Partner plan (€0/month) is 100% performance-based: we distribute your fleet to verified international charterers and family offices, wiring funds to your escrow while you keep your full 5% CA commission with zero fixed costs. The Enterprise Fleet OS (€1,950/month or €19,500/year) is for running your internal agency: you get unlimited use of our 30-second proposal builder, automated MYBA generator, custom branding with your agency logo, multi-user broker seats, and peak-season SLA for your direct in-house retail clients."
    }
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0B1E36] selection:bg-sky-200 selection:text-sky-950 relative">
      {/* Top Protocol Announcement Bar */}
      <div className="bg-[#0B1E36] text-white text-[11px] py-2 px-4 border-b border-sky-900/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-sky-200">Greek Law 4926/2022 Central Agency Framework:</span>
            <span className="text-slate-300">Direct Escrow • 100% CA Commission Retention • Zero Sales Calls Required</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 font-medium">
            <span className="hidden sm:inline">Athens Desk: Alimos, Flisvos & Lavrion</span>
            <a
              href="#intake-form"
              className="text-[#38BDF8] hover:text-white font-bold transition-colors flex items-center gap-1"
            >
              Onboard Fleet Now <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <Navbar onOpenInquiry={() => setCharterModalOpen(true)} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-[#071526] via-[#0B1E36] to-[#0F2D52] text-white overflow-hidden">
        {/* Subtle Cycladic grid & ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#0284C7_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#0284C7]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold tracking-wider uppercase text-sky-300 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Greek Law 4926/2022 & e-Mitroo Certified</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-xs font-bold tracking-wider uppercase text-emerald-300 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Self-Serve • Zero Sales Calls</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.12]">
              The Automated Fleet Management & Distribution System for <br className="hidden sm:inline" />
              <span className="aegean-gradient-text">Greek Central Agents</span>
            </h1>

            {/* Subheadline addressing exact pain points */}
            <p className="text-slate-300 text-sm sm:text-lg leading-relaxed max-w-3xl mx-auto">
              Tailored specifically for fleet directors in Athens, Alimos, Lavrion, and Piraeus. Eliminate peak-season WhatsApp inquiry chaos, automate 48-hour option holds, calculate Greek Law 4926/2022 VAT (12%) + APA (30-35%) instantly with zero math errors, generate MYBA agreements in 30 seconds, and syndicate into global charter & S&P buyers — with <strong>100% CA commission retention</strong>.
            </p>

            {/* Dual CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#intake-form"
                className="w-full sm:w-auto px-8 py-4 rounded-full aegean-btn font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-sky-900/30 hover:opacity-95 transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white" />
                Onboard Your Fleet (2 Min • No Sales Call)
              </a>

              <a
                href="#live-demo"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 font-bold text-xs sm:text-sm uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-all cursor-pointer backdrop-blur-sm"
              >
                <Sliders className="w-4 h-4 text-[#D4AF37]" />
                Test Live Operating Tools
              </a>
            </div>

            {/* Commercial Highlights Bar */}
            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-left border-t border-white/10 mt-10">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl font-black text-white">100%</div>
                <div className="text-[11px] font-bold text-[#38BDF8] uppercase tracking-wider mt-0.5">CA Commission Kept</div>
                <div className="text-[11px] text-slate-300 mt-1">You retain your full 5.0% Central Agency fee on every charter.</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl font-black text-white">30-Sec</div>
                <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mt-0.5">Proposal Generation</div>
                <div className="text-[11px] text-slate-300 mt-1">High-res client decks with specs, toys & 7-day Cyclades routes.</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl font-black text-white">Zero</div>
                <div className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mt-0.5">Double Bookings</div>
                <div className="text-[11px] text-slate-300 mt-1">Automated 48h holds synced across Yachtfolio & iCal feeds.</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl font-black text-white">€0 / mo</div>
                <div className="text-[11px] font-bold text-sky-300 uppercase tracking-wider mt-0.5">Performance Partner</div>
                <div className="text-[11px] text-slate-300 mt-1">No monthly SaaS fee, no setup fee, zero financial risk.</div>
              </div>
            </div>

            {/* Operating Hubs Bar */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-300 font-medium">
              <span className="text-slate-400 uppercase tracking-widest text-[10px] font-bold">Serving Fleets Across:</span>
              <span className="hover:text-white transition-colors">Marina Alimos</span>
              <span>•</span>
              <span className="hover:text-white transition-colors">Marina Flisvos</span>
              <span>•</span>
              <span className="hover:text-white transition-colors">Olympic Marine Lavrion</span>
              <span>•</span>
              <span className="hover:text-white transition-colors">Marina Zeas (Piraeus)</span>
              <span>•</span>
              <span className="hover:text-white transition-colors">Gouvia Corfu</span>
              <span>•</span>
              <span className="hover:text-white transition-colors">Mykonos Tourlos</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: The Bottlenecks You Face Every Season vs How YachtDesk Automates It */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold tracking-wider uppercase">
              <AlertCircle className="w-3.5 h-3.5 text-red-600" />
              <span>The True Cost of Peak-Season Friction</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1E36] tracking-tight">
              The Bottlenecks You Face Every Season <br />
              <span className="aegean-gradient-text">vs. How YachtDesk Automates It</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every summer, Greek central agents lose dozens of high-value weeks because building quotes takes 4 hours, calculations in Excel are prone to costly VAT audits, and tracking holds on WhatsApp leads to double-booking panic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Old Manual Way */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-red-200/80 shadow-md shadow-red-950/5 space-y-6">
              <div className="flex items-center justify-between border-b border-red-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
                    ✕
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#0B1E36] text-lg">Traditional Greek Fleet Desk</h3>
                    <p className="text-xs text-red-600 font-semibold">Manual WhatsApp & Excel Chaos</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                  High Overhead
                </span>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                  <div>
                    <strong>15+ Hours/Week on WhatsApp Inquiries:</strong> Answering retail brokers asking "Is X yacht free July 15-22?", checking paper notes, and manually typing replies all day long.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                  <div>
                    <strong>Excel Math Errors & VAT Audit Risk:</strong> Calculating Greek Law 4926/2022 commercial 12% VAT, 30-35% APA, and repositioning delivery fees manually. One formula mistake triggers severe tax fines.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                  <div>
                    <strong>Lost Charters to Faster Competitors:</strong> Spending 3 to 4 hours downloading Dropbox photos, formatting PDF spec sheets, and typing toy lists. By then, the client booked another yacht.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                  <div>
                    <strong>Double-Booking Fear & Expired Holds:</strong> Tracking tentative 48-hour option holds across email threads and notebooks, leading to furious broker disputes when two clients claim the same week.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                  <div>
                    <strong>€35k–€50k/Year Junior Coordinator Cost:</strong> Burning hard-earned agency profits to pay junior staff who spend all season copy-pasting calendar dates and re-typing MYBA contracts.
                  </div>
                </li>
              </ul>
            </div>

            {/* The YachtDesk Automated Way */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-sky-300 shadow-xl shadow-sky-950/10 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-bl-full pointer-events-none" />

              <div className="flex items-center justify-between border-b border-sky-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#02509A] to-[#0284C7] text-white flex items-center justify-center font-bold shadow-md">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#0B1E36] text-lg">YachtDesk Autonomous Operating Desk</h3>
                    <p className="text-xs text-[#0284C7] font-semibold">Zero Calls • Instant Precision</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  €0 Fixed Cost
                </span>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                  <div>
                    <strong>Instant Real-Time Calendar Sync:</strong> Automated calendar status synced directly with Yachtfolio, Booking Manager (MMK), and iCal feeds. Real-time availability in seconds.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                  <div>
                    <strong>Automated Greek Law 4926/2022 Tax Engine:</strong> 12% commercial charter VAT, APA escrow amounts, and nautical delivery fees calculated with statutory precision in 1 click.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                  <div>
                    <strong>30-Second Luxury Client Dossier Builder:</strong> Generate high-res PDF presentations complete with full vessel specs, water toys, crew profiles, and curated Cyclades/Ionian route itineraries.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                  <div>
                    <strong>Zero Double-Booking 48h Option Engine:</strong> Automated visual countdown timers, automatic hold expiry release, and verified broker option locks that protect your fleet schedule.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                  <div>
                    <strong>Automated MYBA Contract Pre-Filler:</strong> Standard MYBA Worldwide Yachting Agreement auto-populated with your vessel’s e-Mitroo ID, Athens client escrow IBAN, and Meltemi weather clauses.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Competitor Pricing & Value Comparison (Crucial B2B Matrix) */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#02509A] text-xs font-bold tracking-wider uppercase">
              <DollarSign className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Transparent Market Benchmark</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B1E36] tracking-tight">
              Where YachtDesk Fits In Your Tech Stack <br className="hidden sm:block" />
              <span className="aegean-gradient-text">Complementing Your Existing Accreditations</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              An objective breakdown of what industry platforms and payroll provide — and how YachtDesk delivers the automated client execution layer at €0 setup.
            </p>
          </div>

          {/* 4-Card Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Card 1: Yachtfolio */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Accreditation Database</div>
                <h3 className="text-lg font-black text-[#0B1E36]">YACHTFOLIO (MYBA)</h3>
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                  <div className="text-slate-800 font-bold">€2,500 Admin / Vetting Fee</div>
                  <div className="text-slate-600 font-semibold">+ €1,500 – €4,500 / Year</div>
                  <div className="text-[11px] text-slate-500">Industry-standard B2B MLS credential</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">What the fee provides:</div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 font-bold">✓</span>
                      <span>MYBA compliance audit & credentialing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 font-bold">✓</span>
                      <span>Professional indemnity & escrow verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 font-bold">✓</span>
                      <span>Access to 1,500+ vetted global retail brokers</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Operational limits:</div>
                  <ul className="space-y-1.5 text-xs text-slate-500">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>Static B2B MLS; no client proposal generator</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>No Greek Law 4926 dynamic VAT/APA calculator</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 text-[11px] text-[#02509A] font-semibold bg-sky-50/50 p-2.5 rounded-xl">
                YachtDesk Synergy: We sync directly with your Yachtfolio fleet so you keep your accreditation while automating proposals.
              </div>
            </div>

            {/* Card 2: Booking Manager (MMK) */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Bareboat Network</div>
                <h3 className="text-lg font-black text-[#0B1E36]">Booking Manager (MMK)</h3>
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                  <div className="text-slate-800 font-bold">€800 – €1,500 Setup Fee</div>
                  <div className="text-slate-600 font-semibold">+ €1,800 – €4,800 / Year</div>
                  <div className="text-[11px] text-slate-500">Agency distribution & onboarding</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">What the fee provides:</div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 font-bold">✓</span>
                      <span>Technical fleet onboarding & specification import</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 font-bold">✓</span>
                      <span>Syndication to 3,000+ European travel agencies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 font-bold">✓</span>
                      <span>Base management & port crew list exports</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Operational limits:</div>
                  <ul className="space-y-1.5 text-xs text-slate-500">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>Engineered for bareboats, not luxury superyachts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>No APA provisioning or S&P acquisition suite</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 text-[11px] text-[#02509A] font-semibold bg-sky-50/50 p-2.5 rounded-xl">
                YachtDesk Synergy: We import your MMK calendar feed to power luxury crewed proposals without replacing your agency distribution.
              </div>
            </div>

            {/* Card 3: Hiring In-House Admin/Junior Broker */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">In-House Payroll</div>
                <h3 className="text-lg font-black text-[#0B1E36]">In-House Coordinator</h3>
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                  <div className="text-slate-800 font-bold">€30,000 – €45,000 / Year</div>
                  <div className="text-slate-600 font-semibold">+ EFKA Social Contributions</div>
                  <div className="text-[11px] text-slate-500">Fixed annual overhead & payroll</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">What the cost provides:</div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 font-bold">✓</span>
                      <span>Physical office presence in Athens / Alimos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 font-bold">✓</span>
                      <span>Manual phone answering & base coordination</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 font-bold">✓</span>
                      <span>Ad-hoc errand handling during turnarounds</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Operational limits:</div>
                  <ul className="space-y-1.5 text-xs text-slate-500">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>2–4 hours per proposal; high summer turnover</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>Manual Excel formula errors on Greek VAT/APA</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 text-[11px] text-[#02509A] font-semibold bg-sky-50/50 p-2.5 rounded-xl">
                YachtDesk Synergy: Enables a single central agent to manage 25+ yachts without hiring additional coordinators.
              </div>
            </div>

            {/* Card 4: YachtDesk Autonomous Engine (Winner) */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-[#02509A] shadow-2xl shadow-sky-950/15 flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-[#02509A] to-[#0284C7] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-bl-xl shadow-sm">
                Modern Standard
              </div>

              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-[#0284C7] uppercase tracking-wider">YachtDesk Autonomous OS</div>
                <h3 className="text-lg font-black text-[#0B1E36]">YachtDesk Central Desk</h3>
                
                <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-xs space-y-1">
                  <div className="text-emerald-700 font-extrabold text-sm">Partner Tier: €0 Setup, €0 / Month</div>
                  <div className="text-[#02509A] font-bold">100% CA Commission Kept (5%)</div>
                  <div className="text-[11px] text-slate-500">Or Enterprise Standalone OS: €1,950 / Month</div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Instant 30s PDF Proposals:</strong> High-res luxury dossiers with toys & routes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Automated Greek Law 4926 Math:</strong> 12% VAT, APA & delivery fees in 1 click</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Zero Double Bookings:</strong> 48h holds synced with Yachtfolio & iCal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Free S&P Placement:</strong> Syndicated into €5M–€30M buyer suite</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Direct Athens Escrow:</strong> Client funds wired directly to your IBAN</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-sky-100">
                <a
                  href="#intake-form"
                  className="w-full py-3 rounded-xl aegean-btn font-extrabold text-xs uppercase tracking-wider shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  Onboard Fleet (2 Min • €0)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: What Your Desk Gets - Feature Grid */}
      <section className="py-24 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#02509A] text-xs font-bold tracking-wider uppercase">
              <Award className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Full-Stack Fleet Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B1E36] tracking-tight">
              What Your Central Agency <br className="hidden sm:block" />
              <span className="aegean-gradient-text">Gets On Day One</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              No software installation required. Everything operates from a fast web portal and integrates directly into your existing commercial workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-sky-300 transition-all hover:shadow-lg space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#02509A] to-[#0284C7] flex items-center justify-center text-white shadow-md shadow-sky-900/10">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#0B1E36]">Zero Double-Booking Calendar Engine</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Visual 48-hour option holds with automated live countdowns and status locks. Synchronizes bidirectionally with Yachtfolio, Booking Manager (MMK), and standard iCal feeds so overlapping broker requests are automatically queued without collisions.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#02509A]">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Automated Expiry & Release</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-sky-300 transition-all hover:shadow-lg space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0284C7] to-[#38BDF8] flex items-center justify-center text-white shadow-md shadow-sky-900/10">
                <Sparkles className="w-6 h-6 text-slate-950" />
              </div>
              <h3 className="text-xl font-black text-[#0B1E36]">Instant 30-Sec Client Proposal Builder</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Turn a retail inquiry into a high-res, luxury PDF proposal within 30 seconds. Includes high-res photography, deck arrangements, water toys inventory (Seabobs, e-foils, tender specs), and custom 7-day Cyclades or Ionian routes.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#02509A]">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>PDF-Ready Luxury Export</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-sky-300 transition-all hover:shadow-lg space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0B1E36] to-[#02509A] flex items-center justify-center text-white shadow-md shadow-sky-900/10">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#0B1E36]">Automated MYBA Contract Generator</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard MYBA Worldwide Yachting Agreement (WYA) pre-populated with your commercial vessel's Greek e-Mitroo registration number, stakeholder client escrow IBAN, APA installment schedule, and Hellenic Coast Guard Meltemi wind clauses.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#02509A]">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Standard MYBA WYA Pre-Filled</span>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-sky-300 transition-all hover:shadow-lg space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#B48C36] to-[#D4AF37] flex items-center justify-center text-slate-950 shadow-md">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#0B1E36]">Sale & Purchase (S&P) Exposure</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                For yachts also on the market, YachtDesk places them at zero additional cost into our €5M–€30M S&P acquisition suite, presented directly to verified international family offices looking to acquire commercial charter assets to offset holding OPEX.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#02509A]">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Dual-Track Charter + Sale Synergies</span>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-sky-300 transition-all hover:shadow-lg space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#0B1E36]">Greek Law 4926/2022 Tax Engine</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Built-in regulatory calculation for the Greek commercial 12% charter VAT regime, commercial fuel duty exemptions, statutory crew minimums, and port authority paperwork templates to protect against Hellenic tax audit liabilities.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#02509A]">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>100% Tax & Legal Compliance</span>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-sky-300 transition-all hover:shadow-lg space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 flex items-center justify-center text-white shadow-md">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#0B1E36]">Direct Athens Escrow Protection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All client charter deposits and Advance Provisioning Allowances (APA) are wired directly into your designated Hellenic stakeholder client escrow account. YachtDesk never touches your money or holds client funds.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#02509A]">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero Intermediary Risk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Interactive Live Demo & Simulator */}
      <section id="live-demo" className="py-24 bg-gradient-to-b from-[#F8FAFC] via-[#EDF6FF] to-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-sky-200 text-[#02509A] text-xs font-bold tracking-wider uppercase shadow-sm">
              <Sliders className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Interactive Central Agency Simulator</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B1E36] tracking-tight">
              Test Drive The Operating Engine
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Experience the exact workflows that eliminate 15+ hours of coordinator manual labor every single week.
            </p>
          </div>

          {/* Interactive Tabs */}
          <div className="max-w-4xl mx-auto mb-8 flex flex-wrap items-center justify-center gap-2 bg-slate-200/80 p-1.5 rounded-2xl">
            <button
              onClick={() => setDemoTab("holds")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                demoTab === "holds"
                  ? "bg-white text-[#02509A] shadow-md shadow-sky-900/10"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Clock className="w-4 h-4 text-[#0284C7]" />
              48h Option Hold Engine
            </button>

            <button
              onClick={() => setDemoTab("vat")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                demoTab === "vat"
                  ? "bg-white text-[#02509A] shadow-md shadow-sky-900/10"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Euro className="w-4 h-4 text-[#D4AF37]" />
              Greek VAT & Escrow Calculator
            </button>

            <button
              onClick={() => setDemoTab("proposal")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                demoTab === "proposal"
                  ? "bg-white text-[#02509A] shadow-md shadow-sky-900/10"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles className="w-4 h-4 text-sky-500" />
              30-Sec Proposal Dossier
            </button>

            <button
              onClick={() => setDemoTab("myba")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                demoTab === "myba"
                  ? "bg-white text-[#02509A] shadow-md shadow-sky-900/10"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              MYBA Contract Pre-Filler
            </button>
          </div>

          {/* Interactive Screen Container */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-sky-200 shadow-xl shadow-sky-900/10 p-6 sm:p-10">
            {/* TAB 1: 48H OPTION HOLDS */}
            {demoTab === "holds" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0284C7]">
                      Live Central Agency Hold Status
                    </span>
                    <h3 className="text-xl font-black text-[#0B1E36]">M/Y AEGEAN ODYSSEY (42.6m Custom Line)</h3>
                    <p className="text-xs text-slate-500 font-medium">Home Port: Marina Flisvos, Athens • e-Mitroo: GR-9824-COMM</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500">Peak Season Charter Week</span>
                    <div className="text-sm font-bold text-[#0B1E36]">July 18 – July 25 (Cyclades Route)</div>
                  </div>
                </div>

                {/* Hold Status Banner */}
                <div className="p-6 rounded-2xl bg-sky-50 border border-sky-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {holdStatus === "hold" && (
                          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-amber-300">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                            Active 48h Option Hold
                          </span>
                        )}
                        {holdStatus === "released" && (
                          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Hold Released • Instant Available
                          </span>
                        )}
                        {holdStatus === "confirmed" && (
                          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-blue-300">
                            <Check className="w-3.5 h-3.5" />
                            Confirmed MYBA Fixture
                          </span>
                        )}
                        <span className="text-xs text-slate-500">Introducing Broker: Burgess London (Ref #IB-4491)</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        {holdStatus === "hold" && "Option hold expires automatically unless confirmed with 50% escrow deposit."}
                        {holdStatus === "released" && "Week immediately liberated and broadcast to verified broker network."}
                        {holdStatus === "confirmed" && "Escrow deposit confirmed. MYBA contract dispatched to Hellenic port police."}
                      </p>
                    </div>

                    {/* Countdown Timer */}
                    {holdStatus === "hold" && (
                      <div className="bg-white p-3 rounded-xl border border-sky-200 text-center shadow-sm shrink-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Hold Countdown</span>
                        <div className="text-2xl font-black font-mono text-[#02509A]">
                          {String(holdHoursRemaining).padStart(2, "0")}:{String(holdMinutesRemaining).padStart(2, "0")}:{String(holdSecondsRemaining).padStart(2, "0")}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Interactive Controls */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setHoldStatus("released")}
                      className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Simulate 48h Expiry (Release)
                    </button>
                    <button
                      onClick={() => setHoldStatus("confirmed")}
                      className="px-4 py-2 rounded-xl aegean-btn text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                    >
                      Confirm Booking & Lock Schedule
                    </button>
                    <button
                      onClick={() => setHoldStatus("hold")}
                      className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Reset Demo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Yachtfolio Sync</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Synced (ID #29401)
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Booking Manager (MMK)</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Connected (API v2)
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Double Booking Defense</span>
                    <span className="font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Active & Locked
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: GREEK LAW 4926 VAT & COMMISSION CALCULATOR */}
            {demoTab === "vat" && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0284C7]">
                    Greek Law 4926/2022 Financial Breakdown
                  </span>
                  <h3 className="text-xl font-black text-[#0B1E36]">Statutory Charter VAT & Escrow Proforma</h3>
                  <p className="text-xs text-slate-500">
                    Slide the weekly base charter rate to test real-time tax calculation and 100% CA commission retention.
                  </p>
                </div>

                {/* Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-700 uppercase tracking-wider">Weekly Base Rate</label>
                    <span className="text-xl font-black text-[#02509A] font-mono">
                      €{simWeeklyRate.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="35000"
                    max="220000"
                    step="5000"
                    value={simWeeklyRate}
                    onChange={(e) => setSimWeeklyRate(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#02509A]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>€35,000 (30m Catamaran)</span>
                    <span>€125,000 (45m Motor Yacht)</span>
                    <span>€220,000 (60m Mega Yacht)</span>
                  </div>
                </div>

                {/* Financial Output Table */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center text-slate-700 py-1 border-b border-slate-200/60">
                    <span className="font-sans font-semibold">1. Base Charter Gross:</span>
                    <span className="font-bold text-slate-900">€{simWeeklyRate.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-700 py-1 border-b border-slate-200/60">
                    <span className="font-sans font-semibold flex items-center gap-1">
                      2. Greek Law 4926/2022 VAT (12% Commercial):
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-mono">Hellenic Code</span>
                    </span>
                    <span className="font-bold text-slate-900">€{simVatAmount.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-700 py-1 border-b border-slate-200/60">
                    <span className="font-sans font-semibold">3. Advance Provisioning Allowance (APA 35%):</span>
                    <span className="font-bold text-slate-900">€{simApaAmount.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-[#02509A] bg-sky-50 p-3 rounded-xl border border-sky-200">
                    <span className="font-sans font-extrabold flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#D4AF37]" />
                      Your Central Agency 5.0% Commission (100% Kept By You):
                    </span>
                    <span className="font-bold text-base text-[#02509A]">€{simCaCommission.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-900 pt-2 font-bold text-sm">
                    <span className="font-sans">Total Client Wire To Your Athens Escrow:</span>
                    <span className="text-[#0B1E36] text-base">€{simTotalEscrow.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Intermediary Withholding:</strong> The full €{simTotalEscrow.toLocaleString()} is wired directly to your designated Hellenic stakeholder client escrow account. You disburse Introducing Broker fees according to standard MYBA timelines.
                  </span>
                </div>
              </div>
            )}

            {/* TAB 3: 30-SECOND PROPOSAL DOSSIER */}
            {demoTab === "proposal" && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0284C7]">
                      Client-Facing Luxury Presentation
                    </span>
                    <h3 className="text-xl font-black text-[#0B1E36]">30-Second Generated Dossier</h3>
                  </div>
                  <span className="text-[11px] font-mono bg-sky-100 text-[#02509A] font-bold px-2.5 py-1 rounded-full">
                    Export Ready (PDF)
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Luxury Charter Presentation</span>
                      <h4 className="text-2xl font-black tracking-tight mt-1">M/Y AEGEAN MAJESTY</h4>
                      <p className="text-xs text-slate-300">52m Benetti Mega Yacht • 12 Guests • 6 Staterooms • 11 Crew</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Weekly Rate (High)</span>
                      <span className="text-xl font-bold text-white font-mono">€245,000 / wk + VAT + APA</span>
                    </div>
                  </div>

                  {/* Included sections in the 30-sec proposal */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white/10 text-xs space-y-1">
                      <span className="font-bold text-sky-300 flex items-center gap-1">
                        <Ship className="w-3.5 h-3.5" /> Water Toys Included
                      </span>
                      <p className="text-[11px] text-slate-300">
                        2x Williams DieselJet Tenders, 3x Seabob F5S, 2x Fliteboard e-foils, Jet Ski, Inflatable sea pool.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/10 text-xs space-y-1">
                      <span className="font-bold text-sky-300 flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5" /> 7-Day Cyclades Route
                      </span>
                      <p className="text-[11px] text-slate-300">
                        Athens (Flisvos) → Kea → Mykonos & Delos → Paros → Serifos → Cape Sounion → Athens.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/10 text-xs space-y-1">
                      <span className="font-bold text-sky-300 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Commercial Certification
                      </span>
                      <p className="text-[11px] text-slate-300">
                        Greek Law 4926 e-Mitroo active. Commercial RINA Class. Full Hellenic charter license.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                  <span>Generates in 30 seconds for any yacht in your fleet.</span>
                  <a
                    href="#intake-form"
                    className="font-bold text-[#02509A] hover:underline flex items-center gap-1"
                  >
                    Generate for your fleet <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* TAB 4: MYBA CONTRACT PRE-FILLER */}
            {demoTab === "myba" && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0284C7]">
                    MYBA Worldwide Yachting Agreement (WYA)
                  </span>
                  <h3 className="text-xl font-black text-[#0B1E36]">Automated Hellenic Maritime Clauses</h3>
                  <p className="text-xs text-slate-500">
                    Pre-populated with commercial vessel data to prevent manual drafting errors.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-3">
                  <div className="flex justify-between items-center text-slate-800 border-b border-slate-200 pb-2">
                    <span className="font-bold">CONTRACT FORMAT:</span>
                    <span className="text-[#02509A] font-bold">Standard MYBA WYA (Electronic Edition)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                    <div>
                      <span className="text-slate-400 block">VESSEL e-MITROO REGISTRATION:</span>
                      <span className="font-bold text-slate-800">GR-4926-MITROO-89240</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">CENTRAL AGENT (CA):</span>
                      <span className="font-bold text-slate-800">Athens Central Agency Partner (5.0% Commission)</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">STAKEHOLDER ESCROW IBAN:</span>
                      <span className="font-bold text-slate-800">GR18 0110 0400 0000 0401 2345 678 (NBG Athens)</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">GREEK VAT REGIME:</span>
                      <span className="font-bold text-slate-800">12% Under Greek Law 4926/2022</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600 leading-relaxed font-sans">
                    <strong>Special Greek Maritime Addendum Pre-Filled:</strong> "In the event of severe Meltemi winds exceeding Beaufort Force 6 in the Central Aegean Sea, Captain retains absolute maritime discretion to redirect itinerary into Saronic Gulf or sheltered Cycladic leeward anchorages without charterer penalty."
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
                  <span className="font-medium">Eliminate €40,000/year coordinator drafting overhead.</span>
                  <a href="#intake-form" className="font-bold text-[#02509A] underline cursor-pointer">
                    Enable Autonomous MYBA
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 6: Transparent Pricing Section */}
      <section id="pricing" className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wider uppercase">
              <Euro className="w-3.5 h-3.5 text-emerald-600" />
              <span>Transparent B2B Commercial Terms</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B1E36] tracking-tight">
              Zero Fixed Fees For Central Agents. <br />
              <span className="aegean-gradient-text">Or Enterprise Standalone for €1,950 / Mo.</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              No hidden fees, no credit card required, and zero financial risk. Select the model that fits your agency.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* TIER 1: Central Agency Partner (€0/mo) */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border-2 border-[#02509A] shadow-xl shadow-sky-900/10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-[#02509A] to-[#0284C7] text-white text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-sm">
                Recommended For Greek Central Agents
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#02509A] font-mono">
                    Tier 1 • Performance Distribution
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0B1E36]">
                    Central Agency Partner
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    For fleet managers & central agents seeking high-net-worth charter distribution and S&P placement with zero fixed software overhead.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-[#0B1E36]">€0</span>
                    <span className="text-sm font-bold text-slate-500">/ Month</span>
                  </div>
                  <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Setup Fee: €0 • Monthly Subscription: €0</span>
                  </div>
                </div>

                {/* Commercial Terms Breakdown */}
                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Commercial Framework:</div>
                  
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>100% CA Commission Retention:</strong> You keep 100% of your standard 5.0% Central Agency commission on every charter.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Introducing Broker Structure:</strong> YachtDesk acts strictly as Introducing Broker (retaining standard IB fee from the charterer).
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Direct Escrow Banking:</strong> Client charter funds & APA wired directly into your Athens client escrow account.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Free S&P Placement:</strong> Qualifying yachts for sale syndicated directly into our €5M–€30M S&P acquisition suite for international family offices.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Dedicated WhatsApp Channel:</strong> Direct line to our Athens operations desk for rapid 48-hour option holds and calendar locks.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => selectPlanForForm("partner")}
                  className="w-full py-4 rounded-2xl aegean-btn font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-sky-900/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  Onboard Fleet as CA Partner (€0)
                </button>
              </div>
            </div>

            {/* TIER 2: Enterprise Fleet Operating System (€1,950/mo) */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-md flex flex-col justify-between relative">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
                    Tier 2 • In-House Operations (Enterprise Standalone)
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0B1E36]">
                    Enterprise Fleet OS
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    For established Hellenic fleet houses (like Vernicos, Athenian, Istion) deploying our automated operating infrastructure internally for their own in-house broker desk.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-[#0B1E36]">€1,950</span>
                    <span className="text-sm font-bold text-slate-500">/ Month</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                    <span>Or €19,500 / year • Unlimited brokers • Peak-Season Turnaround SLA</span>
                  </div>
                </div>

                {/* Software Features */}
                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Software Suite Capabilities:</div>
                  
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#02509A] shrink-0 mt-0.5" />
                    <span>
                      <strong>Unlimited 30-Second Proposal Generator:</strong> Generate luxury PDFs with your company branding and logo for your own direct retail inquiries.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#02509A] shrink-0 mt-0.5" />
                    <span>
                      <strong>Automated MYBA Contract Pre-Filler:</strong> Pre-fills contracts with your agency escrow, e-Mitroo numbers, and client terms in 1 click.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#02509A] shrink-0 mt-0.5" />
                    <span>
                      <strong>Custom Agency Branding:</strong> White-label presentations with your company logo, font palette, and agency email delivery.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#02509A] shrink-0 mt-0.5" />
                    <span>
                      <strong>Multi-User Broker Team Seats:</strong> Provide logins for all your internal charter brokers and fleet assistants with role-based permissions.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#02509A] shrink-0 mt-0.5" />
                    <span>
                      <strong>Dedicated Peak-Season SLA:</strong> Priority technical operations support during Friday–Sunday Aegean marina turnarounds.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#02509A] shrink-0 mt-0.5" />
                    <span>
                      <strong>Website Availability Embed Widget:</strong> Real-time calendar widgets embedded directly into your agency website.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => selectPlanForForm("whitelabel")}
                  className="w-full py-4 rounded-2xl bg-[#0B1E36] hover:bg-[#071526] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-sky-400" />
                  Select Enterprise Fleet OS (€1,950/mo)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Self-Serve Intake Form (No Sales Calls) */}
      <section id="intake-form" className="py-24 bg-[#F8FAFC] border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#02509A] text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Instant Autonomous Onboarding</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1E36] tracking-tight">
              Onboard Your Fleet in 2 Minutes
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              No sales calls. No pitch meetings. Simply submit your fleet details or Yachtfolio ID, and our Athens charter desk will verify your commercial listing and sync your calendar within 4 business hours.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-sky-200 shadow-xl shadow-sky-900/10 p-6 sm:p-10">
            {submitted ? (
              <div className="text-center space-y-6 py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2 max-w-lg mx-auto">
                  <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Provisioning Reference: {submissionRef}
                  </span>
                  <h3 className="text-2xl font-black text-[#0B1E36] mt-2">
                    Fleet Application Successfully Ingested
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Thank you, <strong>{formData.contactName || "Fleet Director"}</strong>. Your Central Agency profile for <strong>{formData.fleetName || "your fleet"}</strong> has been logged into the Athens charter desk.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1.5">
                    What Happens Next (Zero Sales Call Needed):
                  </div>
                  <div className="flex items-start gap-2 text-slate-700">
                    <span className="font-bold text-[#02509A]">1.</span>
                    <span>Our Athens desk cross-references your Greek Law 4926/2022 e-Mitroo commercial registration.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-700">
                    <span className="font-bold text-[#02509A]">2.</span>
                    <span>We configure automated 48-hour option holds and calendar sync via Yachtfolio / iCal.</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-700">
                    <span className="font-bold text-[#02509A]">3.</span>
                    <span>All charter leads & escrow payouts flow directly to your Athens client account.</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="https://wa.me/302109804410?text=Hello%20YachtDesk%20Athens%20Operations,%20we%20just%20submitted%20our%20fleet%20profile%20online."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Open Urgent WhatsApp Channel
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Register Another Fleet
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Plan Selector Radios */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Select Partnership Plan
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      onClick={() => setFormData({ ...formData, plan: "partner" })}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                        formData.plan === "partner"
                          ? "border-[#02509A] bg-sky-50/50 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        value="partner"
                        checked={formData.plan === "partner"}
                        onChange={() => setFormData({ ...formData, plan: "partner" })}
                        className="mt-1 accent-[#02509A]"
                      />
                      <div>
                        <div className="font-extrabold text-sm text-[#0B1E36]">Central Agency Partner (€0/mo)</div>
                        <div className="text-[11px] text-slate-600 mt-0.5">
                          100% performance. Keep 100% of your 5% CA commission. Zero fixed cost.
                        </div>
                      </div>
                    </label>

                    <label
                      onClick={() => setFormData({ ...formData, plan: "whitelabel" })}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                        formData.plan === "whitelabel"
                          ? "border-[#02509A] bg-sky-50/50 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        value="whitelabel"
                        checked={formData.plan === "whitelabel"}
                        onChange={() => setFormData({ ...formData, plan: "whitelabel" })}
                        className="mt-1 accent-[#02509A]"
                      />
                      <div>
                        <div className="font-extrabold text-sm text-[#0B1E36]">Enterprise Fleet OS (€1,950/mo)</div>
                        <div className="text-[11px] text-slate-600 mt-0.5">
                          Private in-house software with SLA support for your own broker team and direct retail clients.
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Company & Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Fleet / Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vernicos Yachts / Athenian Fleet"
                      value={formData.fleetName}
                      onChange={(e) => setFormData({ ...formData, fleetName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Contact Name & Commercial Role *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maria Papantoniou - Fleet Director"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Corporate Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="charter@your-agency.gr"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Direct WhatsApp / Mobile * (For Urgent Holds)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+30 690 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>
                </div>

                {/* Fleet Size & Primary Base */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Managed Fleet Size *
                    </label>
                    <select
                      value={formData.fleetSize}
                      onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0284C7] cursor-pointer"
                    >
                      <option value="1-5 yachts">1 - 5 Yachts</option>
                      <option value="6-15 yachts">6 - 15 Yachts</option>
                      <option value="16+ yachts">16+ Yachts</option>
                    </select>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Primary Operating Base / Home Port *
                    </label>
                    <select
                      value={formData.fleetBase}
                      onChange={(e) => setFormData({ ...formData, fleetBase: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0284C7] cursor-pointer"
                    >
                      <option value="Athens / Marina Alimos">Athens / Marina Alimos</option>
                      <option value="Athens / Marina Flisvos">Athens / Marina Flisvos</option>
                      <option value="Athens / Marina Zeas (Piraeus)">Athens / Marina Zeas (Piraeus)</option>
                      <option value="Lavrion / Olympic Marine">Lavrion / Olympic Marine</option>
                      <option value="Gouvia Marina, Corfu (Ionian)">Gouvia Marina, Corfu (Ionian)</option>
                      <option value="Lefkas Marina (Ionian)">Lefkas Marina (Ionian)</option>
                      <option value="Mykonos Tourlos (Cyclades)">Mykonos Tourlos (Cyclades)</option>
                      <option value="Rhodes Mandraki (Dodecanese)">Rhodes Mandraki (Dodecanese)</option>
                      <option value="Other Mediterranean Port">Other Mediterranean Port</option>
                    </select>
                  </div>
                </div>

                {/* Listing Link or Yachtfolio ID */}
                <div className="space-y-1 text-left">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Current Listing Link, Yachtfolio ID, or Booking Manager URL
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. https://www.yachtfolio.com/fleet/1234 or https://your-agency.gr/fleet"
                    value={formData.listingLink}
                    onChange={(e) => setFormData({ ...formData, listingLink: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0284C7]"
                  />
                  <p className="text-[10px] text-slate-400">
                    Entering your Yachtfolio or website URL enables our automated parser to ingest specs and photos immediately without manual data entry.
                  </p>
                </div>

                {/* Additional Fleet Notes */}
                <div className="space-y-1 text-left">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Fleet Highlights or Yachts Also For Sale (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Mention any vessels with S&P dual-track listing, specific high-season availability windows, or custom charter terms..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl aegean-btn font-extrabold text-xs uppercase tracking-wider hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-sky-900/20 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 stroke-[2.5]" />
                    {submitting ? "Provisioning In Progress..." : "Submit Fleet For Autonomous Provisioning (No Call Needed)"}
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-2">
                    By submitting, your commercial fleet enters our 4-hour Hellenic e-Mitroo validation queue. No sales rep will call you.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 8: Regulatory Compliance & Escrow Protection Badges */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
              <div>
                <h4 className="text-xs font-bold text-[#0B1E36] uppercase tracking-wider">Greek Law 4926/2022</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Strict adherence to Hellenic Ministry of Maritime Affairs commercial charter frameworks.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <Award className="w-6 h-6 text-[#02509A] shrink-0 mt-1" />
              <div>
                <h4 className="text-xs font-bold text-[#0B1E36] uppercase tracking-wider">e-Mitroo Registry</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Cross-referenced with the Hellenic Electronic Registry of Commercial Ships.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <FileText className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
              <div>
                <h4 className="text-xs font-bold text-[#0B1E36] uppercase tracking-wider">MYBA WYA & MOA</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Standard Mediterranean Yacht Brokers Association contract and commission covenants.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <Lock className="w-6 h-6 text-blue-700 shrink-0 mt-1" />
              <div>
                <h4 className="text-xs font-bold text-[#0B1E36] uppercase tracking-wider">Direct Athens Escrow</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  All funds wired directly to your designated Hellenic stakeholder account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: Frequently Asked Questions (FAQ) Accordion */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold tracking-wider uppercase shadow-sm">
              <HelpCircle className="w-3.5 h-3.5 text-[#02509A]" />
              <span>Central Agent Knowledge Base</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1E36] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Clear, transparent answers on commercial terms, escrow protocols, and automated calendar synchronization.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white border border-slate-200 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-[#0B1E36] hover:text-[#02509A] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#02509A] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-normal">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Callout */}
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#0B1E36] to-[#02509A] text-white text-center space-y-4 shadow-xl shadow-sky-950/10">
            <h3 className="text-xl sm:text-2xl font-black">
              Ready to Automate Your Central Agency Fleet?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
              Join leading Greek fleet directors who have eliminated coordinator overhead and automated 48-hour option holds with zero financial risk.
            </p>
            <div className="pt-2">
              <a
                href="#intake-form"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#0B1E36] hover:bg-slate-100 font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                Onboard Your Fleet (2 Min • No Sales Call)
                <ArrowRight className="w-4 h-4 text-[#02509A]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={charterModalOpen}
        onClose={() => setCharterModalOpen(false)}
      />
    </main>
  );
}
