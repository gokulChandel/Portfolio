'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Loader2,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Project } from '@/types';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    short_description: '',
    full_description: '',
    problem_statement: '',
    solution: '',
    technologies: '',
    features: '',
    contributions: '',
    live_url: '',
    github_url: '',
    is_featured: false,
    is_published: true,
    display_order: 1,
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data || []);
      }
    } catch (err) {
      console.error('Fetch projects error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      category: '',
      short_description: '',
      full_description: '',
      problem_statement: '',
      solution: '',
      technologies: 'React.js, Node.js, Express.js, MongoDB, REST APIs',
      features: 'Role-based access control\nInteractive dashboard\nFast API endpoints',
      contributions: 'Architected backend REST services\nDesigned modular UI components',
      live_url: '',
      github_url: 'https://github.com/gokulchandel',
      is_featured: false,
      is_published: true,
      display_order: projects.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      category: project.category,
      short_description: project.short_description,
      full_description: project.full_description,
      problem_statement: project.problem_statement,
      solution: project.solution,
      technologies: project.technologies.join(', '),
      features: project.features.join('\n'),
      contributions: project.contributions.join('\n'),
      live_url: project.live_url || '',
      github_url: project.github_url || '',
      is_featured: project.is_featured,
      is_published: project.is_published,
      display_order: project.display_order,
    });
    setModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => {
      const slugAuto = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      return {
        ...prev,
        title: val,
        slug: !editingProject ? slugAuto : prev.slug,
      };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    const techArray = formData.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const featuresArray = formData.features
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);
    const contributionsArray = formData.contributions
      .split('\n')
      .map((c) => c.trim())
      .filter(Boolean);

    const payload: Partial<Project> = {
      title: formData.title,
      slug: formData.slug,
      category: formData.category,
      short_description: formData.short_description,
      full_description: formData.full_description,
      problem_statement: formData.problem_statement,
      solution: formData.solution,
      technologies: techArray,
      features: featuresArray,
      contributions: contributionsArray,
      live_url: formData.live_url,
      github_url: formData.github_url,
      is_featured: formData.is_featured,
      is_published: formData.is_published,
      display_order: formData.display_order,
      thumbnail_url: editingProject?.thumbnail_url || '/images/projects/default-thumb.webp',
      images: editingProject?.images || ['/images/projects/default-thumb.webp'],
    };

    if (editingProject) {
      payload.id = editingProject.id;
    }

    try {
      const res = await fetch('/api/admin/projects', {
        method: editingProject ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to save project');
      }

      setModalOpen(false);
      setStatusMessage({
        type: 'success',
        text: `Project "${formData.title}" saved successfully!`,
      });
      fetchProjects();
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : 'Operation failed';
      setStatusMessage({ type: 'error', text });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete project');
      }

      setStatusMessage({ type: 'success', text: `Project "${title}" deleted.` });
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : 'Delete failed';
      setStatusMessage({ type: 'error', text });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Project Showcases</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Create, edit, feature, and configure your verified engineering projects.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-violet-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-xs sm:text-sm flex items-center gap-2.5 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
              : 'bg-rose-500/10 border border-rose-500/20 text-rose-300'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Projects Table */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
        </div>
      ) : (
        <div className="rounded-2xl bg-[#111827]/80 border border-white/[0.08] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0D1220] border-b border-white/[0.08] text-[11px] font-mono uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-6 py-3.5">Project</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Technologies</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Featured</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-white block">{project.title}</span>
                        <span className="text-xs font-mono text-slate-500">/projects/{project.slug}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-300">
                      {project.category}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {project.technologies.slice(0, 3).map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                          >
                            {t}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-[10px] font-mono text-slate-400">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-medium ${
                          project.is_published
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                        }`}
                      >
                        {project.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {project.is_featured ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-violet-500/10 text-violet-400 border border-violet-500/20 flex items-center gap-1 w-max">
                          <Sparkles className="w-3 h-3" />
                          <span>Featured</span>
                        </span>
                      ) : (
                        <span className="text-slate-500 text-xs font-mono">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/projects/${project.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]"
                          aria-label="View on site"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => openEditModal(project)}
                          className="p-1.5 rounded-lg bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]"
                          aria-label="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id, project.title)}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Project Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-[#111827] border border-white/[0.1] shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-300 block">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-300 block">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-300 block">Category</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. School Management System, CRM Platform"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-300 block">
                  Short Description (Card Summary)
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500 resize-y"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-300 block">
                  Detailed Architecture Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.full_description}
                  onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500 resize-y"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-300 block">
                    Problem Statement
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.problem_statement}
                    onChange={(e) => setFormData({ ...formData, problem_statement: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-300 block">Solution</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-300 block">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  required
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-300 block">
                  Features (one per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500 resize-y"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-300 block">
                  Personal Contributions (one per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.contributions}
                  onChange={(e) => setFormData({ ...formData, contributions: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500 resize-y"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-300 block">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.github_url}
                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-300 block">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={formData.live_url}
                    onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500"
                  />
                  <span>Feature on Portfolio Top</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500"
                  />
                  <span>Published (Publicly Viewable)</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-all shadow-md shadow-violet-600/20 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
