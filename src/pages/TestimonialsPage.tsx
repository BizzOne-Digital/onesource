import { PageMeta } from '@/components/PageMeta';
import { PageHero } from '@/components/PageHero';
import { CallNowButton, EstimateButton } from '@/components/Buttons';
import { Reveal, StaggerReveal, StaggerItem } from '@/components/motion/Reveal';
import { useReviews } from '@/context/ReviewsContext';
import { siteConfig } from '@/config/site';
import styles from './TestimonialsPage.module.css';

export function TestimonialsPage() {
  const { testimonials, openWriteReview } = useReviews();

  return (
    <>
      <PageMeta
        title="Testimonials"
        description={`Customer stories from ${siteConfig.businessName}. Read reviews and share your experience after a project in Central Florida.`}
      />

      <PageHero
        line1="Customer"
        line2Accent="Testimonials"
        line3="Central Florida"
        subtext="Read what property owners say about our painting and home services — and add your own review anytime."
        compact
        plain
        centered
      />

      <section className={`section ${styles.reviews}`} aria-labelledby="reviews-heading">
        <div className="container">
          <Reveal>
            <div className={styles.reviewsHeader}>
              <div>
                <p className="section-label">Reviews</p>
                <h2 id="reviews-heading" className="section-title">
                  What customers are saying
                </h2>
              </div>
              <button type="button" className={styles.writeBtn} onClick={openWriteReview}>
                Write a review
              </button>
            </div>
          </Reveal>

          <StaggerReveal className={styles.reviewList}>
            {testimonials.map((t) => (
              <StaggerItem key={t.id} className={styles.reviewListItem}>
                <blockquote className={styles.reviewCard}>
                  <p className={styles.quote}>{t.quote}</p>
                  <footer className={styles.reviewFooter}>
                    <cite>{t.name}</cite>
                    {t.location && <span> · {t.location}</span>}
                    {t.service && <span> · {t.service}</span>}
                  </footer>
                </blockquote>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className={`section ${styles.cta}`}>
        <div className="container">
          <Reveal>
            <div className={styles.ctaBox}>
              <h2>Ready for your own project?</h2>
              <p>Request a free estimate or call us to discuss your property.</p>
              <div className={styles.actions}>
                <EstimateButton size="lg" showArrow uppercase />
                <CallNowButton size="lg" uppercase />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
