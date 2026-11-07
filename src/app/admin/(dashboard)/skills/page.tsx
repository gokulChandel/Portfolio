'use client';

import React, { useState, useEffect } from 'react';
import {
  Code2,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { Skill, SkillCategory } from '@/types';

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    proficiency_label: 'Experienced',
    icon: 'Code',
    display_order: 1,
    is_active: true,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/skills');
      if (res.ok) {
        const data = await res.json();
        setSkills(data.skills || []);
        setCategories(data.categories || []);
        if (data.categories && data.categories.length > 0 && !formData.category_id) {
          setFormData((prev) => ({ ...prev, category_id: data.categories[0].id }));
        }
      }
    } catch (err) {
      console.error('Fetch skills error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category_id: categories[0]?.id || 'cat-frontend',
      proficiency_label: 'Experienced',
      icon: 'Code',
      display_order: skills.length + 1,
      is_active: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category_id: skill.category_id,
      proficiency_label: skill.proficiency_label || 'Experienced',
      icon: skill.icon || 'Code',
      display_order: skill.display_order,
      is_active: skill.is_active,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    const category = categories.find((c) => c.id === formData.category_id);
    const payload: Partial<Skill> = {
      ...formData,
      category_name: category?.name,
    };

    if (editingSkill) {
      payload.id = editingSkill.id;
    }

    try {
      const res = await fetch('/api/admin/skills', {
        method: editingSkill ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to save skill');
      }

      setModalOpen(false);
      setStatusMessage({
        type: 'success',
        text: `Skill "${formData.name}" ${editingSkill ? 'updated' : 'added'} successfully!`,
      });
      fetchData();
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : 'Operation failed';
      setStatusMessage({ type: 'error', text });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/skills?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete skill');
      }

      setStatusMessage({ type: 'success', text: `Skill "${name}" deleted.` });
      setSkills(skills.filter((s) => s.id !== id));
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : 'Delete failed';
      setStatusMessage({ type: 'error', text });
    }
  };

  const handleToggleActive = async (skill: Skill) => {
    const updated = { ...skill, is_active: !skill.is_active };
    try {
      const res = await fetch('/api/admin/skills', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        setSkills(skills.map((s) => (s.id === skill.id ? updated : s)));
      }
    } catch (err) {
      console.error('Toggle error:', err);
    }
  };

  const filteredSkills =
    selectedCategory === 'all'
      ? skills
      : skills.filter((s) => s.category_id === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Technical Skills</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Manage your verified technologies, assign categories, and control visibility.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-violet-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Skill</span>
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

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-violet-600 text-white'
              : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          All ({skills.length})
        </button>
        {categories.map((cat) => {
          const count = skills.filter((s) => s.category_id === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-violet-600 text-white'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Skills Table */}
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
                  <th className="px-6 py-3.5">Skill Name</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Proficiency Label</th>
                  <th className="px-6 py-3.5">Order</th>
                  <th className="px-6 py-3.5">Visibility</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filteredSkills.map((skill) => {
                  const cat = categories.find((c) => c.id === skill.category_id);
                  return (
                    <tr key={skill.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 font-semibold text-white flex items-center gap-2.5">
                        <span className="p-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-violet-400">
                          <Code2 className="w-4 h-4" />
                        </span>
                        <span>{skill.name}</span>
                      </td>
                      <td className="px-6 py-4 text-xs font-mono text-slate-300">
                        {cat?.name || skill.category_name || 'General'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-slate-300">
                          {skill.proficiency_label || 'Proficient'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-mono text-slate-400">
                        #{skill.display_order}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleActive(skill)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                            skill.is_active
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                          }`}
                        >
                          {skill.is_active ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          <span>{skill.is_active ? 'Active' : 'Hidden'}</span>
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(skill)}
                            className="p-1.5 rounded-lg bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                            aria-label="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(skill.id, skill.name)}
                            className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                            aria-label="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredSkills.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-xs text-slate-500">
                      No skills found in this category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#111827] border border-white/[0.1] shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {editingSkill ? 'Edit Skill' : 'Add New Technical Skill'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-300 block">
                  Skill Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js, Docker, MongoDB"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-300 block">Category</label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-300 block">
                    Proficiency Label
                  </label>
                  <select
                    value={formData.proficiency_label}
                    onChange={(e) =>
                      setFormData({ ...formData, proficiency_label: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
                  >
                    <option value="Experienced">Experienced</option>
                    <option value="Proficient">Proficient</option>
                    <option value="Working Knowledge">Working Knowledge</option>
                    <option value="Learning">Learning</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-300 block">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({ ...formData, display_order: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-300">Visible on Public Portfolio</span>
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
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
                  {saving ? 'Saving...' : 'Save Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
