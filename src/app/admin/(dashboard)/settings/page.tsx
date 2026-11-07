'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Globe,
  Share2,
  ShieldCheck,
} from 'lucide-react';
import { SiteSettings } from '@/types';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (err) {
      console.error('Fetch settings error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) {
        throw new Error('Failed to update website settings');
      }

      setStatusMessage({ type: 'success', text: 'Site settings updated successfully!' });
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : 'Save failed';
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

  if (!settings) {
    return <div className="text-rose-400">Failed to load website settings.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Website Settings & SEO</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Control global metadata, search engine indexing, footer credits, and social defaults.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-violet-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-violet-600/20 cursor-pointer self-start sm:self-auto"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
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
        {/* SEO & Meta */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#111827]/80 border border-white/[0.08] space-y-6">
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Globe className="w-4 h-4 text-violet-400" />
            <span>Search Engine Optimization (SEO)</span>
          </h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300 block">
                Default Site Title
              </label>
              <input
                type="text"
                required
                value={settings.site_title}
                onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300 block">
                Meta Description
              </label>
              <textarea
                rows={3}
                required
                value={settings.meta_description}
                onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500 resize-y"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300 block">
                Keywords (comma separated)
              </label>
              <input
                type="text"
                value={settings.keywords.join(', ')}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    keywords: e.target.value
                      .split(',')
                      .map((k) => k.trim())
                      .filter(Boolean),
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
              />
            </div>
          </div>
        </div>

        {/* Global Footer & Branding */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#111827]/80 border border-white/[0.08] space-y-6">
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Share2 className="w-4 h-4 text-cyan-400" />
            <span>Footer & Status Flags</span>
          </h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300 block">
                Footer Copyright Text
              </label>
              <input
                type="text"
                required
                value={settings.footer_text}
                onChange={(e) => setSettings({ ...settings, footer_text: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#080B12]/80 border border-white/[0.08] text-white text-sm outline-none focus:border-violet-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-between p-4 rounded-xl bg-[#080B12]/80 border border-white/[0.06]">
              <div>
                <p className="text-sm font-semibold text-white">Open for New Roles (Hireable)</p>
                <p className="text-xs text-slate-400">
                  Displays the &quot;Available for opportunities&quot; green indicator on the hero section.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.is_hireable}
                onChange={(e) => setSettings({ ...settings, is_hireable: e.target.checked })}
                className="w-5 h-5 rounded text-violet-600 focus:ring-violet-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
