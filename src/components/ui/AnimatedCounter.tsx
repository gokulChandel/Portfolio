'use client';

import { useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  duration = 1.6,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const str = String(value);
    const match = str.match(/^([^0-9.]*)([0-9.]+)(.*)$/);

    if (!match) {
      element.textContent = str;
      return;
    }

    const prefix = match[1] || '';
    const targetNum = parseFloat(match[2]);
    const suffix = match[3] || '';
    const hasDecimals = match[2].includes('.');
    const decimalPlaces = hasDecimals ? match[2].split('.')[1].length : 0;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.textContent = str;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const start = 0;
            const startTime = performance.now();
            const totalDuration = duration * 1000;

            const update = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / totalDuration, 1);
              // easeOutExpo
              const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              const current = start + (targetNum - start) * eased;

              if (element) {
                element.textContent = `${prefix}${current.toFixed(decimalPlaces)}${suffix}`;
              }

              if (progress < 1) {
                requestAnimationFrame(update);
              } else if (element) {
                element.textContent = str;
              }
            };

            requestAnimationFrame(update);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {String(value)}
    </span>
  );
}
