'use client';

import { useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  FileDown,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { LinkedinIcon } from '@/components/ui/BrandIcons';
import AntigravityParticles from '@/components/ui/AntigravityParticles';
import FallingText from '@/components/ui/FallingText';
import RoleCycler from '@/components/ui/RoleCycler';
import HeroShowcase from '@/components/sections/HeroShowcase';
import { triggerConfetti } from '@/components/ui/ConfettiBurst';
import { useGSAP, gsap } from '@/lib/animations/gsap';
import { initialSkills } from '@/lib/data/initialData';
import { Profile, Skill } from '@/types';

interface HeroProps {
  profile: Profile;
  skills: Skill[];
}

export default function Hero({ profile, skills }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const portfolioSkills = [...skills];
  const activeSkillNames = new Set(skills.map((skill) => skill.name.toLowerCase()));
  for (const skill of initialSkills) {
    if (!activeSkillNames.has(skill.name.toLowerCase())) {
      portfolioSkills.push(skill);
    }
  }
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

      tl.from(
        '.hero-heading .falling-letter',
        {
          opacity: 0,
          yPercent: -125,
          rotation: 8,
          duration: 0.72,
          stagger: 0.035,
          ease: 'bounce.out',
        },
        0
      )
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
        );
    },
    { scope: containerRef }
  );


  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#080B12] pt-24 pb-12 sm:pt-32 sm:pb-20"
    >
      <div className="hero-color-wash absolute inset-0 bg-[radial-gradient(ellipse_at_18%_18%,rgba(124,58,237,0.2),transparent_38%),radial-gradient(ellipse_at_85%_72%,rgba(6,182,212,0.12),transparent_34%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <AntigravityParticles />
      <div className="hero-bottom-fade absolute inset-x-0 bottom-0 h-40 pointer-events-none" />
      <div className="hero-starfield absolute inset-0 pointer-events-none" aria-hidden="true">
        <span className="shooting-star shooting-star-one" />
        <span className="shooting-star shooting-star-two" />
        <span className="shooting-star shooting-star-three" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 w-full relative z-10">
        <div className="hero-layout grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
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
              <FallingText
                text={profile.name}
                className="hero-heading max-w-[13ch] text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.25rem] leading-[0.94] font-extrabold tracking-[-0.065em] text-white"
              />
              <h2 className="hero-title text-2xl sm:text-3xl lg:text-[2.4rem] font-bold tracking-tight flex items-center">
                <RoleCycler defaultTitle={profile.title} />
              </h2>
              <p className="text-[10px] font-mono text-slate-500">Drag a letter to toss it</p>
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
                download="Download_Resume.pdf"
                onClick={() => triggerConfetti()}
                className="hero-action inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 hover:text-white font-medium text-sm transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-violet-300" />
                <span>Download Resume</span>
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

          <HeroShowcase
            experienceYears={profile.experience_years}
            currentCompany={profile.current_company}
            skills={portfolioSkills}
          />
        </div>

        <div className="hero-horizontal-text">
          <p className="sr-only">Full-stack engineering, product thinking, and reliable systems</p>
          <div className="hero-horizontal-track" aria-hidden="true">
            {[0, 1].map((copy) => (
              <div className="hero-horizontal-group" key={copy}>
                <span>FULL-STACK ENGINEERING</span>
                <span className="hero-horizontal-spark">+</span>
                <span>PRODUCT THINKING</span>
                <span className="hero-horizontal-spark">+</span>
                <span>RELIABLE SYSTEMS</span>
                <span className="hero-horizontal-spark">+</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
