export interface Yacht {
  id: string;
  name: string;
  builder: string;
  category: "motor" | "mega" | "catamaran" | "sailing";
  lengthM: number;
  lengthFt: number;
  yearBuilt: number;
  yearRefit?: number;
  cabins: number;
  guests: number;
  crew: number;
  cruisingSpeedKnots: number;
  fuelConsumptionLph: number;
  homePort: string;
  cruisingAreas: string[];
  weeklyRateHigh: number;
  weeklyRateLow: number;
  vatRatePercent: number;
  apaRatePercent: number;
  featured: boolean;
  heroImage: string;
  gallery: string[];
  description: string;
  amenities: string[];
  toys: string[];
  cabinConfig: string;
  centralAgent: {
    name: string;
    location: string;
    verified: boolean;
  };
}

export const YACHTS_DATA: Yacht[] = [
  {
    id: "aegean-odyssey-42m",
    name: "M/Y AEGEAN ODYSSEY",
    builder: "Custom Line (Ferretti Group)",
    category: "motor",
    lengthM: 42.6,
    lengthFt: 140,
    yearBuilt: 2023,
    cabins: 5,
    guests: 10,
    crew: 9,
    cruisingSpeedKnots: 14,
    fuelConsumptionLph: 280,
    homePort: "Marina Flisvos, Athens",
    cruisingAreas: ["Cyclades", "Saronic Gulf", "Ionian Islands"],
    weeklyRateHigh: 145000,
    weeklyRateLow: 125000,
    vatRatePercent: 12,
    apaRatePercent: 35,
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1600&q=80"
    ],
    description: "The epitome of Italian tri-deck elegance tailored for the Aegean. Features a full-beam master suite on the main deck, fold-out balconies, beach club with swim platform, and zero-speed fin stabilizers.",
    amenities: ["Zero-Speed Stabilizers", "Sundeck Jacuzzi", "Fold-out Beach Club", "Stern Garage", "Wi-Fi 6 / Starlink Maritime", "Michelin-trained Chef"],
    toys: ["Williams DieselJet 565", "2x Sea-Doo Spark Jet Skis", "2x Seabob F5S", "Fliteboard e-Foil", "Inflatable Sea Pool with Jellyfish Net", "Snorkeling & Scuba Gear"],
    cabinConfig: "1 Master, 2 VIP Doubles, 2 Convertibles (Twin/Double)",
    centralAgent: {
      name: "Vernicos & Aegean Fleet Partners",
      location: "Athens, Greece",
      verified: true
    }
  },
  {
    id: "cycladic-star-32m",
    name: "M/Y CYCLADIC STAR",
    builder: "Sanlorenzo",
    category: "motor",
    lengthM: 32.2,
    lengthFt: 106,
    yearBuilt: 2021,
    yearRefit: 2025,
    cabins: 4,
    guests: 8,
    crew: 6,
    cruisingSpeedKnots: 20,
    fuelConsumptionLph: 390,
    homePort: "Marina Alimos, Athens",
    cruisingAreas: ["Cyclades", "Dodecanese", "Crete"],
    weeklyRateHigh: 88000,
    weeklyRateLow: 74000,
    vatRatePercent: 12,
    apaRatePercent: 35,
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=1600&q=80"
    ],
    description: "Sleek planing hull with modern minimalist interiors by Lissoni. Exceptional performance cruising effortlessly through the Cycladic Meltemi winds with gyroscopic zero-speed stabilization.",
    amenities: ["Gyroscopic Stabilizers", "Hardtop Sundeck Bar", "Hydraulic Swim Platform", "Bowers & Wilkins Audio", "Starlink High-Speed Internet"],
    toys: ["Williams SportJet 435", "1x Yamaha WaveRunner", "2x Seabobs", "2x Inflatable Paddleboards", "Wakeboard & Water Skis", "Seabed Drone"],
    cabinConfig: "1 Master Suite, 1 VIP Stateroom, 2 Twin Cabins with Pullmans",
    centralAgent: {
      name: "Athenian Yacht Management",
      location: "Piraeus, Greece",
      verified: true
    }
  },
  {
    id: "olympic-breeze-24m",
    name: "S/Y OLYMPIC BREEZE",
    builder: "Sunreef Yachts (80 Eco)",
    category: "catamaran",
    lengthM: 24.4,
    lengthFt: 80,
    yearBuilt: 2024,
    cabins: 4,
    guests: 8,
    crew: 4,
    cruisingSpeedKnots: 9,
    fuelConsumptionLph: 45,
    homePort: "Gouvia Marina, Corfu",
    cruisingAreas: ["Ionian Islands", "Peloponnese", "Corinth Canal"],
    weeklyRateHigh: 58000,
    weeklyRateLow: 46000,
    vatRatePercent: 12,
    apaRatePercent: 25,
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
    ],
    description: "Ultra-luxury eco-responsible catamaran with 340 sqm of living space. Integrated solar skin, electric hydro-generators for silent emissions-free anchoring in crystal Ionian coves.",
    amenities: ["Silent Electric Night Mode", "Massive Flybridge Jacuzzi", "Bow Terrace Lounge", "Eco Watermaker 300L/h", "Starlink Connectivity"],
    toys: ["Highfield Electric Tender", "2x e-Foils", "2x Kayaks", "4x Stand-up Paddleboards", "Snorkeling equipment for all ages"],
    cabinConfig: "1 Master with Walk-in Closet, 3 Queen Guest Suites",
    centralAgent: {
      name: "Ionian Luxury Charter Agency",
      location: "Corfu, Greece",
      verified: true
    }
  },
  {
    id: "poseidon-royal-56m",
    name: "M/Y POSEIDON ROYAL",
    builder: "Benetti",
    category: "mega",
    lengthM: 56.0,
    lengthFt: 184,
    yearBuilt: 2022,
    cabins: 6,
    guests: 12,
    crew: 14,
    cruisingSpeedKnots: 15,
    fuelConsumptionLph: 420,
    homePort: "Port Hercule, Monaco / Piraeus",
    cruisingAreas: ["French Riviera", "Corsica & Sardinia", "Cyclades", "Dodecanese"],
    weeklyRateHigh: 310000,
    weeklyRateLow: 260000,
    vatRatePercent: 12,
    apaRatePercent: 35,
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1600&q=80"
    ],
    description: "Flagship Benetti displacement superyacht. Certified touch-and-go commercial helipad, glass-bottom pool cascading into beach club, gym, hammam steam room, and onboard cinema.",
    amenities: ["Touch-and-Go Helipad", "Glass-Bottom Pool & Jacuzzi", "Full Spa & Steam Room", "Fully Equipped Technogym", "Private Owner's Deck with Terrace", "Elevator to All 4 Decks"],
    toys: ["10m Pascoe Custom Limousine Tender", "Castoldi Jet Tender", "3x Sea-Doo GTX 300", "4x Seabob F5SR", "Flyboard & Hoverboard", "Inflatable Waterslide"],
    cabinConfig: "1 Master Deck Suite, 1 VIP Suite, 4 Luxury Double/Twin Guest Cabins",
    centralAgent: {
      name: "Monaco & Aegean Central Desk",
      location: "Monaco / Athens",
      verified: true
    }
  },
  {
    id: "helios-spirit-28m",
    name: "S/Y HELIOS SPIRIT",
    builder: "Wally Yachts",
    category: "sailing",
    lengthM: 28.5,
    lengthFt: 94,
    yearBuilt: 2020,
    cabins: 3,
    guests: 6,
    crew: 4,
    cruisingSpeedKnots: 11,
    fuelConsumptionLph: 55,
    homePort: "Lavrion Marina, Athens",
    cruisingAreas: ["Cyclades", "Sporades", "Dodecanese"],
    weeklyRateHigh: 49000,
    weeklyRateLow: 39000,
    vatRatePercent: 12,
    apaRatePercent: 25,
    featured: false,
    heroImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
    ],
    description: "Pure carbon-fibre sailing performance combined with bespoke Italian minimalist luxury. Flush teak deck, push-button hydraulic sail controls, and sublime silence under canvas.",
    amenities: ["Flush Racing Teak Decks", "Hydraulic Transom Swim Platform", "Carbon Rigging & 3Di Sails", "Bose Surround Sound", "Starlink Marine"],
    toys: ["Williams TurboJet 385", "2x Stand-up Paddleboards", "Snorkeling equipment", "Inflatable Towables"],
    cabinConfig: "1 Master Suite Forward, 2 Twin Guest Cabins",
    centralAgent: {
      name: "Hellenic Sailing Partners",
      location: "Athens, Greece",
      verified: true
    }
  },
  {
    id: "aegean-mirage-38m",
    name: "M/Y AEGEAN MIRAGE",
    builder: "Princess Yachts (Princess 35M)",
    category: "motor",
    lengthM: 35.1,
    lengthFt: 115,
    yearBuilt: 2022,
    cabins: 5,
    guests: 10,
    crew: 7,
    cruisingSpeedKnots: 16,
    fuelConsumptionLph: 310,
    homePort: "Rhodes Mandraki Port",
    cruisingAreas: ["Dodecanese", "Turkish Riviera", "Cyclades"],
    weeklyRateHigh: 115000,
    weeklyRateLow: 98000,
    vatRatePercent: 12,
    apaRatePercent: 35,
    featured: false,
    heroImage: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80"
    ],
    description: "Superb British naval architecture with panoramic fold-down balconies. Tri-deck layout with expansive sundeck bar, aft cockpit al fresco dining, and hydraulic beach club.",
    amenities: ["Fold-Down Hydraulic Balconies", "Sundeck Jacuzzi Bar", "Zero-Speed Stabilizers", "Sonos Premium Multi-Zone Audio", "Starlink High-Speed WiFi"],
    toys: ["Williams SportJet 460", "2x Sea-Doo Spark Trixx", "2x Seabob F5", "Jobe Inflatable Sofa", "Wakeboards & Waterskis", "Diving Compressors"],
    cabinConfig: "1 Main Deck Master Suite, 2 Double VIPs, 2 Twin Convertible Cabins",
    centralAgent: {
      name: "Rhodes Maritime & Charter Services",
      location: "Rhodes, Greece",
      verified: true
    }
  }
];

export const ITINERARY_PRESETS = [
  {
    id: "classical-cyclades",
    title: "The Classical Cyclades: Windmills & Calderas",
    region: "Cyclades, Greece",
    days: 7,
    embarkation: "Athens (Marina Alimos)",
    disembarkation: "Mykonos / Athens",
    highlight: "Sounion, Kea, Delos Sanctuary, Little Venice & Santorinian Sunset",
    daysList: [
      { day: 1, port: "Athens to Cape Sounion & Kea", desc: "Embark at Marina Alimos at 12:00. Cruise past Temple of Poseidon for lunch anchor. Afternoon sail to Vourkari, Kea." },
      { day: 2, port: "Kea to Syros (Hermoupolis)", desc: "Morning cruise to Syros, capital of the Cyclades. Explore neoclassical Vaporia and historic mansions." },
      { day: 3, port: "Syros to Delos & Mykonos", desc: "Private tender landing at UNESCO World Heritage Delos sanctuary. Afternoon anchor at Psarou Bay; evening in Mykonos Town." },
      { day: 4, port: "Mykonos to Rinia & Paros (Naoussa)", desc: "Swim stop at pristine deserted beaches of Rinia. Cruise to picturesque Venetian harbor of Naoussa, Paros." },
      { day: 5, port: "Paros to Antiparos & Sifnos", desc: "Cliff jumping and sea caves in Antiparos. Afternoon cruise to Sifnos (Kastro) for renowned culinary island dining." },
      { day: 6, port: "Sifnos to Serifos & Kythnos (Kolona)", desc: "Anchor in Kolona, the famous double-sided sandbar beach of Kythnos. Sunset al fresco dinner on the sundeck." },
      { day: 7, port: "Kythnos return to Athens (Alimos)", desc: "Morning swim and breakfast underway back into Saronic Gulf. Disembarkation at 12:00 at Marina Alimos." }
    ]
  },
  {
    id: "sapphire-ionian",
    title: "The Sapphire Ionian: Emerald Coves & Mythic Caves",
    region: "Ionian Sea, Greece",
    days: 7,
    embarkation: "Corfu (Gouvia Marina)",
    disembarkation: "Zakynthos / Corfu",
    highlight: "Paxoi Blue Caves, Emerald Antipaxos, Mythic Ithaca & Navagio Beach",
    daysList: [
      { day: 1, port: "Corfu Town to Sivota Bay", desc: "Embark at Gouvia Marina. Cruise alongside Old Fortress of Corfu down to lush mainland Sivota anchorages." },
      { day: 2, port: "Sivota to Paxos (Gaios)", desc: "Navigate through narrow fjord of Gaios. Evening cocktails amongst olive groves and pastel Venetian waterfront." },
      { day: 3, port: "Paxos to Antipaxos (Voutoumi Beach)", desc: "Anchor in surreal turquoise water of Voutoumi and Vrika. Water toys and tender exploration of the Western Blue Caves." },
      { day: 4, port: "Antipaxos to Lefkada & Meganisi", desc: "Cruise south past Lefkas canal into the tranquil islands of Meganisi. Secluded bay anchorage for beach barbecue." },
      { day: 5, port: "Meganisi to Ithaca (Vathi)", desc: "Sail to the mythical home of Odysseus. Anchor in Vathi natural amphitheater fjord; explore local tavernas." },
      { day: 6, port: "Ithaca to Kefalonia (Fiskardo)", desc: "Short hop to picturesque, earthquake-surviving village of Fiskardo. Pine-fringed waters and yachting glamour." },
      { day: 7, port: "Kefalonia return to Corfu / Zakynthos", desc: "Morning tender cruise to Melissani cave. Return cruise and disembarkation at 12:00." }
    ]
  }
];
