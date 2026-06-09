import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, Award, Activity, Heart, Globe, Terminal } from "lucide-react";
import { ActivityFeedItem } from "../types";
import { INITIAL_ACTIVITY } from "../data";

interface SocialHubProps {
  walletConnected: boolean;
  username: string;
}

export default function SocialHub({ walletConnected, username }: SocialHubProps) {
  const [feed, setFeed] = useState<ActivityFeedItem[]>(INITIAL_ACTIVITY);
  const [chatMessages, setChatMessages] = useState([
    { id: "cm1", user: "niche_veteran", msg: "Crucible Synth set tonight is going to be heavy. Hope Works custom acoustic layout is tuned up.", time: "22:04" },
    { id: "cm2", user: "steel_coder", msg: "Just minted my pass! Speed garage summit on Friday is already 99% sold. Forge's warehouse room is massive.", time: "22:11" },
    { id: "cm3", user: "kelham_dancer", msg: "Is there any real ale sunset warmups in Kelham Island before Friday? Tavern has 8 cask pumps.", time: "22:15" },
    { id: "cm4", user: "ambient_ghost", msg: "Warp Pioneers on custom eurorack loops tonight. Synthesizer boards are warming up inside Sussex St.", time: "22:18" }
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Simulate new activity occasionally
  useEffect(() => {
    const actions = [
      { act: "Staked 250 $STEEL on", target: "FORGE Sheffield" },
      { act: "Checked-in at", target: "Kelham Island Tavern" },
      { act: "Minted Standard Pass", target: "Sheffield 140bpm Syndicate" },
      { act: "Tipped 45 $STEEL to creator", target: "Castlegate Collective" }
    ];

    const users = ["warp_ambient", "sheff_soldier", "bassline_queen", "cutlery_node"];
    const interval = setInterval(() => {
      const randomAct = actions[Math.floor(Math.random() * actions.length)];
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const newAct: ActivityFeedItem = {
        id: `act-${Date.now()}`,
        username: `${randomUser}.eth`,
        avatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000) + 1500}?auto=format&fit=crop&q=80&w=80`,
        action: randomAct.act,
        target: randomAct.target,
        time: "Just now",
        hash: `0x${Math.random().toString(16).slice(2, 8)}...${Math.random().toString(16).slice(2, 5)}`
      };
      setFeed((prev) => [newAct, ...prev.slice(0, 5)]);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  // Simulating random chat responses occasionally
  useEffect(() => {
    const triggers = [
      "Anyone at Forum Kitchen? Sunset vinyl deck is active.",
      "Just checked in at Plot 22, the valve subs are already shaking the floor plates.",
      "$STEEL gas fees are so low tonight, minting passes is practically free.",
      "Is Hope Works sold out yet? I need two more slots."
    ];
    const users = ["cutlery_raver", "synth_warrior_80", "division_selector", "niche_garage"];

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
      const newMsg = {
        id: `cm-${Date.now()}`,
        user: users[Math.floor(Math.random() * users.length)],
        msg: triggers[Math.floor(Math.random() * triggers.length)],
        time: timeStr
      };
      setChatMessages((prev) => [...prev, newMsg]);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    const userDisplay = walletConnected ? username : "guest_raver";

    const newMsg = {
      id: `cm-user-${Date.now()}`,
      user: userDisplay,
      msg: inputMessage,
      time: timeStr
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setInputMessage("");

    // Automatically simulate a response 2 seconds later
    setTimeout(() => {
      const responses = [
        "Sovereign node registered. Welcome to Sheffield After Dark chat.",
        "Rhythm secured. Check out the custom Web Audio synth loops in the music deck above!",
        "Staking levels on FORGE just spiked. Must be the bassline hype.",
        "Make sure to clock-in on the map coordinates to claim your hourly $STEEL drop!"
      ];
      const botMsg = {
        id: `cm-bot-${Date.now()}`,
        user: "SAD // CORE",
        msg: responses[Math.floor(Math.random() * responses.length)],
        time: now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
      };
      setChatMessages((prev) => [...prev, botMsg]);
    }, 1500);
  };

  return (
    <section id="social-collective-section" className="py-24 px-6 md:px-12 bg-sheff-slate/40 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12 border-b border-sheff-slate/30 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-signal animate-ping" />
              <span className="text-xs font-mono tracking-widest text-[#ff5a1f] uppercase">
                THE STEEL COLLECTIVE FEED
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-parchment-white">
              Nocturnal Feed & <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-warm-tungsten to-amber-signal">Raver Chatter</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-fog-grey font-light max-w-xl mt-2 leading-relaxed">
              Synchronized network ledger showing checking-ins, NFT mints, and real-time chat direct from the wet pavements of Division Street.
            </p>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-fog-grey bg-[#0b1824]/80 py-1.5 px-3 border border-sheff-slate/40 uppercase">
            ACTIVE CHATTER: {chatMessages.length + 84} STATIONED
          </span>
        </div>

        {/* Social split window */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Live activity ledger - blockchain aesthetic (Spans 5 Columns) */}
          <div className="col-span-1 lg:col-span-5 p-6 bg-rain-blue/60 border border-sheff-slate/40 rounded-sm flex flex-col justify-between" id="activity-ledger">
            <div>
              <div className="flex items-center gap-2 mb-5 text-[10px] font-mono text-fog-grey">
                <Activity className="w-4 h-4 text-amber-signal animate-pulse" />
                <span>SHEFFIELD NETWORK LEDGER [LIVE]</span>
              </div>

              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                {feed.map((act) => (
                  <div key={act.id} className="p-3 bg-[#08131e] border border-sheff-slate/50 rounded-xs flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={act.avatar} alt={act.username} className="w-8 h-8 rounded-full object-cover border border-sheff-slate" />
                      <div>
                        <span className="font-mono font-bold text-parchment-white block">{act.username}</span>
                        <p className="text-[11px] text-fog-grey mt-0.5">
                          {act.action} <span className="text-warm-tungsten">{act.target}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right font-mono text-[9px] text-fog-grey flex-shrink-0">
                      <span className="block text-amber-signal/80 font-bold">{act.time}</span>
                      {act.hash && (
                        <span className="opacity-50 font-mono italic underline">{act.hash}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-sheff-slate/30 bg-steel-navy/25 p-3 rounded-xs font-mono text-[10px] text-fog-grey">
              <span className="font-bold text-[#ff5a1f] block mb-1">STRENGTH AND RESILIENCE MONITOR</span>
              Multi-node staking ensures local club spaces have reserves to cover legal fees. Our decentralized protection network is online.
            </div>
          </div>

          {/* RIGHT: Chat Terminal IRC-Style (Spans 7 Columns) */}
          <div className="col-span-1 lg:col-span-7 bg-rain-blue/80 border border-sheff-slate/40 rounded-sm overflow-hidden flex flex-col justify-between h-[480px]" id="irc-chat-terminal">
            {/* Header */}
            <div className="px-4 py-3 bg-[#08121a] border-b border-sheff-slate/40 flex justify-between items-center text-xs font-mono">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-signal animate-pulse" />
                <span className="text-parchment-white font-semibold">IRC // STEEL_COLLECTIVE_CHNL</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-fog-grey">
                <Globe className="w-3 h-3 text-[#ff5a1f]" />
                <span>UNRESTRICTED PEER-NODE</span>
              </div>
            </div>

            {/* Messages box */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4" id="chat-scroller">
              {chatMessages.map((msg) => {
                const isSADCore = msg.user === "SAD // CORE";
                return (
                  <div key={msg.id} className="flex flex-col text-xs font-mono">
                    <div className="flex items-baseline gap-2">
                      <span className={`font-bold ${
                        isSADCore
                          ? "text-[#ff5a1f] bg-electric-copper/10 px-1 border border-electric-copper/20"
                          : "text-warm-tungsten"
                      }`}>
                        &lt;{msg.user}&gt;
                      </span>
                      <span className="text-[9px] text-fog-grey/50">{msg.time}</span>
                    </div>
                    <p className={`mt-1 font-sans text-[12px] leading-relaxed max-w-2xl ${
                      isSADCore ? "text-[#ffb15e]" : "text-parchment-white/90"
                    }`}>
                      {msg.msg}
                    </p>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Input form */}
            <form onSubmit={handleSendMessage} className="p-3 bg-[#08121a] border-t border-sheff-slate/40 flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={walletConnected ? "Broadcasting signal... state details..." : "Connect wallet or enter guest message..."}
                className="flex-1 bg-rain-blue/90 border border-sheff-slate text-xs font-mono px-3 py-2 rounded-xs text-parchment-white placeholder:text-fog-grey/50 focus:outline-none focus:border-amber-signal"
                id="chat-input-box"
              />
              <button
                type="submit"
                className="bg-amber-signal hover:bg-[#ffb15e] text-rain-blue p-2 px-4 rounded-xs font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                id="chat-send-btn"
              >
                <Send className="w-3.5 h-3.5" />
                SEND
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
