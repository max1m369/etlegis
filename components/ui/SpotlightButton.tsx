'use client';

import React, { useRef, useState } from 'react';

export interface SpotlightButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  spotlightColor?: string;
  variant?: 'outline' | 'filled' | 'dark';
  showArrow?: boolean;
}

export default function SpotlightButton({
  children,
  className = '',
  spotlightColor = 'rgba(80, 113, 146, 0.28)',
  variant = 'outline',
  showArrow = true,
  onClick,
  ...props
}: SpotlightButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const baseVariantClasses =
    variant === 'dark'
      ? 'border border-white/30 text-white bg-transparent hover:border-[#507192]'
      : variant === 'filled'
      ? 'border border-[#507192] bg-[#507192] text-white hover:border-[#3E5871]'
      : 'border border-[#141517]/35 text-[#141517] bg-white/70 backdrop-blur-sm hover:border-[#507192]';

  const fillBgClass =
    variant === 'filled'
      ? 'bg-[#3E5871]'
      : variant === 'dark'
      ? 'bg-[#507192]'
      : 'bg-[#507192]';

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`group/btn relative overflow-hidden transition-all duration-300 rounded-[2px] font-mono font-normal uppercase tracking-[0.18em] text-xs ${baseVariantClasses} ${className}`}
      {...props}
    >
      {/* 1. Эффект скользящего заполнения ярко-синим фоном (срабатывает ТОЛЬКО при наведении на саму кнопку) */}
      <div
        className={`pointer-events-none absolute inset-0 ${fillBgClass} transform -translate-x-[101%] group-hover/btn:translate-x-0 transition-transform duration-300 ease-out`}
        aria-hidden="true"
      />

      {/* 2. Прожектор / Spotlight Flashlight (следует за курсором мыши) */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(120px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* 3. Контурная подсветка фонариком */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] border border-[#507192] transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          maskImage: `radial-gradient(100px circle at ${position.x}px ${position.y}px, black 35%, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(100px circle at ${position.x}px ${position.y}px, black 35%, transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* 4. Легкий изящный контент кнопки с изменением цвета и выезжающей стрелочкой */}
      <span className="relative z-20 inline-flex items-center justify-center gap-2.5 w-full transition-colors duration-300 group-hover/btn:text-white font-normal">
        <span>{children}</span>
        {showArrow && (
          <span className="inline-block font-sans transition-all duration-300 transform -translate-x-2 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 text-white">
            →
          </span>
        )}
      </span>
    </button>
  );
}
