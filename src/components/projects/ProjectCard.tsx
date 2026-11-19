'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, ArrowRight, Sparkles, Eye } from 'lucide-react';
import { Project } from '@/types';
import { usePointerTilt } from '@/lib/animations/usePointerTilt';

interface ProjectCardProps {
  project: Project;
  onQuickView?: (project: Project) => void;
}

export default function ProjectCard({ project, onQuickView }: ProjectCardProps) {
  const cardRef = usePointerTilt<HTMLDivElement>();

  return (
    <div
      ref={cardRef}
      className="project-card tilt-card group relative h-full min-w-0 rounded-2xl bg-[#111827]/80 border border-white/[0.08] hover:border-violet-500/40 transition-all flex flex-col justify-between overflow-hidden glow-card"
    >
      <div>
        {/* Project Thumbnail / Header illustration */}
        <div className="relative aspect-video w-full bg-[#0D1220] overflow-hidden border-b border-white/[0.06] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/30 via-transparent to-cyan-900/20 group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10 group-hover:opacity-25 transition-opacity" />

          {/* Aesthetic technical preview */}
          <div className="p-6 text-center space-y-2 relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
              {project.category}
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-violet-300 transition-colors">
              {project.title}
            </h3>
          </div>

          {/* Quick View Button overlay on hover */}
          {onQuickView && (
            <button
              type="button"
              onClick={() => onQuickView(project)}
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 opacity-100 backdrop-blur-[2px] transition-all duration-200 cursor-pointer sm:opacity-0 sm:group-hover:opacity-100"
              aria-label={`Quick view ${project.title}`}
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-violet-600 text-white text-xs font-mono font-medium shadow-lg shadow-violet-600/40 scale-95 group-hover:scale-100 transition-transform">
                <Eye className="w-3.5 h-3.5" />
                <span>Quick View</span>
              </span>
            </button>
          )}

          {/* Featured Badge */}
          {project.is_featured && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-violet-600/90 text-white text-[11px] font-mono font-semibold flex items-center gap-1 shadow-md shadow-violet-600/30 z-20">
              <Sparkles className="w-3 h-3" />
              <span>Featured</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed">
            {project.short_description}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies.slice(0, 5).map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-slate-300 group-hover:border-violet-500/30 transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-2 py-0.5 rounded-md text-xs font-mono text-slate-400">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 pt-0 border-t border-white/[0.04] mt-4 flex items-center justify-between">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors group-hover:translate-x-0.5 duration-200"
        >
          <span>Architecture Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center gap-2">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              aria-label="View Live Project"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
