import {
  getProfile,
  getSkills,
  getSkillCategories,
  getExperiences,
  getProjects,
  getServices,
  getEducation,
  getCertifications,
  getSiteSettings,
} from '@/lib/data/store';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Services from '@/components/sections/Services';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';


export default async function HomePage() {
  const [
    profile,
    skills,
    skillCategories,
    experiences,
    projects,
    services,
    education,
    certifications,
    siteSettings,
  ] = await Promise.all([
    getProfile(),
    getSkills(true),
    getSkillCategories(),
    getExperiences(),
    getProjects(true),
    getServices(),
    getEducation(),
    getCertifications(),
    getSiteSettings(),
  ]);

  return (
    <div className="relative min-h-screen bg-[#080B12] text-[#F8FAFC] overflow-hidden selection:bg-violet-600/30 selection:text-white">
      {/* Sticky Top Navigation */}
      <Navbar resumeUrl={profile.resume_url} name={profile.name} />

      {/* Main Sections */}
      <main className="relative z-10 flex flex-col">
        <Hero profile={profile} />
        <About profile={profile} />
        <Skills skills={skills} categories={skillCategories} />
        <Experience experiences={experiences} />
        <Projects projects={projects} />
        <Services services={services} />
        <Education education={education} certifications={certifications} />
        <Contact profile={profile} />
      </main>

      {/* Footer */}
      <Footer
        name={profile.name}
        title={profile.title}
        footerText={siteSettings.footer_text}
        githubUrl={profile.github_url}
        linkedinUrl={profile.linkedin_url}
        email={profile.email}
      />
    </div>
  );
}
