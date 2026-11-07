'use client';

import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Award,
  Plus,
  Pencil,
  Trash2,
  Calendar,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
} from 'lucide-react';
import { Education, Certification } from '@/types';

export default function AdminEducationPage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [eduModalOpen, setEduModalOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Forms
  const [eduForm, setEduForm] = useState({
    institution: '',
    degree: '',
    field_of_study: '',
    start_date: '2018',
    end_date: '2022',
    grade: '',
    description: '',
    display_order: 1,
  });

  const [certForm, setCertForm] = useState({
    name: '',
    issuer: '',
    issue_date: '2022',
    credential_url: '',
    description: '',
    display_order: 1,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [eduRes, certRes] = await Promise.all([
        fetch('/api/admin/education'),
        fetch('/api/admin/certifications'),
      ]);
      if (eduRes.ok && certRes.ok) {
        const eduData = await eduRes.json();
        const certData = await certRes.json();
        setEducation(eduData || []);
        setCertifications(certData || []);
      }
    } catch (err) {
      console.error('Fetch edu error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Education Handlers
  const openAddEdu = () => {
    setEditingEdu(null);
    setEduForm({
      institution: '',
      degree: '',
      field_of_study: '',
      start_date: '2018',
      end_date: '2022',
      grade: 'First Class with Distinction',
      description: 'Core coursework in Data Structures, Algorithms, DBMS, Networks, and Software Engineering.',
      display_order: education.length + 1,
    });
    setEduModalOpen(true);
  };

  const openEditEdu = (item: Education) => {
    setEditingEdu(item);
    setEduForm({
      institution: item.institution,
      degree: item.degree,
      field_of_study: item.field_of_study,
      start_date: item.start_date,
      end_date: item.end_date,
      grade: item.grade || '',
      description: item.description || '',
      display_order: item.display_order,
    });
    setEduModalOpen(true);
  };

  const handleSaveEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    const payload: Partial<Education> = { ...eduForm };
    if (editingEdu) payload.id = editingEdu.id;

    try {
      const res = await fetch('/api/admin/education', {
        method: editingEdu ? 'POST' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save education entry');
      setEduModalOpen(false);
      setStatusMessage({ type: 'success', text: 'Education saved successfully.' });
      fetchData();
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : 'Save failed';
      setStatusMessage({ type: 'error', text });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEdu = async (id: string, name: string) => {
    if (!confirm(`Delete education record "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/education?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setStatusMessage({ type: 'success', text: 'Education deleted.' });
      setEducation(education.filter((e) => e.id !== id));
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : 'Delete failed';
      setStatusMessage({ type: 'error', text });
    }
  };

  // Certifications Handlers
  const openAddCert = () => {
    setEditingCert(null);
    setCertForm({
      name: '',
      issuer: '',
      issue_date: '2022',
      credential_url: '',
      description: '',
      display_order: certifications.length + 1,
    });
    setCertModalOpen(true);
  };

  const openEditCert = (item: Certification) => {
    setEditingCert(item);
    setCertForm({
      name: item.name,
      issuer: item.issuer,
      issue_date: item.issue_date,
      credential_url: item.credential_url || '',
      description: item.description || '',
      display_order: item.display_order,
    });
    setCertModalOpen(true);
  };

  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    const payload: Partial<Certification> = { ...certForm };
    if (editingCert) payload.id = editingCert.id;

    try {
      const res = await fetch('/api/admin/certifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save certification');
      setCertModalOpen(false);
      setStatusMessage({ type: 'success', text: 'Certification saved successfully.' });
      fetchData();
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : 'Save failed';
      setStatusMessage({ type: 'error', text });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCert = async (id: string, name: string) => {
    if (!confirm(`Delete certification "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/certifications?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setStatusMessage({ type: 'success', text: 'Certification deleted.' });
      setCertifications(certifications.filter((c) => c.id !== id));
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : 'Delete failed';
      setStatusMessage({ type: 'error', text });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Education & Certifications</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Manage academic degrees, courses, and professional credentials.
          </p>
        </div>
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

      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Education Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-violet-400" />
                <span>Formal Education</span>
              </h2>
              <button
                onClick={openAddEdu}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs transition-all shadow-md shadow-violet-600/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Education</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-6 rounded-2xl bg-[#111827]/80 border border-white/[0.08] flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                    <p className="text-xs font-semibold text-violet-400">{edu.field_of_study}</p>
                    <p className="text-xs text-slate-300">{edu.institution}</p>
                    <p className="text-xs font-mono text-slate-500">
                      {edu.start_date} - {edu.end_date} {edu.grade ? `• ${edu.grade}` : ''}
                    </p>
                    {edu.description && (
                      <p className="text-xs text-slate-400 pt-1">{edu.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => openEditEdu(edu)}
                      className="p-1.5 rounded-lg bg-white/[0.04] text-slate-400 hover:text-white"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEdu(edu.id, edu.degree)}
                      className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div className="space-y-4 pt-4 border-t border-white/[0.08]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" />
                <span>Certifications</span>
              </h2>
              <button
                onClick={openAddCert}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition-all shadow-md shadow-cyan-600/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Certification</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-6 rounded-2xl bg-[#111827]/80 border border-white/[0.08] flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white">{cert.name}</h3>
                    <p className="text-xs font-semibold text-cyan-400">{cert.issuer}</p>
                    <p className="text-xs font-mono text-slate-500">Issued {cert.issue_date}</p>
                    {cert.description && (
                      <p className="text-xs text-slate-400 pt-1">{cert.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => openEditCert(cert)}
                      className="p-1.5 rounded-lg bg-white/[0.04] text-slate-400 hover:text-white"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCert(cert.id, cert.name)}
                      className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Education Modal */}
      {eduModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#111827] border border-white/[0.1] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-lg font-bold text-white">
                {editingEdu ? 'Edit Education' : 'Add Education'}
              </h3>
              <button onClick={() => setEduModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdu} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Degree</label>
                <input
                  type="text"
                  required
                  value={eduForm.degree}
                  onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-xs outline-none focus:border-violet-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Field of Study</label>
                <input
                  type="text"
                  required
                  value={eduForm.field_of_study}
                  onChange={(e) => setEduForm({ ...eduForm, field_of_study: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-xs outline-none focus:border-violet-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Institution / University</label>
                <input
                  type="text"
                  required
                  value={eduForm.institution}
                  onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-xs outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">Start Year</label>
                  <input
                    type="text"
                    required
                    value={eduForm.start_date}
                    onChange={(e) => setEduForm({ ...eduForm, start_date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">End Year</label>
                  <input
                    type="text"
                    required
                    value={eduForm.end_date}
                    onChange={(e) => setEduForm({ ...eduForm, end_date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Grade / Honors</label>
                <input
                  type="text"
                  value={eduForm.grade}
                  onChange={(e) => setEduForm({ ...eduForm, grade: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-xs outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setEduModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certification Modal */}
      {certModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#111827] border border-white/[0.1] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-lg font-bold text-white">
                {editingCert ? 'Edit Certification' : 'Add Certification'}
              </h3>
              <button onClick={() => setCertModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCert} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Certification Name</label>
                <input
                  type="text"
                  required
                  value={certForm.name}
                  onChange={(e) => setCertForm({ ...certForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-xs outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Issuer / Authority</label>
                <input
                  type="text"
                  required
                  value={certForm.issuer}
                  onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-xs outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Issue Date / Year</label>
                <input
                  type="text"
                  required
                  value={certForm.issue_date}
                  onChange={(e) => setCertForm({ ...certForm, issue_date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-xs outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Credential URL</label>
                <input
                  type="url"
                  value={certForm.credential_url}
                  onChange={(e) => setCertForm({ ...certForm, credential_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#080B12] border border-white/[0.08] text-white text-xs outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setCertModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
