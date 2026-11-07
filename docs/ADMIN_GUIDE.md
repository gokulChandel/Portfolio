# Admin Dashboard User Guide — Gokul Chandel Portfolio

This guide explains how to use the built-in Content Management System (CMS) to manage all aspects of your portfolio without touching source code.

---

## 1. Accessing the Dashboard

- **Login URL**: `/admin/login`
- **Dashboard URL**: `/admin`
- **Default Email**: `admin@gokulchandel.dev`
- **Default Password**: `admin12345`

Sessions are protected with `httpOnly` secure cookies and authenticated with cryptographic HMAC signing.

---

## 2. Dashboard Sections & Operations

### A. Overview (`/admin`)
- **Key Metrics**: View live metrics for total projects, published projects, visible skills, and unread inquiries.
- **Database Status**: Displays whether the application is synced with **Supabase Cloud** or utilizing the **Unified Local Store**.
- **Quick Shortcuts**: One-click actions to add projects, add skills, view incoming inquiries, and update your profile.
- **Recent Inquiries & Projects**: Immediate overview of recent recruiter messages and featured projects.

### B. Profile Management (`/admin/profile`)
Manage all personal and professional identity fields:
- **Personal Details**: Full name, title (e.g. *Full Stack Developer*), headline subtitle, and introductory bio.
- **Employment Information**: Current company (*Parkhya Solutions Pvt. Ltd.*), years of experience (*2+*), and availability status indicator.
- **Contact Channels**: Professional email address, physical location, GitHub profile URL, and LinkedIn URL.
- **Resume Location**: Path to your active PDF file (defaults to `/resume.pdf`).
- Click **Save Profile** at the top right to persist updates immediately.

### C. Technical Skills Management (`/admin/skills`)
- **Adding a Skill**: Click **Add New Skill**, enter the skill name (e.g. *Next.js*, *Docker*, *MongoDB*), assign a category (*Frontend*, *Backend*, *Database*, *DevOps & Cloud*, *Tools*), choose a proficiency label (*Experienced*, *Proficient*, *Working Knowledge*, *Learning*), and set the display order.
- **Editing Skills**: Click the pencil icon on any row to adjust properties.
- **Toggling Visibility**: Click the status button (*Active* / *Hidden*) to show or hide a technology from the public website instantly without deleting it.
- **Deleting Skills**: Click the trash icon with an interactive confirmation prompt.

### D. Projects Showcase Management (`/admin/projects`)
- **Creating a Project**: Click **New Project**. Fill in:
  - Title and auto-generated clean URL slug
  - Category (*School Management System*, *Pharmacy Management Platform*, *Customer Relationship Management*)
  - Short description for the portfolio card
  - Detailed architecture narrative for the `/projects/[slug]` deep-dive page
  - Problem statement & technical solution
  - Technologies used (comma separated)
  - Key platform features (one per line)
  - Personal engineering contributions (one per line)
  - Live demo and GitHub repository URLs
- **Featured Toggle**: Mark as *Featured* to display a highlighted badge on the project card.
- **Published Toggle**: Switch between *Published* (live on site) and *Draft* (visible only to admin).
- **Deleting Projects**: Delete any project with full confirmation protection.

### E. Professional Experience (`/admin/experience`)
- **Add Work History**: Add new companies, job titles, start and end dates.
- **Current Position**: Check *Currently Employed Here* to display *Present* on the public timeline.
- **Responsibilities**: Enter specific bullet points (one per line).
- **Tech Stack**: Enter technologies used during that role.
- **Ordering**: Set the chronological display order.

### F. Education & Certifications (`/admin/education`)
- **Formal Education**: Manage degree title, major/field of study, institution name, start/end years, and academic honors.
- **Certifications**: Manage professional training certificates, issuing bodies, issue dates, and credential verification URLs.

### G. Contact Inquiries Management (`/admin/messages`)
- **Search Inquiries**: Real-time filtering by sender name, email, subject, or message text.
- **Status Filter**: Toggle between *All*, *Unread*, *Read*, and *Resolved*.
- **Message Reader**: Click any inquiry row to inspect the full message in a modal dialog.
- **Quick Status Transitions**: Mark as *Unread*, *Read*, or *Resolved*.
- **Direct Email Reply**: Click *Reply via Email* to open your desktop or web email client pre-populated with the recipient and subject.
- **Delete Inquiries**: Permanently purge messages after resolution.

### H. Website Settings & SEO (`/admin/settings`)
- **SEO Title & Description**: Customize the metadata that search engines (Google, Bing) display in search results.
- **Keywords**: Update target index terms (*Full Stack Developer*, *MERN Stack Developer*, *React Developer*, *Node.js Developer*).
- **Hireability Toggle**: Enable or disable the green *Available for opportunities* pulse indicator on the hero section.
- **Footer Text**: Customize copyright and signature credits.

---

## 3. Best Practices for Maintenance

1. **Keep slugs clean**: When adding projects, use lowercase alphanumeric characters with hyphens (e.g., `real-time-chat-engine`).
2. **Review incoming inquiries weekly**: Mark inquiries as *Resolved* once contacted to keep the inbox clean.
3. **Keep resume PDF updated**: When you update your resume, overwrite `public/resume.pdf` or upload the new version and update the URL in **Profile Management**.
