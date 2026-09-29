import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Testimonial } from '@/config/site';
import {
  REVIEWS_UPDATED_EVENT,
  getAllTestimonials,
  loadVisitorReviews,
  saveVisitorReview,
  type VisitorReview,
} from '@/lib/reviews';

interface AddReviewInput {
  name: string;
  quote: string;
  location?: string;
  service?: string;
}

interface ReviewsContextValue {
  testimonials: Testimonial[];
  addReview: (input: AddReviewInput) => void;
  openWriteReview: () => void;
  closeWriteReview: () => void;
  isWriteReviewOpen: boolean;
}

const ReviewsContext = createContext<ReviewsContextValue | null>(null);

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [visitorReviews, setVisitorReviews] = useState<VisitorReview[]>(() => loadVisitorReviews());
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  useEffect(() => {
    const sync = () => setVisitorReviews(loadVisitorReviews());
    window.addEventListener(REVIEWS_UPDATED_EVENT, sync);
    return () => window.removeEventListener(REVIEWS_UPDATED_EVENT, sync);
  }, []);

  const testimonials = useMemo(
    () => getAllTestimonials(),
    [visitorReviews],
  );

  const addReview = useCallback((input: AddReviewInput) => {
    const review: VisitorReview = {
      id: `visitor-${crypto.randomUUID()}`,
      name: input.name.trim(),
      quote: input.quote.trim(),
      location: input.location?.trim() || undefined,
      service: input.service?.trim() || undefined,
      createdAt: new Date().toISOString(),
    };
    saveVisitorReview(review);
    setVisitorReviews(loadVisitorReviews());
  }, []);

  const value: ReviewsContextValue = {
    testimonials,
    addReview,
    openWriteReview: () => setIsWriteReviewOpen(true),
    closeWriteReview: () => setIsWriteReviewOpen(false),
    isWriteReviewOpen,
  };

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>;
}

export function useReviews(): ReviewsContextValue {
  const ctx = useContext(ReviewsContext);
  if (!ctx) {
    throw new Error('useReviews must be used within ReviewsProvider');
  }
  return ctx;
}
