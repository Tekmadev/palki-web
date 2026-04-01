'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, ArrowRight } from 'lucide-react';
import { menuItems } from '@/data/menu';

gsap.registerPlugin(ScrollTrigger);

/* ─── Helpers ────────────────────────────────────────────────── */

const spiceFlames: Record<string, { count: number; color: string }> = {
  mild:        { count: 1, color: '#22c55e' },
  medium:      { count: 2, color: '#f59e0b' },
  hot:         { count: 3, color: '#ef4444' },
  'extra-hot': { count: 4, color: '#dc2626' },
};

const dietColors: Record<string, string> = {
  veg: '#22c55e', 'non-veg': '#ef4444', vegan: '#16a34a', gf: '#F4BB44',
};

// Only show featured items on the home preview
const featuredItems = menuItems.filter(i => i.featured);

/* ─── Menu card ──────────────────────────────────────────────── */
function MenuCard({ item }: { item: typeof menuItems[0] }) {
  return (
    <article
      className="menu-card"
      style={{
        borderTop: '1px solid rgba(244,187,68,0.18)',
        borderLeft: '3px solid #F4BB44',
        padding: '1.5rem 1.25rem 1.25rem',
        position: 'relative',
        background: 'transparent',
        transition: 'background 0.3s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(244,187,68,0.04)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
    >
      {/* Name + price */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.6rem' }}>
        <h3 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 600, color: '#fdf6ec', lineHeight: 1.1 }}>
          {item.name}
        </h3>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: '#F4BB44', whiteSpace: 'nowrap', marginTop: '2px' }}>
          ${item.price.toFixed(2)}
        </span>
      </div>

      {/* Description */}
      <p style={{ color: 'rgba(253,246,236,0.5)', fontSize: '0.82rem', lineHeight: 1.65, marginBottom: '1rem' }}>
        {item.description}
      </p>

      {/* Tags + spice */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        {item.tags.map((tag) => (
          <span
            key={tag}
            style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', color: dietColors[tag] ?? '#fdf6ec', textTransform: 'uppercase' }}
          >
            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: dietColors[tag] ?? '#fdf6ec' }} />
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

      {/* Gold pip */}
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: '6px', height: '6px', borderRadius: '50%', background: '#F4BB44', boxShadow: '0 0 6px rgba(244,187,68,0.8)' }} />
    </article>
  );
}

/* ─── Main component ─────────────────────────────────────────── */
export default function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } },
      );
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true } },
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="menu" style={{ background: 'linear-gradient(180deg,#1a0a0f 0%,#0d0409 100%)', padding: 'var(--section-padding) 1.5rem' }}>
      <div className="container">

        {/* Header */}
        <div ref={headerRef} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', marginBottom: '4rem', gap: '2rem', opacity: 0 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', fontWeight: 300, color: 'rgba(244,187,68,0.2)', lineHeight: 1, letterSpacing: '-0.04em' }}>02</span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(244,187,68,0.3), transparent)' }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem,6vw,5rem)', fontWeight: 600, color: '#fdf6ec', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
              The<br />
              <em style={{ fontStyle: 'italic', color: '#F4BB44' }}>Menu.</em>
            </h2>
          </div>
          <p style={{ color: 'rgba(253,246,236,0.45)', fontSize: '0.85rem', lineHeight: 1.75, maxWidth: '240px', textAlign: 'right' }}>
            Every dish made from scratch daily using time-honoured recipes and imported spices.
          </p>
        </div>

        {/* Featured items grid */}
        <div
          ref={gridRef}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', borderBottom: '1px solid rgba(244,187,68,0.18)' }}
        >
          {featuredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'rgba(253,246,236,0.3)', fontSize: '0.78rem', letterSpacing: '0.04em' }}>
            Showing chef&apos;s picks — browse the full menu for all dishes
          </p>
          <Link href="/menu" className="link-arrow">
            View full menu <ArrowRight size={13} />
          </Link>
        </div>

      </div>
    </section>
  );
}
