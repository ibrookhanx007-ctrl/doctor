export type StaffMember = {
  name: string;
  role: string;
  note?: string;
};

export const DENTIST = {
  name: 'Dr. Elena Marsh, DDS',
  credentials: [
    'DDS, UNC Adams School of Dentistry',
    'Member, North Carolina Dental Society',
    'Continuing education in Invisalign and cosmetic bonding',
  ],
  bio: "Dr. Marsh grew up in Weaverville and has practiced in Asheville for fourteen years, the last six of them at Northgate. She still does her own hygiene checks on nervous patients and keeps a small collection of dog photos on her phone for exactly that reason.",
};

export const STAFF: StaffMember[] = [
  { name: 'Priya Chandran', role: 'Registered Dental Hygienist' },
  { name: 'Marcus Webb', role: 'Registered Dental Hygienist' },
  { name: 'Denise Okafor', role: 'Office Manager' },
  { name: 'Sadie Lin', role: 'Dental Assistant' },
  { name: 'Tom Riggins', role: 'Dental Assistant' },
];
