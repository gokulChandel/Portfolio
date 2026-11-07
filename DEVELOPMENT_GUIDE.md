# Development Architecture Guide — Gokul Chandel Portfolio

This guide documents the technical architecture, component design patterns, GSAP animation system, and coding standards used across this codebase.

---

## 1. Architectural Philosophy

1. **Server Components by Default**: The root layout, homepage (`page.tsx`), project dynamic routes (`/projects/[slug]`), and admin layouts are React Server Components to minimize client-side bundle size and maximize SEO.
2. **Client Components Only When Interactive**: Form states, animation triggers (`useGSAP`), modals, and theme togglers use `'use client'`.
3. **Unified Storage Engine**: `src/lib/data/store.ts` abstracts database operations. It transparently interfaces with Supabase PostgreSQL when connected, and falls back to atomic local file persistence (`.data/portfolio-state.json`) when offline or during local development.
4. **GSAP Animation Hygiene**: Animations are wrapped in `useGSAP` or scoped `gsap.context()` blocks to guarantee cleanup on unmount, prevent memory leaks, and respect user motion preferences.

---

## 2. Directory Structure Conventions

```
src/
├── app/                  # Next.js App Router endpoints & routes
│   ├── (dashboard)/      # Admin dashboard pages (route group)
│   ├── admin/login/      # Admin authentication page
│   ├── api/              # Route handlers (POST /api/contact, GET /api/admin/...)
│   ├── projects/         # Archive index & dynamic slug pages
│   ├── globals.css       # Tailwind 4 configuration and CSS variables
│   ├── layout.tsx        # HTML document frame & JSON-LD
│   └── page.tsx          # Homepage server component
├── components/
│   ├── admin/            # Admin UI (Dashboard shell, navigation, modals)
│   ├── layout/           # Global chrome (Navbar, Footer, ThemeToggle)
│   ├── projects/         # Project showcase cards and badges
│   ├── sections/         # Homepage sections (Hero, About, Skills, etc.)
│   └── ui/               # Reusable atomic UI elements (BrandIcons)
├── lib/
│   ├── animations/       # GSAP plugin initialization and helper wrappers
│   ├── data/             # Unified store & initial seed defaults
│   ├── supabase/         # Client & Server Supabase connectors
│   ├── validations/      # Request payload validation routines
│   └── auth.ts           # Admin session token creation & verification
└── types/
    └── index.ts          # Centralized TypeScript definitions
```

---

## 3. GSAP Animation System Architecture

### Initialization (`src/lib/animations/gsap.ts`)
```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };
```

### Motion Preference Respect
Every animated section explicitly checks for reduced motion before attaching ScrollTrigger listeners:
```typescript
useGSAP(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  // Animation logic...
}, { scope: containerRef });
```

### GPU-Accelerated Properties
Animations strictly animate `transform` (`x`, `y`, `scale`) and `opacity` to avoid expensive layout recalculations and repaint thrashing.

---

## 4. How to Extend the Application

### Adding a New Homepage Section
1. Define any required data types in `src/types/index.ts`.
2. Add initial data defaults in `src/lib/data/initialData.ts`.
3. Add accessor and mutator methods in `src/lib/data/store.ts`.
4. Create the section component in `src/components/sections/NewSection.tsx`.
5. Import and render it inside `src/app/page.tsx`.
6. Add the navigation link in `src/components/layout/Navbar.tsx` and `Footer.tsx`.

### Adding a New Admin Management Tab
1. Create a page at `src/app/admin/(dashboard)/your-feature/page.tsx`.
2. Add corresponding API routes at `src/app/api/admin/your-feature/route.ts` with `verifyAdminSession()`.
3. Add the navigation item in `src/components/admin/AdminDashboardShell.tsx`.
