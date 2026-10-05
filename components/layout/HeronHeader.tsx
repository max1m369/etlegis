'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useConsultationModal } from '@/components/providers/ModalProvider';
import HeronButton from '@/components/ui/HeronButton';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function HeronHeader() {
  const { theme, toggleTheme } = useTheme();
  const { openModal } = useConsultationModal();
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current && !mobileMenuOpen) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'ПРАКТИКИ', href: '/practices', hasSubmenu: true },
    { label: 'КОМАНДА', href: '/team', hasSubmenu: true },
    { label: 'КЕЙСЫ', href: '/cases', hasSubmenu: true },
    { label: 'БЛОГ', href: '/blog', hasSubmenu: true },
    { label: 'КОНТАКТЫ', href: '#contacts', hasSubmenu: false },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Main Boxed Nav Grid Bar */}
        <div className="mx-2 sm:mx-4 mt-2 sm:mt-4 border border-[#D1D1CB] dark:border-[#222528] bg-[#F5F5ED]/95 dark:bg-[#0C0D0E]/95 backdrop-blur-md">
          <div className="flex items-stretch justify-between h-14 sm:h-16">
            
            {/* 1. Logo Cell */}
            <Link
              href="/"
              className="flex items-center gap-3 px-4 sm:px-6 border-r border-[#D1D1CB] dark:border-[#222528] group select-none"
            >
              <div className="w-5 h-5 border border-[#282828] dark:border-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                <div className="w-2 h-2 bg-[#FA3600]" />
              </div>
              <span className="font-mono text-sm tracking-widest font-semibold text-[#282828] dark:text-white">
                ETLEGIS
              </span>
            </Link>

            {/* 2. Desktop Navigation Cells */}
            <nav className="hidden lg:flex items-stretch flex-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative flex items-center justify-between px-6 border-r border-[#D1D1CB] dark:border-[#222528] font-mono text-xs uppercase tracking-wider transition-colors duration-200 group ${
                      isActive
                        ? 'bg-[#282828] text-white dark:bg-white dark:text-[#282828]'
                        : 'text-[#414140] dark:text-[#A0A09C] hover:text-[#FA3600] dark:hover:text-[#FA3600]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasSubmenu && (
                      <span className="ml-3 text-[10px] text-[#7E7E7A] group-hover:text-[#FA3600] transition-colors">
                        ┘
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* 3. Action Cells (Theme Toggle + CTA) */}
            <div className="flex items-stretch">
              {/* Theme Toggle Cell */}
              <button
                onClick={toggleTheme}
                type="button"
                aria-label="Переключить тему"
                className="flex items-center justify-center px-4 border-l lg:border-l-0 lg:border-r border-[#D1D1CB] dark:border-[#222528] text-[#414140] dark:text-[#A0A09C] hover:text-[#FA3600] transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Desktop CTA Cell with Heron Dither Wipe */}
              <div className="hidden sm:flex items-center px-3">
                <HeronButton
                  variant="brand"
                  size="sm"
                  onClick={openModal}
                  className="h-10"
                >
                  ОБСУДИТЬ СИТУАЦИЮ
                </HeronButton>
              </div>

              {/* Mobile Hamburger Toggle Cell */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                aria-label="Меню"
                className="flex lg:hidden items-center justify-center px-4 border-l border-[#D1D1CB] dark:border-[#222528] text-[#282828] dark:text-white"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Modal Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F5F5ED] dark:bg-[#0C0D0E] pt-24 px-6 flex flex-col justify-between pb-8 lg:hidden animate-in fade-in duration-200">
          <div className="flex flex-col border border-[#D1D1CB] dark:border-[#222528] divide-y divide-[#D1D1CB] dark:divide-[#222528]">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-4 font-mono text-sm tracking-widest text-[#282828] dark:text-white hover:bg-[#FA3600] hover:text-white transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-xs">→</span>
              </Link>
            ))}
          </div>

          <div className="pt-6">
            <HeronButton
              variant="brand"
              size="lg"
              onClick={() => {
                setMobileMenuOpen(false);
                openModal();
              }}
              className="w-full text-center justify-center"
            >
              ОБСУДИТЬ СИТУАЦИЮ
            </HeronButton>
          </div>
        </div>
      )}
    </>
  );
}
