# Production Deployment Guide — Gokul Chandel Portfolio

This guide details how to deploy the portfolio and admin CMS to production using **Vercel** and **Supabase Cloud**.

---

## 1. Architecture Overview

- **Hosting Platform**: Vercel (Edge Network, Automatic SSL, Serverless Functions)
- **Database & Storage**: Supabase Cloud (Managed PostgreSQL & Object Storage)
- **Domain**: Custom domain (e.g. `gokulchandel.dev`)

---

## 2. Supabase Cloud Configuration

### Step 1: Create Supabase Project
1. Log in to [supabase.com](https://supabase.com).
2. Click **New Project** and select a region close to your target audience (e.g., `ap-south-1` for India / Asia or `us-east-1` for global).
3. Set a strong database password and save it in a secure password manager.

### Step 2: Run SQL Migrations
1. In your Supabase project dashboard, navigate to **SQL Editor**.
2. Open each file from this repository, paste its contents into a new SQL query, and run them in this exact order:
   - `supabase/migrations/00001_initial_schema.sql`
   - `supabase/migrations/00002_rls_policies.sql`
   - `supabase/migrations/00003_storage_buckets.sql`
   - `supabase/migrations/00004_site_color_theme.sql`
   - `supabase/migrations/00005_site_light_dark_colors.sql`
   - `supabase/migrations/00006_about_section_content.sql`
   - `supabase/migrations/00007_expand_career_targets.sql`
   - `supabase/migrations/00008_remove_unwanted_career_targets.sql`
3. Run `supabase/seed.sql` once on a new, empty project to insert the portfolio's starter content. Re-running the seed can overwrite edited profile and portfolio content.
4. Verify the tables under **Table Editor > public** and the `portfolio` bucket under **Storage**.

### Step 3: Retrieve Production API Keys
1. In the Supabase dashboard, open **Project Settings > API Keys** (the exact menu label may vary).
2. Note down:
   - **Project URL** (`https://<project-ref>.supabase.co`)
   - The **publishable** key (or legacy `anon` key)
   - The **secret** key (or legacy `service_role` key)

The secret/service-role key is server-only. Never put it in a variable starting with `NEXT_PUBLIC_`, commit it, or share it publicly.

---

## 3. Vercel Deployment

### Method A: One-Click Git Integration (Recommended)
1. Push the intended production code to your GitHub repository. Review the files you stage; do not commit `.env.local` or any secrets.
2. Log in to [vercel.com](https://vercel.com) and click **Add New > Project**.
3. Import your `portfolio` repository.
4. Set the Framework Preset to **Next.js**.

### Step 2: Set Environment Variables
Before deploying, open **Project Settings > Environment Variables** in Vercel and add the following for **Production, Preview, and Development** as needed:

| Variable | Recommended Production Value |
| :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Your Vercel URL, e.g. `https://your-project.vercel.app` (update after adding a custom domain) |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://<your-project-id>.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase publishable key (or legacy anon key) |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase secret key (or legacy service_role key); server-side only |
| `ADMIN_EMAIL` | *Your production admin email* (e.g. `gokulchandel.dev@gmail.com`) |
| `ADMIN_PASSWORD` | *A secure 16+ character password* |
| `ADMIN_SESSION_SECRET` | *A random 64-character secret key* |

> **Security Tip**: Generate a cryptographically secure random session secret:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

### Step 3: Deploy
Click **Deploy**. Vercel will run `npm run build`. After deployment, open the Vercel URL and test the public site, contact form, and `/admin/login`.

---

## 4. Custom Domain Configuration

1. In your Vercel project dashboard, navigate to **Settings > Domains**.
2. Enter your custom domain (e.g. `gokulchandel.dev` and `www.gokulchandel.dev`).
3. Add the DNS records shown in Vercel to your domain registrar and wait for verification.
4. Update `NEXT_PUBLIC_SITE_URL` in Vercel to the verified canonical domain and redeploy.
5. Vercel will provision SSL/TLS after the domain is verified.

---

## 5. Post-Deployment Verification Checklist

- [ ] Visit `https://yourdomain.com` — verify hero animations and theme rendering.
- [ ] Test section navigation: About, Skills, Experience, Projects, Services, Education, Contact.
- [ ] Visit project detail pages: `/projects/schoolware-admin`, `/projects/janhit-chemist`, `/projects/crm-platform`.
- [ ] Test the contact form with a sample inquiry — verify delivery to database.
- [ ] Test resume download button — verify PDF opens cleanly.
- [ ] Sign in to the CMS at `https://yourdomain.com/admin/login` using your production admin credentials.
- [ ] Verify message status updates, project updates, and skill toggles in the dashboard.
- [ ] Check `/sitemap.xml` and `/robots.txt` in your browser.
