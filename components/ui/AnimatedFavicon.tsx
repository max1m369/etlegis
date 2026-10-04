'use client';

import { useEffect } from 'react';

// Exact ETLEGIS geometric monogram path (viewBox 0 0 120 120)
const SVG_PATH =
  'M113.4,31.3V11.9H35.8v19.4H12.5v81.5h81.5v-23.3h19.4v-19.4h-58.2v-11.7h58.2v-15.5h-58.2v-11.6h58.2ZM86.2,89.5v15.5H20.2V39h15.5v50.4h50.5v.1Z';

const CANVAS_SIZE = 64;
const VIEWBOX_SIZE = 120;
const SWEEP_DURATION_MS = 750; // duration of the 45-degree glare sweep
const CYCLE_INTERVAL_MS = 2800; // total loop interval (~2.8 - 3s)

export default function AnimatedFavicon() {
  useEffect(() => {
    // Only execute on client side
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    let path: Path2D | null = null;
    try {
      path = new Path2D(SVG_PATH);
    } catch {
      return;
    }

    const scale = CANVAS_SIZE / VIEWBOX_SIZE;

    // Helper to query or create favicon link tags
    const getIconLinks = (): HTMLLinkElement[] => {
      let links = Array.from(
        document.querySelectorAll<HTMLLinkElement>("link[rel~='icon']")
      );
      if (links.length === 0) {
        const newLink = document.createElement('link');
        newLink.rel = 'icon';
        document.head.appendChild(newLink);
        links = [newLink];
      }
      return links;
    };

    let animId: number | null = null;
    let timerId: ReturnType<typeof setTimeout> | null = null;
    let isDestroyed = false;

    // Draw silver monogram with optional 45° specular glare
    const drawFrame = (glareProgress: number | null) => {
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      ctx.save();
      ctx.scale(scale, scale);

      // 1. Base Silver Metallic Gradient
      const baseGrad = ctx.createLinearGradient(0, 0, VIEWBOX_SIZE, VIEWBOX_SIZE);
      baseGrad.addColorStop(0, '#F1F5F9');   // Bright silver top-left
      baseGrad.addColorStop(0.25, '#CBD5E1'); // Clean metallic mid-tone
      baseGrad.addColorStop(0.65, '#94A3B8'); // Steel silver
      baseGrad.addColorStop(1, '#64748B');   // Subtle shadow depth

      ctx.fillStyle = baseGrad;
      ctx.fill(path);

      // 2. 45-degree Specular Glare (Блик)
      if (glareProgress !== null) {
        ctx.save();
        ctx.clip(path);

        // Center sweeps across diagonal from -40 to 200
        const center = -40 + glareProgress * 240;
        const width = 36;
        const cos45 = Math.SQRT1_2;
        const sin45 = Math.SQRT1_2;

        const x0 = (center - width) * cos45;
        const y0 = (center - width) * sin45;
        const x1 = (center + width) * cos45;
        const y1 = (center + width) * sin45;

        const glareGrad = ctx.createLinearGradient(x0, y0, x1, y1);
        glareGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        glareGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.35)');
        glareGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.98)'); // intense specular shine
        glareGrad.addColorStop(0.65, 'rgba(255, 255, 255, 0.35)');
        glareGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = glareGrad;
        ctx.fillRect(0, 0, VIEWBOX_SIZE, VIEWBOX_SIZE);
        ctx.restore();
      }

      ctx.restore();

      // Update link href in DOM
      const dataUrl = canvas.toDataURL('image/png');
      const links = getIconLinks();
      for (const link of links) {
        link.type = 'image/png';
        link.href = dataUrl;
      }
    };

    // Draw initial static silver icon
    drawFrame(null);

    // Glare sweep animation step
    const startSweep = () => {
      if (isDestroyed || document.hidden) return;

      const startTime = performance.now();

      const animateSweep = (currentTime: number) => {
        if (isDestroyed || document.hidden) return;

        const elapsed = currentTime - startTime;
        const progress = Math.min(1, elapsed / SWEEP_DURATION_MS);

        // Smooth ease-in-out for fluid sweep
        const eased =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        drawFrame(eased);

        if (progress < 1) {
          animId = requestAnimationFrame(animateSweep);
        } else {
          // Finish sweep, reset to static silver frame
          drawFrame(null);
          // Pause until next loop cycle
          const pauseTime = Math.max(1000, CYCLE_INTERVAL_MS - SWEEP_DURATION_MS);
          timerId = setTimeout(startSweep, pauseTime);
        }
      };

      animId = requestAnimationFrame(animateSweep);
    };

    // Initial delay before first glare sweep
    timerId = setTimeout(startSweep, 1000);

    // Save CPU when tab is hidden, resume when tab is active
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animId) cancelAnimationFrame(animId);
        if (timerId) clearTimeout(timerId);
      } else {
        drawFrame(null);
        timerId = setTimeout(startSweep, 800);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isDestroyed = true;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animId) cancelAnimationFrame(animId);
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  return null;
}
