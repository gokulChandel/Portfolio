# Setup Guide — Gokul Chandel Portfolio

This guide provides end-to-end instructions for setting up, configuring, and developing the portfolio website on your local machine or server.

---

## 1. Prerequisites

Ensure your development environment meets the following requirements:
- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **Package Manager**: `npm` (v10+), `yarn`, or `pnpm`
- **Git**: For version control
- **Optional**: Supabase CLI or a free account on [supabase.com](https://supabase.com)

---

## 2. Installation Steps

### Step 1: Clone the Repository
```bash
git clone https://github.com/gokulchandel/portfolio.git
cd portfolio
```

### Step 2: Install NPM Dependencies
```bash
npm install
```
This installs all core dependencies:
- Next.js 16 (App Router)
- React 19 & React DOM
- Tailwind CSS v4 & `@tailwindcss/turbopack`
- GSAP & `@gsap/react`
- `@supabase/supabase-js` & `@supabase/ssr`
- Lucide React

---

## 3. Environment Variables Configuration

Copy `.env.example` to create your local `.env.local` file:
```bash
cp .env.example .env.local
```

### Configuration Parameters

```env
# ----------------------------------------------------
# SUPABASE CONFIGURATION (Optional for local testing)
# ----------------------------------------------------
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# ----------------------------------------------------
# SITE CONFIGURATION
# ----------------------------------------------------
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# ----------------------------------------------------
# ADMIN CMS CREDENTIALS (Secure fallback for offline testing)
# ----------------------------------------------------
ADMIN_EMAIL=admin@gokulchandel.dev
ADMIN_PASSWORD=admin12345
ADMIN_SESSION_SECRET=dev-secret-session-key-gokul-chandel-portfolio-2026
```

> **Note on Resilient Architecture**:
> If Supabase credentials are not yet entered or offline, the application seamlessly activates its unified local store (`.data/portfolio-state.json`). You can immediately test the public website and every admin CMS CRUD feature without connecting an external service!

---

## 4. Supabase Setup (Production Database)

If you wish to link your live Supabase database:

1. Sign in to [Supabase](https://supabase.com) and click **New Project**.
2. Go to the **SQL Editor** tab in your Supabase dashboard.
3. Open the migration files in this repository under `supabase/migrations/`:
   - `00001_initial_schema.sql` (Creates all tables and indexes)
   - `00002_rls_policies.sql` (Configures Row Level Security)
   - `00003_storage_buckets.sql` (Sets up the storage bucket)
4. Execute each file sequentially in the SQL editor.
5. Open `supabase/seed.sql` and run it to populate your database with Gokul Chandel's verified profile, skills, projects, and employment history.
6. Copy your **Project URL** and **API Keys** from **Project Settings > API** into your `.env.local`.

---

## 5. Running the Application

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Launch
```bash
npm run build
npm run start
```

### Linting Check
```bash
npm run lint
```

---

## 6. Accessing the Admin CMS

1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login).
2. Enter your credentials:
   - **Email**: `admin@gokulchandel.dev`
   - **Password**: `admin12345`
3. Click **Sign In to Dashboard**.
4. You will be redirected to the CMS at `/admin`.
