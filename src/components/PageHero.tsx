import { motion } from 'framer-motion';
import { CallNowButton, EstimateButton } from '@/components/Buttons';
import { usePrefersReducedMotion } from '@/hooks/useMedia';
import styles from './PageHero.module.css';

interface PageHeroProps {
  id?: string;
  line1: string;
  line2Accent: string;
  line3: string;
  subtext: string;
  compact?: boolean;
  /** No background photo — solid dark hero */
  plain?: boolean;
  /** Center headline, subtext, and CTAs */
  centered?: boolean;
}

export function PageHero({
  id = 'page-hero-heading',
  line1,
  line2Accent,
  line3,
  subtext,
  compact,
  plain,
  centered,
}: PageHeroProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      className={`${styles.hero} ${compact ? styles.compact : ''} ${plain ? styles.plain : ''} ${centered ? styles.centered : ''}`}
      aria-labelledby={id}
    >
      {!plain && (
        <>
          <div className={styles.heroBg} role="img" aria-label="Modern home exterior at dusk" />
          <div className={styles.heroShade} aria-hidden="true" />
        </>
      )}

      <div className={`container-wide ${styles.heroContent}`}>
        <motion.div
          className={styles.heroCopy}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 id={id} className={styles.heroTitle}>
            <span className={styles.titleLine}>{line1}</span>
            <span className={styles.titleAccent}>{line2Accent}</span>
            <span className={styles.titleLine}>{line3}</span>
          </h1>
          <div className={styles.subBlock}>
            <span className={styles.subLine} aria-hidden="true" />
            <p className={styles.heroSub}>{subtext}</p>
          </div>
          <div className={styles.heroCtas}>
            <EstimateButton size="lg" showArrow uppercase className={styles.heroBtn} />
            <CallNowButton size="lg" uppercase className={`${styles.heroBtn} ${styles.heroCallBtn}`} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
