'use client';

import React, { useRef } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Sparkles, Building2, Terminal } from 'lucide-react';
import { useGSAP, gsap } from '@/lib/animations/gsap';
import { Experience } from '@/types';

interface ExperienceProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      gsap.from('.exp-header', {
        scrollTrigger: {
          trigger: '.exp-header',
          start: 'top 85%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.timeline-item', {
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 80%',
        },
        opacity: 0,
        x: -30,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Animated timeline glow indicator
      gsap.fromTo(
        '.timeline-progress-bar',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 75%',
            end: 'bottom 85%',
            scrub: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative py-28 bg-[#0D1220]/60 border-t border-b border-white/[0.04]"
    >
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="exp-header text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-mono text-violet-400 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 inline-block font-semibold">
            Career Journey
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Professional Engineering Experience
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            A chronological timeline of my full-time engineering experience building enterprise web platforms, robust REST APIs, and database-driven digital workspaces.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="timeline-container relative pl-6 sm:pl-12 space-y-12 ml-2 sm:ml-8 max-w-5xl mx-auto">
          {/* Static track */}
          <div className="absolute left-0 top-3 bottom-3 w-1 bg-white/[0.08] rounded-full" />
          {/* Animated active progress bar */}
          <div className="timeline-progress-bar absolute left-0 top-3 bottom-3 w-1 bg-gradient-to-b from-violet-500 via-cyan-400 to-emerald-400 rounded-full" />

          {experiences.map((exp) => (
            <div key={exp.id} className="timeline-item relative group">
              {/* Timeline Pin/Dot */}
              <div className="absolute -left-[30px] sm:-left-[54px] top-2 w-7 h-7 rounded-full bg-[#080B12] border-2 border-violet-500 flex items-center justify-center group-hover:scale-125 group-hover:border-cyan-400 transition-all shadow-md shadow-violet-500/30">
                <div className="w-2.5 h-2.5 rounded-full bg-violet-400 group-hover:bg-cyan-400 transition-colors animate-pulse" />
              </div>

              {/* Experience Card */}
              <div className="p-6 sm:p-10 rounded-3xl bg-[#111827]/90 border border-white/[0.08] hover:border-violet-500/40 transition-all glow-card space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {exp.role}
                      </h3>
                      {exp.is_current && (
                        <span className="px-3 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Current Role</span>
                        </span>
                      )}
                    </div>

                    <div className="text-base sm:text-lg font-semibold text-violet-400 flex items-center gap-2 mt-1">
                      <Building2 className="w-4 h-4 text-violet-400" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-300">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                      <Calendar className="w-3.5 h-3.5 text-violet-400" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Summary narrative */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  {exp.description}
                </p>

                {/* Key Responsibilities */}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Key Technical Responsibilities & Achievements:</span>
                    </h4>
                    <div className="space-y-2.5">
                      {exp.responsibilities.map((resp, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Badges */}
                <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-slate-500 mr-2">Technologies:</span>
                  {exp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-slate-200 hover:border-violet-500/40 hover:text-white transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
