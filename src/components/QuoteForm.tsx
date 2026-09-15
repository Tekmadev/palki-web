'use client';

import { useEffect, useRef, useState, useSyncExternalStore, useTransition } from 'react';
import Link from 'next/link';
import { Check, Phone, Sparkles } from 'lucide-react';
import { requestQuote, type QuoteField, type QuoteResult } from '@/app/banquet/actions';
import { business } from '@/data/business';
import {
  eventTypes,
  foodOptions,
  mealOptions,
  packageChoices,
  serviceOptions,
  type PackageId,
  type ServiceType,
} from '@/data/banquet';

const PRESET_EVENT = 'palki:quote-preset';

interface QuotePreset {
  service: ServiceType;
  package?: PackageId;
}

/** Pre-fills the quote form, e.g. when someone clicks a package's "Get a quote" button. */
export function presetQuote(preset: QuotePreset) {
  window.dispatchEvent(new CustomEvent<QuotePreset>(PRESET_EVENT, { detail: preset }));
}

const emptyForm = {
  service: 'banquet' as ServiceType,
  name: '', phone: '', email: '', eventType: '', date: '', guests: '',
  package: '', location: '', meal: '', food: '', dietary: '', message: '',
};

type TextField = Exclude<keyof typeof emptyForm, 'service' | 'package'>;

const SEND_FAILED = `Sorry, we couldn't send your request. Please try again, or call us at ${business.phone.display}.`;

const twoColumns: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
  gap: '1rem',
};

// The browser's local date, used as the date picker's minimum. The server render has no
// "today" to offer, so it renders without one and the client fills it in after hydration.
const subscribeToNothing = () => () => {};
const localToday = () => {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
};

function Field({ id, label, hint, error, children }: {
  id: TextField;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="field-label" htmlFor={`quote-${id}`}>{label}</label>
      {children}
      {hint && <p id={`quote-${id}-hint`} className="field-hint">{hint}</p>}
      {error && <p id={`quote-${id}-error`} className="field-error">{error}</p>}
    </div>
  );
}

export default function QuoteForm() {
  const [form, setForm] = useState(emptyForm);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const minDate = useSyncExternalStore(subscribeToNothing, localToday, () => undefined);
  const successRef = useRef<HTMLHeadingElement>(null);

  const { minGuests, maxGuests } = business.banquet;
  const isCatering = form.service === 'catering';
  const errors = result?.fieldErrors ?? {};

  useEffect(() => {
    const applyPreset = (event: Event) => {
      const { service, package: pkg } = (event as CustomEvent<QuotePreset>).detail;
      setForm((current) => ({ ...current, service, package: pkg ?? current.package }));
    };
    window.addEventListener(PRESET_EVENT, applyPreset);
    return () => window.removeEventListener(PRESET_EVENT, applyPreset);
  }, []);

  useEffect(() => {
    if (result?.status === 'success') successRef.current?.focus();
  }, [result]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (result?.fieldErrors?.[name as QuoteField]) {
      setResult({ ...result, fieldErrors: { ...result.fieldErrors, [name]: undefined } });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        setResult(await requestQuote(formData));
      } catch {
        setResult({ status: 'error', message: SEND_FAILED });
      }
    });
  };

  /** Props shared by every text input, select and textarea. */
  const fieldProps = (name: TextField, hasHint = false) => ({
    id: `quote-${name}`,
    name,
    value: form[name],
    onChange: handleChange,
    className: 'field-input',
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': [hasHint && `quote-${name}-hint`, errors[name] && `quote-${name}-error`]
      .filter(Boolean).join(' ') || undefined,
  });

  if (result?.status === 'success') {
    const firstName = form.name.trim().split(' ')[0];
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
        <h3
          ref={successRef}
          tabIndex={-1}
          className="font-display"
          style={{ fontSize: '2rem', color: '#fdf6ec', marginBottom: '0.75rem', outline: 'none' }}
        >
          Thank You{firstName ? `, ${firstName}` : ''}!
        </h3>
        <p style={{ color: 'rgba(253, 246, 236, 0.6)', lineHeight: 1.7, maxWidth: '460px', margin: '0 auto 1rem' }}>
          Your quote request has been sent. We&apos;ll contact you soon to go over the details and put
          your quote together.
        </p>
        <p style={{ color: 'rgba(253, 246, 236, 0.45)', fontSize: '0.85rem', lineHeight: 1.6, maxWidth: '460px', margin: '0 auto 2rem' }}>
          Nothing is booked yet. Your date is only confirmed once we&apos;ve agreed on the details with you.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-outline">Back to Home</Link>
          <a href={business.phone.tel} className="btn btn-primary">
            <Phone size={16} />
            Call Us
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      id="quote-form"
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}
    >
      {/* Service */}
      <fieldset className="field-set">
        <legend className="field-label">What do you need? *</legend>
        <div className="choice-group">
          {serviceOptions.map((option) => (
            <label key={option.id} className="choice">
              <input
                type="radio"
                name="service"
                value={option.id}
                checked={form.service === option.id}
                onChange={handleChange}
                required
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Name + Phone */}
      <div style={twoColumns}>
        <Field id="name" label="Full Name *" error={errors.name}>
          <input type="text" required maxLength={100} autoComplete="name" placeholder="Your name" {...fieldProps('name')} />
        </Field>
        <Field id="phone" label="Phone Number *" error={errors.phone}>
          <input type="tel" required maxLength={30} autoComplete="tel" placeholder="(613) 000-0000" {...fieldProps('phone')} />
        </Field>
      </div>

      {/* Email + Event Type */}
      <div style={twoColumns}>
        <Field id="email" label="Email Address *" error={errors.email}>
          <input type="email" required maxLength={254} autoComplete="email" placeholder="your@email.com" {...fieldProps('email')} />
        </Field>
        <Field id="eventType" label="Event Type *" error={errors.eventType}>
          <select required {...fieldProps('eventType')}>
            <option value="">Select event type</option>
            {eventTypes.map((et) => (
              <option key={et.id} value={et.id}>{et.label}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* Date + Guests */}
      <div style={twoColumns}>
        <Field id="date" label="Event Date *" error={errors.date}>
          <input type="date" required min={minDate} {...fieldProps('date')} />
        </Field>
        <Field
          id="guests"
          label="Number of Guests *"
          hint={isCatering ? undefined : `Banquet packages are for ${minGuests}–${maxGuests} guests.`}
          error={errors.guests}
        >
          <input type="number" required min={1} inputMode="numeric" placeholder="e.g. 150" {...fieldProps('guests', !isCatering)} />
        </Field>
      </div>

      {/* Package (banquet) or location (catering) */}
      {isCatering ? (
        <Field id="location" label="Event Location *" hint="Venue name, address or city." error={errors.location}>
          <input type="text" required maxLength={200} placeholder="Where is the event?" {...fieldProps('location', true)} />
        </Field>
      ) : (
        <fieldset className="field-set">
          <legend className="field-label">Package</legend>
          <div className="choice-group">
            {packageChoices.map((option) => (
              <label key={option.id} className="choice">
                <input
                  type="radio"
                  name="package"
                  value={option.id}
                  checked={form.package === option.id}
                  onChange={handleChange}
                />
                {option.label}
                {option.detail && <span className="choice-detail">{option.detail}</span>}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {/* Meal + Food */}
      <div style={twoColumns}>
        <Field id="meal" label="Lunch or Dinner">
          <select {...fieldProps('meal')}>
            <option value="">Select</option>
            {mealOptions.map((option) => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </Field>
        <Field id="food" label="Food">
          <select {...fieldProps('food')}>
            <option value="">Select</option>
            {foodOptions.map((option) => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="dietary" label="Dietary Needs">
        <input type="text" maxLength={200} placeholder="e.g. Halal, vegan, nut allergy" {...fieldProps('dietary')} />
      </Field>

      <Field id="message" label="Anything Else?">
        <textarea rows={4} maxLength={2000} placeholder="Timing, special requests or questions..." {...fieldProps('message')} />
      </Field>

      {/* Honeypot: hidden from people, bots tend to fill it in */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor="quote-botcheck">Leave this field empty</label>
        <input id="quote-botcheck" name="botcheck" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {result && (
        <p
          role="alert"
          style={{
            padding: '0.85rem 1rem',
            borderRadius: '10px',
            background: 'rgba(248, 113, 113, 0.08)',
            border: '1px solid rgba(248, 113, 113, 0.35)',
            color: '#fca5a5',
            fontSize: '0.875rem',
            lineHeight: 1.5,
          }}
        >
          {result.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="btn btn-primary"
        style={{
          justifyContent: 'center',
          whiteSpace: 'normal',
          fontSize: '0.85rem',
          padding: '1.1rem 1.5rem',
          opacity: isPending ? 0.7 : 1,
          cursor: isPending ? 'not-allowed' : 'pointer',
        }}
      >
        <Sparkles size={16} />
        {isPending ? 'Sending...' : 'Get My Free Quote'}
      </button>

      <p style={{ color: 'rgba(253, 246, 236, 0.35)', fontSize: '0.75rem', textAlign: 'center' }}>
        Free and no obligation. Nothing is booked until we&apos;ve talked it through with you.
      </p>
    </form>
  );
}
