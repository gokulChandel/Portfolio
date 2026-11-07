'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  FileDown,
  Mail,
  Terminal,
  Code2,
  Cpu,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import { useGSAP, gsap } from '@/lib/animations/gsap';
import { Profile } from '@/types';

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<'stack' | 'api' | 'docker'>('stack');
  const [copied, setCopied] = useState(false);

  // GSAP Entrance Animations
  useGSAP(
    () => {
      // Check prefers-reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-badge', {
        opacity: 0,
        y: -15,
        duration: 0.7,
      })
        .from(
          '.hero-heading',
          {
            opacity: 0,
            y: 30,
            duration: 0.9,
          },
          '-=0.4'
        )
        .from(
          '.hero-title',
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          '-=0.6'
        )
        .from(
          '.hero-desc',
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          '-=0.5'
        )
        .from(
          '.hero-cta',
          {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.6,
          },
          '-=0.5'
        )
        .from(
          '.hero-code-card',
          {
            opacity: 0,
            x: 40,
            duration: 1,
          },
          '-=0.7'
        );
    },
    { scope: containerRef }
  );

  const copySnippet = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeSnippets = {
    stack: `// Gokul Chandel — Core Architecture
const developer = {
  name: "Gokul Chandel",
  role: "Full Stack Developer",
  experience: "2+ Years @ Parkhya Solutions",
  expertise: ["React.js", "Next.js", "Node.js", "MongoDB", "PostgreSQL"],
  status: "Available for high-impact engineering roles"
};`,
    api: `// Express REST API Route
app.get("/api/v1/system/health", async (req, res) => {
  const metrics = await db.monitor.getPerformance();
  return res.status(200).json({
    status: "optimal",
    latency: "38ms",
    dbConnection: "active"
  });
});`,
    docker: `# Multi-stage production container
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]`,
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#080B12]"
    >
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Small Introduction & Availability badge */}
            <div className="hero-badge flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {profile.availability_status}
              </span>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                {profile.intro_tag}
              </span>
            </div>

            {/* Main Heading & Professional Title */}
            <div className="space-y-2">
              <h1 className="hero-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
                {profile.name}
              </h1>
              <h2 className="hero-title text-2xl sm:text-3xl lg:text-4xl font-semibold text-gradient">
                {profile.title}
              </h2>
            </div>

            {/* Dynamic Supporting Text & Short Description */}
            <div className="hero-desc space-y-3 max-w-xl">
              <p className="text-base sm:text-lg text-slate-200 font-medium leading-snug">
                {profile.subtitle}
              </p>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                {profile.bio}
              </p>
            </div>

            {/* CTAs and Social Links */}
            <div className="hero-cta flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-all shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:-translate-y-0.5 group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-slate-200 hover:text-white font-medium text-sm transition-all hover:-translate-y-0.5"
              >
                <FileDown className="w-4 h-4 text-violet-400" />
                <span>Download Resume</span>
              </a>

              {/* Social Icons */}
              <div className="flex items-center gap-2 pl-2">
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-600/10 transition-all"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-600/10 transition-all"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Micro Highlights Pill */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
                <span>2+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Parkhya Solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Full Stack MERN</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Technical Visual Element */}
          <div className="lg:col-span-5">
            <div className="hero-code-card relative rounded-2xl bg-[#0D1220]/90 border border-white/[0.1] shadow-2xl shadow-violet-950/20 backdrop-blur-xl overflow-hidden glow-card">
              {/* Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#080B12]/80 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-violet-400" />
                    developer-environment.ts
                  </span>
                </div>
                <button
                  onClick={() => copySnippet(codeSnippets[activeCodeTab])}
                  className="text-slate-400 hover:text-slate-200 transition-colors p-1"
                  title="Copy code"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Code Tabs */}
              <div className="flex items-center gap-1 px-3 pt-2 bg-[#080B12]/40 border-b border-white/[0.04]">
                <button
                  onClick={() => setActiveCodeTab('stack')}
                  className={`px-3 py-1.5 rounded-t-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                    activeCodeTab === 'stack'
                      ? 'bg-[#111827] text-violet-400 border-t-2 border-violet-500'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code2 className="w-3 h-3" />
                  Profile.ts
                </button>
                <button
                  onClick={() => setActiveCodeTab('api')}
                  className={`px-3 py-1.5 rounded-t-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                    activeCodeTab === 'api'
                      ? 'bg-[#111827] text-violet-400 border-t-2 border-violet-500'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Terminal className="w-3 h-3" />
                  API.js
                </button>
                <button
                  onClick={() => setActiveCodeTab('docker')}
                  className={`px-3 py-1.5 rounded-t-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                    activeCodeTab === 'docker'
                      ? 'bg-[#111827] text-violet-400 border-t-2 border-violet-500'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Cpu className="w-3 h-3" />
                  Dockerfile
                </button>
              </div>

              {/* Code Content */}
              <div className="p-5 font-mono text-xs overflow-x-auto leading-relaxed text-slate-300">
                <pre className="selection:bg-violet-500/30">
                  <code>{codeSnippets[activeCodeTab]}</code>
                </pre>
              </div>

              {/* Interactive Status Footer */}
              <div className="px-4 py-2.5 bg-[#080B12]/90 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Node.js v20.x Active</span>
                </div>
                <div className="flex items-center gap-2 text-violet-400">
                  <span>UTF-8</span>
                  <span>TypeScript</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
