'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';
import { ChevronDown } from 'lucide-react';

const SpiceCanvas = dynamic(() => import('./SpiceCanvas'), { ssr: false });

export default function HeroSection() {
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.6 });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
    )
      .fromTo(
        taglineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        titleRef.current ? Array.from(titleRef.current.querySelectorAll('.hero-word')) : [],
        { opacity: 0, y: 60, rotateX: -20 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power4.out',
        },
        '-=0.3'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        ctaRef.current ? Array.from(ctaRef.current.querySelectorAll('a, button')) : [],
        { opacity: 0, y: 25, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'back.out(1.4)',
        },
        '-=0.3'
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      );
  }, []);

  const scrollToMenu = () => {
    const el = document.querySelector('#menu');
    if (el) {
      const lenis = (window as unknown as Record<string, unknown>).__lenis as { scrollTo: (target: Element, options: { offset: number }) => void } | undefined;
      if (lenis) lenis.scrollTo(el, { offset: -80 });
      else el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 70% 30%, #3f1921 0%, #2d1117 35%, #1a0a0f 65%, #0d0409 100%)',
      }}
    >
      {/* 3D Spice Canvas */}
      <SpiceCanvas />

      {/* Gradient vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 30% 50%, transparent 30%, rgba(13, 4, 9, 0.7) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Bottom fade to next section */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to bottom, transparent, #1a0a0f)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          paddingTop: '120px',
          paddingBottom: '80px',
        }}
      >
        <div style={{ maxWidth: '720px' }}>
          {/* Section number: editorial ── */}
          <div
            ref={badgeRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
              opacity: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                fontWeight: 300,
                color: 'rgba(244,187,68,0.45)',
                letterSpacing: '0.1em',
              }}
            >
              01
            </span>
            <div style={{ width: '48px', height: '1px', background: 'rgba(244,187,68,0.4)' }} />
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(253,246,236,0.35)',
              }}
            >
              Ottawa · Since 2004
            </span>
          </div>

          {/* Tagline */}
          <p
            ref={taglineRef}
            style={{
              color: 'rgba(253, 246, 236, 0.45)',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
              opacity: 0,
            }}
          >
            Authentic Cuisine of India
          </p>

          {/* Hero Title */}
          <h1
            ref={titleRef}
            className="text-hero"
            style={{
              marginBottom: '1.5rem',
              perspective: '1000px',
            }}
          >
            <span
              className="hero-word"
              style={{
                display: 'inline-block',
                color: '#fdf6ec',
                opacity: 0,
              }}
            >
              A&nbsp;
            </span>
            <span
              className="hero-word"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #F4BB44 0%, #f7cc6b 50%, #d4a012 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                opacity: 0,
              }}
            >
              Royal&nbsp;
            </span>
            <span
              className="hero-word"
              style={{
                display: 'block',
                color: '#fdf6ec',
                opacity: 0,
              }}
            >
              Feast Awaits.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            style={{
              color: 'rgba(253, 246, 236, 0.65)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: 1.7,
              maxWidth: '540px',
              marginBottom: '2.5rem',
              opacity: 0,
            }}
          >
            Experience centuries of culinary tradition elevated to modern
            perfection. From the tandoor to your table — every dish at Palki is
            a journey through the soul of India.
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}
          >
            <a
              href="tel:+16131234567"
              className="btn btn-primary"
              style={{ fontSize: '0.88rem', padding: '1rem 2.2rem' }}
            >
              Reserve a Table
            </a>
            <button
              onClick={scrollToMenu}
              className="btn btn-outline"
              style={{ fontSize: '0.88rem', padding: '1rem 2.2rem' }}
            >
              View Our Menu
            </button>
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2.5rem',
              marginTop: '3.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(244, 187, 68, 0.15)',
            }}
          >
            {[
              { number: '20+', label: 'Years of Excellence' },
              { number: '150', label: 'Banquet Capacity' },
              { number: '500+', label: 'Five-Star Reviews' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-display"
                  style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#F4BB44',
                    lineHeight: 1,
                    marginBottom: '0.25rem',
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'rgba(253, 246, 236, 0.5)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        onClick={scrollToMenu}
        className="animate-scroll-bounce"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          opacity: 0,
        }}
      >
        <span
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(244, 187, 68, 0.6)',
          }}
        >
          Explore
        </span>
        <ChevronDown size={20} color="rgba(244, 187, 68, 0.6)" />
      </div>
    </section>
  );
}
