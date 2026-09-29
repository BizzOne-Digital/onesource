import { siteConfig } from '@/config/site';
import { CallNowButton, EstimateButton } from './Buttons';
import styles from './MobileStickyCTA.module.css';

export function MobileStickyCTA() {
  return (
    <div className={styles.bar} aria-label="Quick contact">
      <a href={siteConfig.phoneTel} className={styles.call}>
        {siteConfig.phoneDisplay}
      </a>
      <div className={styles.actions}>
        <EstimateButton size="md" className={styles.btnCompact} />
        <CallNowButton size="md" className={styles.btnCompact} />
      </div>
    </div>
  );
}
