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
import { usePointerTilt } from '@/lib/animations/usePointerTilt';
import { Profile } from '@/types';

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const codeCardRef = usePointerTilt<HTMLDivElement>();
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

      gsap.to('.hero-starfield', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.utils.toArray<HTMLElement>('.shooting-star').forEach((star, index) => {
        gsap
          .timeline({
            repeat: -1,
            repeatDelay: gsap.utils.random(2.5, 6),
            delay: index * 2.4,
          })
          .set(star, { x: 0, y: 0, scaleX: 0.15, opacity: 0 })
          .to(star, {
            opacity: 0.9,
            scaleX: 1,
            duration: 0.18,
            ease: 'power2.out',
          })
          .to(
            star,
            {
              x: () => -window.innerWidth * 0.72,
              y: () => window.innerHeight * 0.58,
              opacity: 0,
              duration: 1.25,
              ease: 'power1.in',
            },
            '-=0.02'
          );
      });

      tl.from('.hero-heading', {
        opacity: 0,
        y: 22,
        duration: 0.65,
        ease: 'power3.out',
      })
        .from(
          '.hero-badge',
          {
            opacity: 0,
            y: -15,
            duration: 0.7,
          },
          '-=0.35'
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
    stack: `// A little about me
const developer = {
  name: "${profile.name}",
  role: "${profile.title}",
  experience: "${profile.experience_years} years",
  currently: "${profile.current_company}",
  focus: ["React", "Next.js", "Node.js", "PostgreSQL"],
  status: "${profile.availability_status}"
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
      className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#080B12]"
    >
      <div className="hero-color-wash absolute inset-0 bg-[radial-gradient(ellipse_at_18%_18%,rgba(124,58,237,0.2),transparent_38%),radial-gradient(ellipse_at_85%_72%,rgba(6,182,212,0.12),transparent_34%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="hero-bottom-fade absolute inset-x-0 bottom-0 h-40 pointer-events-none" />
      <div className="hero-starfield absolute inset-0 pointer-events-none" aria-hidden="true">
        <span className="shooting-star shooting-star-one" />
        <span className="shooting-star shooting-star-two" />
        <span className="shooting-star shooting-star-three" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-center">
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-7 space-y-7">
            {/* Small Introduction & Availability badge */}
            <div className="hero-badge flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-[0.24em] text-slate-400">
                {profile.intro_tag}
              </span>
              <span className="h-px w-8 bg-violet-400/60" />
              <span className="hero-availability inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/[0.08] border border-emerald-400/20 text-emerald-300 text-[11px] font-mono font-medium tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {profile.availability_status}
              </span>
            </div>

            {/* Main Heading & Professional Title */}
            <div className="space-y-3">
              <h1 className="hero-heading max-w-[13ch] text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.25rem] leading-[0.94] font-extrabold tracking-[-0.065em] text-white">
                {profile.name}
              </h1>
              <h2 className="hero-title text-2xl sm:text-3xl lg:text-[2.4rem] font-bold tracking-tight">
                {profile.title}
              </h2>
            </div>

            {/* Dynamic Supporting Text & Short Description */}
            <div className="hero-desc space-y-3 max-w-xl border-l border-violet-400/40 pl-5">
              <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
                {profile.subtitle}
              </p>
              <p className="text-sm sm:text-base text-slate-400 leading-7">
                {profile.bio}
              </p>
            </div>

            {/* CTAs and Social Links */}
            <div className="hero-cta flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/#projects"
                className="hero-action inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-violet-500 hover:bg-violet-400 text-white font-semibold text-sm transition-all shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:-translate-y-0.5 group"
              >
                <span>Explore my work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="hero-action inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 hover:text-white font-medium text-sm transition-all hover:-translate-y-0.5"
              >
                <FileDown className="w-4 h-4 text-violet-300" />
                <span>Download resume</span>
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="hero-action inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 hover:text-white font-medium text-sm transition-all hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4 text-violet-300" />
                <span>Let&apos;s talk</span>
              </a>

              {/* Social Icons */}
              <div className="flex items-center gap-2 pl-2">
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-600/10 transition-all"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-600/10 transition-all"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Micro Highlights Pill */}
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
                <span>{profile.experience_years} Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>{profile.current_company}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Technical Visual Element */}
          <div className="hero-visual relative isolate lg:col-span-5">
            <div ref={codeCardRef} className="hero-code-card tilt-card relative rounded-[1.75rem] bg-[#0D1220]/90 border border-white/[0.1] shadow-[0_32px_100px_-32px_rgba(124,58,237,0.45)] backdrop-blur-xl overflow-hidden glow-card">
              <div className="absolute -top-24 -right-20 h-52 w-52 rounded-full bg-violet-500/15 blur-3xl pointer-events-none" />
              {/* Header Bar */}
              <div className="relative flex items-center justify-between px-5 py-4 bg-[#080B12]/70 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400/90 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-300/90 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90 inline-block" />
                  <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-violet-400" />
                    gokul / portfolio.ts
                  </span>
                </div>
                <button
                  onClick={() => copySnippet(codeSnippets[activeCodeTab])}
                  className="text-slate-400 hover:text-slate-200 transition-colors p-1"
                  title="Copy code"
                  aria-label={copied ? 'Code copied' : 'Copy code'}
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Code Tabs */}
              <div className="relative flex items-center gap-1 px-4 pt-2 bg-[#080B12]/40 border-b border-white/[0.04]">
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
              <div className="relative min-h-[15.5rem] p-5 sm:p-6 font-mono text-xs overflow-x-auto leading-7 text-slate-300">
                <pre className="selection:bg-violet-500/30">
                  <code>{codeSnippets[activeCodeTab]}</code>
                </pre>
              </div>

              {/* Interactive Status Footer */}
              <div className="relative px-5 py-3 bg-[#080B12]/90 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
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
