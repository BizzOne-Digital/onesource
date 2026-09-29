import { useReviews } from '@/context/ReviewsContext';
import styles from './WriteReviewFab.module.css';

export function WriteReviewFab() {
  const { openWriteReview } = useReviews();

  return (
    <button
      type="button"
      className={styles.fab}
      onClick={openWriteReview}
      aria-label="Write a review"
    >
      <PenIcon />
      <span className={styles.label}>Write a review</span>
    </button>
  );
}

function PenIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 20h4l10-10-4-4L4 16v4zM14 6l4 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}
