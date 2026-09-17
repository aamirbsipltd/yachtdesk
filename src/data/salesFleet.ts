export interface TechnicalSpecs {
  lengthM: number;
  lengthFt: number;
  beamM: number;
  beamFt: number;
  draftM: number;
  draftFt: number;
  grossTonnage: number;
  hullMaterial: string;
  superstructureMaterial: string;
  deckMaterial: string;
  fuelCapacityL: number;
  waterCapacityL: number;
  rangeNm: number;
  cruisingSpeedKnots: number;
  maxSpeedKnots: number;
  stabilizers: string;
  navalArchitect: string;
  exteriorDesigner: string;
  interiorDesigner: string;
}

export interface EngineSpecs {
  manufacturer: string;
  model: string;
  totalPowerHp: number;
  quantity: number;
  engineHours: number;
  generators: string;
  propulsionType: string;
}

export interface Classification {
  society: string; // RINA, Lloyd's Register, ABS, Bureau Veritas
  notation: string;
  flagState: string;
  commercialStatus: string;
  vatStatus: "EU VAT Paid" | "EU VAT Not Paid" | "Commercial Exemption";
  eMitrooRegistered?: boolean;
}

export interface DeckPlanGA {
  deckName: string;
  description: string;
  features: string[];
}

export interface AnnualOpexProforma {
  crewSalaries: number;
  berthMooring: number;
  insuranceHullPI: number;
  maintenanceYard: number;
  managementCompliance: number;
  totalAnnualOpex: number;
  summerWeeklyCharterRate: number;
  projectedCharterWeeks: number;
  estimatedGrossCharterRevenue: number;
  caCommissionAndOpsPercent: number;
  netCharterIncome: number;
  netAnnualCostOfOwnership: number;
}

export interface SaleYacht {
  id: string;
  slug: string;
  name: string;
  builder: string;
  model: string;
  category: "motor" | "mega" | "sailing" | "catamaran" | "explorer";
  yearBuilt: number;
  yearRefit?: number;
  askingPriceEur: number;
  location: string;
  homePort: string;
  cabins: number;
  guests: number;
  crew: number;
  heroImage: string;
  gallery: string[];
  shortDescription: string;
  fullOverview: string;
  technicalSpecs: TechnicalSpecs;
  engineSpecs: EngineSpecs;
  classification: Classification;
  deckPlans: DeckPlanGA[];
  amenities: string[];
  tendersToys: string[];
  opexProforma: AnnualOpexProforma;
  centralBroker: {
    name: string;
    title: string;
    phone: string;
    email: string;
    office: string;
    verified: boolean;
  };
  featured: boolean;
  badgeHighlight?: string;
}

export const SALES_FLEET: SaleYacht[] = [
  {
    id: "aegean-majesty-52m",
    slug: "aegean-majesty-52m",
    name: "M/Y AEGEAN MAJESTY",
    builder: "Benetti",
    model: "Custom 52M Tri-Deck Displacement",
    category: "mega",
    yearBuilt: 2021,
    yearRefit: 2025,
    askingPriceEur: 28500000,
    location: "Marina Flisvos, Athens, Greece",
    homePort: "Marina Flisvos, Athens",
    cabins: 6,
    guests: 12,
    crew: 11,
    heroImage: "/images/poseidon-royal.jpg",
    gallery: [
      "/images/poseidon-royal.jpg",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=1600&q=80"
    ],
    shortDescription: "Benchmark 52-meter Italian tri-deck superyacht with 2025 interior and mechanical refit. Full EU VAT Paid, Cayman commercial registry, and proven €290k/week summer charter demand.",
    fullOverview: "M/Y AEGEAN MAJESTY represents one of the most impeccably maintained 50m+ steel displacement superyachts currently available on the Mediterranean market. Built to Lloyd's Register classification and maintained under full RINA commercial certification, she completed a comprehensive €2.4M refit in early 2025 including zero-hour servicing on her twin MTU main engines, full hull repaint in Awlgrip Snow White, complete audio-visual Starlink upgrade, and reimagined Salvagni Architetti salon spaces. Boasting a certified touch-and-go commercial helipad, cascading aft beach club with wellness sauna, and private owner's upper deck stateroom with panoramic Aegean views.",
    technicalSpecs: {
      lengthM: 52.0,
      lengthFt: 170.6,
      beamM: 9.2,
      beamFt: 30.2,
      draftM: 2.8,
      draftFt: 9.2,
      grossTonnage: 499,
      hullMaterial: "High-Tensile Naval Grade Steel (AH36)",
      superstructureMaterial: "Marine Grade Aluminium (5083-H111)",
      deckMaterial: "Burma Teak (14mm quarter-sawn)",
      fuelCapacityL: 68000,
      waterCapacityL: 16000,
      rangeNm: 4500,
      cruisingSpeedKnots: 14,
      maxSpeedKnots: 16.5,
      stabilizers: "Naiad Dynamics Model 525 Zero Speed (At Anchor) & Underway Fins",
      navalArchitect: "Benetti Yachts & Ausonio Naval Architecture",
      exteriorDesigner: "Giorgio M. Cassetta",
      interiorDesigner: "Salvagni Architetti"
    },
    engineSpecs: {
      manufacturer: "MTU Friedrichshafen",
      model: "2x MTU 12V 4000 M53 (1,380 kW / 1,851 hp each)",
      totalPowerHp: 3702,
      quantity: 2,
      engineHours: 1420,
      generators: "2x Kohler 125 kW 400V 50Hz + 1x Kohler 65 kW Emergency",
      propulsionType: "Twin Fixed Pitch 5-Blade Bronze Propellers on Duplex Stainless Shafts"
    },
    classification: {
      society: "RINA / Lloyd's Register",
      notation: "RINA ✠ HULL ● MACH, Yacht (E), Commercial Unrestricted Navigation, AUT-UMS",
      flagState: "Cayman Islands (George Town)",
      commercialStatus: "Commercial (Cayman / Greece e-Mitroo Authorized)",
      vatStatus: "EU VAT Paid",
      eMitrooRegistered: true
    },
    deckPlans: [
      {
        deckName: "Sundeck & Touch-and-Go Helipad",
        description: "Expansive 110 sqm sundeck equipped with forward 8-person heated Jacuzzi surrounded by sunpads, marble wet bar with Teppanyaki grill, day head, and aft touch-and-go landing area.",
        features: ["8-person Jacuzzi", "Al Fresco Dining for 14", "Full Cocktail Wet Bar", "Sunpad Solarium", "Touch-and-Go Helipad Rating"]
      },
      {
        deckName: "Bridge / Owner's Deck",
        description: "Dedicated private terrace aft of the skylounge. Wheelhouse forward with integrated ECDIS paperless navigation console, Ship's Office, and Captain's stateroom.",
        features: ["Panoramic Skylounge Cinema", "Private Owner Aft Dining", "Full-Beam Integrated Bridge", "Captain Stateroom & Ship's Office"]
      },
      {
        deckName: "Main Deck",
        description: "Full-beam Master Stateroom forward featuring private port-side balcony, his-and-hers Onyx bathrooms, and dressing room. Aft main salon and formal dining salon for 12 guests.",
        features: ["Master Suite with Balcony", "Formal Dining for 12", "Grand Salon with Floor-to-Ceiling Glazing", "Commercial Galley with Cold Room"]
      },
      {
        deckName: "Lower Deck & Beach Club",
        description: "Four generous guest staterooms (2 VIP doubles, 2 twin suites with Pullman berths). Stern opens to reveal teak beach club, sauna, gym, and side tender garage.",
        features: ["2 VIP Staterooms", "2 Twin/Pullman Cabins", "Stern Beach Club & Sauna", "Technogym Area", "Crew Quarters for 11 with Crew Mess"]
      }
    ],
    amenities: [
      "Zero-Speed Fin Stabilizers",
      "Touch-and-Go Commercial Helipad",
      "Sundeck Heated Jacuzzi & Solarium",
      "Stern Beach Club & Finnish Sauna",
      "Private Owner's Balcony",
      "Starlink Maritime Global 500Mbps High-Speed Internet",
      "Dornbracht & Italian Onyx Fittings",
      "Gym with Technogym Treadmill & Kinesis"
    ],
    tendersToys: [
      "9.5m Novurania Chase Tender with Twin 250hp Yamahas",
      "Williams SportJet 435 Tender",
      "2x Sea-Doo GTX Limited 300 Jet Skis",
      "3x Seabob F5S with integrated underwater cameras",
      "2x Fliteboard e-Foils Series 3",
      "Inflatable Sea Pool with Jellyfish Protection Netting",
      "Full Scuba Diving compressor & 6 sets of gear",
      "Paddleboards, Water Skis & Wakeboards"
    ],
    opexProforma: {
      crewSalaries: 980000,
      berthMooring: 220000,
      insuranceHullPI: 160000,
      maintenanceYard: 480000,
      managementCompliance: 140000,
      totalAnnualOpex: 1980000,
      summerWeeklyCharterRate: 290000,
      projectedCharterWeeks: 8,
      estimatedGrossCharterRevenue: 2320000,
      caCommissionAndOpsPercent: 15,
      netCharterIncome: 1972000,
      netAnnualCostOfOwnership: 8000
    },
    centralBroker: {
      name: "Dimitris Vernicos & Alexander Vance",
      title: "Senior S&P Broker & Central Agency Partner",
      phone: "+30 210 980 4410",
      email: "sales@yachtdesk.com",
      office: "YachtDesk Athens Flisvos & Monaco",
      verified: true
    },
    featured: true,
    badgeHighlight: "EU VAT Paid • 2025 Refit"
  },
  {
    id: "cycladic-star-40m",
    slug: "cycladic-star-40m",
    name: "M/Y CYCLADIC STAR",
    builder: "Sanlorenzo",
    model: "Alloy 40 / 44 Fast Displacement Superyacht",
    category: "motor",
    yearBuilt: 2022,
    askingPriceEur: 16800000,
    location: "Marina Alimos, Athens, Greece",
    homePort: "Marina Alimos, Athens",
    cabins: 5,
    guests: 10,
    crew: 7,
    heroImage: "/images/aegean-odyssey.jpg",
    gallery: [
      "/images/aegean-odyssey.jpg",
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=1600&q=80"
    ],
    shortDescription: "Ultra-contemporary all-aluminium fast displacement Sanlorenzo Alloy. Tri-deck owner's suite, zero-speed electric stabilization, and EU VAT commercial exemption.",
    fullOverview: "M/Y CYCLADIC STAR is a masterpiece of modern Italian naval architecture and avant-garde interior aesthetics by Piero Lissoni and Zuccon International Project. Constructed entirely in lightweight marine-grade aluminium, she combines a 22-knot sprint capacity with 2,000nm transatlantic-capable passage making at 12 knots. The vessel features a groundbreaking three-level 145 sqm Owner's Stateroom with private forward pool, opening gull-wing balconies, and a cavernous lateral beach club. Currently registered under Malta Commercial flag with flawless charter track record across Mykonos and the Cyclades.",
    technicalSpecs: {
      lengthM: 40.8,
      lengthFt: 133.8,
      beamM: 8.8,
      beamFt: 28.8,
      draftM: 2.3,
      draftFt: 7.5,
      grossTonnage: 485,
      hullMaterial: "Marine Grade Aluminium (Sealium)",
      superstructureMaterial: "Aluminium 5083",
      deckMaterial: "Solid Teak 12mm",
      fuelCapacityL: 41000,
      waterCapacityL: 8000,
      rangeNm: 2000,
      cruisingSpeedKnots: 18,
      maxSpeedKnots: 22,
      stabilizers: "CMC Marine Stabilis Electra Electric Zero Speed & Underway Fins",
      navalArchitect: "Sanlorenzo Technical Department",
      exteriorDesigner: "Zuccon International Project",
      interiorDesigner: "Piero Lissoni & Partners"
    },
    engineSpecs: {
      manufacturer: "MTU Friedrichshafen",
      model: "2x MTU 16V 2000 M96L (1,939 kW / 2,600 hp each)",
      totalPowerHp: 5200,
      quantity: 2,
      engineHours: 980,
      generators: "2x Zenoro 80 kW Soundproof Marine Generators",
      propulsionType: "Straight Shaft Line with 5-Blade Skewed Propellers"
    },
    classification: {
      society: "RINA",
      notation: "RINA C ✠ HULL ● MACH, YCH (Unrestricted Navigation), Green Star Clean Power",
      flagState: "Malta (Valletta)",
      commercialStatus: "Malta Commercial Registry (EU Commercial Charter Compliant)",
      vatStatus: "EU VAT Not Paid",
      eMitrooRegistered: true
    },
    deckPlans: [
      {
        deckName: "Tri-Deck Owner's Penthouse Level",
        description: "Unique multi-level master apartment extending from main deck forward up into private mezzanine lounge and forward bow sunken pool.",
        features: ["Private Forward Plunge Pool", "Lissoni Bespoke Dressing Room", "Private Mezzanine Office", "Panoramic 180° Windows"]
      },
      {
        deckName: "Flybridge & Solarium",
        description: "Open-air social heart with dining table, sun loungers, sliding hardtop roof, and outdoor bar station.",
        features: ["Retractable Hardtop Sunroof", "Outdoor Wet Bar & Grill", "Sun Lounge Furniture", "Exterior Sound System"]
      },
      {
        deckName: "Main Deck",
        description: "Open-concept main salon with full-height sliding glass doors connecting seamlessly to the aft cockpit lounge.",
        features: ["Salone Lissoni Furnishings", "Formal Dining for 10", "Aft Cockpit Conversation Area", "Professional Galley"]
      },
      {
        deckName: "Lower Deck & Beach Club",
        description: "4 luxury guest staterooms (all double suites, convertible). Lateral opening hull doors expand the 102 sqm beach club.",
        features: ["102 sqm Fold-Out Beach Club", "4 Guest Staterooms with Ensuites", "Forward Crew Quarters for 7"]
      }
    ],
    amenities: [
      "CMC Marine Electric Zero-Speed Stabilizers",
      "Fold-Out 102 sqm Lateral Beach Club",
      "Private Owner's Foredeck Spa Pool",
      "Lissoni Bespoke Italian Furnishings",
      "Starlink Maritime Satellite Comm",
      "Bowers & Wilkins High-End Sound System throughout",
      "Hydraulic Tender Garage for 6m Tender"
    ],
    tendersToys: [
      "Williams DieselJet 565 with Yanmar 150hp",
      "2x Sea-Doo Spark Trixx",
      "2x Seabob F5",
      "1x Awake RÄVIK Electric Jetboard",
      "2x Stand Up Paddleboards",
      "Snorkeling & Fishing Gear"
    ],
    opexProforma: {
      crewSalaries: 620000,
      berthMooring: 160000,
      insuranceHullPI: 115000,
      maintenanceYard: 345000,
      managementCompliance: 110000,
      totalAnnualOpex: 1350000,
      summerWeeklyCharterRate: 185000,
      projectedCharterWeeks: 8,
      estimatedGrossCharterRevenue: 1480000,
      caCommissionAndOpsPercent: 15,
      netCharterIncome: 1258000,
      netAnnualCostOfOwnership: 92000
    },
    centralBroker: {
      name: "Konstantinos Vernicos",
      title: "Executive Vice President S&P",
      phone: "+30 210 980 4425",
      email: "sales@yachtdesk.com",
      office: "YachtDesk Athens Alimos",
      verified: true
    },
    featured: true,
    badgeHighlight: "Malta Commercial • All-Aluminium"
  },
  {
    id: "ionian-breeze-34m",
    slug: "ionian-breeze-34m",
    name: "M/Y IONIAN BREEZE",
    builder: "Sunseeker",
    model: "Sunseeker 116 Yacht",
    category: "motor",
    yearBuilt: 2020,
    yearRefit: 2024,
    askingPriceEur: 11500000,
    location: "Gouvia Marina, Corfu, Greece",
    homePort: "Gouvia Marina, Corfu",
    cabins: 5,
    guests: 10,
    crew: 6,
    heroImage: "/images/olympic-breeze.jpg",
    gallery: [
      "/images/olympic-breeze.jpg",
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80"
    ],
    shortDescription: "Immaculate Sunseeker 116 with Greek commercial license on e-Mitroo registry. EU VAT Paid, Sleipner zero-speed fin stabilization, and foredeck club lounge.",
    fullOverview: "M/Y IONIAN BREEZE is the definitive British-engineered raised pilothouse superyacht customized for Greek island hopping and high-yield charter operations. Holding a full Greek commercial yachting license under Greek Law 4926/2022 and registered on the e-Mitroo commercial ship register, she allows seamless commercial chartering in Greek waters with 12% reduced charter VAT. Benefiting from a €650,000 refit in early 2024 including complete interior soft-furnishing upgrade by Pierre-Yves Rochon, new generator sets, ceramic hull coating, and modernized foredeck entertainment area with dual Jacuzzi.",
    technicalSpecs: {
      lengthM: 34.5,
      lengthFt: 113.2,
      beamM: 7.33,
      beamFt: 24.1,
      draftM: 2.38,
      draftFt: 7.8,
      grossTonnage: 245,
      hullMaterial: "Advanced GRP Composite (Vinyl Ester Resin)",
      superstructureMaterial: "GRP Sandwich Infusion",
      deckMaterial: "Teak Decking",
      fuelCapacityL: 14450,
      waterCapacityL: 4000,
      rangeNm: 1500,
      cruisingSpeedKnots: 19,
      maxSpeedKnots: 26,
      stabilizers: "Sleipner SPS92 Fin Stabilizers with Zero Speed vector stabilization",
      navalArchitect: "Sunseeker International",
      exteriorDesigner: "Sunseeker International",
      interiorDesigner: "Sunseeker Bespoke & Pierre-Yves Rochon"
    },
    engineSpecs: {
      manufacturer: "MTU Friedrichshafen",
      model: "2x MTU 16V 2000 M96L (2,640 hp each)",
      totalPowerHp: 5280,
      quantity: 2,
      engineHours: 1150,
      generators: "2x Kohler 55 kW 400V 50Hz (Overhauled 2024)",
      propulsionType: "Twin Shaft Direct Propulsion with Manganese Bronze Propellers"
    },
    classification: {
      society: "RINA",
      notation: "RINA Commercial Yachting Certification, MCA Workboat Code (MGN 280)",
      flagState: "Greece (Piraeus)",
      commercialStatus: "Greek Commercial Ship Registry (Law 4926/2022 Certified)",
      vatStatus: "EU VAT Paid",
      eMitrooRegistered: true
    },
    deckPlans: [
      {
        deckName: "Flybridge & Hardtop Sun Lounge",
        description: "Expansive flybridge with retractable sun canopy, dining table for 10, barbecue grill station, and wet bar.",
        features: ["Retractable Carbon Roof", "Sunseeker Wet Bar & Grill", "Dining for 10", "Aft Sunbeds"]
      },
      {
        deckName: "Foredeck Club Lounge",
        description: "Private foredeck club with Jacuzzi spa, dual sunpads, and cocktail lounge facing forward.",
        features: ["Foredeck Jacuzzi", "Dedicated Sound System", "Integrated Sun Loungers", "Direct Crew Service Access"]
      },
      {
        deckName: "Main Deck",
        description: "Full-beam Master Suite on main deck forward with king-size berth, vanity, and ensuite bathroom. Main salon with floor-to-ceiling windows and fold-down hydraulic balcony.",
        features: ["Main Deck Master Suite", "Hydraulic Fold-Down Balcony", "Salon Dining Suite", "Commercial Galley"]
      },
      {
        deckName: "Lower Deck",
        description: "4 en-suite guest cabins (2 VIP staterooms, 2 twin convertibles). Separate crew quarters forward for 6 crew members.",
        features: ["2 VIP Suites", "2 Twin Convertibles", "Transom Tender Garage", "Crew Mess & Accommodations"]
      }
    ],
    amenities: [
      "Greek Commercial License (e-Mitroo Ready)",
      "Sleipner Zero Speed & Underway Fin Stabilizers",
      "Foredeck Jacuzzi & Club Lounge",
      "Hydraulic Drop-Down Salon Balcony",
      "Starlink Maritime Global Internet",
      "Hydraulic Submersible Swim Platform",
      "Sonos Multi-Zone Sound Architecture"
    ],
    tendersToys: [
      "Williams SportJet 460 Jet Tender",
      "2x Sea-Doo Spark 90hp",
      "2x Seabob F5",
      "Water skis & Donut towables",
      "Snorkeling sets and spearfishing kit"
    ],
    opexProforma: {
      crewSalaries: 460000,
      berthMooring: 95000,
      insuranceHullPI: 85000,
      maintenanceYard: 210000,
      managementCompliance: 70000,
      totalAnnualOpex: 920000,
      summerWeeklyCharterRate: 125000,
      projectedCharterWeeks: 8,
      estimatedGrossCharterRevenue: 1000000,
      caCommissionAndOpsPercent: 15,
      netCharterIncome: 850000,
      netAnnualCostOfOwnership: 70000
    },
    centralBroker: {
      name: "Eleni Papandreou",
      title: "Ionian Fleet Director & S&P Advisor",
      phone: "+30 2661 098 200",
      email: "sales@yachtdesk.com",
      office: "YachtDesk Corfu Gouvia & Athens",
      verified: true
    },
    featured: false,
    badgeHighlight: "Greek Commercial Registry • e-Mitroo"
  },
  {
    id: "poseidon-spirit-45m",
    slug: "poseidon-spirit-45m",
    name: "S/Y POSEIDON SPIRIT",
    builder: "Perini Navi",
    model: "45m Performance Cruising Sloop",
    category: "sailing",
    yearBuilt: 2018,
    yearRefit: 2023,
    askingPriceEur: 19000000,
    location: "Port Hercule, Monaco / Piraeus, Greece",
    homePort: "Piraeus, Greece",
    cabins: 4,
    guests: 10,
    crew: 7,
    heroImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
      "/images/poseidon-royal.jpg",
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1600&q=80"
    ],
    shortDescription: "Legendary 45-meter Perini Navi sailing yacht with Ron Holland naval architecture. Carbon Southern Spars rig, swing keel, and Christian Liaigre interior.",
    fullOverview: "S/Y POSEIDON SPIRIT is an extraordinary world-cruising performance sloop constructed by the iconic Italian shipyard Perini Navi in Viareggio. Blending timeless seafaring romance with cutting-edge composite sailing engineering, she features a lifting swing keel (3.9m draft for shallow Cycladic anchorages, extending to 8.75m for exceptional upwind sailing stability), a carbon fiber Southern Spars rig, and North Sails 3Di sail wardrobe overhauled in 2023. Her Christian Liaigre minimalist interior exudes warmth, luxury, and tranquility with brushed teak, saddle leather, and honed travertine marble. Registered under Isle of Man commercial registry and full EU VAT Paid status.",
    technicalSpecs: {
      lengthM: 45.0,
      lengthFt: 147.6,
      beamM: 9.7,
      beamFt: 31.8,
      draftM: 3.9,
      draftFt: 12.8,
      grossTonnage: 315,
      hullMaterial: "Special Naval Grade High Tensile Steel",
      superstructureMaterial: "Marine Aluminium Alloy (AlMg 4.5)",
      deckMaterial: "Burma Teak (Continuous Lengths)",
      fuelCapacityL: 31200,
      waterCapacityL: 8200,
      rangeNm: 3800,
      cruisingSpeedKnots: 11,
      maxSpeedKnots: 14.5,
      stabilizers: "Lifting Centerboard Dynamic Ballast & Gyroscopic Stabilization",
      navalArchitect: "Ron Holland Design & Perini Navi",
      exteriorDesigner: "Perini Navi",
      interiorDesigner: "Christian Liaigre"
    },
    engineSpecs: {
      manufacturer: "Caterpillar",
      model: "1x Caterpillar C32 Acert Diesel (1,044 kW / 1,400 hp)",
      totalPowerHp: 1400,
      quantity: 1,
      engineHours: 1950,
      generators: "2x Northern Lights 65 kW Marine Generators",
      propulsionType: "Hundested Controllable Pitch Propeller (CPP) 4-Blade"
    },
    classification: {
      society: "ABS (American Bureau of Shipping)",
      notation: "ABS ✠ A1 Commercial Yachting Service, ✠ AMS, MCA LY3 Large Yacht Code Compliant",
      flagState: "Isle of Man",
      commercialStatus: "Commercial (MCA LY3 Certified)",
      vatStatus: "EU VAT Paid",
      eMitrooRegistered: true
    },
    deckPlans: [
      {
        deckName: "Perini Sunken Cockpit & Flying Bridge",
        description: "Signature Perini Navi sheltered cockpit with electric glass windscreens and dual helm station flying bridge overhead.",
        features: ["Protected Cockpit Dining for 12", "Push-Button Winch Consoles", "Flying Bridge Sun Lounge", "Helm Sailing Station"]
      },
      {
        deckName: "Main Deck Salon",
        description: "Expansive salon designed by Christian Liaigre with library lounge, formal dining table, and direct cockpit flow.",
        features: ["Christian Liaigre Bespoke Furniture", "Natural Brushed Teak Finishing", "Panoramic Hull Ports", "Navigation Desk"]
      },
      {
        deckName: "Lower Deck Owner & Guest Suites",
        description: "Full-beam Owner Stateroom with private study, walk-in dressing room, and luxury bathroom. 3 guest suites plus convertible gym cabin.",
        features: ["Full-Beam Master Stateroom", "Private Owner Office", "3 Guest Staterooms with Ensuites", "Air-Conditioned Gym Space"]
      },
      {
        deckName: "Crew & Service Quarters",
        description: "Forward self-contained crew area with 4 cabins for 7 crew, mess room, and direct foredeck hatch access.",
        features: ["Crew Mess & Lounge", "Commercial Galley", "Laundry & Utility Store", "Bow Thruster Compartment"]
      }
    ],
    amenities: [
      "Carbon Southern Spars Mast & North 3Di Sails",
      "Variable Swing Keel (3.9m to 8.75m Draft)",
      "Signature Perini Sunken Cockpit Al Fresco Dining",
      "Christian Liaigre Designer Interior",
      "Fold-Out Teak Transom Swim Platform",
      "Starlink Global Maritime Satcom",
      "Onboard Gym with Peloton & Free Weights"
    ],
    tendersToys: [
      "Castoldi Jet Tender 19 (180hp Yanmar Diesel)",
      "Zodiac Milpro 4.2m Crew & Utility Tender",
      "2x Tiwal 3.2 Inflatable Performance Sailing Dinghies",
      "2x Seabob F5SR",
      "4x Stand Up Paddleboards",
      "Complete Snorkel & Dive Compressor"
    ],
    opexProforma: {
      crewSalaries: 590000,
      berthMooring: 140000,
      insuranceHullPI: 120000,
      maintenanceYard: 330000,
      managementCompliance: 100000,
      totalAnnualOpex: 1280000,
      summerWeeklyCharterRate: 150000,
      projectedCharterWeeks: 8,
      estimatedGrossCharterRevenue: 1200000,
      caCommissionAndOpsPercent: 15,
      netCharterIncome: 1020000,
      netAnnualCostOfOwnership: 260000
    },
    centralBroker: {
      name: "Alexander Vance",
      title: "Superyacht S&P Director",
      phone: "+377 99 99 88 00",
      email: "sales@yachtdesk.com",
      office: "YachtDesk Monaco & Athens",
      verified: true
    },
    featured: false,
    badgeHighlight: "EU VAT Paid • Perini Navi Heritage"
  },
  {
    id: "mediterranean-explorer-42m",
    slug: "mediterranean-explorer-42m",
    name: "M/Y MEDITERRANEAN EXPLORER",
    builder: "Cantiere delle Marche (CdM)",
    model: "CdM Darwin 138 Expedition Yacht",
    category: "explorer",
    yearBuilt: 2023,
    askingPriceEur: 18200000,
    location: "Marina Zea, Piraeus, Greece",
    homePort: "Marina Zea, Piraeus",
    cabins: 5,
    guests: 12,
    crew: 8,
    heroImage: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1600&q=80",
      "/images/aegean-odyssey.jpg",
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=1600&q=80"
    ],
    shortDescription: "True transoceanic 5,000nm range steel expedition yacht. Built by Cantiere delle Marche with Hydro Tec architecture and Nauta Design interior.",
    fullOverview: "M/Y MEDITERRANEAN EXPLORER is a genuine heavy-displacement steel explorer yacht delivered in 2023 by the acclaimed Italian shipyard Cantiere delle Marche. Engineered to navigate anywhere on earth in total self-sufficiency, she carries 54,000 liters of fuel providing a 5,000nm transatlantic range at 10 knots. Her naval architecture by Sergio Cutolo / Hydro Tec features exceptional sea-keeping capabilities in heavy Mediterranean Meltemi conditions, complimented by electric zero-speed stabilizers with active roll reduction. Featuring interior architecture by Nauta Design emphasizing clean lines, warm oak, and connection to the sea. Accommodates two large expedition tenders on her upper boat deck.",
    technicalSpecs: {
      lengthM: 42.0,
      lengthFt: 137.8,
      beamM: 8.6,
      beamFt: 28.2,
      draftM: 2.65,
      draftFt: 8.7,
      grossTonnage: 440,
      hullMaterial: "Heavy-Gauge Grade A High Tensile Steel (12mm plate)",
      superstructureMaterial: "Marine Grade Light Aluminium Alloy (5083)",
      deckMaterial: "Full Teak Decking (16mm)",
      fuelCapacityL: 54000,
      waterCapacityL: 10500,
      rangeNm: 5000,
      cruisingSpeedKnots: 12,
      maxSpeedKnots: 14.2,
      stabilizers: "Rodriquez Marine Zero-Speed Electric Fins with Active Roll Reduction",
      navalArchitect: "Hydro Tec / Sergio Cutolo",
      exteriorDesigner: "Hydro Tec",
      interiorDesigner: "Nauta Design"
    },
    engineSpecs: {
      manufacturer: "Caterpillar",
      model: "2x Caterpillar C32 Acert (970 kW / 1,300 hp each)",
      totalPowerHp: 2600,
      quantity: 2,
      engineHours: 840,
      generators: "2x Kohler 70 kW Heavy Duty Continuous Rating Generators",
      propulsionType: "Twin Shaft Lines with 4-Blade Detachable Propellers"
    },
    classification: {
      society: "Lloyd's Register",
      notation: "LR ✠ 100A1 SSC Yacht Mono G6, ✠ LMC, UMS, Unrestricted Navigation",
      flagState: "Madeira (Portugal / EU)",
      commercialStatus: "EU Commercial Register Compliant",
      vatStatus: "EU VAT Not Paid",
      eMitrooRegistered: true
    },
    deckPlans: [
      {
        deckName: "Sundeck Observation Lounge",
        description: "Forward observation seating for navigation watches, center wet bar, and aft 6-person Jacuzzi with 360° panoramic horizon views.",
        features: ["Observation Helm", "Heated Spa Jacuzzi", "Barbecue & Bar Island", "Shaded Hardtop Dining"]
      },
      {
        deckName: "Upper Boat Deck & Skylounge",
        description: "Spacious skylounge cinema opening onto aft boat deck capable of stowing a 6.5m expedition tender and jet skis.",
        features: ["Boat Deck Heavy-Duty Crane (2.5T)", "Skylounge Media Room", "Captain's Cabin", "Expedition Chart Desk"]
      },
      {
        deckName: "Main Deck",
        description: "Full-beam Master Suite forward with private office, his-and-hers bathrooms, and walk-in wardrobe. Main salon and formal dining area.",
        features: ["Full-Beam Master Stateroom", "Panoramic Forward Office", "Formal Dining for 10", "Main Salon with Floor-to-Ceiling Windows"]
      },
      {
        deckName: "Lower Deck Accommodation & Lazarette",
        description: "4 spacious guest suites (2 VIP doubles, 2 twin suites with Pullman berths). Large aft lazarette with dive room and workshop.",
        features: ["2 VIP Staterooms", "2 Twin Suites with Pullmans", "Full Workshop & Dive Locker", "Crew Quarters for 8"]
      }
    ],
    amenities: [
      "5,000nm Transoceanic Range (54,000L Fuel)",
      "Zero-Speed Rodriquez Electric Stabilizers",
      "Upper Boat Deck Heavy-Duty Crane (2.5t Capacity)",
      "Sundeck Jacuzzi & Panoramic Observation Lounge",
      "Full Commercial Cold Room & Dry Provision Stores (60 Days Autonomy)",
      "Dual Watermakers (12,000L/day capacity)",
      "Starlink Maritime Global Terminals"
    ],
    tendersToys: [
      "6.5m Highfield Patrol 660 Aluminum Rib with 200hp Yamaha",
      "Williams SportJet 395 Jet Tender",
      "2x Yamaha FX Cruiser SVHO WaveRunners",
      "2x Seabob F5S",
      "Full Nitrox Scuba Diving station with Bauer compressor",
      "Deep-sea big-game fishing equipment"
    ],
    opexProforma: {
      crewSalaries: 540000,
      berthMooring: 135000,
      insuranceHullPI: 105000,
      maintenanceYard: 290000,
      managementCompliance: 110000,
      totalAnnualOpex: 1180000,
      summerWeeklyCharterRate: 175000,
      projectedCharterWeeks: 8,
      estimatedGrossCharterRevenue: 1400000,
      caCommissionAndOpsPercent: 15,
      netCharterIncome: 1190000,
      netAnnualCostOfOwnership: -10000
    },
    centralBroker: {
      name: "Marcus Lindqvist",
      title: "Expedition & Commercial S&P Specialist",
      phone: "+30 210 980 4430",
      email: "sales@yachtdesk.com",
      office: "YachtDesk Athens Zea & Oslo",
      verified: true
    },
    featured: true,
    badgeHighlight: "5,000nm Range • Lloyd's Class"
  },
  {
    id: "sunreef-80-eco-24m",
    slug: "sunreef-80-eco-24m",
    name: "S/Y SUNREEF 80 ECO",
    builder: "Sunreef Yachts",
    model: "Sunreef 80 Eco Solar-Electric Catamaran",
    category: "catamaran",
    yearBuilt: 2024,
    askingPriceEur: 6900000,
    location: "Marina Rhodes / Athens, Greece",
    homePort: "Rhodes Mandraki Port",
    cabins: 4,
    guests: 8,
    crew: 4,
    heroImage: "/images/olympic-breeze.jpg",
    gallery: [
      "/images/olympic-breeze.jpg",
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
    ],
    shortDescription: "Ultra-luxury solar-electric sailing catamaran delivered in 2024. Full EU VAT Paid, 36kWp integrated solar skin, silent overnight electric cruising, and 340 sqm living space.",
    fullOverview: "S/Y SUNREEF 80 ECO is the world's most advanced eco-responsible luxury sailing multihull, representing the future of sustainable yacht ownership. Delivered brand new in 2024 and registered EU VAT Paid, she integrates Sunreef's proprietary solar skin—producing up to 36 kWp from solar cells seamlessly integrated into the composite hull sides, superstructure, and carbon bimini. Her twin 180 kW electric propulsion motors are powered by an ultralight 160 kWh lithium-ion battery bank, granting silent, zero-emissions overnight anchoring without running generators. Massive 11.5-meter beam yields 340 sqm of interior and exterior deck spaces matching 45-meter monohulls.",
    technicalSpecs: {
      lengthM: 23.8,
      lengthFt: 78.1,
      beamM: 11.5,
      beamFt: 37.7,
      draftM: 1.8,
      draftFt: 5.9,
      grossTonnage: 170,
      hullMaterial: "Advanced Composite Infusion with Basalt & Flax Fiber",
      superstructureMaterial: "Composite Carbon Structural Reinforcements",
      deckMaterial: "Sustainably Harvested Teak & Composite Decking",
      fuelCapacityL: 4000,
      waterCapacityL: 2000,
      rangeNm: 3500,
      cruisingSpeedKnots: 9,
      maxSpeedKnots: 12.5,
      stabilizers: "Twin Wave-Piercing Catamaran Hulls with Ultra-High Form Stability",
      navalArchitect: "Sunreef Yachts Engineering",
      exteriorDesigner: "Sunreef Yachts Design Studio",
      interiorDesigner: "Sunreef Eco Bespoke Interior Team"
    },
    engineSpecs: {
      manufacturer: "Sunreef Electric / Danfoss",
      model: "2x 180 kW High-Torque Electric Propulsion Motors",
      totalPowerHp: 490,
      quantity: 2,
      engineHours: 310,
      generators: "2x 35 kW Whisper-Power DC Eco Generators (Backup/Range Extenders)",
      propulsionType: "Electric Shaft Drives with Folding High-Efficiency Gori Propellers"
    },
    classification: {
      society: "Bureau Veritas (BV)",
      notation: "BV ✠ Hull ● Mach, Yacht-Motor / Sail, Unrestricted Navigation, Clean Power",
      flagState: "Malta / Poland",
      commercialStatus: "Commercial Charter Certified (Greek e-Mitroo Approved)",
      vatStatus: "EU VAT Paid",
      eMitrooRegistered: true
    },
    deckPlans: [
      {
        deckName: "Flybridge & Solar Hardtop",
        description: "Spacious 54 sqm flybridge with helm stations, 8-person dining table, sunbathing terrace, and Jacuzzi spa.",
        features: ["Integrated 36kWp Solar Skin", "Flybridge Jacuzzi", "Al Fresco Dining Table", "Dual Helm Consoles"]
      },
      {
        deckName: "Main Deck Saloon & Cockpit",
        description: "Expansive 360° panoramic saloon seamlessly connected to the aft cockpit dining terrace and forward sunken lounge.",
        features: ["Flush Indoor-Outdoor Living", "Bespoke Eco-Linen Finishing", "Sunken Bow Terrace", "Hydraulic Tender Lift Platform"]
      },
      {
        deckName: "Port Hull Owner Stateroom & VIP",
        description: "Master Suite with king bed, walk-in dressing room, and luxury marble ensuite head. Additional VIP stateroom aft.",
        features: ["Master Stateroom Suite", "King Size Berth with Sea Views", "VIP Double Cabin", "Ensuite Rain Showers"]
      },
      {
        deckName: "Starboard Hull Guest Cabins & Crew",
        description: "Two luxury double guest staterooms plus independent crew quarters with dedicated galley access.",
        features: ["2 Queen Guest Suites", "Crew Mess & Accommodations for 4", "Technical Battery Compartment"]
      }
    ],
    amenities: [
      "Proprietary 36 kWp Integrated Solar Skin",
      "160 kWh Ultralight Marine Lithium Battery Bank",
      "Silent Night Generator-Free Air Conditioning",
      "Flybridge Spa Pool with Solar Heating",
      "Hydraulic Stern Platform & Tender Launch",
      "Ultra-Low Operating Costs (~60% less than equivalent monohull)",
      "Starlink Global Satellite Internet"
    ],
    tendersToys: [
      "Williams SportJet 395 Tender",
      "2x Fliteboard Series 3 e-Foils",
      "2x Inflatable Kayaks",
      "4x Stand-up Paddleboards",
      "Snorkeling and free-diving equipment"
    ],
    opexProforma: {
      crewSalaries: 210000,
      berthMooring: 55000,
      insuranceHullPI: 45000,
      maintenanceYard: 75000,
      managementCompliance: 35000,
      totalAnnualOpex: 420000,
      summerWeeklyCharterRate: 68000,
      projectedCharterWeeks: 8,
      estimatedGrossCharterRevenue: 544000,
      caCommissionAndOpsPercent: 15,
      netCharterIncome: 462400,
      netAnnualCostOfOwnership: -42400
    },
    centralBroker: {
      name: "Sofia Karagianni",
      title: "Sustainable Yachting & Multihull S&P",
      phone: "+30 210 980 4450",
      email: "sales@yachtdesk.com",
      office: "YachtDesk Athens & Rhodes",
      verified: true
    },
    featured: false,
    badgeHighlight: "EU VAT Paid • Solar-Electric 2024"
  }
];

export function getSaleYachtBySlug(slug: string): SaleYacht | undefined {
  return SALES_FLEET.find((y) => y.slug === slug || y.id === slug);
}
