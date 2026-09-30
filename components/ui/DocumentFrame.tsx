'use client';

import React from 'react';

interface DocumentFrameProps {
  children: React.ReactNode;
}

export default function DocumentFrame({ children }: DocumentFrameProps) {
  return (
    <article className="relative w-full py-10 px-8 sm:px-14 my-6 bg-white border border-[#E2E2DC] shadow-[0_10px_35px_rgba(0,0,0,0.05)] rounded-none">
      <div className="relative z-10">
        {children}
      </div>
    </article>
  );
}
