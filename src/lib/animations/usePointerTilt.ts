'use client';

import { useEffect, useRef } from 'react';
import { gsap } from './gsap';

export function usePointerTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (
      !element ||
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let rotateX: (value: number) => void = () => undefined;
    let rotateY: (value: number) => void = () => undefined;
    let lift: (value: number) => void = () => undefined;
    const context = gsap.context(() => {
      gsap.set(element, {
        transformPerspective: 1100,
        transformOrigin: 'center center',
        transformStyle: 'preserve-3d',
      });
      rotateX = gsap.quickTo(element, 'rotationX', {
        duration: 0.45,
        ease: 'power3.out',
      });
      rotateY = gsap.quickTo(element, 'rotationY', {
        duration: 0.45,
        ease: 'power3.out',
      });
      lift = gsap.quickTo(element, 'y', {
        duration: 0.45,
        ease: 'power3.out',
      });
    }, element);

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;

      const bounds = element.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
      const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
      rotateX(-vertical * 5);
      rotateY(horizontal * 5);
      lift(-3);
    };

    const resetTilt = () => {
      rotateX(0);
      rotateY(0);
      lift(0);
    };

    element.addEventListener('pointermove', handlePointerMove, { passive: true });
    element.addEventListener('pointerleave', resetTilt, { passive: true });

    return () => {
      element.removeEventListener('pointermove', handlePointerMove);
      element.removeEventListener('pointerleave', resetTilt);
      context.revert();
    };
  }, []);

  return ref;
}
