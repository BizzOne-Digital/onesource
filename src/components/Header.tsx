import { NavLink, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { CallNowButton, EstimateButton } from './Buttons';
import styles from './Header.module.css';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const overlayHeader = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${overlayHeader ? styles.transparent : ''}`}
    >
      <div className={`container-wide ${styles.inner}`}>
        <Link to="/" className={styles.logoLink} onClick={() => setOpen(false)}>
          <img
            src="/logo.png"
            alt={`${siteConfig.businessName} — ${siteConfig.slogan}`}
            className={styles.logo}
            width={320}
            height={96}
          />
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navActive : ''}`
              }
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.desktopActions}>
          <EstimateButton size="md" showArrow uppercase className={styles.headerCta} />
        </div>

        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className={`${styles.menuIcon} ${open ? styles.menuOpen : ''}`} aria-hidden />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className={styles.mobilePanel}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            <nav className={styles.mobileNav} aria-label="Mobile primary">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `${styles.mobileLink} ${isActive ? styles.navActive : ''}`
                    }
                    onClick={() => setOpen(false)}
                    end={item.to === '/'}
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className={styles.mobileActions}>
              <EstimateButton className={styles.fullWidth} showArrow uppercase />
              <CallNowButton className={styles.fullWidth} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
