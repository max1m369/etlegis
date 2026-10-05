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

  // Size specifications
  const sizeClasses = {
    sm: 'text-[11px] py-2 px-3.5',
    md: 'text-xs py-2.5 px-5',
    lg: 'text-sm py-3.5 px-6',
  };

  // Base background & border colors for resting state
  const baseClasses = {
    brand: 'bg-[#FA3600] border-[#FA3600] text-white',
    dark: 'bg-[#282828] border-[#282828] text-white',
    outline: 'bg-transparent border-[#B3B3AF] dark:border-white/20 text-[#282828] dark:text-white',
    white: 'bg-white border-white text-[#282828]',
  };

  // Hover sliding fill layer color
  const fillColors = {
    brand: 'bg-[#1C1D1F]',
    dark: 'bg-[#FA3600]',
    outline: 'bg-[#282828] dark:bg-white',
    white: 'bg-[#FA3600]',
  };

  // Hover text color
  const hoverTextColor = {
    brand: 'text-white',
    dark: 'text-white',
    outline: 'text-white dark:text-[#282828]',
    white: 'text-white',
  };

  const content = (
    <span
      className={`group relative inline-flex items-center justify-between overflow-hidden border font-mono uppercase tracking-wider select-none transition-colors duration-300 ${baseClasses[variant]} ${sizeClasses[size]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      {/* 1. Silky Smooth GPU-Accelerated Fluid Fill Layer */}
      <span
        className={`pointer-events-none absolute inset-0 z-0 ${fillColors[variant]} transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`}
        style={{
          transform: isHovered ? 'translate3d(0, 0, 0)' : 'translate3d(-101%, 0, 0)',
        }}
      >
        {/* Fine halftone micro-texture */}
        <span
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
            backgroundSize: '3px 3px',
          }}
        />
      </span>

      {/* 2. Slot-Machine Kinetic Label (Fluid Roll) */}
      <span className="relative z-10 flex flex-col overflow-hidden leading-tight">
        {/* Resting Label */}
        <span
          className={`inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isHovered ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          {children}
        </span>
        {/* Hover Label */}
        <span
          className={`absolute inset-0 flex items-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] font-medium ${
            hoverTextColor[variant]
          } ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
        >
          {children}
        </span>
      </span>

      {/* 3. Sliding Arrow Icon with Architectural Hairline Separator */}
      {icon && (
        <span className="relative z-10 ml-4 flex h-full items-center justify-center border-l border-current/30 pl-3 overflow-hidden">
          {/* Arrow Resting */}
          <span
            className={`inline-block transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHovered ? 'translate-x-[180%] opacity-0' : 'translate-x-0 opacity-100'
            }`}
          >
            →
          </span>
          {/* Arrow Entering */}
          <span
            className={`absolute transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              hoverTextColor[variant]
            } ${isHovered ? 'translate-x-0 opacity-100' : '-translate-x-[180%] opacity-0'}`}
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
