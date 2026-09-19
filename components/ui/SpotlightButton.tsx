'use client';

import React, { useRef, useState } from 'react';

export interface SpotlightButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  spotlightColor?: string;
}

export default function SpotlightButton({
  children,
  className = '',
  spotlightColor = 'rgba(80, 113, 146, 0.32)',
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

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`group relative overflow-hidden transition-all duration-300 ${className}`}
      {...props}
    >
      {/* 🔦 Прожектор / Spotlight Flashlight (следует за курсором мыши внутри кнопки) */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(110px circle at ${position.x}px ${position.y}px, ${spotlightColor}, rgba(62, 88, 113, 0.16) 45%, transparent 75%)`,
        }}
        aria-hidden="true"
      />

      {/* 🌟 Подсветка контура/бордера фонариком в месте курсора */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] border border-[#507192] transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          maskImage: `radial-gradient(100px circle at ${position.x}px ${position.y}px, black 35%, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(100px circle at ${position.x}px ${position.y}px, black 35%, transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* Контент кнопки */}
      <span className="relative z-10 inline-flex items-center gap-[inherit]">
        {children}
      </span>
    </button>
  );
}
