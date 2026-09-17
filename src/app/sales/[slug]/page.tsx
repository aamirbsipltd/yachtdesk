import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SALES_FLEET, getSaleYachtBySlug } from "@/data/salesFleet";
import SaleYachtDossierClient from "@/components/SaleYachtDossierClient";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return SALES_FLEET.map((yacht) => ({
    slug: yacht.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const yacht = getSaleYachtBySlug(slug);

  if (!yacht) {
    return {
      title: "Superyacht Dossier | YachtDesk S&P",
      description: "Superyacht Sale & Purchase Dossier on YachtDesk.",
    };
  }

  return {
    title: `${yacht.name} (${yacht.technicalSpecs.lengthM}m ${yacht.builder}) For Sale | YachtDesk S&P`,
    description: `${yacht.name} for sale: €${(yacht.askingPriceEur / 1000000).toFixed(1)}M. ${yacht.technicalSpecs.lengthM}m ${yacht.builder} ${yacht.yearBuilt}. Full technical specifications, RINA/Lloyd's class, and annual charter OPEX offset proforma.`,
    openGraph: {
      title: `${yacht.name} For Sale - €${(yacht.askingPriceEur / 1000000).toFixed(1)}M | YachtDesk`,
      description: yacht.shortDescription,
      images: [
        {
          url: yacht.heroImage,
          width: 1200,
          height: 630,
          alt: yacht.name,
        },
      ],
    },
  };
}

export default async function SaleYachtDossierPage({ params }: PageProps) {
  const { slug } = await params;
  const yacht = getSaleYachtBySlug(slug);

  if (!yacht) {
    notFound();
  }

  return <SaleYachtDossierClient yacht={yacht} />;
}
