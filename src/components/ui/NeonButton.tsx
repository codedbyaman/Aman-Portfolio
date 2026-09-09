'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NeonButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  download?: boolean | string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
}

const variants = {
  primary: 'bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-300 font-semibold hover:shadow-neon-cyan',
  secondary: 'bg-gradient-to-r from-neon-purple to-neon-blue text-white font-semibold hover:shadow-neon-purple',
  outline: 'border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan hover:shadow-neon-cyan',
  ghost: 'text-slate-300 hover:text-neon-cyan hover:bg-white/5',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function NeonButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  download,
  onClick,
  className,
  disabled,
  type = 'button',
  target,
  rel,
}: NeonButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center gap-2 rounded-lg transition-all duration-300 font-grotesk relative overflow-hidden group',
    variants[variant],
    sizes[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  const shine = (
    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  );

  if (href) {
    return (
      <motion.a
        href={href}
        download={download}
        target={target}
        rel={rel}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={baseClasses}
      >
        {shine}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={baseClasses}
    >
      {shine}
      {children}
    </motion.button>
  );
}
