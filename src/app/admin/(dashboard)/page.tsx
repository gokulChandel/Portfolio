import React from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  Code2,
  MessageSquare,
  User,
  ArrowRight,
  Database,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  PlusCircle,
  Clock,
} from 'lucide-react';
import {
  getProjects,
  getSkills,
  getContactMessages,
  getProfile,
} from '@/lib/data/store';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export default async function AdminOverviewPage() {
  const [projects, skills, messages, profile] = await Promise.all([
    getProjects(false),
    getSkills(false),
    getContactMessages(),
    getProfile(),
  ]);

  const publishedProjects = projects.filter((p) => p.is_published).length;
  const activeSkills = skills.filter((s) => s.is_active).length;
  const unreadMessages = messages.filter((m) => m.status === 'unread').length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-[#111827]/80 border border-white/[0.08]">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-400">
            Welcome back, Gokul. Manage your portfolio content, technical skills, projects, and incoming messages.
          </p>
        </div>

        {/* Database Status Badge */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono self-start sm:self-auto">
          <Database className="w-4 h-4 text-violet-400" />
          <span className="text-slate-400">Database:</span>
          {isSupabaseConfigured ? (
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Supabase Connected
            </span>
          ) : (
            <span className="text-cyan-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Unified Local Store Active
            </span>
          )}
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Projects KPI */}
        <div className="p-6 rounded-2xl bg-[#111827]/80 border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>Projects</span>
            <FolderKanban className="w-4 h-4 text-violet-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white tracking-tight">{projects.length}</span>
            <span className="text-xs text-emerald-400 font-mono">({publishedProjects} published)</span>
          </div>
          <p className="text-xs text-slate-400">Active portfolio showcases</p>
        </div>

        {/* Skills KPI */}
        <div className="p-6 rounded-2xl bg-[#111827]/80 border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>Technical Skills</span>
            <Code2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white tracking-tight">{skills.length}</span>
            <span className="text-xs text-emerald-400 font-mono">({activeSkills} visible)</span>
          </div>
          <p className="text-xs text-slate-400">Categorized technologies</p>
        </div>

        {/* Inquiries KPI */}
        <div className="p-6 rounded-2xl bg-[#111827]/80 border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>Inquiries</span>
            <MessageSquare className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white tracking-tight">{messages.length}</span>
            {unreadMessages > 0 ? (
              <span className="text-xs text-rose-400 font-mono font-semibold">({unreadMessages} unread)</span>
            ) : (
              <span className="text-xs text-slate-400 font-mono">(All caught up)</span>
            )}
          </div>
          <p className="text-xs text-slate-400">Client and recruiter messages</p>
        </div>

        {/* Profile Status */}
        <div className="p-6 rounded-2xl bg-[#111827]/80 border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>Status</span>
            <User className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-white tracking-tight truncate">
              {profile.current_company}
            </span>
          </div>
          <p className="text-xs text-emerald-400 font-mono truncate">{profile.availability_status}</p>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-wider text-slate-400">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/projects"
            className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-violet-500/50 hover:bg-violet-600/5 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <PlusCircle className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-semibold text-white">Manage Projects</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/admin/skills"
            className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <PlusCircle className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-white">Add / Edit Skills</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/admin/profile"
            className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-semibold text-white">Update Profile Info</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/admin/messages"
            className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-500/50 hover:bg-amber-500/5 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-white">View Inquiries</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>

      {/* Tables: Recent Inquiries & Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Messages */}
        <div className="p-6 rounded-2xl bg-[#111827]/80 border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-violet-400" />
              <span>Recent Inquiries</span>
            </h3>
            <Link
              href="/admin/messages"
              className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
            >
              View all ({messages.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {messages.slice(0, 4).map((msg) => (
              <div
                key={msg.id}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-4"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white truncate">{msg.name}</p>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-md ${
                        msg.status === 'unread'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                      }`}
                    >
                      {msg.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{msg.subject}</p>
                </div>
                <span className="text-[11px] font-mono text-slate-500 shrink-0">
                  {new Date(msg.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}

            {messages.length === 0 && (
              <p className="text-xs text-slate-500 py-6 text-center">No messages received yet.</p>
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="p-6 rounded-2xl bg-[#111827]/80 border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-cyan-400" />
              <span>Portfolio Projects</span>
            </h3>
            <Link
              href="/admin/projects"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Manage all ({projects.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 4).map((project) => (
              <div
                key={project.id}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-4"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white truncate">{project.title}</p>
                    {project.is_featured && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-400 border border-violet-500/20">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 truncate">{project.category}</p>
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  target="_blank"
                  className="p-1.5 rounded-lg bg-white/[0.04] text-slate-400 hover:text-white"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
