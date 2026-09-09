'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/utils';

interface SectionTitleProps {
  tag?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

export default function SectionTitle({
  tag,
  title,
  highlight,
  subtitle,
  align = 'center',
}: SectionTitleProps) {
  const alignClass = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }[align];

  const parts = highlight ? title.split(highlight) : [title];

  return (
    <motion.div
      variants={fadeIn('up', 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      className={`flex flex-col gap-3 mb-12 ${alignClass}`}
    >
      {tag && (
        <span className="font-mono text-neon-cyan text-sm tracking-widest uppercase">
          {'// '}{tag}
        </span>
      )}

      <h2 className="text-4xl lg:text-5xl font-bold font-orbitron leading-tight">
        {parts[0]}
        {highlight && (
          <span className="neon-text-gradient">{highlight}</span>
        )}
        {parts[1]}
      </h2>

      {subtitle && (
        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}

      <div className={`flex gap-2 mt-1 ${align === 'center' ? 'justify-center' : ''}`}>
        <div className="h-1 w-16 rounded bg-gradient-to-r from-neon-cyan to-neon-purple" />
        <div className="h-1 w-8 rounded bg-neon-blue/50" />
        <div className="h-1 w-4 rounded bg-neon-purple/30" />
      </div>
    </motion.div>
  );
}
