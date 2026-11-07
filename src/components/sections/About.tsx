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
import { useGSAP, gsap, ScrollTrigger } from '@/lib/animations/gsap';
import { Profile } from '@/types';

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

      gsap.from('.about-card', {
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
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
            About Gokul
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Engineering Clean Architectures & Scalable Systems
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A developer passionate about high-efficiency systems, robust APIs, and modern frontend technologies.
          </p>
        </div>

        {/* 4 Summary Highlight Cards */}
        <div className="about-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {profile.highlights.map((item, idx) => (
            <div
              key={idx}
              className="about-card p-6 rounded-2xl bg-[#111827]/80 border border-white/[0.08] hover:border-violet-500/40 transition-all glow-card"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-4">
                {iconMap[item.icon] || <Code2 className="w-5 h-5 text-violet-400" />}
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">{item.label}</h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">{item.sublabel}</p>
            </div>
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
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-violet-600/15 border border-violet-500/25 text-violet-300"
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
