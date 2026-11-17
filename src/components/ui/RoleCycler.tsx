'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';

interface RoleCyclerProps {
  roles?: string[];
  defaultTitle: string;
}

const DEFAULT_ROLES = [
  'Full Stack Developer',
  'MERN Stack Specialist',
  'TypeScript & Next.js Engineer',
  'Scalable Backend Architect',
  'REST API & Systems Builder',
];

function subscribeReducedMotion(callback: () => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function RoleCycler({ roles = DEFAULT_ROLES, defaultTitle }: RoleCyclerProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    if (reduceMotion) return;

    const currentTarget = roles[roleIndex % roles.length];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentTarget.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentTarget.slice(0, displayText.length + 1));
        }, 75);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentTarget.slice(0, displayText.length - 1));
        }, 40);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 250);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, roles, reduceMotion]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(blinkInterval);
  }, []);

  if (reduceMotion) {
    return (
      <span className="text-gradient font-bold">{defaultTitle}</span>
    );
  }

  return (
    <span className="inline-flex items-center">
      <span className="text-gradient font-bold drop-shadow-sm">
        {displayText || defaultTitle}
      </span>
      <span
        className={`ml-1 inline-block w-[3px] h-[1.1em] bg-cyan-400 rounded-sm shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-opacity duration-150 ${
          cursorVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />
    </span>
  );
}
