---
name: petrov
description: Master specification and engineering skill for ultra-technical, high-precision web interfaces based on the Bearplus / Heron AI design system (heronaiapp.com). Enforces mathematical modular grids, hairline architectural cell boundaries, dither-matrix shader button wipes, kinetic custom cursor reticles with coordinate telemetry, slot-machine typography rolls, boxed technical navigation, smooth Lenis momentum scrolling, and zero-jank 60/120fps GPU performance. Provides alternative pure-code modern implementations bypassing legacy dependencies.
---

# PETROV — Ultra-Technical Precision Design System & Engineering Architecture

> **Inspiration Reference:** `heronaiapp.com` (Crafted by Bearplus Design Agency)  
> **Philosophy:** High-Precision Digital Instrumentation, Swiss Modular Grid, and Kinetic Engineering.  
> **Anti-Slop Directive:** Rejects generic SaaS landing page tropes (blurry gradient blobs, oversized rounded cards, generic pill badges). Enforces razor-sharp hairline borders, technical telemetry, mathematical modular framing, and analog-digital tactile interactions.

---

## 1. Visual DNA & Design Tokens

### 1.1. Color Palette (Calibrated Contrast & Technical Accents)
The system rejects pure clinical `#FFFFFF` and harsh `#000000` in favor of warm technical vellum paper and graphite charcoal, accented by safety/kinetic vermilion:

```css
:root {
  /* Surface & Background */
  --cl-bg: #F5F5ED;              /* Warm Technical Paper / Alabaster Vellum */
  --cl-bg-subtle: #ECECE4;       /* Nested card / secondary surface */
  
  /* Typography & Ink */
  --content--primary: #282828;   /* Deep Industrial Graphite / Charcoal */
  --content--secondary: #414140; /* Muted Oxide / Technical Secondary */
  --content--muted: #7E7E7A;     /* Telemetry, coordinates, footnotes */
  --content--white: #FFFFFF;     /* Reverse contrast text */

  /* Kinetic Brand Accent */
  --content--brand: #FA3600;     /* Electric Kinetic Orange / Vermilion */
  --content--brand-glow: rgba(250, 54, 0, 0.15);

  /* Hairlines & Boundaries */
  --content--border: #D1D1CB;    /* Hairline boundary grid */
  --content--border-strong: #B3B3AF;
  --size--border: 1px;

  /* Textures & Dither Mask */
  --ph-mask-image: url('/assets/pixel-mask.svg');
}

/* Dark Mode Calibration (When applicable) */
.dark {
  --cl-bg: #0C0D0E;
  --cl-bg-subtle: #141618;
  --content--primary: #EEEEEE;
  --content--secondary: #A0A09C;
  --content--muted: #60605C;
  --content--border: #222528;
  --content--border-strong: #33373C;
  --content--brand: #FF451A;
}
```

### 1.2. Surface Texture (Subtle Noise & Cartesian Underlay)
Every viewport has an organic paper grain and subtle technical Cartesian grid underlay that eliminates flat digital emptiness:
- **Background Noise:** Ultra-light repeatable SVG noise grain (`opacity: 0.035 - 0.05`, `mix-blend-mode: multiply`).
- **Cartesian Grid:** Fine 32px or 64px dashed/dotted grid lines (`opacity: 0.04 - 0.08`).

---

## 2. The 8 Core Pillars of the Petrov Interface Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. OUTER TECHNICAL FRAME (Hairlines, Corner Crosshairs '+', Rulers)    │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ 2. BOXED NAV BAR (Individual cells, Corner ticks '┘', CTA cell)    │ │
│ ├────────────────────────────────────────────────────────────────────┤ │
│ │ 3. TELEMETRY HERO (Coordinates, Live ticker, Crosshair lines)      │ │
│ ├────────────────────────────────────────────────────────────────────┤ │
│ │ 4. DITHER SHADER BUTTONS (Pixel sprite wipe + slot-machine roll)   │ │
│ ├────────────────────────────────────────────────────────────────────┤ │
│ │ 5. MODULAR SPLIT CARDS (1px borders, zero radius, hover-reveal)    │ │
│ ├────────────────────────────────────────────────────────────────────┤ │
│ │ 6. KINETIC SLIDER / SWIPER (Stepping numbers '01/08', progress bar)│ │
│ ├────────────────────────────────────────────────────────────────────┤ │
│ │ 7. SPLIT-TEXT SCROLL REVEALS (Overflow hidden, translateY line-mask│ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ 8. CUSTOM RETICLE CURSOR (Center point + trailing ring + inspect line) │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Pillar 1: Outer Technical Modular Frame (`main-deco`)
- The entire page is bounded by an inner viewport frame with 1px hairlines on top, bottom, left, and right.
- **Intersection Crosshairs:** Exactly at each grid intersection, render a micro-crosshair `+` or optical corner bracket.
- **Millimeter Ruler Ticks:** Along horizontal and vertical section dividers, render alternating 2px and 4px hairline dashes (`line-dash` with `background-size: 1.6rem 1px`).

---

### Pillar 2: Boxed Cell Navigation (`Header`)
Instead of a floating pill or generic transparent bar, the header is a **continuous grid row composed of discrete technical cells**:
- Each menu item is enclosed in its own hairline box:
  `[ LOGO ] | [ PRODUCT ┘ ] | [ PRICING ┘ ] | [ RESOURCES ┘ ] | [ CONTACT US → ]`
- **Corner Tick:** A tiny right-angle glyph `┘` at the bottom-right of items with dropdowns/submenus.
- **Smart Scroll Behavior:** Glides upward on scroll-down (`transform: translateY(-101%)`), smoothly returns on scroll-up with zero layout shift.

---

### Pillar 3: The Signature Dither Shader Button (`.btn-fill`)
The crown jewel of the Heron aesthetic is the **halftone pixel-dither dissolve effect** paired with a slot-machine kinetic text roll:

#### Mechanics:
1. **The Mask Sprite Wipe:**
   - A 20-frame horizontal sprite sheet of increasing pixel-matrix dither density (`mask-size: 2000% 100%`).
   - In default state: `mask-position: 0% 0` (empty / transparent).
   - On hover: `mask-position` steps rapidly to `100% 0`, wiping across with a digital halftone dissolve.
2. **The Slot-Machine Text Roll:**
   - Inner label wrapped in two identical stacked lines: `.label-top` and `.label-bot`.
   - On hover: `.label-top` transitions `translateY(-100%)` while `.label-bot` rolls into place from `translateY(0%)`.
3. **The Horizontal Arrow Ejection:**
   - Inner icon contains `.icon-top` and `.icon-bot`.
   - On hover: `.icon-top` slides out `translateX(100%)` while `.icon-bot` slides in from `translateX(-100%)` to `translateX(0%)`.

#### Alternative Procedural Shader (Zero Dependency Implementation):
When the external SVG sprite is unavailable, replace with a high-performance GLSL / Canvas 4x4 Bayer Dither Matrix shader or CSS stepped gradient clip-path!

---

### Pillar 4: Custom Reticle Cursor & Crosshair Telemetry
- A refined, lightweight custom cursor engine:
  - **Core Dot:** Crisp 4px dot (`#FA3600` or `#282828`).
  - **Outer Reticle Ring:** Smooth lerp interpolation (`factor = 0.18`), expanding from 24px to 48px with `border: 1px solid currentColor` when hovering clickable elements (`a`, `button`, `.interactive`).
- **Inspection Telemetry (Hero Crosshair):**
  - Horizontal and vertical hairline laser lines intersect at the mouse position across the hero asset.
  - Coordinate readout box displays real-time live telemetry: `X: 0482.4 | Y: 0219.8` with monospace styling.

---

### Pillar 5: Technical Telemetry & Microcopy
Every section features structured metadata blocks that anchor the interface in precision engineering:
- **Index Counters:** Two-digit uppercase monospace numbers: `001 INITIALIZE`, `002 RESOLVE`, `003 ENFORCE`.
- **System Badges:** Fixed-width tables with dotted leader lines:
  ```
  STATUS       : OPERATIONAL / 24-7
  ENCRYPT      : AES-256 GCM
  JURISDICTION : ARBITRATION / RF
  LAT/LONG     : 55°45'N 37°37'E
  ```
- **Marquee Tickers:** Infinite seamless monospace tickers with icon separators:
  `◷ FASTER ITERATIONS   ◷ ZERO LATENCY   ◷ ASSET SECURITY   ◷ PRECISION LAW`

---

### Pillar 6: Kinetic Card Sliders & Swipers
Carousels must not feel like generic Bootstrap carousels:
- **Card Framing:** Zero border-radius (`rounded-none`), 1px hairlines separating adjacent cards.
- **Card Hover Physics:** Subtle grayscale-to-color transition, subtle 1.02x scale within masked overflow container, and illuminating bottom line.
- **Stepping Progress Counter:** Clean numerical progress bar (`01 / 08`) that smoothly fills a fractional hairline gauge (`scaleX(progress)`).

---

### Pillar 7: Split-Text Masked Scroll Reveals
- All major titles use **line-mask reveals**:
  ```html
  <div class="line-mask overflow-hidden">
    <span class="inline-block transform translate-y-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
      PRECISION DEFENSE
    </span>
  </div>
  ```
- When scrolled into view via IntersectionObserver or ScrollTrigger, the lines rise crisp and unblurred into place.

---

### Pillar 8: Zero-Jank 60/120fps Performance Contract
- **Never animate layout properties** (`width`, `height`, `top`, `left`, `margin`, `padding`).
- **Animate only composited properties**: `transform` (`translate3d`), `opacity`, and `clip-path`.
- **Pointer rAF Loop Discipline:** Mouse tracking rAF loops must automatically suspend when the cursor is idle for more than 500ms or when scrolled out of view.
- **Mobile First Touch Fallback:** On touch devices (`@media (hover: none)`), completely disable the custom cursor and mouse crosshairs to save CPU and battery.

---

## 3. Alternative & Superior Implementations

| Feature | Heron AI (Webflow Original) | Petrov (Modern Pure Next.js/React Implementation) |
|---|---|---|
| **CMS & Framework** | Webflow + jQuery + Barba.js | Next.js 15 App Router + React 19 + TypeScript |
| **Dither Button** | 2000% width SVG Sprite Sheet | Procedural Canvas Shader OR High-res SVG Sprite with fallback |
| **Smooth Scroll** | Heavy Lenis bundle on `.lenis` wrapper | Lightweight `@studio-freight/lenis` with hardware RAF sync |
| **Typography** | Webflow dynamic fonts | Self-hosted local variable fonts (Amstelvar / Geist / Space Mono) |
| **Bundle Size** | ~1.4 MB of JS dependencies | < 120 KB total runtime JS overhead |
| **Mobile UX** | Sometimes traps scroll in nested divs | Native touch scrolling with GPU momentum |

---

## 4. Production-Ready Component Recipes

### 4.1. The Petrov Dither Shader Button (`PetrovButton.tsx`)

```tsx
'use client';

import React from 'react';
import Link from 'next/link';

interface PetrovButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'brand' | 'outline' | 'dark';
  className?: string;
}

export function PetrovButton({
  children,
  href,
  onClick,
  variant = 'brand',
  className = '',
}: PetrovButtonProps) {
  const content = (
    <span className={`group relative inline-flex items-center justify-between overflow-hidden border border-[#B3B3AF] dark:border-white/20 bg-transparent font-mono text-xs tracking-wider uppercase select-none transition-colors duration-300 ${className}`}>
      {/* 1. Halftone Dither Wipe Background */}
      <span
        className={`pointer-events-none absolute inset-0 transition-[mask-position] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          variant === 'brand' ? 'bg-[#FA3600] text-white' : 'bg-[#282828] text-white'
        }`}
        style={{
          maskImage: "url('/assets/pixel-mask.svg')",
          WebkitMaskImage: "url('/assets/pixel-mask.svg')",
          maskSize: '2000% 100%',
          WebkitMaskSize: '2000% 100%',
          maskPosition: '0% 0',
          WebkitMaskPosition: '0% 0',
        }}
      />

      {/* 2. Slot-Machine Kinetic Label */}
      <span className="relative z-10 flex flex-col overflow-hidden px-5 py-3.5">
        <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span className="absolute inset-0 flex items-center px-5 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] translate-y-full group-hover:translate-y-0 text-white">
          {children}
        </span>
      </span>

      {/* 3. Sliding Arrow Icon */}
      <span className="relative z-10 flex h-full items-center justify-center border-l border-[#B3B3AF]/40 px-3.5 overflow-hidden">
        <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-full">
          →
        </span>
        <span className="absolute transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] -translate-x-full group-hover:translate-x-0 text-white">
          →
        </span>
      </span>
    </span>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return <button onClick={onClick} type="button">{content}</button>;
}
```

### 4.2. Technical Outer Grid Frame (`PetrovGridFrame.tsx`)

```tsx
'use client';

import React from 'react';

export function PetrovGridFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-[#F5F5ED] text-[#282828] selection:bg-[#FA3600] selection:text-white overflow-hidden">
      {/* 1. Outer Frame Hairlines */}
      <div className="pointer-events-none fixed inset-0 z-40 border border-[#D1D1CB] m-2 sm:m-4" />

      {/* 2. Corner Crosshairs */}
      <div className="pointer-events-none fixed top-2 left-2 z-50 text-xs font-mono text-[#7E7E7A] select-none leading-none sm:top-4 sm:left-4 -translate-x-1/2 -translate-y-1/2">+</div>
      <div className="pointer-events-none fixed top-2 right-2 z-50 text-xs font-mono text-[#7E7E7A] select-none leading-none sm:top-4 sm:right-4 translate-x-1/2 -translate-y-1/2">+</div>
      <div className="pointer-events-none fixed bottom-2 left-2 z-50 text-xs font-mono text-[#7E7E7A] select-none leading-none sm:bottom-4 sm:left-4 -translate-x-1/2 translate-y-1/2">+</div>
      <div className="pointer-events-none fixed bottom-2 right-2 z-50 text-xs font-mono text-[#7E7E7A] select-none leading-none sm:bottom-4 sm:right-4 translate-x-1/2 translate-y-1/2">+</div>

      {/* 3. Main Content Wrapper */}
      <div className="relative z-10 px-4 sm:px-8 py-6">
        {children}
      </div>
    </div>
  );
}
```

---

## 5. Verification Checklist (Strict Pre-Flight Rules)

Before completing any interface built with the `petrov` skill:
1. **Hairline Discipline:** All borders must be exactly `1px` (`#D1D1CB` or `#B3B3AF`). No thick 2px/3px borders except intentional hero lines.
2. **Typography Restraint:** Primary titles in authoritative Sans/Serif; all metadata, labels, buttons, and telemetry strictly in Monospace.
3. **Contrast Verification:** Black text on `#F5F5ED` paper, white text on `#FA3600` or `#282828` fills. No invisible low-contrast labels.
4. **Button Sprite & Rollover:** Verify that every primary button includes the slot-machine double-label roll and sliding arrow.
5. **Zero Layout Shift:** Modals, hover states, and dropdowns must never jitter or cause content reflow.
6. **Mobile Adaptability:** Disables mouse crosshairs on touch screens; adapts cell-based navigation into an organized fullscreen modal grid.
