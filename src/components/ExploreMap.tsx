import React, { useState } from "react";
import { MapPin, Info, ArrowUpRight, Award, Flame, Users, ShieldAlert, Coins } from "lucide-react";
import { VenueItem, EventItem } from "../types";
import { VENUES, EVENTS } from "../data";

interface ExploreMapProps {
  onBuyPass: (event: EventItem) => void;
  walletConnected: boolean;
  onCheckIn: (venueId: string) => void;
  checkedInVenues: string[];
}

export default function ExploreMap({ onBuyPass, walletConnected, onCheckIn, checkedInVenues }: ExploreMapProps) {
  const [selectedVenue, setSelectedVenue] = useState<VenueItem>(VENUES[0]);
  const [filterArea, setFilterArea] = useState<string>("All Coordinates");

  // Get current event playing at the venue tonight
  const getVenueEvent = (venueId: string) => {
    return EVENTS.find((e) => e.venueId === venueId);
  };

  const filteredVenues = FILTER_AREAS.includes(filterArea) && filterArea !== "All Coordinates"
    ? VENUES.filter((v) => v.area === filterArea)
    : VENUES;

  return (
    <section id="explore-map-section" className="py-24 px-6 bg-sheff-slate/40 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-signal animate-ping" />
              <span className="text-xs font-mono tracking-widest text-[#ff5a1f] uppercase">LIVE RADAR NODES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight font-bold text-parchment-white">
              Explore the <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-warm-tungsten to-amber-signal">Sheffield Grid</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-fog-grey font-light max-w-lg mt-2">
              Virtual tactical map showing active sonic nodes, independent clubs, and street activity indexes across the city.
            </p>
          </div>

          {/* Area filters */}
          <div className="flex flex-wrap gap-2 pt-2" id="map-filters">
            {["All Coordinates", "Kelham Island", "West Street", "Division Street", "Hope Works Area"].map((area) => (
              <button
                key={area}
                onClick={() => setFilterArea(area)}
                className={`px-3 py-1 text-[11px] font-mono tracking-wider transition-all duration-300 rounded-xs uppercase border ${
                  filterArea === area
                    ? "bg-amber-signal/15 text-amber-signal border-amber-signal"
                    : "bg-rain-blue/50 text-fog-grey border-sheff-slate/40 hover:border-warm-tungsten hover:text-parchment-white"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Map Interactive Matrix Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#122638] border border-[#122638] gap-px rounded-xs overflow-hidden shadow-2xl">
          {/* LEFT: Simulated Vector Nightlife Map (Grid Layout) */}
          <div className="col-span-1 lg:col-span-7 p-6 flex flex-col justify-between min-h-[450px] relative overflow-hidden bg-[#0B1824]" id="map-sandbox">
            {/* Grid overlay lines */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1D2732_1px,transparent_1px),linear-gradient(to_bottom,#1D2732_1px,transparent_1px)] bg-[size:40px_40px] opacity-25" />
            
            {/* Hand-drawn glowing landmarks */}
            <svg className="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {/* Don River glowing curve (Kelham boundary) */}
              <path d="M 0,20 Q 200,80 400,10 Q 600,60 800,100" stroke="#FFB15E" strokeWidth="3" fill="none" strokeDasharray="5,5" />
              {/* West Street central motorway line */}
              <line x1="100" y1="280" x2="700" y2="40" stroke="#FF5A1F" strokeWidth="2" />
              {/* Division Street line */}
              <line x1="150" y1="310" x2="750" y2="70" stroke="#FF7A18" strokeWidth="1" strokeDasharray="10,5" />
              {/* Labels */}
              <text x="20" y="40" fill="#AAB4BE" fontSize="10" fontFamily="sans-serif">RIVER DON (ALE BELT)</text>
              <text x="220" y="190" fill="#FF5A1F" fontSize="10" fontFamily="sans-serif" transform="rotate(-20 220 190)">WEST ST (REVELLERS ROW)</text>
              <text x="560" y="240" fill="#FFB15E" fontSize="9" fontFamily="mono">CANAL CANYON (OUTER GRIDS)</text>
            </svg>

            {/* Radar scanner visual sweeping */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#FF7A18]/5 rounded-full pointer-events-none z-0 animate-pulse" />

            {/* Outer boundary info */}
            <div className="z-10 flex justify-between text-[10px] font-mono text-fog-grey opacity-60">
              <span>LAT: 53.3811° N // LNG: 1.4701° W</span>
              <span>MAP SCALE: AUTO-GRID (1:50)</span>
            </div>

            {/* Glowing Map pins */}
            <div className="w-full h-full min-h-[350px] relative z-20">
              {filteredVenues.map((v) => {
                const isSelected = selectedVenue.id === v.id;
                const matchesEvent = getVenueEvent(v.id);
                const hasCheckedIn = checkedInVenues.includes(v.id);
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVenue(v)}
                    className="absolute group transition-transform hover:scale-110 focus:outline-[none]"
                    style={{ left: `${v.coordinates.x}%`, top: `${v.coordinates.y}%` }}
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Outer pulsing ring */}
                      <span className={`absolute inline-flex h-10 w-10 rounded-full opacity-65 ${
                        isSelected 
                          ? "bg-[#FF7A18]/30 animate-ping" 
                          : matchesEvent?.isSoldOut 
                            ? "bg-rose-500/10"
                            : "bg-[#FF5A1F]/20 group-hover:animate-ping"
                      }`} />

                      {/* Dynamic PIN mark */}
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? "bg-[#FF7A18] border-parchment-white text-rain-blue shadow-[0_0_12px_#FF7A18]"
                          : hasCheckedIn
                            ? "bg-emerald-800 border-emerald-400 text-parchment-white"
                            : "bg-[#122638] border-[#1D2732] text-warm-tungsten hover:border-[#FF7A18] hover:text-parchment-white"
                      }`}>
                        <MapPin className="w-4 h-4" />
                      </div>

                      {/* Tooltip on Hover */}
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-[#0B1824] border border-[#1D2732] text-[10px] text-parchment-white font-mono px-2 py-1 rounded-xs whitespace-nowrap shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                        {v.name} {hasCheckedIn && "✓ CHECKED-IN"}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="z-10 flex justify-between items-center text-[10px] font-mono text-fog-grey opacity-60 pt-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF7A18] inline-block shadow-[0_0_6px_#FF7A18]" /> SELECTED NODE
                <span className="w-2 h-2 rounded-full bg-[#122638] border border-warm-tungsten inline-block" /> INACTIVE SLOTS
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> STABLE REWARD
              </span>
              <span>SECURED VAULT SENSORY ON</span>
            </div>
          </div>

          {/* RIGHT: Selected Venue Telemetry Card (Glassmorphism layout) */}
          <div className="col-span-1 lg:col-span-5 p-6 flex flex-col justify-between bg-[#0B1824]" id="map-detail-sidebar">
            <div className="flex flex-col gap-5">
              {/* Main Badge Group */}
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-[#122638] text-[10px] font-mono text-warm-tungsten tracking-widest uppercase border border-[#1D2732]">
                  {selectedVenue.area}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-[#FF7A18] font-bold">
                  <Coins className="w-3.5 h-3.5 text-[#FF7A18]" />
                  STAKED: {(selectedVenue.ratingWeb3 / 1000).toFixed(0)}K STEEL
                </span>
              </div>

              {/* Title and details */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-parchment-white leading-tight">
                  {selectedVenue.name}
                </h3>
                <p className="text-[11px] font-mono text-fog-grey mt-1">
                  {selectedVenue.type} // Capacity: {selectedVenue.capacity} max
                </p>
                <p className="font-sans text-xs text-[#AAB4BE] leading-relaxed mt-4 font-light">
                  {selectedVenue.description}
                </p>
              </div>

              {/* Technical Node specs */}
              <div className="space-y-2 bg-[#122638]/50 p-3 rounded-xs border border-[#1D2732] text-[11px] font-mono text-fog-grey">
                <div className="flex justify-between">
                  <span>ADDRESS:</span>
                  <span className="text-parchment-white text-right font-sans">{selectedVenue.fullAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span>SOUNDSYSTEM:</span>
                  <span className="text-warm-tungsten text-right">{selectedVenue.soundSystem}</span>
                </div>
                {selectedVenue.vulnerabilityScore && (
                  <div className="flex justify-between">
                    <span>STEEL SYSTEM STRENGTH:</span>
                    <span className="text-emerald-400">{selectedVenue.vulnerabilityScore}</span>
                  </div>
                )}
              </div>

              {/* Interactive Buttons (Checkin) */}
              <div className="flex gap-2">
                <button
                  onClick={() => onCheckIn(selectedVenue.id)}
                  disabled={checkedInVenues.includes(selectedVenue.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xs font-mono text-[11px] font-bold uppercase tracking-wider border transition-all duration-300 ${
                    checkedInVenues.includes(selectedVenue.id)
                      ? "bg-emerald-950/40 text-emerald-400 border-emerald-400/40 cursor-default"
                      : walletConnected
                        ? "bg-transparent text-parchment-white border-parchment-white/30 hover:border-[#FF7A18] hover:text-[#FF7A18] hover:bg-[#FF7A18]/5"
                        : "bg-transparent text-[#AAB4BE] border-[#1D2732] opacity-50 cursor-not-allowed"
                  }`}
                >
                  {checkedInVenues.includes(selectedVenue.id) ? (
                    <>✔ CLOCK IN SECURED</>
                  ) : walletConnected ? (
                    <>
                      <Flame className="w-3.5 h-3.5 text-[#FF7A18] animate-pulse" />
                      CLOCK IN (+10 STEEL)
                    </>
                  ) : (
                    "WALLET LOCKED"
                  )}
                </button>
              </div>
            </div>

            {/* Tonight event box nested inside */}
            <div className="mt-6 pt-5 border-t border-[#122638]">
              <span className="text-[10px] font-mono tracking-widest text-[#FF5A1F] uppercase block mb-3">
                PROJECTED TONIGHT AT THIS NODE:
              </span>

              {getVenueEvent(selectedVenue.id) ? (
                (() => {
                  const ev = getVenueEvent(selectedVenue.id)!;
                  const checked = checkedInVenues.includes(selectedVenue.id);
                  return (
                    <div className="flex items-center gap-3 bg-[#0B1824] p-3 rounded-xs border border-[#1D2732]">
                      <img src={ev.image} alt={ev.title} className="w-12 h-12 object-cover rounded-xs border border-[#1D2732]" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-[13px] font-semibold text-parchment-white truncate">
                          {ev.title}
                        </h4>
                        <p className="text-[10px] font-mono text-[#AAB4BE] truncate mt-0.5">
                          {ev.artist}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-warm-tungsten font-bold font-mono">
                            £{ev.priceGBP.toFixed(2)} // {ev.priceSTEEL} $STEEL
                          </span>
                          {ev.isSoldOut ? (
                            <span className="text-[9px] bg-red-900/30 text-rose-400 border border-rose-500/20 px-1 font-mono">
                              SOLD OUT
                            </span>
                          ) : (
                            <span className="text-[9px] bg-[#FF7A18]/15 text-[#FF7A18] border border-[#FF7A18]/20 px-1 font-mono uppercase">
                              PASS AVAILABLE
                            </span>
                          )}
                        </div>
                      </div>
                      {!ev.isSoldOut && (
                        <button
                          onClick={() => onBuyPass(ev)}
                          className="bg-[#FF7A18] text-rain-blue hover:bg-[#FFB15E] p-2 rounded-xs flex items-center justify-center transition-colors"
                          title="Tickets"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  );
                })()
              ) : (
                <div className="py-4 text-center bg-[#0B1824] p-3 rounded-xs border border-[#1D2732]">
                  <p className="text-[11px] font-mono text-[#AAB4BE] italic">
                    NO ACTIVE SIGNAL TONIGHT. DOME SLEEP STATE.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const FILTER_AREAS = [
  "Coordinates",
  "Kelham Island",
  "West Street",
  "Division Street",
  "Hope Works Area",
];
