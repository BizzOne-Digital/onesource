import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/useMedia';
import styles from './HeroPaintStroke.module.css';

export function HeroPaintStroke() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className={styles.wrap} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 1440 900" preserveAspectRatio="none">
        <defs>
          <linearGradient id="heroStrokeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#004a99" />
            <stop offset="40%" stopColor="#007bff" />
            <stop offset="100%" stopColor="#2d9bff" />
          </linearGradient>
          <filter id="strokeGlow">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#007bff" floodOpacity="0.4" />
          </filter>
        </defs>
        <motion.path
          d="M -160 940 L -100 580 C 120 480, 340 400, 560 320 C 780 240, 980 160, 1180 90 L 1460 -20 L 1540 100 C 1280 240, 960 400, 620 540 C 340 650, 80 760, -160 940 Z"
          fill="url(#heroStrokeGrad)"
          filter="url(#strokeGlow)"
          initial={reduced ? { opacity: 0.95 } : { opacity: 0, x: -60 }}
          animate={{ opacity: 0.95, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M 0 780 Q 320 620 640 480 T 1360 160"
          fill="none"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.15, delay: 0.2, ease: 'easeOut' }}
        />
      </svg>
    </div>
  );
}
