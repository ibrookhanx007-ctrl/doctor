// Central configuration for the practice. Swap CAL_USERNAME and the event
// slugs for the real Cal.com account before launch — see README.md.

export const PRACTICE_NAME = 'Northgate Family Dental';
export const PHONE_DISPLAY = '(828) 555-0148';
export const PHONE_TEL = '+18285550148';
export const EMAIL = 'hello@northgatefamilydental.com';

export const ADDRESS = {
  line1: '214 Northgate Avenue',
  line2: 'Asheville, NC 28804',
  full: '214 Northgate Avenue, Asheville, NC 28804',
};

// Used for the Google Maps embed — no API key required for this format.
export const MAP_EMBED_SRC =
  'https://www.google.com/maps?q=214+Northgate+Avenue,+Asheville,+NC+28804&output=embed';
export const MAP_LINK =
  'https://www.google.com/maps/search/?api=1&query=214+Northgate+Avenue+Asheville+NC+28804';

export type HoursRow = { label: string; hours: string };
export const HOURS: HoursRow[] = [
  { label: 'Monday', hours: '8:00 am – 5:00 pm' },
  { label: 'Tuesday', hours: '8:00 am – 5:00 pm' },
  { label: 'Wednesday', hours: '8:00 am – 5:00 pm' },
  { label: 'Thursday', hours: '8:00 am – 5:00 pm' },
  { label: 'Friday', hours: '8:00 am – 1:00 pm' },
  { label: 'Saturday', hours: 'Closed' },
  { label: 'Sunday', hours: 'Closed' },
];

// 0 = Sunday ... 6 = Saturday, matching Date.getDay()
export const BUSINESS_HOURS: Record<number, { open: number; close: number } | null> = {
  0: null,
  1: { open: 8, close: 17 },
  2: { open: 8, close: 17 },
  3: { open: 8, close: 17 },
  4: { open: 8, close: 17 },
  5: { open: 8, close: 13 },
  6: null,
};

// --- Cal.com booking configuration -----------------------------------
// Placeholder account for this demo build. Point CAL_USERNAME at the real
// practice account and make sure each slug below exists as an event type
// with the matching duration before going live.
export const CAL_USERNAME = 'northgate-dental';

export const EVENT_TYPES = {
  newPatient: { slug: 'new-patient-exam', label: 'New Patient Exam', duration: 60 },
  cleaning: { slug: 'cleaning', label: 'Cleaning', duration: 45 },
  emergency: { slug: 'emergency', label: 'Emergency Visit', duration: 30 },
  consultation: { slug: 'consultation', label: 'Consultation', duration: 30 },
} as const;

export type EventKey = keyof typeof EVENT_TYPES;

export function calLink(eventKey?: EventKey): string {
  if (!eventKey) return CAL_USERNAME;
  return `${CAL_USERNAME}/${EVENT_TYPES[eventKey].slug}`;
}

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/new-patients', label: 'New Patients' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];
