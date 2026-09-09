'use client';

import { motion } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaStar, FaTrophy } from 'react-icons/fa';
import { MdBusiness } from 'react-icons/md';
import { useState } from 'react';
import { fadeIn, staggerContainer } from '@/lib/utils';
import SectionTitle from './ui/SectionTitle';
import GlowCard from './ui/GlowCard';
import experienceData from '@/data/experience.json';
import type { Experience } from '@/types';

const experiences = experienceData as Experience[];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionTitle
          tag="experience"
          title="Work "
          highlight="Experience"
          subtitle="My professional journey building quality into products that matter."
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent lg:-translate-x-px hidden lg:block" />

          <motion.div
            variants={staggerContainer(0.15, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-10"
          >
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  variants={fadeIn(isLeft ? 'right' : 'left', 0)}
                  className={`relative flex flex-col lg:flex-row gap-6 ${
                    !isLeft ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-6 items-center justify-center w-8 h-8 rounded-full border-2 border-dark-300 z-10">
                    <div className="w-4 h-4 rounded-full bg-neon-cyan shadow-neon-cyan" />
                  </div>

                  {/* Spacer for opposite side on desktop */}
                  <div className="hidden lg:block w-1/2" />

                  {/* Card */}
                  <div className="lg:w-1/2">
                    <GlowCard glowColor="cyan" className="p-6 space-y-4">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 rounded-lg bg-neon-cyan/10 text-neon-cyan flex-shrink-0 mt-0.5">
                            <FaBriefcase size={16} />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white font-orbitron leading-tight">
                              {exp.role}
                            </h3>
                            <p className="text-neon-cyan font-semibold mt-0.5">{exp.company}</p>
                            {exp.clientNote && (
                              <p className="text-xs text-neon-purple/80 mt-0.5 flex items-center gap-1">
                                <MdBusiness size={11} />
                                {exp.clientNote}
                              </p>
                            )}
                          </div>
                        </div>
                        <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full border border-neon-purple/30 text-neon-purple bg-neon-purple/10 flex-shrink-0">
                          {exp.type}
                        </span>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <FaCalendarAlt size={12} className="text-neon-cyan/60" />
                          {exp.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FaMapMarkerAlt size={12} className="text-neon-cyan/60" />
                          {exp.location}
                        </span>
                      </div>

                      <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>

                      {/* Awards */}
                      {exp.awards && exp.awards.length > 0 && (
                        <div className="space-y-2">
                          {exp.awards.map((award) => (
                            <div
                              key={award.name}
                              className="flex items-start gap-3 px-4 py-3 rounded-xl border"
                              style={{
                                background: 'rgba(250,204,21,0.06)',
                                borderColor: 'rgba(250,204,21,0.25)',
                              }}
                            >
                              <FaTrophy size={15} className="flex-shrink-0 mt-0.5 text-yellow-400" />
                              <div>
                                <p className="text-sm font-bold text-yellow-400 leading-tight">{award.name}</p>
                                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{award.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Responsibilities */}
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                          Responsibilities
                        </p>
                        <ul className="space-y-2">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                              <FaCheckCircle size={12} className="text-neon-cyan/60 flex-shrink-0 mt-1" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Achievements */}
                      {exp.achievements.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                            Key Achievements
                          </p>
                          <ul className="space-y-2">
                            {exp.achievements.map((ach, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-neon-cyan/80">
                                <FaStar size={11} className="flex-shrink-0 mt-1" />
                                {ach}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Initiatives */}
                      {exp.initiatives && exp.initiatives.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                            Key Initiatives
                          </p>
                          <div className="space-y-2">
                            {exp.initiatives.map((init) => (
                              <div key={init.name} className="rounded-lg bg-white/3 border border-white/5 p-3">
                                <p className="text-xs font-semibold text-neon-cyan mb-1">{init.name}</p>
                                <p className="text-xs text-slate-500 leading-relaxed">{init.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-xs rounded-md text-slate-400 border border-white/10 bg-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </GlowCard>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
