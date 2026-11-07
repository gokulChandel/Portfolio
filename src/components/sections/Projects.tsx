'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Sparkles, Layers, ArrowRight } from 'lucide-react';
import { useGSAP, gsap } from '@/lib/animations/gsap';
import { Project } from '@/types';
import ProjectCard from '@/components/projects/ProjectCard';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Collect unique categories from projects
  const categories = ['all', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      gsap.from('.projects-header', {
        scrollTrigger: {
          trigger: '.projects-header',
          start: 'top 85%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.project-item', {
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });
    },
    { scope: containerRef, dependencies: [selectedCategory] }
  );

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative py-28 bg-[#080B12] border-t border-b border-white/[0.04]"
    >
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-violet-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="projects-header text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 inline-block">
            Featured Systems
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Engineered Projects & Applications
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Real production-grade platforms with clean full-stack architectures, database optimizations, and intuitive interfaces.
          </p>
        </div>

        {/* Category Filters */}
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all capitalize ${
                  selectedCategory === category
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/25 border border-violet-500'
                    : 'bg-[#111827]/80 text-slate-400 hover:text-white border border-white/[0.06] hover:bg-[#111827]'
                }`}
              >
                {category === 'all' ? 'All Projects' : category}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-item">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-violet-950/40 via-[#111827] to-cyan-950/40 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Looking for custom architecture or API integration?
            </h3>
            <p className="text-sm text-slate-400">
              Let&apos;s build scalable, high-performance web systems tailored to your technical standards.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-all shadow-lg shadow-violet-600/20 whitespace-nowrap"
          >
            <span>Discuss a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
