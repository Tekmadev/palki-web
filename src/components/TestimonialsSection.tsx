'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '@/data/testimonials';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } },
      );
      if (listRef.current) {
        gsap.fromTo(listRef.current.querySelectorAll('.review-row'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: listRef.current, start: 'top 80%', once: true } },
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      style={{
        background: 'linear-gradient(180deg,#2d1117 0%,#1a0a0f 100%)',
        padding: 'var(--section-padding) 1.5rem',
      }}
    >
      <div className="container">

        {/* ── Editorial header ── */}
        <div ref={headerRef} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', marginBottom: '4rem', gap: '2rem', opacity: 0 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', fontWeight: 300, color: 'rgba(244,187,68,0.2)', lineHeight: 1, letterSpacing: '-0.04em' }}>04</span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,rgba(244,187,68,0.3),transparent)' }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem,6vw,5rem)', fontWeight: 600, color: '#fdf6ec', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
              What<br />
              <em style={{ fontStyle: 'italic', color: '#F4BB44' }}>Guests</em> Say.
            </h2>
          </div>

          {/* Google rating block */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.4rem', marginBottom: '0.25rem' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#F4BB44" color="#F4BB44" />)}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: '#fdf6ec', lineHeight: 1 }}>4.9</div>
            <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(253,246,236,0.3)', marginTop: '0.2rem' }}>~ 500 Google reviews</div>
          </div>
        </div>

        {/* ── Review list — editorial rows, not cards ── */}
        <div ref={listRef}>
          {testimonials.map((review, i) => (
            <div
              key={review.id}
              className="review-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '3rem 1fr auto',
                gap: '1.5rem',
                padding: '2rem 0',
                borderTop: i === 0
                  ? '1px solid rgba(244,187,68,0.2)'
                  : '1px solid rgba(244,187,68,0.08)',
                alignItems: 'start',
                opacity: 0,
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(244,187,68,0.025)';
                (e.currentTarget as HTMLElement).style.paddingLeft = '0.5rem';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.paddingLeft = '0';
              }}
            >
              {/* Initials — no circle, just gold text */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'rgba(244,187,68,0.4)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {review.avatar}
                </div>
              </div>

              {/* Review body */}
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                    fontStyle: 'italic',
                    color: '#fdf6ec',
                    lineHeight: 1.65,
                    marginBottom: '0.75rem',
                    fontWeight: 400,
                  }}
                >
                  &ldquo;{review.text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span style={{ color: '#fdf6ec', fontWeight: 600, fontSize: '0.85rem' }}>{review.name}</span>
                  <span style={{ color: 'rgba(253,246,236,0.25)', fontSize: '0.75rem' }}>·</span>
                  <span style={{ color: 'rgba(253,246,236,0.35)', fontSize: '0.75rem' }}>{review.date}</span>
                  {review.eventType === 'banquet' && (
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(244,187,68,0.6)', borderBottom: '1px solid rgba(244,187,68,0.3)' }}>
                      Banquet Event
                    </span>
                  )}
                </div>
              </div>

              {/* Star rating — right side, vertical */}
              <div style={{ display: 'flex', gap: '2px', paddingTop: '4px' }}>
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} size={11} fill="#F4BB44" color="#F4BB44" />
                ))}
              </div>
            </div>
          ))}
          {/* Closing rule */}
          <div style={{ borderTop: '1px solid rgba(244,187,68,0.08)' }} />
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.75rem' }}>
          <a
            href="https://g.co/kgs/palki-ottawa"
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow"
          >
            All reviews on Google <span style={{ fontSize: '0.9em' }}>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
