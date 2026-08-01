export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  date: string;
  location?: string;
  rotation?: number; // e.g. -6, 4, -2 for 3D polaroid tilt
  note?: string; // Secret note on back of polaroid
  tag?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  photoUrl: string;
  location: string;
  quote?: string;
  chapterNumber?: number;
}

export interface ReasonItem {
  id: number;
  text: string;
  category: 'joy' | 'sparkle' | 'kindness' | 'dreams' | 'moments';
}

export interface LoveStoryConfig {
  id?: string; // Unique profile ID
  recipientName: string; // e.g., "Sophia"
  relationship?: 'Partner' | 'Best Friend' | 'Sibling' | 'Parent' | 'Friend' | 'Colleague' | string;
  partnerName: string; // e.g., "Julian" or "Your Family"
  birthdayTitle: string; // e.g., "A Magical Birthday Celebration for Sophia"
  relationshipStartDate: string; // keep for countdown/days lived
  birthdayDate: string; // e.g., "2026-08-15"
  birthdayAge?: number; // e.g., 25
  loveLetterTitle: string;
  loveLetterContent: string[];
  heroMessage: string;
  photos: PhotoItem[];
  timeline: TimelineEvent[];
  reasons: ReasonItem[];
  grandFinaleTitle?: string;
  grandFinaleMessage?: string;
  pinCode?: string; // Optional PIN for logging in
  createdAt?: string;
}

export interface UserAccount {
  id: string;
  username: string;
  relationship: string;
  recipientName: string;
  pinCode?: string;
  config: LoveStoryConfig;
}
