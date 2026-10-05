'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useConsultationModal } from '@/components/providers/ModalProvider';
import HeronButton from '@/components/ui/HeronButton';
import { Menu, X, ArrowUpRight } from 'lucide-react';

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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
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
            
            {/* 1. Original Brand Logo (Left Side) */}
            <Link
              href="/"
              className="flex items-center gap-3 px-4 sm:px-6 border-r border-[#D1D1CB] dark:border-[#222528] group select-none hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
              aria-label="Адвокатское бюро Etlegis"
            >
              <img
                src="/logo.svg"
                alt="Адвокатское бюро ETLEGIS"
                className={`h-6 sm:h-7 w-auto object-contain transition-all ${
                  theme === 'dark' ? 'invert opacity-95' : 'opacity-90'
                }`}
              />
            </Link>

            {/* 2. Right Side: Desktop Nav Cells + Controls */}
            <div className="hidden lg:flex items-stretch">
              {/* Navigation Cells */}
              <nav className="flex items-stretch" aria-label="Основное меню">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`relative flex items-center justify-between px-5 sm:px-6 border-l border-[#D1D1CB] dark:border-[#222528] font-mono text-xs uppercase tracking-wider transition-colors duration-200 group ${
                        isActive
                          ? 'bg-[#282828] text-white dark:bg-white dark:text-[#282828]'
                          : 'text-[#414140] dark:text-[#A0A09C] hover:text-[#FA3600] dark:hover:text-[#FA3600] hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.hasSubmenu && (
                        <span className="ml-2.5 text-[10px] text-[#7E7E7A] group-hover:text-[#FA3600] transition-colors">
                          ┘
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Theme Toggle Cell (Split-circle) */}
              <div className="flex items-center px-4 border-l border-[#D1D1CB] dark:border-[#222528]">
                <button
                  onClick={toggleTheme}
                  aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить темную тему'}
                  title={theme === 'dark' ? 'Светлая тема' : 'Темная тема'}
                  className="w-7 h-7 rounded-full border border-[#7E7E7A]/60 flex items-center justify-center transition-transform hover:scale-110 shrink-0 text-[#282828] dark:text-white overflow-hidden"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M 8 1 A 7 7 0 0 1 8 15 Z" fill="currentColor" />
                  </svg>
                </button>
              </div>

              {/* Consultation CTA Button Cell */}
              <div className="flex items-center px-4 border-l border-[#D1D1CB] dark:border-[#222528]">
                <HeronButton
                  variant="brand"
                  size="sm"
                  onClick={openModal}
                  className="whitespace-nowrap"
                >
                  ОБСУДИТЬ ДЕЛО
                </HeronButton>
              </div>
            </div>

            {/* 3. Mobile Header Controls */}
            <div className="flex lg:hidden items-stretch">
              {/* Mobile Theme Toggle */}
              <div className="flex items-center px-3 border-l border-[#D1D1CB] dark:border-[#222528]">
                <button
                  onClick={toggleTheme}
                  aria-label="Сменить тему"
                  className="w-7 h-7 rounded-full border border-[#7E7E7A]/60 flex items-center justify-center text-[#282828] dark:text-white"
                >
                  <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M 8 1 A 7 7 0 0 1 8 15 Z" fill="currentColor" />
                  </svg>
                </button>
              </div>

              {/* Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
                className="flex items-center justify-center px-4 border-l border-[#D1D1CB] dark:border-[#222528] text-[#282828] dark:text-white hover:text-[#FA3600] transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 bg-[#F5F5ED] dark:bg-[#0C0D0E] pt-24 pb-8 px-6 flex flex-col justify-between overflow-y-auto lg:hidden animate-in fade-in duration-200"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#D1D1CB] dark:border-[#222528]">
              <img
                src="/logo.svg"
                alt="Адвокатское бюро ETLEGIS"
                className={`h-6 w-auto object-contain ${theme === 'dark' ? 'invert opacity-90' : ''}`}
              />
              <span className="text-[10px] font-mono text-[#FA3600]">// НАВИГАЦИЯ</span>
            </div>

            <nav className="flex flex-col divide-y divide-[#D1D1CB] dark:divide-[#222528] border-b border-[#D1D1CB] dark:border-[#222528]">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-4 font-mono text-base uppercase text-[#282828] dark:text-white hover:text-[#FA3600] transition-colors"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#7E7E7A]" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="pt-8 space-y-4">
            <HeronButton
              variant="brand"
              size="lg"
              onClick={() => {
                setMobileMenuOpen(false);
                openModal();
              }}
              className="w-full text-center"
            >
              ОБСУДИТЬ СИТУАЦИЮ
            </HeronButton>

            <div className="text-center font-mono text-xs text-[#7E7E7A] pt-2">
              <a href="tel:+74951059115" className="block text-sm font-bold text-[#282828] dark:text-white mb-1">
                +7 (495) 105-91-15
              </a>
              <span>Москва, 1-й Магистральный тупик, 11с10</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
