'use client';

import React, { useRef, useState } from 'react';
import {
  Code,
  Globe,
  FileCode,
  FileCode2,
  Layout,
  Palette,
  Sparkles,
  Cpu,
  Server,
  Box,
  Network,
  Terminal,
  Database,
  DatabaseZap,
  Zap,
  Flame,
  Container,
  Cloud,
  GitPullRequest,
  Workflow,
  TerminalSquare,
  GitBranch,
  Send,
  CodeXml,
  Search,
  CheckCircle2,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { useGSAP, gsap } from '@/lib/animations/gsap';
import { Skill, SkillCategory } from '@/types';

interface SkillsProps {
  skills: Skill[];
  categories: SkillCategory[];
}

// Brand accent colors and metadata for visual identity
const TECH_THEMES: Record<
  string,
  { color: string; borderHover: string; bgHover: string; pill: string }
> = {
  'React.js': {
    color: '#06B6D4',
    borderHover: 'hover:border-cyan-500/60',
    bgHover: 'group-hover:bg-cyan-500/10',
    pill: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  },
  'Next.js': {
    color: '#FFFFFF',
    borderHover: 'hover:border-white/50',
    bgHover: 'group-hover:bg-white/10',
    pill: 'bg-white/10 text-slate-100 border-white/20',
  },
  JavaScript: {
    color: '#F59E0B',
    borderHover: 'hover:border-amber-500/60',
    bgHover: 'group-hover:bg-amber-500/10',
    pill: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  TypeScript: {
    color: '#3B82F6',
    borderHover: 'hover:border-blue-500/60',
    bgHover: 'group-hover:bg-blue-500/10',
    pill: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  'Tailwind CSS': {
    color: '#38BDF8',
    borderHover: 'hover:border-sky-500/60',
    bgHover: 'group-hover:bg-sky-500/10',
    pill: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  },
  Redux: {
    color: '#A855F7',
    borderHover: 'hover:border-purple-500/60',
    bgHover: 'group-hover:bg-purple-500/10',
    pill: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  HTML5: {
    color: '#F97316',
    borderHover: 'hover:border-orange-500/60',
    bgHover: 'group-hover:bg-orange-500/10',
    pill: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  },
  CSS3: {
    color: '#0EA5E9',
    borderHover: 'hover:border-sky-500/60',
    bgHover: 'group-hover:bg-sky-500/10',
    pill: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  },
  'Node.js': {
    color: '#22C55E',
    borderHover: 'hover:border-emerald-500/60',
    bgHover: 'group-hover:bg-emerald-500/10',
    pill: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  'Express.js': {
    color: '#CBD5E1',
    borderHover: 'hover:border-slate-400/60',
    bgHover: 'group-hover:bg-slate-500/10',
    pill: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
  },
  'REST APIs': {
    color: '#8B5CF6',
    borderHover: 'hover:border-violet-500/60',
    bgHover: 'group-hover:bg-violet-500/10',
    pill: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  },
  Golang: {
    color: '#06B6D4',
    borderHover: 'hover:border-cyan-500/60',
    bgHover: 'group-hover:bg-cyan-500/10',
    pill: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  },
  MongoDB: {
    color: '#10B981',
    borderHover: 'hover:border-emerald-500/60',
    bgHover: 'group-hover:bg-emerald-500/10',
    pill: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  PostgreSQL: {
    color: '#3B82F6',
    borderHover: 'hover:border-blue-500/60',
    bgHover: 'group-hover:bg-blue-500/10',
    pill: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  Supabase: {
    color: '#10B981',
    borderHover: 'hover:border-emerald-500/60',
    bgHover: 'group-hover:bg-emerald-500/10',
    pill: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  Firebase: {
    color: '#F59E0B',
    borderHover: 'hover:border-amber-500/60',
    bgHover: 'group-hover:bg-amber-500/10',
    pill: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  Docker: {
    color: '#2563EB',
    borderHover: 'hover:border-blue-500/60',
    bgHover: 'group-hover:bg-blue-500/10',
    pill: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  AWS: {
    color: '#F97316',
    borderHover: 'hover:border-orange-500/60',
    bgHover: 'group-hover:bg-orange-500/10',
    pill: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  },
  'GitHub Actions': {
    color: '#60A5FA',
    borderHover: 'hover:border-blue-400/60',
    bgHover: 'group-hover:bg-blue-400/10',
    pill: 'bg-blue-400/10 text-blue-300 border-blue-400/20',
  },
  'CI/CD': {
    color: '#A855F7',
    borderHover: 'hover:border-purple-500/60',
    bgHover: 'group-hover:bg-purple-500/10',
    pill: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  Linux: {
    color: '#EAB308',
    borderHover: 'hover:border-yellow-500/60',
    bgHover: 'group-hover:bg-yellow-500/10',
    pill: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  },
  Git: {
    color: '#F97316',
    borderHover: 'hover:border-orange-500/60',
    bgHover: 'group-hover:bg-orange-500/10',
    pill: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  },
  GitHub: {
    color: '#E2E8F0',
    borderHover: 'hover:border-slate-300/60',
    bgHover: 'group-hover:bg-slate-400/10',
    pill: 'bg-slate-400/10 text-slate-200 border-slate-400/20',
  },
  Postman: {
    color: '#FB923C',
    borderHover: 'hover:border-orange-400/60',
    bgHover: 'group-hover:bg-orange-400/10',
    pill: 'bg-orange-400/10 text-orange-300 border-orange-400/20',
  },
  'VS Code': {
    color: '#38BDF8',
    borderHover: 'hover:border-sky-400/60',
    bgHover: 'group-hover:bg-sky-400/10',
    pill: 'bg-sky-400/10 text-sky-300 border-sky-400/20',
  },
};

export default function Skills({ skills, categories }: SkillsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'bento' | 'matrix'>('bento');

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      gsap.from('.skills-header', {
        scrollTrigger: {
          trigger: '.skills-header',
          start: 'top 85%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.skill-card-item', {
        scrollTrigger: {
          trigger: '.skills-display-container',
          start: 'top 80%',
        },
        opacity: 0,
        y: 20,
        stagger: 0.04,
        duration: 0.5,
        ease: 'power2.out',
      });
    },
    { scope: containerRef, dependencies: [selectedCategory, searchQuery, viewMode] }
  );

  const iconMap: Record<string, React.ReactNode> = {
    Code: <Code className="w-5 h-5" />,
    Globe: <Globe className="w-5 h-5" />,
    FileCode: <FileCode className="w-5 h-5" />,
    FileCode2: <FileCode2 className="w-5 h-5" />,
    Layout: <Layout className="w-5 h-5" />,
    Palette: <Palette className="w-5 h-5" />,
    Sparkles: <Sparkles className="w-5 h-5" />,
    Cpu: <Cpu className="w-5 h-5" />,
    Server: <Server className="w-5 h-5" />,
    Box: <Box className="w-5 h-5" />,
    Network: <Network className="w-5 h-5" />,
    Terminal: <Terminal className="w-5 h-5" />,
    Database: <Database className="w-5 h-5" />,
    DatabaseZap: <DatabaseZap className="w-5 h-5" />,
    Zap: <Zap className="w-5 h-5" />,
    Flame: <Flame className="w-5 h-5" />,
    Container: <Container className="w-5 h-5" />,
    Cloud: <Cloud className="w-5 h-5" />,
    GitPullRequest: <GitPullRequest className="w-5 h-5" />,
    Workflow: <Workflow className="w-5 h-5" />,
    TerminalSquare: <TerminalSquare className="w-5 h-5" />,
    GitBranch: <GitBranch className="w-5 h-5" />,
    Github: <GithubIcon className="w-5 h-5" />,
    Send: <Send className="w-5 h-5" />,
    CodeXml: <CodeXml className="w-5 h-5" />,
  };

  // Filter skills based on selected category and search query
  const filteredSkills = skills.filter((skill) => {
    const matchesCategory =
      selectedCategory === 'all' || skill.category_id === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (skill.category_name &&
        skill.category_name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative py-28 bg-[#080B12] border-t border-b border-white/[0.04]"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-violet-600/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/5 blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="skills-header text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 inline-block font-semibold">
            Core Technology & Tools
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Engineering Toolset & Architecture Stack
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            A comprehensive, verified directory of modern frontend engines, backend microservices, database schemas, and DevOps pipelines leveraged across production systems.
          </p>

          {/* Quick Primary Stack Pills for Recruiters */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider mr-2">
              Primary Production Stack:
            </span>
            {['React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'TypeScript', 'Docker'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.04] border border-white/[0.08] text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Filter, Search & View Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-12 p-3 sm:p-4 rounded-2xl bg-[#111827]/60 border border-white/[0.08] backdrop-blur-md">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
              }`}
            >
              All Skills ({skills.length})
            </button>
            {categories.map((cat) => {
              const count = skills.filter((s) => s.category_id === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                      : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Input & View Mode Toggle */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-xs text-white placeholder-slate-500 outline-none focus:border-violet-500 transition-all"
              />
            </div>

            <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] shrink-0">
              <button
                onClick={() => setViewMode('bento')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  viewMode === 'bento'
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Categorized
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  viewMode === 'matrix'
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Grid
              </button>
            </div>
          </div>
        </div>

        {/* Display Container */}
        <div className="skills-display-container">
          {viewMode === 'bento' && selectedCategory === 'all' && searchQuery.trim() === '' ? (
            /* Categorized Bento View: Groups into distinct domain sections */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => {
                const catSkills = skills.filter((s) => s.category_id === cat.id);
                return (
                  <div
                    key={cat.id}
                    className="p-6 sm:p-7 rounded-3xl bg-[#111827]/80 border border-white/[0.08] hover:border-violet-500/40 transition-all glow-card flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Category Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                        <div className="flex items-center gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse" />
                          <h3 className="text-base font-bold text-white tracking-tight">
                            {cat.name}
                          </h3>
                        </div>
                        <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
                          {catSkills.length} Technologies
                        </span>
                      </div>

                      {/* Skills List in Bento Card */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {catSkills.map((skill) => {
                          const theme = TECH_THEMES[skill.name] || {
                            color: '#8B5CF6',
                            borderHover: 'hover:border-violet-500/60',
                            bgHover: 'group-hover:bg-violet-500/10',
                            pill: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
                          };
                          return (
                            <div
                              key={skill.id}
                              className={`skill-card-item group p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] ${theme.borderHover} hover:bg-white/[0.04] transition-all flex items-center justify-between gap-2`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div
                                  className={`w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${theme.bgHover}`}
                                  style={{ color: theme.color }}
                                >
                                  {iconMap[skill.icon || 'Code'] || (
                                    <Code className="w-4 h-4" />
                                  )}
                                </div>
                                <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                                  {skill.name}
                                </span>
                              </div>

                              {skill.proficiency_label && (
                                <span
                                  className={`text-[10px] font-mono px-2 py-0.5 rounded-md border shrink-0 ${theme.pill}`}
                                >
                                  {skill.proficiency_label}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Matrix View: Multi-column Card Showcase with Full Badges */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredSkills.map((skill) => {
                const theme = TECH_THEMES[skill.name] || {
                  color: '#8B5CF6',
                  borderHover: 'hover:border-violet-500/60',
                  bgHover: 'group-hover:bg-violet-500/10',
                  pill: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
                };
                return (
                  <div
                    key={skill.id}
                    className={`skill-card-item group p-5 rounded-2xl bg-[#111827]/80 border border-white/[0.08] ${theme.borderHover} hover:bg-[#111827] transition-all flex flex-col justify-between glow-card`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${theme.bgHover}`}
                          style={{ color: theme.color }}
                        >
                          {iconMap[skill.icon || 'Code'] || (
                            <Code className="w-5 h-5" />
                          )}
                        </div>

                        {skill.proficiency_label && (
                          <span
                            className={`text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full border ${theme.pill}`}
                          >
                            {skill.proficiency_label}
                          </span>
                        )}
                      </div>

                      <div className="space-y-0.5">
                        <h4 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors">
                          {skill.name}
                        </h4>
                        <p className="text-[11px] font-mono text-slate-400">
                          {skill.category_name || 'Technical Domain'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>Production Ready</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {filteredSkills.length === 0 && (
            <div className="p-16 text-center space-y-3 rounded-3xl bg-[#111827]/40 border border-white/[0.06]">
              <Search className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm font-semibold text-slate-300">
                No technologies found matching &quot;{searchQuery}&quot;
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs font-mono text-violet-400 hover:underline"
              >
                Clear search filter
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
