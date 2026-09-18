"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useConsultationModal } from "@/components/providers/ModalProvider";
import { useLenisScroll } from "@/components/providers/SmoothScrollProvider";
import { Menu, X, Phone, Shield, ArrowUpRight } from "lucide-react";

export default function Header() {
  const { openModal } = useConsultationModal();
  const { scrollTo } = useLenisScroll();
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add subtle background once scrolled past 20px
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Smart hide header on scroll down, show on scroll up
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY.current && !mobileMenuOpen) {
          setIsVisible(false); // scrolling down
        } else {
          setIsVisible(true); // scrolling up
        }
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  // Prevent background scroll when mobile menu is open
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-bg-primary/90 backdrop-blur-md border-b border-border-subtle/80 shadow-subtle py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Адвокатское бюро Etlegis">
            <div className="flex flex-col">
              <span className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-text-main group-hover:text-accent transition-colors">
                et.legis
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted font-medium -mt-1">
                Адвокатское бюро
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Основное меню">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors hover:text-text-main relative py-1 ${
                  pathname === link.href ? "text-text-main font-semibold" : "text-text-muted"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA & Phone (Desktop) */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:+74951059115"
              className="flex items-center gap-2 text-sm font-medium text-text-main hover:text-accent transition-colors"
            >
              <Phone size={14} className="text-accent-bronze" />
              <span>+7 (495) 105-91-15</span>
            </a>

            <button
              onClick={() => openModal()}
              className="btn-legal-primary px-5 py-2.5 text-xs uppercase tracking-wider"
            >
              Обсудить ситуацию
            </button>
          </div>

          {/* Mobile CTA + Hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => openModal()}
              className="btn-legal-primary px-3 py-1.5 text-xs"
            >
              Обсудить ситуацию
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={mobileMenuOpen}
              className="p-2 text-text-main hover:text-accent transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            <div className="flex items-center gap-2 text-accent-bronze pb-3 border-b border-border-subtle">
              <Shield size={16} />
              <span className="text-xs uppercase tracking-widest font-medium">Адвокатское бюро «Этлегис»</span>
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
