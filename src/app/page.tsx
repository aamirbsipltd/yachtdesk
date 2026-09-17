"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FleetGrid from "@/components/FleetGrid";
import CostCalculator from "@/components/CostCalculator";
import ItineraryGuides from "@/components/ItineraryGuides";
import FleetManagerPortal from "@/components/FleetManagerPortal";
import MybaTrust from "@/components/MybaTrust";
import InquiryModal from "@/components/InquiryModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedYachtForInquiry, setSelectedYachtForInquiry] = useState<string>("");
  const [targetBudgetForInquiry, setTargetBudgetForInquiry] = useState<number | undefined>(undefined);

  // Search filter states from Hero
  const [filters, setFilters] = useState({
    region: "all",
    category: "all",
    guests: 12,
    maxBudget: 350000,
  });

  const handleOpenInquiry = (yachtOrContext?: string, budget?: number) => {
    setSelectedYachtForInquiry(yachtOrContext || "");
    setTargetBudgetForInquiry(budget);
    setInquiryModalOpen(true);
  };

  const handleSearchFromHero = (newFilters: {
    region: string;
    category: string;
    guests: number;
    maxBudget: number;
  }) => {
    setFilters(newFilters);
  };

  return (
    <main className="min-h-screen bg-[#050811] text-slate-100 selection:bg-amber-400 selection:text-slate-950 relative">
      {/* Top navigation */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Hero section with search & filter engine */}
      <Hero onSearch={handleSearchFromHero} onOpenInquiry={handleOpenInquiry} />

      {/* Curated Mediterranean Fleet Grid with live modal detail */}
      <FleetGrid
        onOpenInquiry={handleOpenInquiry}
        filterRegion={filters.region}
        filterCategory={filters.category}
        filterGuests={filters.guests}
        filterMaxBudget={filters.maxBudget}
      />

      {/* Live Charter Cost & APA Financial Calculator */}
      <CostCalculator onOpenInquiry={(budget) => handleOpenInquiry("Cost Calculator Proforma", budget)} />

      {/* Curated 7-day Mediterranean itineraries */}
      <ItineraryGuides onOpenInquiry={handleOpenInquiry} />

      {/* Central Agency & Fleet Manager Portal (The Vernicos section) */}
      <FleetManagerPortal />

      {/* MYBA & Greek Law 4926 Standards */}
      <MybaTrust />

      {/* Footer */}
      <Footer />

      {/* Global Booking & Proposal Request Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        defaultYachtName={selectedYachtForInquiry}
        defaultBudget={targetBudgetForInquiry}
      />
    </main>
  );
}
