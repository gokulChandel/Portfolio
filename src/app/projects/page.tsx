import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getProjects } from '@/lib/data/store';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProjectCard from '@/components/projects/ProjectCard';

export const metadata: Metadata = {
  title: 'All Projects & Systems Architecture',
  description: 'Full portfolio directory of web applications, full-stack systems, and software engineering projects by Gokul Chandel.',
};

export default async function ProjectsIndexPage() {
  const projects = await getProjects(true);

  return (
    <div className="min-h-screen bg-[#080B12] text-[#F8FAFC]">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Back button */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors group px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08]"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Section Header */}
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 inline-block">
              Archive & Showcase
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              All Projects & Technical Systems
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Explore production architectures, full-stack ERPs, pharmacy retail platforms, and CRM systems engineered with the MERN stack, Next.js, and modern REST APIs.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
