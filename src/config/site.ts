export const siteConfig = {
  businessName: 'One Source 360 LLC',
  headline: 'Professional Home Services Made Simple',
  slogan: 'Service Made Simple',
  phoneDisplay: '+1 (863) 456-8958',
  phoneTel: 'tel:+18634568958',
  hours: 'Monday–Saturday, 8:00 AM–6:00 PM',
  /** Incomplete address — add full email in this file when available. Do not guess domain. */
  emailLocalPart: 'onesource360llc',
  serviceAreas: [
    'Lake Wales',
    'Winter Haven',
    'Lakeland',
    'Davenport',
    'Haines City',
    'Surrounding Central Florida areas',
  ],
  aboutParagraph:
    'One Source 360 LLC provides professional interior and exterior painting services for homeowners and property owners throughout Central Florida. With over 10 years of experience, the company focuses on quality workmanship, clean finishes, reliability, and excellent customer service. From refreshing a single room to transforming an entire home, the goal is professional results with a stress-free experience.',
  experienceLabel: '10+ years of experience',
  contactFormAnchor: 'estimate-form',
} as const;

export type ServiceSlug =
  | 'interior-painting'
  | 'exterior-painting'
  | 'epoxy-flooring'
  | 'pressure-washing'
  | 'house-cleaning'
  | 'junk-removal'
  | 'handyman'
  | 'residential-commercial';

export interface ServiceItem {
  slug: ServiceSlug;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
}

export const services: ServiceItem[] = [
  {
    slug: 'interior-painting',
    title: 'Interior Painting',
    shortDescription: 'Flawless finishes for every room, with careful prep and clean lines.',
    description:
      'Transform living spaces with professional interior painting tailored to your home or rental property. We focus on surface preparation, crisp edges, and durable finishes so your spaces look refreshed and ready to enjoy.',
    image: '/services/interior-painting.jpg',
    imageAlt: 'Interior living space with blue accent wall and professional painting prep',
    featured: true,
  },
  {
    slug: 'exterior-painting',
    title: 'Exterior Painting',
    shortDescription: 'Boost curb appeal and protect your home against Florida weather.',
    description:
      'Exterior painting that stands up to sun and humidity while elevating curb appeal. From siding to trim, we deliver cohesive color and long-lasting protection for residential and commercial properties.',
    image: '/services/exterior-painting.jpg',
    imageAlt: 'Home exterior painting project with ladder, prep, and refreshed curb appeal',
    featured: true,
  },
  {
    slug: 'epoxy-flooring',
    title: 'Epoxy Flooring',
    shortDescription: 'Durable, sleek floors for garages, patios, and high-traffic areas.',
    description:
      'Epoxy flooring adds a polished, easy-to-maintain surface ideal for garages and utility spaces. We prepare surfaces properly for adhesion and a smooth, professional result.',
    image: '/services/epoxy-flooring.jpg',
    imageAlt: 'Glossy flake epoxy garage floor with gray, white, and blue speckled finish',
  },
  {
    slug: 'pressure-washing',
    title: 'Pressure Washing',
    shortDescription: 'Restore driveways, siding, and outdoor surfaces to like-new condition.',
    description:
      'Remove built-up grime, mildew, and stains with controlled pressure washing for driveways, walkways, fences, and exterior surfaces—perfect prep before painting or seasonal refresh.',
    image: '/services/pressure-washing.jpg',
    imageAlt: 'Surface cleaner pressure washing a paver driveway',
  },
  {
    slug: 'house-cleaning',
    title: 'House Cleaning',
    shortDescription: 'Detailed cleaning so your property is move-in or show-ready.',
    description:
      'Thorough house cleaning for homeowners, landlords, and property managers who need reliable turnover or maintenance cleaning with attention to detail.',
    image: '/services/house-cleaning.jpg',
    imageAlt: 'Bright modern kitchen prepared for professional house cleaning',
  },
  {
    slug: 'junk-removal',
    title: 'Junk Removal',
    shortDescription: 'Clear clutter and debris quickly for renovations or property prep.',
    description:
      'Efficient junk removal to clear out unwanted items and debris—ideal before remodeling, painting projects, or preparing a property for tenants or sale.',
    image: '/services/junk-removal.jpg',
    imageAlt: 'Garage clear-out with furniture and boxes ready for junk removal',
  },
  {
    slug: 'handyman',
    title: 'Handyman Services',
    shortDescription: 'Small repairs and fixes that keep your property running smoothly.',
    description:
      'Handyman support for the repairs and touch-ups that complement larger projects—from minor fixes to prep work that keeps your home or investment property in top shape.',
    image: '/services/handyman.jpg',
    imageAlt: 'Handyman tools and newly installed shelf with level and drill',
  },
  {
    slug: 'residential-commercial',
    title: 'Residential & Commercial Services',
    shortDescription: 'Flexible solutions for homes, rentals, and commercial spaces.',
    description:
      'Whether you manage a single-family home, a portfolio of rentals, or a commercial space, we coordinate services with clear communication and a focus on minimal disruption.',
    image: '/services/residential-commercial.jpg',
    imageAlt: 'Modern residential home and commercial storefront side by side',
  },
];

/** Add genuine customer reviews here when available. Do not invent names or quotes. */
export interface Testimonial {
  id: string;
  name: string;
  location?: string;
  service?: string;
  quote: string;
}

export const testimonials: Testimonial[] = [];

export const galleryImages = [
  {
    src: '/gallery/interior-refresh.jpg',
    alt: 'Living room with blue accent wall and professional interior painting prep',
    caption: 'Interior refresh',
  },
  {
    src: '/gallery/living-space-update.jpg',
    alt: 'Bright modern living room with updated finishes and built-in shelving',
    caption: 'Living space update',
  },
  {
    src: '/gallery/exterior-transformation.jpg',
    alt: 'White home exterior with blue front door and refreshed curb appeal',
    caption: 'Exterior transformation',
  },
  {
    src: '/gallery/epoxy-flooring.jpg',
    alt: 'Glossy flake epoxy garage floor with gray, white, and blue speckled finish',
    caption: 'Epoxy flooring',
  },
  {
    src: '/gallery/pressure-washing.jpg',
    alt: 'Pressure washing equipment cleaning a stone paver driveway',
    caption: 'Pressure washing',
  },
  {
    src: '/gallery/detail-prep.jpg',
    alt: 'Painter’s tape, brushes, and roller prepared for interior painting',
    caption: 'Detail & prep',
  },
];

export function getFormspreeEndpoint(): string | null {
  const value = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim();
  return value ? value : null;
}

export function contactEstimateHref(): string {
  return `/contact#${siteConfig.contactFormAnchor}`;
}
