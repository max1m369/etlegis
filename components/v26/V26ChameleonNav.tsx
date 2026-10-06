'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/**
 * V26ChameleonNav - Floating chameleon navigation for ETLEGIS Version 2.6.
 * - Positioned on the right, horizontally aligned with the Chameleon Logo.
 * - Font: Jost (font-body), plain words ("Главная", "Услуги", "О компании", "Кейсы", "Блог", "Контакты").
 * - Chameleon behavior: switches color to match the logo (Dark #1C2633 on light sections, White #FFFFFF on dark sections).
 * - Headroom behavior: pinned in view, hides smoothly on scroll down, reappears smoothly on scroll up.
 */
export default function V26ChameleonNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 60);

      // 1. Headroom logic: hide on scroll down, show on scroll up
      if (currentScrollY <= 40) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 8) {
        // Scrolling down -> hide
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 8) {
        // Scrolling up -> show
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;

      // 2. Chameleon color detection:
      const navY = navRef.current ? navRef.current.getBoundingClientRect().top : 48;
      const darkSections = document.querySelectorAll<HTMLElement>('[data-bg="dark"]');
      let overDark = false;

      for (const sec of darkSections) {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= navY + 30 && rect.bottom >= navY) {
          overDark = true;
          break;
        }
      }
      setIsDarkSection(overDark);

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const navLinks = [
    { label: 'Главная', href: '#sec-hero' },
    { label: 'Цифры', href: '#sec-numbers' },
    { label: 'Практики', href: '#sec-services' },
    { label: 'О компании', href: '#sec-about' },
    { label: 'Кейсы', href: '#sec-cases' },
    { label: 'Блог', href: '#sec-blog' },
    { label: 'Контакты', href: '#sec-footer' },
  ];

  return (
    <nav
      ref={navRef}
      aria-label="Основная навигация"
      className={`fixed top-8 lg:top-12 right-6 lg:right-12 xl:right-16 z-50 h-12 lg:h-16 flex items-center font-body select-none transition-all duration-300 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0 pointer-events-none'
      } ${
        isScrolled
          ? isDarkSection
            ? 'bg-[#192430]/90 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/15 shadow-xl text-white'
            : 'bg-[#EAE6DF]/90 backdrop-blur-md px-6 py-2.5 rounded-full border border-[#19212C]/12 shadow-xl text-[#1C2633]'
          : isDarkSection
          ? 'text-white'
          : 'text-[#1C2633]'
      }`}
    >
      <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-xs sm:text-sm lg:text-base font-medium tracking-normal transition-colors duration-200 hover:text-[#C5A059]"
          >
            {link.label}
          </Link>
        ))}

        {/* Direct Phone in Jost */}
        <a
          href="tel:+74952150815"
          className="hidden xl:inline-block text-xs lg:text-sm font-semibold tracking-wider transition-colors duration-200 hover:text-[#C5A059] border-l pl-4 sm:pl-6 border-current/20"
        >
          +7 (495) 215-08-15
        </a>
      </div>
    </nav>
  );
}
