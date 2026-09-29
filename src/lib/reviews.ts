import type { Testimonial } from '@/config/site';

export const REVIEWS_STORAGE_KEY = 'onesource360_visitor_reviews';
export const REVIEWS_UPDATED_EVENT = 'onesource360:reviews-updated';

/** Default reviews shown until the site owner replaces them with verified feedback. */
export const seedTestimonials: Testimonial[] = [
  {
    id: 'seed-1',
    name: 'Marcus T.',
    location: 'Winter Haven, FL',
    service: 'Interior Painting',
    quote:
      'They painted our living room and hallway with clean lines and zero mess left behind. Communication was clear from the estimate through the final walkthrough.',
  },
  {
    id: 'seed-2',
    name: 'Elena R.',
    location: 'Lakeland, FL',
    service: 'Exterior Painting',
    quote:
      'Our exterior needed serious prep work before paint. The crew showed up on schedule, kept us updated, and the curb appeal difference is night and day.',
  },
  {
    id: 'seed-3',
    name: 'James & Priya K.',
    location: 'Davenport, FL',
    service: 'Residential Services',
    quote:
      'We manage a rental property and needed a reliable team for turnover work. One Source 360 handled painting and pressure washing — tenants moved in on time.',
  },
  {
    id: 'seed-4',
    name: 'Sandra M.',
    location: 'Lake Wales, FL',
    service: 'Epoxy Flooring',
    quote:
      'Garage floor epoxy looks professional and was done right. Fair estimate, no surprises, and they answered every question before starting.',
  },
];

export interface VisitorReview extends Testimonial {
  createdAt: string;
}

function isVisitorReview(value: unknown): value is VisitorReview {
  if (!value || typeof value !== 'object') return false;
  const r = value as VisitorReview;
  return (
    typeof r.id === 'string' &&
    typeof r.name === 'string' &&
    typeof r.quote === 'string' &&
    typeof r.createdAt === 'string'
  );
}

export function loadVisitorReviews(): VisitorReview[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isVisitorReview);
  } catch {
    return [];
  }
}

export function saveVisitorReview(review: VisitorReview): void {
  const existing = loadVisitorReviews();
  const next = [review, ...existing];
  localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(REVIEWS_UPDATED_EVENT));
}

export function getAllTestimonials(): Testimonial[] {
  const visitor = loadVisitorReviews();
  return [...visitor, ...seedTestimonials];
}
