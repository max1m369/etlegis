'use client';

import React from 'react';

export default function DocumentFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full py-8 px-0 sm:px-2 my-4">
      {/* 🌟 Top-Left Corner Bracket (Сверху-Слева) — Единая монолитная SVG-фигура с органическим бликом */}
      <svg
        className="absolute top-0 left-0 pointer-events-none z-20 overflow-visible"
        style={{
          width: 'var(--bracket-size, 44px)',
          height: 'var(--bracket-size, 44px)',
        }}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="luxury-shimmer-grad-tl" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--bracket-base-color, #2C3E50)">
              <animate
                attributeName="stop-color"
                values="var(--bracket-base-color, #2C3E50);var(--bracket-base-color, #2C3E50);var(--bracket-highlight-color, #CBD5E1);var(--bracket-base-color, #2C3E50);var(--bracket-base-color, #2C3E50)"
                keyTimes="0; 0.25; 0.5; 0.75; 1"
                dur="var(--bracket-shimmer-duration, 10s)"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="var(--bracket-highlight-color, #CBD5E1)">
              <animate
                attributeName="stop-color"
                values="var(--bracket-highlight-color, #CBD5E1);var(--bracket-base-color, #2C3E50);var(--bracket-highlight-color, #CBD5E1);var(--bracket-highlight-color, #CBD5E1);var(--bracket-highlight-color, #CBD5E1)"
                keyTimes="0; 0.3; 0.6; 0.85; 1"
                dur="var(--bracket-shimmer-duration, 10s)"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="var(--bracket-base-color, #2C3E50)">
              <animate
                attributeName="stop-color"
                values="var(--bracket-base-color, #2C3E50);var(--bracket-highlight-color, #CBD5E1);var(--bracket-base-color, #2C3E50);var(--bracket-base-color, #2C3E50);var(--bracket-base-color, #2C3E50)"
                keyTimes="0; 0.4; 0.7; 0.9; 1"
                dur="var(--bracket-shimmer-duration, 10s)"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
        <path
          d="M 0 44 V 0 H 44"
          stroke="url(#luxury-shimmer-grad-tl)"
          strokeWidth="var(--bracket-thickness, 1.5)"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>

      {/* 🌟 Bottom-Right Corner Bracket (Снизу-Справа) — Единая монолитная SVG-фигура */}
      <svg
        className="absolute bottom-0 right-0 pointer-events-none z-20 overflow-visible"
        style={{
          width: 'var(--bracket-size, 44px)',
          height: 'var(--bracket-size, 44px)',
        }}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="luxury-shimmer-grad-br" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--bracket-base-color, #2C3E50)">
              <animate
                attributeName="stop-color"
                values="var(--bracket-base-color, #2C3E50);var(--bracket-highlight-color, #CBD5E1);var(--bracket-base-color, #2C3E50);var(--bracket-base-color, #2C3E50);var(--bracket-base-color, #2C3E50)"
                keyTimes="0; 0.35; 0.6; 0.85; 1"
                dur="var(--bracket-shimmer-duration, 10s)"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="var(--bracket-highlight-color, #CBD5E1)">
              <animate
                attributeName="stop-color"
                values="var(--bracket-highlight-color, #CBD5E1);var(--bracket-base-color, #2C3E50);var(--bracket-highlight-color, #CBD5E1);var(--bracket-base-color, #2C3E50);var(--bracket-highlight-color, #CBD5E1)"
                keyTimes="0; 0.25; 0.55; 0.8; 1"
                dur="var(--bracket-shimmer-duration, 10s)"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="var(--bracket-base-color, #2C3E50)">
              <animate
                attributeName="stop-color"
                values="var(--bracket-base-color, #2C3E50);var(--bracket-base-color, #2C3E50);var(--bracket-highlight-color, #CBD5E1);var(--bracket-base-color, #2C3E50);var(--bracket-base-color, #2C3E50)"
                keyTimes="0; 0.45; 0.7; 0.9; 1"
                dur="var(--bracket-shimmer-duration, 10s)"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
        <path
          d="M 44 0 V 44 H 0"
          stroke="url(#luxury-shimmer-grad-br)"
          strokeWidth="var(--bracket-thickness, 1.5)"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>

      {/* Контент кейса без белой подложки */}
      <div className="relative z-10 px-3 sm:px-6">
        {children}
      </div>
    </div>
  );
}
