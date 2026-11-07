'use client';

import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Plus,
  Pencil,
  Trash2,
  Calendar,
  MapPin,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';
import { Experience } from '@/types';

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: 'India',
    period: '2022 - Present (2+ Years)',
    start_date: '2022-08-01',
    end_date: '',
    is_current: true,
    description: '',
    responsibilities: '',
    technologies: '',
    display_order: 1,
  });

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/experience');
      if (res.ok) {
        const data = await res.json();
        setExperiences(data || []);
      }
    } catch (err) {
      console.error('Fetch experience error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const openAddModal = () => {
    setEditingExp(null);
    setFormData({
      company: '',
      role: '',
      location: 'India',
      period: '2022 - Present (2+ Years)',
      start_date: '2022-08-01',
      end_date: '',
      is_current: true,
      description: 'Working on modern web application development using React.js, Node.js, Express.js, MongoDB.',
      responsibilities: 'Engineered full-stack features with MERN stack\nBuilt performant REST APIs with JWT authentication\nOptimized database indexing and queries',
      technologies: 'React.js, Node.js, Express.js, MongoDB, TypeScript, REST APIs',
      display_order: experiences.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (exp: Experience) => {
    setEditingExp(exp);
    setFormData({
      company: exp.company,
      role: exp.role,
      location: exp.location,
      period: exp.period,
      start_date: exp.start_date,
      end_date: exp.end_date || '',
      is_current: exp.is_current,
      description: exp.description,
      responsibilities: exp.responsibilities.join('\n'),
      technologies: exp.technologies.join(', '),
      display_order: exp.display_order,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    const respArray = formData.responsibilities
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);
    const techArray = formData.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: Partial<Experience> = {
      company: formData.company,
      role: formData.role,
      location: formData.location,
      period: formData.period,
      start_date: formData.start_date,
      end_date: formData.is_current ? null : formData.end_date,
      is_current: formData.is_current,
      description: formData.description,
      responsibilities: respArray,
      technologies: techArray,
      display_order: formData.display_order,
    };

    if (editingExp) {
      payload.id = editingExp.id;
    }

    try {
      const res = await fetch('/api/admin/experience', {
        method: editingExp ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to save experience');
      }

      setModalOpen(false);
      setStatusMessage({
        type: 'success',
        text: `Experience at "${formData.company}" saved successfully!`,
      });
      fetchExperiences();
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : 'Operation failed';
      setStatusMessage({ type: 'error', text });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, company: string) => {
    if (!confirm(`Delete experience entry for "${company}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/experience?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete experience');
      }

      setStatusMessage({ type: 'success', text: `Experience at "${company}" deleted.` });
      setExperiences(experiences.filter((e) => e.id !== id));
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Work Experience</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Maintain your professional employment timeline, duties, and technology stacks.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-violet-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
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

      {/* Experience List */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-6 rounded-2xl bg-[#111827]/80 border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-lg font-bold text-white tracking-tight">{exp.role}</h3>
                  <span className="text-violet-400 font-semibold text-sm">@ {exp.company}</span>
                  {exp.is_current && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Current
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                  </span>
                </div>

                <p className="text-sm text-slate-300 max-w-2xl pt-1 leading-relaxed">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => openEditModal(exp)}
                  className="p-2 rounded-xl bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
                  aria-label="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(exp.id, exp.company)}
                  className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                  aria-label="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {experiences.length === 0 && (
            <div className="p-12 text-center text-xs text-slate-500 bg-[#111827]/40 rounded-2xl border border-white/[0.06]">
              No experience records found.
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl rounded-2xl bg-[#111827] border border-white/[0.1] shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {editingExp ? 'Edit Experience' : 'Add Experience'}
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
                  <label className="text-xs font-mono uppercase text-slate-300 block">Company</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-300 block">Role</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-300 block">Location</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-300 block">
                    Period String
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="2022 - Present (2+ Years)"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-300 block">
                  Short Summary
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500 resize-y"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-300 block">
                  Responsibilities (one per line)
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500 resize-y"
                />
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

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-300">Currently Employed Here</span>
                <input
                  type="checkbox"
                  checked={formData.is_current}
                  onChange={(e) => setFormData({ ...formData, is_current: e.target.checked })}
                  className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500"
                />
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
                  {saving ? 'Saving...' : 'Save Experience'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
