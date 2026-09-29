import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileStickyCTA } from './MobileStickyCTA';
import { WriteReviewFab } from './WriteReviewFab';
import { WriteReviewModal } from './WriteReviewModal';
import { usePrefersReducedMotion } from '@/hooks/useMedia';

export function Layout() {
  const location = useLocation();
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          id="main-content"
          className="page-main"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <MobileStickyCTA />
      <WriteReviewFab />
      <WriteReviewModal />
    </>
  );
}
