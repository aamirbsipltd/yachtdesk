import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YachtDesk | Mediterranean Algorithmic Charter Desk & Fleet Network",
  description: "Direct-to-fleet crewed yacht charter sourcing across Greece, the Cyclades, Ionian, and Western Mediterranean. Zero retail markups, transparent APA & Greek VAT calculations, and standardized MYBA agreements.",
  keywords: [
    "Yacht Charter Greece",
    "Athens Yacht Charter",
    "Mykonos Superyacht Rental",
    "MYBA Yacht Charter",
    "Crewed Catamaran Greece",
    "Greek Law 4926 Charter",
    "Vernicos Yachts Fleet",
    "YachtDesk"
  ],
  authors: [{ name: "YachtDesk Charter Operations" }],
  openGraph: {
    title: "YachtDesk | Mediterranean Luxury Yacht Charters",
    description: "Algorithmic charter matching directly connected to Central Agency fleets in Greece and the Mediterranean.",
    url: "https://yachtdesk.vercel.app",
    siteName: "YachtDesk",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased min-h-screen bg-[#050811] text-slate-100 selection:bg-amber-400 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
