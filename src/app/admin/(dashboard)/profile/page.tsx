'use client';

import React, { useState, useEffect } from 'react';
import { Save, Loader2, CheckCircle2, AlertCircle, User, Briefcase, Mail } from 'lucide-react';
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
