'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'bento' | 'matrix'>('bento');

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
      id="skills"
      className="relative py-24 sm:py-28 bg-[#080B12] border-t border-b border-white/[0.04]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_20%,rgba(124,58,237,0.12),transparent_36%),radial-gradient(ellipse_at_90%_75%,rgba(6,182,212,0.08),transparent_34%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="skills-header skills-reveal grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-10 sm:mb-12">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-cyan-400" />
              <span className="text-xs font-mono text-cyan-300 uppercase tracking-[0.2em] font-semibold">
                The toolkit
              </span>
            </div>
            <h2 className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.05em] leading-[1.02] text-white">
              The tools behind <span className="text-gradient">the work.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
              A practical mix of technologies I use to design, build, and ship
              thoughtful digital products — from the interface to the database.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <span className="block text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {skills.length.toString().padStart(2, '0')}
              </span>
              <span className="mt-1 block text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider">
                Technologies
              </span>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <span className="block text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {categories.length.toString().padStart(2, '0')}
              </span>
              <span className="mt-1 block text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider">
                Skill areas
              </span>
            </div>
          </div>
        </div>

        {/* Filter, Search & View Controls */}
        <div className="skills-reveal skills-reveal-delay-1 flex flex-col gap-4 mb-8 p-3 sm:p-4 rounded-2xl bg-[#111827]/70 border border-white/[0.08] backdrop-blur-md">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter skills by category">
            <button
              onClick={() => setSelectedCategory('all')}
              aria-pressed={selectedCategory === 'all'}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold font-mono transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-violet-500 text-white shadow-md shadow-violet-600/25'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
              }`}
            >
              All skills <span className="ml-1 opacity-70">{skills.length}</span>
            </button>
            {categories.map((cat) => {
              const count = skills.filter((s) => s.category_id === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  aria-pressed={selectedCategory === cat.id}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold font-mono transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-violet-500 text-white shadow-md shadow-violet-600/25'
                      : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
                  }`}
                >
                  {cat.name} <span className="ml-1 opacity-70">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input & View Mode Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-t border-white/[0.06] pt-3">
            <label className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search skills"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-xs text-white placeholder-slate-500 outline-none focus:border-violet-500 transition-all"
              />
            </label>

            <div className="flex items-center self-start sm:self-auto p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] shrink-0" role="group" aria-label="Skill layout">
              <button
                onClick={() => setViewMode('bento')}
                aria-pressed={viewMode === 'bento'}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  viewMode === 'bento'
                    ? 'bg-violet-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Categorized
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                aria-pressed={viewMode === 'matrix'}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  viewMode === 'matrix'
                    ? 'bg-violet-500 text-white'
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
            <div className="skills-category-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {categories.map((cat) => {
                const catSkills = skills.filter((s) => s.category_id === cat.id);
                return (
                  <div
                    key={cat.id}
                    className="skill-category-card skills-reveal relative overflow-hidden p-5 sm:p-6 rounded-3xl bg-[#101522]/90 border border-white/[0.08] hover:border-violet-400/30 hover:bg-[#121a2b] transition-all duration-300"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-violet-400/50 via-cyan-300/20 to-transparent" />
                    <div className="relative">
                      <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/[0.07]">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="h-9 w-1 rounded-full bg-gradient-to-b from-violet-400 to-cyan-400" />
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                              {cat.name}
                            </h3>
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.15em]">
                              Technical domain
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-slate-400 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] shrink-0">
                          {catSkills.length}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4">
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
                              className={`group/skill min-w-0 flex items-center gap-3 p-3 rounded-xl bg-white/[0.025] border border-white/[0.06] ${theme.borderHover} hover:bg-white/[0.05] transition-all`}
                            >
                              <div
                                className={`w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 transition-transform group-hover/skill:scale-105 ${theme.bgHover}`}
                                style={{ color: theme.color }}
                              >
                                {iconMap[skill.icon || 'Code'] || (
                                  <Code className="w-4 h-4" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <span className="block text-xs sm:text-[13px] font-semibold text-slate-200 group-hover/skill:text-white truncate">
                                  {skill.name}
                                </span>
                                {skill.proficiency_label && (
                                  <span className={`mt-1 inline-block text-[9px] leading-4 font-mono px-1.5 rounded border ${theme.pill}`}>
                                    {skill.proficiency_label}
                                  </span>
                                )}
                              </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
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
                    className={`group min-w-0 p-4 sm:p-5 rounded-2xl bg-[#101522]/90 border border-white/[0.08] ${theme.borderHover} hover:bg-[#121a2b] transition-all flex items-center gap-4`}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${theme.bgHover}`}
                      style={{ color: theme.color }}
                    >
                      {iconMap[skill.icon || 'Code'] || (
                        <Code className="w-5 h-5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-violet-300 transition-colors truncate">
                        {skill.name}
                      </h4>
                      <p className="mt-1 text-[11px] font-mono text-slate-400 truncate">
                        {skill.category_name || 'Technical Domain'}
                      </p>
                      {skill.proficiency_label && (
                        <span className={`mt-2 inline-block text-[10px] font-mono px-2 py-0.5 rounded-full border ${theme.pill}`}>
                          {skill.proficiency_label}
                        </span>
                      )}
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
