'use client';

import React, { useState, useEffect } from 'react';
import {
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  User,
  Briefcase,
  Mail,
  FileText,
  Plus,
  Trash2,
} from 'lucide-react';
import { Profile } from '@/types';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/admin/profile');
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch (err) {
      console.error('Fetch profile error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      void fetchProfile();
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      if (!res.ok) {
        throw new Error('Failed to update profile');
      }

      setStatusMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : 'Update failed';
      setStatusMessage({ type: 'error', text });
    } finally {
      setSaving(false);
    }
  };

  const updateStringList = (
    field: 'about_paragraphs' | 'career_targets' | 'primary_expertise',
    index: number,
    value: string
  ) => {
    setProfile((current) =>
      current
        ? { ...current, [field]: current[field].map((item, itemIndex) => itemIndex === index ? value : item) }
        : current
    );
  };

  const addStringListItem = (
    field: 'about_paragraphs' | 'career_targets' | 'primary_expertise'
  ) => {
    setProfile((current) => current ? { ...current, [field]: [...current[field], ''] } : current);
  };

  const removeStringListItem = (
    field: 'about_paragraphs' | 'career_targets' | 'primary_expertise',
    index: number
  ) => {
    setProfile((current) =>
      current
        ? { ...current, [field]: current[field].filter((_, itemIndex) => itemIndex !== index) }
        : current
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return <div className="text-rose-400">Error loading profile data.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Profile Management</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Edit your personal details, professional title, bio, and career targets.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-violet-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-violet-600/20 cursor-pointer disabled:cursor-not-allowed self-start sm:self-auto"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving...' : 'Save Profile'}</span>
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#111827]/80 border border-white/[0.08] space-y-6">
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <User className="w-4 h-4 text-violet-400" />
            <span>Personal & Professional Identity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300 block">Full Name</label>
              <input
                type="text"
                required
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300 block">
                Professional Title
              </label>
              <input
                type="text"
                required
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-mono uppercase text-slate-300 block">
                Hero Subtitle (Supporting Headline)
              </label>
              <input
                type="text"
                required
                value={profile.subtitle}
                onChange={(e) => setProfile({ ...profile, subtitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-mono uppercase text-slate-300 block">
                Hero Short Bio
              </label>
              <textarea
                rows={3}
                required
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500 resize-y"
              />
            </div>
          </div>
        </div>

        {/* Current Employment & Experience */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#111827]/80 border border-white/[0.08] space-y-6">
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-cyan-400" />
            <span>Employment & Status</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300 block">
                Current Organization
              </label>
              <input
                type="text"
                required
                value={profile.current_company}
                onChange={(e) => setProfile({ ...profile, current_company: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300 block">
                Total Experience
              </label>
              <input
                type="text"
                required
                value={profile.experience_years}
                onChange={(e) => setProfile({ ...profile, experience_years: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300 block">
                Availability Status
              </label>
              <input
                type="text"
                required
                value={profile.availability_status}
                onChange={(e) => setProfile({ ...profile, availability_status: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
              />
            </div>
          </div>
        </div>

        {/* About Section Content */}
        <div className="p-5 sm:p-8 rounded-2xl bg-[#111827]/80 border border-white/[0.08] space-y-7">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <FileText className="w-4 h-4 text-violet-400" />
              <span>About Section Settings</span>
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Edit the About section copy, highlights, career roles, and competencies shown on your portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="about-label" className="text-xs font-mono uppercase text-slate-300 block">
                Eyebrow Label
              </label>
              <input
                id="about-label"
                type="text"
                required
                value={profile.about_label}
                onChange={(e) => setProfile({ ...profile, about_label: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="about-heading" className="text-xs font-mono uppercase text-slate-300 block">
                Section Heading
              </label>
              <input
                id="about-heading"
                type="text"
                required
                value={profile.about_heading}
                onChange={(e) => setProfile({ ...profile, about_heading: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="about-description" className="text-xs font-mono uppercase text-slate-300 block">
                Section Intro
              </label>
              <textarea
                id="about-description"
                rows={3}
                required
                value={profile.about_description}
                onChange={(e) => setProfile({ ...profile, about_description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500 resize-y"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-100">About Paragraphs</h3>
              <button
                type="button"
                onClick={() => addStringListItem('about_paragraphs')}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-violet-400/20 px-3 text-xs font-medium text-violet-200 hover:bg-violet-500/10"
              >
                <Plus className="h-3.5 w-3.5" /> Add paragraph
              </button>
            </div>
            {profile.about_paragraphs.map((paragraph, index) => (
              <div key={index} className="flex items-start gap-2">
                <textarea
                  aria-label={`About paragraph ${index + 1}`}
                  rows={3}
                  required
                  value={paragraph}
                  onChange={(e) => updateStringList('about_paragraphs', index, e.target.value)}
                  className="min-w-0 flex-1 px-4 py-3 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500 resize-y"
                />
                <button
                  type="button"
                  onClick={() => removeStringListItem('about_paragraphs', index)}
                  aria-label={`Remove paragraph ${index + 1}`}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-rose-300 hover:bg-rose-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-100">Career Target Roles</h3>
              <button
                type="button"
                onClick={() => addStringListItem('career_targets')}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-violet-400/20 px-3 text-xs font-medium text-violet-200 hover:bg-violet-500/10"
              >
                <Plus className="h-3.5 w-3.5" /> Add role
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {profile.career_targets.map((role, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    aria-label={`Career target role ${index + 1}`}
                    value={role}
                    onChange={(e) => updateStringList('career_targets', index, e.target.value)}
                    className="min-w-0 flex-1 px-4 py-3 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeStringListItem('career_targets', index)}
                    aria-label={`Remove role ${index + 1}`}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-rose-300 hover:bg-rose-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-100">Core Competencies</h3>
              <button
                type="button"
                onClick={() => addStringListItem('primary_expertise')}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-cyan-400/20 px-3 text-xs font-medium text-cyan-200 hover:bg-cyan-500/10"
              >
                <Plus className="h-3.5 w-3.5" /> Add competency
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {profile.primary_expertise.map((competency, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    aria-label={`Core competency ${index + 1}`}
                    value={competency}
                    onChange={(e) => updateStringList('primary_expertise', index, e.target.value)}
                    className="min-w-0 flex-1 px-4 py-3 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeStringListItem('primary_expertise', index)}
                    aria-label={`Remove competency ${index + 1}`}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-rose-300 hover:bg-rose-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-100">Highlight Cards</h3>
              <button
                type="button"
                onClick={() => setProfile({
                  ...profile,
                  highlights: [...profile.highlights, { label: '', sublabel: '', icon: 'Code2' }],
                })}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-violet-400/20 px-3 text-xs font-medium text-violet-200 hover:bg-violet-500/10"
              >
                <Plus className="h-3.5 w-3.5" /> Add highlight
              </button>
            </div>
            <div className="space-y-3">
              {profile.highlights.map((highlight, index) => (
                <div key={index} className="grid grid-cols-1 gap-3 rounded-xl border border-white/[0.06] bg-[#080B12]/40 p-3 sm:grid-cols-[1fr_1.5fr_9rem_2.75rem] sm:items-center">
                  <input
                    type="text"
                    required
                    aria-label={`Highlight ${index + 1} title`}
                    placeholder="Highlight title"
                    value={highlight.label}
                    onChange={(e) => setProfile({
                      ...profile,
                      highlights: profile.highlights.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, label: e.target.value } : item
                      ),
                    })}
                    className="w-full min-w-0 px-3 py-2.5 rounded-lg bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
                  />
                  <input
                    type="text"
                    required
                    aria-label={`Highlight ${index + 1} description`}
                    placeholder="Short description"
                    value={highlight.sublabel}
                    onChange={(e) => setProfile({
                      ...profile,
                      highlights: profile.highlights.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, sublabel: e.target.value } : item
                      ),
                    })}
                    className="w-full min-w-0 px-3 py-2.5 rounded-lg bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
                  />
                  <select
                    aria-label={`Highlight ${index + 1} icon`}
                    value={highlight.icon}
                    onChange={(e) => setProfile({
                      ...profile,
                      highlights: profile.highlights.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, icon: e.target.value } : item
                      ),
                    })}
                    className="w-full min-w-0 px-3 py-2.5 rounded-lg bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
                  >
                    {['Briefcase', 'Layers', 'Code2', 'Server'].map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setProfile({
                      ...profile,
                      highlights: profile.highlights.filter((_, itemIndex) => itemIndex !== index),
                    })}
                    aria-label={`Remove highlight ${index + 1}`}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-rose-300 hover:bg-rose-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact & Social Links */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#111827]/80 border border-white/[0.08] space-y-6">
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Contact & Profiles</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300 block">Email</label>
              <input
                type="email"
                required
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300 block">Phone</label>
              <input
                type="tel"
                value={profile.phone || ''}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300 block">Location</label>
              <input
                type="text"
                required
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300 block">GitHub URL</label>
              <input
                type="url"
                required
                value={profile.github_url}
                onChange={(e) => setProfile({ ...profile, github_url: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300 block">
                LinkedIn URL
              </label>
              <input
                type="url"
                required
                value={profile.linkedin_url}
                onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-mono uppercase text-slate-300 block">
                Resume Path or URL
              </label>
              <input
                type="text"
                required
                value={profile.resume_url}
                onChange={(e) => setProfile({ ...profile, resume_url: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
