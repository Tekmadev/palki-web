'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Menu, X, UtensilsCrossed } from 'lucide-react';
import { business } from '@/data/business';

const navLinks = [
  { label: 'Menu', href: '/menu' },
  { label: 'Banquets', href: '/banquet' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (mobileOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
      // Stagger links
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll('a'),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.07, ease: 'power2.out', delay: 0.1 }
      );
    }
  }, [mobileOpen]);

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        const lenis = (window as unknown as Record<string, unknown>).__lenis as { scrollTo: (target: Element, options: { offset: number }) => void } | undefined;
        if (lenis) {
          lenis.scrollTo(el, { offset: -80 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(13, 4, 9, 0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(244, 187, 68, 0.15)'
            : '1px solid transparent',
        }}
      >
        <div className="container-wide" style={{ padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  background: 'linear-gradient(135deg, #F4BB44 0%, #d4a012 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <UtensilsCrossed size={18} color="#1a0a0f" strokeWidth={2.5} />
              </div>
              <div>
                <div
                  className="font-display"
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    lineHeight: 1,
                    color: '#F4BB44',
                    letterSpacing: '0.02em',
                  }}
                >
                  Palki
                </div>
                <div
                  style={{
                    fontSize: '0.6rem',
                    fontWeight: 500,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(253, 246, 236, 0.55)',
                    lineHeight: 1,
                    marginTop: '2px',
                  }}
                >
                  Cuisine of India
                </div>
              </div>
            </Link>

            {/* Desktop Links */}
            <div ref={linksRef} style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="hidden md:flex">
              {navLinks.map((link) =>
                link.href.startsWith('#') ? (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'rgba(253, 246, 236, 0.75)',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      transition: 'color 0.2s ease',
                      padding: 0,
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#F4BB44')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(253, 246, 236, 0.75)')}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{
                      color: 'rgba(253, 246, 236, 0.75)',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#F4BB44')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(253, 246, 236, 0.75)')}
                  >
                    {link.label}
                  </Link>
                )
              )}

              {/* CTA */}
              <a
                href={business.phone.tel}
                className="btn btn-primary"
                style={{ padding: '0.65rem 1.5rem', fontSize: '0.8rem' }}
              >
                Reserve a Table
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#F4BB44',
                padding: '8px',
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-[72px] left-0 right-0 z-40 md:hidden"
          style={{
            background: 'rgba(13, 4, 9, 0.97)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(244, 187, 68, 0.2)',
            padding: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {navLinks.map((link) =>
              link.href.startsWith('#') ? (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'rgba(253, 246, 236, 0.8)',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    textAlign: 'left',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(244, 187, 68, 0.08)',
                  }}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    color: 'rgba(253, 246, 236, 0.8)',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(244, 187, 68, 0.08)',
                    display: 'block',
                  }}
                >
                  {link.label}
                </Link>
              )
            )}
            <a
              href={business.phone.tel}
              className="btn btn-primary"
              style={{ marginTop: '0.5rem', justifyContent: 'center' }}
            >
              Reserve a Table
            </a>
          </div>
        </div>
      )}
    </>
  );
}
