'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  angle: number;
  orbitRadius: number;
  orbitSpeed: number;
  radius: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
}

interface PointerPosition {
  x: number;
  y: number;
  active: boolean;
}

const PARTICLE_COUNT = 54;

export default function AntigravityParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
      console.error('Unable to initialize the hero particle canvas.');
      return;
    }

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer: PointerPosition = { x: 0, y: 0, active: false };
    const particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frameId = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const nextWidth = bounds.width;
      const nextHeight = bounds.height;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      if (width > 0 && height > 0) {
        particles.forEach((particle) => {
          particle.x *= nextWidth / width;
          particle.y *= nextHeight / height;
          particle.orbitRadius *= nextWidth / width;
        });
      }

      width = nextWidth;
      height = nextHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      if (particles.length === 0) {
        for (let index = 0; index < PARTICLE_COUNT; index += 1) {
          const angle = Math.random() * Math.PI * 2;
          const orbitRadius = 45 + Math.random() * Math.max(width, height) * 0.46;
          particles.push({
            angle,
            orbitRadius,
            orbitSpeed: (Math.random() * 0.0014 + 0.00025) * (index % 2 ? 1 : -1),
            radius: Math.random() * 1.5 + 0.7,
            x: width * 0.7 + Math.cos(angle) * orbitRadius,
            y: height * 0.48 + Math.sin(angle) * orbitRadius * 0.46,
            vx: 0,
            vy: 0,
            hue: index % 3 === 0 ? 188 : 260,
          });
        }
      }

      draw();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const now = performance.now();
      const centerX = width * 0.7;
      const centerY = height * 0.48;

      particles.forEach((particle) => {
        particle.angle += particle.orbitSpeed;
        let targetX = centerX + Math.cos(particle.angle) * particle.orbitRadius;
        let targetY = centerY + Math.sin(particle.angle) * particle.orbitRadius * 0.46;

        if (pointer.active) {
          const ringRadius = 48 + (particle.orbitRadius % 56);
          targetX = pointer.x + Math.cos(particle.angle) * ringRadius;
          targetY = pointer.y + Math.sin(particle.angle) * ringRadius;
        }

        particle.vx += (targetX - particle.x) * 0.0017;
        particle.vy += (targetY - particle.y) * 0.0017;
        particle.vx *= 0.985;
        particle.vy *= 0.985;
        particle.x += particle.vx;
        particle.y += particle.vy;

        const pulse = 0.55 + Math.sin(now * 0.001 + particle.angle) * 0.2;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `hsla(${particle.hue}, 90%, 76%, ${pulse})`;
        context.shadowBlur = 12;
        context.shadowColor = `hsla(${particle.hue}, 90%, 68%, 0.7)`;
        context.fill();
      });

      context.shadowBlur = 0;
      for (let first = 0; first < particles.length; first += 1) {
        for (let second = first + 1; second < particles.length; second += 1) {
          const start = particles[first];
          const end = particles[second];
          const distance = Math.hypot(start.x - end.x, start.y - end.y);

          if (distance < 84) {
            context.beginPath();
            context.moveTo(start.x, start.y);
            context.lineTo(end.x, end.y);
            context.strokeStyle = `rgba(167, 139, 250, ${(1 - distance / 84) * 0.12})`;
            context.stroke();
          }
        }
      }
    };

    const animate = () => {
      draw();
      frameId = window.requestAnimationFrame(animate);
    };

    const updatePointer = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active =
        pointer.x >= 0 &&
        pointer.x <= bounds.width &&
        pointer.y >= 0 &&
        pointer.y <= bounds.height;
    };

    const burstParticles = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const clickX = event.clientX - bounds.left;
      const clickY = event.clientY - bounds.top;

      particles.forEach((particle) => {
        const deltaX = particle.x - clickX;
        const deltaY = particle.y - clickY;
        const distance = Math.max(Math.hypot(deltaX, deltaY), 1);

        if (distance < 240) {
          const force = (1 - distance / 240) * 7;
          particle.vx += (deltaX / distance) * force;
          particle.vy += (deltaY / distance) * force;
        }
      });
    };

    resize();
    if (!motionPreference.matches) {
      frameId = window.requestAnimationFrame(animate);
      window.addEventListener('pointermove', updatePointer, { passive: true });
      window.addEventListener('pointerdown', burstParticles, { passive: true });
    }
    window.addEventListener('resize', resize, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('pointerdown', burstParticles);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="antigravity-particles" aria-hidden="true" />;
}
