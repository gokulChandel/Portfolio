export interface Profile {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  intro_tag: string;
  bio: string;
  experience_years: string;
  current_company: string;
  location: string;
  email: string;
  phone?: string;
  github_url: string;
  linkedin_url: string;
  twitter_url?: string;
  resume_url: string;
  avatar_url?: string;
  availability_status: string;
  about_paragraphs: string[];
  career_targets: string[];
  primary_expertise: string[];
  highlights: {
    label: string;
    sublabel: string;
    icon: string;
  }[];
  updated_at?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  display_order: number;
}

export interface Skill {
  id: string;
  category_id: string;
  category_name?: string;
  name: string;
  icon?: string;
  proficiency_label?: string;
  display_order: number;
  is_active: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  short_description: string;
  full_description: string;
  problem_statement: string;
  solution: string;
  features: string[];
  technologies: string[];
  contributions: string[];
  thumbnail_url: string;
  images: string[];
  live_url?: string;
  github_url?: string;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  display_order: number;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  grade?: string;
  description?: string;
  display_order: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issue_date: string;
  credential_url?: string;
  description?: string;
  display_order: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  display_order: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'resolved';
  created_at: string;
}

export interface SiteColors {
  background: string;
  surface: string;
  card: string;
  text: string;
  secondaryText: string;
  mutedText: string;
  accent: string;
  accentSecondary: string;
  highlight: string;
  buttonText: string;
}

export interface SiteSettings {
  id: string;
  site_title: string;
  meta_description: string;
  keywords: string[];
  og_image?: string;
  footer_text: string;
  is_hireable: boolean;
  light_colors: SiteColors;
  dark_colors: SiteColors;
  resume_url: string;
  social_links: {
    github: string;
    linkedin: string;
    email: string;
    twitter?: string;
  };
}
