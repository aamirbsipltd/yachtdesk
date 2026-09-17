"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";
import { YACHTS_DATA } from "@/data/yachts";
import { SALES_FLEET } from "@/data/salesFleet";
import { ITINERARY_PRESETS } from "@/data/yachts";
import {
  Anchor,
  ShieldCheck,
  Calendar,
  Clock,
  FileText,
  DollarSign,
  Euro,
  Printer,
  Copy,
  Check,
  Send,
  Sparkles,
  Users,
  MapPin,
  Compass,
  AlertCircle,
  CheckCircle2,
  Lock,
  Search,
  ChevronRight,
  TrendingUp,
  FolderDown,
  Layers,
  Fuel,
  Ship,
  Briefcase,
  PenTool,
  Download,
  Share2,
  RefreshCw,
  Plus
} from "lucide-react";

// Types for Operations System
interface CalendarSlot {
  weekId: string;
  weekLabel: string;
  startDate: string;
  endDate: string;
  status: "available" | "hold" | "booked" | "maintenance";
  holderName?: string;
  chartererRef?: string;
  holdExpiresHours?: number;
}

interface FleetCalendarRow {
  yachtId: string;
  yachtName: string;
  yachtType: string;
  lengthM: number;
  homePort: string;
  weeklyRate: number;
  eMitrooNumber: string;
  schedule: CalendarSlot[];
}

interface SPDeal {
  id: string;
  yachtName: string;
  buyerName: string;
  askingPriceEur: number;
  offerPriceEur: number;
  stage: "LOI" | "Escrow" | "Survey" | "Closing";
  surveyDate?: string;
  escrowHeldEur: number;
  leadBroker: string;
  surveyTasks: { name: string; done: boolean }[];
}

export default function OperationsPage() {
  const [activeTab, setActiveTab] = useState<"calendar" | "proposal" | "myba" | "spDesk">("calendar");
  const [charterModalOpen, setCharterModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // -------------------------------------------------------------
  // TAB 1: FLEET CALENDAR STATE & 48-HOUR OPTION HOLDS
  // -------------------------------------------------------------
  const [fleetCalendar, setFleetCalendar] = useState<FleetCalendarRow[]>([
    {
      yachtId: "aegean-majesty-52m",
      yachtName: "M/Y AEGEAN MAJESTY",
      yachtType: "52m Benetti Mega Yacht",
      lengthM: 52.0,
      homePort: "Marina Flisvos, Athens",
      weeklyRate: 290000,
      eMitrooNumber: "GR-E-MITROO-2021-99410",
      schedule: [
        { weekId: "w1", weekLabel: "Jun 20-27", startDate: "2026-06-20", endDate: "2026-06-27", status: "booked", chartererRef: "MYBA-ATH-884" },
        { weekId: "w2", weekLabel: "Jun 27-Jul 04", startDate: "2026-06-27", endDate: "2026-07-04", status: "booked", chartererRef: "MYBA-ATH-889" },
        { weekId: "w3", weekLabel: "Jul 04-11", startDate: "2026-07-04", endDate: "2026-07-11", status: "hold", holderName: "Burgess (London)", holdExpiresHours: 26 },
        { weekId: "w4", weekLabel: "Jul 11-18", startDate: "2026-07-11", endDate: "2026-07-18", status: "available" },
        { weekId: "w5", weekLabel: "Jul 18-25", startDate: "2026-07-18", endDate: "2026-07-25", status: "available" },
        { weekId: "w6", weekLabel: "Jul 25-Aug 01", startDate: "2026-07-25", endDate: "2026-08-01", status: "booked", chartererRef: "MYBA-CYC-902" },
        { weekId: "w7", weekLabel: "Aug 01-08", startDate: "2026-08-01", endDate: "2026-08-08", status: "booked", chartererRef: "MYBA-CYC-915" },
        { weekId: "w8", weekLabel: "Aug 08-15", startDate: "2026-08-08", endDate: "2026-08-15", status: "hold", holderName: "Camper & Nicholsons", holdExpiresHours: 41 },
      ]
    },
    {
      yachtId: "cycladic-star-40m",
      yachtName: "M/Y CYCLADIC STAR",
      yachtType: "40m Sanlorenzo Alloy",
      lengthM: 40.8,
      homePort: "Marina Alimos, Athens",
      weeklyRate: 185000,
      eMitrooNumber: "GR-E-MITROO-2022-77823",
      schedule: [
        { weekId: "w1", weekLabel: "Jun 20-27", startDate: "2026-06-20", endDate: "2026-06-27", status: "available" },
        { weekId: "w2", weekLabel: "Jun 27-Jul 04", startDate: "2026-06-27", endDate: "2026-07-04", status: "booked", chartererRef: "MYBA-ATH-712" },
        { weekId: "w3", weekLabel: "Jul 04-11", startDate: "2026-07-04", endDate: "2026-07-11", status: "booked", chartererRef: "MYBA-MYK-734" },
        { weekId: "w4", weekLabel: "Jul 11-18", startDate: "2026-07-11", endDate: "2026-07-18", status: "hold", holderName: "Vernicos Direct Client", holdExpiresHours: 14 },
        { weekId: "w5", weekLabel: "Jul 18-25", startDate: "2026-07-18", endDate: "2026-07-25", status: "available" },
        { weekId: "w6", weekLabel: "Jul 25-Aug 01", startDate: "2026-07-25", endDate: "2026-08-01", status: "booked", chartererRef: "MYBA-ION-780" },
        { weekId: "w7", weekLabel: "Aug 01-08", startDate: "2026-08-01", endDate: "2026-08-08", status: "available" },
        { weekId: "w8", weekLabel: "Aug 08-15", startDate: "2026-08-08", endDate: "2026-08-15", status: "booked", chartererRef: "MYBA-MYK-810" },
      ]
    },
    {
      yachtId: "aegean-odyssey-42m",
      yachtName: "M/Y AEGEAN ODYSSEY",
      yachtType: "42m Custom Line Ferretti",
      lengthM: 42.6,
      homePort: "Marina Flisvos, Athens",
      weeklyRate: 145000,
      eMitrooNumber: "GR-E-MITROO-2023-88401",
      schedule: [
        { weekId: "w1", weekLabel: "Jun 20-27", startDate: "2026-06-20", endDate: "2026-06-27", status: "booked", chartererRef: "MYBA-FLIS-551" },
        { weekId: "w2", weekLabel: "Jun 27-Jul 04", startDate: "2026-06-27", endDate: "2026-07-04", status: "booked", chartererRef: "MYBA-SAR-562" },
        { weekId: "w3", weekLabel: "Jul 04-11", startDate: "2026-07-04", endDate: "2026-07-11", status: "available" },
        { weekId: "w4", weekLabel: "Jul 11-18", startDate: "2026-07-11", endDate: "2026-07-18", status: "available" },
        { weekId: "w5", weekLabel: "Jul 18-25", startDate: "2026-07-18", endDate: "2026-07-25", status: "booked", chartererRef: "MYBA-MYK-590" },
        { weekId: "w6", weekLabel: "Jul 25-Aug 01", startDate: "2026-07-25", endDate: "2026-08-01", status: "hold", holderName: "Fraser Yachts", holdExpiresHours: 36 },
        { weekId: "w7", weekLabel: "Aug 01-08", startDate: "2026-08-01", endDate: "2026-08-08", status: "booked", chartererRef: "MYBA-DOD-610" },
        { weekId: "w8", weekLabel: "Aug 08-15", startDate: "2026-08-08", endDate: "2026-08-15", status: "available" },
      ]
    },
    {
      yachtId: "olympic-breeze-24m",
      yachtName: "S/Y OLYMPIC BREEZE",
      yachtType: "24m Sunreef Eco Catamaran",
      lengthM: 24.4,
      homePort: "Gouvia Marina, Corfu",
      weeklyRate: 58000,
      eMitrooNumber: "GR-E-MITROO-2024-66392",
      schedule: [
        { weekId: "w1", weekLabel: "Jun 20-27", startDate: "2026-06-20", endDate: "2026-06-27", status: "available" },
        { weekId: "w2", weekLabel: "Jun 27-Jul 04", startDate: "2026-06-27", endDate: "2026-07-04", status: "available" },
        { weekId: "w3", weekLabel: "Jul 04-11", startDate: "2026-07-04", endDate: "2026-07-11", status: "booked", chartererRef: "MYBA-ION-411" },
        { weekId: "w4", weekLabel: "Jul 11-18", startDate: "2026-07-11", endDate: "2026-07-18", status: "booked", chartererRef: "MYBA-ION-425" },
        { weekId: "w5", weekLabel: "Jul 18-25", startDate: "2026-07-18", endDate: "2026-07-25", status: "available" },
        { weekId: "w6", weekLabel: "Jul 25-Aug 01", startDate: "2026-07-25", endDate: "2026-08-01", status: "hold", holderName: "IYC Greece", holdExpiresHours: 19 },
        { weekId: "w7", weekLabel: "Aug 01-08", startDate: "2026-08-01", endDate: "2026-08-08", status: "available" },
        { weekId: "w8", weekLabel: "Aug 08-15", startDate: "2026-08-08", endDate: "2026-08-15", status: "booked", chartererRef: "MYBA-ION-490" },
      ]
    },
    {
      yachtId: "ionian-breeze-34m",
      yachtName: "M/Y IONIAN BREEZE",
      yachtType: "34m Sunseeker 116",
      lengthM: 34.5,
      homePort: "Gouvia Marina, Corfu",
      weeklyRate: 125000,
      eMitrooNumber: "GR-E-MITROO-2020-44910",
      schedule: [
        { weekId: "w1", weekLabel: "Jun 20-27", startDate: "2026-06-20", endDate: "2026-06-27", status: "available" },
        { weekId: "w2", weekLabel: "Jun 27-Jul 04", startDate: "2026-06-27", endDate: "2026-07-04", status: "hold", holderName: "Ocean Independence", holdExpiresHours: 32 },
        { weekId: "w3", weekLabel: "Jul 04-11", startDate: "2026-07-04", endDate: "2026-07-11", status: "booked", chartererRef: "MYBA-ION-302" },
        { weekId: "w4", weekLabel: "Jul 11-18", startDate: "2026-07-11", endDate: "2026-07-18", status: "booked", chartererRef: "MYBA-ION-315" },
        { weekId: "w5", weekLabel: "Jul 18-25", startDate: "2026-07-18", endDate: "2026-07-25", status: "available" },
        { weekId: "w6", weekLabel: "Jul 25-Aug 01", startDate: "2026-07-25", endDate: "2026-08-01", status: "available" },
        { weekId: "w7", weekLabel: "Aug 01-08", startDate: "2026-08-01", endDate: "2026-08-08", status: "booked", chartererRef: "MYBA-ION-350" },
        { weekId: "w8", weekLabel: "Aug 08-15", startDate: "2026-08-08", endDate: "2026-08-15", status: "available" },
      ]
    },
    {
      yachtId: "poseidon-royal-56m",
      yachtName: "M/Y POSEIDON ROYAL",
      yachtType: "56m Benetti Flagship",
      lengthM: 56.0,
      homePort: "Port Hercule / Piraeus",
      weeklyRate: 310000,
      eMitrooNumber: "GR-E-MITROO-2022-11048",
      schedule: [
        { weekId: "w1", weekLabel: "Jun 20-27", startDate: "2026-06-20", endDate: "2026-06-27", status: "booked", chartererRef: "MYBA-MON-101" },
        { weekId: "w2", weekLabel: "Jun 27-Jul 04", startDate: "2026-06-27", endDate: "2026-07-04", status: "booked", chartererRef: "MYBA-MON-108" },
        { weekId: "w3", weekLabel: "Jul 04-11", startDate: "2026-07-04", endDate: "2026-07-11", status: "booked", chartererRef: "MYBA-ATH-120" },
        { weekId: "w4", weekLabel: "Jul 11-18", startDate: "2026-07-11", endDate: "2026-07-18", status: "available" },
        { weekId: "w5", weekLabel: "Jul 18-25", startDate: "2026-07-18", endDate: "2026-07-25", status: "hold", holderName: "Edmiston & Co", holdExpiresHours: 8 },
        { weekId: "w6", weekLabel: "Jul 25-Aug 01", startDate: "2026-07-25", endDate: "2026-08-01", status: "available" },
        { weekId: "w7", weekLabel: "Aug 01-08", startDate: "2026-08-01", endDate: "2026-08-08", status: "booked", chartererRef: "MYBA-MYK-160" },
        { weekId: "w8", weekLabel: "Aug 08-15", startDate: "2026-08-08", endDate: "2026-08-15", status: "booked", chartererRef: "MYBA-MYK-175" },
      ]
    }
  ]);

  // Hold Modal
  const [selectedSlotForAction, setSelectedSlotForAction] = useState<{
    yachtIndex: number;
    slotIndex: number;
    yachtName: string;
    weekLabel: string;
  } | null>(null);
  const [brokerHoldingName, setBrokerHoldingName] = useState("Vernicos Direct Brokerage");

  const handlePlaceHold = () => {
    if (!selectedSlotForAction) return;
    const { yachtIndex, slotIndex } = selectedSlotForAction;
    const updated = [...fleetCalendar];
    updated[yachtIndex].schedule[slotIndex] = {
      ...updated[yachtIndex].schedule[slotIndex],
      status: "hold",
      holderName: brokerHoldingName,
      holdExpiresHours: 48,
    };
    setFleetCalendar(updated);
    showToast(`48-Hour Option Hold placed on ${selectedSlotForAction.yachtName} for ${selectedSlotForAction.weekLabel}`);
    setSelectedSlotForAction(null);
  };

  const handleReleaseHold = (yachtIdx: number, slotIdx: number) => {
    const updated = [...fleetCalendar];
    updated[yachtIdx].schedule[slotIdx] = {
      ...updated[yachtIdx].schedule[slotIdx],
      status: "available",
      holderName: undefined,
      holdExpiresHours: undefined,
    };
    setFleetCalendar(updated);
    showToast("Option Hold Released. Week returned to Available status.");
  };

  // -------------------------------------------------------------
  // TAB 2: INSTANT CLIENT PROPOSAL GENERATOR STATE
  // -------------------------------------------------------------
  const [proposalYachtName, setProposalYachtName] = useState("M/Y AEGEAN MAJESTY");
  const [clientName, setClientName] = useState("The Sterling Family Trust");
  const [charterDates, setCharterDates] = useState("July 18 – July 25, 2026 (7 Nights)");
  const [guestCount, setGuestCount] = useState(10);
  const [embarkationPort, setEmbarkationPort] = useState("Athens (Marina Flisvos)");
  const [disembarkationPort, setDisembarkationPort] = useState("Mykonos (New Port Tourlos)");
  const [selectedRouteId, setSelectedRouteId] = useState("classical-cyclades");
  const [baseRateEur, setBaseRateEur] = useState(290000);
  const [apaPercent, setApaPercent] = useState(30);
  const [greekVatPercent, setGreekVatPercent] = useState(12);
  const [deliveryFeeEur, setDeliveryFeeEur] = useState(3500);

  // Proposal Calculations
  const calculatedApa = (baseRateEur * apaPercent) / 100;
  const calculatedVat = (baseRateEur * greekVatPercent) / 100;
  const totalCharterGross = baseRateEur + calculatedApa + calculatedVat + deliveryFeeEur;
  const firstDeposit50 = totalCharterGross * 0.5;

  const currentRoute = ITINERARY_PRESETS.find((r) => r.id === selectedRouteId) || ITINERARY_PRESETS[0];

  const handlePrintProposal = () => {
    window.print();
  };

  const handleCopyProposalLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`https://yatchdesk.com/proposal/share?vessel=${encodeURIComponent(proposalYachtName)}&client=${encodeURIComponent(clientName)}&total=${totalCharterGross}`);
      showToast("Luxury Client Proposal Link copied to clipboard!");
    }
  };

  const handlePushToMyba = () => {
    setActiveTab("myba");
    showToast(`Transferred ${proposalYachtName} charter terms to MYBA Contract Pre-Filler!`);
  };

  // -------------------------------------------------------------
  // TAB 3: AUTOMATED MYBA CONTRACT PRE-FILLER STATE
  // -------------------------------------------------------------
  const [mybaAgreementNumber, setMybaAgreementNumber] = useState("MYBA-WYA-GR-2026-9941");
  const [escrowAccountBank, setEscrowAccountBank] = useState("Piraeus Bank S.A. Segregated Client Stakeholder Account #GR84-0172-8820-0051");
  const [mybaStatus, setMybaStatus] = useState<"Draft Pre-Filled" | "Dispatched DocuSign" | "Signed & Registered">("Draft Pre-Filled");

  // -------------------------------------------------------------
  // TAB 4: S&P TRANSACTION DESK STATE
  // -------------------------------------------------------------
  const [spDeals, setSpDeals] = useState<SPDeal[]>([
    {
      id: "sp-1",
      yachtName: "M/Y AEGEAN MAJESTY (52m Benetti)",
      buyerName: "Lord Sterling & Cie Family Office",
      askingPriceEur: 28500000,
      offerPriceEur: 27250000,
      stage: "Survey",
      surveyDate: "2026-06-24 at Perama Shipyard",
      escrowHeldEur: 2725000,
      leadBroker: "Dimitris Vernicos",
      surveyTasks: [
        { name: "Hull ultrasonic thickness gauging (Plate inspection)", done: true },
        { name: "MTU 12V 4000 M53 fluid spectrometry & oil analysis", done: true },
        { name: "Lloyd's Register Class Records audit (Clean status)", done: true },
        { name: "Full 4-hour max power sea trial & crash stop", done: false },
        { name: "e-Mitroo Greek commercial registry flag transfer docs", done: false },
      ]
    },
    {
      id: "sp-2",
      yachtName: "M/Y MEDITERRANEAN EXPLORER (42m CdM)",
      buyerName: "Nordic Maritime Capital",
      askingPriceEur: 18200000,
      offerPriceEur: 17800000,
      stage: "Escrow",
      escrowHeldEur: 1780000,
      leadBroker: "Marcus Lindqvist",
      surveyTasks: [
        { name: "MOA purchase contract signed by both principals", done: true },
        { name: "10% Escrow deposit cleared in stakeholder account", done: true },
        { name: "Haul-out slot booked at Salamis drydock", done: false },
        { name: "Caterpillar engine ECM diagnostics", done: false },
      ]
    },
    {
      id: "sp-3",
      yachtName: "M/Y CYCLADIC STAR (40m Sanlorenzo)",
      buyerName: "Monaco Wealth Partners",
      askingPriceEur: 16800000,
      offerPriceEur: 16000000,
      stage: "LOI",
      escrowHeldEur: 0,
      leadBroker: "Konstantinos Vernicos",
      surveyTasks: [
        { name: "Letter of Intent countersigned", done: true },
        { name: "Bilateral NDA exchanged", done: true },
        { name: "10% deposit call dispatched to buyer bank", done: false },
      ]
    },
    {
      id: "sp-4",
      yachtName: "S/Y POSEIDON SPIRIT (45m Perini Navi)",
      buyerName: "Geneva Private Trustee",
      askingPriceEur: 19000000,
      offerPriceEur: 18500000,
      stage: "Closing",
      escrowHeldEur: 1850000,
      leadBroker: "Alexander Vance",
      surveyTasks: [
        { name: "All condition surveys & sea trials completed satisfactorily", done: true },
        { name: "Protocol of Delivery & Acceptance pre-filled", done: true },
        { name: "Hellenic Coast Guard deletion certificate issued", done: true },
        { name: "Bill of Sale apostille execution & balance wire", done: false },
      ]
    }
  ]);

  const toggleSurveyTask = (dealId: string, taskIdx: number) => {
    const updated = spDeals.map((deal) => {
      if (deal.id === dealId) {
        const newTasks = [...deal.surveyTasks];
        newTasks[taskIdx].done = !newTasks[taskIdx].done;
        return { ...deal, surveyTasks: newTasks };
      }
      return deal;
    });
    setSpDeals(updated);
  };

  const advanceDealStage = (dealId: string) => {
    const stageOrder: ("LOI" | "Escrow" | "Survey" | "Closing")[] = ["LOI", "Escrow", "Survey", "Closing"];
    const updated = spDeals.map((deal) => {
      if (deal.id === dealId) {
        const currentIdx = stageOrder.indexOf(deal.stage);
        if (currentIdx < stageOrder.length - 1) {
          const nextStage = stageOrder[currentIdx + 1];
          return { ...deal, stage: nextStage };
        }
      }
      return deal;
    });
    setSpDeals(updated);
    showToast("Deal advanced to next milestone!");
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0B1E36] selection:bg-sky-200 selection:text-sky-950 relative">
      <Navbar onOpenInquiry={() => setCharterModalOpen(true)} />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B1E36] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-sky-400/30 text-xs font-bold flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Operations Header */}
      <section className="pt-28 pb-8 bg-gradient-to-r from-[#071526] via-[#0B1E36] to-[#0F2D52] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-300 font-bold text-xs uppercase tracking-wider border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Central Agency & Broker Operations Desk</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                Fleet Management & Brokerage Console
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                The institutional operating suite replacing manual fleet manager roles. Live calendar holds, proforma calculations, Greek Law 4926/2022 e-Mitroo compliance, and S&P escrow tracking.
              </p>
            </div>

            {/* Quick Live System Badges */}
            <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
              <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>e-Mitroo API Connected</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-sky-400" />
                <span>MYBA WYA Digital 2026</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>Segregated Escrow Active</span>
              </div>
            </div>
          </div>

          {/* KPI Ticker Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-slate-400 text-[11px] uppercase font-bold">Managed Fleet</div>
              <div className="text-2xl font-black text-white mt-0.5">12 Vessels</div>
              <div className="text-[10px] text-emerald-400 font-medium">Athens, Mykonos, Ionian</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-slate-400 text-[11px] uppercase font-bold">Active 48h Option Holds</div>
              <div className="text-2xl font-black text-[#D4AF37] mt-0.5">5 Active Holds</div>
              <div className="text-[10px] text-slate-300 font-medium">Burgess, Fraser, Vernicos</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-slate-400 text-[11px] uppercase font-bold">Summer Charter Pipeline</div>
              <div className="text-2xl font-black text-white mt-0.5">€3,420,000</div>
              <div className="text-[10px] text-sky-300 font-medium">28 Signed MYBA Weeks</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-slate-400 text-[11px] uppercase font-bold">S&P Pipeline in Escrow</div>
              <div className="text-2xl font-black text-emerald-400 mt-0.5">€79,550,000</div>
              <div className="text-[10px] text-slate-300 font-medium">4 Superyachts under MOA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Navigation Tabs */}
      <section className="sticky top-[73px] z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-2.5">
            {[
              { id: "calendar", label: "Fleet Calendar & 48h Option Holds", icon: Calendar },
              { id: "proposal", label: "Instant Client Proposal (PDF-Ready)", icon: Printer },
              { id: "myba", label: "Automated MYBA Contract Pre-Filler", icon: FileText },
              { id: "spDesk", label: "S&P Transaction Desk & Survey Milestones", icon: Briefcase },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "aegean-btn shadow-md shadow-sky-900/10"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ========================================================= */}
        {/* TAB 1: FLEET CALENDAR GRID & 48-HOUR OPTION HOLDS */}
        {/* ========================================================= */}
        {activeTab === "calendar" && (
          <div className="space-y-8">
            {/* Header & Legend */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-[#0B1E36]">
                  Mediterranean Summer Fleet Schedule (June – September 2026)
                </h2>
                <p className="text-xs text-slate-600">
                  Click on any <span className="text-emerald-600 font-bold">Available</span> slot to place a formal <strong>48-Hour Option Hold</strong>. Click on an existing hold to release or convert to a MYBA agreement.
                </p>
              </div>

              {/* Status Legend */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-slate-700">Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#D4AF37]" />
                  <span className="text-slate-700">48h Hold</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#0B1E36]" />
                  <span className="text-slate-700">Booked (MYBA)</span>
                </div>
              </div>
            </div>

            {/* Interactive Fleet Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                    <th className="p-4 w-64">Yacht / Registry</th>
                    <th className="p-4 text-center">Weekly Rate</th>
                    {fleetCalendar[0]?.schedule.map((slot) => (
                      <th key={slot.weekId} className="p-3 text-center min-w-[110px]">
                        {slot.weekLabel}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {fleetCalendar.map((row, yachtIdx) => (
                    <tr key={row.yachtId} className="hover:bg-slate-50/50 transition-colors">
                      {/* Yacht Column */}
                      <td className="p-4">
                        <div className="font-extrabold text-[#0B1E36] text-sm">
                          {row.yachtName}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {row.yachtType} • {row.homePort.split(",")[0]}
                        </div>
                        <div className="text-[10px] font-mono text-[#02509A] mt-0.5">
                          {row.eMitrooNumber}
                        </div>
                      </td>

                      {/* Weekly Rate */}
                      <td className="p-4 text-center font-bold text-[#02509A]">
                        €{(row.weeklyRate / 1000).toLocaleString()}k
                      </td>

                      {/* Week Slots */}
                      {row.schedule.map((slot, slotIdx) => (
                        <td key={slot.weekId} className="p-2 text-center">
                          {slot.status === "available" && (
                            <button
                              onClick={() =>
                                setSelectedSlotForAction({
                                  yachtIndex: yachtIdx,
                                  slotIndex: slotIdx,
                                  yachtName: row.yachtName,
                                  weekLabel: slot.weekLabel,
                                })
                              }
                              className="w-full py-2.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-[11px] transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5"
                            >
                              <span>Available</span>
                              <span className="text-[9px] text-emerald-600 font-normal">+ Hold</span>
                            </button>
                          )}

                          {slot.status === "hold" && (
                            <div className="w-full py-2 px-1.5 rounded-xl bg-amber-50 border border-amber-300 text-[#9A7514] font-bold text-[10px] space-y-1 relative group">
                              <div className="truncate font-extrabold">{slot.holderName?.split(" ")[0]}</div>
                              <div className="text-[9px] font-mono bg-amber-200/60 rounded px-1 text-amber-900 inline-block">
                                ⏳ {slot.holdExpiresHours}h left
                              </div>
                              <button
                                onClick={() => handleReleaseHold(yachtIdx, slotIdx)}
                                className="block w-full text-[9px] text-rose-600 hover:underline pt-0.5"
                              >
                                Release
                              </button>
                            </div>
                          )}

                          {slot.status === "booked" && (
                            <div className="w-full py-2.5 px-1 rounded-xl bg-[#0B1E36] text-white font-bold text-[10px] space-y-0.5">
                              <div className="text-emerald-400">Booked</div>
                              <div className="text-[9px] font-mono text-slate-300 truncate">
                                {slot.chartererRef}
                              </div>
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Place Hold Modal Dialog */}
            {selectedSlotForAction && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
                <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-5">
                  <div className="space-y-1">
                    <span className="text-xs uppercase font-bold tracking-widest text-[#02509A] bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                      Standard 48-Hour Option Protocol
                    </span>
                    <h3 className="text-xl font-black text-[#0B1E36]">
                      Place 48-Hour Option Hold
                    </h3>
                    <p className="text-xs text-slate-600">
                      Vessel: <strong>{selectedSlotForAction.yachtName}</strong> <br />
                      Charter Slot: <strong>{selectedSlotForAction.weekLabel} (7 Nights)</strong>
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase text-slate-700">
                      Broker / Agency Reserving Hold
                    </label>
                    <select
                      value={brokerHoldingName}
                      onChange={(e) => setBrokerHoldingName(e.target.value)}
                      className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    >
                      <option value="Vernicos Direct Brokerage">Vernicos Direct Brokerage</option>
                      <option value="Burgess Yachts">Burgess Yachts (London/Monaco)</option>
                      <option value="Camper & Nicholsons">Camper & Nicholsons</option>
                      <option value="Fraser Yachts">Fraser Yachts</option>
                      <option value="IYC Greece">IYC Greece</option>
                      <option value="Ocean Independence">Ocean Independence</option>
                      <option value="Direct Client Family Office">Direct Client Family Office</option>
                    </select>

                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                      <strong>Option Rule:</strong> The yacht will be reserved exclusively for 48 hours. If a competing broker issues a First Right of Refusal notice, the holding broker will have 24 hours to execute a binding MYBA contract and deposit funds.
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setSelectedSlotForAction(null)}
                      className="w-1/2 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePlaceHold}
                      className="w-1/2 py-2.5 rounded-xl aegean-btn font-bold text-xs uppercase tracking-wider"
                    >
                      Confirm 48h Hold
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: INSTANT CLIENT PROPOSAL GENERATOR (PDF-READY) */}
        {/* ========================================================= */}
        {activeTab === "proposal" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Operator Inputs (4 cols) */}
              <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                <div className="space-y-1 border-b border-slate-100 pb-3">
                  <h3 className="text-base font-black text-[#0B1E36] flex items-center gap-2">
                    <Printer className="w-4 h-4 text-[#0284C7]" />
                    Proposal Generator Parameters
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Adjust variables to dynamically render the client-ready luxury PDF proposal.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Select Yacht</label>
                    <select
                      value={proposalYachtName}
                      onChange={(e) => {
                        setProposalYachtName(e.target.value);
                        const match = [...YACHTS_DATA, ...SALES_FLEET].find((y) => y.name === e.target.value);
                        if (match) {
                          const rate = "weeklyRateHigh" in match ? match.weeklyRateHigh : match.opexProforma.summerWeeklyCharterRate;
                          setBaseRateEur(rate);
                        }
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                    >
                      <option value="M/Y AEGEAN MAJESTY">M/Y AEGEAN MAJESTY (52m Benetti - €290k/wk)</option>
                      <option value="M/Y CYCLADIC STAR">M/Y CYCLADIC STAR (40m Sanlorenzo - €185k/wk)</option>
                      <option value="M/Y AEGEAN ODYSSEY">M/Y AEGEAN ODYSSEY (42m Custom Line - €145k/wk)</option>
                      <option value="S/Y OLYMPIC BREEZE">S/Y OLYMPIC BREEZE (24m Sunreef Eco - €58k/wk)</option>
                      <option value="M/Y IONIAN BREEZE">M/Y IONIAN BREEZE (34m Sunseeker - €125k/wk)</option>
                      <option value="M/Y POSEIDON ROYAL">M/Y POSEIDON ROYAL (56m Benetti - €310k/wk)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Client Name / Family Office</label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Guests</label>
                      <input
                        type="number"
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">APA % (Advance)</label>
                      <select
                        value={apaPercent}
                        onChange={(e) => setApaPercent(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                      >
                        <option value={25}>25% (Sailing/Cat)</option>
                        <option value={30}>30% (Standard Motor)</option>
                        <option value={35}>35% (High-Speed Tri-Deck)</option>
                        <option value={40}>40% (Heavy Fuel / Heli)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Greek VAT %</label>
                      <select
                        value={greekVatPercent}
                        onChange={(e) => setGreekVatPercent(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                      >
                        <option value={12}>12% (Greek Law 4926 Standard)</option>
                        <option value={24}>24% (Non-commercial VAT)</option>
                        <option value={0}>0% (High Seas Exemption)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Delivery Fee (€)</label>
                      <input
                        type="number"
                        value={deliveryFeeEur}
                        onChange={(e) => setDeliveryFeeEur(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Embarkation Port</label>
                    <select
                      value={embarkationPort}
                      onChange={(e) => setEmbarkationPort(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                    >
                      <option value="Athens (Marina Flisvos)">Athens (Marina Flisvos)</option>
                      <option value="Athens (Marina Alimos)">Athens (Marina Alimos)</option>
                      <option value="Mykonos (New Port Tourlos)">Mykonos (New Port Tourlos)</option>
                      <option value="Corfu (Gouvia Marina)">Corfu (Gouvia Marina)</option>
                      <option value="Rhodes (Mandraki Port)">Rhodes (Mandraki Port)</option>
                      <option value="Santorini (Vlychada Bay)">Santorini (Vlychada Bay)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Recommended Itinerary</label>
                    <select
                      value={selectedRouteId}
                      onChange={(e) => setSelectedRouteId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                    >
                      {ITINERARY_PRESETS.map((it) => (
                        <option key={it.id} value={it.id}>
                          {it.title} ({it.days} Days)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quick Proposal Action Buttons */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <button
                    onClick={handlePrintProposal}
                    className="w-full py-2.5 rounded-xl aegean-btn font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Export PDF Proposal</span>
                  </button>

                  <button
                    onClick={handleCopyProposalLink}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-xs text-slate-700 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Client Share Link</span>
                  </button>

                  <button
                    onClick={handlePushToMyba}
                    className="w-full py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C59B27] font-bold text-xs text-slate-950 uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
                  >
                    <PenTool className="w-3.5 h-3.5 text-slate-950" />
                    <span>Push to MYBA Contract</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Live Luxury PDF-Ready Proposal Preview (8 cols) */}
              <div
                id="proposal-printable"
                className="lg:col-span-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-8 print:p-0 print:border-none print:shadow-none"
              >
                {/* Proposal Header Banner */}
                <div className="flex justify-between items-start border-b-2 border-[#0B1E36] pb-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#02509A] flex items-center justify-center text-white">
                        <Anchor className="w-4 h-4" />
                      </div>
                      <span className="text-xl font-black tracking-widest text-[#0B1E36] uppercase">
                        YACHT<span className="text-[#0284C7]">DESK</span>
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                      Central Agency Mediterranean Operations • Athens & Monaco
                    </div>
                  </div>

                  <div className="text-right space-y-0.5">
                    <span className="inline-block px-3 py-1 rounded-full bg-sky-50 text-[#02509A] text-[10px] font-bold uppercase tracking-widest border border-sky-200">
                      Official Client Proposal
                    </span>
                    <div className="text-xs font-mono text-slate-500">Ref: YD-PROP-{new Date().getFullYear()}-441</div>
                    <div className="text-[10px] text-slate-400">Valid for 48 Hours</div>
                  </div>
                </div>

                {/* Proposal Client & Yacht Target Block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Prepared Exclusively For:</div>
                    <div className="text-base font-black text-[#0B1E36] mt-0.5">{clientName}</div>
                    <div className="text-xs text-slate-600 mt-1">
                      Party of <strong>{guestCount} Guests</strong> • Dedicated Crew Service
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Charter Voyage:</div>
                    <div className="text-xs font-bold text-[#02509A] mt-0.5">{charterDates}</div>
                    <div className="text-xs text-slate-600 mt-1">
                      Embark: <strong>{embarkationPort}</strong> <br />
                      Disembark: <strong>{disembarkationPort}</strong>
                    </div>
                  </div>
                </div>

                {/* Yacht Showcase Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xl font-black text-[#0B1E36]">{proposalYachtName}</h3>
                    <span className="text-xs font-bold text-[#0284C7]">Commercial Greek Law 4926 Registered</span>
                  </div>

                  <div className="grid grid-cols-4 gap-3 text-center p-3 rounded-xl bg-sky-50/60 border border-sky-100 text-xs">
                    <div>
                      <div className="text-[10px] uppercase text-slate-400 font-bold">Base Rate</div>
                      <div className="font-black text-[#0B1E36]">€{baseRateEur.toLocaleString()}/wk</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-slate-400 font-bold">APA Allowance</div>
                      <div className="font-black text-[#0B1E36]">{apaPercent}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-slate-400 font-bold">Greek VAT</div>
                      <div className="font-black text-emerald-600">{greekVatPercent}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-slate-400 font-bold">Cruising Area</div>
                      <div className="font-black text-[#0B1E36]">Aegean / Cyclades</div>
                    </div>
                  </div>
                </div>

                {/* Detailed 7-Day Day-by-Day Itinerary Highlights */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>Curated 7-Day Route: {currentRoute.title}</span>
                  </h4>

                  <div className="space-y-2 border-l-2 border-sky-200 pl-4 text-xs">
                    {currentRoute.daysList.slice(0, 5).map((d) => (
                      <div key={d.day} className="space-y-0.5">
                        <span className="font-bold text-[#0B1E36]">Day {d.day}: {d.port}</span>
                        <p className="text-[11px] text-slate-600 leading-relaxed">{d.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Financial Proforma Summary Table */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Transparent Financial Breakdown Proforma
                  </h4>

                  <table className="w-full text-xs border-collapse">
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">Base Charter Fee (1 Week / 7 Nights):</td>
                        <td className="py-2 text-right font-mono font-bold text-[#0B1E36]">
                          €{baseRateEur.toLocaleString()}
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">
                          Advance Provisioning Allowance (APA {apaPercent}% for fuel, provisions, marina dockage):
                        </td>
                        <td className="py-2 text-right font-mono font-bold text-[#0B1E36]">
                          €{calculatedApa.toLocaleString()}
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">
                          Hellenic Value Added Tax (Greek VAT {greekVatPercent}% under Law 4926/2022):
                        </td>
                        <td className="py-2 text-right font-mono font-bold text-emerald-600">
                          €{calculatedVat.toLocaleString()}
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">
                          Repositioning & Delivery Surcharge ({embarkationPort.split("(")[0]}):
                        </td>
                        <td className="py-2 text-right font-mono font-bold text-[#0B1E36]">
                          €{deliveryFeeEur.toLocaleString()}
                        </td>
                      </tr>
                      <tr className="border-t-2 border-[#0B1E36] bg-slate-50">
                        <td className="py-3 px-3 font-black text-sm uppercase text-[#0B1E36]">
                          Total Charter Gross Proforma Amount:
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-black text-base text-[#02509A]">
                          €{totalCharterGross.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Payment Milestone Terms */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <div className="font-bold text-[#0B1E36]">MYBA Standard Payment Milestones:</div>
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span>• 1st Deposit (50% Upon MYBA WYA Signature):</span>
                    <span className="font-mono font-bold text-slate-900">€{firstDeposit50.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span>• Final Balance + APA + VAT (Due 30 days prior to embarkation):</span>
                    <span className="font-mono font-bold text-slate-900">€{firstDeposit50.toLocaleString()}</span>
                  </div>
                </div>

                {/* Footer Disclaimers */}
                <div className="text-[10px] text-slate-400 pt-4 border-t border-slate-100 space-y-1">
                  <p>
                    Executed under standard MYBA Worldwide Yachting Agreement terms. Advance Provisioning Allowance (APA) is held in segregated stakeholder client escrow; any unspent balance is reimbursed in full by the Captain prior to disembarkation.
                  </p>
                  <p className="font-mono">
                    YachtDesk Central Agency • Athens Flisvos: +30 210 980 4400 • charter@yachtdesk.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: AUTOMATED MYBA CONTRACT PRE-FILLER */}
        {/* ========================================================= */}
        {activeTab === "myba" && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#02509A]">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>MYBA Worldwide Yachting Agreement (WYA) Digital Generator</span>
                  </div>
                  <h2 className="text-2xl font-black text-[#0B1E36]">
                    Hellenic Maritime Law 4926/2022 Contract Schedule
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                    mybaStatus === "Signed & Registered"
                      ? "bg-emerald-100 text-emerald-800"
                      : mybaStatus === "Dispatched DocuSign"
                      ? "bg-sky-100 text-sky-800"
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    Status: {mybaStatus}
                  </span>
                </div>
              </div>

              {/* Pre-filled Contract Summary Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <h3 className="font-bold text-sm text-[#0B1E36]">1. Agreement Parties & Vessels</h3>
                  <div>
                    <span className="text-slate-500 block">MYBA Contract ID:</span>
                    <span className="font-mono font-bold text-slate-900">{mybaAgreementNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Greek e-Mitroo Digital Registry ID:</span>
                    <span className="font-mono font-bold text-[#02509A]">GR-E-MITROO-2021-99410</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Charter Vessel:</span>
                    <span className="font-bold text-slate-900">{proposalYachtName} (Flag: Cayman Islands / Greek e-Permit)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Charterer (Client Legal Entity):</span>
                    <span className="font-bold text-slate-900">{clientName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Central Agency Stakeholder:</span>
                    <span className="font-bold text-slate-900">YachtDesk Mediterranean Central Agency / Vernicos Operations</span>
                  </div>
                </div>

                <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <h3 className="font-bold text-sm text-[#0B1E36]">2. Charter Period & Cruising Domain</h3>
                  <div>
                    <span className="text-slate-500 block">Charter Dates:</span>
                    <span className="font-bold text-slate-900">{charterDates}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Port of Delivery (Embarkation):</span>
                    <span className="font-bold text-slate-900">{embarkationPort} at 12:00 Noon</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Port of Redelivery (Disembarkation):</span>
                    <span className="font-bold text-slate-900">{disembarkationPort} at 12:00 Noon</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Permitted Cruising Limits:</span>
                    <span className="font-bold text-slate-900">Hellenic Territorial Waters (Cyclades, Saronic, Ionian)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Regulated Escrow Depository:</span>
                    <span className="font-mono text-slate-700 text-[11px]">{escrowAccountBank}</span>
                  </div>
                </div>
              </div>

              {/* Statutory Clauses Highlight */}
              <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-3 text-xs text-slate-700">
                <h4 className="font-bold text-[#0B1E36] uppercase tracking-wider text-[11px]">
                  Special Conditions & Statutory Greek Clauses Pre-Inserted:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-white rounded-xl border border-sky-100">
                    <span className="font-bold text-[#02509A] block mb-1">Greek Law 4926/2022</span>
                    <p className="text-[11px] text-slate-600">
                      Commercial charter declaration logged electronically with the Hellenic Coast Guard e-Mitroo database prior to departure.
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-sky-100">
                    <span className="font-bold text-[#02509A] block mb-1">Meltemi Weather Clause</span>
                    <p className="text-[11px] text-slate-600">
                      Captain possesses statutory safety discretion to adjust route anchorages during Beaufort 7+ Meltemi conditions without penalty.
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-sky-100">
                    <span className="font-bold text-[#02509A] block mb-1">APA Escrow Accounting</span>
                    <p className="text-[11px] text-slate-600">
                      Itemized computer accounting of all fuel, port dues, and provisions presented with receipts prior to disembarkation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-500">
                  Ready for electronic signature dispatch via DocuSign Hellenic Maritime Integration.
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setMybaStatus("Dispatched DocuSign");
                      showToast("MYBA Agreement dispatched to Client & Owner via DocuSign!");
                    }}
                    className="px-5 py-2.5 rounded-xl aegean-btn font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send for Digital Signature</span>
                  </button>

                  <button
                    onClick={() => {
                      setMybaStatus("Signed & Registered");
                      showToast("Agreement signed & verified with Hellenic Port Authority!");
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Signed & Registered</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: S&P TRANSACTION DESK & SURVEY MILESTONES */}
        {/* ========================================================= */}
        {activeTab === "spDesk" && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#02509A]">
                  <Briefcase className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Active Superyacht Acquisition Pipeline</span>
                </div>
                <h2 className="text-xl font-black text-[#0B1E36]">
                  S&P Deals, Condition Surveys & Escrow Tracking
                </h2>
                <p className="text-xs text-slate-600">
                  Monitor institutional purchase transactions from Letter of Intent to haul-out survey and Bill of Sale completion.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Total Escrows Held:</span>
                <span className="font-mono text-sm font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  €{spDeals.reduce((sum, d) => sum + d.escrowHeldEur, 0).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Pipeline Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {spDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm hover:border-sky-300 transition-all space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-baseline justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Lead Broker: {deal.leadBroker}
                        </span>
                        <h3 className="text-lg font-black text-[#0B1E36]">{deal.yachtName}</h3>
                      </div>

                      {/* Stage Badge */}
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                        deal.stage === "Closing"
                          ? "bg-emerald-100 text-emerald-800"
                          : deal.stage === "Survey"
                          ? "bg-sky-100 text-sky-800"
                          : deal.stage === "Escrow"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-800"
                      }`}>
                        Stage: {deal.stage}
                      </span>
                    </div>

                    {/* Financial Terms */}
                    <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-2xl text-xs text-center border border-slate-100">
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Asking</div>
                        <div className="font-extrabold text-[#0B1E36]">€{(deal.askingPriceEur / 1000000).toFixed(1)}M</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Offer (MOA)</div>
                        <div className="font-extrabold text-[#02509A]">€{(deal.offerPriceEur / 1000000).toFixed(2)}M</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">10% Escrow Held</div>
                        <div className="font-extrabold text-emerald-600 font-mono">
                          €{(deal.escrowHeldEur / 1000).toLocaleString()}k
                        </div>
                      </div>
                    </div>

                    {/* Buyer Entity */}
                    <div className="text-xs text-slate-600">
                      Buyer: <strong>{deal.buyerName}</strong>
                    </div>

                    {/* Survey Checklist Items */}
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Technical Inspection & Closing Tasks:
                      </div>
                      <div className="space-y-1.5">
                        {deal.surveyTasks.map((task, idx) => (
                          <button
                            key={idx}
                            onClick={() => toggleSurveyTask(deal.id, idx)}
                            className="w-full flex items-center gap-2 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-left transition-colors cursor-pointer text-xs"
                          >
                            <span className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                              task.done ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300"
                            }`}>
                              {task.done && <Check className="w-3 h-3 stroke-[3]" />}
                            </span>
                            <span className={task.done ? "line-through text-slate-400" : "text-slate-700 font-medium"}>
                              {task.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Advance Stage Button */}
                  <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-[11px] text-slate-400">
                      {deal.stage === "Closing" ? "Ready for Bill of Sale completion" : "Proceed to next transaction milestone"}
                    </span>

                    <button
                      onClick={() => advanceDealStage(deal.id)}
                      disabled={deal.stage === "Closing"}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                        deal.stage === "Closing"
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "aegean-btn shadow-sm cursor-pointer hover:opacity-95"
                      }`}
                    >
                      <span>Advance Milestone</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />

      <InquiryModal
        isOpen={charterModalOpen}
        onClose={() => setCharterModalOpen(false)}
      />
    </main>
  );
}
