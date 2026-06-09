import React, { useState, useEffect, useRef } from "react";
import { CloudRain, Compass, Thermometer, Wind, Eye, Cpu, Radio } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeroProps {
  onExploreClick: () => void;
  walletConnected: boolean;
  onConnectWallet: () => void;
  steelBalance: number;
}

export default function Hero({ onExploreClick, walletConnected, onConnectWallet, steelBalance }: HeroProps) {
  const [time, setTime] = useState("");
  const [rainIntensity, setRainIntensity] = useState<"light" | "medium" | "heavy">("medium");
  const [activeSensors, setActiveSensors] = useState({
    temp: 14.8,
    humidity: 92,
    nodeStrength: 4.8,
    gasPrice: 18, // Steel token gwei
  });

  const rainContainerRef = useRef<HTMLDivElement>(null);

  // Time ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Weather simulation changes slightly
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSensors((prev) => ({
        temp: +(prev.temp + (Math.random() - 0.5) * 0.2).toFixed(1),
        humidity: Math.min(100, Math.max(80, prev.humidity + Math.round((Math.random() - 0.5) * 2))),
        nodeStrength: +(prev.nodeStrength + (Math.random() - 0.5) * 0.05).toFixed(2),
        gasPrice: Math.max(12, prev.gasPrice + Math.round((Math.random() - 0.5) * 4)),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Raindrop generator effect based on intensity
  const [drops, setDrops] = useState<{ id: number; left: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    const count = rainIntensity === "light" ? 30 : rainIntensity === "medium" ? 80 : 150;
    const newDrops = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${0.8 + Math.random() * 0.6}s`,
    }));
    setDrops(newDrops);
  }, [rainIntensity]);

  return (
    <div className="relative w-full min-h-screen bg-rain-blue overflow-hidden flex flex-col justify-between border-b border-sheff-slate/40">
      {/* 1. Behind Overlay & Ambient Glowing Gradients */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-steel-navy/50 via-rain-blue to-rain-blue" id="ambient-overlay" />
      
      {/* City fog overlays moving */}
      <div className="absolute inset-x-0 bottom-0 top-1/4 z-0 bg-gradient-to-t from-rain-blue via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/3 left-[-10%] w-[60%] h-[40%] bg-gradient-to-r from-steel-navy/20 to-transparent blur-[120px] rounded-full animate-pulse pointer-events-none" style={{ animationDuration: "12s" }} />
      <div className="absolute bottom-[10%] right-[-1%] w-[40%] h-[35%] bg-gradient-to-l from-[#ff7a18]/10 via-[#ff5a1f]/5 to-transparent blur-[120px] rounded-full pointer-events-none" />

      {/* 2. Interactive Digital Rain layer */}
      <div ref={rainContainerRef} className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-40">
        {drops.map((drop) => (
          <div
            key={drop.id}
            className="rain-drop"
            style={{
              left: drop.left,
              animationDelay: drop.delay,
              animationDuration: drop.duration,
              top: "-80px",
            }}
          />
        ))}
      </div>

      {/* 3. Status Bar Grid (Digital OS Header) */}
      <div className="w-full z-20 px-6 py-4 flex flex-wrap justify-between items-center gap-4 bg-rain-blue/60 backdrop-blur-md border-b border-sheff-slate/30 text-xs font-mono tracking-wider text-fog-grey" id="os-header">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-amber-signal animate-pulse" />
            <span className="text-parchment-white font-medium">SHEFFIELD NETWORK [SAD // CORE]</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span className="opacity-40">|</span>
            <span className="hover:text-amber-signal cursor-pointer transition-colors" onClick={() => setRainIntensity("light")}>LIGHT RAIN</span>
            <span className="text-amber-signal">●</span>
            <span className="hover:text-amber-signal cursor-pointer transition-colors" onClick={() => setRainIntensity("medium")}>DRIZZLE</span>
            <span className="text-[#ff5a1f]">●</span>
            <span className="hover:text-amber-signal cursor-pointer transition-colors" onClick={() => setRainIntensity("heavy")}>STEEL STORMS</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1">
            <Thermometer className="w-3.5 h-3.5 text-amber-signal" />
            <span>{activeSensors.temp}°C</span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <CloudRain className="w-3.5 h-3.5 text-fog-grey" />
            <span>RH {activeSensors.humidity}%</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-warm-tungsten" />
            <span>STAKE POOL: {activeSensors.nodeStrength}M $STEEL</span>
          </div>
          <div className="flex items-center gap-1.5 text-parchment-white">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{time || "10:21:19"} UTC+0</span>
          </div>
          {walletConnected ? (
            <div className="bg-steel-navy/90 border border-amber-signal/30 text-warm-tungsten px-3 py-1 rounded-sm text-[11px] font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-signal animate-pulse" />
              {steelBalance} $STEEL
            </div>
          ) : (
            <button
              onClick={onConnectWallet}
              className="bg-electric-copper text-parchment-white hover:bg-amber-signal hover:shadow-[0_0_15px_rgba(255,122,24,0.4)] px-3  py-1 rounded-sm transition-all text-[11px] font-bold duration-300"
              id="wallet-connect-header-btn"
            >
              CONNECT WALLET
            </button>
          )}
        </div>
      </div>

      {/* 4. Large Cinematic Sheffield Skyline vector drawing with absolute atmospheric vibes */}
      <div className="absolute inset-x-0 bottom-0 h-[38vh] pointer-events-none z-10 flex flex-col justify-end" id="sheffield-skyline-vector">
        <svg viewBox="0 0 1440 280" className="w-full text-sheff-slate drop-shadow-[0_-5px_15px_rgba(11,24,36,0.8)] fill-current" preserveAspectRatio="none">
          {/* Back layer: Distant cooling towers & factories */}
          <path
            opacity="0.25"
            d="M0 200 L120 200 L120 120 L160 120 L160 200 L240 200 C270 140 310 140 340 200 L450 200 L450 160 L490 160 L490 200 L680 200 L720 110 L750 110 L790 200 L950 200 L990 100 L1020 100 L1070 200 C1100 130 1150 130 1180 200 L1440 200 L1440 280 L0 280 Z"
          />
          {/* Middle layer: Victorian factories, towers, chimneys */}
          <path
            opacity="0.5"
            className="text-steel-navy"
            d="M0 220 L60 220 L60 160 L75 160 L75 220 L180 220 L200 130 L220 130 L240 220 L320 220 L320 140 L380 140 L380 220 L520 220 L520 170 L550 170 L550 220 L640 220 L670 150 L710 150 L740 220 L890 220 L890 110 L920 110 L940 130 L940 220 L1100 220 L1130 140 L1170 140 L1200 220 L1440 220 L1440 280 L0 280 Z"
          />
          {/* Front layer: Wet roofs, gothic towers, modern skybeams */}
          <path
            className="text-rain-blue"
            d="M0 240 L40 240 L45 200 L55 200 L60 240 L120 240 L140 180 L180 180 L200 240 L280 240 L290 160 L315 110 L340 160 L350 240 L480 240 L500 190 L530 190 L550 240 L780 240 L810 170 L830 170 L860 240 L1020 240 L1040 150 L1080 150 L1100 240 L1220 240 L1240 190 L1280 190 L1300 240 L1440 240 L1440 280 L0 280 Z"
          />
        </svg>

        {/* Skyline Amber Spotlights / Laser Skybeams */}
        <div className="absolute bottom-[100px] left-[310px] w-1.5 h-[50vh] bg-gradient-to-t from-amber-signal/60 via-amber-signal/15 to-transparent blur-[2px] rounded-full origin-bottom rotate-[-12deg] animate-pulse pointer-events-none" />
        <div className="absolute bottom-[100px] left-[310px] w-6 h-[50vh] bg-gradient-to-t from-amber-signal/20 via-amber-signal/5 to-transparent blur-[8px] rounded-full origin-bottom rotate-[-12deg] pointer-events-none" />

        <div className="absolute bottom-[80px] left-[820px] w-1 h-[45vh] bg-gradient-to-t from-[#ff5a1f]/60 via-[#ff5a1f]/15 to-transparent blur-[1px] rounded-full origin-bottom rotate-[8deg] animate-pulse pointer-events-none" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-[80px] left-[820px] w-4 h-[45vh] bg-gradient-to-t from-[#ff5a1f]/20 via-[#ff5a1f]/5 to-transparent blur-[6px] rounded-full origin-bottom rotate-[8deg] pointer-events-none" style={{ animationDelay: "1s" }} />

        {/* Staked nodes indicators flickering on top of industrial structures */}
        <div className="absolute bottom-[180px] left-[70px] w-1.5 h-1.5 rounded-full bg-amber-signal animate-ping" />
        <div className="absolute bottom-[180px] left-[70px] w-1.5 h-1.5 rounded-full bg-amber-signal" />

        <div className="absolute bottom-[242px] left-[208px] w-1 h-1 rounded-full bg-rose-500 animate-pulse" />

        <div className="absolute bottom-[170px] left-[535px] w-1.5 h-1.5 rounded-full bg-[#ff5a1f] animate-ping" />
        <div className="absolute bottom-[170px] left-[535px] w-1.5 h-1.5 rounded-full bg-[#ff5a1f]" />

        <div className="absolute bottom-[250px] left-[1060px] w-1.5 h-1.5 rounded-full bg-[#ffb15e] animate-pulse" />
      </div>

      {/* 5. Center Hero Editorial Display Title */}
      <div className="w-full h-full max-w-7xl mx-auto px-6 pt-16 md:pt-28 pb-48 z-20 flex flex-col justify-center items-start text-left" id="hero-headlines">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          {/* Mini Header Accent */}
          <div className="flex items-center gap-1.5 text-xs font-mono tracking-widest text-[#ff5a1f] uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#ff5a1f] inline-block animate-pulse" />
            <span>Anglo-Futurism // Sovereign Soundscapes</span>
          </div>

          {/* Core Master Editorial Serif Title */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl tracking-tight leading-[0.9] text-parchment-white font-bold mb-6">
            Sheffield <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-warm-tungsten via-[#ff7a18] to-electric-copper">After Dark</span>
          </h1>

          {/* Subtext describing the platform */}
          <p className="font-sans text-sm sm:text-base md:text-lg text-fog-grey font-light max-w-xl leading-relaxed mb-8">
            An Anglo-futuristic nightlife operating system celebrating industrial steel heritage, synthetic sub-bass heritage, and rain-washed alleyways. Secured by independent contract, owned by the dancers.
          </p>

          {/* Multi-Buttons */}
          <div className="flex flex-wrap gap-4 font-grotesk">
            <button
              onClick={onExploreClick}
              className="bg-transparent text-parchment-white border border-parchment-white/30 hover:border-amber-signal hover:text-amber-signal px-6 py-3 rounded-xs font-semibold uppercase tracking-wider text-xs transition-all duration-300 flex items-center gap-2 group backdrop-blur-sm shadow-[0_5px_15px_rgba(0,0,0,0.2)]"
              id="hero-explore-btn"
            >
              <Compass className="w-4 h-4 text-[#ff5a1f] group-hover:rotate-45 transition-transform" />
              EXPLORE TONIGHT
            </button>
            <a
              href="#music-section"
              className="bg-steel-navy/80 hover:bg-[#122638] text-parchment-white border border-sheff-slate/40 hover:border-warm-tungsten px-6 py-3 rounded-xs font-semibold uppercase tracking-wider text-xs transition-all duration-300 flex items-center gap-2"
              id="hero-broadcast-btn"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              SOUNDS STREAMING
            </a>
          </div>
        </motion.div>
      </div>

      {/* 6. Live Statistics Dashboard (Digital OS Footer) Overlay */}
      <div className="w-full z-20 px-6 py-6 bg-gradient-to-t from-rain-blue via-rain-blue/90 to-transparent border-t border-sheff-slate/20" id="live-gauges">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs">
          {/* Gauge 1 */}
          <div className="flex flex-col border-l-2 border-amber-signal/40 pl-3">
            <span className="text-fog-grey uppercase tracking-widest text-[10px]">TICKET NFT INGRESS</span>
            <span className="text-lg text-parchment-white font-medium mt-1">45,108 MINTS</span>
            <span className="text-[10px] text-amber-signal/80 mt-0.5 font-bold flex items-center gap-1">
              <span className="w-1 h-1 bg-amber-signal rounded-full animate-ping" />
              STABLE FEED // SOL/STEEL
            </span>
          </div>

          {/* Gauge 2 */}
          <div className="flex flex-col border-l-2 border-[#ff5a1f]/40 pl-3">
            <span className="text-fog-grey uppercase tracking-widest text-[10px]">ACTIVE RAVERS</span>
            <span className="text-lg text-parchment-white font-medium mt-1">3,492 STATIONED</span>
            <span className="text-[10px] text-[#ff5a1f]/80 mt-0.5 font-semibold">WEST ST / KELHAM HUB ACTIVE</span>
          </div>

          {/* Gauge 3 */}
          <div className="flex flex-col border-l-2 border-warm-tungsten/40 pl-3">
            <span className="text-fog-grey uppercase tracking-widest text-[10px]">CREATOR POOL PAYOUT</span>
            <span className="text-lg text-parchment-white font-medium mt-1">41.8 ETH</span>
            <span className="text-[10px] text-green-400 mt-0.5 font-semibold">DISBURSED 100% DIRECT</span>
          </div>

          {/* Gauge 4 */}
          <div className="flex flex-col border-l-2 border-fog-grey/30 pl-3">
            <span className="text-fog-grey uppercase tracking-widest text-[10px]">WEATHER INDEX</span>
            <span className="text-lg text-parchment-white font-medium mt-1">TYPICAL DRIZZLE</span>
            <span className="text-[10px] text-fog-grey/80 mt-0.5 italic">SOUND REFRACTION: OPTIMAL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
