import fs from 'fs';
import path from 'path';
import {
  Profile,
  SkillCategory,
  Skill,
  Project,
  Experience,
  Education,
  Certification,
  Service,
  ContactMessage,
  SiteSettings,
} from '@/types';
import {
  initialProfile,
  initialSkillCategories,
  initialSkills,
  initialProjects,
  initialExperiences,
  initialEducation,
  initialCertifications,
  initialServices,
  initialSiteSettings,
} from './initialData';
import { createServerSupabaseClient } from '../supabase/server';

interface LocalState {
  profile: Profile;
  skillCategories: SkillCategory[];
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  services: Service[];
  messages: ContactMessage[];
  siteSettings: SiteSettings;
}

const DATA_FILE_PATH = path.join(process.cwd(), '.data', 'portfolio-state.json');

function getInitialState(): LocalState {
  return {
    profile: initialProfile,
    skillCategories: initialSkillCategories,
    skills: initialSkills,
    projects: initialProjects,
    experiences: initialExperiences,
    education: initialEducation,
    certifications: initialCertifications,
    services: initialServices,
    messages: [
      {
        id: 'msg-sample-1',
        name: 'Sarah Jenkins',
        email: 'sarah.j@techrecruitment.io',
        subject: 'Senior Full Stack Opportunity',
        message: 'Hello Gokul, we reviewed your work on Schoolware and CRM platform. Would love to discuss an exciting full stack engineering opportunity with our team.',
        status: 'unread',
        created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
    ],
    siteSettings: initialSiteSettings,
  };
}

// Read state from local file or return defaults
export function getLocalState(): LocalState {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const data = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn('Could not read local data file, using defaults:', err);
  }
  const defaults = getInitialState();
  saveLocalState(defaults);
  return defaults;
}

// Write state to local file
export function saveLocalState(state: LocalState): void {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not save local data file:', err);
  }
}

// ==========================================
// UNIFIED DATA ACCESS METHODS
// ==========================================

export async function getProfile(): Promise<Profile> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from('profiles').select('*').limit(1).single();
    if (!error && data) return data as Profile;
  }
  return getLocalState().profile;
}

export async function updateProfile(updates: Partial<Profile>): Promise<Profile> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', 'gokul-chandel-profile')
      .select()
      .single();
    if (!error && data) return data as Profile;
  }
  const state = getLocalState();
  state.profile = { ...state.profile, ...updates, updated_at: new Date().toISOString() };
  saveLocalState(state);
  return state.profile;
}

export async function getSkillCategories(): Promise<SkillCategory[]> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from('skill_categories')
      .select('*')
      .order('display_order', { ascending: true });
    if (!error && data) return data as SkillCategory[];
  }
  return getLocalState().skillCategories;
}

export async function getSkills(onlyActive = true): Promise<Skill[]> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    let query = supabase.from('skills').select('*').order('display_order', { ascending: true });
    if (onlyActive) {
      query = query.eq('is_active', true);
    }
    const { data, error } = await query;
    if (!error && data) return data as Skill[];
  }
  const all = getLocalState().skills;
  return onlyActive ? all.filter((s) => s.is_active) : all;
}

export async function saveSkill(skill: Skill): Promise<Skill> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from('skills').upsert(skill).select().single();
    if (!error && data) return data as Skill;
  }
  const state = getLocalState();
  const index = state.skills.findIndex((s) => s.id === skill.id);
  if (index >= 0) {
    state.skills[index] = skill;
  } else {
    state.skills.push(skill);
  }
  saveLocalState(state);
  return skill;
}

export async function deleteSkill(id: string): Promise<boolean> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (!error) return true;
  }
  const state = getLocalState();
  state.skills = state.skills.filter((s) => s.id !== id);
  saveLocalState(state);
  return true;
}

export async function getProjects(onlyPublished = true): Promise<Project[]> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    let query = supabase.from('projects').select('*').order('display_order', { ascending: true });
    if (onlyPublished) {
      query = query.eq('is_published', true);
    }
    const { data, error } = await query;
    if (!error && data) return data as Project[];
  }
  const all = getLocalState().projects;
  return onlyPublished ? all.filter((p) => p.is_published) : all;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();
    if (!error && data) return data as Project;
  }
  const all = getLocalState().projects;
  return all.find((p) => p.slug === slug) || null;
}

export async function saveProject(project: Project): Promise<Project> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from('projects')
      .upsert({ ...project, updated_at: new Date().toISOString() })
      .select()
      .single();
    if (!error && data) return data as Project;
  }
  const state = getLocalState();
  const index = state.projects.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    state.projects[index] = { ...project, updated_at: new Date().toISOString() };
  } else {
    state.projects.push({ ...project, updated_at: new Date().toISOString() });
  }
  saveLocalState(state);
  return project;
}

export async function deleteProject(id: string): Promise<boolean> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) return true;
  }
  const state = getLocalState();
  state.projects = state.projects.filter((p) => p.id !== id);
  saveLocalState(state);
  return true;
}

export async function getExperiences(): Promise<Experience[]> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from('experiences').select('*').order('display_order', { ascending: true });
    if (!error && data) return data as Experience[];
  }
  return getLocalState().experiences;
}

export async function saveExperience(exp: Experience): Promise<Experience> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from('experiences').upsert(exp).select().single();
    if (!error && data) return data as Experience;
  }
  const state = getLocalState();
  const index = state.experiences.findIndex((e) => e.id === exp.id);
  if (index >= 0) {
    state.experiences[index] = exp;
  } else {
    state.experiences.push(exp);
  }
  saveLocalState(state);
  return exp;
}

export async function deleteExperience(id: string): Promise<boolean> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from('experiences').delete().eq('id', id);
    if (!error) return true;
  }
  const state = getLocalState();
  state.experiences = state.experiences.filter((e) => e.id !== id);
  saveLocalState(state);
  return true;
}

export async function getEducation(): Promise<Education[]> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from('education').select('*').order('display_order', { ascending: true });
    if (!error && data) return data as Education[];
  }
  return getLocalState().education;
}

export async function saveEducation(edu: Education): Promise<Education> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from('education').upsert(edu).select().single();
    if (!error && data) return data as Education;
  }
  const state = getLocalState();
  const index = state.education.findIndex((e) => e.id === edu.id);
  if (index >= 0) {
    state.education[index] = edu;
  } else {
    state.education.push(edu);
  }
  saveLocalState(state);
  return edu;
}

export async function deleteEducation(id: string): Promise<boolean> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from('education').delete().eq('id', id);
    if (!error) return true;
  }
  const state = getLocalState();
  state.education = state.education.filter((e) => e.id !== id);
  saveLocalState(state);
  return true;
}

export async function getCertifications(): Promise<Certification[]> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from('certifications').select('*').order('display_order', { ascending: true });
    if (!error && data) return data as Certification[];
  }
  return getLocalState().certifications;
}

export async function saveCertification(cert: Certification): Promise<Certification> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from('certifications').upsert(cert).select().single();
    if (!error && data) return data as Certification;
  }
  const state = getLocalState();
  const index = state.certifications.findIndex((c) => c.id === cert.id);
  if (index >= 0) {
    state.certifications[index] = cert;
  } else {
    state.certifications.push(cert);
  }
  saveLocalState(state);
  return cert;
}

export async function deleteCertification(id: string): Promise<boolean> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from('certifications').delete().eq('id', id);
    if (!error) return true;
  }
  const state = getLocalState();
  state.certifications = state.certifications.filter((c) => c.id !== id);
  saveLocalState(state);
  return true;
}

export async function getServices(): Promise<Service[]> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from('services').select('*').order('display_order', { ascending: true });
    if (!error && data) return data as Service[];
  }
  return getLocalState().services;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) return data as ContactMessage[];
  }
  return getLocalState().messages;
}

export async function addContactMessage(message: Omit<ContactMessage, 'id' | 'created_at' | 'status'>): Promise<ContactMessage> {
  const newMessage: ContactMessage = {
    ...message,
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    status: 'unread',
    created_at: new Date().toISOString(),
  };

  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from('contact_messages').insert(newMessage).select().single();
    if (!error && data) return data as ContactMessage;
  }

  const state = getLocalState();
  state.messages.unshift(newMessage);
  saveLocalState(state);
  return newMessage;
}

export async function updateContactMessageStatus(id: string, status: 'unread' | 'read' | 'resolved'): Promise<boolean> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from('contact_messages').update({ status }).eq('id', id);
    if (!error) return true;
  }
  const state = getLocalState();
  const target = state.messages.find((m) => m.id === id);
  if (target) {
    target.status = status;
    saveLocalState(state);
    return true;
  }
  return false;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from('contact_messages').delete().eq('id', id);
    if (!error) return true;
  }
  const state = getLocalState();
  state.messages = state.messages.filter((m) => m.id !== id);
  saveLocalState(state);
  return true;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from('site_settings').select('*').limit(1).single();
    if (!error && data) return data as SiteSettings;
  }
  return getLocalState().siteSettings;
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const supabase = createServerSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from('site_settings')
      .update({ ...settings, updated_at: new Date().toISOString() })
      .eq('id', 'site-settings-main')
      .select()
      .single();
    if (!error && data) return data as SiteSettings;
  }
  const state = getLocalState();
  state.siteSettings = { ...state.siteSettings, ...settings };
  saveLocalState(state);
  return state.siteSettings;
}
