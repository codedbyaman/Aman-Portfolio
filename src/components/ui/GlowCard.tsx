'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'purple' | 'blue' | 'pink';
  hover?: boolean;
  onClick?: () => void;
}

const glowMap = {
  cyan: 'hover:shadow-neon-cyan hover:border-neon-cyan/40',
  purple: 'hover:shadow-neon-purple hover:border-neon-purple/40',
  blue: 'hover:shadow-neon-blue hover:border-neon-blue/40',
  pink: 'hover:shadow-[0_0_10px_#F472B6,0_0_20px_#F472B6] hover:border-neon-pink/40',
};

export default function GlowCard({
  children,
  className,
  glowColor = 'cyan',
  hover = true,
  onClick,
}: GlowCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      onClick={onClick}
      className={cn(
        'glass rounded-xl border border-white/8 transition-all duration-300',
        hover && glowMap[glowColor],
        hover && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
