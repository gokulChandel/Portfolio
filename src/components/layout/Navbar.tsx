'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, FileDown, ArrowUpRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  resumeUrl?: string;
  name?: string;
}

const NAV_ITEMS = [
  { label: 'Home', href: '/#hero' },
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar({ resumeUrl = '/resume.pdf', name = 'Gokul Chandel' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerPositionClass = 'relative z-50 mx-auto mt-3 w-[calc(100%-1.5rem)] max-w-[1440px]';
  // To pin the header while scrolling, swap the line above for:
  // const headerPositionClass = 'fixed top-3 left-3 right-3 z-50';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Determine active section
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      data-scrolled={isScrolled}
      className={`site-navbar ${headerPositionClass} transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080B12]/85 backdrop-blur-xl border border-white/[0.08] shadow-lg shadow-black/20 rounded-2xl py-2.5'
          : 'bg-transparent py-2.5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="/#hero"
            className="flex items-center gap-2.5 group"
          >
            <div className="site-brand-mark w-9 h-9 rounded-lg flex items-center justify-center font-bold text-base shadow-md group-hover:scale-105 transition-transform">
              GC
            </div>
            <div className="flex flex-col">
              <span className="site-brand-name font-semibold transition-colors tracking-tight text-sm sm:text-base">
                {name}
              </span>
              <span className="site-brand-role text-[11px] font-mono hidden sm:inline-block">
                Full Stack Developer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="site-desktop-nav hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('/#', '');
              const isActive = activeSection === sectionId;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`site-nav-link px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'site-nav-active shadow-sm'
                      : ''
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Theme Toggle, Resume Download, Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="site-resume-button hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:-translate-y-0.5"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="site-menu-button p-2 rounded-lg lg:hidden focus:outline-none focus:ring-2 focus:ring-violet-500"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="site-mobile-drawer lg:hidden px-4 pt-3 pb-6 bg-[#080B12]/95 backdrop-blur-xl border border-white/10 rounded-2xl space-y-2 mt-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('/#', '');
              const isActive = activeSection === sectionId;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`site-mobile-nav-link px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'site-nav-active'
                      : ''
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="site-resume-button w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="site-admin-link flex items-center justify-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 py-1"
            >
              <span>Admin Portal</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
