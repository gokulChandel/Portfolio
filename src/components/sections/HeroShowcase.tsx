'use client';

import React, { useState } from 'react';
import { Sparkles, Globe2, Layers, Database, Network } from 'lucide-react';
import { Skill } from '@/types';

interface HeroShowcaseProps {
  experienceYears: string;
  currentCompany: string;
  skills: Skill[];
}

const featuredSkillNames = [
  'React.js',
  'Next.js',
  'Node.js',
  'Express.js',
  'TypeScript',
  'PostgreSQL',
  'MongoDB',
  'REST APIs',
  'AWS',
  'JavaScript',
  'Tailwind CSS',
  'Docker',
  'Git',
];

const skillColors = [
  'hero-chip-react',
  'hero-chip-next',
  'hero-chip-node',
  'hero-chip-data',
  'hero-chip-api',
  'hero-chip-ts',
];

const outerOrbitRadius = 38;
const gatheredOrbitRadii = [35, 29, 23];
const gatheredOrbitOffsets = [0, 45, 22.5];
const orbitDuration = 38;

export default function HeroShowcase({
  experienceYears,
  currentCompany,
  skills,
}: HeroShowcaseProps) {
  const [skillsSpread, setSkillsSpread] = useState(true);
  const skillsByName = new Map(skills.map((skill) => [skill.name.toLowerCase(), skill]));
  const orbitalSkills = featuredSkillNames
    .map((name) => skillsByName.get(name.toLowerCase()))
    .filter((skill): skill is Skill => skill !== undefined);

  return (
    <div className="hero-visual relative isolate lg:col-span-5 flex flex-col items-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[0.08] px-3.5 py-1.5 font-mono text-xs font-medium text-violet-200">
        <Globe2 className="h-3.5 w-3.5 text-cyan-300" />
        <span>Interactive Orbit</span>
      </div>
      <button
        type="button"
        aria-expanded={skillsSpread}
        aria-label={skillsSpread ? 'Gather skills into the globe core' : 'Spread skills across the globe'}
        className={`hero-showcase group relative w-full aspect-square max-w-[340px] sm:max-w-[400px] rounded-full border border-white/[0.08] bg-[#0D1220]/70 flex items-center justify-center ${skillsSpread ? 'is-expanded' : ''}`}
        onClick={() => setSkillsSpread((spread) => !spread)}
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.15),transparent_65%)] pointer-events-none" />
        <span className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <span className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <span className="hero-orbit hero-orbit-three" aria-hidden="true" />
        <span className="hero-orb-core" aria-hidden="true">
          <Sparkles className="h-9 w-9 text-white animate-pulse" />
        </span>
        <span className="hero-skill-orbit hero-skill-orbit-outer" aria-hidden="true">
          {orbitalSkills.map((skill, index) => {
            const gatheredOrbitIndex = index % gatheredOrbitRadii.length;
            const gatheredOrbitPosition = Math.floor(index / gatheredOrbitRadii.length);
            const gatheredOrbitSkillCount = Math.ceil(
              (orbitalSkills.length - gatheredOrbitIndex) / gatheredOrbitRadii.length
            );
            const angle = skillsSpread
              ? (index / orbitalSkills.length) * 360
              : (gatheredOrbitPosition / gatheredOrbitSkillCount) * 360 +
                gatheredOrbitOffsets[gatheredOrbitIndex];
            return (
              <span
                className="hero-skill-node"
                key={skill.id}
                style={{
                  '--skill-angle': `${angle}deg`,
                  '--skill-radius': `${skillsSpread ? outerOrbitRadius : gatheredOrbitRadii[gatheredOrbitIndex]}cqi`,
                  '--orbit-duration': `${orbitDuration}s`,
                } as React.CSSProperties}
              >
                <span className={`hero-orbit-chip hero-skill-label ${skillColors[index % skillColors.length]}`}>
                  {skill.name}
                </span>
              </span>
            );
          })}
        </span>
        <span className="hero-orbit-prompt">
          {skillsSpread ? 'Tap orb to gather skills' : 'Tap orb to spread skills'}
        </span>
      </button>

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
          <span className="text-xs font-semibold text-white">{currentCompany}</span>
          <span className="text-[10px] text-slate-400 font-mono">Current Org</span>
        </div>
      </div>
    </div>
  );
}
