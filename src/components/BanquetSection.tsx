'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Gem, ListChecks, ChefHat, ArrowRight } from 'lucide-react';
import { business } from '@/data/business';
import { banquetPackages, formatPrice, packageInclusions, type PackageId } from '@/data/banquet';

gsap.registerPlugin(ScrollTrigger);

const { minGuests, maxGuests } = business.banquet;

const highlights = [
  { stat: `${minGuests}–${maxGuests}`, label: 'Guests' },
  { stat: formatPrice(Math.min(...banquetPackages.map((p) => p.pricePerPerson))), label: 'From, per person' },
  { stat: String(banquetPackages.length), label: 'Simple packages' },
  { stat: 'Free', label: 'Quotes' },
];

const packageIcons: Record<PackageId, React.ReactNode> = {
  gold: <Award size={18} />,
  diamond: <Gem size={18} />,
};

const offerings = [
  ...banquetPackages.map((p) => ({
    icon: packageIcons[p.id],
    title: `${p.name} Package`,
    description: `${formatPrice(p.pricePerPerson)} per person + tax · ${p.itemsPerCourse} items per course`,
  })),
  {
    icon: <ListChecks size={18} />,
    title: 'Included with Both',
    description: packageInclusions.filter((i) => i.icon !== 'guests').map((i) => i.label).join(' · '),
  },
  {
    icon: <ChefHat size={18} />,
    title: 'Catering',
    description: 'Having your event somewhere else? Order from our menu, priced by quote.',
  },
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
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(244,187,68,0.6)' }}>Banquets & Catering</span>
        </div>

        {/* ── Two-column: large bold text left, content right ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '5rem', alignItems: 'start' }}>

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
              Banquets<br />
              <em style={{ fontStyle: 'italic', color: '#F4BB44' }}>& Catering.</em>
            </h2>

            <p style={{ color: 'rgba(253,246,236,0.55)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '360px', marginBottom: '2.5rem' }}>
              Host {minGuests} to {maxGuests} guests in our banquet hall, or have Palki cater your event
              from our menu. Tell us what you&apos;re planning and we&apos;ll send you a free quote.
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

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem' }}>
              <Link href="/banquet#quote" className="btn btn-primary" style={{ display: 'inline-flex' }}>
                Get a Free Quote <ArrowRight size={14} />
              </Link>
              <Link href="/banquet#packages" className="link-arrow">
                See Packages
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div ref={rightRef} style={{ opacity: 0 }}>
            {/* Packages & catering — stacked list, NOT cards */}
            <div>
              {offerings.map((o, i) => (
                <div
                  key={o.title}
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
                    {o.icon}
                  </div>
                  <div>
                    <div style={{ color: '#fdf6ec', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.2rem' }}>{o.title}</div>
                    <p style={{ color: 'rgba(253,246,236,0.45)', fontSize: '0.8rem', lineHeight: 1.6 }}>{o.description}</p>
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
                {['Weddings & Receptions', 'Mehndi & Sangeet', 'Corporate Events', 'Milad Functions', 'Graduations', 'Birthday Celebrations'].join(' · ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
