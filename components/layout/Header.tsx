"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenisScroll } from "@/components/providers/SmoothScrollProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Menu, X, Sun, Moon, ArrowUpRight } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { scrollTo } = useLenisScroll();
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > 120) {
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Практики", href: "/practices" },
    { label: "Команда", href: "/team" },
    { label: "Кейсы", href: "/cases" },
    { label: "Блог", href: "/blog" },
    { label: "Контакты", href: "#contacts" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("#")) {
      e.preventDefault();
      if (pathname === "/") {
        scrollTo(href);
      } else {
        window.location.href = "/" + href;
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-et-bg/90 backdrop-blur-md border-et-border/80 shadow-subtle py-3.5"
            : "bg-et-bg/70 backdrop-blur-sm border-et-border/40 py-4 sm:py-5"
        }`}
      >
        <div className="w-full px-[clamp(1.5rem,4vw,6rem)] flex items-center justify-between">
          {/* Logo (Левая часть экрана) */}
          <Link href="/" className="flex items-center group logo-shimmer-container" aria-label="Адвокатское бюро Etlegis">
            <img
              src="/logo.svg"
              alt="Адвокатское бюро ETLEGIS"
              className={`h-[clamp(1.75rem,2.2vw,3rem)] w-auto object-contain transition-all ${
                theme === 'dark' ? 'invert opacity-90' : ''
              }`}
            />
            <div className="logo-shimmer-overlay" aria-hidden="true" />
          </Link>

          {/* Right Section: Theme Toggle Split Circle + Desktop Navigation */}
          <div className="hidden md:flex items-center gap-[clamp(1.5rem,2vw,3rem)]">
            {/* 🔴 Иконка смены режима: полузакрашенный круг (как на скриншоте) */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? "Включить светлую тему" : "Включить ночную тему"}
              title={theme === 'dark' ? "Ночная тема (нажмите для светлой)" : "Светлая тема (нажмите для ночной)"}
              className="w-[clamp(1.5rem,1.7vw,2.25rem)] h-[clamp(1.5rem,1.7vw,2.25rem)] rounded-full border border-et-dark/60 flex items-center justify-center transition-transform hover:scale-110 shrink-0 text-et-dark overflow-hidden"
            >
              <svg className="w-[clamp(0.85rem,1vw,1.35rem)] h-[clamp(0.85rem,1vw,1.35rem)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M 8 1 A 7 7 0 0 1 8 15 Z" fill="currentColor" />
              </svg>
            </button>

            <nav className="flex items-center gap-[clamp(1.5rem,2.2vw,3.5rem)]" aria-label="Основное меню">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-[clamp(0.75rem,0.85vw,1.15rem)] uppercase tracking-[0.2em] font-medium transition-colors hover:text-et-dark relative py-1 ${
                    pathname === link.href ? "text-et-dark font-semibold" : "text-et-muted"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-et-accent" />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile Theme Toggle + Hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Переключить тему"
              className={`w-7 h-7 rounded-full border transition-all flex items-center justify-center ${
                theme === 'dark'
                  ? 'border-[#927b50] bg-[#3e5871] text-[#927b50]'
                  : 'border-[#2c3e50]/40 bg-[#2c3e50] text-[#CBD5E1]'
              }`}
            >
              {theme === 'dark' ? <Sun size={13} /> : <Moon size={12} />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={mobileMenuOpen}
              className="p-2 text-et-dark hover:text-et-accent transition-colors"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Мобильная навигация"
          className="fixed inset-0 z-30 bg-bg-primary pt-24 pb-10 px-6 flex flex-col justify-between overflow-y-auto md:hidden animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <img
                src="/logo.svg"
                alt="Адвокатское бюро ETLEGIS"
                className="h-7 w-auto object-contain"
              />
            </div>

            <nav className="flex flex-col space-y-4 pt-2" aria-label="Мобильное меню">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group flex items-center justify-between text-2xl font-heading font-medium text-text-main hover:text-accent transition-colors py-2 border-b border-border-subtle/50"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={18} className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="pt-8 space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openModal();
              }}
              className="w-full btn-legal-primary py-3.5 text-sm uppercase tracking-wider"
            >
              Обсудить ситуацию
            </button>

            <div className="pt-2 text-center text-sm text-text-muted">
              <a href="tel:+74951059115" className="font-semibold text-text-main block text-base mb-1">
                +7 (495) 105-91-15
              </a>
              <span className="text-xs">г. Москва, 1-й Магистральный тупик, д. 11, стр. 10</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
