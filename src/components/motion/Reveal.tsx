import { motion, type HTMLMotionProps } from 'framer-motion';
import { usePrefersReducedMotion, useMediaQuery } from '@/hooks/useMedia';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  as?: 'div' | 'section' | 'article' | 'header' | 'footer';
}

const offsets = {
  up: { y: 48, x: 0 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  as = 'div',
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const narrow = useMediaQuery('(max-width: 767px)');
  const Component = motion[as];
  const resolvedDirection =
    narrow && (direction === 'left' || direction === 'right') ? 'up' : direction;
  const offset = offsets[resolvedDirection];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

export function StaggerReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-5% 0px' }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.12 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function MotionLink(props: HTMLMotionProps<'a'>) {
  return <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} {...props} />;
}
