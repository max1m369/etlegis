'use client';

import { useEffect } from 'react';

// Exact ETLEGIS geometric monogram path (viewBox 0 0 120 120)
const SVG_PATH =
  'M113.4,31.3V11.9H35.8v19.4H12.5v81.5h81.5v-23.3h19.4v-19.4h-58.2v-11.7h58.2v-15.5h-58.2v-11.6h58.2ZM86.2,89.5v15.5H20.2V39h15.5v50.4h50.5v.1Z';

const CANVAS_SIZE = 64;
const VIEWBOX_SIZE = 120;
const SWEEP_DURATION_MS = 3000; // 3.0s (2x slower: majestic, liquid smooth specular glide)
const CYCLE_INTERVAL_MS = 10000; // 10.0s total cycle (3.0s sweep + 7.0s calm static rest)
const TARGET_FPS = 30; // 30 updates per second: browser decodes every frame smoothly without tab-strip throttling
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS; // ~33.3ms

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

    // Draw embossed silver monogram with mirrored 45° cinematic specular glare
    const drawFrame = (glareProgress: number | null) => {
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      ctx.save();
      ctx.scale(scale, scale);

      // 1. Subtle drop shadow for 3D relief depth
      ctx.save();
      ctx.shadowColor = 'rgba(15, 23, 42, 0.3)';
      ctx.shadowBlur = 2.5;
      ctx.shadowOffsetY = 1;
      ctx.fillStyle = '#CBD5E1';
      ctx.fill(path);
      ctx.restore();

      // 2. Base Silver Metallic Gradient with rich anisotropic metallic tones
      const baseGrad = ctx.createLinearGradient(0, 0, VIEWBOX_SIZE, VIEWBOX_SIZE);
      baseGrad.addColorStop(0, '#FFFFFF');    // Crisp specular top-left edge
      baseGrad.addColorStop(0.18, '#E2E8F0'); // Pure silver highlight
      baseGrad.addColorStop(0.48, '#94A3B8'); // Satin steel midtone
      baseGrad.addColorStop(0.72, '#CBD5E1'); // Metallic bounce
      baseGrad.addColorStop(1, '#475569');    // Bottom-right shadow depth

      ctx.fillStyle = baseGrad;
      ctx.fill(path);

      // 3. Subtle micro-bevel edge highlight (рельеф)
      ctx.save();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.stroke(path);
      ctx.restore();

      // 4. Mirrored 45-degree Specular Glare Pass (Top-Right to Bottom-Left)
      if (glareProgress !== null) {
        ctx.save();
        ctx.clip(path);

        const cos45 = Math.SQRT1_2;
        const sin45 = Math.SQRT1_2;

        // Smooth quintic smootherstep easing (zero jerk on start & stop)
        const t = Math.max(0, Math.min(1, glareProgress));
        const eased = t * t * t * (t * (6 * t - 15) + 10);

        // Distance range along mirrored diagonal from top-right to bottom-left
        const sweepDist = -100 + eased * 200;
        
        // Center sweeps from top-right (cx~130, cy~-10) to bottom-left (cx~-10, cy~130)
        const cx = 60 - sweepDist * cos45;
        const cy = 60 + sweepDist * sin45;
        const dirX = -cos45;
        const dirY = sin45;

        // Layer A: Wide ambient soft glow (мягкое бархатное освещение)
        const glowW = 46;
        const gA = ctx.createLinearGradient(
          cx - dirX * glowW, cy - dirY * glowW,
          cx + dirX * glowW, cy + dirY * glowW
        );
        gA.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gA.addColorStop(0.3, 'rgba(255, 255, 255, 0.12)');
        gA.addColorStop(0.5, 'rgba(255, 255, 255, 0.38)');
        gA.addColorStop(0.7, 'rgba(255, 255, 255, 0.12)');
        gA.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gA;
        ctx.fillRect(0, 0, VIEWBOX_SIZE, VIEWBOX_SIZE);

        // Layer B: Core focused specular gleam (чёткий кинематографический блик)
        const coreW = 18;
        const gB = ctx.createLinearGradient(
          cx - dirX * coreW, cy - dirY * coreW,
          cx + dirX * coreW, cy + dirY * coreW
        );
        gB.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gB.addColorStop(0.25, 'rgba(255, 255, 255, 0.35)');
        gB.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
        gB.addColorStop(0.75, 'rgba(255, 255, 255, 0.35)');
        gB.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gB;
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

    // Draw initial static silver frame
    drawFrame(null);

    // Glare sweep animation loop with 30fps throttling
    const startSweep = () => {
      if (isDestroyed || document.hidden) return;

      const startTime = performance.now();
      let lastRenderTime = 0;

      const animateSweep = (currentTime: number) => {
        if (isDestroyed || document.hidden) return;

        const elapsed = currentTime - startTime;
        const progress = Math.min(1, elapsed / SWEEP_DURATION_MS);

        // Throttle DOM/favicon link updates to ~30fps for buttery smooth playback without browser tab thread choking
        if (currentTime - lastRenderTime >= FRAME_INTERVAL_MS || progress >= 1) {
          lastRenderTime = currentTime;
          drawFrame(progress);
        }

        if (progress < 1) {
          animId = requestAnimationFrame(animateSweep);
        } else {
          // Finish sweep, reset to static silver frame
          drawFrame(null);
          // Pause until next loop cycle
          const pauseTime = Math.max(1200, CYCLE_INTERVAL_MS - SWEEP_DURATION_MS);
          timerId = setTimeout(startSweep, pauseTime);
        }
      };

      animId = requestAnimationFrame(animateSweep);
    };

    // Initial delay before first glare sweep
    timerId = setTimeout(startSweep, 800);

    // Save CPU when tab is hidden, resume when tab is active
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animId) cancelAnimationFrame(animId);
        if (timerId) clearTimeout(timerId);
      } else {
        drawFrame(null);
        timerId = setTimeout(startSweep, 600);
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
