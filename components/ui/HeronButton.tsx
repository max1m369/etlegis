'use client';

import React, { useState } from 'react';
import Link from 'next/link';

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
  const [isHovered, setIsHovered] = useState(false);

  // Styling maps based on Heron AI design language
  const sizeClasses = {
    sm: 'text-[11px] py-2 px-3.5',
    md: 'text-xs py-3 px-5',
    lg: 'text-sm py-3.5 px-6',
  };

  const bgFillColor = {
    brand: 'bg-[#FA3600] text-white',
    dark: 'bg-[#282828] text-white',
    outline: 'bg-[#282828] text-white dark:bg-white dark:text-[#282828]',
    white: 'bg-white text-[#282828]',
  };

  const borderClass = {
    brand: 'border-[#B3B3AF] hover:border-[#FA3600] dark:border-white/20 dark:hover:border-[#FA3600]',
    dark: 'border-[#B3B3AF] hover:border-[#282828] dark:border-white/20 dark:hover:border-white',
    outline: 'border-[#B3B3AF] dark:border-white/20 hover:border-[#282828] dark:hover:border-white',
    white: 'border-white/40 hover:border-white',
  };

  const content = (
    <span
      className={`group relative inline-flex items-center justify-between overflow-hidden border ${borderClass[variant]} bg-transparent font-mono uppercase tracking-wider select-none transition-colors duration-300 ${sizeClasses[size]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        // Ensure subpixel precision and smooth hardware composite
        transform: 'translateZ(0)',
      }}
    >
      {/* 1. Halftone Dither Mask Sprite Wipe Layer */}
      <span
        className={`pointer-events-none absolute inset-0 z-0 transition-[mask-position,_webkit-mask-position] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${bgFillColor[variant]}`}
        style={{
          maskImage: "url('/assets/pixel-mask.svg')",
          WebkitMaskImage: "url('/assets/pixel-mask.svg')",
          maskSize: '2000% 100%',
          WebkitMaskSize: '2000% 100%',
          maskPosition: isHovered ? '100% 0' : '0% 0',
          WebkitMaskPosition: isHovered ? '100% 0' : '0% 0',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      />

      {/* 2. Slot-Machine Kinetic Label */}
      <span className="relative z-10 flex flex-col overflow-hidden">
        {/* Label Top (Exits upward) */}
        <span
          className={`inline-block transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isHovered ? '-translate-y-full' : 'translate-y-0'
          }`}
        >
          {children}
        </span>
        {/* Label Bottom (Enters from bottom) */}
        <span
          className={`absolute inset-0 flex items-center transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] text-white ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          {children}
        </span>
      </span>

      {/* 3. Sliding Arrow Icon (Heron style with vertical delimiter) */}
      {icon && (
        <span className="relative z-10 ml-4 flex h-full items-center justify-center border-l border-[#B3B3AF]/30 dark:border-white/20 pl-3 overflow-hidden">
          {/* Arrow Top (Slides right) */}
          <span
            className={`inline-block transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              isHovered ? 'translate-x-[150%]' : 'translate-x-0'
            }`}
          >
            →
          </span>
          {/* Arrow Bottom (Slides in from left) */}
          <span
            className={`absolute transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] text-white ${
              isHovered ? 'translate-x-0' : '-translate-x-[150%]'
            }`}
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
    <button onClick={onClick} type="button" className="inline-block text-left">
      {content}
    </button>
  );
}
