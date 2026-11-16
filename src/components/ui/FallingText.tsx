'use client';

import { useRef, type KeyboardEvent, type PointerEvent } from 'react';
import { gsap } from '@/lib/animations/gsap';

interface FallingTextProps {
  text: string;
  className?: string;
}

interface DragState {
  letter: HTMLSpanElement;
  pointerId: number;
  previousX: number;
  previousY: number;
  velocityX: number;
  velocityY: number;
}

export default function FallingText({ text, className }: FallingTextProps) {
  const dragRef = useRef<DragState | null>(null);

  const handlePointerDown = (event: PointerEvent<HTMLHeadingElement>) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const letter = target.closest<HTMLSpanElement>('[data-falling-letter]');
    if (!letter) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      letter,
      pointerId: event.pointerId,
      previousX: event.clientX,
      previousY: event.clientY,
      velocityX: 0,
      velocityY: 0,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLHeadingElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.previousX;
    const deltaY = event.clientY - drag.previousY;
    drag.velocityX = deltaX;
    drag.velocityY = deltaY;
    drag.previousX = event.clientX;
    drag.previousY = event.clientY;

    gsap.set(drag.letter, {
      x: `+=${deltaX}`,
      y: `+=${deltaY}`,
      rotation: `+=${deltaX * 0.35}`,
    });
  };

  const settleLetter = (event: PointerEvent<HTMLHeadingElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;

    const { letter, velocityX, velocityY } = drag;
    gsap.to(letter, {
      x: gsap.utils.clamp(-220, 220, velocityX * 12),
      y: Math.min(Math.max(velocityY * 12, 72), 260),
      rotation: gsap.utils.clamp(-150, 150, velocityX * 14),
      duration: 0.45,
      ease: 'power2.in',
      onComplete: () => {
        gsap.to(letter, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.9,
          ease: 'elastic.out(1, 0.45)',
        });
      },
    });
  };

  const tossLetters = (event: KeyboardEvent<HTMLHeadingElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();

    const letters = event.currentTarget.querySelectorAll<HTMLElement>('[data-falling-letter]');
    gsap.to(letters, {
      x: () => gsap.utils.random(-80, 80),
      y: () => gsap.utils.random(50, 150),
      rotation: () => gsap.utils.random(-35, 35),
      duration: 0.4,
      stagger: 0.025,
      ease: 'power2.in',
      onComplete: () => {
        gsap.to(letters, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.9,
          stagger: 0.025,
          ease: 'elastic.out(1, 0.45)',
        });
      },
    });
  };

  return (
    <h1
      aria-label={text}
      className={className}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={settleLetter}
      onPointerCancel={settleLetter}
      onKeyDown={tossLetters}
      title="Drag a letter and let it go"
    >
      {Array.from(text).map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          data-falling-letter
          aria-hidden="true"
          className="falling-letter inline-block"
        >
          {letter === ' ' ? '\u00a0' : letter}
        </span>
      ))}
    </h1>
  );
}
