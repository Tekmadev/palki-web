'use client';

import Link from 'next/link';
import { Phone, MapPin, Clock, Instagram, Facebook, UtensilsCrossed } from 'lucide-react';

const hours = [
  { day: 'Monday – Thursday', time: '11:30 AM – 9:30 PM' },
  { day: 'Friday', time: '11:30 AM – 10:30 PM' },
  { day: 'Saturday', time: '12:00 PM – 10:30 PM' },
  { day: 'Sunday', time: '12:00 PM – 9:00 PM' },
];

const footerLinks = {
  Explore: [
    { label: 'Our Menu', href: '#menu' },
    { label: 'Banquet Hall', href: '/banquet' },
    { label: 'About Palki', href: '#about' },
    { label: 'Reviews', href: '#reviews' },
  ],
  Events: [
    { label: 'Plan an Event', href: '/banquet' },
    { label: 'Weddings', href: '/banquet#weddings' },
    { label: 'Corporate Events', href: '/banquet#corporate' },
    { label: 'Private Dining', href: '#contact' },
  ],
};

export default function Footer() {
  const scrollTo = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        const lenis = (window as unknown as Record<string, unknown>).__lenis as { scrollTo: (target: Element, options: { offset: number }) => void } | undefined;
        if (lenis) lenis.scrollTo(el, { offset: -80 });
        else el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      id="contact"
      style={{
        background: '#0d0409',
        borderTop: '1px solid rgba(244, 187, 68, 0.15)',
        padding: '4rem 1.5rem 2rem',
      }}
    >
      <div className="container">
        {/* Top Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #F4BB44, #d4a012)',
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
                  style={{ fontSize: '1.5rem', fontWeight: 600, color: '#F4BB44', lineHeight: 1 }}
                >
                  Palki
                </div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(253, 246, 236, 0.4)', lineHeight: 1, marginTop: '2px' }}>
                  Cuisine of India
                </div>
              </div>
            </div>
            <p style={{ color: 'rgba(253, 246, 236, 0.5)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Serving Ottawa&apos;s finest authentic Indian cuisine since 2004. Where every meal is a celebration.
            </p>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { icon: <Instagram size={18} />, href: 'https://instagram.com/palki_ottawa', label: 'Instagram' },
                { icon: <Facebook size={18} />, href: 'https://facebook.com/palki.ottawa', label: 'Facebook' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(244, 187, 68, 0.1)',
                    border: '1px solid rgba(244, 187, 68, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(253, 246, 236, 0.6)',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(244, 187, 68, 0.2)';
                    (e.currentTarget as HTMLElement).style.color = '#F4BB44';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(244, 187, 68, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(244, 187, 68, 0.1)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(253, 246, 236, 0.6)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(244, 187, 68, 0.2)';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                style={{
                  color: '#F4BB44',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                {category}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('#') ? (
                      <button
                        onClick={() => scrollTo(link.href)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'rgba(253, 246, 236, 0.5)',
                          fontSize: '0.875rem',
                          transition: 'color 0.2s ease',
                          padding: 0,
                          textAlign: 'left',
                        }}
                        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fdf6ec')}
                        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(253, 246, 236, 0.5)')}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        style={{
                          color: 'rgba(253, 246, 236, 0.5)',
                          fontSize: '0.875rem',
                          textDecoration: 'none',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fdf6ec')}
                        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(253, 246, 236, 0.5)')}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact & Hours */}
          <div>
            <h4
              style={{
                color: '#F4BB44',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href="tel:+16131234567"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(253, 246, 236, 0.6)', fontSize: '0.875rem', textDecoration: 'none' }}
              >
                <Phone size={14} color="#F4BB44" />
                (613) 123-4567
              </a>
              <a
                href="https://maps.google.com/?q=Palki+Restaurant+Ottawa"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(253, 246, 236, 0.6)', fontSize: '0.875rem', textDecoration: 'none' }}
              >
                <MapPin size={14} color="#F4BB44" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>123 Bank Street, Ottawa, ON K1P 5N2</span>
              </a>
            </div>

            <h4
              style={{
                color: '#F4BB44',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginTop: '1.5rem',
                marginBottom: '0.75rem',
              }}
            >
              Hours
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {hours.map((h) => (
                <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <span style={{ color: 'rgba(253, 246, 236, 0.45)', fontSize: '0.78rem' }}>{h.day}</span>
                  <span style={{ color: 'rgba(253, 246, 236, 0.7)', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(244, 187, 68, 0.2), transparent)', marginBottom: '1.5rem' }} />

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <p style={{ color: 'rgba(253, 246, 236, 0.3)', fontSize: '0.78rem' }}>
            © {new Date().getFullYear()} Palki: Cuisine of India. All rights reserved.
          </p>
          <p style={{ color: 'rgba(253, 246, 236, 0.25)', fontSize: '0.75rem' }}>
            Designed & built by{' '}
            <a
              href="https://tekmadev.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(244, 187, 68, 0.5)', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#F4BB44')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(244, 187, 68, 0.5)')}
            >
              Tekmadev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
