'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import {
  X,
  ExternalLink,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { Project } from '@/types';

interface ProjectQuickModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectQuickModal({ project, onClose }: ProjectQuickModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-[#0D1220] border border-white/10 rounded-3xl shadow-2xl shadow-violet-500/10 overflow-hidden z-10 animate-in zoom-in-95 duration-200 my-8">
        {/* Top Header Glow Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400" />

        {/* Modal Header */}
        <div className="relative p-6 sm:p-8 pb-4 flex items-start justify-between gap-4 border-b border-white/[0.06]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-violet-500/10 border border-violet-500/20 text-violet-300">
                {project.category}
              </span>
              {project.is_featured && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                  Featured System
                </span>
              )}
            </div>
            <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.06] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-violet-400" />
              <span>Project Summary & Architecture</span>
            </h4>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {project.short_description}
            </p>
          </div>

          {/* Detailed description if available */}
          {project.full_description && (
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {project.full_description}
            </div>
          )}

          {/* Key highlights / badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-white block">Production Architecture</span>
                <span className="text-slate-400">Robust, secure & scalable</span>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-white block">High Performance</span>
                <span className="text-slate-400">Optimized queries & APIs</span>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2 pt-2 border-t border-white/[0.06]">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
              Technologies & Infrastructure
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-slate-200 hover:border-violet-500/40 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 sm:p-8 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 bg-[#080B12]/60">
          <Link
            href={`/projects/${project.slug}`}
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
          >
            <span>Read Complete Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-2.5">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-white border border-white/[0.08] transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View Code</span>
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs font-semibold text-white shadow-md shadow-violet-600/30 transition-all"
              >
                <span>Live System</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
