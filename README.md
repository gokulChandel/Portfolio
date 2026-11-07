# Gokul Chandel — Premium Developer Portfolio & CMS

A high-performance personal developer portfolio and full-featured Content Management System (CMS) engineered for **Gokul Chandel** (Full Stack Developer, 2+ Years Experience at Parkhya Solutions Pvt. Ltd.).

Built with modern **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **GSAP & ScrollTrigger**, and a unified storage architecture supporting **Supabase PostgreSQL** with an offline-resilient local state fallback.

---

## 🌟 Key Features

### 🖥️ Public Portfolio Experience
- **Cinematic GSAP Animations**: Smooth text reveals, code card tabs, vertical experience timeline, and scroll-triggered section entrances engineered with `@gsap/react` and `useGSAP` (with automatic `prefers-reduced-motion` detection).
- **Hero Showcase**: Interactive code panel, real technical stack badges, direct GitHub/LinkedIn/Email contact links, and immediate resume download action.
- **Dynamic Skill Matrix**: Categorized technical skills (Frontend, Backend, Database, DevOps & Cloud, Tools) with proficiency indicators and interactive category filters.
- **Vertical Experience Timeline**: Chronological career history highlighting 2+ years of production engineering at Parkhya Solutions Pvt. Ltd.
- **Projects Showcase & Dynamic Detail Pages**: Comprehensive case studies for **Schoolware Admin**, **Janhit Chemist**, and **CRM Platform**, with dedicated deep-dive architecture pages at `/projects/[slug]`.
- **Services Architecture**: 6 specialized capability cards covering full-stack web development, backend microservices, REST API design, database modeling, and performance optimization.
- **Academic Credentials**: Dedicated education and certification cards with verified details.
- **Contact Form with Anti-Spam & Rate Limiting**: Server-side validated contact mechanism with honeypot bot trap, IP-based windowed rate limiting, and instant feedback alerts.
- **SEO & Core Web Vitals Optimized**: Semantic HTML5, structured JSON-LD `Person` schema, dynamic `sitemap.xml`, configured `robots.txt`, Open Graph preview tags, and pre-rendered static routes.

### 🔐 Full-Featured Admin Dashboard (`/admin`)
- **Modern SaaS Dashboard Layout**: Sidebar navigation, breadcrumbs, profile pills, and quick portfolio preview.
- **Secure Authentication**: HMAC-SHA256 signed session cookies, protected server-side route barriers, and CSRF/XSS mitigations.
- **Overview Analytics**: Real-time counts of published projects, active skills, unread inquiries, and live Supabase connection status.
- **Profile Management**: Update name, title, bio, career targets, location, and resume paths directly.
- **Skills CRUD**: Add, edit, toggle visibility, categorize, and reorder technical skills without touching source code.
- **Projects CRUD**: Full management of title, slug, category, problem statement, solution, features, technologies, live demo URLs, and featured showcase flags.
- **Experience CRUD**: Add, edit, and organize employment history, roles, responsibilities, and dates.
- **Education & Certifications CRUD**: Easily update degrees, institutions, and verified credential links.
- **Contact Inquiry Inbox**: Search inquiries, filter by read/unread/resolved status, read messages in an inspection modal, and delete records.
- **Website Settings & SEO**: Manage meta titles, descriptions, indexing keywords, and hireability indicators.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Turbopack, Cache Components) |
| **Language** | TypeScript (Strict Mode) |
| **UI Styling** | Tailwind CSS v4, Modern CSS Glassmorphism |
| **Animations** | GSAP 3, ScrollTrigger, `@gsap/react` |
| **Icons** | Lucide React + Custom SVG Brand Icons |
| **Database & Auth** | Supabase PostgreSQL, Supabase Auth, Storage (with Unified Resilient Local Fallback) |
| **Deployment** | Vercel, Supabase Cloud |

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/gokulchandel/portfolio.git
cd portfolio
npm install
```

### 2. Environment Setup
Copy the example environment configuration:
```bash
cp .env.example .env.local
```

Default local credentials for development testing:
- **Admin Email**: `admin@gokulchandel.dev`
- **Admin Password**: `admin12345`

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📂 Project Architecture

```
portfolio/
├── docs/                      # Comprehensive Guides
│   ├── SETUP_GUIDE.md         # Environment and dependency setup
│   ├── ADMIN_GUIDE.md         # Complete CMS user manual
│   ├── DATABASE_SCHEMA.md     # PostgreSQL tables, relations, and RLS
│   ├── DEPLOYMENT_GUIDE.md    # Vercel & Supabase production deployment
│   ├── DEVELOPMENT_GUIDE.md   # Component & animation architecture
│   └── DAILY_TASK_GUIDE.md    # Maintenance, backups, and routine tasks
├── public/                    # Static assets (resume.pdf, icons, images)
├── src/
│   ├── app/
│   │   ├── (dashboard)/       # Admin CMS routes (/admin, /admin/projects, etc.)
│   │   ├── admin/login/       # Secure Admin Authentication screen
│   │   ├── api/               # Server Actions, Route Handlers, Rate Limiters
│   │   ├── projects/          # Archive (/projects) and dynamic details (/projects/[slug])
│   │   ├── globals.css        # Tailwind 4 design tokens & themes
│   │   ├── layout.tsx         # Root layout with JSON-LD schema
│   │   ├── page.tsx           # High-performance homepage Server Component
│   │   ├── robots.ts          # Search engine crawler policies
│   │   └── sitemap.ts         # Dynamic XML Sitemap generator
│   ├── components/
│   │   ├── admin/             # CMS Dashboard shell, sidebars, modal forms
│   │   ├── layout/            # Navbar, Footer, Theme toggles
│   │   ├── projects/          # ProjectCard, badges, showcase components
│   │   ├── sections/          # Hero, About, Skills, Experience, Projects, Services, Contact
│   │   └── ui/                # BrandIcons and reusable UI widgets
│   ├── lib/
│   │   ├── animations/        # GSAP plugins and ScrollTrigger hooks
│   │   ├── data/              # Unified data store with local JSON fallback & initial state
│   │   ├── supabase/          # Supabase client and server SDK wrappers
│   │   ├── validations/       # Input schemas and contact validation
│   │   └── auth.ts            # Admin session HMAC verification
│   └── types/                 # TypeScript interfaces
└── supabase/
    ├── migrations/            # SQL migrations (Tables, RLS policies, Storage buckets)
    └── seed.sql               # Production-ready initial seed data
```

---

## 📖 Documentation Index

- [Setup Guide](SETUP_GUIDE.md)
- [Admin User Guide](ADMIN_GUIDE.md)
- [Database Schema & RLS Policies](DATABASE_SCHEMA.md)
- [Production Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Development Architecture Guide](DEVELOPMENT_GUIDE.md)
- [Daily Task & Maintenance Guide](DAILY_TASK_GUIDE.md)

---

## 📄 License
MIT License © 2026 Gokul Chandel. All rights reserved.
