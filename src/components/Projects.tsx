'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCode, FaCodeBranch, FaLock } from 'react-icons/fa';
import { fadeIn, staggerContainer } from '@/lib/utils';
import SectionTitle from './ui/SectionTitle';
import projectsData from '@/data/projects.json';
import type { Project } from '@/types';

const projects = projectsData as Project[];
const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

const categoryColors: Record<string, string> = {
  'Android Testing':      '#4ADE80',
  'iOS Testing':          '#00E5FF',
  'Automation Framework': '#F59E0B',
  'AI Tools':             '#A78BFA',
  'iOS App':              '#60A5FA',
  'Android App':          '#34D399',
  'Enterprise QA':        '#F472B6',
  'CI/CD':                '#8B5CF6',
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const featured = filtered.filter((p) => p.featured);
  const rest     = filtered.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          tag="projects"
          title="Open Source & "
          highlight="Projects"
          subtitle="Real automation frameworks, testing tools, and mobile apps — from GitHub contributions to enterprise-scale quality engineering."
        />

        {/* Category filter */}
        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {categories.map((cat) => {
            const color = categoryColors[cat];
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                variants={fadeIn('up', 0)}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 text-sm rounded-lg transition-all duration-200 font-medium border"
                style={
                  isActive
                    ? { background: color ? `${color}22` : 'rgba(0,229,255,0.15)', color: color || '#00E5FF', borderColor: `${color || '#00E5FF'}50` }
                    : { background: 'transparent', color: '#64748B', borderColor: 'rgba(255,255,255,0.08)' }
                }
              >
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Featured row */}
            {featured.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                {featured.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} featured />
                ))}
              </div>
            )}

            {/* Rest grid */}
            {rest.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {rest.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, featured = false }: { project: Project; index: number; featured?: boolean }) {
  const color = categoryColors[project.category] || '#00E5FF';
  const isEnterprise = !project.github;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group glass rounded-xl border border-white/8 overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col"
      style={{ ['--c' as string]: color }}
    >
      {/* Top accent bar */}
      <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${color}, ${color}50)` }} />

      {/* Header */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          {/* Category + enterprise badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ color, background: `${color}15`, border: `1px solid ${color}30` }}
            >
              {project.category}
            </span>
            {isEnterprise && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full text-slate-500 border border-white/10 flex items-center gap-1">
                <FaLock size={9} /> Enterprise
              </span>
            )}
          </div>

          {/* Stars / forks */}
          {(project.stars ?? 0) > 0 && (
            <div className="flex items-center gap-2.5 text-xs text-slate-500 flex-shrink-0">
              <span className="flex items-center gap-1">
                <FaStar size={11} className="text-yellow-400" />
                {project.stars}
              </span>
              {(project.forks ?? 0) > 0 && (
                <span className="flex items-center gap-1">
                  <FaCodeBranch size={11} className="text-slate-600" />
                  {project.forks}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Title */}
        <h3
          className="font-bold text-white leading-tight transition-colors duration-200"
          style={{ fontSize: featured ? '1.1rem' : '1rem' }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs rounded-md border"
              style={{ color: `${color}CC`, background: `${color}0A`, borderColor: `${color}20` }}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2 py-0.5 text-xs rounded-md text-slate-600 bg-white/4 border border-white/8">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Footer links */}
      <div className="px-5 py-3 border-t border-white/5 flex items-center gap-4">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors text-slate-500 hover:text-white"
          >
            <FaGithub size={13} />
            View on GitHub
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-700">
            <FaLock size={11} />
            Private — Enterprise
          </span>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-neon-purple transition-colors"
          >
            <FaExternalLinkAlt size={11} />
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}
