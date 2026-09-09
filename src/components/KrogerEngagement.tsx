'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch, FaUserShield, FaListAlt, FaCheckCircle,
  FaCalendarAlt, FaMapMarkerAlt, FaBuilding, FaChevronDown, FaChevronUp,
} from 'react-icons/fa';
import { MdVerified, MdRocketLaunch } from 'react-icons/md';
import { fadeIn, staggerContainer } from '@/lib/utils';
import SectionTitle from './ui/SectionTitle';
import GlowCard from './ui/GlowCard';
import krogerData from '@/data/kroger.json';

const iconMap: Record<string, React.ElementType> = {
  FaSearch, FaUserShield, FaListAlt,
};

type Project = typeof krogerData.projects[0];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  const Icon = iconMap[project.icon] || FaSearch;

  return (
    <motion.div
      variants={fadeIn('up', index * 0.1)}
      className="glass rounded-2xl border border-white/8 overflow-hidden group transition-all duration-300"
      style={{ ['--card-color' as string]: project.color }}
    >
      {/* Top color bar */}
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}55)` }} />

      {/* Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-6 flex items-start gap-4"
      >
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
          style={{ background: `${project.color}18`, color: project.color, boxShadow: `0 0 20px ${project.color}20` }}
        >
          <Icon size={24} />
        </div>

        {/* Title block */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full mb-2 inline-block"
                style={{ color: project.color, background: `${project.color}18`, border: `1px solid ${project.color}30` }}
              >
                {project.badge}
              </span>
              <h3 className="text-xl font-bold font-orbitron text-white leading-tight">
                {project.fullName}
              </h3>
            </div>
            <div
              className="flex-shrink-0 p-1.5 rounded-lg transition-colors mt-1"
              style={{ color: project.color }}
            >
              {expanded ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mt-2 pr-8">{project.overview}</p>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5">
              <div className="h-px bg-white/5" />

              {/* Scope */}
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                  Automation Scope
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {project.scope.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm text-slate-400">
                      <FaCheckCircle size={12} className="flex-shrink-0 mt-0.5" style={{ color: project.color }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact */}
              <div
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background: `${project.color}08`, border: `1px solid ${project.color}20` }}
              >
                <MdRocketLaunch size={18} className="flex-shrink-0 mt-0.5" style={{ color: project.color }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: project.color }}>
                    Impact
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">{project.impact}</p>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                  Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-lg"
                      style={{
                        color: project.color,
                        background: `${project.color}0D`,
                        border: `1px solid ${project.color}25`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function KrogerEngagement() {
  return (
    <section id="kroger" className="py-24 relative">
      {/* Subtle radial background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,229,255,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section title */}
        <SectionTitle
          tag="enterprise engagement"
          title="Client: "
          highlight="Kroger Technology"
          subtitle="5+ years supporting America's largest supermarket retailer — delivering quality engineering (QA) across iOS, Android, Web, and API at enterprise scale."
        />

        {/* Engagement overview card */}
        <motion.div
          variants={fadeIn('up', 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="glass rounded-2xl border border-neon-cyan/15 overflow-hidden">
            {/* Header strip */}
            <div className="px-6 py-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                 style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.05) 0%, rgba(139,92,246,0.05) 100%)' }}>
              <div className="flex items-center gap-4">
                {/* Kroger "K" badge */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/20 flex items-center justify-center">
                  <span className="text-xl font-black font-orbitron text-neon-cyan">K</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white font-orbitron">{krogerData.client}</h3>
                    <MdVerified size={16} className="text-neon-cyan" />
                  </div>
                  <p className="text-xs text-slate-500">{krogerData.clientTagline}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <FaBuilding size={11} className="text-neon-cyan/60" />
                  {krogerData.engagement}
                </span>
                <span className="flex items-center gap-1.5">
                  <FaCalendarAlt size={11} className="text-neon-cyan/60" />
                  {krogerData.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <FaMapMarkerAlt size={11} className="text-neon-cyan/60" />
                  {krogerData.location}
                </span>
              </div>
            </div>

            {/* Overview + stats */}
            <div className="p-6 grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <p className="text-slate-400 leading-relaxed">{krogerData.overview}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {krogerData.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl p-3 text-center border border-white/5"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  >
                    <div className="text-xl mb-0.5">{stat.icon}</div>
                    <div className="text-xl font-black font-orbitron text-neon-cyan">{stat.value}</div>
                    <div className="text-xs text-slate-600 leading-tight mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project cards */}
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-5"
        >
          {krogerData.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
