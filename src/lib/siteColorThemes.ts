import type { CSSProperties } from 'react';
import type { SiteColors } from '@/types';

export const SITE_COLOR_FIELDS: {
  key: keyof SiteColors;
  label: string;
  description: string;
}[] = [
  { key: 'background', label: 'Page background', description: 'Main site background' },
  { key: 'surface', label: 'Section surface', description: 'Alternate sections and navigation' },
  { key: 'card', label: 'Cards', description: 'Cards, panels, and form fields' },
  { key: 'text', label: 'Main text', description: 'Headings and primary content' },
  { key: 'secondaryText', label: 'Secondary text', description: 'Supporting paragraphs' },
  { key: 'mutedText', label: 'Muted text', description: 'Labels and less prominent content' },
  { key: 'accent', label: 'Accent color', description: 'Buttons, links, and highlights' },
  { key: 'accentSecondary', label: 'Second accent', description: 'Gradients and decorative details' },
  { key: 'highlight', label: 'Warm highlight', description: 'Soft emphasis and extra details' },
  { key: 'buttonText', label: 'Button text', description: 'Text shown on filled accent buttons' },
];

export const SITE_COLOR_PRESETS: {
  id: string;
  name: string;
  light: SiteColors;
  dark: SiteColors;
}[] = [
  {
    id: 'lavender',
    name: 'Lavender & Ink',
    light: { background: '#F7F5FA', surface: '#EEEAF4', card: '#FDFCFF', text: '#282433', secondaryText: '#514D5D', mutedText: '#706B7C', accent: '#66527A', accentSecondary: '#827294', highlight: '#A99DBB', buttonText: '#FFFFFF' },
    dark: { background: '#080B12', surface: '#0D1220', card: '#111827', text: '#F8FAFC', secondaryText: '#CBD5E1', mutedText: '#94A3B8', accent: '#A78BFA', accentSecondary: '#67E8F9', highlight: '#A78BFA', buttonText: '#FFFFFF' },
  },
  {
    id: 'warm-cream',
    name: 'Warm Cream & Olive',
    light: { background: '#FBF8F1', surface: '#F3EEE3', card: '#FFFEFA', text: '#292A24', secondaryText: '#55574E', mutedText: '#6E7065', accent: '#58664F', accentSecondary: '#827E5E', highlight: '#D9B08C', buttonText: '#FFFFFF' },
    dark: { background: '#171914', surface: '#20231D', card: '#292D26', text: '#F5F3EA', secondaryText: '#D1D0C4', mutedText: '#A8AA98', accent: '#B9C79D', accentSecondary: '#D6B77D', highlight: '#D9B08C', buttonText: '#171914' },
  },
  {
    id: 'ocean',
    name: 'Ocean & Slate',
    light: { background: '#F3F7F9', surface: '#EAF1F4', card: '#FCFEFF', text: '#142B3A', secondaryText: '#3F5665', mutedText: '#637785', accent: '#0E6175', accentSecondary: '#315C7D', highlight: '#7894A4', buttonText: '#FFFFFF' },
    dark: { background: '#0B1720', surface: '#10232E', card: '#172D39', text: '#F1F7FA', secondaryText: '#C4D5DF', mutedText: '#8BA4B2', accent: '#43B9C8', accentSecondary: '#7AAED1', highlight: '#7AAED1', buttonText: '#0B1720' },
  },
  {
    id: 'sage',
    name: 'Sage & Moss',
    light: { background: '#F4F6F1', surface: '#E9EDE5', card: '#FCFDF9', text: '#292D27', secondaryText: '#4F584B', mutedText: '#687064', accent: '#596B50', accentSecondary: '#777A5E', highlight: '#9A9B78', buttonText: '#FFFFFF' },
    dark: { background: '#151914', surface: '#20261F', card: '#293128', text: '#F1F4EC', secondaryText: '#CCD4C6', mutedText: '#A0AA96', accent: '#B0C491', accentSecondary: '#D1BA79', highlight: '#D1BA79', buttonText: '#151914' },
  },
  {
    id: 'rose',
    name: 'Rose & Charcoal',
    light: { background: '#FBF5F6', surface: '#F4E9ED', card: '#FFFCFD', text: '#30242A', secondaryText: '#58454E', mutedText: '#74636B', accent: '#8B4257', accentSecondary: '#A96B7E', highlight: '#B98491', buttonText: '#FFFFFF' },
    dark: { background: '#1C1418', surface: '#2A1D23', card: '#35252D', text: '#FFF5F7', secondaryText: '#E3CBD3', mutedText: '#B99DA7', accent: '#E6A0B1', accentSecondary: '#D88AA0', highlight: '#E6A0B1', buttonText: '#1C1418' },
  },
  {
    id: 'cobalt',
    name: 'Cobalt & Sky',
    light: { background: '#F4F6FC', surface: '#E9EDF8', card: '#FDFEFF', text: '#202A42', secondaryText: '#47536D', mutedText: '#6C7891', accent: '#3657A7', accentSecondary: '#4382B8', highlight: '#74A9C6', buttonText: '#FFFFFF' },
    dark: { background: '#101522', surface: '#171F31', card: '#202A40', text: '#F4F6FC', secondaryText: '#C9D3E5', mutedText: '#93A2BD', accent: '#8BA8FF', accentSecondary: '#74C4E8', highlight: '#74C4E8', buttonText: '#101522' },
  },
  {
    id: 'mint',
    name: 'Mint & Graphite',
    light: { background: '#F1F8F5', surface: '#E4F0EA', card: '#FCFFFD', text: '#20322B', secondaryText: '#435B50', mutedText: '#668074', accent: '#27735B', accentSecondary: '#538A72', highlight: '#A2D98B', buttonText: '#FFFFFF' },
    dark: { background: '#101A17', surface: '#192722', card: '#22352D', text: '#F1FAF5', secondaryText: '#C7DCD1', mutedText: '#94B4A3', accent: '#70D6AE', accentSecondary: '#A2D98B', highlight: '#A2D98B', buttonText: '#101A17' },
  },
  {
    id: 'coral',
    name: 'Coral & Navy',
    light: { background: '#FBF5F1', surface: '#F2E9E3', card: '#FFFCFA', text: '#302923', secondaryText: '#5D5147', mutedText: '#796B60', accent: '#A45040', accentSecondary: '#C17C58', highlight: '#FCB99A', buttonText: '#FFFFFF' },
    dark: { background: '#1B1514', surface: '#29201E', card: '#352926', text: '#FFF5EF', secondaryText: '#E1CFC3', mutedText: '#B9A296', accent: '#F19A7D', accentSecondary: '#F0C27B', highlight: '#FCB99A', buttonText: '#1B1514' },
  },
  {
    id: 'sea-glass',
    name: 'Sea Glass & Copper',
    light: { background: '#D1E8E2', surface: '#E1EFEB', card: '#F6FBF9', text: '#2C3531', secondaryText: '#43534D', mutedText: '#64766E', accent: '#116466', accentSecondary: '#D9B08C', highlight: '#FCB99A', buttonText: '#D1E8E2' },
    dark: { background: '#172421', surface: '#20332F', card: '#29413C', text: '#EAF4F0', secondaryText: '#C5D8D1', mutedText: '#99B2A9', accent: '#56AAA0', accentSecondary: '#D9B08C', highlight: '#FCB99A', buttonText: '#172421' },
  },
];

const CSS_COLOR_VARIABLES: Record<keyof SiteColors, string> = {
  background: 'bg-primary',
  surface: 'bg-secondary',
  card: 'bg-card',
  text: 'text-primary',
  secondaryText: 'text-secondary',
  mutedText: 'text-muted',
  accent: 'accent',
  accentSecondary: 'secondary-accent',
  highlight: 'highlight',
  buttonText: 'button-text',
};

export function isSiteColors(value: unknown): value is SiteColors {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  return SITE_COLOR_FIELDS.every(({ key }) => {
    const color = (value as Record<string, unknown>)[key];
    return typeof color === 'string' && /^#[\da-fA-F]{6}$/.test(color);
  });
}

export function normalizeSiteColors(value: unknown, fallback: SiteColors): SiteColors {
  const source = value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
  const colors = { ...fallback };

  for (const { key } of SITE_COLOR_FIELDS) {
    const color = source[key];
    if (typeof color === 'string' && /^#[\da-fA-F]{6}$/.test(color)) {
      colors[key] = color.toUpperCase();
    }
  }

  return colors;
}

export function getColorCssVariables(light: SiteColors, dark: SiteColors): CSSProperties {
  const variables: Record<string, string> = {};

  for (const [mode, colors] of [['light', light], ['dark', dark]] as const) {
    for (const [key, cssName] of Object.entries(CSS_COLOR_VARIABLES) as [keyof SiteColors, string][]) {
      variables[`--${mode}-${cssName}`] = colors[key];
    }
  }

  return variables as CSSProperties;
}

export function applyColorCssVariables(light: SiteColors, dark: SiteColors): void {
  const variables = getColorCssVariables(light, dark);
  for (const [name, value] of Object.entries(variables)) {
    document.documentElement.style.setProperty(name, String(value));
  }
  document.documentElement.dataset.colors = 'true';
}
