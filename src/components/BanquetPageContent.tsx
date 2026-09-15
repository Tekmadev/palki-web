'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, Car, Check, Mail, Mic2, Phone, Plus, Sparkles, Users, UtensilsCrossed } from 'lucide-react';
import QuoteForm, { presetQuote } from '@/components/QuoteForm';
import { business } from '@/data/business';
import {
  banquetFaqs,
  banquetPackages,
  formatPrice,
  packageInclusions,
  type PackageInclusion,
} from '@/data/banquet';

gsap.registerPlugin(ScrollTrigger);

const { minGuests, maxGuests } = business.banquet;
const startingPrice = formatPrice(Math.min(...banquetPackages.map((p) => p.pricePerPerson)));

const inclusionIcons: Record<PackageInclusion['icon'], React.ReactNode> = {
  guests:      <Users size={18} />,
  buffet:      <UtensilsCrossed size={18} />,
  decorations: <Sparkles size={18} />,
  stage:       <Mic2 size={18} />,
  parking:     <Car size={18} />,
};

const eyebrowStyle: React.CSSProperties = {
  color: '#F4BB44',
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  marginBottom: '0.75rem',
};

function SectionHeader({ eyebrow, title, highlight, children }: {
  eyebrow?: string;
  title: string;
  highlight: string;
  children?: React.ReactNode;
}) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
      {eyebrow && <p style={eyebrowStyle}>{eyebrow}</p>}
      <h2 className="text-section-title" style={{ color: '#fdf6ec' }}>
        {title} <span className="text-gold-gradient">{highlight}</span>
      </h2>
      <div className="gold-line" style={{ margin: children ? '1rem auto 1.5rem' : '1rem auto 0' }} />
      {children}
    </div>
  );
}

/** Fades an element up the first time it scrolls into view. */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!ref.current) return;
    const tween = gsap.fromTo(
      ref.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      }
    );
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);
  return ref;
}

/* ─── Hero ─────────────────────────────────────────────────── */
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    gsap.fromTo(
      heroRef.current.querySelectorAll('.hero-item'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  return (
    <section
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        background: 'radial-gradient(ellipse at 60% 40%, #3f1921 0%, #2d1117 40%, #0d0409 100%)',
        padding: '140px 1.5rem 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative orb */}
      <div style={{ position: 'absolute', top: '20%', right: '10%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(244,187,68,0.08), transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" ref={heroRef}>
        <Link
          href="/"
          className="hero-item"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'rgba(253, 246, 236, 0.5)',
            fontSize: '0.82rem',
            textDecoration: 'none',
            marginBottom: '2rem',
            letterSpacing: '0.06em',
            opacity: 0,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#F4BB44')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(253, 246, 236, 0.5)')}
        >
          <ArrowLeft size={14} />
          Back to Palki
        </Link>

        <p className="hero-item" style={{ ...eyebrowStyle, opacity: 0 }}>
          Banquets & Catering
        </p>
        <h1 className="hero-item text-display" style={{ color: '#fdf6ec', marginBottom: '1rem', opacity: 0 }}>
          <span className="text-gold-gradient">Banquet Hall</span> & Catering{' '}
          <br />
          in Ottawa
        </h1>
        <p className="hero-item" style={{ color: 'rgba(253, 246, 236, 0.6)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, maxWidth: '600px', marginBottom: '2rem', opacity: 0 }}>
          Host your wedding, party or corporate event at Palki for {minGuests} to {maxGuests} guests,
          with packages from {startingPrice} per person plus tax. Having it somewhere else? We cater
          too. Send a free quote request. Nothing is booked until we&apos;ve talked it through.
        </p>
        <div className="hero-item" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', opacity: 0 }}>
          <a href="#quote" className="btn btn-primary">
            <Sparkles size={16} />
            Get a Free Quote
          </a>
          <a href={business.phone.tel} className="btn btn-outline">
            <Phone size={16} />
            {business.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Packages ─────────────────────────────────────────────── */
function Packages() {
  const blockRef = useReveal<HTMLDivElement>();

  return (
    <section id="packages" className="section" style={{ background: 'linear-gradient(180deg, #1a0a0f, #0d0409)' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <SectionHeader eyebrow="Simple Pricing" title="Banquet" highlight="Packages" />

        <div
          ref={blockRef}
          style={{
            opacity: 0,
            borderRadius: '20px',
            border: '1px solid rgba(244, 187, 68, 0.2)',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          }}
        >
          {/* 1px gap + tinted background draws the divider between packages, side by side or stacked */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '1px', background: 'rgba(244, 187, 68, 0.15)' }}>
            {banquetPackages.map((pkg) => (
              <article
                key={pkg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  padding: 'clamp(1.75rem, 4vw, 2.5rem)',
                  background: 'linear-gradient(135deg, #2d1117 0%, #1a0a0f 100%)',
                }}
              >
                <h3 className="font-display" style={{ fontSize: '2.25rem', fontWeight: 700, color: pkg.color, lineHeight: 1 }}>
                  {pkg.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.25rem 0.4rem' }}>
                  <span className="font-display" style={{ fontSize: '3rem', fontWeight: 700, color: '#fdf6ec', lineHeight: 1 }}>
                    {formatPrice(pkg.pricePerPerson)}
                  </span>
                  <span style={{ color: 'rgba(253, 246, 236, 0.5)', fontSize: '0.85rem' }}>/ person + tax</span>
                </div>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fdf6ec', fontWeight: 600 }}>
                  <Check size={16} color={pkg.color} style={{ flexShrink: 0 }} />
                  {pkg.itemsPerCourse} items per course
                </p>
                <a
                  href="#quote"
                  onClick={() => presetQuote({ service: 'banquet', package: pkg.id })}
                  aria-label={`Get a quote for the ${pkg.name} package`}
                  className="btn btn-outline"
                  style={{ justifyContent: 'center', marginTop: 'auto', color: pkg.color, borderColor: pkg.color }}
                >
                  Get a Quote
                </a>
              </article>
            ))}
          </div>

          {/* Included with both */}
          <div style={{ borderTop: '1px solid rgba(244, 187, 68, 0.15)', padding: 'clamp(1.5rem, 4vw, 2rem)', background: '#1a0a0f' }}>
            <h3 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(244, 187, 68, 0.7)', marginBottom: '1.25rem' }}>
              Included with both packages
            </h3>
            <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(150px, 100%), 1fr))', gap: '1rem' }}>
              {packageInclusions.map((item) => (
                <li key={item.icon} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', color: 'rgba(253, 246, 236, 0.8)', fontSize: '0.9rem' }}>
                  <span
                    aria-hidden="true"
                    style={{
                      width: '36px',
                      height: '36px',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#F4BB44',
                      background: 'rgba(244, 187, 68, 0.1)',
                      border: '1px solid rgba(244, 187, 68, 0.2)',
                      clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                    }}
                  >
                    {inclusionIcons[item.icon]}
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(253, 246, 236, 0.35)', fontSize: '0.8rem', marginTop: '2rem' }}>
          Prices are per person, plus tax.
        </p>
      </div>
    </section>
  );
}

/* ─── Catering ─────────────────────────────────────────────── */
const cateringSteps = [
  'Pick your dishes from our menu',
  'Send us a quote request or give us a call',
  'We go over the details and confirm your price',
];

function Catering() {
  const cardRef = useReveal<HTMLDivElement>();

  return (
    <section id="catering" className="section" style={{ background: '#0d0409' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 'clamp(2.5rem, 6vw, 5rem)', alignItems: 'center' }}>
          <div>
            <p style={eyebrowStyle}>Catering</p>
            <h2 className="text-section-title" style={{ color: '#fdf6ec' }}>
              Indian <span className="text-gold-gradient">Catering</span> for Your Event
            </h2>
            <div className="gold-line" style={{ margin: '1rem 0 1.5rem' }} />
            <p style={{ color: 'rgba(253, 246, 236, 0.6)', lineHeight: 1.8, maxWidth: '480px' }}>
              Having your event somewhere else? Order from our menu and we&apos;ll prepare it for your
              event. Catering is priced by quote, so tell us your date, guest count and location and
              we&apos;ll put one together for you.
            </p>
          </div>

          <div
            ref={cardRef}
            className="glass-card"
            style={{ opacity: 0, padding: 'clamp(1.5rem, 4vw, 2.25rem)' }}
          >
            <h3 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(244, 187, 68, 0.7)', marginBottom: '1.25rem' }}>
              How catering works
            </h3>
            <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
              {cateringSteps.map((step, i) => (
                <li key={step} style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                  <span className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'rgba(244, 187, 68, 0.5)', lineHeight: 1, minWidth: '1.75rem' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ color: 'rgba(253, 246, 236, 0.8)', lineHeight: 1.5 }}>{step}</span>
                </li>
              ))}
            </ol>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href="#quote"
                onClick={() => presetQuote({ service: 'catering' })}
                className="btn btn-primary"
                style={{ justifyContent: 'center', whiteSpace: 'normal' }}
              >
                <Sparkles size={16} />
                Get a Catering Quote
              </a>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(150px, 100%), 1fr))', gap: '0.75rem' }}>
                <Link href="/menu" className="btn btn-outline" style={{ justifyContent: 'center' }}>
                  Our Menu
                  <ArrowRight size={14} />
                </Link>
                <a href={business.phone.tel} className="btn btn-outline" style={{ justifyContent: 'center' }}>
                  <Phone size={14} />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Quote request ────────────────────────────────────────── */
function Quote() {
  return (
    <section id="quote" className="section" style={{ background: 'linear-gradient(180deg, #0d0409, #1a0a0f)' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        <SectionHeader eyebrow="Free · No Obligation" title="Request a Free" highlight="Quote">
          <p style={{ color: 'rgba(253, 246, 236, 0.55)', lineHeight: 1.7 }}>
            Tell us about your event and we&apos;ll get back to you with a quote. This is a request,
            not a booking. Nothing is confirmed until we&apos;ve talked it through together.
          </p>
        </SectionHeader>

        <div
          style={{
            background: 'linear-gradient(135deg, rgba(45,17,23,0.6), rgba(26,10,15,0.8))',
            border: '1px solid rgba(244, 187, 68, 0.2)',
            borderRadius: '20px',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <QuoteForm />
        </div>

        {/* Direct contact */}
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
          <a href={business.phone.tel} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(253, 246, 236, 0.5)', fontSize: '0.85rem', textDecoration: 'none' }}>
            <Phone size={14} color="#F4BB44" />
            {business.phone.display}
          </a>
          <a href={`mailto:${business.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(253, 246, 236, 0.5)', fontSize: '0.85rem', textDecoration: 'none' }}>
            <Mail size={14} color="#F4BB44" />
            {business.email}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ──────────────────────────────────────────────────── */
function Faq() {
  return (
    <section id="faq" className="section" style={{ background: 'linear-gradient(180deg, #1a0a0f, #0d0409)' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        <SectionHeader title="Frequently Asked" highlight="Questions" />
        <div style={{ borderTop: '1px solid rgba(244, 187, 68, 0.12)' }}>
          {banquetFaqs.map((faq) => (
            <details key={faq.question} className="faq-item">
              <summary>
                <h3>{faq.question}</h3>
                <Plus size={18} className="faq-icon" aria-hidden="true" />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BanquetPageContent() {
  return (
    <>
      <Hero />
      <Packages />
      <Catering />
      <Quote />
      <Faq />
    </>
  );
}
