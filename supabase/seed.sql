-- ====================================================================
-- SUPABASE SEED DATA FOR GOKUL CHANDEL PORTFOLIO
-- ====================================================================

-- 1. Profile Seed
INSERT INTO public.profiles (
  id, name, title, subtitle, intro_tag, bio, experience_years, 
  current_company, location, email, github_url, linkedin_url, resume_url, 
  availability_status, about_paragraphs, career_targets, primary_expertise, highlights
) VALUES (
  'gokul-chandel-profile',
  'Gokul Chandel',
  'Full Stack Developer',
  'Building scalable digital experiences with modern technologies.',
  'HELLO, I''M',
  'I am a Full Stack Developer with 2+ years of experience building modern web applications, scalable backend systems, and interactive user experiences.',
  '2+',
  'Parkhya Solutions Pvt. Ltd.',
  'India',
  'gokulchandel.dev@gmail.com',
  'https://github.com/gokulchandel',
  'https://linkedin.com/in/gokulchandel',
  '/resume.pdf',
  'Available for opportunities',
  '["I am a Full Stack Developer with 2+ years of professional experience engineering resilient web applications and backend systems at Parkhya Solutions Pvt. Ltd.", "My core expertise revolves around the MERN stack (MongoDB, Express.js, React.js, Node.js), modern Next.js architectures, TypeScript, and relational databases like PostgreSQL. I am passionate about crafting clean system architectures, reusable component design systems, and efficient RESTful APIs.", "I focus on solving real-world business challenges through scalable software solutions, rigorous performance optimization, clean code principles, and intuitive user experiences."]'::jsonb,
  '["Software Development Engineer", "Full Stack Developer", "Backend Developer"]'::jsonb,
  '["MERN Stack Development", "Full Stack Web Application Development", "Frontend Development", "Backend Development", "REST API Development", "Database Management"]'::jsonb,
  '[
    {"label": "2+ Years", "sublabel": "Professional Experience", "icon": "Briefcase"},
    {"label": "Full Stack", "sublabel": "MERN & Next.js Architecture", "icon": "Layers"},
    {"label": "Modern Web", "sublabel": "React, TypeScript, Tailwind", "icon": "Code2"},
    {"label": "Scalable Systems", "sublabel": "REST APIs & Clean DB Design", "icon": "Server"}
  ]'::jsonb
) ON CONFLICT (id) DO UPDATE SET updated_at = now();

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

  ('sk-node', 'cat-backend', 'Node.js', 'Server', 'Experienced', 1, true),
  ('sk-express', 'cat-backend', 'Express.js', 'Box', 'Experienced', 2, true),
  ('sk-rest', 'cat-backend', 'REST APIs', 'Network', 'Experienced', 3, true),
  ('sk-golang', 'cat-backend', 'Golang', 'Terminal', 'Learning', 4, true),

  ('sk-mongo', 'cat-database', 'MongoDB', 'Database', 'Experienced', 1, true),
  ('sk-postgres', 'cat-database', 'PostgreSQL', 'DatabaseZap', 'Proficient', 2, true),
  ('sk-supabase', 'cat-database', 'Supabase', 'Zap', 'Proficient', 3, true),
  ('sk-firebase', 'cat-database', 'Firebase', 'Flame', 'Proficient', 4, true),

  ('sk-docker', 'cat-devops', 'Docker', 'Container', 'Working Knowledge', 1, true),
  ('sk-aws', 'cat-devops', 'AWS', 'Cloud', 'Working Knowledge', 2, true),
  ('sk-actions', 'cat-devops', 'GitHub Actions', 'GitPullRequest', 'Working Knowledge', 3, true),
  ('sk-cicd', 'cat-devops', 'CI/CD', 'Workflow', 'Working Knowledge', 4, true),
  ('sk-linux', 'cat-devops', 'Linux', 'TerminalSquare', 'Proficient', 5, true),

  ('sk-git', 'cat-tools', 'Git', 'GitBranch', 'Experienced', 1, true),
  ('sk-github', 'cat-tools', 'GitHub', 'Github', 'Experienced', 2, true),
  ('sk-postman', 'cat-tools', 'Postman', 'Send', 'Experienced', 3, true),
  ('sk-vscode', 'cat-tools', 'VS Code', 'CodeXml', 'Experienced', 4, true)
ON CONFLICT (id) DO NOTHING;

-- 4. Projects
INSERT INTO public.projects (
  id, slug, title, category, short_description, full_description,
  problem_statement, solution, features, technologies, contributions,
  thumbnail_url, images, live_url, github_url, is_featured, is_published, display_order
) VALUES (
  'proj-1',
  'schoolware-admin',
  'Schoolware Admin',
  'School Management System',
  'A school management platform designed to manage students, teachers, classes, attendance, timetables, and administrative workflows.',
  'Schoolware Admin is a full-featured web-based school administration and ERP platform. It unifies operations across students, faculty, academic departments, fee schedules, class timetables, and attendance logs into a responsive and intuitive digital workspace. Engineered to eliminate operational friction and enhance data accuracy for school administrative teams.',
  'Educational institutions frequently battle disjointed record systems, manual attendance tracking, scattered timetable scheduling, and inefficient student data retrieval which create administrative bottlenecks and human error.',
  'Designed and developed a cohesive administrative dashboard with role-based authorization, automated timetable management, student lifecycle tracking, attendance logging, and fast search capabilities with secure API endpoints.',
  '["Role-based access control (Admin, Teacher, Staff)", "Comprehensive student and faculty profiles & record archives", "Class & section timetable generator with collision detection", "Daily attendance tracking and reporting system", "Administrative notices and announcements distribution", "Exportable reports for academic audits and records"]'::jsonb,
  '["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT", "REST APIs"]'::jsonb,
  '["Architected RESTful backend API services with Express.js and MongoDB.", "Designed responsive admin UI layouts using React.js and Tailwind CSS.", "Implemented secure JWT authentication and role-based permissions.", "Engineered dynamic timetable creation and attendance management modules."]'::jsonb,
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
  'Janhit Chemist',
  'Pharmacy Management Platform',
  'A pharmacy management platform with inventory management, medicine tracking, order management, and administrative functionality.',
  'Janhit Chemist is a purpose-built digital management system for pharmacy retailers and distributors. It provides complete oversight of medicine stocks, batch numbers, expiration schedules, supplier orders, and customer billing workflows with real-time stock alerts.',
  'Retail pharmacy stores struggle with manual inventory reconciliation, unmonitored medicine expiry losses, stockout scenarios during peak hours, and cumbersome invoice processing.',
  'Built an end-to-end pharmacy operations platform with fast medicine search, automated low-stock warnings, expiry date monitoring, purchase order recording, and seamless point-of-sale receipt generation.',
  '["Real-time medicine inventory tracking with batch number records", "Automated expiry alerts and shelf-life monitoring", "Supplier order management and invoice generation", "Fast customer search and billing module", "Administrative sales reports and inventory valuation summaries"]'::jsonb,
  '["React.js", "Node.js", "MongoDB", "Bootstrap", "REST APIs"]'::jsonb,
  '["Developed inventory tracking and batch management backend logic.", "Implemented front-end management modules in React.js.", "Integrated RESTful endpoints for medicine catalog and transactions.", "Optimized MongoDB queries for real-time inventory level searches."]'::jsonb,
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
  'CRM Platform',
  'Customer Relationship Management',
  'A CRM application focused on lead generation, lead management, business analytics, and tracking sales activities.',
  'A tailored Customer Relationship Management platform designed to streamline sales workflows, lead acquisition, follow-up scheduling, customer interaction history, and conversion analytics for growing businesses.',
  'Sales teams lose potential deals when lead data is scattered across spreadsheets, follow-up reminders are missed, and managers lack real-time visibility into the team sales pipeline.',
  'Engineered an intuitive CRM web platform enabling stage-by-stage pipeline tracking, lead source tagging, interaction logs, task assignees, and real-time dashboard analytics.',
  '["Pipeline stages tracking from prospecting to closure", "Lead assignment and multi-channel source categorization", "Activity timeline with call notes, emails, and meetings", "Performance analytics and monthly conversion metrics", "Role-based data access for sales reps and managers"]'::jsonb,
  '["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Tailwind CSS"]'::jsonb,
  '["Designed lead lifecycle data schemas and state transitions.", "Built interactive pipeline boards and lead detail views.", "Implemented analytics endpoints for stage conversion rates.", "Created automated status update workflows for sales activities."]'::jsonb,
  '/images/projects/crm-thumb.webp',
  '["/images/projects/crm-thumb.webp", "/images/projects/crm-detail-1.webp"]'::jsonb,
  '',
  'https://github.com/gokulchandel',
  true,
  true,
  3
) ON CONFLICT (id) DO NOTHING;

-- 5. Experiences
INSERT INTO public.experiences (
  id, company, role, location, period, start_date, end_date, 
  is_current, description, responsibilities, technologies, display_order
) VALUES (
  'exp-parkhya',
  'Parkhya Solutions Pvt. Ltd.',
  'Junior Software Engineer',
  'India',
  '2022 - Present (2+ Years)',
  '2022-08-01',
  NULL,
  true,
  'Working on modern web application development using React.js, Node.js, Express.js, MongoDB, and related technologies.',
  '["Engineered full-stack features using React.js, Node.js, Express.js, and MongoDB for diverse enterprise web applications.", "Developed performant, scalable RESTful APIs with structured request validation and JWT-based authentication.", "Designed modular, reusable frontend component libraries with clean state management and responsive styling.", "Optimized database queries and indexing strategies in MongoDB to improve API response latencies.", "Collaborated in Agile development cycles, sprint planning, peer code reviews, and version control using Git and GitHub."]'::jsonb,
  '["React.js", "Node.js", "Express.js", "MongoDB", "JavaScript", "TypeScript", "REST APIs", "Tailwind CSS", "Git"]'::jsonb,
  1
) ON CONFLICT (id) DO NOTHING;

-- 6. Education
INSERT INTO public.education (
  id, institution, degree, field_of_study, start_date, end_date, grade, description, display_order
) VALUES (
  'edu-bachelor',
  'University / Institute of Technology',
  'Bachelor of Technology (B.Tech)',
  'Computer Science & Engineering',
  '2018',
  '2022',
  'First Class with Distinction',
  'Core coursework in Data Structures, Algorithms, Database Management Systems, Computer Networks, and Software Engineering.',
  1
) ON CONFLICT (id) DO NOTHING;

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
  '/resume.pdf',
  '{"github": "https://github.com/gokulchandel", "linkedin": "https://linkedin.com/in/gokulchandel", "email": "gokulchandel.dev@gmail.com"}'::jsonb
) ON CONFLICT (id) DO NOTHING;
