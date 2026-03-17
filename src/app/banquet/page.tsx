'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import { banquetPackages, banquetAmenities, eventTypes } from '@/data/banquet';
import { Check, Sparkles, ArrowLeft, Phone, Mail, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Package Card ─────────────────────────────────────────── */
function PackageCard({ pkg, index }: { pkg: (typeof banquetPackages)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 0.8,
        ease: 'power3.out',
        delay: index * 0.15,
        scrollTrigger: { trigger: cardRef.current, start: 'top 85%', once: true },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      style={{
        position: 'relative',
        borderRadius: '20px',
        border: pkg.highlighted
          ? `2px solid ${pkg.color}`
          : '1px solid rgba(244, 187, 68, 0.15)',
        background: pkg.highlighted
          ? 'linear-gradient(135deg, rgba(63, 25, 33, 0.9) 0%, rgba(45, 17, 23, 0.95) 100%)'
          : 'linear-gradient(135deg, rgba(45, 17, 23, 0.7) 0%, rgba(26, 10, 15, 0.9) 100%)',
        padding: pkg.highlighted ? '2.5rem 2rem' : '2rem',
        opacity: 0,
        boxShadow: pkg.highlighted
          ? `0 0 60px rgba(192, 192, 192, 0.08), 0 20px 60px rgba(0,0,0,0.4)`
          : '0 10px 30px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(16px)',
        transition: 'transform 0.3s ease',
        transform: pkg.highlighted ? 'scale(1.03)' : 'scale(1)',
      }}
    >
      {/* Popular badge */}
      {pkg.highlighted && (
        <div
          style={{
            position: 'absolute',
            top: '-14px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #F4BB44, #d4a012)',
            color: '#1a0a0f',
            fontSize: '0.7rem',
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '0.3rem 1rem',
            borderRadius: '100px',
            whiteSpace: 'nowrap',
          }}
        >
          ✦ Most Popular
        </div>
      )}

      {/* Package name */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: pkg.color,
            marginBottom: '0.3rem',
          }}
        >
          {pkg.id.toUpperCase()} Package
        </p>
        <h3
          className="font-display"
          style={{ fontSize: '2rem', fontWeight: 700, color: '#fdf6ec', lineHeight: 1 }}
        >
          {pkg.name}
        </h3>
        <p style={{ color: 'rgba(253, 246, 236, 0.5)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
          {pkg.tagline}
        </p>
      </div>

      {/* Price */}
      <div style={{ marginBottom: '1.75rem', paddingBottom: '1.75rem', borderBottom: `1px solid rgba(244, 187, 68, 0.12)` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
          <span className="font-display" style={{ fontSize: '3rem', fontWeight: 700, color: pkg.color, lineHeight: 1 }}>
            ${pkg.pricePerPerson}
          </span>
          <span style={{ color: 'rgba(253, 246, 236, 0.45)', fontSize: '0.85rem' }}>/ person</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.4rem' }}>
          <Users size={13} color="rgba(253, 246, 236, 0.4)" />
          <span style={{ color: 'rgba(253, 246, 236, 0.45)', fontSize: '0.78rem' }}>
            {pkg.minGuests} – {pkg.maxGuests} guests
          </span>
        </div>
      </div>

      {/* Features */}
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem' }}>
        {pkg.features.map((feature) => (
          <li key={feature} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <Check size={14} color={pkg.color} style={{ marginTop: '3px', flexShrink: 0 }} />
            <span style={{ color: 'rgba(253, 246, 236, 0.7)', fontSize: '0.875rem', lineHeight: 1.4 }}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#inquiry-form"
        className="btn"
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          background: pkg.highlighted
            ? 'linear-gradient(135deg, #F4BB44, #d4a012)'
            : 'transparent',
          color: pkg.highlighted ? '#1a0a0f' : pkg.color,
          border: pkg.highlighted ? 'none' : `1.5px solid ${pkg.color}`,
          fontWeight: 700,
        }}
      >
        Select {pkg.name}
      </a>
    </div>
  );
}

/* ─── Inquiry Form ─────────────────────────────────────────── */
function InquiryForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', eventType: '', date: '',
    guestCount: '', dietary: '', message: '', package: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'rgba(244, 187, 68, 0.06)',
          border: '1px solid rgba(244, 187, 68, 0.25)',
          borderRadius: '20px',
        }}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'rgba(244, 187, 68, 0.15)',
            border: '2px solid #F4BB44',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}
        >
          <Check size={32} color="#F4BB44" />
        </div>
        <h3 className="font-display" style={{ fontSize: '2rem', color: '#fdf6ec', marginBottom: '0.75rem' }}>
          Thank You, {form.name.split(' ')[0]}!
        </h3>
        <p style={{ color: 'rgba(253, 246, 236, 0.6)', lineHeight: 1.7, maxWidth: '440px', margin: '0 auto 2rem' }}>
          Your inquiry has been received. Our events team will be in touch within{' '}
          <strong style={{ color: '#F4BB44' }}>24 hours</strong> to discuss your event.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-outline">Back to Home</Link>
          <a href="tel:+16131234567" className="btn btn-primary">
            <Phone size={16} />
            Call Us Now
          </a>
        </div>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.95rem 1rem',
    background: 'rgba(45, 17, 23, 0.6)',
    border: '1px solid rgba(244, 187, 68, 0.2)',
    borderRadius: '10px',
    color: '#fdf6ec',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    fontFamily: 'inherit',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.4rem',
    color: 'rgba(253, 246, 236, 0.55)',
    fontSize: '0.78rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  };

  return (
    <form
      id="inquiry-form"
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
    >
      {/* Name + Email */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle} htmlFor="name">Full Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = '#F4BB44')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(244, 187, 68, 0.2)')}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="email">Email Address *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = '#F4BB44')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(244, 187, 68, 0.2)')}
          />
        </div>
      </div>

      {/* Phone + Package */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle} htmlFor="phone">Phone Number *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="(613) 000-0000"
            value={form.phone}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = '#F4BB44')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(244, 187, 68, 0.2)')}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="package">Preferred Package</label>
          <select
            id="package"
            name="package"
            value={form.package}
            onChange={handleChange}
            style={{ ...inputStyle, WebkitAppearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23F4BB44' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', paddingRight: '3rem' }}
            onFocus={(e) => (e.target.style.borderColor = '#F4BB44')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(244, 187, 68, 0.2)')}
          >
            <option value="" style={{ background: '#2d1117' }}>No preference</option>
            {banquetPackages.map((p) => (
              <option key={p.id} value={p.id} style={{ background: '#2d1117' }}>
                {p.name} Package — ${p.pricePerPerson}/person
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Event Type + Date */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle} htmlFor="eventType">Event Type *</label>
          <select
            id="eventType"
            name="eventType"
            required
            value={form.eventType}
            onChange={handleChange}
            style={{ ...inputStyle, WebkitAppearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23F4BB44' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', paddingRight: '3rem' }}
            onFocus={(e) => (e.target.style.borderColor = '#F4BB44')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(244, 187, 68, 0.2)')}
          >
            <option value="" style={{ background: '#2d1117' }}>Select event type</option>
            {eventTypes.map((et) => (
              <option key={et.id} value={et.id} style={{ background: '#2d1117' }}>{et.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle} htmlFor="date">Preferred Date *</label>
          <input
            id="date"
            name="date"
            type="date"
            required
            value={form.date}
            onChange={handleChange}
            style={{ ...inputStyle, colorScheme: 'dark' }}
            onFocus={(e) => (e.target.style.borderColor = '#F4BB44')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(244, 187, 68, 0.2)')}
          />
        </div>
      </div>

      {/* Guest Count + Dietary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle} htmlFor="guestCount">Estimated Guests *</label>
          <input
            id="guestCount"
            name="guestCount"
            type="number"
            min="10"
            max="200"
            required
            placeholder="e.g. 80"
            value={form.guestCount}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = '#F4BB44')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(244, 187, 68, 0.2)')}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="dietary">Dietary Requirements</label>
          <input
            id="dietary"
            name="dietary"
            type="text"
            placeholder="e.g. Halal, Vegetarian, GF"
            value={form.dietary}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = '#F4BB44')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(244, 187, 68, 0.2)')}
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label style={labelStyle} htmlFor="message">Tell Us About Your Event</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Share your vision, special requests, or any questions..."
          value={form.message}
          onChange={handleChange}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }}
          onFocus={(e) => (e.target.style.borderColor = '#F4BB44')}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(244, 187, 68, 0.2)')}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary"
        style={{
          justifyContent: 'center',
          fontSize: '0.95rem',
          padding: '1.1rem 2rem',
          opacity: loading ? 0.7 : 1,
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        <Sparkles size={16} />
        {loading ? 'Sending Inquiry...' : 'Submit Inquiry'}
      </button>

      <p style={{ color: 'rgba(253, 246, 236, 0.35)', fontSize: '0.75rem', textAlign: 'center' }}>
        We respond within 24 hours. No commitment required.
      </p>
    </form>
  );
}

/* ─── Page ────────────────────────────────────────────────── */
export default function BanquetPage() {
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
    <SmoothScrollProvider>
      <Navbar />
      <main>

        {/* Hero */}
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
            {/* Back link */}
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

            <p className="hero-item" style={{ color: '#F4BB44', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem', opacity: 0 }}>
              Events & Celebrations
            </p>
            <h1 className="hero-item text-display" style={{ color: '#fdf6ec', marginBottom: '1rem', opacity: 0 }}>
              The <span className="text-gold-gradient">Grand Banquet</span>
              <br />
              Hall at Palki
            </h1>
            <p className="hero-item" style={{ color: 'rgba(253, 246, 236, 0.6)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, maxWidth: '580px', marginBottom: '2rem', opacity: 0 }}>
              Ottawa&apos;s most distinguished Indian banquet experience. From intimate
              gatherings of 30 to grand celebrations of 150 — every event crafted to perfection.
            </p>
            <div className="hero-item" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', opacity: 0 }}>
              <a href="#inquiry-form" className="btn btn-primary">
                <Sparkles size={16} />
                Get a Quote
              </a>
              <a href="tel:+16131234567" className="btn btn-outline">
                <Phone size={16} />
                (613) 123-4567
              </a>
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section className="section" style={{ background: '#0d0409' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 className="text-section-title" style={{ color: '#fdf6ec' }}>
                World-Class <span className="text-gold-gradient">Amenities</span>
              </h2>
              <div className="gold-line" style={{ margin: '1rem auto 0' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {banquetAmenities.map((amenity) => (
                <div
                  key={amenity.title}
                  className="glass-card"
                  style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
                >
                  <div style={{ fontSize: '1.75rem', lineHeight: 1, flexShrink: 0 }}>{amenity.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#fdf6ec', marginBottom: '0.3rem' }}>{amenity.title}</div>
                    <p style={{ color: 'rgba(253, 246, 236, 0.5)', fontSize: '0.85rem', lineHeight: 1.6 }}>{amenity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Placeholder */}
        <section className="section" style={{ background: 'linear-gradient(180deg, #0d0409, #1a0a0f)', paddingBottom: '3rem' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h2 className="text-section-title" style={{ color: '#fdf6ec' }}>
                Our <span className="text-gold-gradient">Venue</span>
              </h2>
              <div className="gold-line" style={{ margin: '1rem auto 0' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {['Main Hall', 'Décor Setup', 'Live Tandoor', 'Private Dining', 'Cocktail Area', 'Bridal Table'].map((label, i) => (
                <div
                  key={label}
                  style={{
                    aspectRatio: i === 0 ? '2 / 1' : '4 / 3',
                    gridColumn: i === 0 ? 'span 2' : 'span 1',
                    background: 'linear-gradient(135deg, rgba(45,17,23,0.8), rgba(26,10,15,0.9))',
                    border: '1px solid rgba(244, 187, 68, 0.15)',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    color: 'rgba(244, 187, 68, 0.4)',
                    cursor: 'default',
                    transition: 'border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(244, 187, 68, 0.35)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(244, 187, 68, 0.15)')}
                >
                  <span style={{ fontSize: '1.5rem' }}>🖼️</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
                  <span style={{ fontSize: '0.65rem', color: 'rgba(244, 187, 68, 0.25)' }}>Photo coming soon</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="section" style={{ background: 'linear-gradient(180deg, #1a0a0f, #0d0409)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p style={{ color: '#F4BB44', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Tailored to Your Vision
              </p>
              <h2 className="text-section-title" style={{ color: '#fdf6ec' }}>
                Event <span className="text-gold-gradient">Packages</span>
              </h2>
              <div className="gold-line" style={{ margin: '1rem auto 0' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
              {banquetPackages.map((pkg, i) => (
                <PackageCard key={pkg.id} pkg={pkg} index={i} />
              ))}
            </div>
            <p style={{ textAlign: 'center', color: 'rgba(253, 246, 236, 0.35)', fontSize: '0.8rem', marginTop: '2rem' }}>
              All packages are customizable. Pricing is per person and excludes tax & gratuity.
            </p>
          </div>
        </section>

        {/* Inquiry Form Section */}
        <section className="section" style={{ background: '#0d0409' }}>
          <div className="container" style={{ maxWidth: '780px' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p style={{ color: '#F4BB44', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Let&apos;s Create Something Extraordinary
              </p>
              <h2 className="text-section-title" style={{ color: '#fdf6ec' }}>
                Plan Your <span className="text-gold-gradient">Event</span>
              </h2>
              <div className="gold-line" style={{ margin: '1rem auto 1.5rem' }} />
              <p style={{ color: 'rgba(253, 246, 236, 0.55)', lineHeight: 1.7 }}>
                Fill in the details below and our dedicated events team will reach out within 24 hours
                to begin crafting your unforgettable celebration.
              </p>
            </div>

            <div
              style={{
                background: 'linear-gradient(135deg, rgba(45,17,23,0.6), rgba(26,10,15,0.8))',
                border: '1px solid rgba(244, 187, 68, 0.2)',
                borderRadius: '20px',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <InquiryForm />
            </div>

            {/* Direct contact */}
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
              <a href="tel:+16131234567" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(253, 246, 236, 0.5)', fontSize: '0.85rem', textDecoration: 'none' }}>
                <Phone size={14} color="#F4BB44" />
                (613) 123-4567
              </a>
              <a href="mailto:events@palki.ca" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(253, 246, 236, 0.5)', fontSize: '0.85rem', textDecoration: 'none' }}>
                <Mail size={14} color="#F4BB44" />
                events@palki.ca
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
