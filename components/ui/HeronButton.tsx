'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

interface HeronButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'brand' | 'outline' | 'dark' | 'white';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
}

export default function HeronButton({
  children,
  href,
  onClick,
  variant = 'brand',
  className = '',
  size = 'md',
  icon = true,
}: HeronButtonProps) {
  const bgRef = useRef<HTMLSpanElement>(null);
  const topTextRef = useRef<HTMLSpanElement>(null);
  const botTextRef = useRef<HTMLSpanElement>(null);
  const topArrowRef = useRef<HTMLSpanElement>(null);
  const botArrowRef = useRef<HTMLSpanElement>(null);

  // Initialize GSAP resting positions on mount
  useEffect(() => {
    if (botTextRef.current) {
      gsap.set(botTextRef.current, { yPercent: 100 });
    }
    if (botArrowRef.current) {
      gsap.set(botArrowRef.current, { xPercent: -180 });
    }
  }, []);

  // Size specifications
  const sizeClasses = {
    sm: 'text-[11px] py-2 px-4',
    md: 'text-xs py-2.5 px-5',
    lg: 'text-sm py-3 px-6',
  };

  // Base borders & resting text colors (Heron AI architectural design)
  const borderClasses = {
    brand: 'border-[#FA3600] text-[#FA3600]',
    outline: 'border-[#B3B3AF] dark:border-white/20 text-[#282828] dark:text-white',
    dark: 'border-[#282828] dark:border-white/30 text-[#282828] dark:text-white',
    white: 'border-white text-white',
  };

  // Mask fill color that sweeps across via pixel-mask.svg
  const maskFillColor = {
    brand: 'bg-[#FA3600]',
    outline: 'bg-[#282828] dark:bg-white',
    dark: 'bg-[#FA3600]',
    white: 'bg-white',
  };

  // Hovered bottom text color
  const hoverTextColor = {
    brand: 'text-white',
    outline: 'text-white dark:text-[#282828]',
    dark: 'text-white',
    white: 'text-[#282828]',
  };

  // GSAP 19-Step Discrete Frame Animation (Exact compiled engine from Heron AI)
  const handleMouseEnter = () => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        maskPosition: '100% 0',
        webkitMaskPosition: '100% 0',
        duration: 0.38,
        ease: 'steps(19)',
        overwrite: 'auto',
      });
    }

    if (topTextRef.current && botTextRef.current) {
      gsap.to(topTextRef.current, {
        yPercent: -100,
        duration: 0.38,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      gsap.to(botTextRef.current, {
        yPercent: 0,
        duration: 0.38,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    if (topArrowRef.current && botArrowRef.current) {
      gsap.to(topArrowRef.current, {
        xPercent: 180,
        duration: 0.38,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      gsap.to(botArrowRef.current, {
        xPercent: 0,
        duration: 0.38,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleMouseLeave = () => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        maskPosition: '0% 0',
        webkitMaskPosition: '0% 0',
        duration: 0.35,
        ease: 'steps(19)',
        overwrite: 'auto',
      });
    }

    if (topTextRef.current && botTextRef.current) {
      gsap.to(topTextRef.current, {
        yPercent: 0,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      gsap.to(botTextRef.current, {
        yPercent: 100,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    if (topArrowRef.current && botArrowRef.current) {
      gsap.to(topArrowRef.current, {
        xPercent: 0,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      gsap.to(botArrowRef.current, {
        xPercent: -180,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const content = (
    <span
      className={`group relative inline-flex items-center justify-between overflow-hidden border bg-transparent font-mono uppercase tracking-wider select-none ${borderClasses[variant]} ${sizeClasses[size]} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      {/* 1. Heron AI Pixel Dither Mask Wipe Layer (stepped via GSAP 19-step) */}
      <span
        ref={bgRef}
        className={`pointer-events-none absolute inset-0 z-0 ${maskFillColor[variant]}`}
        style={{
          maskImage: "url('/assets/pixel-mask.svg')",
          WebkitMaskImage: "url('/assets/pixel-mask.svg')",
          maskSize: '2000% 100%',
          WebkitMaskSize: '2000% 100%',
          maskPosition: '0% 0',
          WebkitMaskPosition: '0% 0',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          willChange: 'mask-position, -webkit-mask-position',
        }}
      />

      {/* 2. Slot-Machine Kinetic Label (Fluid Vertical Roll) */}
      <span className="relative z-10 flex flex-col overflow-hidden h-[1.3em] leading-[1.3em]">
        {/* Top Text (Exits upward) */}
        <span
          ref={topTextRef}
          className="inline-block"
          style={{ willChange: 'transform' }}
        >
          {children}
        </span>
        {/* Bottom Text (Enters from bottom) */}
        <span
          ref={botTextRef}
          className={`absolute inset-0 flex items-center font-medium ${hoverTextColor[variant]}`}
          style={{ willChange: 'transform' }}
        >
          {children}
        </span>
      </span>

      {/* 3. Sliding Arrow Icon with Architectural Hairline Separator */}
      {icon && (
        <span className="relative z-10 ml-4 flex h-full items-center justify-center border-l border-current/30 pl-3 overflow-hidden">
          {/* Top Arrow (Slides right) */}
          <span
            ref={topArrowRef}
            className="inline-block"
            style={{ willChange: 'transform' }}
          >
            →
          </span>
          {/* Bottom Arrow (Slides in from left) */}
          <span
            ref={botArrowRef}
            className={`absolute ${hoverTextColor[variant]}`}
            style={{ willChange: 'transform' }}
          >
            →
          </span>
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block text-left cursor-pointer">
      {content}
    </button>
  );
}
