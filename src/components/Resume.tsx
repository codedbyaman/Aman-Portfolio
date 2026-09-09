'use client';

import { motion } from 'framer-motion';
import { FaDownload, FaEye, FaFilePdf } from 'react-icons/fa';
import { fadeIn } from '@/lib/utils';
import SectionTitle from './ui/SectionTitle';
import NeonButton from './ui/NeonButton';
import profile from '@/data/profile.json';

export default function Resume() {
  return (
    <section id="resume" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionTitle
          tag="resume"
          title="My "
          highlight="Resume"
          subtitle="Download my full resume or view it directly in your browser."
        />

        <motion.div
          variants={fadeIn('up', 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="glass rounded-2xl border border-white/8 overflow-hidden"
        >
          {/* Header bar */}
          <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <FaFilePdf size={20} className="text-red-400" />
              </div>
              <div>
                <p className="font-semibold text-white">{profile.name} — Resume</p>
                <p className="text-xs text-slate-500">PDF Document</p>
              </div>
            </div>
            <div className="flex gap-3">
              <NeonButton
                href="/resume"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
              >
                <FaEye size={13} />
                View Resume
              </NeonButton>
              <NeonButton
                href="/api/resume"
                download
                variant="primary"
                size="sm"
              >
                <FaDownload size={13} />
                Download PDF
              </NeonButton>
            </div>
          </div>

          {/* Preview area */}
          <div className="relative bg-dark-200 min-h-96 flex flex-col items-center justify-center p-6 sm:p-12 text-center">
            {/* Decorative grid */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            <div className="relative z-10 space-y-6">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="mx-auto w-24 h-24 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/20 flex items-center justify-center"
              >
                <FaFilePdf size={40} className="text-neon-cyan" />
              </motion.div>

              <div>
                <h3 className="text-xl font-bold text-white font-orbitron mb-2">
                  Resume Preview
                </h3>
                <p className="text-slate-500 text-sm max-w-md">
                  Your resume is auto-generated from your portfolio data. Click{' '}
                  <span className="text-neon-purple">View Resume</span> to open it, then use{' '}
                  <span className="text-neon-cyan">Save as PDF</span> in the top bar to download.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <NeonButton href="/api/resume" download variant="primary" size="md">
                  <FaDownload />
                  Download PDF Resume
                </NeonButton>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="p-6 grid sm:grid-cols-3 gap-4 border-t border-white/5">
            {[
              { label: 'Experience', value: `${profile.stats.yearsOfExperience}+ Years`, color: '#00E5FF' },
              { label: 'Specialization', value: 'Test Automation', color: '#8B5CF6' },
              { label: 'Status', value: profile.availability, color: '#4ADE80' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-xs text-slate-600 uppercase tracking-widest mb-1">{item.label}</p>
                <p className="font-semibold text-sm" style={{ color: item.color }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
