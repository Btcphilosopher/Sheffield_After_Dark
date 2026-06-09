import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, Volume2, Music, Shuffle, Radio, Award, Activity } from "lucide-react";
import { TrackItem } from "../types";
import { TRACKS } from "../data";

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSynthActive, setIsSynthActive] = useState(false);
  const [tempo, setTempo] = useState(128);
  const [filterFreq, setFilterFreq] = useState(800);
  const [bassMod, setBassMod] = useState(60);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{
    osc1: OscillatorNode;
    osc2: OscillatorNode;
    filter: BiquadFilterNode;
    gain: GainNode;
    lfo: OscillatorNode;
  } | null>(null);

  const animationRef = useRef<number | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  // Stop synthetic audio on unmount
  useEffect(() => {
    return () => {
      stopSynthesizer();
    };
  }, []);

  // Web Audio Synthesizer Loop Generator
  const initSynthesizer = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // 1. Oscillators mimicking old synth chips (e.g. Roland TB-303 or EMS VCS3 used in Sheffield)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      
      osc1.type = "sawtooth";
      osc2.type = "triangle";

      // Root notes centered around heavy bass (C2 = 65.41Hz, G2 = 98.00Hz, etc.)
      const freq1 = currentTrack.bpm === 140 ? 55.00 : 65.41; // A1 or C2
      osc1.frequency.setValueAtTime(freq1, ctx.currentTime);
      osc2.frequency.setValueAtTime(freq1 * 1.5, ctx.currentTime); // G2 fifth offset

      // 2. Filter network
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(filterFreq, ctx.currentTime);
      filter.Q.setValueAtTime(8, ctx.currentTime);

      // LFO for filter sweeps (giving that foggy darkwave pulse)
      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(0.5, ctx.currentTime); // 0.5Hz sweep
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(250, ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      // 3. Amplifier envelope and delay hook
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.08, ctx.currentTime); // Safe amplitude

      // Routing
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Start oscillators
      osc1.start();
      osc2.start();
      lfo.start();

      synthNodesRef.current = { osc1, osc2, filter, gain: gainNode, lfo };
      setIsSynthActive(true);
      setIsPlaying(true);
    } catch (err) {
      console.warn("Failed to boot audio context: ", err);
    }
  };

  const stopSynthesizer = () => {
    if (synthNodesRef.current) {
      try {
        synthNodesRef.current.osc1.stop();
        synthNodesRef.current.osc2.stop();
        synthNodesRef.current.lfo.stop();
        synthNodesRef.current.osc1.disconnect();
        synthNodesRef.current.osc2.disconnect();
        synthNodesRef.current.filter.disconnect();
        synthNodesRef.current.gain.disconnect();
      } catch (e) {}
      synthNodesRef.current = null;
    }
    setIsSynthActive(false);
    setIsPlaying(false);
  };

  // Adjust live synth filter parameters via sliders
  const handleFilterSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setFilterFreq(val);
    if (synthNodesRef.current && audioCtxRef.current) {
      synthNodesRef.current.filter.frequency.setValueAtTime(val, audioCtxRef.current.currentTime);
    }
  };

  const handleBassSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setBassMod(val);
    if (synthNodesRef.current && audioCtxRef.current) {
      // Modify second oscillator detune
      synthNodesRef.current.osc2.detune.setValueAtTime(val * 4, audioCtxRef.current.currentTime);
    }
  };

  // Toggle audio engine
  const handlePlayPause = () => {
    if (isSynthActive) {
      stopSynthesizer();
    } else {
      initSynthesizer();
    }
  };

  const selectTrack = (index: number) => {
    stopSynthesizer();
    setCurrentTrackIndex(index);
    setTempo(TRACKS[index].bpm);
  };

  // Oscilloscope Canvas Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let localFrameId: number;
    let phase = 0;

    const render = () => {
      // Clear canvas with deep slate background
      ctx.fillStyle = "#0c151e";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle grids
      ctx.strokeStyle = "rgba(29, 39, 50, 0.4)";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw synthetic waveform path based on isPlaying state
      ctx.beginPath();
      // Waveform is vibrant amber, copper or green
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, "#FF5A1F"); // Electric copper
      gradient.addColorStop(0.5, "#FF7A18"); // Amber signal
      gradient.addColorStop(1, "#FFB15E"); // Warm Tungsten
      ctx.strokeStyle = gradient;
      ctx.lineWidth = isPlaying ? 2 : 1;

      phase += isPlaying ? (tempo / 250) : 0.05;

      const halfHeight = canvas.height / 2;
      for (let x = 0; x < canvas.width; x++) {
        // Multi-frequency wave formula mimicking our industrial sub-synthesizer
        let y = 0;
        if (isPlaying) {
          // Complex synthetic sum of sines + simulated noise spikes
          const harmonic1 = Math.sin(x * 0.035 - phase) * 20;
          const harmonic2 = Math.sin(x * 0.08 + phase * 1.5) * 8;
          const subBass = Math.sin(x * 0.012 - phase * 0.4) * (bassMod / 3.5);
          const filterSweep = Math.sin(phase * 0.1) * (filterFreq / 150);
          y = halfHeight + harmonic1 + harmonic2 + subBass + filterSweep;
        } else {
          // Flattened ambient ripple
          y = halfHeight + Math.sin(x * 0.02 - phase) * 2;
        }

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw digital cursor indicators
      if (isPlaying) {
        ctx.fillStyle = "#FF7A18";
        ctx.font = "8px monospace";
        ctx.fillText(`OSC Freq: ${filterFreq}Hz`, 10, 15);
        ctx.fillText(`LFO Sweep: DETUNE ${bassMod * 4} cents`, 10, 27);
        ctx.fillText(`BPM Sync: ${tempo} Hz`, canvas.width - 120, 15);
      } else {
        ctx.fillStyle = "#AAB4BE";
        ctx.font = "8.5px monospace";
        ctx.fillText("SYNTH INTEGRATION STANDBY", 10, 16);
      }

      localFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(localFrameId);
    };
  }, [isPlaying, tempo, filterFreq, bassMod]);

  return (
    <section id="music-section" className="py-24 px-6 border-t border-sheff-slate/40 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-copper" />
              <span className="text-xs font-mono tracking-widest text-[#ff5a1f] uppercase block">
                NOCTURNAL BROADCASTS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight font-bold text-parchment-white">
              Sheffield Synth <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-warm-tungsten to-amber-signal">Soundboard</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-fog-grey font-light max-w-lg mt-2">
              Synthesize your own darkwave machine loop or select local artist mixes. Our custom digital oscillator imitates early industrial instruments.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-amber-signal bg-steel-navy/60 px-3 py-1.5 border border-sheff-slate/40">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>NODE BEAT BROADCAST ONLINE</span>
          </div>
        </div>

        {/* Live Audio Rack Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#122638] border border-[#122638] gap-px rounded-xs overflow-hidden shadow-2xl">
          {/* LEFT: Channel Selector & Custom Waveform Console */}
          <div className="col-span-1 lg:col-span-8 p-6 md:p-8 bg-[#0B1824] flex flex-col justify-between gap-6">
            
            {/* Visualizer Frame */}
            <div className="relative border border-[#1D2732] bg-[#0c151e]" id="oscilloscope-rack">
              <div className="absolute top-2 left-3 flex items-center gap-1.5 text-xs font-mono text-fog-grey bg-[#0c151e]/80 py-1 px-1.5 rounded-xs border border-[#1D2732] z-10">
                <Activity className="w-3.5 h-3.5 text-[#FF7A18]" />
                <span>SHEFFIELD DIGITAL OSCILLOSCOPE CLOUD</span>
              </div>
              
              <canvas
                ref={canvasRef}
                width={800}
                height={220}
                className="w-full h-44 sm:h-52 object-cover block"
              />
            </div>

            {/* Synthesizer parameter controls (FOS & LFO) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#122638]/30 p-4 rounded-xs border border-[#1D2732] font-mono text-xs text-parchment-white">
              {/* Slider 1 */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-fog-grey">
                  <span>LP FILTER CUTOFF [POTENTIOMETER]:</span>
                  <span className="text-[#FF7A18] font-bold">{filterFreq} Hz</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="2800"
                  step="10"
                  value={filterFreq}
                  onChange={handleFilterSlider}
                  disabled={!isSynthActive}
                  className="w-full accent-[#FF7A18] h-1.5 rounded-lg bg-[#122638] cursor-pointer disabled:opacity-45"
                />
                <span className="text-[9px] text-[#AAB4BE]">Warp-sweeping lowpass filter on primary modular signal.</span>
              </div>

              {/* Slider 2 */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-fog-grey">
                  <span>CHIP DETUNE [BASS OSCILIATION]:</span>
                  <span className="text-[#FF7A18] font-bold">{bassMod * 4} CENTS</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="150"
                  step="1"
                  value={bassMod}
                  onChange={handleBassSlider}
                  disabled={!isSynthActive}
                  className="w-full accent-[#FF5A1F] h-1.5 rounded-lg bg-[#122638] cursor-pointer disabled:opacity-45"
                />
                <span className="text-[9px] text-[#AAB4BE]">Adds chest resonance by shifting the secondary tri-base wave.</span>
              </div>
            </div>

            {/* Tactical hardware layout buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-[#122638]">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePlayPause}
                  className={`w-14 h-14 rounded-full flex items-center justify-center border shadow-lg transition-all duration-300 ${
                    isPlaying
                      ? "bg-[#FF7A18] border-parchment-white text-rain-blue hover:shadow-[0_0_20px_rgba(255,122,24,0.5)]"
                      : "bg-[#0B1824] border-[#1D2732] text-parchment-white hover:border-[#FF7A18] hover:text-[#FF7A18]"
                  }`}
                  id="synth-boot-big-btn"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  )}
                </button>

                <div>
                  <h4 className="font-serif text-lg font-bold text-parchment-white">
                    {isSynthActive ? "GEN-LOOP ACTIVE: " + currentTrack.title : currentTrack.title}
                  </h4>
                  <p className="text-xs font-mono text-[#AAB4BE]">
                    {currentTrack.artist} // GENRE: {currentTrack.genre} // BPM: {currentTrack.bpm}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex flex-col items-end">
                  <span className="text-[#AAB4BE] text-[10px]">CURRENT MODE:</span>
                  <span className="text-[#FF7A18] font-bold uppercase mt-0.5">
                    {isSynthActive ? "WEBAUDIO SYNTH" : "SIGNAL STANDBY"}
                  </span>
                </div>
                {isSynthActive ? (
                  <button
                    onClick={stopSynthesizer}
                    className="bg-rose-950/40 hover:bg-rose-900/50 text-rose-400 border border-rose-500/30 px-3 py-1.5 uppercase text-[10px] uppercase font-bold"
                  >
                    Mute Synth
                  </button>
                ) : (
                  <button
                    onClick={initSynthesizer}
                    className="bg-[#FF7A18]/15 hover:bg-[#FF7A18]/30 text-[#FF7A18] border border-[#FF7A18]/30 px-3 py-1.5 uppercase text-[10px] uppercase font-bold"
                  >
                    Boot Synth
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Master Wave Playlist Rail */}
          <div className="col-span-1 lg:col-span-4 p-6 md:p-8 bg-[#0B1824] flex flex-col gap-4 font-mono text-xs">
            <span className="text-[10px] tracking-widest text-[#AAB4BE] uppercase block mb-2">
              STATIONS & CHANNELS AVAILABLE:
            </span>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1" id="track-playlist">
              {TRACKS.map((t, idx) => {
                const isSelected = currentTrackIndex === idx;
                return (
                  <button
                    key={t.id}
                    onClick={() => selectTrack(idx)}
                    className={`w-full text-left p-3 border rounded-xs flex items-center gap-3 transition-all duration-300 ${
                      isSelected
                        ? "bg-[#122638] border-[#FF7A18]/60 text-parchment-white"
                        : "bg-[#0B1824] border-[#1D2732] hover:border-warm-tungsten text-fog-grey"
                    }`}
                  >
                    <div className="relative w-10 h-10 bg-[#122638] flex items-center justify-center rounded-xs overflow-hidden flex-shrink-0 border border-[#1D2732]">
                      <img src={t.cover} alt={t.title} className="w-full h-full object-cover" />
                      {isSelected && isPlaying && (
                        <div className="absolute inset-0 bg-rain-blue/80 flex items-center justify-center">
                          <Music className="w-4.5 h-4.5 text-[#FF7A18] animate-bounce" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h5 className="font-serif text-[12px] font-semibold text-parchment-white truncate leading-tight">
                          {t.title}
                        </h5>
                        <span className="text-[10px] text-fog-grey/70">{t.duration}</span>
                      </div>
                      <p className="text-[10px] text-[#AAB4BE] truncate mt-0.5">{t.artist}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[9px] bg-[#122638] text-warm-tungsten px-1 py-0.5 border border-[#1D2732]">
                          {t.bpm} BPM
                        </span>
                        <span className="text-[9px] text-[#AAB4BE]/60">
                          {t.genre}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="bg-[#0B1824] p-3 text-[10px] leading-relaxed text-[#AAB4BE]/80 border border-[#122638]">
              <span className="font-bold text-[#FF7A18] uppercase block mb-1">PRO-TIP:</span>
              Once you click <span className="text-parchment-white">Boot Synth</span>, try moving the filter cutoff and pitch sliders. Our synthesizer uses standard lowpass resonant filters!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
