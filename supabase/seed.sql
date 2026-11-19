-- ====================================================================
-- SUPABASE SEED DATA FOR GOKUL CHANDEL PORTFOLIO
-- ====================================================================

-- 1. Profile Seed
INSERT INTO public.profiles (
  id, name, title, subtitle, intro_tag, bio, experience_years,
  current_company, location, email, github_url, linkedin_url, resume_url, 
  phone, availability_status, about_label, about_heading, about_description,
  about_paragraphs, career_targets, primary_expertise, highlights
) VALUES (
  'gokul-chandel-profile',
  'Gokul Chandel',
  'Full Stack Developer',
  'Building production web applications with React.js, Node.js, and TypeScript.',
  'HELLO, I''M',
  'Full Stack Developer with 2+ years of experience building scalable production web applications using React.js, Node.js, Express.js, TypeScript, PostgreSQL, and MongoDB. Experienced in secure REST APIs, JWT/RBAC authentication, payment gateways, and database performance tuning.',
  '2+',
  'Parkhya Solutions Pvt. Ltd.',
  'Indore, MP, India',
  'gokulchandel25@gmail.com',
  'https://github.com/gokulchandel',
  'https://www.linkedin.com/in/gokul-chandel/',
  '/Gokul_Resume.pdf',
  '+91 62329 74541',
  'Available for opportunities',
  'About Gokul',
  'Engineering Clean Architectures & Scalable Systems',
  'A developer passionate about high-efficiency systems, robust APIs, and modern frontend technologies.',
  '["I am a Full Stack Developer with 2+ years of experience building scalable production applications with React.js, Node.js, Express.js, TypeScript, PostgreSQL, and MongoDB.", "At Parkhya Solutions, I have contributed to three enterprise platforms across school management, B2B CRM, and e-commerce. My work includes secure REST APIs with JWT and role-based access control, payment integrations, real-time features, and analytics dashboards.", "I focus on reliable, maintainable systems: optimizing database queries and application performance, automating workflows, and collaborating through Agile development and CI/CD."]'::jsonb,
  '["Software Development Engineer", "Software Engineer", "Full Stack Developer", "Backend Developer", "Frontend Developer", "React.js Developer", "Node.js Developer", "Full Stack Software Engineer", "Backend Software Engineer", "Frontend Software Engineer"]'::jsonb,
  '["React.js & TypeScript", "Node.js & Express.js", "Secure REST APIs, JWT & RBAC", "PostgreSQL & MongoDB", "Payment Gateway Integration", "Performance Optimization & CI/CD"]'::jsonb,
  '[
    {"label": "2+ Years", "sublabel": "Professional Experience", "icon": "Briefcase"},
    {"label": "3 Production Platforms", "sublabel": "Schoolware, PropCRM & Janhit Pharmacy", "icon": "Layers"},
    {"label": "Modern Web", "sublabel": "React, TypeScript, Tailwind", "icon": "Code2"},
    {"label": "Scalable Systems", "sublabel": "REST APIs & Clean DB Design", "icon": "Server"}
  ]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  intro_tag = EXCLUDED.intro_tag,
  bio = EXCLUDED.bio,
  experience_years = EXCLUDED.experience_years,
  current_company = EXCLUDED.current_company,
  location = EXCLUDED.location,
  email = EXCLUDED.email,
  linkedin_url = EXCLUDED.linkedin_url,
  resume_url = EXCLUDED.resume_url,
  phone = EXCLUDED.phone,
  about_label = EXCLUDED.about_label,
  about_heading = EXCLUDED.about_heading,
  about_description = EXCLUDED.about_description,
  about_paragraphs = EXCLUDED.about_paragraphs,
  career_targets = EXCLUDED.career_targets,
  primary_expertise = EXCLUDED.primary_expertise,
  highlights = EXCLUDED.highlights,
  updated_at = now();

-- 2. Skill Categories
INSERT INTO public.skill_categories (id, name, display_order) VALUES
  ('cat-frontend', 'Frontend', 1),
  ('cat-backend', 'Backend', 2),
  ('cat-database', 'Database', 3),
  ('cat-devops', 'DevOps & Cloud', 4),
  ('cat-tools', 'Tools', 5)
ON CONFLICT (id) DO NOTHING;

-- 3. Skills
INSERT INTO public.skills (id, category_id, name, icon, proficiency_label, display_order, is_active) VALUES
  ('sk-react', 'cat-frontend', 'React.js', 'Code', 'Experienced', 1, true),
  ('sk-nextjs', 'cat-frontend', 'Next.js', 'Globe', 'Experienced', 2, true),
  ('sk-js', 'cat-frontend', 'JavaScript', 'FileCode', 'Experienced', 3, true),
  ('sk-ts', 'cat-frontend', 'TypeScript', 'FileCode2', 'Proficient', 4, true),
  ('sk-html5', 'cat-frontend', 'HTML5', 'Layout', 'Experienced', 5, true),
  ('sk-css3', 'cat-frontend', 'CSS3', 'Palette', 'Experienced', 6, true),
  ('sk-tailwind', 'cat-frontend', 'Tailwind CSS', 'Sparkles', 'Experienced', 7, true),
  ('sk-redux', 'cat-frontend', 'Redux', 'Cpu', 'Proficient', 8, true),
  ('sk-material-ui', 'cat-frontend', 'Material UI', 'Layout', 'Experienced', 9, true),

  ('sk-node', 'cat-backend', 'Node.js', 'Server', 'Experienced', 1, true),
  ('sk-express', 'cat-backend', 'Express.js', 'Box', 'Experienced', 2, true),
  ('sk-rest', 'cat-backend', 'REST APIs', 'Network', 'Experienced', 3, true),
  ('sk-golang', 'cat-backend', 'Golang', 'Terminal', 'Learning', 4, true),
  ('sk-java', 'cat-backend', 'Java', 'FileCode2', 'Proficient', 5, true),
  ('sk-jwt', 'cat-backend', 'JWT Authentication & RBAC', 'Network', 'Experienced', 6, true),
  ('sk-mvc', 'cat-backend', 'MVC Architecture & Microservices', 'Box', 'Experienced', 7, true),

  ('sk-mongo', 'cat-database', 'MongoDB', 'Database', 'Experienced', 1, true),
  ('sk-postgres', 'cat-database', 'PostgreSQL', 'DatabaseZap', 'Proficient', 2, true),
  ('sk-supabase', 'cat-database', 'Supabase', 'Zap', 'Proficient', 3, true),
  ('sk-firebase', 'cat-database', 'Firebase', 'Flame', 'Proficient', 4, true),
  ('sk-mysql', 'cat-database', 'MySQL', 'Database', 'Experienced', 5, true),
  ('sk-sql', 'cat-database', 'SQL', 'Database', 'Experienced', 6, true),
  ('sk-nosql', 'cat-database', 'NoSQL', 'Database', 'Experienced', 7, true),

  ('sk-docker', 'cat-devops', 'Docker', 'Container', 'Working Knowledge', 1, true),
  ('sk-aws', 'cat-devops', 'AWS', 'Cloud', 'Working Knowledge', 2, true),
  ('sk-actions', 'cat-devops', 'GitHub Actions', 'GitPullRequest', 'Working Knowledge', 3, true),
  ('sk-cicd', 'cat-devops', 'CI/CD', 'Workflow', 'Working Knowledge', 4, true),
  ('sk-linux', 'cat-devops', 'Linux', 'TerminalSquare', 'Proficient', 5, true),
  ('sk-kubernetes', 'cat-devops', 'Kubernetes', 'Container', 'Working Knowledge', 6, true),

  ('sk-git', 'cat-tools', 'Git', 'GitBranch', 'Experienced', 1, true),
  ('sk-github', 'cat-tools', 'GitHub', 'Github', 'Experienced', 2, true),
  ('sk-postman', 'cat-tools', 'Postman', 'Send', 'Experienced', 3, true),
  ('sk-vscode', 'cat-tools', 'VS Code', 'CodeXml', 'Experienced', 4, true),
  ('sk-agile', 'cat-tools', 'Agile / Scrum', 'Workflow', 'Experienced', 5, true),
  ('sk-dsa', 'cat-tools', 'Data Structures & Algorithms', 'Cpu', 'Proficient', 6, true)
ON CONFLICT (id) DO NOTHING;

-- 4. Projects
INSERT INTO public.projects (
  id, slug, title, category, short_description, full_description,
  problem_statement, solution, features, technologies, contributions,
  thumbnail_url, images, live_url, github_url, is_featured, is_published, display_order
) VALUES (
  'proj-1',
  'schoolware-admin',
  'Schoolware',
  'Enterprise School Management Platform',
  'An enterprise school platform for attendance, fees, and inventory, with real-time chat, push notifications, payment gateways, and operational dashboards.',
  'Schoolware is an enterprise school management platform built to streamline school operations. It brings attendance, fee, and inventory workflows together with real-time chat support, push notifications, payment gateways, and dashboards that replace manual spreadsheet reporting.',
  'Manual school administration and spreadsheet-based reporting make it difficult to coordinate attendance, fees, and inventory while keeping staff and families informed.',
  'Built full-stack school management modules and integrated real-time communications, notifications, payment gateways, and reporting dashboards.',
  '["Attendance management", "Fee management", "Inventory management", "Real-time chat support", "Push notifications", "Payment gateway integration", "Real-time operational dashboards"]'::jsonb,
  '["React.js", "TypeScript", "Node.js", "Express.js", "PostgreSQL"]'::jsonb,
  '["Built full-stack modules for attendance, fees, and inventory.", "Integrated real-time chat, push notifications, and payment gateways.", "Automated reporting with real-time dashboards, reducing administrative overhead by approximately 60%."]'::jsonb,
  '/images/projects/schoolware-thumb.webp',
  '["/images/projects/schoolware-thumb.webp", "/images/projects/schoolware-detail-1.webp"]'::jsonb,
  '',
  'https://github.com/gokulchandel',
  true,
  true,
  1
), (
  'proj-2',
  'janhit-chemist',
  'Janhit Pharmacy',
  'E-commerce Platform',
  'A pharmacy e-commerce platform with customer storefront, admin tools, product catalogs, cart and order workflows, inventory alerts, and secure payments.',
  'Janhit Pharmacy is a full-stack pharmacy e-commerce platform with a customer storefront and administration panels. Its REST APIs support product catalogs, cart operations, and real-time inventory alerts, with secure payment processing for online orders.',
  'Pharmacy customers need a straightforward online checkout, while administrators need dependable product, order, and inventory workflows.',
  'Developed a React storefront and admin panels backed by Node.js and Express APIs, and integrated secure payment processing and inventory alerts.',
  '["Customer-facing e-commerce storefront", "Administration panels", "Product catalog management", "Shopping cart and order workflows", "Real-time inventory alerts", "Secure online payment processing"]'::jsonb,
  '["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"]'::jsonb,
  '["Created the full-stack storefront and administration panels.", "Built REST APIs for cart operations, product catalogs, and inventory alerts.", "Integrated secure payments to streamline checkout and reduce fulfillment errors."]'::jsonb,
  '/images/projects/janhit-thumb.webp',
  '["/images/projects/janhit-thumb.webp", "/images/projects/janhit-detail-1.webp"]'::jsonb,
  '',
  'https://github.com/gokulchandel',
  true,
  true,
  2
), (
  'proj-3',
  'crm-platform',
  'PropCRM',
  'Lead Generation & Sales Analytics CRM',
  'A real estate CRM for lead capture, lead scoring, pipeline tracking, sales analytics, and automated lead notifications.',
  'PropCRM is a CRM platform for real estate sales teams. Lead capture, scoring, and pipeline tracking help organize sales conversion funnels, while interactive analytics dashboards and automated notifications help teams prioritize valuable leads.',
  'Real estate sales teams need a reliable way to capture and score leads, track pipeline progress, and focus follow-up on high-value opportunities.',
  'Developed lead capture, lead scoring, and pipeline tracking modules with analytics dashboards and automated notifications.',
  '["Lead capture and generation", "Lead scoring and management", "Sales pipeline tracking", "Interactive sales analytics dashboards", "Automated lead notifications"]'::jsonb,
  '["React.js", "Node.js", "Express.js", "PostgreSQL"]'::jsonb,
  '["Developed lead capture, lead scoring, and pipeline tracking modules for real estate sales teams.", "Built interactive analytics dashboards and automated lead notifications to prioritize high-value sales opportunities."]'::jsonb,
  '/images/projects/crm-thumb.webp',
  '["/images/projects/crm-thumb.webp", "/images/projects/crm-detail-1.webp"]'::jsonb,
  '',
  'https://github.com/gokulchandel',
  true,
  true,
  3
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description,
  problem_statement = EXCLUDED.problem_statement,
  solution = EXCLUDED.solution,
  features = EXCLUDED.features,
  technologies = EXCLUDED.technologies,
  contributions = EXCLUDED.contributions,
  updated_at = now();

-- 5. Experiences
INSERT INTO public.experiences (
  id, company, role, location, period, start_date, end_date, 
  is_current, description, responsibilities, technologies, display_order
) VALUES (
  'exp-parkhya',
  'Parkhya Solutions Pvt. Ltd.',
  'Junior Software Engineer — Full Stack Developer',
  'Indore, MP',
  'Dec 2024 – Present',
  '2024-12-01',
  NULL,
  true,
  'Architected key modules for three production web platforms across school management, B2B CRM, and e-commerce using React.js, TypeScript, Node.js, Express.js, PostgreSQL, and MongoDB.',
  '["Architected modules for three production platforms and reduced frontend development cycle times by 30%.", "Engineered secure REST APIs with JWT authentication, RBAC, middleware, WebSockets, and Webhooks, supporting 1,000+ concurrent active users.", "Integrated payment gateways, automated notifications, live chat, and analytics dashboards, cutting administrative workload by 60%.", "Optimized PostgreSQL and MongoDB queries, indexing, and aggregation pipelines, reducing query latency by 35%; improved page load speeds by 30% through code splitting.", "Collaborated in Agile sprints, code reviews, and CI/CD deployments, delivering 90%+ of sprint commitments on schedule."]'::jsonb,
  '["React.js", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "JWT", "RBAC", "WebSockets", "Webhooks", "CI/CD"]'::jsonb,
  1
) ON CONFLICT (id) DO UPDATE SET
  company = EXCLUDED.company,
  role = EXCLUDED.role,
  location = EXCLUDED.location,
  period = EXCLUDED.period,
  start_date = EXCLUDED.start_date,
  end_date = EXCLUDED.end_date,
  is_current = EXCLUDED.is_current,
  description = EXCLUDED.description,
  responsibilities = EXCLUDED.responsibilities,
  technologies = EXCLUDED.technologies;

INSERT INTO public.experiences (
  id, company, role, location, period, start_date, end_date,
  is_current, description, responsibilities, technologies, display_order
) VALUES (
  'exp-grow-tech',
  'Grow Tech, Dr. Reddy''s Foundation',
  'Full Stack Developer Intern',
  'Indore, MP',
  'Jun 2024 – Sep 2024',
  '2024-06-01',
  '2024-09-30',
  false,
  'Developed a full-stack e-commerce application with React.js, Express.js, Node.js, and MongoDB, and completed 15+ full-stack projects using Git-based Agile practices.',
  '["Developed product, cart, and order CRUD workflows for a full-stack e-commerce application.", "Completed 15+ full-stack projects connecting modular React frontends with Express and Node.js REST APIs using Git-based Agile practices."]'::jsonb,
  '["React.js", "Express.js", "Node.js", "MongoDB", "REST APIs", "Git", "Agile"]'::jsonb,
  2
) ON CONFLICT (id) DO UPDATE SET
  company = EXCLUDED.company,
  role = EXCLUDED.role,
  location = EXCLUDED.location,
  period = EXCLUDED.period,
  start_date = EXCLUDED.start_date,
  end_date = EXCLUDED.end_date,
  is_current = EXCLUDED.is_current,
  description = EXCLUDED.description,
  responsibilities = EXCLUDED.responsibilities,
  technologies = EXCLUDED.technologies,
  display_order = EXCLUDED.display_order;

-- 6. Education
INSERT INTO public.education (
  id, institution, degree, field_of_study, start_date, end_date, grade, description, display_order
) VALUES (
  'edu-bachelor',
  'Sushila Devi Bansal College of Technology, Indore',
  'Bachelor of Technology (B.Tech)',
  'Computer Science and Engineering',
  '2020',
  '2024',
  NULL,
  NULL,
  1
) ON CONFLICT (id) DO UPDATE SET
  institution = EXCLUDED.institution,
  degree = EXCLUDED.degree,
  field_of_study = EXCLUDED.field_of_study,
  start_date = EXCLUDED.start_date,
  end_date = EXCLUDED.end_date,
  grade = EXCLUDED.grade,
  description = EXCLUDED.description;

-- 7. Certifications
INSERT INTO public.certifications (
  id, name, issuer, issue_date, credential_url, description, display_order
) VALUES (
  'cert-fullstack',
  'Full Stack Web Development Certification',
  'Professional Developer Training Program',
  '2022',
  '',
  'Hands-on intensive training covering modern MERN architecture, REST API standards, and database modeling.',
  1
) ON CONFLICT (id) DO NOTHING;

-- 8. Services
INSERT INTO public.services (id, title, description, icon, display_order) VALUES
  ('serv-fullstack', 'Full Stack Web Development', 'End-to-end development of modern web applications using React, Next.js, Node.js, and Express with scalable architecture.', 'Layers', 1),
  ('serv-frontend', 'Frontend Development', 'Crafting responsive, high-performance user interfaces with React.js, Next.js, TypeScript, and modern CSS/Tailwind.', 'Layout', 2),
  ('serv-backend', 'Backend Development', 'Building secure, robust server-side applications and microservices using Node.js, Express.js, and clean code principles.', 'Server', 3),
  ('serv-apis', 'REST API Development', 'Designing and documenting clean, standardized, and secure RESTful APIs with authentication and comprehensive error handling.', 'Network', 4),
  ('serv-database', 'Database Design', 'Schema modeling, relationship structuring, query optimization, and data integrity across MongoDB and PostgreSQL.', 'Database', 5),
  ('serv-optimization', 'Web Application Optimization', 'Diagnosing bottlenecks, reducing bundle sizes, improving Core Web Vitals, and enhancing overall application responsiveness.', 'Zap', 6)
ON CONFLICT (id) DO NOTHING;

-- 9. Site Settings
INSERT INTO public.site_settings (
  id, site_title, meta_description, keywords, og_image, footer_text, is_hireable, resume_url, social_links
) VALUES (
  'site-settings-main',
  'Gokul Chandel | Full Stack Developer',
  'Portfolio of Gokul Chandel - Full Stack Developer with 2+ years of experience building modern web applications, scalable backend systems, and interactive user experiences.',
  '["Gokul Chandel", "Full Stack Developer", "MERN Stack Developer", "React Developer", "Node.js Developer", "Software Engineer", "Backend Developer", "Web Developer India", "Parkhya Solutions"]'::jsonb,
  '/images/og-image.png',
  '© 2026 Gokul Chandel. Engineered for performance and clean architecture.',
  true,
  '/Gokul_Resume.pdf',
  '{"github": "https://github.com/gokulchandel", "linkedin": "https://www.linkedin.com/in/gokul-chandel/", "email": "gokulchandel.dev@gmail.com"}'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  social_links = jsonb_set(
    COALESCE(site_settings.social_links, '{}'::jsonb),
    '{linkedin}',
    to_jsonb('https://www.linkedin.com/in/gokul-chandel/'::text),
    true
  );
