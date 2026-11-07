import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Gokul Chandel | Full Stack Developer',
    template: '%s | Gokul Chandel',
  },
  description: 'Full Stack Developer with 2+ years of experience engineering scalable web applications, modern React/Next.js interfaces, and robust Node.js backend systems.',
  keywords: [
    'Gokul Chandel',
    'Full Stack Developer',
    'MERN Stack Developer',
    'React Developer',
    'Node.js Developer',
    'Software Engineer',
    'Backend Developer',
    'Web Developer India',
    'Parkhya Solutions',
  ],
  authors: [{ name: 'Gokul Chandel', url: 'https://github.com/gokulchandel' }],
  creator: 'Gokul Chandel',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Gokul Chandel | Full Stack Developer',
    description: 'Full Stack Developer specializing in MERN stack, Next.js, TypeScript, and scalable backend architecture.',
    siteName: 'Gokul Chandel Portfolio',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gokul Chandel - Full Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gokul Chandel | Full Stack Developer',
    description: 'Full Stack Developer with 2+ years of experience building scalable web applications.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import SpotlightGlow from '@/components/ui/SpotlightGlow';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gokul Chandel',
    jobTitle: 'Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Parkhya Solutions Pvt. Ltd.',
    },
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    sameAs: [
      'https://github.com/gokulchandel',
      'https://linkedin.com/in/gokulchandel',
    ],
    knowsAbout: [
      'React.js',
      'Next.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'PostgreSQL',
      'TypeScript',
      'REST APIs',
      'Full Stack Web Development',
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('portfolio-theme');
                if (theme === 'light') {
                  document.documentElement.setAttribute('data-theme', 'light');
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.setAttribute('data-theme', 'dark');
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                }
              } catch(e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#080B12] text-[#F8FAFC] selection:bg-[#8B5CF6]/30 selection:text-white transition-colors duration-300">
        <SpotlightGlow />
        {children}
      </body>
    </html>
  );
}
