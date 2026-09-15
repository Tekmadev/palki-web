'use server';

import { Resend } from 'resend';
import { business } from '@/data/business';
import {
  banquetPackages,
  eventTypes,
  foodOptions,
  formatPrice,
  mealOptions,
  packageChoices,
  serviceOptions,
  type Option,
} from '@/data/banquet';

export type QuoteField =
  | 'service' | 'name' | 'phone' | 'email' | 'eventType' | 'date' | 'guests'
  | 'package' | 'location' | 'meal' | 'food' | 'dietary' | 'message';

export interface QuoteResult {
  status: 'success' | 'invalid' | 'error';
  message?: string;
  fieldErrors?: Partial<Record<QuoteField, string>>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trimmed, length-capped form value. Single-line values also have line breaks collapsed. */
function field(formData: FormData, key: string, maxLength: number, multiline = false) {
  const value = String(formData.get(key) ?? '').slice(0, maxLength);
  return multiline ? value.trim() : value.replace(/\s+/g, ' ').trim();
}

const labelFor = (options: Option[], id: string) => options.find((o) => o.id === id)?.label;

/** Today's date (YYYY-MM-DD) in Ottawa, so a same-day request isn't rejected as "in the past". */
const todayInOttawa = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Toronto' }).format(new Date());

/** '2026-10-10' → e.g. 'Saturday, October 10, 2026'. Read as a calendar date, not a moment in time. */
const formatDate = (isoDate: string, options: Intl.DateTimeFormatOptions) =>
  new Date(`${isoDate}T12:00:00Z`).toLocaleDateString('en-CA', { ...options, timeZone: 'UTC' });

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const SEND_FAILED = `Sorry, we couldn't send your request. Please try again, or call us at ${business.phone.display}.`;

export async function requestQuote(formData: FormData): Promise<QuoteResult> {
  // Honeypot: hidden from people, so anything in it came from a bot. Pretend it worked.
  if (field(formData, 'botcheck', 100)) return { status: 'success' };

  const service = field(formData, 'service', 20);
  const name = field(formData, 'name', 100);
  const phone = field(formData, 'phone', 30);
  const email = field(formData, 'email', 254);
  const eventType = field(formData, 'eventType', 30);
  const date = field(formData, 'date', 10);
  const guests = Number(field(formData, 'guests', 6));
  const pkg = field(formData, 'package', 20);
  const location = field(formData, 'location', 200);
  const meal = field(formData, 'meal', 20);
  const food = field(formData, 'food', 20);
  const dietary = field(formData, 'dietary', 200);
  const message = field(formData, 'message', 2000, true);

  const errors: Partial<Record<QuoteField, string>> = {};
  const isCatering = service === 'catering';

  if (!labelFor(serviceOptions, service)) errors.service = 'Choose banquet hall or catering.';
  if (!name) errors.name = 'Please enter your name.';
  const phoneDigits = phone.replace(/\D/g, '').length;
  if (phoneDigits < 10 || phoneDigits > 15) errors.phone = 'Please enter a phone number we can call.';
  if (!EMAIL_PATTERN.test(email)) errors.email = 'Please enter a valid email address.';
  if (!labelFor(eventTypes, eventType)) errors.eventType = 'Choose the type of event.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) errors.date = 'Choose your event date.';
  else if (date < todayInOttawa()) errors.date = 'That date has already passed.';
  if (!Number.isInteger(guests) || guests < 1) errors.guests = 'Enter roughly how many guests you expect.';
  if (isCatering && !location) errors.location = 'Tell us where the event will be.';

  if (Object.keys(errors).length > 0) {
    return { status: 'invalid', message: 'Please check the highlighted fields.', fieldErrors: errors };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_EMAIL_TO?.split(',').map((address) => address.trim()).filter(Boolean);
  const from = process.env.QUOTE_EMAIL_FROM;
  if (!apiKey || !to?.length || !from) {
    console.error('Quote form: set RESEND_API_KEY, QUOTE_EMAIL_TO and QUOTE_EMAIL_FROM to send quote requests.');
    return { status: 'error', message: SEND_FAILED };
  }

  const eventLabel = labelFor(eventTypes, eventType)!;
  const selectedPackage = banquetPackages.find((p) => p.id === pkg);
  const packageLabel = selectedPackage
    ? `${selectedPackage.name} (${formatPrice(selectedPackage.pricePerPerson)}/person + tax, ${selectedPackage.itemsPerCourse} items per course)`
    : labelFor(packageChoices, pkg);

  // Optional answers are left out of the email when blank.
  const details: [string, string | undefined][] = [
    ['Service', labelFor(serviceOptions, service)],
    ['Name', name],
    ['Phone', phone],
    ['Email', email],
    ['Event type', eventLabel],
    ['Event date', formatDate(date, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })],
    ['Guests', String(guests)],
    ['Package', isCatering ? undefined : packageLabel],
    ['Event location', isCatering ? location : undefined],
    ['Lunch or dinner', labelFor(mealOptions, meal)],
    ['Food', labelFor(foodOptions, food)],
    ['Dietary needs', dietary || undefined],
    ['Notes', message || undefined],
  ];
  const rows = details.filter((row): row is [string, string] => Boolean(row[1]));

  const text = [
    'New quote request from the website.',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    `Reply to this email to respond to ${name} directly. Nothing has been booked yet.`,
  ].join('\n');

  const html = `
    <p>New quote request from the website.</p>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${rows.map(([label, value]) => `
        <tr>
          <td style="vertical-align:top;color:#666;white-space:nowrap">${label}</td>
          <td style="white-space:pre-line">${escapeHtml(value)}</td>
        </tr>`).join('')}
    </table>
    <p style="font-family:sans-serif;font-size:13px;color:#666">
      Reply to this email to respond to ${escapeHtml(name)} directly. Nothing has been booked yet.
    </p>`;

  const shortDate = formatDate(date, { month: 'short', day: 'numeric', year: 'numeric' });
  const subject = `${isCatering ? 'Catering' : 'Banquet'} quote request: ${eventLabel}, ${guests} guests, ${shortDate} (${name})`;

  try {
    const { error } = await new Resend(apiKey).emails.send({ from, to, replyTo: email, subject, text, html });
    if (error) {
      console.error('Quote form: Resend rejected the email.', error);
      return { status: 'error', message: SEND_FAILED };
    }
  } catch (error) {
    console.error('Quote form: failed to reach Resend.', error);
    return { status: 'error', message: SEND_FAILED };
  }

  return { status: 'success' };
}
