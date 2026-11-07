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
2. Run the files from this repository in order:
   - `supabase/migrations/00001_initial_schema.sql`
   - `supabase/migrations/00002_rls_policies.sql`
   - `supabase/migrations/00003_storage_buckets.sql`
   - `supabase/seed.sql`
3. Verify that all 10 tables are created under the `public` schema in the **Table Editor**.

### Step 3: Retrieve Production API Keys
1. Go to **Project Settings > API**.
2. Note down:
   - **Project URL** (`https://<project-ref>.supabase.co`)
   - **`anon` `public` key**
   - **`service_role` `secret` key**

---

## 3. Vercel Deployment

### Method A: One-Click Git Integration (Recommended)
1. Push your repository to your GitHub account:
   ```bash
   git add .
   git commit -m "Production release: Gokul Chandel Developer Portfolio & CMS"
   git push origin main
   ```
2. Log in to [vercel.com](https://vercel.com) and click **Add New > Project**.
3. Import your `portfolio` repository.
4. Set the Framework Preset to **Next.js**.

### Method B: Environment Variables in Vercel
In the **Environment Variables** section of your Vercel project configuration, add the following:

| Variable | Recommended Production Value |
| :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://<your-project-id>.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *Your Supabase public anon key* |
| `SUPABASE_SERVICE_ROLE_KEY` | *Your Supabase secret service-role key* |
| `ADMIN_EMAIL` | *Your production admin email* (e.g. `gokulchandel.dev@gmail.com`) |
| `ADMIN_PASSWORD` | *A secure 16+ character password* |
| `ADMIN_SESSION_SECRET` | *A random 64-character secret key* |

> **Security Tip**: Generate a cryptographically secure random session secret:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

### Step 3: Trigger Deployment
Click **Deploy**. Vercel will run `npm run build` and publish your site with global edge caching and instant serverless functions.

---

## 4. Custom Domain Configuration

1. In your Vercel project dashboard, navigate to **Settings > Domains**.
2. Enter your custom domain (e.g. `gokulchandel.dev` and `www.gokulchandel.dev`).
3. Add the provided DNS records at your domain registrar (e.g. GoDaddy, Namecheap, Cloudflare):
   - **A Record**: `@` points to `76.76.21.21`
   - **CNAME Record**: `www` points to `cname.vercel-dns.com`
4. Vercel will automatically provision a free SSL/TLS certificate.

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
