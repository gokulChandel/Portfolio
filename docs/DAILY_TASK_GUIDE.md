# Daily Task & Maintenance Guide — Gokul Chandel Portfolio

A practical operational guide for ongoing maintenance, content updates, database backups, and feature iterations.

---

## 1. Routine Maintenance Tasks

### Weekly
- **Check Inquiries**: Log in to `/admin/messages` and review incoming recruiter and client inquiries. Mark resolved messages to keep the inbox focused.
- **Dependency Security**: Run `npm audit` to check for security vulnerabilities in dependencies.

### Monthly
- **Update Skills & Learnings**: Log in to `/admin/skills` to add any new libraries, tools, or frameworks mastered.
- **Update Project Details**: Update live demo links or add new feature milestones to existing projects in `/admin/projects`.
- **Review Core Web Vitals**: Run Google PageSpeed Insights on `https://yourdomain.com` to ensure performance remains above 95+.

### Quarterly
- **Update Experience & Employment Dates**: Update the experience period and responsibilities in `/admin/experience`.
- **Refresh Resume**: Overwrite `public/resume.pdf` with your updated resume, or upload to Supabase storage and update the link in `/admin/profile`.
- **Next.js & Package Updates**: Test minor updates (`npm update`) in a development branch.

---

## 2. Managing Content Without Code

Every public aspect of the website is manageable through the CMS:
1. Open your browser and navigate to `/admin`.
2. Sign in with your admin credentials.
3. Make your desired changes in **Profile**, **Skills**, **Projects**, **Experience**, **Education**, or **Site Settings**.
4. Click **Save** — changes reflect immediately across the entire public website.

---

## 3. Database Backups

### Supabase Cloud Backups
- Supabase automatically creates daily backups for your PostgreSQL database.
- To create a manual snapshot:
  1. Open your Supabase project dashboard.
  2. Navigate to **Database > Backups**.
  3. Click **Backup Now**.

### Local State Backups
If running with the local store:
- Copy `.data/portfolio-state.json` to a safe location or version-control it.

---

## 4. Troubleshooting Common Issues

### Issue: "Unauthorized" on Admin Routes
- **Cause**: The admin session cookie expired or was cleared.
- **Fix**: Visit `/admin/login` and re-authenticate.

### Issue: Contact Form "Too many messages sent"
- **Cause**: The built-in rate limiter allows up to 5 submissions per minute per IP address.
- **Fix**: Wait 60 seconds before sending another inquiry.

### Issue: Animations not playing
- **Cause**: Operating system has `prefers-reduced-motion` enabled.
- **Behavior**: The portfolio intentionally respects user accessibility preferences and displays static content cleanly without abrupt motions.
