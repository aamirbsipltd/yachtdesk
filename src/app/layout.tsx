import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yatchdesk.com"),
  title: "YachtDesk | Mediterranean & Greek Islands Luxury Yacht Charters",
  description: "Direct-to-fleet crewed yacht charter sourcing across Athens, the Cyclades, Ionian, and the Mediterranean. Transparent Greek Law 4926/2022 VAT & APA calculations with zero retail markups.",
  keywords: [
    "Yacht Charter Greece",
    "Athens Yacht Charter",
    "Mykonos Superyacht Rental",
    "MYBA Yacht Charter",
    "Greek Law 4926 Charter",
    "Cyclades Yachting",
    "YachtDesk"
  ],
  authors: [{ name: "YachtDesk Mediterranean Operations" }],
  openGraph: {
    title: "YachtDesk | Mediterranean Luxury Yacht Charters",
    description: "Direct Central Agency charter network in Greece and the Mediterranean.",
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
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen bg-[#F8FAFC] text-[#0B1E36] selection:bg-sky-200 selection:text-sky-950">
        {children}
      </body>
    </html>
  );
}
