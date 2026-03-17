'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, ArrowRight } from 'lucide-react';
import { menuItems, menuCategories, type MenuCategory } from '@/data/menu';

gsap.registerPlugin(ScrollTrigger);

/* ─── Tiny helpers ─────────────────────────────────────────── */

const spiceFlames: Record<string, { count: number; color: string }> = {
  mild:       { count: 1, color: '#22c55e' },
  medium:     { count: 2, color: '#f59e0b' },
  hot:        { count: 3, color: '#ef4444' },
  'extra-hot':{ count: 4, color: '#dc2626' },
};

const dietColors: Record<string, string> = {
  veg: '#22c55e', 'non-veg': '#ef4444', vegan: '#16a34a', gf: '#F4BB44',
};

/* ─── Menu card — editorial asymmetric ─────────────────────── */
function MenuCard({ item, index }: { item: typeof menuItems[0]; index: number }) {
  const isWide = index % 5 === 0; // every 5th card spans wider (visual rhythm)
  return (
    <article
      className="menu-card"
      style={{
        gridColumn: isWide ? 'span 2' : 'span 1',
        borderTop: '1px solid rgba(244,187,68,0.18)',
        borderLeft: item.featured ? '3px solid #F4BB44' : '1px solid transparent',
        padding: '1.5rem 1.25rem 1.25rem',
        position: 'relative',
        background: 'transparent',
        transition: 'background 0.3s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(244,187,68,0.04)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'transparent';
      }}
    >
      {/* Top row: name + price */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.6rem' }}>
        <h3
          className="font-display"
          style={{
            fontSize: isWide ? '1.55rem' : '1.3rem',
            fontWeight: 600,
            color: '#fdf6ec',
            lineHeight: 1.1,
          }}
        >
          {item.name}
        </h3>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.15rem',
            fontWeight: 700,
            color: '#F4BB44',
            whiteSpace: 'nowrap',
            marginTop: '2px',
          }}
        >
          ${item.price.toFixed(2)}
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          color: 'rgba(253,246,236,0.5)',
          fontSize: '0.82rem',
          lineHeight: 1.65,
          marginBottom: '1rem',
        }}
      >
        {item.description}
      </p>

      {/* Bottom row: diet dots + spice */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        {item.tags.map((tag) => (
          <span
            key={tag}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: dietColors[tag] ?? '#fdf6ec',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: dietColors[tag] ?? '#fdf6ec',
              }}
            />
            {tag === 'non-veg' ? 'Non-Veg' : tag === 'gf' ? 'GF' : tag.charAt(0).toUpperCase() + tag.slice(1)}
          </span>
        ))}

        {item.spiceLevel && spiceFlames[item.spiceLevel] && (() => {
          const flames = spiceFlames[item.spiceLevel!];
          return (
            <span style={{ marginLeft: 'auto', display: 'flex', gap: '2px' }}>
              {[...Array(flames.count)].map((_, i) => (
                <Flame key={i} size={11} color={flames.color} fill={flames.color} />
              ))}
            </span>
          );
        })()}

      </div>

      {/* Featured mark — top-right corner pip */}
      {item.featured && (
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#F4BB44',
            boxShadow: '0 0 6px rgba(244,187,68,0.8)',
          }}
        />
      )}
    </article>
  );
}

/* ─── Main component ───────────────────────────────────────── */
export default function MenuSection() {
  const [active, setActive] = useState<MenuCategory>('appetizers');
  const [displayed, setDisplayed] = useState(menuItems.filter(i => i.category === 'appetizers'));
  const [animating, setAnimating] = useState(false);
  const gridRef   = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const tabsRef   = useRef<HTMLDivElement>(null);

  /* Scroll-triggered header */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } },
      );
    });
    return () => ctx.revert();
  }, []);

  /* Slide the gold indicator under active tab */
  const slideIndicator = useCallback((tabEl: HTMLElement) => {
    if (!indicatorRef.current || !tabsRef.current) return;
    const tabRect  = tabEl.getBoundingClientRect();
    const wrapRect = tabsRef.current.getBoundingClientRect();
    gsap.to(indicatorRef.current, {
      x: tabRect.left - wrapRect.left,
      width: tabRect.width,
      duration: 0.38,
      ease: 'power2.inOut',
    });
  }, []);

  /* Update indicator on mount */
  useEffect(() => {
    if (!tabsRef.current) return;
    const firstTab = tabsRef.current.querySelector('[data-active="true"]') as HTMLElement;
    if (firstTab) slideIndicator(firstTab);
  }, [slideIndicator]);

  const switchCategory = useCallback((cat: MenuCategory, tabEl: HTMLElement) => {
    if (cat === active || animating) return;
    setAnimating(true);
    slideIndicator(tabEl);

    if (gridRef.current) {
      gsap.to(gridRef.current.children, {
        opacity: 0, y: -12, duration: 0.22, stagger: 0.025, ease: 'power2.in',
        onComplete: () => {
          setActive(cat);
          setDisplayed(menuItems.filter(i => i.category === cat));
          setAnimating(false);
        },
      });
    } else {
      setActive(cat);
      setDisplayed(menuItems.filter(i => i.category === cat));
      setAnimating(false);
    }
  }, [active, animating, slideIndicator]);

  /* Animate cards in */
  useEffect(() => {
    if (!gridRef.current || animating) return;
    gsap.fromTo(gridRef.current.children,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.055, ease: 'power3.out', delay: 0.05 },
    );
  }, [displayed, animating]);

  return (
    <section ref={sectionRef} id="menu" style={{ background: 'linear-gradient(180deg,#1a0a0f 0%,#0d0409 100%)', padding: 'var(--section-padding) 1.5rem' }}>
      <div className="container">

        {/* ── Header: editorial numbered layout ── */}
        <div ref={headerRef} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', marginBottom: '4rem', gap: '2rem', opacity: 0 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', fontWeight: 300, color: 'rgba(244,187,68,0.2)', lineHeight: 1, letterSpacing: '-0.04em' }}>02</span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(244,187,68,0.3), transparent)' }} />
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem,6vw,5rem)',
                fontWeight: 600,
                color: '#fdf6ec',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
              }}
            >
              The<br />
              <em style={{ fontStyle: 'italic', color: '#F4BB44' }}>Menu.</em>
            </h2>
          </div>
          <p style={{ color: 'rgba(253,246,236,0.45)', fontSize: '0.85rem', lineHeight: 1.75, maxWidth: '240px', textAlign: 'right' }}>
            Every dish made from scratch daily using time-honoured recipes and imported spices.
          </p>
        </div>

        {/* ── Tab bar: sliding underline, NOT pills ── */}
        <div
          ref={tabsRef}
          style={{
            position: 'relative',
            display: 'flex',
            gap: 0,
            borderBottom: '1px solid rgba(244,187,68,0.12)',
            marginBottom: '3rem',
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          {/* sliding gold underline */}
          <span
            ref={indicatorRef}
            style={{
              position: 'absolute',
              bottom: '-1px',
              left: 0,
              height: '2px',
              background: '#F4BB44',
              pointerEvents: 'none',
              width: '0px',
            }}
          />
          {menuCategories.map((cat) => {
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                data-active={isActive ? 'true' : 'false'}
                onClick={(e) => switchCategory(cat.id, e.currentTarget)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: isActive ? '#F4BB44' : 'rgba(253,246,236,0.4)',
                  transition: 'color 0.25s ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(253,246,236,0.75)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(253,246,236,0.4)';
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ── Menu grid: borderless editorial rows ── */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            borderBottom: '1px solid rgba(244,187,68,0.18)',
          }}
        >
          {displayed.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'rgba(253,246,236,0.3)', fontSize: '0.78rem', letterSpacing: '0.04em' }}>
            Showing a selection — full menu available in-house &amp; by request
          </p>
          <a href="tel:+16131234567" className="link-arrow">
            Full menu &amp; daily specials <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
