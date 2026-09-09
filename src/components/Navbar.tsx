'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { scrollToSection } from '@/lib/utils';
import profile from '@/data/profile.json';

const navItems = [
  { label: 'Home', href: 'home' },
  { label: 'About', href: 'about' },
  { label: 'Experience', href: 'experience' },
  { label: 'Education', href: 'education' },
  { label: 'Skills', href: 'skills' },
  { label: 'Projects', href: 'projects' },
  { label: 'Kroger', href: 'kroger' },
  { label: 'Automation', href: 'automation' },
  { label: 'AI Tools', href: 'ai-tools' },
  { label: 'QA Game', href: 'qa-game' },
  { label: 'Contact', href: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section
      const sections = navItems.map((item) => item.href);
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setMobileOpen(false);
  };

  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-dark border-b border-neon-cyan/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => handleNavClick('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-dark-300 font-bold font-orbitron text-sm group-hover:shadow-neon-cyan transition-shadow duration-300">
              {initials}
            </div>
            <span className="font-orbitron text-sm font-semibold text-slate-300 group-hover:text-neon-cyan transition-colors hidden sm:block">
              {profile.name.split(' ')[0]}
              <span className="text-neon-cyan">.</span>
              {profile.name.split(' ').slice(1).join('')}
            </span>
          </motion.button>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 relative group ${
                    activeSection === item.href
                      ? 'text-neon-cyan'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.label}
                  {activeSection === item.href && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 bg-neon-cyan/10 rounded-md border border-neon-cyan/20"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="/api/resume"
              download="Aman-Kumar-Resume.pdf"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan hover:shadow-neon-cyan transition-all duration-300"
            >
              Resume
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-neon-cyan transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-40 w-72 glass-dark border-l border-neon-cyan/10 pt-20 pb-8 px-6 flex flex-col lg:hidden"
          >
            <ul className="flex flex-col gap-1 flex-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      activeSection === item.href
                        ? 'text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/20'
                        : 'text-slate-300 hover:text-neon-cyan hover:bg-white/5'
                    }`}
                  >
                    <span className="font-mono text-neon-purple mr-2 text-sm">
                      {String(i + 1).padStart(2, '0')}.
                    </span>
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <a
              href="/api/resume"
              download="Aman-Kumar-Resume.pdf"
              className="mt-4 inline-flex justify-center items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg border border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300"
            >
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
