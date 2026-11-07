'use client';

import React, { useRef } from 'react';
import { GraduationCap, Award, Calendar, ExternalLink, BookOpen } from 'lucide-react';
import { useGSAP, gsap } from '@/lib/animations/gsap';
import { Education, Certification } from '@/types';

interface EducationSectionProps {
  education: Education[];
  certifications: Certification[];
}

export default function EducationSection({
  education,
  certifications,
}: EducationSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      gsap.from('.edu-header', {
        scrollTrigger: {
          trigger: '.edu-header',
          start: 'top 85%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.edu-card', {
        scrollTrigger: {
          trigger: '.edu-grid',
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="education"
      className="relative py-28 bg-[#080B12] border-t border-b border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="edu-header text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 inline-block">
            Background & Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Education & Certifications
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Academic foundations and continuous professional training in software engineering.
          </p>
        </div>

        <div className="edu-grid grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 pb-2 border-b border-white/[0.08]">
              <div className="w-8 h-8 rounded-lg bg-violet-600/20 text-violet-400 flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Formal Education</h3>
            </div>

            <div className="space-y-4">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="edu-card p-6 sm:p-7 rounded-2xl bg-[#111827]/80 border border-white/[0.08] hover:border-violet-500/40 transition-all glow-card"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h4 className="text-lg font-bold text-white tracking-tight">
                        {edu.degree}
                      </h4>
                      <p className="text-sm font-medium text-violet-400">
                        {edu.field_of_study}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-slate-400 whitespace-nowrap self-start sm:self-auto">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {edu.start_date} - {edu.end_date}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 font-semibold mb-2">
                    {edu.institution}
                  </p>

                  {edu.grade && (
                    <div className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
                      {edu.grade}
                    </div>
                  )}

                  {edu.description && (
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 pb-2 border-b border-white/[0.08]">
              <div className="w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Certifications & Training</h3>
            </div>

            <div className="space-y-4">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="edu-card p-6 sm:p-7 rounded-2xl bg-[#111827]/80 border border-white/[0.08] hover:border-cyan-500/40 transition-all glow-card"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h4 className="text-lg font-bold text-white tracking-tight">
                      {cert.name}
                    </h4>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-slate-400 whitespace-nowrap self-start sm:self-auto">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {cert.issue_date}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-cyan-400 mb-2">
                    {cert.issuer}
                  </p>

                  {cert.description && (
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">
                      {cert.description}
                    </p>
                  )}

                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}

              {/* Continuous Learning Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-950/20 to-cyan-950/20 border border-dashed border-white/[0.1] flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h5 className="text-sm font-bold text-white">Continuous Self-Directed Learning</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Currently deepening knowledge in Golang concurrency patterns, microservice architecture, and Dockerized deployment workflows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
