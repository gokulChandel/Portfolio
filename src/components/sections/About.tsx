'use client';

import React, { useRef } from 'react';
import {
  Briefcase,
  Layers,
  Code2,
  Server,
  MapPin,
  Building,
  Target,
  Compass,
} from 'lucide-react';
import { useGSAP, gsap } from '@/lib/animations/gsap';
import { usePointerTilt } from '@/lib/animations/usePointerTilt';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { Profile } from '@/types';

const careerRoleColors = [
  'border-violet-400/30 bg-violet-500/10 text-violet-200',
  'border-cyan-400/30 bg-cyan-500/10 text-cyan-200',
  'border-emerald-400/30 bg-emerald-500/10 text-emerald-200',
  'border-sky-400/30 bg-sky-500/10 text-sky-200',
  'border-amber-400/30 bg-amber-500/10 text-amber-200',
  'border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-200',
];

interface AboutProps {
  profile: Profile;
}

export default function About({ profile }: AboutProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      gsap.from('.about-header', {
        scrollTrigger: {
          trigger: '.about-header',
          start: 'top 85%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.about-grid', {
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 80%',
        },
        opacity: 0,
        y: 18,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.about-text', {
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  const iconMap: Record<string, React.ReactNode> = {
    Briefcase: <Briefcase className="w-5 h-5 text-violet-400" />,
    Layers: <Layers className="w-5 h-5 text-cyan-400" />,
    Code2: <Code2 className="w-5 h-5 text-emerald-400" />,
    Server: <Server className="w-5 h-5 text-amber-400" />,
  };
  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-28 bg-[#0D1220]/60 border-t border-b border-white/[0.04]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="about-header text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono text-violet-400 uppercase tracking-widest px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 inline-block">
            {profile.about_label}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [overflow-wrap:anywhere]">
            {profile.about_heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {profile.about_description}
          </p>
        </div>

        {/* 4 Summary Highlight Cards */}
        <div className="about-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {profile.highlights.map((item, idx) => (
            <AboutHighlightCard
              key={idx}
              item={item}
              icon={iconMap[item.icon] || <Code2 className="w-5 h-5 text-violet-400" />}
            />
          ))}
        </div>

        {/* Main Content: Bio & Objectives */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Detailed Paragraphs */}
          <div className="about-text lg:col-span-7 space-y-5 text-slate-300 text-sm sm:text-base leading-relaxed">
            {profile.about_paragraphs.map((p, idx) => (
              <p key={idx} className="bg-transparent">
                {p}
              </p>
            ))}

            {/* Current Work & Location Meta */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
                <Building className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 block font-mono">Current Organization</span>
                  <span className="text-sm font-semibold text-slate-100">{profile.current_company}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 block font-mono">Location</span>
                  <span className="text-sm font-semibold text-slate-100">{profile.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Career Target & Primary Expertise */}
          <div className="lg:col-span-5 space-y-6">
            {/* Career Targets */}
            <div className="p-6 rounded-2xl bg-[#111827]/80 border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-4 text-violet-400 font-semibold text-sm">
                <Target className="w-4 h-4" />
                <span>Career Target Roles</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.career_targets.map((role, idx) => (
                  <span
                    key={idx}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold tracking-wide ${careerRoleColors[idx % careerRoleColors.length]}`}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Primary Expertise */}
            <div className="p-6 rounded-2xl bg-[#111827]/80 border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-4 text-cyan-400 font-semibold text-sm">
                <Compass className="w-4 h-4" />
                <span>Core Competencies</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {profile.primary_expertise.map((exp, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutHighlightCard({
  item,
  icon,
}: {
  item: { label: string; sublabel: string; icon: string };
  icon: React.ReactNode;
}) {
  const cardRef = usePointerTilt<HTMLDivElement>();

  return (
    <div
      ref={cardRef}
      className="about-card tilt-card group p-6 rounded-2xl bg-[#111827]/80 border border-white/[0.08] hover:border-violet-500/40 transition-all glow-card hover:shadow-xl hover:shadow-violet-600/10 cursor-default"
    >
      <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-violet-600/10 transition-all">
        {icon}
      </div>
      <h3 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-1 group-hover:text-violet-300 transition-colors">
        <AnimatedCounter value={item.label} />
      </h3>
      <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed">{item.sublabel}</p>
    </div>
  );
}
