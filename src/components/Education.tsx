'use client';

import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaBook } from 'react-icons/fa';
import { MdSchool } from 'react-icons/md';
import { fadeIn, staggerContainer } from '@/lib/utils';
import SectionTitle from './ui/SectionTitle';
import educationData from '@/data/education.json';
import type { Education } from '@/types';

const education = educationData as Education[];

export default function Education() {
  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionTitle
          tag="education"
          title="Academic "
          highlight="Background"
          subtitle="A foundation in computer science combined with ongoing business management studies."
        />

        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              variants={fadeIn('up', index * 0.1)}
              whileHover={{ y: -5 }}
              className="glass rounded-xl border border-white/8 overflow-hidden group transition-all duration-300 hover:border-white/15"
            >
              {/* Top accent */}
              <div
                className="h-1"
                style={{ background: `linear-gradient(90deg, ${edu.color}, ${edu.color}50)` }}
              />

              <div className="p-6 space-y-4">
                {/* Icon + degree */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `${edu.color}18`, color: edu.color }}
                  >
                    {edu.status === 'Pursuing' ? (
                      <MdSchool size={24} />
                    ) : (
                      <FaGraduationCap size={22} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <h3 className="font-bold text-white text-base leading-tight">
                        {edu.degree}
                      </h3>
                      {edu.status && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                          style={{
                            color: edu.color,
                            background: `${edu.color}18`,
                            border: `1px solid ${edu.color}30`,
                          }}
                        >
                          {edu.status}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold mt-1" style={{ color: edu.color }}>
                      {edu.institution}
                    </p>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <FaCalendarAlt size={10} style={{ color: edu.color, opacity: 0.7 }} />
                    {edu.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaMapMarkerAlt size={10} style={{ color: edu.color, opacity: 0.7 }} />
                    {edu.location}
                  </span>
                </div>

                {/* Relevant areas */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <FaBook size={11} className="text-slate-600" />
                    <span className="text-xs text-slate-600 uppercase tracking-widest">Relevant Areas</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.relevantAreas.map((area) => (
                      <span
                        key={area}
                        className="text-xs px-2.5 py-1 rounded-md font-medium"
                        style={{
                          color: edu.color,
                          background: `${edu.color}0D`,
                          border: `1px solid ${edu.color}25`,
                        }}
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
