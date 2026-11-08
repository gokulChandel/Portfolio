'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations/gsap';

export default function SpotlightGlow() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const pointer = window.matchMedia('(pointer: fine)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!spotlight || !cursor || !cursorDot || !pointer.matches) {
      return;
    }

    const moveSpotlightX = gsap.quickTo(spotlight, 'x', {
      duration: reduceMotion ? 0.01 : 0.18,
      ease: 'power2.out',
    });
    const moveSpotlightY = gsap.quickTo(spotlight, 'y', {
      duration: reduceMotion ? 0.01 : 0.18,
      ease: 'power2.out',
    });
    const moveCursorX = gsap.quickTo(cursor, 'x', {
      duration: reduceMotion ? 0.01 : 0.32,
      ease: 'power3.out',
    });
    const moveCursorY = gsap.quickTo(cursor, 'y', {
      duration: reduceMotion ? 0.01 : 0.32,
      ease: 'power3.out',
    });
    const moveDotX = gsap.quickTo(cursorDot, 'x', {
      duration: reduceMotion ? 0.01 : 0.08,
      ease: 'power2.out',
    });
    const moveDotY = gsap.quickTo(cursorDot, 'y', {
      duration: reduceMotion ? 0.01 : 0.08,
      ease: 'power2.out',
    });

    gsap.set([spotlight, cursor, cursorDot], { xPercent: -50, yPercent: -50 });

    const handlePointerMove = (event: PointerEvent) => {
      if (!reduceMotion) {
        moveSpotlightX(event.clientX);
        moveSpotlightY(event.clientY);
        spotlight.classList.add('is-visible');
      }
      moveCursorX(event.clientX);
      moveCursorY(event.clientY);
      moveDotX(event.clientX);
      moveDotY(event.clientY);
      cursor.classList.add('is-visible');
      cursorDot.classList.add('is-visible');
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const isInteractive = target.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor="interactive"]'
      );
      gsap.to(cursor, {
        scale: !reduceMotion && isInteractive ? 1.65 : 1,
        borderColor: isInteractive
          ? 'rgba(34, 211, 238, 0.85)'
          : 'rgba(167, 139, 250, 0.6)',
        duration: reduceMotion ? 0.01 : 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handlePointerDown = () => {
      if (reduceMotion) return;
      gsap.to(cursor, {
        scale: 0.72,
        duration: 0.16,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handlePointerUp = (event: PointerEvent) => {
      const target = event.target;
      const isInteractive =
        target instanceof Element &&
        !!target.closest(
          'a, button, input, textarea, select, [role="button"], [data-cursor="interactive"]'
        );
      gsap.to(cursor, {
        scale: !reduceMotion && isInteractive ? 1.65 : 1,
        duration: reduceMotion ? 0.01 : 0.3,
        ease: reduceMotion ? 'none' : 'elastic.out(1, 0.55)',
        overwrite: 'auto',
      });
    };

    const hideCursor = () => {
      spotlight.classList.remove('is-visible');
      cursor.classList.remove('is-visible');
      cursorDot.classList.remove('is-visible');
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.addEventListener('pointerdown', handlePointerDown, { passive: true });
    document.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', hideCursor);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerup', handlePointerUp);
      document.documentElement.removeEventListener('pointerleave', hideCursor);
      gsap.killTweensOf([cursor, cursorDot]);
    };
  }, []);

  return (
    <>
      <div ref={spotlightRef} aria-hidden="true" className="cursor-spotlight" />
      <div ref={cursorRef} aria-hidden="true" className="cursor-aura" />
      <div ref={cursorDotRef} aria-hidden="true" className="cursor-dot" />
    </>
  );
}
