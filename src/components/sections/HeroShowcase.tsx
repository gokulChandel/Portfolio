'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Terminal,
  Globe2,
  Check,
  Copy,
  Layers,
  Database,
  Network,
  Play,
} from 'lucide-react';
import { gsap } from '@/lib/animations/gsap';

interface HeroShowcaseProps {
  experienceYears: string;
  currentCompany: string;
}

export default function HeroShowcase({
  experienceYears,
  currentCompany,
}: HeroShowcaseProps) {
  const [activeTab, setActiveTab] = useState<'orbits' | 'terminal'>('orbits');
  const [copied, setCopied] = useState(false);
  const [commandOutput, setCommandOutput] = useState<string | null>(null);

  const triggerOrbitBurst = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const chips = gsap.utils.toArray<HTMLElement>('.hero-orbit-chip');
    gsap.to(chips, {
      x: () => gsap.utils.random(-110, 110),
      y: () => gsap.utils.random(-110, 110),
      rotation: () => gsap.utils.random(-45, 45),
      duration: 0.45,
      stagger: 0.02,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(chips, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 1.1,
          stagger: 0.02,
          ease: 'elastic.out(1, 0.4)',
        });
      },
    });
  };

  const copyCodeSnippet = () => {
    const code = `const engineer = {
  name: "Gokul Chandel",
  role: "Full Stack Developer",
  core: ["React.js", "Node.js", "Express.js", "TypeScript", "PostgreSQL", "MongoDB"],
  experience: "${experienceYears}",
  company: "${currentCompany}",
  status: "Available for high-impact roles"
};`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runSampleCommand = () => {
    setCommandOutput('Building scalable architecture... All 18 tests passed. Zero runtime errors!');
    setTimeout(() => setCommandOutput(null), 4000);
  };

  return (
    <div className="hero-visual relative isolate lg:col-span-5 flex flex-col items-center">
      {/* Mode Switcher Pill */}
      <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-4 z-20">
        <button
          type="button"
          onClick={() => setActiveTab('orbits')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
            activeTab === 'orbits'
              ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Globe2 className="w-3.5 h-3.5" />
          <span>Interactive Orbit</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('terminal')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
            activeTab === 'terminal'
              ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Live Terminal</span>
        </button>
      </div>

      {activeTab === 'orbits' ? (
        <button
          type="button"
          className="hero-showcase group relative w-full aspect-square max-w-[340px] sm:max-w-[400px] rounded-full border border-white/[0.08] bg-[#0D1220]/70 flex items-center justify-center cursor-pointer transition-all hover:border-violet-500/40"
          onClick={triggerOrbitBurst}
          aria-label="Click to scatter and gather technology orbits"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.15),transparent_65%)] pointer-events-none" />

          {/* Orbits */}
          <span className="hero-orbit hero-orbit-one" aria-hidden="true" />
          <span className="hero-orbit hero-orbit-two" aria-hidden="true" />
          <span className="hero-orbit hero-orbit-three" aria-hidden="true" />

          {/* Core Nucleus */}
          <span className="hero-orb-core" aria-hidden="true">
            <Sparkles className="h-9 w-9 text-white animate-pulse" />
          </span>

          {/* Orbit Chips */}
          <span className="hero-orbit-chip hero-chip-react shadow-cyan-500/10">React.js</span>
          <span className="hero-orbit-chip hero-chip-next shadow-white/10">Next.js</span>
          <span className="hero-orbit-chip hero-chip-node shadow-emerald-500/10">Node.js</span>
          <span className="hero-orbit-chip hero-chip-data shadow-blue-500/10">PostgreSQL</span>
          <span className="hero-orbit-chip hero-chip-api shadow-violet-500/10">REST APIs</span>
          <span className="hero-orbit-chip hero-chip-ts shadow-blue-500/10">TypeScript</span>

          {/* Bottom Hint */}
          <span className="hero-orbit-prompt">Click orb to scatter stack</span>
        </button>
      ) : (
        /* Terminal View */
        <div className="w-full max-w-[420px] rounded-2xl bg-[#0B0F19] border border-white/[0.12] shadow-2xl shadow-violet-600/10 overflow-hidden font-mono text-left animate-in fade-in zoom-in-95 duration-200">
          {/* Terminal Window Header */}
          <div className="px-4 py-3 bg-[#111827] border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs text-slate-400 font-mono ml-2">gokul@dev:~/stack</span>
            </div>
            <button
              onClick={copyCodeSnippet}
              className="p-1 rounded-md text-slate-400 hover:text-white transition-colors"
              title="Copy snippet"
              aria-label="Copy code snippet"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Terminal Body */}
          <div className="p-4 sm:p-5 text-xs text-slate-300 space-y-2 leading-relaxed overflow-x-auto">
            <p className="text-slate-500">
              <span className="text-emerald-400">➜</span> <span className="text-cyan-400">~/stack</span> git:(main) cat engineer.ts
            </p>
            <div className="space-y-1 font-mono text-[11px] sm:text-xs">
              <p><span className="text-violet-400">const</span> <span className="text-amber-300">engineer</span>: <span className="text-cyan-300">Developer</span> = &#123;</p>
              <p className="pl-4"><span className="text-slate-400">name:</span> <span className="text-emerald-300">&quot;Gokul Chandel&quot;</span>,</p>
              <p className="pl-4"><span className="text-slate-400">role:</span> <span className="text-emerald-300">&quot;Full Stack Developer&quot;</span>,</p>
              <p className="pl-4"><span className="text-slate-400">experience:</span> <span className="text-cyan-300">&quot;{experienceYears}&quot;</span>,</p>
              <p className="pl-4"><span className="text-slate-400">company:</span> <span className="text-emerald-300">&quot;{currentCompany}&quot;</span>,</p>
              <p className="pl-4"><span className="text-slate-400">stack:</span> [<span className="text-cyan-300">&quot;React&quot;</span>, <span className="text-emerald-300">&quot;Node&quot;</span>, <span className="text-blue-300">&quot;TS&quot;</span>, <span className="text-amber-300">&quot;Postgres&quot;</span>],</p>
              <p className="pl-4"><span className="text-slate-400">status:</span> <span className="text-emerald-400 font-semibold">&quot;Ready for impact&quot;</span></p>
              <p>&#125;;</p>
            </div>

            {/* Run Action */}
            <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between gap-2">
              <button
                onClick={runSampleCommand}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 text-[11px] font-mono transition-all cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>test:production</span>
              </button>
              <span className="text-[10px] text-slate-500 font-mono">100% test passing</span>
            </div>

            {commandOutput && (
              <div className="p-2 rounded bg-white/[0.04] border border-white/[0.06] text-[11px] text-emerald-300 font-mono animate-in fade-in">
                {commandOutput}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Micro-Metric Highlights */}
      <div className="hero-showcase-stats mt-4 grid grid-cols-3 gap-2.5 w-full max-w-[420px]">
        <div className="hero-stat-card p-3 rounded-2xl bg-[#111827]/70 border border-white/[0.08] backdrop-blur-md flex flex-col justify-center items-center text-center">
          <Layers className="h-4 w-4 text-violet-400 mb-1" />
          <span className="text-xs font-semibold text-white">{experienceYears} Years</span>
          <span className="text-[10px] text-slate-400 font-mono">Experience</span>
        </div>
        <div className="hero-stat-card p-3 rounded-2xl bg-[#111827]/70 border border-white/[0.08] backdrop-blur-md flex flex-col justify-center items-center text-center">
          <Database className="h-4 w-4 text-cyan-400 mb-1" />
          <span className="text-xs font-semibold text-white">3 Platforms</span>
          <span className="text-[10px] text-slate-400 font-mono">Production</span>
        </div>
        <div className="hero-stat-card p-3 rounded-2xl bg-[#111827]/70 border border-white/[0.08] backdrop-blur-md flex flex-col justify-center items-center text-center">
          <Network className="h-4 w-4 text-emerald-400 mb-1" />
          <span className="text-xs font-semibold text-white">Parkhya</span>
          <span className="text-[10px] text-slate-400 font-mono">Current Org</span>
        </div>
      </div>
    </div>
  );
}
