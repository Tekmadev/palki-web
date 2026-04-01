'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import { menuItems, menuCategories, type MenuCategory, type MenuItem } from '@/data/menu';

gsap.registerPlugin(ScrollTrigger);

/* ─── Helpers ────────────────────────────────────────────────── */

const spiceFlames: Record<string, { count: number; color: string }> = {
  mild:        { count: 1, color: '#22c55e' },
  medium:      { count: 2, color: '#f59e0b' },
  hot:         { count: 3, color: '#ef4444' },
  'extra-hot': { count: 4, color: '#dc2626' },
};

const dietBadge: Record<string, { label: string; color: string; bg: string }> = {
  veg:     { label: 'Veg',     color: '#16a34a', bg: 'rgba(22,163,74,0.12)' },
  'non-veg': { label: 'Non-Veg', color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
  vegan:   { label: 'Vegan',   color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
  gf:      { label: 'GF',      color: '#F4BB44', bg: 'rgba(244,187,68,0.12)' },
};

/* ─── Menu Item Card ─────────────────────────────────────────── */
function MenuCard({ item }: { item: MenuItem }) {
  // No per-card ScrollTrigger — 65 individual triggers cause mobile scroll snapping
  const flames = item.spiceLevel ? spiceFlames[item.spiceLevel] : null;

  return (
    <div
      style={{
        borderTop: '1px solid rgba(244,187,68,0.15)',
        borderLeft: item.featured ? '3px solid #F4BB44' : '3px solid transparent',
        padding: '1.25rem 1.25rem 1.1rem 1.1rem',
        transition: 'background 0.25s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(244,187,68,0.04)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
    >
      {/* Name + Price */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.45rem' }}>
        <h3
          className="font-display"
          style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fdf6ec', lineHeight: 1.15, flex: 1 }}
        >
          {item.name}
          {item.featured && (
            <span style={{ marginLeft: '0.5rem', fontSize: '0.6rem', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F4BB44', verticalAlign: 'middle', border: '1px solid rgba(244,187,68,0.4)', borderRadius: '3px', padding: '2px 5px' }}>
              Chef&apos;s Pick
            </span>
          )}
        </h3>
        <span
          className="font-display"
          style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F4BB44', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          ${item.price.toFixed(2)}
        </span>
      </div>

      {/* Description */}
      {item.description && (
        <p style={{ fontSize: '0.82rem', color: 'rgba(253,246,236,0.55)', lineHeight: 1.5, marginBottom: '0.65rem' }}>
          {item.description}
        </p>
      )}

      {/* Tags row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
        {item.tags.filter(t => t !== 'gf').slice(0, 1).map(tag => (
          <span
            key={tag}
            style={{
              fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: dietBadge[tag]?.color, background: dietBadge[tag]?.bg,
              padding: '2px 7px', borderRadius: '3px',
            }}
          >
            {dietBadge[tag]?.label}
          </span>
        ))}
        {item.tags.includes('gf') && (
          <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#F4BB44', background: 'rgba(244,187,68,0.12)', padding: '2px 7px', borderRadius: '3px' }}>
            GF
          </span>
        )}
        {flames && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '1px', marginLeft: '0.2rem' }}>
            {Array.from({ length: flames.count }).map((_, i) => (
              <Flame key={i} size={11} color={flames.color} fill={flames.color} />
            ))}
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Category Section ───────────────────────────────────────── */
function CategorySection({ categoryId }: { categoryId: MenuCategory }) {
  const meta = menuCategories.find(c => c.id === categoryId)!;
  const items = menuItems.filter(i => i.category === categoryId);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 88%', once: true },
      }
    );
  }, []);

  return (
    <section id={categoryId} style={{ marginBottom: '4rem' }}>
      {/* Category heading */}
      <div
        ref={headingRef}
        style={{
          marginBottom: '1.5rem',
          background: 'linear-gradient(90deg, rgba(244,187,68,0.1) 0%, transparent 100%)',
          borderLeft: '4px solid #F4BB44',
          borderRadius: '0 4px 4px 0',
          padding: '0.85rem 1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>{meta.icon}</span>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
              fontWeight: 700,
              color: '#fdf6ec',
              letterSpacing: '0.01em',
              lineHeight: 1,
            }}
          >
            {meta.label}
          </h2>
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
          gap: '0',
        }}
      >
        {items.map(item => <MenuCard key={item.id} item={item} />)}
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all');
  const heroRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  // Track whether the user is currently clicking (so we don't fight the observer)
  const isClickScrolling = useRef(false);

  useEffect(() => {
    if (!heroRef.current) return;
    gsap.fromTo(
      heroRef.current.querySelectorAll('.hero-anim'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 }
    );
  }, []);

  // IntersectionObserver — watches each section and updates the active tab
  useEffect(() => {
    const sections = menuCategories
      .map(c => document.getElementById(c.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        // Pick the entry closest to the top of the viewport
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveCategory(visible[0].target.id as MenuCategory);
        }
      },
      { rootMargin: '-130px 0px -55% 0px', threshold: 0 }
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Auto-scroll only the nav tab strip horizontally so the active pill stays visible.
  // We manually set scrollLeft instead of scrollIntoView — scrollIntoView also scrolls
  // the page vertically on mobile, which is what was causing the snap-to-top bug.
  useEffect(() => {
    if (!navRef.current || activeCategory === 'all') return;
    const nav = navRef.current;
    const btn = nav.querySelector(`[data-cat="${activeCategory}"]`) as HTMLElement | null;
    if (!btn) return;
    const navRect = nav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const offset = btnRect.left - navRect.left - navRect.width / 2 + btnRect.width / 2;
    nav.scrollLeft += offset;
  }, [activeCategory]);

  const scrollToCategory = (id: MenuCategory) => {
    setActiveCategory(id);
    isClickScrolling.current = true;
    const el = document.getElementById(id);
    if (el) {
      const lenis = (window as unknown as Record<string, unknown>).__lenis as { scrollTo: (target: Element, options: { offset: number; onComplete?: () => void }) => void } | undefined;
      const offset = -130;
      if (lenis) {
        lenis.scrollTo(el, { offset, onComplete: () => { isClickScrolling.current = false; } });
      } else {
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' });
        setTimeout(() => { isClickScrolling.current = false; }, 800);
      }
    }
  };

  return (
    <SmoothScrollProvider>
      <Navbar />

      {/* Hero */}
      <section
        ref={heroRef}
        style={{
          minHeight: '38vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          padding: '8rem 1.5rem 3rem',
          background: 'radial-gradient(ellipse at 50% 0%, #3f1921 0%, #1a0a0f 55%, #0d0409 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="hero-anim" style={{ marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F4BB44' }}>
            Palki &mdash; Cuisine of India
          </span>
        </div>
        <h1
          className="hero-anim font-display"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 700, color: '#fdf6ec', lineHeight: 1.05, marginBottom: '1rem' }}
        >
          Our Menu
        </h1>
        <p
          className="hero-anim"
          style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'rgba(253,246,236,0.6)', maxWidth: '480px', lineHeight: 1.65 }}
        >
          Authentic Indian cuisine crafted with traditional recipes and the finest ingredients.
        </p>

        {/* Gold line */}
        <div className="hero-anim" style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, transparent, #F4BB44, transparent)', margin: '1.5rem auto 0' }} />
      </section>

      {/* Sticky category nav */}
      <div
        ref={navRef}
        style={{
          position: 'sticky',
          top: '72px',
          zIndex: 30,
          background: 'rgba(13,4,9,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(244,187,68,0.12)',
          padding: '0 1.5rem',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', minWidth: 'max-content', maxWidth: '1200px', margin: '0 auto' }}>
          {/* All button */}
          <button
            data-cat="all"
            onClick={() => setActiveCategory('all')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '1rem 1rem',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: activeCategory === 'all' ? '#F4BB44' : 'rgba(253,246,236,0.5)',
              borderBottom: activeCategory === 'all' ? '2px solid #F4BB44' : '2px solid transparent',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            All
          </button>
          {menuCategories.map(cat => (
            <button
              key={cat.id}
              data-cat={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '1rem 1rem',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: activeCategory === cat.id ? '#F4BB44' : 'rgba(253,246,236,0.5)',
                borderBottom: activeCategory === cat.id ? '2px solid #F4BB44' : '2px solid transparent',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3.5rem 1.5rem 6rem' }}>
        {/* Legend */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(253,246,236,0.35)' }}>Key:</span>
          {[
            { label: 'Veg', color: '#16a34a', bg: 'rgba(22,163,74,0.12)' },
            { label: 'Non-Veg', color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
            { label: 'Vegan', color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
            { label: 'GF — Gluten Friendly', color: '#F4BB44', bg: 'rgba(244,187,68,0.12)' },
          ].map(k => (
            <span
              key={k.label}
              style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: k.color, background: k.bg, padding: '3px 8px', borderRadius: '3px' }}
            >
              {k.label}
            </span>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Flame size={11} color="#22c55e" fill="#22c55e" />
            <span style={{ fontSize: '0.65rem', color: 'rgba(253,246,236,0.4)' }}>mild</span>
            <Flame size={11} color="#f59e0b" fill="#f59e0b" />
            <Flame size={11} color="#f59e0b" fill="#f59e0b" />
            <span style={{ fontSize: '0.65rem', color: 'rgba(253,246,236,0.4)' }}>medium</span>
            <Flame size={11} color="#ef4444" fill="#ef4444" />
            <Flame size={11} color="#ef4444" fill="#ef4444" />
            <Flame size={11} color="#ef4444" fill="#ef4444" />
            <span style={{ fontSize: '0.65rem', color: 'rgba(253,246,236,0.4)' }}>hot</span>
          </div>
        </div>

        {/* Categories — all always rendered so IntersectionObserver can track them */}
        {menuCategories.map(cat => (
          <CategorySection key={cat.id} categoryId={cat.id} />
        ))}
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}
