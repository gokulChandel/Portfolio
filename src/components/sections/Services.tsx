'use client';

import React, { useRef } from 'react';
import {
  Layers,
  Layout,
  Server,
  Network,
  Database,
  Zap,
} from 'lucide-react';
import { useGSAP, gsap } from '@/lib/animations/gsap';
import { Service } from '@/types';

interface ServicesProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      gsap.from('.services-header', {
        scrollTrigger: {
          trigger: '.services-header',
          start: 'top 85%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  const iconMap: Record<string, React.ReactNode> = {
    Layers: <Layers className="w-6 h-6 text-violet-400" />,
    Layout: <Layout className="w-6 h-6 text-cyan-400" />,
    Server: <Server className="w-6 h-6 text-emerald-400" />,
    Network: <Network className="w-6 h-6 text-amber-400" />,
    Database: <Database className="w-6 h-6 text-blue-400" />,
    Zap: <Zap className="w-6 h-6 text-pink-400" />,
  };

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative py-28 bg-[#0D1220]/50 border-t border-b border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="services-header text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono text-violet-400 uppercase tracking-widest px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 inline-block">
            What I Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Engineering Capabilities & Services
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Specialized engineering services delivering robust, production-ready web solutions with clean code and modern tooling.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card group p-8 rounded-2xl bg-[#111827]/80 border border-white/[0.08] hover:border-violet-500/40 transition-all glow-card flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:scale-110 group-hover:bg-violet-600/10 transition-all">
                  {iconMap[service.icon] || <Layers className="w-6 h-6 text-violet-400" />}
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-violet-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.04] flex items-center text-xs font-mono text-slate-500 group-hover:text-violet-400 transition-colors">
                <span>Production Architecture</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
