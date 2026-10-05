export interface FaviconSettings {
  preset: 'silver' | 'gold' | 'brass' | 'graphite' | 'custom';
  customColor: string;
  glareAngle: number;
  sweepDuration: number;
  cycleDuration: number;
  glareWidth: number;
  glareColor: string;
  reliefEnabled: boolean;
}

export const DEFAULT_FAVICON_SETTINGS: FaviconSettings = {
  preset: 'silver',
  customColor: '#CBD5E1',
  glareAngle: 135,
  sweepDuration: 3.0,
  cycleDuration: 10.0,
  glareWidth: 46,
  glareColor: '#FFFFFF',
  reliefEnabled: true,
};

export interface ColorPresetDef {
  id: 'silver' | 'gold' | 'brass' | 'graphite';
  name: string;
  description: string;
  accent: string;
  baseStops: [string, string, string, string, string];
  defaultGlare: string;
}

export type PresetId = 'silver' | 'gold' | 'brass' | 'graphite';

export const COLOR_PRESETS: Record<PresetId, ColorPresetDef> = {
  silver: {
    id: 'silver',
    name: 'Серебряный',
    description: 'Холодная благородная платина и полированное серебро',
    accent: '#CBD5E1',
    baseStops: ['#FFFFFF', '#E2E8F0', '#94A3B8', '#CBD5E1', '#475569'],
    defaultGlare: '#FFFFFF',
  },
  gold: {
    id: 'gold',
    name: 'Золотой',
    description: 'Имперское червонное золото высшей пробы',
    accent: '#F59E0B',
    baseStops: ['#FEF3C7', '#FBBF24', '#D97706', '#FCD34D', '#92400E'],
    defaultGlare: '#FFFBEB',
  },
  brass: {
    id: 'brass',
    name: 'Латунь',
    description: 'Архитектурная бронза и античная благородная латунь (фирменный стиль бюро)',
    accent: '#C5A880',
    baseStops: ['#F5EFE6', '#D6C0A0', '#9B815C', '#C4A880', '#634F36'],
    defaultGlare: '#FFFDF5',
  },
  graphite: {
    id: 'graphite',
    name: 'Графит',
    description: 'Матовый титан, оружейная сталь и глубокий графит',
    accent: '#64748B',
    baseStops: ['#94A3B8', '#64748B', '#334155', '#475569', '#0F172A'],
    defaultGlare: '#F8FAFC',
  },
};

// Helper: Convert hex to RGB
export function hexToRgb(hex: string): [number, number, number] {
  let c = (hex || '#CBD5E1').replace('#', '').trim();
  if (c.length === 3) {
    c = c.split('').map((x) => x + x).join('');
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) return [203, 213, 225];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

// Helper: Lighten or darken color
export function adjustColor(rgb: [number, number, number], percent: number): string {
  const [r, g, b] = rgb;
  const factor = 1 + percent / 100;
  const clamp = (v: number) => Math.min(255, Math.max(0, Math.round(v)));
  const nr = clamp(r * factor);
  const ng = clamp(g * factor);
  const nb = clamp(b * factor);
  return `rgb(${nr}, ${ng}, ${nb})`;
}

// Generate metallic 5-stop gradient for any preset or custom color
export function getBaseMetallicStops(settings: FaviconSettings): [string, string, string, string, string] {
  if (settings.preset !== 'custom' && COLOR_PRESETS[settings.preset]) {
    return COLOR_PRESETS[settings.preset].baseStops;
  }
  const rgb = hexToRgb(settings.customColor || '#CBD5E1');
  return [
    adjustColor(rgb, 50),  // Specular rim
    adjustColor(rgb, 25),  // High metallic
    adjustColor(rgb, -15), // Midtone
    adjustColor(rgb, 10),  // Reflection
    adjustColor(rgb, -45), // Shadow depth
  ];
}

// Helper: Parse hex to rgba string
export function hexToRgba(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const SVG_MONOGRAM_PATH =
  'M113.4,31.3V11.9H35.8v19.4H12.5v81.5h81.5v-23.3h19.4v-19.4h-58.2v-11.7h58.2v-15.5h-58.2v-11.6h58.2ZM86.2,89.5v15.5H20.2V39h15.5v50.4h50.5v.1Z';

export const VIEWBOX_SIZE = 120;

// Universal Canvas Renderer for both AnimatedFavicon and Admin live preview
export function renderFaviconToCanvas(
  ctx: CanvasRenderingContext2D,
  canvasSize: number,
  settings: FaviconSettings,
  glareProgress: number | null,
  cachedPath?: Path2D | null
) {
  let path = cachedPath;
  if (!path) {
    try {
      path = new Path2D(SVG_MONOGRAM_PATH);
    } catch {
      return;
    }
  }

  const scale = canvasSize / VIEWBOX_SIZE;

  ctx.clearRect(0, 0, canvasSize, canvasSize);
  ctx.save();
  ctx.scale(scale, scale);

  // 1. Subtle drop shadow for 3D relief depth (if enabled)
  if (settings.reliefEnabled) {
    ctx.save();
    ctx.shadowColor = 'rgba(15, 23, 42, 0.35)';
    ctx.shadowBlur = 2.5;
    ctx.shadowOffsetY = 1.2;
    ctx.fillStyle = settings.preset === 'custom' ? settings.customColor : COLOR_PRESETS[settings.preset]?.accent || '#CBD5E1';
    ctx.fill(path);
    ctx.restore();
  }

  // 2. Base Metallic Gradient
  const stops = getBaseMetallicStops(settings);
  const baseGrad = ctx.createLinearGradient(0, 0, VIEWBOX_SIZE, VIEWBOX_SIZE);
  baseGrad.addColorStop(0, stops[0]);
  baseGrad.addColorStop(0.18, stops[1]);
  baseGrad.addColorStop(0.48, stops[2]);
  baseGrad.addColorStop(0.72, stops[3]);
  baseGrad.addColorStop(1, stops[4]);

  ctx.fillStyle = baseGrad;
  ctx.fill(path);

  // 3. Subtle micro-bevel edge highlight (рельеф)
  if (settings.reliefEnabled) {
    ctx.save();
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = hexToRgba(stops[0], 0.45);
    ctx.stroke(path);
    ctx.restore();
  }

  // 4. Dynamic Glare Pass at arbitrary angle
  if (glareProgress !== null) {
    ctx.save();
    ctx.clip(path);

    // Convert glareAngle to radians
    // 0° = left-to-right, 90° = top-to-bottom, 135° = top-right to bottom-left (mirrored diagonal), 45° = top-left to bottom-right
    const rad = (settings.glareAngle * Math.PI) / 180;
    const dirX = Math.cos(rad);
    const dirY = Math.sin(rad);

    // Smooth quintic smootherstep easing (zero jerk on start & stop)
    const t = Math.max(0, Math.min(1, glareProgress));
    const eased = t * t * t * (t * (6 * t - 15) + 10);

    // Distance range along motion direction
    const sweepDist = -105 + eased * 210;

    // Center sweeps from entry to exit
    const cx = 60 + sweepDist * dirX;
    const cy = 60 + sweepDist * dirY;

    const glareColorHex = settings.glareColor || '#FFFFFF';

    // Layer A: Wide ambient soft glow
    const glowW = Math.max(16, settings.glareWidth || 46);
    const gA = ctx.createLinearGradient(
      cx - dirX * glowW, cy - dirY * glowW,
      cx + dirX * glowW, cy + dirY * glowW
    );
    gA.addColorStop(0, hexToRgba(glareColorHex, 0));
    gA.addColorStop(0.3, hexToRgba(glareColorHex, 0.12));
    gA.addColorStop(0.5, hexToRgba(glareColorHex, 0.40));
    gA.addColorStop(0.7, hexToRgba(glareColorHex, 0.12));
    gA.addColorStop(1, hexToRgba(glareColorHex, 0));

    ctx.fillStyle = gA;
    ctx.fillRect(0, 0, VIEWBOX_SIZE, VIEWBOX_SIZE);

    // Layer B: Core focused specular gleam
    const coreW = Math.max(8, glowW * 0.4);
    const gB = ctx.createLinearGradient(
      cx - dirX * coreW, cy - dirY * coreW,
      cx + dirX * coreW, cy + dirY * coreW
    );
    gB.addColorStop(0, hexToRgba(glareColorHex, 0));
    gB.addColorStop(0.25, hexToRgba(glareColorHex, 0.35));
    gB.addColorStop(0.5, hexToRgba(glareColorHex, 0.95));
    gB.addColorStop(0.75, hexToRgba(glareColorHex, 0.35));
    gB.addColorStop(1, hexToRgba(glareColorHex, 0));

    ctx.fillStyle = gB;
    ctx.fillRect(0, 0, VIEWBOX_SIZE, VIEWBOX_SIZE);

    ctx.restore();
  }

  ctx.restore();
}
