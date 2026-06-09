import React, { useState } from "react";
import { Sparkles, Calendar, Clock, MapPin, Award, ArrowRight, ShieldCheck, Ticket, Users } from "lucide-react";
import { EventItem, VenueItem } from "../types";
import { EVENTS, VENUES } from "../data";

interface TonightCardsProps {
  onBuyPass: (event: EventItem) => void;
  onExploreVenue: (venueId: string) => void;
}

export default function TonightCards({ onBuyPass, onExploreVenue }: TonightCardsProps) {
  const [activeTab, setActiveTab] = useState<"all" | "bassline" | "synth">("all");

  // Format events or filters
  const filteredEvents = EVENTS.filter((ev) => {
    if (activeTab === "all") return true;
    if (activeTab === "bassline") return ev.genres.some(g => ["Bassline", "UK Garage", "Dubstep"].includes(g));
    if (activeTab === "synth") return ev.genres.some(g => ["Synth Wave", "Industrial", "EBM", "Acid House", "Post-Punk"].includes(g));
    return true;
  });

  return (
    <section id="tonight-events-section" className="py-24 px-6 md:px-12 bg-rain-blue relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 border-b border-sheff-slate/30 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-signal animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-[#ff7a18] uppercase">
                TONIGHT IN SHEFFIELD
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-parchment-white">
              Nocturnal Gateways & <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-warm-tungsten via-amber-signal to-electric-copper">Iron Passes</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-fog-grey font-light max-w-xl mt-2 leading-relaxed">
              Real-time available events with smart NFT passes. Acquiring passes directly supports creators and guards local club space from licensing shutdowns.
            </p>
          </div>

          {/* Sound Wave Category filter tabs in grotesk font */}
          <div className="flex items-center gap-2 font-mono text-[11px]" id="genre-tabs">
            <span className="text-fog-grey mr-2 hidden sm:inline">FILTER WAVEFORM:</span>
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 transition-all duration-300 ${
                activeTab === "all"
                  ? "bg-amber-signal text-rain-blue font-bold rounded-xs"
                  : "bg-steel-navy/40 text-fog-grey hover:text-parchment-white border border-sheff-slate/40"
              }`}
            >
              [ALL FREQS]
            </button>
            <button
              onClick={() => setActiveTab("bassline")}
              className={`px-3 py-1.5 transition-all duration-300 ${
                activeTab === "bassline"
                  ? "bg-[#ff5a1f] text-parchment-white font-bold rounded-xs"
                  : "bg-steel-navy/40 text-fog-grey hover:text-parchment-white border border-sheff-slate/40"
              }`}
            >
              BASSLINE & GARAGE
            </button>
            <button
              onClick={() => setActiveTab("synth")}
              className={`px-3 py-1.5 transition-all duration-300 ${
                activeTab === "synth"
                  ? "bg-[#ffb15e] text-rain-blue font-bold rounded-xs"
                  : "bg-steel-navy/40 text-fog-grey hover:text-parchment-white border border-sheff-slate/40"
              }`}
            >
              SYNTH & INDUSTRIAL
            </button>
          </div>
        </div>

        {/* Featured Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#122638] border border-[#122638] rounded-xs overflow-hidden mb-20 shadow-2xl relative" id="events-grid">
          {filteredEvents.map((ev, index) => {
            const pctCapacity = Math.round((ev.sold / ev.capacity) * 100);
            return (
              <div
                key={ev.id}
                className="group flex flex-col justify-between bg-[#0B1824] p-6 hover:bg-[#1D2732]/30 transition-all duration-500 relative overflow-hidden"
              >
                {/* Visual Highlight Decorator */}
                {ev.isFeatured && (
                  <div className="absolute top-0 right-0 h-[3px] w-20 bg-gradient-to-l from-[#FF7A18] to-[#FF5A1F] shadow-[0_0_8px_#FF7A18]" />
                )}

                <div>
                  {/* Image cover + Meta tags overlay */}
                  <div className="relative w-full h-48 overflow-hidden rounded-xs mb-5 bg-[#0B1824] border border-[#1D2732]">
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-750 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rain-blue via-transparent to-transparent opacity-80" />
                    
                    {/* Event Tag Upper Left */}
                    {ev.tag && (
                      <span className="absolute top-3 left-3 bg-[#FF7A18] text-rain-blue text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-[0_0_8px_#FF7A18]">
                        {ev.tag}
                      </span>
                    )}

                    {/* NFT Token ID Indicator Lower Right */}
                    <span className="absolute bottom-3 right-3 text-[9px] font-mono text-parchment-white bg-[#0B1824]/90 backdrop-blur-md border border-[#1D2732] px-2 py-0.5 rounded-xs tracking-widest">
                      MEMBERSHIP: {ev.nftId}
                    </span>
                  </div>

                  {/* Genres */}
                  <div className="flex flex-wrap gap-1.5 mb-3 font-mono text-[9px]">
                    {ev.genres.map((g) => (
                      <span key={g} className="px-2 py-0.5 bg-[#122638] text-fog-grey border border-[#1D2732] rounded-xs font-semibold">
                        {g}
                      </span>
                    ))}
                  </div>

                  {/* Headline Title */}
                  <h3 className="font-serif text-xl font-bold text-parchment-white leading-tight group-hover:text-warm-tungsten transition-colors mb-2">
                    {ev.title}
                  </h3>

                  {/* Artist */}
                  <p className="font-serif italic text-sm text-fog-grey font-medium mb-4">
                    {ev.artist}
                  </p>

                  {/* Date, Time, Venue specs */}
                  <div className="space-y-2 mb-5 font-mono text-xs text-[#AAB4BE]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#FF7A18]" />
                      <span>{ev.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#AAB4BE]" />
                      <span>{ev.time}</span>
                    </div>
                    <button
                      onClick={() => onExploreVenue(ev.venueId)}
                      className="flex items-center gap-2 hover:text-[#FFB15E] text-left transition-colors font-semibold"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#FF5A1F]" />
                      <span className="underline decoration-dotted">{ev.venueName}</span>
                    </button>
                  </div>

                  {/* Capacity Bar loader */}
                  <div className="bg-[#122638] h-2 p-0.5 rounded-full border border-[#1D2732] mb-6">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        pctCapacity > 95
                          ? "bg-rose-500"
                          : pctCapacity > 80
                            ? "bg-[#FF7A18] animate-pulse"
                            : "bg-emerald-500"
                      }`}
                      style={{ width: `${pctCapacity}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-fog-grey mb-6">
                    <span>CAPACITY REGISTERED: {ev.sold} / {ev.capacity}</span>
                    <span className="font-bold text-parchment-white">{pctCapacity}% DOCK</span>
                  </div>
                </div>

                {/* Buy button + Price specifications */}
                <div className="flex items-center justify-between pt-4 border-t border-[#122638] gap-4 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-fog-grey uppercase">ADM PASS PRICE:</span>
                    <span className="text-lg text-parchment-white font-bold font-mono">
                      £{ev.priceGBP.toFixed(2)}
                      <span className="text-xs text-warm-tungsten ml-1.5 font-normal">
                        ({ev.priceSTEEL} $STEEL)
                      </span>
                    </span>
                  </div>

                  {ev.isSoldOut ? (
                    <button
                      disabled
                      className="bg-[#122638] border border-[#1D2732] text-fog-grey/60 cursor-not-allowed font-mono text-[10px] font-bold uppercase py-2 px-4 rounded-xs"
                    >
                      GATE LOCKED
                    </button>
                  ) : (
                    <button
                      onClick={() => onBuyPass(ev)}
                      className="bg-[#FF5A1F] hover:bg-[#FF7A18] text-parchment-white hover:text-rain-blue font-mono text-[10px] uppercase font-bold py-2.5 px-4 rounded-xs transition-all duration-300 hover:shadow-[0_0_12px_rgba(255,90,31,0.25)] flex items-center gap-1.5"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      SECURE MINT
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Trending Venues Row */}
        <div className="border-t border-[#122638] pt-16 mt-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4.5 h-4.5 text-[#FFB15E]" />
                <span className="text-xs font-mono tracking-widest text-[#FFB15E] uppercase">
                  ACTIVE SOVEREIGN DESTINATIONS
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-parchment-white tracking-tight">
                Trending Night Nodes & Smelting Mills
              </h3>
            </div>
            <a
              href="#explore-map-section"
              className="text-xs font-mono font-bold text-[#FF7A18] hover:text-[#FFB15E] transition-colors flex items-center gap-1 group"
            >
              TAKE ME TO THE ENTIRE COORDS GRID
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#122638] border border-[#122638] rounded-xs overflow-hidden" id="trending-venues">
            {VENUES.slice(0, 4).map((ven) => (
              <button
                key={ven.id}
                onClick={() => {
                  onExploreVenue(ven.id);
                  const el = document.getElementById("explore-map-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-left group bg-[#0B1824] hover:bg-[#1D2732]/30 p-5 transition-all duration-300 flex flex-col justify-between h-56 focus:outline-none"
              >
                <div>
                  <div className="h-24 w-full bg-[#0B1824] overflow-hidden rounded-xs relative mb-3 border border-[#1D2732]">
                    <img src={ven.image} alt={ven.name} className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500" />
                    <span className="absolute bottom-2 left-2 bg-[#0B1824]/90 backdrop-blur-md px-1.5 py-0.5 rounded-xs font-mono text-[9px] text-[#AAB4BE] border border-[#1D2732]">
                      {ven.area}
                    </span>
                  </div>
                  <h4 className="font-serif text-[14px] font-bold text-parchment-white leading-tight truncate">
                    {ven.name}
                  </h4>
                  <p className="text-[10px] font-mono text-[#AAB4BE] mt-0.5">
                    {ven.type}
                  </p>
                </div>
                
                <div className="flex justify-between items-center text-[9px] font-mono pt-3 border-t border-[#122638] text-[#AAB4BE] group-hover:text-parchment-white transition-colors">
                  <span>CAP: {ven.capacity} RAVERS</span>
                  <span className="text-[#FF7A18] font-bold shadow-[0_0_8px_rgba(255,122,24,0.15)]">● TRENDING</span>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
