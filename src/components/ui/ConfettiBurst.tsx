'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  size: number;
  shape: 'circle' | 'rect';
  alpha: number;
  decay: number;
}

const COLORS = [
  '#8B5CF6', // violet
  '#A78BFA', // light violet
  '#22D3EE', // cyan
  '#38BDF8', // sky
  '#34D399', // emerald
  '#F472B6', // pink
  '#FBBF24', // amber
  '#FFFFFF', // white
];

export function triggerConfetti(originX?: number, originY?: number) {
  if (typeof window === 'undefined') return;
  const event = new CustomEvent('portfolio:confetti', {
    detail: {
      x: originX ?? window.innerWidth / 2,
      y: originY ?? window.innerHeight / 2,
    },
  });
  window.dispatchEvent(event);
}

export default function ConfettiBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const handleBurst = (e: Event) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const customEvent = e as CustomEvent<{ x: number; y: number }>;
      const { x, y } = customEvent.detail;

      const count = 90;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 12 + 4;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - Math.random() * 4,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: Math.random() * 8 + 5,
          shape: Math.random() > 0.4 ? 'rect' : 'circle',
          alpha: 1,
          decay: Math.random() * 0.012 + 0.008,
        });
      }

      if (!animationFrameId) {
        animate();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles = particles.filter((p) => p.alpha > 0);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.28; // gravity
        p.vx *= 0.98; // drag
        p.rotation += p.rotationSpeed;
        p.alpha -= p.decay;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        animationFrameId = 0;
      }
    };

    window.addEventListener('portfolio:confetti', handleBurst);

    return () => {
      window.removeEventListener('portfolio:confetti', handleBurst);
      window.removeEventListener('resize', resize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      aria-hidden="true"
    />
  );
}
