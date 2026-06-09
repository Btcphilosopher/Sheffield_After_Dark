import React, { useState } from "react";
import { BookOpen, X, Clock, Calendar, ChevronRight, User } from "lucide-react";
import { ArticleItem } from "../types";
import { ARTICLES } from "../data";
import { motion, AnimatePresence } from "motion/react";

export default function CityJournal() {
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  return (
    <section id="city-journal-section" className="py-24 px-6 md:px-12 bg-sheff-slate/20 border-t border-b border-sheff-slate/40 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12 border-b border-sheff-slate/30 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-copper animate-ping" />
              <span className="text-xs font-mono tracking-widest text-[#ff5a1f] uppercase">
                THE CRUCIBLE DISPATCH
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-parchment-white">
              City Journal & <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-warm-tungsten via-amber-signal to-electric-copper">Sound Chronicles</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-fog-grey font-light max-w-xl mt-2 leading-relaxed">
              Long-form music journalism and historical audits examining how heavy iron machinery and brick ovens fueled generations of electronic rebellion.
            </p>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-fog-grey bg-[#0b1824]/80 py-1.5 px-3 border border-sheff-slate/40 uppercase hidden md:inline">
            VOLUME IV // PRINT & PIXELS
          </span>
        </div>

        {/* Longform Journal Cards Layout (Magazine Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-[#122638] border border-[#122638] rounded-xs overflow-hidden shadow-2xl" id="journal-magazine-grid">
          {/* Featured Article Cover (Spans 7 Columns) */}
          {(() => {
            const feat = ARTICLES.find((a) => a.featured) || ARTICLES[0];
            return (
              <div className="col-span-1 lg:col-span-7 flex flex-col justify-between bg-[#0B1824] p-6 sm:p-8 group hover:bg-[#1D2732]/20 transition-all duration-500">
                <div className="relative w-full h-64 sm:h-80 overflow-hidden mb-6 bg-[#0B1824] rounded-xs border border-[#1D2732]">
                  <img
                    src={feat.cover}
                    alt={feat.title}
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-102 group-hover:brightness-90 transition-all duration-750"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rain-blue via-transparent to-transparent opacity-90" />
                  <span className="absolute bottom-4 left-4 font-mono text-[9px] bg-[#FF7A18] text-rain-blue font-bold tracking-widest px-2.5 py-1 uppercase rounded-xs shadow-[0_0_8px_#FF7A18]">
                    FEATURED ESSAY
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-4 text-[10px] font-mono text-fog-grey mb-3">
                    <span className="text-warm-tungsten">{feat.category}</span>
                    <span>●</span>
                    <span>{feat.readTime}</span>
                    <span>●</span>
                    <span>{feat.date}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-parchment-white group-hover:text-[#FF7A18] transition-colors mb-4 leading-tight">
                    {feat.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#AAB4BE] leading-relaxed font-light mb-6">
                    {feat.snippet}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-5 border-t border-[#122638]">
                  <span className="font-mono text-[11px] text-parchment-white font-medium flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#FF5A1F]" />
                    BY {feat.author.toUpperCase()}
                  </span>
                  
                  <button
                    onClick={() => setSelectedArticle(feat)}
                    className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#FF7A18] hover:text-[#FFB15E] transition-colors group/btn"
                    id={`art-btn-${feat.id}`}
                  >
                    READ ARTICLE
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Secondary Journal Entries (Spans 5 Columns) */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-px bg-[#122638]">
            {ARTICLES.filter((a) => !a.featured).map((art) => (
              <div
                key={art.id}
                className="bg-[#0B1824] p-6 group hover:bg-[#1D2732]/20 transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-[#AAB4BE] mb-2.5">
                    <span className="text-warm-tungsten font-bold">{art.category}</span>
                    <span>●</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-parchment-white group-hover:text-[#FF7A18] transition-colors leading-tight mb-2">
                    {art.title}
                  </h4>

                  <p className="font-sans text-xs text-[#AAB4BE] leading-relaxed font-light mb-4 line-clamp-2">
                    {art.snippet}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-[#122638]">
                  <span className="font-mono text-[10px] text-fog-grey uppercase">
                    By {art.author}
                  </span>
                  
                  <button
                    onClick={() => setSelectedArticle(art)}
                    className="font-mono text-[11px] font-bold text-[#FF7A18] hover:text-white flex items-center gap-1 transition-colors"
                    id={`art-btn-${art.id}`}
                  >
                    Read Drawer
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Print Issue teaser block */}
            <div className="bg-[#122638] p-6 font-mono text-xs relative overflow-hidden flex flex-col justify-between h-[120px]">
              <div className="absolute top-[-10px] right-[-10px] w-24 h-24 bg-[#FF5A1F]/5 blur-xl rounded-full" />
              <div>
                <span className="text-[10px] text-[#FF7A18] font-bold uppercase tracking-widest">
                  STREET RELEASES OUT NOW
                </span>
                <p className="text-[11px] text-[#AAB4BE] mt-1.5 font-sans font-light leading-relaxed">
                  Collect free Physical Pamphlets at Kelham Island Tavern or PLOT 22 this week. Verified passes secure immediate copy.
                </p>
              </div>
              <span className="text-[10px] text-warm-tungsten underline cursor-pointer hover:text-parchment-white mt-2 inline-block">
                View Archive Logs (404 Offline)
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* FULL CATHEDRAL READING DRAWER (Modal style Overlay) */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex justify-end bg-rain-blue/80 backdrop-blur-md" id="article-reader-root">
            {/* Clickable Backdrop to Close */}
            <div className="absolute inset-0" onClick={() => setSelectedArticle(null)} />

            {/* Sliding Drawer Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="relative w-full max-w-2xl h-full bg-[#0b1824] border-l border-sheff-slate/40 flex flex-col justify-between z-10 shadow-3xl text-parchment-white"
            >
              {/* Header inside drawer */}
              <div className="px-6 py-4 border-b border-sheff-slate/40 flex items-center justify-between bg-rain-blue/95 sticky top-0 z-10">
                <span className="text-[10px] font-mono tracking-widest text-[#ff5a1f]">
                  ARTICLE / DRAWER: {selectedArticle.id.toUpperCase()}
                </span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1 px-2.5 bg-steel-navy hover:bg-sheff-slate text-fog-grey hover:text-white font-mono text-xs border border-sheff-slate"
                  id="close-reader-btn"
                >
                  [Esc] CLOSE ×
                </button>
              </div>

              {/* Scrollable Reading view */}
              <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-10" id="article-scroll-pane">
                {/* Meta details */}
                <div className="flex items-center gap-3 text-[11px] font-mono text-[#ffb15e] mb-2">
                  <span>{selectedArticle.category}</span>
                  <span>●</span>
                  <span>{selectedArticle.readTime}</span>
                </div>

                {/* Main Heading styled elegantly in serif */}
                <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight mb-6">
                  {selectedArticle.title}
                </h3>

                {/* Author card details */}
                <div className="flex items-center gap-3 border-t border-b border-sheff-slate/30 py-3 mb-8 text-xs font-mono text-fog-grey">
                  <div className="w-8 h-8 rounded-full bg-steel-navy flex items-center justify-center font-bold text-parchment-white border border-[#ff5a1f]/40">
                    {selectedArticle.author[0]}
                  </div>
                  <div>
                    <span className="block text-parchment-white font-semibold">BY {selectedArticle.author.toUpperCase()}</span>
                    <span>RECORDED ON {selectedArticle.date}</span>
                  </div>
                </div>

                {/* Cover Image inside drawer */}
                <img
                  src={selectedArticle.cover}
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover rounded-xs border border-sheff-slate/40 mb-8 grayscale brightness-90 shadow-md"
                />

                {/* Essay core text paragraphs (Drop cap on first) */}
                <div className="font-sans text-[13px] sm:text-[14.5px] leading-relaxed text-parchment-white/85 space-y-6 font-light">
                  {selectedArticle.content.map((para, pIdx) => (
                    <p key={pIdx}>
                      {pIdx === 0 ? (
                        <>
                          <span className="font-serif text-5xl font-bold float-left mr-2.5 mt-1 text-[#ff7a18] leading-[0.8] font-bold">
                            {para[0]}
                          </span>
                          {para.slice(1)}
                        </>
                      ) : (
                        para
                      )}
                    </p>
                  ))}
                </div>

                {/* Elegant conclusion divider */}
                <div className="mt-12 pt-6 border-t border-sheff-slate/30 text-center font-mono text-[9px] text-fog-grey">
                  ● SHEFFIELD AFTER DARK // ALL RIGHTS RESERVED 2026 ●
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
