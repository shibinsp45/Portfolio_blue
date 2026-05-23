/**
 * useParallax — thin wrapper around framer-motion's useScroll + useTransform.
 *
 * Usage:
 *   const { ref, y } = useParallax({ speed: 0.3, direction: 'up' });
 *   <motion.div ref={ref} style={{ y }} />
 *
 * speed    – 0 = stationary, 1 = moves 1:1 with scroll (default 0.25)
 * direction – 'up' (element rises while scrolling) | 'down' (sinks) | 'left' | 'right'
 * outputRange – override the computed [start, end] values (px)
 */
import { useRef } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';

type ParallaxOptions = {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  outputRange?: [number, number];
  smooth?: boolean;       // wrap in useSpring for buttery motion
  offset?: [string, string];  // viewport offset for useScroll
};

export function useParallax({
  speed = 0.25,
  direction = 'up',
  outputRange,
  smooth = true,
  offset = ['start end', 'end start'],
}: ParallaxOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  // Determine pixel travel based on speed
  const travel = 120 * speed;
  const range: [number, number] = outputRange ?? (
    direction === 'up'    ? [travel, -travel]  :
    direction === 'down'  ? [-travel, travel]  :
    direction === 'left'  ? [travel, -travel]  :
    /* right */             [-travel, travel]
  );

  const isHorizontal = direction === 'left' || direction === 'right';
  const rawValue = useTransform(scrollYProgress, [0, 1], range);

  // Optional spring smoothing
  const springValue = useSpring(rawValue, { stiffness: 80, damping: 20, mass: 0.5 });
  const value = smooth ? springValue : rawValue;

  return {
    ref,
    ...(isHorizontal ? { x: value } : { y: value }),
  };
}
