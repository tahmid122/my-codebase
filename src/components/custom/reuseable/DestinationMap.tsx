/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useState, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface TRegion {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
}

interface TPackage {
  id: number;
  title: string;
  location: string;
  type: string;
  img: string;
  duration: string;
  price: string;
}

interface TTypeInfo {
  emoji: string;
  label: string;
  color: string;
}

// ─── World map regions with pin coordinates (as % of SVG viewBox 0 0 1000 500) ───
const REGIONS: TRegion[] = [
  {
    id: "north-america",
    name: "North America",
    x: 165,
    y: 160,
    color: "#e53935",
  },
  {
    id: "south-america",
    name: "South America",
    x: 255,
    y: 310,
    color: "#e53935",
  },
  { id: "europe", name: "Europe", x: 480, y: 130, color: "#e53935" },
  { id: "africa", name: "Africa", x: 490, y: 270, color: "#e53935" },
  { id: "middle-east", name: "Middle East", x: 560, y: 195, color: "#e53935" },
  { id: "russia", name: "Russia", x: 630, y: 100, color: "#e53935" },
  { id: "east-asia", name: "East Asia", x: 730, y: 155, color: "#e53935" },
  {
    id: "southeast-asia",
    name: "Southeast Asia",
    x: 750,
    y: 250,
    color: "#e53935",
  },
  { id: "south-asia", name: "South Asia", x: 640, y: 215, color: "#e53935" },
  { id: "oceania", name: "Oceania", x: 820, y: 360, color: "#e53935" },
  { id: "canada", name: "Canada", x: 185, y: 115, color: "#e53935" },
];

// ─── Trip packages per region ───
const PACKAGES: Record<string, TPackage[]> = {
  "north-america": [
    {
      id: 1,
      title: "Pacific Coast Highway",
      location: "United States",
      type: "road-trip",
      img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
      duration: "10 days",
      price: "$2,400",
    },
    {
      id: 2,
      title: "New York City Break",
      location: "United States",
      type: "city",
      img: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=400&q=80",
      duration: "5 days",
      price: "$1,800",
    },
    {
      id: 3,
      title: "Grand Canyon Trek",
      location: "United States",
      type: "hike",
      img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80",
      duration: "4 days",
      price: "$1,200",
    },
    {
      id: 4,
      title: "Yellowstone Safari",
      location: "United States",
      type: "adventure",
      img: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&q=80",
      duration: "6 days",
      price: "$1,950",
    },
  ],
  "south-america": [
    {
      id: 1,
      title: "Machu Picchu Expedition",
      location: "Peru",
      type: "hike",
      img: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400&q=80",
      duration: "8 days",
      price: "$2,100",
    },
    {
      id: 2,
      title: "Amazon River Journey",
      location: "Brazil",
      type: "adventure",
      img: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=400&q=80",
      duration: "7 days",
      price: "$1,850",
    },
    {
      id: 3,
      title: "Patagonia Wilderness",
      location: "Argentina",
      type: "hike",
      img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
      duration: "12 days",
      price: "$3,200",
    },
    {
      id: 4,
      title: "Rio Carnival Experience",
      location: "Brazil",
      type: "city",
      img: "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?w=400&q=80",
      duration: "5 days",
      price: "$2,400",
    },
  ],
  europe: [
    {
      id: 1,
      title: "Romantic Getaway in Paris",
      location: "France",
      type: "city",
      img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80",
      duration: "6 days",
      price: "$2,800",
    },
    {
      id: 2,
      title: "Tuscany Wine & Culture",
      location: "Italy",
      type: "food",
      img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80",
      duration: "8 days",
      price: "$3,100",
    },
    {
      id: 3,
      title: "Norwegian Fjords Cruise",
      location: "Norway",
      type: "adventure",
      img: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?w=400&q=80",
      duration: "10 days",
      price: "$4,200",
    },
    {
      id: 4,
      title: "Greek Islands Sailing",
      location: "Greece",
      type: "adventure",
      img: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=400&q=80",
      duration: "9 days",
      price: "$3,500",
    },
  ],
  africa: [
    {
      id: 1,
      title: "Serengeti Safari",
      location: "Tanzania",
      type: "adventure",
      img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=80",
      duration: "9 days",
      price: "$4,500",
    },
    {
      id: 2,
      title: "Morocco Desert Tour",
      location: "Morocco",
      type: "adventure",
      img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80",
      duration: "7 days",
      price: "$2,200",
    },
    {
      id: 3,
      title: "Cape Town Explorer",
      location: "South Africa",
      type: "city",
      img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&q=80",
      duration: "6 days",
      price: "$2,600",
    },
    {
      id: 4,
      title: "Nile River Cruise",
      location: "Egypt",
      type: "adventure",
      img: "https://images.unsplash.com/photo-1539768942893-daf853b1a18b?w=400&q=80",
      duration: "8 days",
      price: "$3,100",
    },
  ],
  "middle-east": [
    {
      id: 1,
      title: "Dubai Luxury Escape",
      location: "UAE",
      type: "city",
      img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80",
      duration: "5 days",
      price: "$3,400",
    },
    {
      id: 2,
      title: "Jordan Desert Trek",
      location: "Jordan",
      type: "hike",
      img: "https://images.unsplash.com/photo-1548786811-96df34b1f9a4?w=400&q=80",
      duration: "6 days",
      price: "$2,100",
    },
    {
      id: 3,
      title: "Istanbul Discovery",
      location: "Turkey",
      type: "city",
      img: "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=400&q=80",
      duration: "7 days",
      price: "$2,400",
    },
    {
      id: 4,
      title: "Dead Sea & Petra",
      location: "Jordan",
      type: "adventure",
      img: "https://images.unsplash.com/photo-1590664863645-8ad9d65e3d9e?w=400&q=80",
      duration: "5 days",
      price: "$1,900",
    },
  ],
  russia: [
    {
      id: 1,
      title: "Trans-Siberian Railway",
      location: "Russia",
      type: "adventure",
      img: "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=400&q=80",
      duration: "14 days",
      price: "$3,800",
    },
    {
      id: 2,
      title: "Moscow & St. Petersburg",
      location: "Russia",
      type: "city",
      img: "https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=400&q=80",
      duration: "8 days",
      price: "$2,700",
    },
    {
      id: 3,
      title: "Lake Baikal Adventure",
      location: "Russia",
      type: "hike",
      img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
      duration: "6 days",
      price: "$2,200",
    },
    {
      id: 4,
      title: "Kamchatka Volcanoes",
      location: "Russia",
      type: "adventure",
      img: "https://images.unsplash.com/photo-1523799283264-18b3c4571978?w=400&q=80",
      duration: "10 days",
      price: "$4,100",
    },
  ],
  "east-asia": [
    {
      id: 1,
      title: "Tokyo City Immersion",
      location: "Japan",
      type: "city",
      img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80",
      duration: "7 days",
      price: "$3,200",
    },
    {
      id: 2,
      title: "Great Wall Expedition",
      location: "China",
      type: "hike",
      img: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&q=80",
      duration: "6 days",
      price: "$2,400",
    },
    {
      id: 3,
      title: "Seoul K-Culture Tour",
      location: "South Korea",
      type: "city",
      img: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&q=80",
      duration: "6 days",
      price: "$2,100",
    },
    {
      id: 4,
      title: "Kyoto Temple Trail",
      location: "Japan",
      type: "hike",
      img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80",
      duration: "5 days",
      price: "$2,700",
    },
  ],
  "southeast-asia": [
    {
      id: 1,
      title: "Bali Spiritual Journey",
      location: "Indonesia",
      type: "adventure",
      img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80",
      duration: "8 days",
      price: "$1,800",
    },
    {
      id: 2,
      title: "Angkor Wat Discovery",
      location: "Cambodia",
      type: "hike",
      img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=80",
      duration: "5 days",
      price: "$1,500",
    },
    {
      id: 3,
      title: "Halong Bay Cruise",
      location: "Vietnam",
      type: "adventure",
      img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80",
      duration: "4 days",
      price: "$1,400",
    },
    {
      id: 4,
      title: "Thai Islands Hopping",
      location: "Thailand",
      type: "adventure",
      img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&q=80",
      duration: "9 days",
      price: "$2,100",
    },
  ],
  "south-asia": [
    {
      id: 1,
      title: "Taj Mahal & Golden Triangle",
      location: "India",
      type: "city",
      img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&q=80",
      duration: "8 days",
      price: "$2,200",
    },
    {
      id: 2,
      title: "Nepal Everest Base Camp",
      location: "Nepal",
      type: "hike",
      img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
      duration: "14 days",
      price: "$3,800",
    },
    {
      id: 3,
      title: "Kerala Backwaters",
      location: "India",
      type: "food",
      img: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=400&q=80",
      duration: "6 days",
      price: "$1,700",
    },
    {
      id: 4,
      title: "Sri Lanka Highlights",
      location: "Sri Lanka",
      type: "adventure",
      img: "https://images.unsplash.com/photo-1588598198321-9735fd5c6065?w=400&q=80",
      duration: "9 days",
      price: "$2,400",
    },
  ],
  oceania: [
    {
      id: 1,
      title: "Great Barrier Reef Dive",
      location: "Australia",
      type: "adventure",
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80",
      duration: "7 days",
      price: "$3,500",
    },
    {
      id: 2,
      title: "New Zealand South Island",
      location: "New Zealand",
      type: "hike",
      img: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?w=400&q=80",
      duration: "10 days",
      price: "$3,800",
    },
    {
      id: 3,
      title: "Sydney & Outback",
      location: "Australia",
      type: "adventure",
      img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
      duration: "8 days",
      price: "$3,200",
    },
    {
      id: 4,
      title: "Fiji Island Escape",
      location: "Fiji",
      type: "adventure",
      img: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=400&q=80",
      duration: "6 days",
      price: "$2,600",
    },
  ],
  canada: [
    {
      id: 1,
      title: "Banff & Rockies Road Trip",
      location: "Canada",
      type: "hike",
      img: "https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=400&q=80",
      duration: "9 days",
      price: "$2,700",
    },
    {
      id: 2,
      title: "Quebec Winter Festival",
      location: "Canada",
      type: "adventure",
      img: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&q=80",
      duration: "5 days",
      price: "$1,900",
    },
    {
      id: 3,
      title: "Vancouver Island Nature",
      location: "Canada",
      type: "hike",
      img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80",
      duration: "7 days",
      price: "$2,200",
    },
    {
      id: 4,
      title: "Northern Lights Chase",
      location: "Canada",
      type: "adventure",
      img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80",
      duration: "5 days",
      price: "$2,800",
    },
  ],
};

const TYPE_ICONS: Record<string, TTypeInfo> = {
  hike: { emoji: "🥾", label: "Hiking", color: "#4caf50" },
  city: { emoji: "🏙️", label: "City", color: "#2196f3" },
  food: { emoji: "🍽️", label: "Food & Wine", color: "#ff9800" },
  adventure: { emoji: "⚡", label: "Adventure", color: "#9c27b0" },
  "road-trip": { emoji: "🚗", label: "Road Trip", color: "#00bcd4" },
};

export default function DestinationMap() {
  const [activeRegion, setActiveRegion] = useState<TRegion | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedPackages, setSelectedPackages] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<string>("all");
  const [zoomedPin, setZoomedPin] = useState<string>("");
  const svgRef = useRef<SVGSVGElement>(null);

  const openRegion = (region: TRegion) => {
    setZoomedPin(region.id);
    setActiveRegion(region);
    setSelectedPackages([]);
    setFilterType("all");
    setTimeout(() => setModalVisible(true), 100);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setActiveRegion(null);
      setZoomedPin("");
    }, 300);
  };

  const togglePackage = (id: number) => {
    setSelectedPackages((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const packages: TPackage[] = activeRegion
    ? (PACKAGES[activeRegion.id] ?? [])
    : [];
  const filtered: TPackage[] =
    filterType === "all"
      ? packages
      : packages.filter((p) => p.type === filterType);
  const allTypes: string[] = activeRegion
    ? [...new Set((PACKAGES[activeRegion.id] ?? []).map((p) => p.type))]
    : [];

  // handle selected packages
  const handleSelectedPackages = () => {
    console.log(selectedPackages);
  };
  return (
    <div
      style={{
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; }
        .map-pin { transition: all 0.25s cubic-bezier(.4,0,.2,1); cursor: pointer; }
        .map-pin:hover .pin-body { transform: scale(1.35) translateY(-3px); filter: drop-shadow(0 6px 16px rgba(229,57,53,0.7)); }
        .map-pin:hover .pin-pulse { opacity: 1; transform: scale(1); }
        .pkg-card { transition: all 0.22s ease; cursor: pointer; }
        .pkg-card:hover { transform: translateY(-4px); }
        .pkg-card:hover .card-overlay { opacity: 1; }
        .type-btn { transition: all 0.18s; cursor: pointer; border: none; outline: none; }
        .type-btn:hover { opacity: 0.85; }
        .modal-backdrop { animation: fadeIn 0.25s ease; }
        .modal-box { animation: slideUp 0.3s cubic-bezier(.4,0,.2,1); }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(40px) } to { opacity:1; transform:translateY(0) } }
        @keyframes pinBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes pulseRing { 0%{transform:scale(0.8);opacity:0.8} 100%{transform:scale(2);opacity:0} }
        .pin-ring { animation: pulseRing 1.8s ease-out infinite; }
        .selected-pin .pin-body { transform: scale(1.4) translateY(-4px) !important; filter: drop-shadow(0 6px 20px rgba(229,57,53,0.9)) !important; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.35); }
      `}</style>

      {/* Map Container */}
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          // border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* World Map SVG */}
        <svg
          ref={svgRef}
          viewBox="0 0 1000 500"
          style={{ width: "100%", display: "block", userSelect: "none" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* <radialGradient id="mapGrad" cx="35%" cy="45%">
              <stop offset="0%" stopColor="#1e3a4a" />
              <stop offset="100%" stopColor="#0d1f2d" />
            </radialGradient> */}
            <filter id="pinShadow">
              <feDropShadow
                dx="0"
                dy="3"
                stdDeviation="3"
                floodColor="rgba(0,0,0,0.5)"
              />
            </filter>
            <filter id="glowRed">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ocean background */}
          <rect width="1000" height="500" fill="url(#mapGrad)" />

          {/* Subtle grid */}
          {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((x) => (
            <line
              key={`v${x}`}
              x1={x}
              y1={0}
              x2={x}
              y2={500}
              stroke="rgba(255,255,255,0.025)"
              strokeWidth="0.5"
            />
          ))}
          {[100, 200, 300, 400].map((y) => (
            <line
              key={`h${y}`}
              x1={0}
              y1={y}
              x2={1000}
              y2={y}
              stroke="rgba(255,255,255,0.025)"
              strokeWidth="0.5"
            />
          ))}

          {/* ── Continents (teal-ish fill like reference) ── */}
          {/* North America */}
          <path
            d="M 55 95 L 95 75 L 145 70 L 200 72 L 225 80 L 240 95 L 235 115 L 220 125 L 205 130 L 200 145 L 195 160 L 185 175 L 175 185 L 160 192 L 145 190 L 130 185 L 115 180 L 100 175 L 85 170 L 72 162 L 60 150 L 52 135 L 50 115 Z"
            fill="#f7e292"
            stroke="#e5c03b"
            strokeWidth="0.8"
            fillOpacity="0.9"
          />
          {/* Greenland */}
          <path
            d="M 230 45 L 265 38 L 290 48 L 285 68 L 265 75 L 240 68 L 228 58 Z"
            fill="#f7e292"
            stroke="#e5c03b"
            strokeWidth="0.8"
            fillOpacity="0.85"
          />
          {/* Central America */}
          <path
            d="M 175 192 L 195 192 L 210 205 L 215 220 L 205 225 L 190 218 L 175 210 Z"
            fill="#f7e292"
            stroke="#e5c03b"
            strokeWidth="0.6"
            fillOpacity="0.9"
          />
          {/* South America */}
          <path
            d="M 215 232 L 240 228 L 270 235 L 285 255 L 290 280 L 285 310 L 275 335 L 260 355 L 245 368 L 230 370 L 215 362 L 202 345 L 195 320 L 192 295 L 195 268 L 200 248 Z"
            fill="#f7e292"
            stroke="#e5c03b"
            strokeWidth="0.8"
            fillOpacity="0.9"
          />
          {/* Europe */}
          <path
            d="M 430 80 L 455 72 L 480 70 L 510 75 L 525 88 L 520 105 L 505 115 L 490 118 L 475 125 L 465 138 L 455 148 L 440 150 L 425 145 L 415 132 L 412 115 L 418 98 Z"
            fill="#f7e292"
            stroke="#e5c03b"
            strokeWidth="0.8"
            fillOpacity="0.9"
          />
          {/* Scandinavia */}
          <path
            d="M 450 52 L 470 45 L 490 48 L 495 62 L 480 72 L 460 72 Z"
            fill="#f7e292"
            stroke="#e5c03b"
            strokeWidth="0.6"
            fillOpacity="0.85"
          />
          {/* UK */}
          <path
            d="M 418 90 L 430 85 L 435 95 L 428 105 L 418 102 Z"
            fill="#f7e292"
            stroke="#e5c03b"
            strokeWidth="0.5"
            fillOpacity="0.9"
          />
          {/* Africa */}
          <path
            d="M 435 160 L 460 155 L 490 158 L 515 165 L 530 180 L 535 205 L 530 232 L 520 258 L 510 280 L 498 305 L 488 325 L 475 335 L 462 330 L 450 318 L 440 298 L 432 270 L 428 245 L 425 218 L 428 192 L 432 175 Z"
            fill="#f7e292"
            stroke="#e5c03b"
            strokeWidth="0.8"
            fillOpacity="0.9"
          />
          {/* Madagascar */}
          <path
            d="M 535 282 L 545 275 L 552 285 L 550 302 L 540 308 L 532 300 Z"
            fill="#f7e292"
            stroke="#e5c03b"
            strokeWidth="0.5"
            fillOpacity="0.85"
          />
          {/* Middle East / Arabian Peninsula */}
          <path
            d="M 520 145 L 545 140 L 570 148 L 585 162 L 590 180 L 582 198 L 565 205 L 548 200 L 532 188 L 520 172 L 518 158 Z"
            fill="#f7e292"
            stroke="#e5c03b"
            strokeWidth="0.7"
            fillOpacity="0.9"
          />
          {/* Russia / Central Asia */}
          <path
            d="M 520 60 L 580 48 L 650 45 L 720 52 L 770 58 L 800 68 L 810 82 L 800 96 L 780 102 L 755 105 L 725 108 L 695 112 L 660 115 L 625 118 L 590 120 L 560 118 L 535 112 L 518 100 L 515 82 Z"
            fill="#f7e292"
            stroke="#e5c03b"
            strokeWidth="0.8"
            fillOpacity="0.9"
          />
          {/* South Asia / Indian subcontinent */}
          <path
            d="M 590 138 L 620 132 L 650 135 L 668 148 L 672 168 L 665 188 L 648 202 L 628 208 L 608 205 L 592 192 L 585 172 L 585 155 Z"
            fill="#f7e292"
            stroke="#e5c03b"
            strokeWidth="0.7"
            fillOpacity="0.9"
          />
          {/* Sri Lanka */}
          <path
            d="M 647 215 L 658 212 L 662 222 L 654 228 L 645 224 Z"
            fill="#f7e292"
            stroke="#e5c03b"
            strokeWidth="0.5"
            fillOpacity="0.85"
          />
          {/* East Asia / China / Korea */}
          <path
            d="M 660 98 L 710 92 L 760 95 L 790 105 L 800 120 L 795 140 L 780 155 L 760 162 L 735 165 L 710 162 L 685 158 L 665 148 L 652 135 L 652 118 Z"
            fill="#f7e292"
            stroke="#e5c03b"
            strokeWidth="0.8"
            fillOpacity="0.9"
          />
          {/* Japan */}
          <path
            d="M 800 118 L 818 112 L 828 122 L 822 138 L 808 142 L 798 132 Z"
            fill="#f7e292"
            stroke="#e5c03b"
            strokeWidth="0.6"
            fillOpacity="0.85"
          />
          {/* Southeast Asia */}
          <path
            d="M 700 168 L 730 162 L 760 165 L 775 180 L 778 200 L 768 218 L 750 228 L 730 230 L 712 222 L 700 208 L 695 190 Z"
            fill="#f7e292"
            stroke="#e5c03b"
            strokeWidth="0.7"
            fillOpacity="0.9"
          />
          {/* Indonesia */}
          <path
            d="M 715 252 L 748 245 L 778 248 L 800 258 L 802 270 L 788 275 L 758 272 L 728 268 L 712 262 Z"
            fill="#f7e292"
            stroke="#e5c03b"
            strokeWidth="0.6"
            fillOpacity="0.88"
          />
          {/* Philippines */}
          <path
            d="M 780 188 L 798 182 L 808 192 L 805 208 L 792 215 L 778 208 L 776 196 Z"
            fill="#f7e292"
            stroke="#e5c03b"
            strokeWidth="0.5"
            fillOpacity="0.85"
          />
          {/* Australia */}
          <path
            d="M 780 320 L 820 308 L 858 312 L 882 325 L 895 345 L 892 368 L 875 385 L 850 392 L 820 390 L 792 378 L 775 360 L 770 340 Z"
            fill="#f7e292"
            stroke="#e5c03b"
            strokeWidth="0.8"
            fillOpacity="0.9"
          />
          {/* New Zealand */}
          <path
            d="M 900 385 L 912 378 L 920 388 L 915 400 L 905 405 L 898 396 Z"
            fill="#f7e292"
            stroke="#e5c03b"
            strokeWidth="0.5"
            fillOpacity="0.85"
          />

          {/* ── Map Pins ── */}
          {REGIONS.map((region) => {
            const isActive = zoomedPin === region.id;
            const isHovered = hoveredRegion === region.id;
            return (
              <g
                key={region.id}
                className={`map-pin${isActive ? " selected-pin" : ""}`}
                onClick={() => openRegion(region)}
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                {/* Pulse ring */}
                <circle
                  cx={region.x}
                  cy={region.y}
                  r="14"
                  fill="none"
                  stroke="rgba(229,57,53,0.5)"
                  strokeWidth="1.5"
                  className="pin-ring"
                  style={{
                    transformOrigin: `${region.x}px ${region.y}px`,
                    // eslint-disable-next-line react-hooks/purity
                    animationDelay: `${Math.random() * 1.5}s`,
                  }}
                />
                {/* Hover ring */}
                {(isHovered || isActive) && (
                  <circle
                    cx={region.x}
                    cy={region.y}
                    r="18"
                    fill="rgba(229,57,53,0.12)"
                    stroke="rgba(229,57,53,0.3)"
                    strokeWidth="1"
                  />
                )}
                {/* Pin body */}
                <g
                  className="pin-body"
                  style={{ transformOrigin: `${region.x}px ${region.y}px` }}
                  filter="url(#pinShadow)"
                >
                  {/* Pin teardrop */}
                  <path
                    d={`M ${region.x} ${region.y + 16} C ${region.x - 10} ${region.y + 5}, ${region.x - 12} ${region.y - 8}, ${region.x} ${region.y - 14} C ${region.x + 12} ${region.y - 8}, ${region.x + 10} ${region.y + 5}, ${region.x} ${region.y + 16} Z`}
                    fill={isActive ? "#ff5252" : "#e53935"}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="0.8"
                  />
                  {/* Pin circle */}
                  <circle
                    cx={region.x}
                    cy={region.y - 4}
                    r="5"
                    fill="rgba(255,255,255,0.9)"
                  />
                  {/* Inner dot */}
                  <circle
                    cx={region.x}
                    cy={region.y - 4}
                    r="2.5"
                    fill="#e53935"
                  />
                </g>
                {/* Tooltip on hover */}
                {isHovered && !isActive && (
                  <g>
                    <rect
                      x={region.x - 50}
                      y={region.y - 40}
                      width="100"
                      height="20"
                      rx="5"
                      fill="rgba(0,0,0,0.8)"
                    />
                    <text
                      x={region.x}
                      y={region.y - 26}
                      textAnchor="middle"
                      fontSize="10"
                      fill="white"
                      fontFamily="'Montserrat', sans-serif"
                      fontWeight="600"
                      letterSpacing="0.05em"
                    >
                      {region.name.toUpperCase()}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Bottom legend */}
          <g opacity="0.5">
            <circle cx="28" cy="472" r="4" fill="#e53935" />
            <text
              x="38"
              y="476"
              fontSize="9"
              fill="rgba(255,255,255,0.6)"
              fontFamily="sans-serif"
            >
              Click a pin to explore
            </text>
          </g>
        </svg>
      </div>

      {/* ── Modal Overlay ── */}
      {activeRegion && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            zIndex: 100,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            backdropFilter: "blur(3px)",
          }}
          onClick={closeModal}
        >
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
            style={{
              // background: "#16213e",
              borderRadius: "20px 20px 0 0",
              width: "100%",
              maxWidth: "1100px",
              maxHeight: "82vh",
              display: "flex",
              flexDirection: "column",
              border: "1px solid rgba(255,255,255,0.08)",
              borderBottom: "none",
              // boxShadow: "0 -20px 60px rgba(0,0,0,0.5)",
              opacity: modalVisible ? 1 : 0,
              transform: modalVisible ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "22px 28px 14px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#e53935",
                  boxShadow: "0 0 12px rgba(229,57,53,0.8)",
                  flexShrink: 0,
                }}
              />
              <h2
                style={{
                  margin: 0,
                  fontSize: "clamp(18px, 2.5vw, 26px)",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "0.02em",
                  flex: 1,
                }}
              >
                {activeRegion.name}
              </h2>

              {/* Type filter pills */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <button
                  className="type-btn"
                  onClick={() => setFilterType("all")}
                  style={{
                    background:
                      filterType === "all"
                        ? "rgba(229,57,53,0.25)"
                        : "rgba(255,255,255,0.06)",
                    border: `1px solid ${filterType === "all" ? "rgba(229,57,53,0.7)" : "rgba(255,255,255,0.1)"}`,
                    color:
                      filterType === "all"
                        ? "#ff6b6b"
                        : "rgba(255,255,255,0.5)",
                    padding: "5px 12px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                  }}
                >
                  ALL
                </button>
                {allTypes.map((type) => {
                  const typeInfo = TYPE_ICONS[type];
                  return (
                    <button
                      key={type}
                      className="type-btn"
                      onClick={() => setFilterType(type)}
                      style={{
                        background:
                          filterType === type
                            ? `${typeInfo?.color ?? "#888"}22`
                            : "rgba(255,255,255,0.06)",
                        border: `1px solid ${filterType === type ? (typeInfo?.color ?? "#888") + "88" : "rgba(255,255,255,0.1)"}`,
                        color:
                          filterType === type
                            ? (typeInfo?.color ?? "#ccc")
                            : "rgba(255,255,255,0.5)",
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                      }}
                    >
                      {typeInfo?.emoji} {typeInfo?.label ?? type}
                    </button>
                  );
                })}
              </div>

              {/* Close */}
              <button
                onClick={closeModal}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "none",
                  color: "rgba(255,255,255,0.6)",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.2s",
                  marginLeft: 4,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                }}
              >
                ✕
              </button>
            </div>

            {/* Cards grid */}
            <div
              style={{
                overflowX: "auto",
                overflowY: "hidden",
                padding: "20px 28px 28px",
                display: "flex",
                gap: "16px",
                flexWrap: "nowrap",
              }}
            >
              {filtered.map((pkg: TPackage, idx: number) => {
                const isSelected = selectedPackages.includes(pkg.id);
                const typeInfo: TTypeInfo = TYPE_ICONS[pkg.type] ?? {
                  emoji: "📍",
                  label: pkg.type,
                  color: "#888",
                };
                return (
                  <div
                    key={pkg.id}
                    className="pkg-card"
                    onClick={() => togglePackage(pkg.id)}
                    style={{
                      flexShrink: 0,
                      width: "clamp(200px, 22vw, 260px)",
                      borderRadius: "14px",
                      overflow: "hidden",
                      border: `2px solid ${isSelected ? "#3d8bff" : "rgba(255,255,255,0.07)"}`,
                      background: "",
                      boxShadow: isSelected
                        ? `0 0 0 3px rgba(61,139,255,0.25), 0 8px 30px rgba(0,0,0,0.4)`
                        : "0 4px 20px rgba(0,0,0,0.3)",
                      position: "relative",
                      animation: `slideUp 0.3s ease ${idx * 0.06}s both`,
                    }}
                  >
                    {/* Image */}
                    <div
                      style={{
                        position: "relative",
                        height: "155px",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={pkg.img}
                        alt={pkg.title}
                        width={400}
                        height={300}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.4s ease",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.transform = "scale(1.06)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                        onError={(e) => {
                          e.currentTarget.src = `https://picsum.photos/seed/${pkg.id + idx}/400/300`;
                        }}
                      />
                      {/* Gradient overlay */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(15,25,35,0.95) 0%, rgba(15,25,35,0.3) 55%, transparent 100%)",
                        }}
                      />

                      {/* Type badge */}
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          left: 10,
                          background: `${typeInfo.color}22`,
                          border: `1px solid ${typeInfo.color}55`,
                          borderRadius: "6px",
                          padding: "3px 8px",
                          fontSize: "10px",
                          color: typeInfo.color,
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          backdropFilter: "blur(6px)",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <span style={{ fontSize: "11px" }}>
                          {typeInfo.emoji}
                        </span>
                        {typeInfo.label.toUpperCase()}
                      </div>

                      {/* Selected badge */}
                      {isSelected && (
                        <div
                          style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            background: "#3d8bff",
                            borderRadius: "50%",
                            width: 24,
                            height: 24,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "13px",
                            boxShadow: "0 2px 8px rgba(61,139,255,0.5)",
                          }}
                        >
                          ✓
                        </div>
                      )}

                      {/* Price */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 10,
                          right: 10,
                          background: "rgba(0,0,0,0.7)",
                          borderRadius: "6px",
                          padding: "3px 8px",
                          fontSize: "12px",
                          color: "#c9a84c",
                          fontWeight: 700,
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        {pkg.price}
                      </div>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: "10px 12px 14px" }}>
                      <h3
                        style={{
                          margin: "0 0 5px",
                          fontSize: "13px",
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 700,
                          color: "#fff",
                          lineHeight: 1.35,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {pkg.title}
                      </h3>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          marginBottom: 6,
                        }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="11"
                          height="11"
                          fill="#e53935"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        <span
                          style={{
                            fontSize: "11px",
                            color: "rgba(255,255,255,0.55)",
                            fontFamily: "'Montserrat', sans-serif",
                          }}
                        >
                          {pkg.location}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="10"
                          height="10"
                          fill="rgba(255,255,255,0.35)"
                        >
                          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
                        </svg>
                        <span
                          style={{
                            fontSize: "10px",
                            color: "rgba(255,255,255,0.35)",
                            fontFamily: "'Montserrat', sans-serif",
                          }}
                        >
                          {pkg.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA footer */}
            {selectedPackages.length > 0 && (
              <div
                style={{
                  padding: "14px 28px 24px",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 14,
                  background: "rgba(0,0,0,0.2)",
                  animation: "fadeIn 0.25s ease",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  <b style={{ color: "#fff" }}>{selectedPackages.length}</b>{" "}
                  package{selectedPackages.length > 1 ? "s" : ""} selected
                </span>
                <button
                  onClick={handleSelectedPackages}
                  className="text-base text-white font-inter font-medium py-3 px-4 rounded-xl border cursor-pointer btn-bg border-[#2D2D2D] disabled:cursor-no-drop disabled:opacity-50"
                >
                  BUILD MY ITINERARY →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
