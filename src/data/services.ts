import type { EventKey } from './site';

export type Service = {
  name: string;
  line: string;
  description: string;
  bookEvent: EventKey;
};

export const SERVICES: Service[] = [
  {
    name: 'Cleanings & Checkups',
    line: 'Routine exams and gentle cleanings that keep small problems small.',
    description:
      'A cleaning and exam every six months is the single best thing you can do for your teeth. We check for cavities, look at your gums, and take X-rays only when they add something useful — not on a fixed schedule just to bill for them.',
    bookEvent: 'cleaning',
  },
  {
    name: 'Fillings & Repairs',
    line: 'Tooth-colored fillings that hold up and blend in.',
    description:
      'Most cavities we catch early enough to fix with a single filling in one visit. We use composite resin matched to your tooth color, not the silver amalgam your parents probably have.',
    bookEvent: 'consultation',
  },
  {
    name: 'Crowns & Bridges',
    line: 'Lab-made restorations for teeth that need more than a filling.',
    description:
      'When a tooth is too damaged for a filling, a crown protects what is left of it. We work with a dental lab in Arden and can often get you a same-day temporary while the permanent piece is made.',
    bookEvent: 'consultation',
  },
  {
    name: 'Teeth Whitening',
    line: 'In-office and take-home options for a brighter, natural-looking smile.',
    description:
      'We offer a one-hour in-office treatment and custom trays you take home. Both use a stronger, better-controlled bleaching gel than anything sold over the counter.',
    bookEvent: 'consultation',
  },
  {
    name: 'Invisalign',
    line: 'Clear aligners for straightening teeth without metal brackets.',
    description:
      'Dr. Marsh plans your full case up front, so you know roughly how many trays and how many months before you start. Most adult cases run 10 to 18 months.',
    bookEvent: 'consultation',
  },
  {
    name: 'Emergency Care',
    line: 'Same-week appointments for pain, breaks, and everything in between.',
    description:
      'Chipped a tooth, lost a filling, or in pain — call before 11am on a weekday and we will usually get you in the same day. After hours, our voicemail has instructions and an on-call number.',
    bookEvent: 'emergency',
  },
];
