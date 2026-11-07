'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';

interface FooterProps {
  name?: string;
  title?: string;
  footerText?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  email?: string;
}

export default function Footer({
  name = 'Gokul Chandel',
  title = 'Full Stack Developer',
  footerText = '© 2026 Gokul Chandel. Engineered for performance and clean architecture.',
  githubUrl = 'https://github.com/gokulchandel',
  linkedinUrl = 'https://linkedin.com/in/gokulchandel',
  email = 'gokulchandel.dev@gmail.com',
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#080B12] pt-16 pb-12 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-violet-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-white text-sm">
                GC
              </div>
              <span className="font-bold text-lg text-slate-100 tracking-tight">{name}</span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              {title} building resilient web platforms, scalable backend services, and interactive user interfaces with modern web standards.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-600/10 transition-all"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${email}`}
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-600/10 transition-all"
                aria-label="Email Address"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">Navigation</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/#hero" className="hover:text-violet-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-violet-400 transition-colors">About</Link>
              </li>
              <li>
                <Link href="/#skills" className="hover:text-violet-400 transition-colors">Skills</Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-violet-400 transition-colors">Experience</Link>
              </li>
              <li>
                <Link href="/#projects" className="hover:text-violet-400 transition-colors">Projects</Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-violet-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Administration & Legal */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">Control</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/admin" className="hover:text-violet-400 transition-colors flex items-center gap-1.5">
                  <span>CMS Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-violet-400 transition-colors">
                  Admin Sign In
                </Link>
              </li>
              <li>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400 transition-colors">
                  Curriculum Vitae
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{footerText}</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-all group"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
