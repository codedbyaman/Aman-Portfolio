import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right' = 'up', delay = 0) => ({
  hidden: {
    y: direction === 'up' ? 60 : direction === 'down' ? -60 : 0,
    x: direction === 'left' ? 60 : direction === 'right' ? -60 : 0,
    opacity: 0,
  },
  show: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 80,
      delay,
    },
  },
});

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const scaleIn = (delay = 0) => ({
  hidden: { scale: 0.8, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', duration: 0.6, delay },
  },
});

export const slideIn = (direction: 'left' | 'right' | 'up' | 'down', delay = 0) => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { type: 'tween', duration: 0.5, delay, ease: 'easeOut' },
  },
});
