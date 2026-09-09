'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaArrowUp } from 'react-icons/fa';
import { scrollToSection } from '@/lib/utils';
import profile from '@/data/profile.json';

const footerLinks = [
  { label: 'About', href: 'about' },
  { label: 'Experience', href: 'experience' },
  { label: 'Skills', href: 'skills' },
  { label: 'Projects', href: 'projects' },
  { label: 'Contact', href: 'contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <footer className="relative border-t border-white/5 bg-dark-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-dark-300 font-bold font-orbitron text-xs">
                {initials}
              </div>
              <span className="font-orbitron text-sm font-semibold text-slate-300">
                {profile.name.split(' ')[0]}
                <span className="text-neon-cyan">.</span>
                {profile.name.split(' ').slice(1).join('')}
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              {profile.title} — building reliable automation frameworks that ship quality software.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaGithub, href: profile.github, label: 'GitHub' },
                { icon: FaLinkedin, href: profile.linkedin, label: 'LinkedIn' },
                { icon: FaEnvelope, href: `mailto:${profile.email}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="text-slate-600 hover:text-neon-cyan transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Navigation</p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-slate-500 hover:text-neon-cyan transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Get In Touch</p>
            <p className="text-sm text-slate-500 mb-4">
              Available for freelance, consulting, and full-time opportunities.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan/50 transition-all duration-200"
            >
              <FaEnvelope size={13} />
              {profile.email}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 flex items-center gap-1.5">
            © {year} {profile.name}. Built with
            <FaHeart size={11} className="text-neon-purple" />
            using Next.js & Tailwind CSS.
          </p>

          <motion.button
            onClick={() => scrollToSection('home')}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-xs text-slate-600 hover:text-neon-cyan transition-colors"
          >
            Back to top
            <div className="p-1.5 rounded-md border border-white/10 hover:border-neon-cyan/30 transition-colors">
              <FaArrowUp size={11} />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
