import { Link } from 'react-router-dom';
import { siteConfig, contactEstimateHref } from '@/config/site';
import { CallNowButton, EstimateButton } from './Buttons';
import styles from './Footer.module.css';

const quickLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: contactEstimateHref(), label: 'Free estimate' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.topAccent} aria-hidden="true" />
      <div className={styles.footerGlow} aria-hidden="true" />

      <div className={`container-wide ${styles.grid}`}>
        <div className={styles.brand}>
          <div className={styles.logoPanel}>
            <img
              src="/logo.jpg"
              alt={`${siteConfig.businessName} logo`}
              className={styles.logo}
              width={140}
              height={140}
            />
          </div>
          <p className={styles.slogan}>{siteConfig.slogan}</p>
          <p className={styles.tagline}>{siteConfig.headline}</p>
          <p className={styles.brandNote}>
            Interior & exterior painting and home services across Central Florida.
          </p>
        </div>

        <nav className={styles.col} aria-labelledby="footer-links-heading">
          <h2 id="footer-links-heading" className={styles.colTitle}>
            Quick links
          </h2>
          <ul className={styles.links}>
            {quickLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={styles.linkItem}>
                  <ChevronIcon />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.colTitle}>Contact</h2>
          <ul className={styles.contactList}>
            <li className={styles.contactRow}>
              <PhoneIcon />
              <a href={siteConfig.phoneTel} className={styles.contactLink}>
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li className={styles.contactRow}>
              <ClockIcon />
              <span>{siteConfig.hours}</span>
            </li>
            <li className={styles.contactRow}>
              <PinIcon />
              <span>
                {siteConfig.serviceAreas.slice(0, 5).join(', ')}, and surrounding Central Florida
                areas
              </span>
            </li>
          </ul>
          <CallNowButton size="md" className={styles.footerCallBtn} />
        </div>

        <div className={styles.ctaPanel}>
          <span className={styles.ctaAccent} aria-hidden="true" />
          <h2 className={styles.ctaTitle}>Ready to start?</h2>
          <p className={styles.ctaText}>
            Request a free estimate for interior or exterior painting and home services across
            Central Florida.
          </p>
          <EstimateButton size="lg" showArrow uppercase className={styles.footerEstimateBtn} />
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container-wide ${styles.bottomInner}`}>
          <p className={styles.copyright}>
            © {year} {siteConfig.businessName}. All rights reserved.
          </p>
          <p className={styles.bottomMeta}>{siteConfig.slogan}</p>
        </div>
      </div>
    </footer>
  );
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
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

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
