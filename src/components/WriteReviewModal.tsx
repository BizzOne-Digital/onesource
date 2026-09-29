import { FormEvent, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReviews } from '@/context/ReviewsContext';
import { siteConfig } from '@/config/site';
import styles from './WriteReviewModal.module.css';

const serviceOptions = [
  'Interior Painting',
  'Exterior Painting',
  'Epoxy Flooring',
  'Pressure Washing',
  'House Cleaning',
  'Junk Removal',
  'Handyman Services',
  'Other',
];

export function WriteReviewModal() {
  const { isWriteReviewOpen, closeWriteReview, addReview } = useReviews();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [service, setService] = useState('');
  const [quote, setQuote] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isWriteReviewOpen && !dialog.open) {
      dialog.showModal();
      setSubmitted(false);
    }
    if (!isWriteReviewOpen && dialog.open) {
      dialog.close();
    }
  }, [isWriteReviewOpen]);

  const resetForm = () => {
    setName('');
    setLocation('');
    setService('');
    setQuote('');
    setErrors({});
  };

  const onClose = () => {
    closeWriteReview();
    resetForm();
    setSubmitted(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = 'Please enter your name.';
    if (!quote.trim()) nextErrors.quote = 'Please share your experience.';
    else if (quote.trim().length < 20) nextErrors.quote = 'Please write at least 20 characters.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    addReview({
      name,
      quote,
      location: location || undefined,
      service: service || undefined,
    });
    setSubmitted(true);
    resetForm();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="write-review-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            className={styles.panel}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 id="write-review-title" className={styles.title}>
              Thank you!
            </h2>
            <p className={styles.lead}>
              Your review was saved and is now visible on our Testimonials page in this browser.
            </p>
            <p className={styles.note}>
              Reviews are stored locally on your device for this demo site — they are not sent to{' '}
              {siteConfig.businessName} automatically.
            </p>
            <div className={styles.actions}>
              <button type="button" className={styles.primaryBtn} onClick={onClose}>
                Done
              </button>
              <a href="/testimonials" className={styles.linkBtn} onClick={onClose}>
                View testimonials
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className={styles.panel}
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={styles.headerRow}>
              <h2 id="write-review-title" className={styles.title}>
                Write a review
              </h2>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="Close review form"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <p className={styles.lead}>
              Share your experience with {siteConfig.businessName}. Your review appears on the
              Testimonials page right away in this browser.
            </p>

            <label className={styles.field}>
              <span>Name *</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                aria-invalid={!!errors.name}
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </label>

            <label className={styles.field}>
              <span>City / area (optional)</span>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Lakeland, FL"
              />
            </label>

            <label className={styles.field}>
              <span>Service (optional)</span>
              <select value={service} onChange={(e) => setService(e.target.value)}>
                <option value="">Select a service</option>
                {serviceOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <span>Your review *</span>
              <textarea
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                rows={5}
                placeholder="What went well? How was communication and quality?"
                aria-invalid={!!errors.quote}
              />
              {errors.quote && <span className={styles.error}>{errors.quote}</span>}
            </label>

            <button type="submit" className={styles.primaryBtn}>
              Submit review
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </dialog>
  );
}
