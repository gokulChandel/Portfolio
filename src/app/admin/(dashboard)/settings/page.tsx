'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Globe,
  Share2,
  Palette,
} from 'lucide-react';
import type { SiteColors, SiteSettings } from '@/types';
import {
  applyColorCssVariables,
  SITE_COLOR_FIELDS,
  SITE_COLOR_PRESETS,
} from '@/lib/siteColorThemes';

function ColorModeEditor({
  mode,
  colors,
  onChange,
}: {
  mode: 'light' | 'dark';
  colors: SiteColors;
  onChange: (colors: SiteColors) => void;
}) {
  const modeName = mode === 'light' ? 'Normal / Light mode' : 'Dark mode';

  return (
    <section className="rounded-2xl border border-white/[0.08] bg-[#080B12]/45 p-5 sm:p-6 space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-white">{modeName}</h3>
        <p className="mt-1 text-sm text-slate-400">
          Select a preset, then customize each color with the color picker.
        </p>
      </div>

      <div className="flex flex-wrap gap-2" aria-label={`${modeName} color presets`}>
        {SITE_COLOR_PRESETS.map((preset) => {
          const presetColors = preset[mode];
          const selected = SITE_COLOR_FIELDS.every(({ key }) => colors[key] === presetColors[key]);

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onChange({ ...presetColors })}
              aria-pressed={selected}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition-colors ${
                selected
                  ? 'border-violet-400/70 bg-violet-500/10 text-white'
                  : 'border-white/[0.1] text-slate-300 hover:border-white/25'
              }`}
            >
              <span className="flex gap-0.5" aria-hidden="true">
                {[presetColors.background, presetColors.text, presetColors.accent].map((color) => (
                  <span key={color} className="h-3 w-3 rounded-full border border-white/20" style={{ backgroundColor: color }} />
                ))}
              </span>
              {preset.name}
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {SITE_COLOR_FIELDS.map(({ key, label, description }) => (
          <label
            key={key}
            className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3"
          >
            <span className="min-w-0">
              <span className="block text-sm font-medium text-white">{label}</span>
              <span className="block text-xs text-slate-400">{description}</span>
            </span>
            <span className="flex shrink-0 items-center gap-2 rounded-lg border border-white/[0.1] bg-[#080B12] px-2 py-1.5">
              <input
                type="color"
                aria-label={`${modeName} ${label}`}
                value={colors[key]}
                onChange={(event) => onChange({ ...colors, [key]: event.target.value.toUpperCase() })}
                className="h-8 w-9 cursor-pointer rounded border-0 bg-transparent p-0"
              />
              <span className="w-[4.5rem] font-mono text-xs uppercase text-slate-300">{colors[key]}</span>
            </span>
          </label>
        ))}
      </div>

      <div
        className="rounded-xl border p-4"
        style={{ backgroundColor: colors.background, borderColor: `${colors.accent}66` }}
      >
        <p className="text-xs font-medium uppercase tracking-wide" style={{ color: colors.mutedText }}>
          Live preview
        </p>
        <div className="mt-3 rounded-lg border p-4" style={{ backgroundColor: colors.card, borderColor: `${colors.accent}55` }}>
          <p className="text-lg font-bold" style={{ color: colors.text }}>Gokul Chandel</p>
          <p className="mt-1 text-sm font-semibold" style={{ color: colors.accent }}>Full Stack Developer</p>
          <p className="mt-1 text-sm" style={{ color: colors.secondaryText }}>Builds thoughtful digital experiences.</p>
          <span
            className="mt-3 inline-flex rounded-lg px-3 py-1.5 text-xs font-semibold"
            style={{
              backgroundColor: colors.accent,
              color: colors.buttonText,
            }}
          >
            Explore my work
          </span>
        </div>
      </div>
    </section>
  );
}

export default function AdminSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (settings) applyColorCssVariables(settings.light_colors, settings.dark_colors);
  }, [settings]);

  useEffect(() => {
    let active = true;

    fetch('/api/admin/settings')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load website settings');
        return res.json();
      })
      .then((data) => {
        if (active) setSettings(data);
      })
      .catch((err: unknown) => {
        console.error('Fetch settings error:', err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
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

      applyColorCssVariables(settings.light_colors, settings.dark_colors);
      router.refresh();
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
        <section
          aria-labelledby="color-theme-heading"
          className="p-6 sm:p-8 rounded-2xl bg-[#111827]/80 border border-white/[0.08] space-y-5"
        >
          <div>
            <h2
              id="color-theme-heading"
              className="text-base font-bold text-white tracking-tight flex items-center gap-2"
            >
              <Palette className="w-4 h-4 text-violet-400" />
              <span>Website Color Palette</span>
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Customize both appearances independently. Color changes apply across the full public site.
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            <ColorModeEditor
              mode="light"
              colors={settings.light_colors}
              onChange={(light_colors) => setSettings({ ...settings, light_colors })}
            />
            <ColorModeEditor
              mode="dark"
              colors={settings.dark_colors}
              onChange={(dark_colors) => setSettings({ ...settings, dark_colors })}
            />
          </div>
        </section>

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
