'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Mic2, ChefHat, Palette, Wine, Car, ArrowRight } from 'lucide-react';
import { banquetAmenities } from '@/data/banquet';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  '👥': <Users size={18} />,
  '🎙️': <Mic2 size={18} />,
  '🍽️': <ChefHat size={18} />,
  '🌿': <Palette size={18} />,
  '🍸': <Wine size={18} />,
  '🅿️': <Car size={18} />,
};

const highlights = [
  { stat: '150', label: 'Seated guests' },
  { stat: '8hr', label: 'Max venue access' },
  { stat: '3', label: 'Event packages' },
  { stat: '24/7', label: 'Events team' },
];

export default function BanquetSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true } },
      );
      gsap.fromTo(rightRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true } },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="banquets"
      style={{
        background: '#0d0409',
        padding: 'var(--section-padding) 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle full-width gold rule at top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent 0%,rgba(244,187,68,0.25) 30%,rgba(244,187,68,0.25) 70%,transparent 100%)' }} />

      <div className="container">

        {/* ── Editorial header ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', fontWeight: 300, color: 'rgba(244,187,68,0.2)', lineHeight: 1, letterSpacing: '-0.04em' }}>03</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,rgba(244,187,68,0.3),transparent)' }} />
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(244,187,68,0.6)' }}>Events & Banquets</span>
        </div>

        {/* ── Two-column: large bold text left, content right ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: '5rem', alignItems: 'start' }}>

          {/* LEFT */}
          <div ref={leftRef} style={{ opacity: 0 }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 7vw, 6rem)',
                fontWeight: 600,
                color: '#fdf6ec',
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                marginBottom: '2rem',
              }}
            >
              Grand<br />
              <em style={{ fontStyle: 'italic', color: '#F4BB44' }}>Banquet</em><br />
              Hall.
            </h2>

            <p style={{ color: 'rgba(253,246,236,0.55)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '340px', marginBottom: '2.5rem' }}>
              From an intimate dinner of 30 to a grand wedding of 150 — Palki transforms your vision into an unforgettable evening.
            </p>

            {/* Stats row — no boxes, just divider lines */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid rgba(244,187,68,0.15)', paddingTop: '2rem', gap: '1.5rem 2rem', marginBottom: '2.5rem' }}>
              {highlights.map((h) => (
                <div key={h.label}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 700, color: '#F4BB44', lineHeight: 1, marginBottom: '0.2rem' }}>{h.stat}</div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(253,246,236,0.35)' }}>{h.label}</div>
                </div>
              ))}
            </div>

            <Link href="/banquet" className="btn btn-primary" style={{ display: 'inline-flex' }}>
              Plan Your Event <ArrowRight size={14} />
            </Link>
          </div>

          {/* RIGHT */}
          <div ref={rightRef} style={{ opacity: 0 }}>
            {/* Amenities — stacked list, NOT cards */}
            <div>
              {banquetAmenities.map((a, i) => (
                <div
                  key={a.title}
                  style={{
                    display: 'flex',
                    gap: '1.25rem',
                    alignItems: 'flex-start',
                    padding: '1.25rem 0',
                    borderTop: i === 0 ? '1px solid rgba(244,187,68,0.15)' : '1px solid rgba(244,187,68,0.08)',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.paddingLeft = '0.5rem'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.paddingLeft = '0'}
                >
                  {/* Gold accent square with icon */}
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      background: 'rgba(244,187,68,0.1)',
                      border: '1px solid rgba(244,187,68,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#F4BB44',
                      flexShrink: 0,
                      clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                    }}
                  >
                    {iconMap[a.icon] ?? <span>{a.icon}</span>}
                  </div>
                  <div>
                    <div style={{ color: '#fdf6ec', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.2rem' }}>{a.title}</div>
                    <p style={{ color: 'rgba(253,246,236,0.45)', fontSize: '0.8rem', lineHeight: 1.6 }}>{a.description}</p>
                  </div>
                </div>
              ))}
              {/* Last border */}
              <div style={{ borderTop: '1px solid rgba(244,187,68,0.08)' }} />
            </div>

            {/* Popular event types — text list, not pill bubbles */}
            <div style={{ marginTop: '2rem' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(244,187,68,0.5)', marginBottom: '0.75rem' }}>
                We host
              </p>
              <p style={{ color: 'rgba(253,246,236,0.5)', fontSize: '0.9rem', lineHeight: 1.9 }}>
                {['Weddings & Receptions', 'Mehndi & Sangeet', 'Corporate Galas', 'Milad Functions', 'Graduations', 'Birthday Celebrations'].join(' · ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
