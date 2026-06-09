import React, { useState } from "react";
import { Mic, Play, Pause, Headphones, Calendar, Flame, Disc, Radio } from "lucide-react";
import { PodcastEpisode } from "../types";
import { PODCASTS } from "../data";

export default function PodcastNetwork() {
  const [playingEp, setPlayingEp] = useState<PodcastEpisode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(38); // Simulated progress pct

  const handleTogglePlay = (ep: PodcastEpisode) => {
    if (playingEp?.id === ep.id) {
      setIsPlaying(!isPlaying);
    } else {
      setPlayingEp(ep);
      setIsPlaying(true);
      setProgress(Math.floor(Math.random() * 40) + 10);
    }
  };

  return (
    <section id="podcast-category-section" className="py-24 px-6 md:px-12 bg-rain-blue relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12 pb-8 border-b border-sheff-slate/30">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-signal animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-[#ff7a18] uppercase">
                PODCAST NETWORK // TRANSMISSIONS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-parchment-white">
              Sovereign Waves & <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-warm-tungsten to-amber-signal">Fireside Chats</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-fog-grey font-light max-w-xl mt-2 leading-relaxed">
              Interviews with bassline veterans, city cultural activists, and electronic pioneers talking direct from local brick rooms.
            </p>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-fog-grey bg-[#0b1824]/80 py-1.5 px-3 border border-sheff-slate/40 uppercase">
            STABLE REED MONO 96KBPS
          </span>
        </div>

        {/* Podcast Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#122638] border border-[#122638] gap-px rounded-xs overflow-hidden shadow-2xl">
          
          {/* LEFT: Live Tape Deck Cassette Player (Spans 5 Columns) */}
          <div className="col-span-1 lg:col-span-5 bg-[#0B1824] p-8 flex flex-col justify-between h-[420px] relative overflow-hidden" id="tape-deck-station">
            {/* Cassette casing illustration in high contrast styling */}
            <div className="absolute top-[-20px] left-[-20px] w-48 h-48 bg-[#FF7A18]/5 blur-3xl rounded-full pointer-events-none" />

            <div className="z-10">
              <span className="text-[9px] font-mono tracking-widest text-[#FF5A1F] uppercase block mb-4">
                [LIVE TAPE DECK MASTER DECK]
              </span>

              {playingEp ? (
                <div>
                  <span className="text-[10px] font-mono bg-[#122638] border border-[#1D2732] px-2 py-0.5 text-warm-tungsten uppercase rounded-xs font-semibold">
                    Episode {playingEp.episodeNum} // Playing
                  </span>

                  {/* Cascading cassette visual */}
                  <div className="bg-[#0B1824] border border-[#1D2732] p-4 rounded-xs mt-4 relative flex flex-col items-center justify-center">
                    {/* Tape holes rotating */}
                    <div className="flex items-center gap-12 mb-4">
                      <Disc className={`w-14 h-14 text-[#1D2732] ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "5s" }} />
                      <Disc className={`w-14 h-14 text-[#1D2732] ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "5s" }} />
                    </div>
                    {/* Tape window */}
                    <div className="w-24 h-4 bg-[#122638] rounded-xs border border-[#1D2732] flex items-center justify-center text-[8px] font-mono text-[#FF7A18] font-bold">
                      {isPlaying ? ">>> PLAYING" : "|| STANDBY"}
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-parchment-white mt-5 leading-snug">
                    {playingEp.title}
                  </h3>
                  <p className="text-[11px] font-mono text-[#AAB4BE] mt-1">
                    Hosts: {playingEp.hosts.join(" & ")} // Duration: {playingEp.duration}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <Mic className="w-12 h-12 text-[#FF5A1F] mb-4 stroke-1 animate-pulse" />
                  <p className="font-serif text-sm font-semibold text-parchment-white">
                    SELECT A TRANSMISSION TO PLAY
                  </p>
                  <p className="text-[10px] font-mono text-[#AAB4BE] mt-1 max-w-xs">
                    Unlock local cassette recordings detailing Sheffield's original synthetic rebellions.
                  </p>
                </div>
              )}
            </div>

            {/* Tape Controls */}
            {playingEp && (
              <div className="z-10 mt-8 pt-5 border-t border-[#122638]">
                {/* Loader bar */}
                <div className="w-full h-1 bg-[#122638] rounded-full mb-3 cursor-pointer relative" onClick={(e) => {
                  const b = e.currentTarget.getBoundingClientRect();
                  setProgress(Math.round(((e.clientX - b.left) / b.width) * 100));
                }}>
                  <div className="h-full bg-[#FF7A18]" style={{ width: `${progress}%` }} />
                </div>
                
                <div className="flex items-center justify-between font-mono text-xs text-[#AAB4BE]">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-[#FF7A18] hover:bg-[#FFB15E] text-rain-blue font-bold px-4 py-2 rounded-xs flex items-center gap-1.5 uppercase transition-colors shadow-[0_0_8px_rgba(255,122,24,0.2)]"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    {isPlaying ? "PAUSE STREAM" : "PLAY CORE"}
                  </button>
                  <div className="flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-[#FF5A1F]" />
                    <span>{playingEp.listenCount + (isPlaying ? 1 : 0)} NODES CONNECTED</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: List of Episodes (Spans 7 Columns) */}
          <div className="col-span-1 lg:col-span-7 bg-[#0B1824] p-6 sm:p-8 flex flex-col gap-4">
            <span className="text-[10px] tracking-widest text-[#FFB15E] font-mono uppercase block mb-1">
              ARCHIVED TAPE STACKS
            </span>

            <div className="space-y-4" id="podcast-slots">
              {PODCASTS.map((ep) => {
                const isSelected = playingEp?.id === ep.id;
                return (
                  <div
                    key={ep.id}
                    className={`p-4 border rounded-xs transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isSelected
                        ? "bg-[#122638]/50 border-[#FF7A18]/70"
                        : "bg-[#0B1824] border-[#1D2732] hover:border-warm-tungsten"
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      {/* Image cover preview */}
                      <img src={ep.cover} alt={ep.title} className="w-14 h-14 object-cover rounded-xs border border-[#1D2732] flex-shrink-0" />
                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-fog-grey mb-1">
                          <span className="text-[#FF7A18] font-bold">EPISODE {ep.episodeNum}</span>
                          <span>●</span>
                          <span>{ep.date}</span>
                        </div>
                        <h4 className="font-serif text-[15px] font-bold text-parchment-white leading-snug">
                          {ep.title}
                        </h4>
                        <p className="font-sans text-[11px] text-[#AAB4BE] leading-relaxed font-light mt-1 max-w-xl">
                          {ep.summary}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleTogglePlay(ep)}
                      className={`font-mono text-[10px] font-bold px-3 py-2 rounded-xs flex items-center gap-1 uppercase transition-colors flex-shrink-0 border ${
                        isSelected && isPlaying
                          ? "bg-[#FF7A18] text-rain-blue border-[#FF7A18] hover:bg-[#FFB15E]"
                          : "bg-transparent text-warm-tungsten border-warm-tungsten/35 hover:border-[#FF7A18] hover:text-[#FF7A18]"
                      }`}
                    >
                      {isSelected && isPlaying ? (
                        <>
                          <Pause className="w-3 h-3 fill-current" />
                          PAUSED
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-current" />
                          LISTEN EP
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
