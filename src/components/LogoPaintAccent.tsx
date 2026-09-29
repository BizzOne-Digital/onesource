import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/useMedia';
import styles from './LogoPaintAccent.module.css';

export function LogoPaintAccent({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();

  return (
    <svg
      className={`${styles.accent} ${className ?? ''}`}
      viewBox="0 0 400 120"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="paintGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#007BFF" stopOpacity="0" />
          <stop offset="40%" stopColor="#007BFF" />
          <stop offset="100%" stopColor="#0056b3" />
        </linearGradient>
      </defs>
      <motion.path
        d="M 20 80 Q 120 20 220 45 T 380 35"
        fill="none"
        stroke="url(#paintGrad)"
        strokeWidth="14"
        strokeLinecap="round"
        initial={reduced ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 1.8, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', repeatDelay: 2 }
        }
      />
      <motion.circle
        cx="380"
        cy="35"
        r="6"
        fill="#007BFF"
        initial={reduced ? { opacity: 0.8 } : { opacity: 0, scale: 0 }}
        animate={{ opacity: [0.4, 1, 0.4], scale: 1 }}
        transition={
          reduced ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }
      />
    </svg>
  );
}

export function CircularArrowAccent({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();

  return (
    <svg
      className={`${styles.circleArrow} ${className ?? ''}`}
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <motion.path
        d="M 160 100 A 60 60 0 1 0 100 40"
        fill="none"
        stroke="#007BFF"
        strokeWidth="6"
        strokeLinecap="round"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0, rotate: 0 }}
        animate={reduced ? {} : { pathLength: 1, rotate: 360 }}
        transition={
          reduced
            ? { duration: 0 }
            : { pathLength: { duration: 2, ease: 'easeOut' }, rotate: { duration: 24, repeat: Infinity, ease: 'linear' } }
        }
        style={{ originX: '100px', originY: '100px' }}
      />
    </svg>
  );
}
