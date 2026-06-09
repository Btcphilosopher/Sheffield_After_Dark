import React, { useState, useEffect } from "react";
import { Coins, Shield, Award, Sparkles, RefreshCcw, Vote, Grid, ExternalLink, Ticket, Hammer } from "lucide-react";
import { UserWallet, EventItem, VenueItem } from "../types";
import { VENUES } from "../data";

interface Web3DashboardProps {
  wallet: UserWallet;
  onConnect: () => void;
  onMineSteel: () => void;
  isMining: boolean;
  onStakeSteel: (venueId: string, amount: number) => void;
  onMintTicketMemento: () => void;
}

export default function Web3Dashboard({
  wallet,
  onConnect,
  onMineSteel,
  isMining,
  onStakeSteel,
  onMintTicketMemento,
}: Web3DashboardProps) {
  const [stakeVenueId, setStakeVenueId] = useState(VENUES[0].id);
  const [stakeAmount, setStakeAmount] = useState<number>(100);
  const [activeTab, setActiveTab] = useState<"assets" | "mining" | "governance">("assets");
  const [votingSubject, setVotingSubject] = useState({
    voted: false,
    choice: "",
    yesCount: 14200,
    noCount: 4200,
  });

  const handleVote = (choice: "YES" | "NO") => {
    if (votingSubject.voted) return;
    setVotingSubject((prev) => ({
      voted: true,
      choice,
      yesCount: choice === "YES" ? prev.yesCount + 500 : prev.yesCount,
      noCount: choice === "NO" ? prev.noCount + 500 : prev.noCount,
    }));
  };

  const handleStakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stakeAmount <= 0 || wallet.steelBalance < stakeAmount) {
      alert("Insufficient $STEEL balance or invalid staking amount");
      return;
    }
    onStakeSteel(stakeVenueId, stakeAmount);
  };

  return (
    <section id="web3-dashboard-section" className="py-24 px-6 md:px-12 bg-rain-blue border-t border-sheff-slate/40 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12 border-b border-sheff-slate/30 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-signal animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-[#ff7a18] uppercase">
                WEB 3.0 NODE DECK
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-parchment-white">
              Sovereign Ledger & <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-warm-tungsten to-amber-signal">Iron Passports</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-fog-grey font-light max-w-xl mt-2 leading-relaxed">
              Connect your cryptographic passkey, stake native $STEEL tokens to secure local venues, mine rewards with browser cycles, or inspect your unique NFT passes.
            </p>
          </div>

          {!wallet.connected ? (
            <button
              onClick={onConnect}
              className="bg-amber-signal hover:bg-[#ffb15e] text-rain-blue font-mono text-xs font-bold py-3 px-6 rounded-xs transition-all duration-300 tracking-wider uppercase hover:shadow-[0_0_15px_rgba(255,122,24,0.4)]"
              id="wallet-dashboard-connect"
            >
              CONNECT WEB3 GATE
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-steel-navy/80 px-4 py-2 border border-amber-signal/30 text-xs font-mono">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-parchment-white hidden sm:inline">{wallet.address}</span>
              <span className="text-amber-signal font-bold">{wallet.loyaltyLevel.toUpperCase()}</span>
            </div>
          )}
        </div>

        {/* Dashboard Block Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#122638] border border-[#122638] gap-px rounded-xs overflow-hidden shadow-2xl">
          
          {/* LEFT PANEL: Core Web 3.0 Stats & Profile (Spans 4 Columns) */}
          <div className="col-span-1 lg:col-span-4 bg-[#0B1824] p-6 sm:p-8 flex flex-col justify-between h-[450px]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-mono tracking-widest text-[#AAB4BE] uppercase">SAD NETWORK WALLET STATUS</span>
                <span className={`w-2 h-2 rounded-full ${wallet.connected ? "bg-emerald-500 animate-ping" : "bg-rose-500"}`} />
              </div>

              {wallet.connected ? (
                <div className="space-y-6">
                  {/* Connected Profile */}
                  <div className="flex items-center gap-4 border-b border-[#122638] pb-4">
                    <img src={wallet.avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover border border-[#FF5A1F]/50" />
                    <div>
                      <h4 className="font-serif text-lg font-bold text-parchment-white leading-tight">
                        {wallet.username}
                      </h4>
                      <p className="text-[10px] font-mono text-fog-grey/80 mt-1">
                        LEVEL: <span className="text-warm-tungsten font-bold">{wallet.loyaltyLevel}</span>
                      </p>
                    </div>
                  </div>

                  {/* Currencies */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#122638]/40 p-3 rounded-xs border border-[#1D2732]">
                      <span className="text-[9px] font-mono text-[#AAB4BE] block">STEEL TOKENS:</span>
                      <span className="text-xl text-[#FF7A18] font-bold font-mono block mt-1">
                        {wallet.steelBalance}
                      </span>
                      <span className="text-[8px] text-fog-grey/70 font-mono block mt-0.5">LIQUID BALANCE</span>
                    </div>

                    <div className="bg-[#122638]/40 p-3 rounded-xs border border-[#1D2732]">
                      <span className="text-[9px] font-mono text-[#AAB4BE] block">STAKED STEEL:</span>
                      <span className="text-xl text-warm-tungsten font-bold font-mono block mt-1">
                        {wallet.stakedSteel}
                      </span>
                      <span className="text-[8px] text-fog-grey/70 font-mono block mt-0.5">VENUE DELEGATION</span>
                    </div>
                  </div>

                  <p className="text-[10px] font-mono leading-relaxed text-[#AAB4BE] italic">
                    Connected to Sheffield Node #42-SAD. Node latency: 14ms.
                  </p>
                </div>
              ) : (
                <div className="py-16 text-center shadow-none">
                  <Coins className="w-14 h-14 text-[#1D2732] mx-auto stroke-1 animate-pulse mb-4" />
                  <p className="font-serif text-base font-bold text-parchment-white">
                    WALLET DETACHED
                  </p>
                  <p className="text-xs font-mono text-[#AAB4BE] mt-1.5 max-w-xs mx-auto leading-relaxed">
                    Connect your cryptographic MetaMask or direct web gateway to view balances and mint passes.
                  </p>
                </div>
              )}
            </div>

            {wallet.connected && (
              <button
                onClick={onMintTicketMemento}
                disabled={wallet.steelBalance < 50}
                className="w-full bg-[#FF5A1F] hover:bg-[#FF7A18] disabled:bg-[#122638] text-parchment-white disabled:text-[#AAB4BE]/40 py-3 rounded-xs font-mono text-[11px] font-bold uppercase tracking-wider transition-colors border border-[#FF5A1F]/30 flex items-center justify-center gap-2 shadow-lg"
              >
                <Hammer className="w-3.5 h-3.5" />
                MINT STEEL TICK MEMENTO (-50 STEEL)
              </button>
            )}
          </div>

          {/* RIGHT PANEL: Dynamic Tab Deck (Spans 8 Columns) */}
          <div className="col-span-1 lg:col-span-8 bg-[#0B1824] flex flex-col justify-between h-[450px] overflow-hidden">
            
            {/* Tabs Selector Header */}
            <div className="flex bg-[#0B1824] border-b border-[#122638] font-mono text-xs text-fog-grey">
              <button
                onClick={() => setActiveTab("assets")}
                className={`flex-1 py-3 border-r border-[#122638] font-bold transition-all ${
                  activeTab === "assets" ? "bg-[#122638] text-[#FF7A18] border-t-2 border-t-[#FF7A18]" : "hover:text-parchment-white"
                }`}
              >
                [OWNED PASSPORTS ({wallet.ownedNFTs.length})]
              </button>
              <button
                onClick={() => setActiveTab("mining")}
                className={`flex-1 py-3 border-r border-[#122638] font-bold transition-all ${
                  activeTab === "mining" ? "bg-[#122638] text-[#FF7A18] border-t-2 border-t-[#FF7A18]" : "hover:text-parchment-white"
                }`}
              >
                [$STEEL REFINERY MINING]
              </button>
              <button
                onClick={() => setActiveTab("governance")}
                className={`flex-1 py-3 font-bold transition-all ${
                  activeTab === "governance" ? "bg-[#122638] text-[#FF7A18] border-t-2 border-t-[#FF7A18]" : "hover:text-parchment-white"
                }`}
              >
                [STAKING & GOVERNANCE]
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 p-6 overflow-y-auto" id="dashboard-tab-body">
              {/* TAB 1: Owned Assets */}
              {activeTab === "assets" && (
                <div className="h-full">
                  {!wallet.connected ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <Ticket className="w-10 h-10 text-[#1D2732] mb-3 stroke-1" />
                      <p className="font-serif text-sm font-semibold text-fog-grey">
                        NODE DISCONNECTED
                      </p>
                      <p className="text-[11px] font-mono text-[#AAB4BE] max-w-sm mt-1">
                        Connect your credentials to access secured gate tickets and community-owned commemorative badges.
                      </p>
                    </div>
                  ) : wallet.ownedNFTs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <Ticket className="w-10 h-10 text-[#FF5A1F]/50 mb-3 stroke-1 animate-pulse" />
                      <p className="font-serif text-sm font-semibold text-parchment-white">
                        NO ACTIVE MINTS ATTAINED
                      </p>
                      <p className="text-[11px] font-mono text-[#AAB4BE] mt-1 max-w-md leading-relaxed">
                        Secure a ticket from the <span className="text-[#FF7A18] font-bold">Featured Events tonight</span> or click the "Mint Steel Tick Memento" button to draft your own.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#0B1824]">
                      {wallet.ownedNFTs.map((nft) => (
                        <div key={nft.id} className="p-4 bg-[#0B1824] border border-[#1D2732] rounded-xs flex flex-col justify-between font-mono text-[11px] relative overflow-hidden" id={`passport-${nft.id}`}>
                          {/* Top row */}
                          <div className="flex justify-between items-start mb-3 bg-[#0B1824]">
                            <span className={`px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-xs ${
                              nft.rarity === "Legendary"
                                ? "bg-gradient-to-r from-[#FF7A18] to-[#FF5A1F] text-parchment-white"
                                : nft.rarity === "Vip"
                                  ? "bg-warm-tungsten text-rain-blue"
                                  : "bg-[#122638] text-fog-grey border border-[#1D2732]"
                            }`}>
                              [{nft.rarity}] PASS
                            </span>
                            <span className="text-[10px] text-fog-grey/60">ID: {nft.id}</span>
                          </div>

                          <div>
                            <h5 className="font-serif text-[13px] font-bold text-parchment-white leading-tight">
                              {nft.ticketName}
                            </h5>
                            <p className="text-fog-grey text-[10px] mt-1 italic">
                              MINT: {nft.mintDate}
                            </p>
                          </div>

                          <div className="mt-5 pt-3 border-t border-[#122638] flex justify-between items-center text-[9px]">
                            <span className="text-emerald-400">URI: {nft.metadataURI}</span>
                            <span className="text-[#FF5A1F] font-bold">VERIFIED ON-LEDGER</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: STEEL Miner */}
              {activeTab === "mining" && (
                <div className="flex flex-col justify-between h-full font-mono text-xs" id="mining-pane">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-parchment-white mb-2">
                      SAD Token Refinery
                    </h4>
                    <p className="font-sans text-xs text-[#AAB4BE] leading-relaxed font-light mb-6">
                      Sheffield After Dark is a community-owned operating system. Mine native $STEEL utility tokens by allocating CPU computation to back cryptographic security. Claim tokens to buy event entry.
                    </p>

                    {isMining && (
                      <div className="bg-[#0B1824] p-4 border border-[#1D2732] rounded-xs mb-6 flex flex-col gap-3">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-[#FF7A18] animate-pulse block font-bold">HASH COMPUTATION STREAM ACTIVE</span>
                          <span className="text-[#AAB4BE]">HASH DIFF: 4096-SAD</span>
                        </div>
                        {/* Hashing animated strip */}
                        <div className="bg-[#122638]/50 h-5 px-2 p-0.5 rounded-sm overflow-hidden flex items-center relative border border-[#1D2732] font-mono text-[9px] text-emerald-400">
                          <span className="animate-pulse font-semibold">0x8a1b2c4d... Mining block hashes 3.2M h/s...</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#122638]">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#122638] p-2 border border-[#1D2732] rounded-xs">
                        <Coins className="w-5 h-5 text-[#FF7A18]" />
                      </div>
                      <div>
                        <span className="text-[10px] text-fog-grey font-bold">ACCUMULATED REFINERY POOL:</span>
                        <span className="text-sm text-parchment-white block font-bold font-mono">10 STEEL DROP / MINUTE</span>
                      </div>
                    </div>

                    {wallet.connected ? (
                      <button
                        onClick={onMineSteel}
                        className={`px-5 py-2.5 rounded-xs font-mono font-bold text-[11px] uppercase tracking-wider transition-colors border ${
                          isMining
                            ? "bg-[#FF7A18] hover:bg-[#FFB15E] text-rain-blue border-[#FF7A18]"
                            : "bg-transparent text-parchment-white hover:text-[#FF7A18] hover:bg-[#FF7A18]/5 border-[#1D2732]"
                        }`}
                        id="dashboard-mine-btn"
                      >
                        {isMining ? "STOP REFINING CORE" : "START REFINERY BLOCK"}
                      </button>
                    ) : (
                      <span className="text-[10px] text-rose-500 italic">GATE DISCONNECTED</span>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: Staking & Budget delegation */}
              {activeTab === "governance" && (
                <div className="flex flex-col justify-between h-full font-mono text-xs" id="governance-pane">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-parchment-white mb-2">
                      Sovereign Staking & Vote Node
                    </h4>
                    <p className="font-sans text-xs text-[#AAB4BE] leading-relaxed font-light mb-6">
                      Decide where treasury budgets are spent. Allocate direct staking pools to support your favorite clubs against inflation, or cast votes on open licensing ballots.
                    </p>

                    {/* Staking mini form (only if connected) */}
                    {wallet.connected ? (
                      <form onSubmit={handleStakeSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end bg-[#0B1824] p-4 border border-[#1D2732] rounded-xs mb-6">
                        <div className="sm:col-span-6 flex flex-col gap-1">
                          <span className="text-[9px] text-[#AAB4BE] uppercase">SELECT NIGHT NODE:</span>
                          <select
                            value={stakeVenueId}
                            onChange={(e) => setStakeVenueId(e.target.value)}
                            className="bg-[#0B1824] border border-[#1D2732] px-3 py-2 text-xs font-mono rounded-xs text-parchment-white focus:outline-none focus:border-[#FF7A18] cursor-pointer"
                          >
                            {VENUES.map((v) => (
                              <option key={v.id} value={v.id} className="bg-[#122638] text-xs text-parchment-white">{v.name} ({v.area})</option>
                            ))}
                          </select>
                        </div>

                        <div className="sm:col-span-4 flex flex-col gap-1">
                          <span className="text-[9px] text-[#AAB4BE] uppercase">STAKE AMOUNT:</span>
                          <input
                            type="number"
                            min="20"
                            max={wallet.steelBalance}
                            value={stakeAmount}
                            onChange={(e) => setStakeAmount(Number(e.target.value))}
                            className="bg-[#0B1824] border border-[#1D2732] px-3 py-2 text-xs font-mono rounded-xs text-parchment-white focus:outline-none focus:border-[#FF7A18]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="sm:col-span-2 bg-[#FF7A18] hover:bg-[#FFB15E] text-rain-blue font-bold px-3 py-2 text-xs font-mono uppercase tracking-wider rounded-xs transition-colors"
                        >
                          STAKE
                        </button>
                      </form>
                    ) : (
                      <div className="p-4 text-center bg-[#0B1824] border border-[#1D2732] rounded-xs mb-6 text-[#AAB4BE] text-[11px] italic">
                        STAKING MODULE LOCKED until crypto gateway is online.
                      </div>
                    )}
                  </div>

                  {/* Ballot proposal query */}
                  <div className="pt-4 border-t border-[#122638]">
                    <span className="text-[9px] text-[#AAB4BE] uppercase block mb-1">PROPOSAL DECK #09:</span>
                    <p className="text-[11px] text-parchment-white font-serif leading-snug">
                      Should we authorize a 15,000 $STEEL sub-bass grant to PLOT 22 for upgrading their custom voice-valve horn subwoofers?
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      {votingSubject.voted ? (
                        <div className="text-[10px] text-emerald-400 font-bold bg-[#0B1824] border border-emerald-400/30 px-3 py-1 uppercase rounded-xs">
                          ✓ VOTE SPLICED: {votingSubject.choice} ({wallet.username})
                        </div>
                      ) : wallet.connected ? (
                        <div className="flex gap-2">
                          <button onClick={() => handleVote("YES")} className="bg-[#122638] text-emerald-400 hover:bg-emerald-900/50 border border-emerald-400/30 px-3 py-1 font-bold rounded-xs transition-colors">
                            YES (YES GRANTS)
                          </button>
                          <button onClick={() => handleVote("NO")} className="bg-[#122638] text-rose-400 hover:bg-rose-900/50 border border-rose-500/30 px-3 py-1 font-bold rounded-xs transition-colors">
                            NO (REJECT)
                          </button>
                        </div>
                      ) : (
                        <span className="text-[9px] text-[#FF5A1F] italic bg-[#FF5A1F]/5 px-2 py-0.5 border border-[#FF5A1F]/10 rounded-xs">CONNECT CRYPTO PASSPORT TO BALLOT VOTE</span>
                      )}

                      <div className="flex items-center gap-3 text-[10px] text-[#AAB4BE]/70 ml-auto font-mono">
                        <span>YES: {votingSubject.yesCount} POWER</span>
                        <span>NO: {votingSubject.noCount} POWER</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom OS log disclaimer */}
            <div className="bg-[#0B1824] px-6 py-2 border-t border-[#122638] flex justify-between text-[9px] font-mono text-fog-grey/75 font-semibold">
              <span>SAD CONTRACT PROTOCOL v4.9.1 // DECENTRALIZED REWARD SECURED</span>
              <span>STABILITY CLOUD STATE: OPTIMAL</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
