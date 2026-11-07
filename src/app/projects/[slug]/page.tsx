import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ExternalLink,
  Layers,
  CheckCircle2,
  Calendar,
  Cpu,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { getProjectBySlug, getProjects } from '@/lib/data/store';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects(false);
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} - ${project.category}`,
    description: project.short_description,
    openGraph: {
      title: `${project.title} | Gokul Chandel`,
      description: project.short_description,
      type: 'article',
      url: `/projects/${project.slug}`,
      images: [
        {
          url: project.thumbnail_url || '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#080B12] text-[#F8FAFC]">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumb / Back button */}
          <div>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors group px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08]"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Projects</span>
            </Link>
          </div>

          {/* Hero Banner Header */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#111827] via-[#0D1220] to-[#080B12] border border-white/[0.08] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 blur-3xl pointer-events-none" />

            <div className="space-y-4 max-w-3xl relative z-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                  {project.category}
                </span>
                {project.is_featured && (
                  <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>Featured Showcase</span>
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                {project.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                {project.short_description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all shadow-lg shadow-violet-600/25"
                  >
                    <span>Visit Live Application</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-slate-200 hover:text-white font-medium text-sm transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Explore Repository</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Technology Badges Matrix */}
          <div className="p-6 rounded-2xl bg-[#111827]/60 border border-white/[0.08]">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
              Technologies & Infrastructure
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-violet-600/10 border border-violet-500/25 text-violet-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-[#111827]/80 border border-white/[0.08] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                !
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">The Problem</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.problem_statement}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#111827]/80 border border-white/[0.08] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">The Solution</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Full Deep-Dive Description */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#111827]/80 border border-white/[0.08] space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">Detailed Architecture</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.full_description}
            </p>
          </div>

          {/* Key Features List */}
          {project.features && project.features.length > 0 && (
            <div className="p-8 sm:p-10 rounded-2xl bg-[#111827]/80 border border-white/[0.08] space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                <span>Key Platform Features</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personal Engineering Contributions */}
          {project.contributions && project.contributions.length > 0 && (
            <div className="p-8 sm:p-10 rounded-2xl bg-[#111827]/80 border border-white/[0.08] space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Cpu className="w-5 h-5 text-violet-400" />
                <span>My Direct Engineering Contributions</span>
              </h3>
              <div className="space-y-3">
                {project.contributions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="w-2 h-2 rounded-full bg-violet-400 shrink-0 mt-2" />
                    <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="pt-8 border-t border-white/[0.08] flex items-center justify-between">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all projects</span>
            </Link>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs transition-all shadow-md shadow-violet-600/20"
            >
              <span>Discuss Similar Requirements</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
