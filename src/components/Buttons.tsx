import { Link } from 'react-router-dom';
import { contactEstimateHref, siteConfig } from '@/config/site';
import styles from './Buttons.module.css';

interface ButtonProps {
  className?: string;
  size?: 'md' | 'lg';
  showArrow?: boolean;
  uppercase?: boolean;
}

export function CallNowButton({ className, size = 'md', uppercase }: ButtonProps) {
  return (
    <a
      href={siteConfig.phoneTel}
      className={`${styles.btn} ${styles.btnOutline} ${styles[size]} ${uppercase ? styles.uppercase : ''} ${className ?? ''}`}
    >
      <PhoneIcon />
      Call Now
    </a>
  );
}

export function EstimateButton({
  className,
  size = 'md',
  showArrow,
  uppercase,
}: ButtonProps) {
  return (
    <Link
      to={contactEstimateHref()}
      className={`${styles.btn} ${styles.btnPrimary} ${styles[size]} ${uppercase ? styles.uppercase : ''} ${className ?? ''}`}
    >
      Get a Free Estimate
      {showArrow ? <ArrowIcon /> : null}
    </Link>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 4h3l1.5 5-2 1.2a11 11 0 005.3 5.3L15.5 14l5 1.5v3a1.5 1.5 0 01-1.6 1.5C9.9 20 4 14.1 4 6.1 4 5 4.9 4 6.5 4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
