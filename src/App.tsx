import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import ExploreMap from "./components/ExploreMap";
import TonightCards from "./components/TonightCards";
import MusicPlayer from "./components/MusicPlayer";
import CityJournal from "./components/CityJournal";
import PodcastNetwork from "./components/PodcastNetwork";
import SocialHub from "./components/SocialHub";
import Web3Dashboard from "./components/Web3Dashboard";
import { UserWallet, EventItem, VenueItem, ActivityFeedItem } from "./types";
import { VENUES } from "./data";
import { ShieldCheck, Coins, RefreshCcw, ExternalLink, Mail, Radio, Users, ChevronUp, Github, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Web3Tx {
  id: string;
  hash: string;
  title: string;
  amount: string;
  type: "MINT" | "STAKE" | "CONNECT" | "CHECKIN" | "REFINE";
  status: "pending" | "success";
}

export default function App() {
  // 1. Web 3.0 Wallet & Account State
  const [wallet, setWallet] = useState<UserWallet>({
    connected: false,
    address: null,
    steelBalance: 120,
    stakedSteel: 500,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=80",
    username: "steelmancer.eth",
    loyaltyLevel: "Novice Raver",
    recentCheckins: [],
    ownedNFTs: [],
  });

  // Track dynamic venues in local state so staking updates ratings in real-time!
  const [localVenues, setLocalVenues] = useState<VenueItem[]>(VENUES);

  // 2. Transacting notifications (Translucent queue style)
  const [transactions, setTransactions] = useState<Web3Tx[]>([]);

  // 3. Mining refinery interval state
  const [isMining, setIsMining] = useState(false);
  const [checkedInVenues, setCheckedInVenues] = useState<string[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubbed, setNewsletterSubbed] = useState(false);

  // Auto-connect after 3 seconds for introductory feel (or manual)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!wallet.connected) {
        // notify block setup
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Mining refinery loop
  useEffect(() => {
    let interval: any = null;
    if (isMining) {
      interval = setInterval(() => {
        // Add mined rewards
        setWallet((prev) => ({
          ...prev,
          steelBalance: prev.steelBalance + 10,
        }));
        
        // Push a micro refinery transacting notification
        const txHash = `0x${Math.random().toString(16).slice(2, 8)}...${Math.random().toString(16).slice(2, 5)}`;
        const newTx: Web3Tx = {
          id: `tx-refine-${Date.now()}`,
          hash: txHash,
          title: "Refined 10 $STEEL Core Block",
          amount: "+10 STEEL",
          type: "REFINE",
          status: "success",
        };
        setTransactions((prev) => [newTx, ...prev.slice(0, 3)]);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isMining]);

  // Handle Wallet connecting
  const handleConnectWallet = () => {
    if (wallet.connected) return;

    // Simulate crypto hand-shake and signature
    const txHash = "0x7fd" + Math.random().toString(16).slice(2, 6) + "..." + Math.random().toString(16).slice(2, 5);
    const newTx: Web3Tx = {
      id: `tx-conn-${Date.now()}`,
      hash: txHash,
      title: "Signature Handshake Accepted",
      amount: "0.00 ETH",
      type: "CONNECT",
      status: "pending",
    };
    setTransactions((prev) => [newTx, ...prev]);

    setTimeout(() => {
      setWallet((prev) => ({
        ...prev,
        connected: true,
        address: "0x3af8" + Math.floor(Math.random() * 900) + "..." + Math.floor(Math.random() * 90) + "b4",
        username: "steelmancer.eth",
        loyaltyLevel: "Novice Raver",
      }));
      setTransactions((prev) =>
        prev.map((t) => (t.id === newTx.id ? { ...t, status: "success" } : t))
      );
    }, 1200);
  };

  // Handle Check-in inside local map coordinate
  const handleCheckIn = (venueId: string) => {
    if (checkedInVenues.includes(venueId)) return;

    // Connect wallet automatically to make it easy for users
    let isConnected = wallet.connected;
    let fallbackAddress = wallet.address;
    if (!isConnected) {
      isConnected = true;
      fallbackAddress = "0x3af8" + Math.floor(Math.random() * 900) + "..." + Math.floor(Math.random() * 90) + "b4";
    }

    const vn = localVenues.find((v) => v.id === venueId);
    const vnName = vn ? vn.name : "Local Venue";

    const txHash = "0xe1b" + Math.random().toString(16).slice(2, 6) + "..." + Math.random().toString(16).slice(2, 5);
    const newTx: Web3Tx = {
      id: `tx-checkin-${Date.now()}`,
      hash: txHash,
      title: `Checked-in at ${vnName}`,
      amount: "+10 STEEL",
      type: "CHECKIN",
      status: "pending",
    };
    setTransactions((prev) => [newTx, ...prev]);

    setTimeout(() => {
      setCheckedInVenues((prev) => [...prev, venueId]);
      setWallet((prev) => ({
        ...prev,
        connected: isConnected,
        address: prev.address || fallbackAddress,
        steelBalance: prev.steelBalance + 10,
        recentCheckins: [...prev.recentCheckins, venueId],
        loyaltyLevel: prev.steelBalance + 10 > 200 ? "Iron Apprentice" : "Novice Raver",
      }));
      setTransactions((prev) =>
        prev.map((t) => (t.id === newTx.id ? { ...t, status: "success" } : t))
      );
    }, 1500);
  };

  // Handle Staking tokens to support specific venue
  const handleStakeSteel = (venueId: string, amount: number) => {
    if (amount <= 0 || wallet.steelBalance < amount) return;

    const vn = localVenues.find((v) => v.id === venueId);
    const vnName = vn ? vn.name : "Local Node";

    const txHash = "0x9ca" + Math.random().toString(16).slice(2, 6) + "..." + Math.random().toString(16).slice(2, 5);
    const newTx: Web3Tx = {
      id: `tx-stake-${Date.now()}`,
      hash: txHash,
      title: `Delegated ${amount} STEEL to ${vnName}`,
      amount: `-${amount} STEEL`,
      type: "STAKE",
      status: "pending",
    };
    setTransactions((prev) => [newTx, ...prev]);

    setTimeout(() => {
      // Decrease liquid balance, increase staked balance, and dynamically update the local venue staking total rating!
      setWallet((prev) => ({
        ...prev,
        steelBalance: prev.steelBalance - amount,
        stakedSteel: prev.stakedSteel + amount,
        loyaltyLevel: prev.stakedSteel + amount >= 1500 ? "Steel Ambassador" : "Iron Apprentice",
      }));

      setLocalVenues((prevVenues) =>
        prevVenues.map((v) =>
          v.id === venueId ? { ...v, ratingWeb3: v.ratingWeb3 + amount * 3 } : v
        )
      );

      setTransactions((prev) =>
        prev.map((t) => (t.id === newTx.id ? { ...t, status: "success" } : t))
      );
    }, 1800);
  };

  // Handle buying standard event ticket / mint pass
  const handleBuyPass = (event: EventItem) => {
    // Check-in / connection fallback
    let isConnected = wallet.connected;
    let fallbackAddress = wallet.address;
    if (!isConnected) {
      isConnected = true;
      fallbackAddress = "0x3af8" + Math.floor(Math.random() * 900) + "..." + Math.floor(Math.random() * 90) + "b4";
    }

    const isPayingWithSteel = wallet.steelBalance >= event.priceSTEEL;

    const txHash = "0xabb" + Math.random().toString(16).slice(2, 6) + "..." + Math.random().toString(16).slice(2, 5);
    const newTx: Web3Tx = {
      id: `tx-mint-${Date.now()}`,
      hash: txHash,
      title: `Secured entry for ${event.title}`,
      amount: isPayingWithSteel ? `-${event.priceSTEEL} STEEL` : `£${event.priceGBP.toFixed(2)}`,
      type: "MINT",
      status: "pending",
    };
    setTransactions((prev) => [newTx, ...prev]);

    setTimeout(() => {
      const ticketId = `SAD-NFT-${Date.now().toString().slice(-4)}`;
      const newNft = {
        id: ticketId,
        eventId: event.id,
        ticketName: event.title,
        mintDate: "June 9, 2026",
        rarity: event.priceSTEEL > 40 ? "Vip" as const : "Standard" as const,
        metadataURI: "sad://mints/" + event.nftId,
      };

      setWallet((prev) => ({
        ...prev,
        connected: isConnected,
        address: prev.address || fallbackAddress,
        steelBalance: isPayingWithSteel ? prev.steelBalance - event.priceSTEEL : prev.steelBalance,
        ownedNFTs: [newNft, ...prev.ownedNFTs],
      }));

      setTransactions((prev) =>
        prev.map((t) => (t.id === newTx.id ? { ...t, status: "success" } : t))
      );
    }, 1800);
  };

  // Handle minting custom industrial ticket memento
  const handleMintTicketMemento = () => {
    if (wallet.steelBalance < 50) return;

    const txHash = "0x8cc" + Math.random().toString(16).slice(2, 6) + "..." + Math.random().toString(16).slice(2, 5);
    const newTx: Web3Tx = {
      id: `tx-memento-${Date.now()}`,
      hash: txHash,
      title: "Forged Steel Memento Stamp",
      amount: "-50 STEEL",
      type: "MINT",
      status: "pending",
    };
    setTransactions((prev) => [newTx, ...prev]);

    setTimeout(() => {
      const rarities = ["Standard", "Vip", "Legendary"];
      const randRarity = rarities[Math.floor(Math.random() * rarities.length)] as "Standard" | "Vip" | "Legendary";
      const stampingNo = Math.floor(Math.random() * 880) + 100;

      const mementoId = `SAD-METM-${Math.floor(Math.random() * 900) + 100}`;
      const mementoItem = {
        id: mementoId,
        eventId: "memento-block",
        ticketName: `Sheffield Forged Steel Stamp #${stampingNo}`,
        mintDate: "June 9, 2026",
        rarity: randRarity,
        metadataURI: `sad://assets/stamps/sheff-${stampingNo}.id`,
      };

      setWallet((prev) => ({
        ...prev,
        steelBalance: prev.steelBalance - 50,
        ownedNFTs: [mementoItem, ...prev.ownedNFTs],
        loyaltyLevel: prev.ownedNFTs.length + 1 > 4 ? "Sheffield Spectre" : prev.loyaltyLevel,
      }));

      setTransactions((prev) =>
        prev.map((t) => (t.id === newTx.id ? { ...t, status: "success" } : t))
      );
    }, 1800);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubbed(true);
    setNewsletterEmail("");
  };

  const handleExploreClick = () => {
    const mapEl = document.getElementById("explore-map-section");
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExploreVenue = (venueId: string) => {
    const vn = localVenues.find((v) => v.id === venueId);
    if (vn) {
      // Auto selecting is done by the maps component, but this matches correctly
    }
  };

  return (
    <div className="relative min-h-screen bg-rain-blue text-parchment-white selection:bg-amber-signal selection:text-rain-blue" id="sheffield-os-viewport">
      
      {/* Dynamic Rain and Lighting Hero Landing */}
      <Hero
        onExploreClick={handleExploreClick}
        walletConnected={wallet.connected}
        onConnectWallet={handleConnectWallet}
        steelBalance={wallet.steelBalance}
      />

      {/* Featured list layout tonight */}
      <TonightCards
        onBuyPass={handleBuyPass}
        onExploreVenue={handleExploreVenue}
      />

      {/* Sheffield Interactive Coordinating Map Grid */}
      <ExploreMap
        onBuyPass={handleBuyPass}
        walletConnected={wallet.connected}
        onCheckIn={handleCheckIn}
        checkedInVenues={checkedInVenues}
      />

      {/* Web Audio Modular Soundboard Synthesizer visualizer block */}
      <MusicPlayer />

      {/* Critical Journal write-ups regarding synth-pop roots & steel legacy */}
      <CityJournal />

      {/* Podcast Network cassete decks */}
      <PodcastNetwork />

      {/* Real-time Ledger of peer check-ins & IRC terminal block */}
      <SocialHub
        walletConnected={wallet.connected}
        username={wallet.username}
      />

      {/* Web 3.0 Dashboard, Hashing Miner, budgeting vote pool & pass storage */}
      <Web3Dashboard
        wallet={wallet}
        onConnect={handleConnectWallet}
        onMineSteel={() => setIsMining(!isMining)}
        isMining={isMining}
        onStakeSteel={handleStakeSteel}
        onMintTicketMemento={handleMintTicketMemento}
      />

      {/* 5. LIVE TRANSACTING LEDGER ALERT DOCK (Locks bottom right) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full font-mono text-xs pointer-events-none" id="ledger-alert-dock">
        <AnimatePresence>
          {transactions.map((tx) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50 }}
              className="bg-[#0b1824]/90 backdrop-blur-md border border-sheff-slate/75 p-3.5 rounded-xs flex flex-col gap-1.5 shadow-2xl relative pointer-events-auto"
              style={{
                boxShadow: tx.status === "pending"
                  ? "0 10px 30px rgba(255,122,24,0.08)"
                  : "0 10px 30px rgba(16,185,129,0.08)"
              }}
            >
              {/* Top row */}
              <div className="flex justify-between items-center text-[10px]">
                <div className="flex items-center gap-1.5 text-fog-grey">
                  <span className={`w-1.5 h-1.5 rounded-full ${tx.status === "pending" ? "bg-amber-signal animate-ping" : "bg-emerald-500"}`} />
                  <span>TRANSACTION {tx.type}</span>
                </div>
                <span className="text-fog-grey/50 italic font-bold">HASH: {tx.hash}</span>
              </div>

              {/* Middle row */}
              <div className="flex justify-between items-center">
                <span className="text-[12px] font-sans font-bold text-parchment-white">{tx.title}</span>
                <span className={`font-bold ${tx.amount.startsWith("-") ? "text-[#ff5a1f]" : "text-emerald-400"}`}>
                  {tx.amount}
                </span>
              </div>

              {/* Status and timestamp */}
              <div className="flex justify-between items-center text-[9px] pt-1.5 border-t border-sheff-slate/30 text-fog-grey/80">
                <span>STAGE: SUCCESS SECURE</span>
                <span className={tx.status === "pending" ? "text-amber-signal animate-pulse" : "text-emerald-400"}>
                  {tx.status === "pending" ? "INDEXING ON BLOCK..." : "BLOCK METRIC INDEXED ✔"}
                </span>
              </div>

              {/* Micro close trigger */}
              <button
                onClick={() => setTransactions((prev) => prev.filter((t) => t.id !== tx.id))}
                className="absolute top-2 right-2 hover:text-white font-mono text-[9px] text-fog-grey opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 6. INDUSTRIAL SOVEREIGN FOOTER FOOTPRINT */}
      <footer className="bg-rain-blue/95 border-t border-sheff-slate/50 py-16 px-6 font-mono text-xs text-fog-grey/95 relative overflow-hidden" id="system-footer">
        {/* Background steel glow */}
        <div className="absolute bottom-0 left-[20%] w-96 h-96 bg-[#ff5a1f]/3 blur-[180px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Col 1: Brand details (Spans 4 Columns) */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-amber-signal animate-pulse" />
              <span className="font-serif text-lg font-bold text-parchment-white tracking-widest uppercase">
                SHEFFIELD AFTER DARK
              </span>
            </div>
            <p className="font-sans text-[12px] leading-relaxed font-light mt-1">
              Celebrating Victorian brick chimneys, heavy voice-valve synthetics, speed garage heritage, and rainy pavements. An independent digital operating system fully crowdsourced of the dancers, by the dancers.
            </p>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-amber-signal mt-2">
              <ShieldCheck className="w-4 h-4 text-[#ff5a1f]" />
              <span>LICENSED SOVEREIGN NODE PROT #042</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (Spans 3 Columns) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-[10px] text-parchment-white tracking-widest uppercase block mb-1">NODE MAP SECTIONS</span>
            <a href="#tonight-events-section" className="hover:text-amber-signal transition-colors flex items-center gap-1">
              <span>● featured raw entries</span>
            </a>
            <a href="#explore-map-section" className="hover:text-amber-signal transition-colors flex items-center gap-1">
              <span>● live coordinate radar</span>
            </a>
            <a href="#music-section" className="hover:text-amber-signal transition-colors flex items-center gap-1">
              <span>● synthetic soundboard</span>
            </a>
            <a href="#city-journal-section" className="hover:text-amber-signal transition-colors flex items-center gap-1">
              <span>● crucible dispatch journal</span>
            </a>
            <a href="#social-collective-section" className="hover:text-amber-signal transition-colors flex items-center gap-1">
              <span>● steel collective terminal</span>
            </a>
          </div>

          {/* Col 3: Live Statistics telemetry (Spans 2 Columns) */}
          <div className="md:col-span-2 flex flex-col gap-2.5">
            <span className="text-[10px] text-parchment-white tracking-widest uppercase block mb-1">LEDGER SPECS</span>
            <div className="flex justify-between">
              <span>ACTIVE CLUBS:</span>
              <span className="text-parchment-white">7 NODES</span>
            </div>
            <div className="flex justify-between">
              <span>LEDGER DEPTH:</span>
              <span className="text-emerald-400">18.9M BLOCKS</span>
            </div>
            <div className="flex justify-between">
              <span>$STEEL BURN:</span>
              <span className="text-amber-signal">42.8K TOKENS</span>
            </div>
            <div className="flex justify-between">
              <span>NETWORK GWEI:</span>
              <span className="text-warm-tungsten">18 GWEI</span>
            </div>
          </div>

          {/* Col 4: Newsletter registry (Spans 3 Columns) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-[10px] text-parchment-white tracking-widest uppercase block mb-1">NEWSLETTER SIGNALS</span>
            <p className="font-sans text-[11px] leading-relaxed font-light">
              Receive raw cassette pamphlets, ticket alerts, and secret block releases in your inbox weekly.
            </p>

            {newsletterSubbed ? (
              <div className="p-2.5 bg-emerald-950/40 border border-emerald-400/30 text-emerald-400 text-[10px] rounded-xs uppercase font-bold">
                ✔ INBOX SPLICED. WELCOME.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@server.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-rain-blue border border-sheff-slate font-mono text-[11px] px-3 py-1.5 rounded-xs placeholder:text-fog-grey/50 focus:outline-[none] focus:border-amber-signal flex-1 min-w-0"
                />
                <button
                  type="submit"
                  className="bg-amber-signal hover:bg-[#ffb15e] text-rain-blue font-bold p-1 px-3 rounded-xs text-[10px] transition-colors"
                >
                  SECURE
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom credits */}
        <div className="max-w-7xl mx-auto border-t border-sheff-slate/30 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-fog-grey/65">
          <span>SHEFFIELD AFTER DARK © 2026. FORGED IN INDEPENDENT STEEL AND SUBBASS SOUNDWAYS.</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-fog-grey" />
              <span>NATIVE GIT // MONO CONTRACT</span>
            </span>
            <span className="hover:text-amber-signal cursor-pointer flex items-center gap-1 hover:underline" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              BACK TO SYSTEM OVERLAY <ChevronUp className="w-3 h-3 text-[#ff5a1f]" />
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
