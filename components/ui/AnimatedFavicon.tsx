'use client';

import { useEffect, useRef } from 'react';
import {
  DEFAULT_FAVICON_SETTINGS,
  FaviconSettings,
  renderFaviconToCanvas,
  SVG_MONOGRAM_PATH,
} from '@/lib/favicon-theme';

const CANVAS_SIZE = 64;
const TARGET_FPS = 30; // 30 updates per second: browser decodes every frame smoothly without tab-strip throttling
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS; // ~33.3ms

export default function AnimatedFavicon() {
  const settingsRef = useRef<FaviconSettings>(DEFAULT_FAVICON_SETTINGS);

  useEffect(() => {
    // Only execute on client side
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // Load initial settings from localStorage if available
    try {
      const stored = localStorage.getItem('etlegis_favicon_settings');
      if (stored) {
        settingsRef.current = { ...DEFAULT_FAVICON_SETTINGS, ...JSON.parse(stored) };
      }
    } catch {
      // ignore JSON parse error
    }

    // Also fetch latest settings from server
    fetch('/api/favicon-settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data === 'object') {
          settingsRef.current = { ...DEFAULT_FAVICON_SETTINGS, ...data };
        }
      })
      .catch(() => {
        // use local/default
      });

    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    let path: Path2D | null = null;
    try {
      path = new Path2D(SVG_MONOGRAM_PATH);
    } catch {
      return;
    }

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

    // Render frame to canvas and update DOM link tags
    const drawAndApply = (glareProgress: number | null) => {
      if (!ctx) return;
      renderFaviconToCanvas(ctx, CANVAS_SIZE, settingsRef.current, glareProgress, path);

      const dataUrl = canvas.toDataURL('image/png');
      const links = getIconLinks();
      for (const link of links) {
        link.type = 'image/png';
        link.href = dataUrl;
      }
    };

    // Draw initial static frame immediately
    drawAndApply(null);

    // Glare sweep animation loop with 30fps throttling
    const startSweep = () => {
      if (isDestroyed || document.hidden) return;

      const currentSettings = settingsRef.current;
      const sweepDurationMs = Math.max(500, Math.min(15000, (currentSettings.sweepDuration || 3.0) * 1000));
      const cycleDurationMs = Math.max(sweepDurationMs, Math.min(15000, (currentSettings.cycleDuration || 10.0) * 1000));

      const startTime = performance.now();
      let lastRenderTime = 0;

      const animateSweep = (currentTime: number) => {
        if (isDestroyed || document.hidden) return;

        const elapsed = currentTime - startTime;
        const progress = Math.min(1, elapsed / sweepDurationMs);

        // Throttle DOM/favicon link updates to ~30fps for buttery smooth playback without browser tab thread choking
        if (currentTime - lastRenderTime >= FRAME_INTERVAL_MS || progress >= 1) {
          lastRenderTime = currentTime;
          drawAndApply(progress);
        }

        if (progress < 1) {
          animId = requestAnimationFrame(animateSweep);
        } else {
          // Finish sweep, reset to static frame
          drawAndApply(null);
          // Pause until next loop cycle
          const pauseTime = Math.max(800, cycleDurationMs - sweepDurationMs);
          timerId = setTimeout(startSweep, pauseTime);
        }
      };

      animId = requestAnimationFrame(animateSweep);
    };

    // Initial delay before first glare sweep
    timerId = setTimeout(startSweep, 800);

    // Listen for dynamic settings updates from Admin Panel
    const handleSettingsUpdate = (e: CustomEvent<FaviconSettings>) => {
      if (e.detail) {
        settingsRef.current = { ...DEFAULT_FAVICON_SETTINGS, ...e.detail };
        drawAndApply(null);
      }
    };

    const handleStorageUpdate = (e: StorageEvent) => {
      if (e.key === 'etlegis_favicon_settings' && e.newValue) {
        try {
          settingsRef.current = { ...DEFAULT_FAVICON_SETTINGS, ...JSON.parse(e.newValue) };
          drawAndApply(null);
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('faviconSettingsChanged' as any, handleSettingsUpdate);
    window.addEventListener('storage', handleStorageUpdate);

    // Save CPU when tab is hidden, resume when tab is active
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animId) cancelAnimationFrame(animId);
        if (timerId) clearTimeout(timerId);
      } else {
        drawAndApply(null);
        timerId = setTimeout(startSweep, 600);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isDestroyed = true;
      window.removeEventListener('faviconSettingsChanged' as any, handleSettingsUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animId) cancelAnimationFrame(animId);
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  return null;
}
