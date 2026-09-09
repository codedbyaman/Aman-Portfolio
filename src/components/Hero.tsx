'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaArrowDown, FaTwitter } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { scrollToSection } from '@/lib/utils';
import NeonButton from './ui/NeonButton';
import profile from '@/data/profile.json';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Floating orb component
function FloatingOrb({ color, size, x, y, delay }: { color: string; size: string; x: string; y: string; delay: number }) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
      style={{ left: x, top: y, width: size, height: size, background: color }}
      className="absolute rounded-full blur-3xl pointer-events-none"
    />
  );
}

export default function Hero() {
  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  const sequenceItems = profile.subtitles.flatMap((title) => [title, 2500] as [string, number]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid-bg">
      {/* Floating orbs */}
      <FloatingOrb color="rgba(0,229,255,0.15)" size="min(600px,120vw)" x="-10%" y="10%" delay={0} />
      <FloatingOrb color="rgba(139,92,246,0.15)" size="min(500px,100vw)" x="60%" y="40%" delay={2} />
      <FloatingOrb color="rgba(34,211,238,0.10)" size="min(400px,80vw)" x="20%" y="60%" delay={4} />

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent"
          style={{ animation: 'scanLine 8s linear infinite' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20">

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
            className="flex-shrink-0 relative"
          >
            {/* Outer spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-3 rounded-full"
              style={{
                background:
                  'conic-gradient(from 0deg, #00E5FF, #8B5CF6, #22D3EE, #00E5FF)',
                mask: 'radial-gradient(transparent 120px, black 121px)',
              }}
            />

            {/* Glow border */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-blue opacity-80 blur-sm" />

            {/* Avatar container */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 lg:w-64 lg:h-64 rounded-full overflow-hidden border-2 border-dark-200 bg-dark-200 flex items-center justify-center">
              <img
                src={`${BASE_PATH}${profile.avatar}`}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
              {/* Fallback initials avatar (hidden — shown only if SVG path wrong) */}
              <div className="absolute inset-0 items-center justify-center hidden">
                <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-dark-100 to-dark-200">
                  <span className="text-6xl lg:text-7xl font-bold font-orbitron neon-text-gradient">
                    {initials}
                  </span>
                </div>
              </div>
            </div>

            {/* Status badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 glass px-3 py-1.5 rounded-full border border-neon-green/30 whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-xs text-neon-green font-medium">{profile.availability}</span>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-mono text-neon-cyan text-sm mb-3 flex items-center gap-2 justify-center lg:justify-start"
            >
              <span className="animate-pulse">▶</span>
              <span>Hello, World! I&apos;m</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: 'spring', damping: 20 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-orbitron mb-4 leading-none"
            >
              <span className="neon-text-gradient">{profile.name.split(' ')[0]}</span>
              <br />
              <span className="text-white">{profile.name.split(' ').slice(1).join(' ')}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-xl lg:text-2xl text-slate-300 mb-6 h-8 flex items-center justify-center lg:justify-start"
            >
              <span className="text-slate-500 mr-2 font-mono">&gt;</span>
              <TypeAnimation
                sequence={sequenceItems}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                className="text-neon-purple font-medium"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-slate-400 text-base lg:text-lg max-w-xl mb-4 leading-relaxed"
            >
              {profile.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-1.5 text-sm text-slate-500 mb-8 justify-center lg:justify-start"
            >
              <MdLocationOn className="text-neon-cyan" size={16} />
              <span>{profile.location}</span>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-6 mb-8 justify-center lg:justify-start"
            >
              {[
                { value: `${profile.stats.yearsOfExperience}+`, label: 'Years Exp.' },
                { value: `${profile.stats.projectsCompleted}+`, label: 'Projects' },
                { value: profile.stats.testsAutomated, label: 'Tests Automated' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl font-bold font-orbitron text-neon-cyan">{stat.value}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start"
            >
              <NeonButton href={`${BASE_PATH}/resume.pdf`} download variant="primary" size="lg">
                <FaDownload />
                Download Resume
              </NeonButton>
              <NeonButton
                onClick={() => scrollToSection('contact')}
                variant="outline"
                size="lg"
              >
                <FaEnvelope />
                Contact Me
              </NeonButton>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {[
                { icon: FaGithub, href: profile.github, label: 'GitHub', color: 'hover:text-white' },
                { icon: FaLinkedin, href: profile.linkedin, label: 'LinkedIn', color: 'hover:text-blue-400' },
                { icon: FaEnvelope, href: `mailto:${profile.email}`, label: 'Email', color: 'hover:text-neon-cyan' },
                ...(profile.twitter ? [{ icon: FaTwitter, href: profile.twitter, label: 'Twitter', color: 'hover:text-sky-400' }] : []),
              ].map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                  className={`text-slate-500 ${color} transition-colors duration-200`}
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 hover:text-neon-cyan transition-colors group"
        >
          <span className="text-xs font-mono tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FaArrowDown size={14} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
