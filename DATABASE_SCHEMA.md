# Database Architecture & Schema — Gokul Chandel Portfolio

This document details the database architecture, schema definitions, constraints, indexes, and Row Level Security (RLS) policies implemented for Supabase PostgreSQL.

---

## 1. Entity-Relationship Overview

```
profiles
├── site_settings (singleton)
├── skill_categories (1) ───< (N) skills
├── projects
├── experiences
├── education
├── certifications
└── contact_messages
```

---

## 2. Table Specifications

### 1. `profiles`
Stores the developer's core identity, career objectives, and summary metadata.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `TEXT` | `PRIMARY KEY` | Default `'gokul-chandel-profile'` |
| `name` | `TEXT` | `NOT NULL` | Developer's full name |
| `title` | `TEXT` | `NOT NULL` | Professional title (e.g., Full Stack Developer) |
| `subtitle` | `TEXT` | `NOT NULL` | Dynamic supporting headline |
| `intro_tag` | `TEXT` | `NOT NULL` | Badge introductory tag |
| `bio` | `TEXT` | `NOT NULL` | Professional summary paragraph |
| `experience_years` | `TEXT` | `NOT NULL` | Years of experience (e.g. `'2+'`) |
| `current_company`| `TEXT` | `NOT NULL` | Current employer |
| `location` | `TEXT` | `NOT NULL` | Country or city location |
| `email` | `TEXT` | `NOT NULL` | Public contact email |
| `github_url` | `TEXT` | `NOT NULL` | GitHub profile URL |
| `linkedin_url` | `TEXT` | `NOT NULL` | LinkedIn profile URL |
| `resume_url` | `TEXT` | `NOT NULL` | Path or URL to current resume |
| `availability_status` | `TEXT` | `NOT NULL` | Opportunities status badge |
| `about_paragraphs`| `JSONB` | `NOT NULL` | Array of descriptive bio paragraphs |
| `career_targets` | `JSONB` | `NOT NULL` | Array of targeted engineering roles |
| `primary_expertise`| `JSONB` | `NOT NULL`| Core domains of expertise |
| `highlights` | `JSONB` | `NOT NULL` | Summary stat cards on About section |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT now()` | Record creation timestamp |
| `updated_at` | `TIMESTAMPTZ` | `DEFAULT now()` | Last update timestamp |

---

### 2. `skill_categories`
Groupings for technical skills (Frontend, Backend, Database, DevOps, Tools).

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `TEXT` | `PRIMARY KEY` | Unique category identifier |
| `name` | `TEXT` | `NOT NULL, UNIQUE` | Display name of the category |
| `display_order` | `INT` | `NOT NULL, DEFAULT 1` | Sort priority |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT now()` | Timestamp |

---

### 3. `skills`
Individual technologies and proficiencies.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `TEXT` | `PRIMARY KEY` | Unique skill identifier |
| `category_id` | `TEXT` | `REFERENCES skill_categories(id) ON DELETE CASCADE` | Parent category foreign key |
| `name` | `TEXT` | `NOT NULL` | Technology name (e.g., *React.js*, *Node.js*) |
| `icon` | `TEXT` | `NULLABLE` | Lucide icon identifier |
| `proficiency_label`| `TEXT`| `NULLABLE` | Optional label (*Experienced*, *Proficient*, etc.) |
| `display_order` | `INT` | `NOT NULL, DEFAULT 1` | Ordering index |
| `is_active` | `BOOLEAN`| `NOT NULL, DEFAULT true` | Controls visibility on public website |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT now()` | Timestamp |

**Indexes**:
- `idx_skills_category_id` on `category_id`
- `idx_skills_is_active` on `is_active`

---

### 4. `projects`
Portfolio case studies and applications.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `TEXT` | `PRIMARY KEY` | Project identifier |
| `slug` | `TEXT` | `NOT NULL, UNIQUE` | Clean URL slug for `/projects/[slug]` |
| `title` | `TEXT` | `NOT NULL` | Project title (e.g., *Schoolware Admin*) |
| `category` | `TEXT` | `NOT NULL` | Category label |
| `short_description`| `TEXT` | `NOT NULL` | Summary for cards |
| `full_description` | `TEXT` | `NOT NULL` | Comprehensive architectural writeup |
| `problem_statement`| `TEXT` | `NOT NULL` | Real-world problem addressed |
| `solution` | `TEXT` | `NOT NULL` | Architecture solution delivered |
| `features` | `JSONB` | `NOT NULL, DEFAULT '[]'` | Array of key features |
| `technologies` | `JSONB` | `NOT NULL, DEFAULT '[]'` | Array of technology tags |
| `contributions` | `JSONB` | `NOT NULL, DEFAULT '[]'` | Array of developer contributions |
| `thumbnail_url` | `TEXT` | `NOT NULL` | Primary image URL |
| `images` | `JSONB` | `NOT NULL, DEFAULT '[]'` | Array of gallery image URLs |
| `live_url` | `TEXT` | `NULLABLE` | Deployment link |
| `github_url` | `TEXT` | `NULLABLE` | Source code link |
| `is_featured` | `BOOLEAN`| `NOT NULL, DEFAULT false` | Highlighted on hero/projects |
| `is_published` | `BOOLEAN`| `NOT NULL, DEFAULT true` | Public visibility flag |
| `display_order` | `INT` | `NOT NULL, DEFAULT 1` | Sort priority |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT now()` | Creation date |
| `updated_at` | `TIMESTAMPTZ` | `DEFAULT now()` | Last update date |

**Indexes**:
- `idx_projects_slug` on `slug`
- `idx_projects_is_published` on `is_published`

---

### 5. `experiences`
Employment history and roles.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `TEXT` | `PRIMARY KEY` | Experience identifier |
| `company` | `TEXT` | `NOT NULL` | Organization name |
| `role` | `TEXT` | `NOT NULL` | Job role (e.g., Junior Software Engineer) |
| `location` | `TEXT` | `NOT NULL` | Work location |
| `period` | `TEXT` | `NOT NULL` | Display string (e.g., *2022 - Present*) |
| `start_date` | `DATE` | `NOT NULL` | Employment start date |
| `end_date` | `DATE` | `NULLABLE` | End date (null if current) |
| `is_current` | `BOOLEAN`| `NOT NULL, DEFAULT false` | Current employment flag |
| `description` | `TEXT` | `NOT NULL` | Overview description |
| `responsibilities` | `JSONB` | `NOT NULL, DEFAULT '[]'` | Array of engineering responsibilities |
| `technologies` | `JSONB` | `NOT NULL, DEFAULT '[]'` | Array of technologies used |
| `display_order` | `INT` | `NOT NULL, DEFAULT 1` | Sort order |

---

### 6. `education` & `certifications`
Academic and professional credentials.

#### `education`:
`id` (PK), `institution`, `degree`, `field_of_study`, `start_date`, `end_date`, `grade`, `description`, `display_order`.

#### `certifications`:
`id` (PK), `name`, `issuer`, `issue_date`, `credential_url`, `description`, `display_order`.

---

### 7. `contact_messages`
Secure repository for visitor inquiries.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `TEXT` | `PRIMARY KEY` | Message ID |
| `name` | `TEXT` | `NOT NULL` | Sender full name |
| `email` | `TEXT` | `NOT NULL` | Sender email |
| `subject` | `TEXT` | `NOT NULL` | Inquiry topic |
| `message` | `TEXT` | `NOT NULL` | Detailed message content |
| `status` | `TEXT` | `NOT NULL, DEFAULT 'unread'` | `'unread'`, `'read'`, or `'resolved'` |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT now()` | Submission timestamp |

**Indexes**:
- `idx_contact_messages_status` on `status`
- `idx_contact_messages_created_at` on `created_at DESC`

---

## 3. Row Level Security (RLS) Policies

Every table has Row Level Security enabled:

1. **Public Read Access**:
   - `profiles`, `skill_categories`, `experiences`, `education`, `certifications`, `services`, and `site_settings` are readable by all visitors.
   - `skills` is readable by all where `is_active = true`.
   - `projects` is readable by all where `is_published = true`.
2. **Contact Submissions**:
   - `contact_messages` allows anonymous `INSERT` with length validations (`char_length(name) >= 2`, `char_length(email) >= 5`, `char_length(message) >= 10`).
   - `contact_messages` `SELECT`, `UPDATE`, and `DELETE` are strictly restricted to authenticated administrators.
3. **Admin Full Control**:
   - Full write, update, and delete privileges on all tables require `auth.role() = 'authenticated'`.
