'use client';

import { motion } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { fadeIn, staggerContainer } from '@/lib/utils';
import SectionTitle from './ui/SectionTitle';
import certificationsData from '@/data/certifications.json';
import type { Certification } from '@/types';

const certifications = certificationsData as Certification[];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          tag="certifications"
          title="Certifications & "
          highlight="Credentials"
          subtitle="Industry-recognized certifications that validate my expertise in software quality engineering and testing methodologies."
        />

        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              variants={fadeIn('up', index * 0.08)}
              whileHover={{ y: -6 }}
              className="glass rounded-xl border border-white/8 overflow-hidden group transition-all duration-300"
              style={{
                ['--cert-color' as string]: cert.color,
              }}
            >
              {/* Top accent */}
              <div
                className="h-1"
                style={{ background: `linear-gradient(90deg, ${cert.color}, ${cert.color}60)` }}
              />

              <div className="p-5 space-y-4">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${cert.color}18`, color: cert.color }}
                >
                  <FaCertificate size={22} />
                </div>

                {/* Name & issuer */}
                <div>
                  <h3 className="font-bold text-white text-sm leading-tight mb-1 group-hover:text-opacity-90">
                    {cert.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MdVerified size={13} style={{ color: cert.color }} />
                    {cert.issuer}
                  </div>
                </div>

                {/* Status / Date */}
                {cert.status === 'In Progress' ? (
                  <div
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit"
                    style={{ color: cert.color, background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
                  >
                    <FaSpinner size={10} className="animate-spin" />
                    In Progress
                  </div>
                ) : cert.date ? (
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <FaCalendarAlt size={11} />
                    <span>
                      Issued {cert.date}
                      {cert.expiryDate ? ` · Expires ${cert.expiryDate}` : ''}
                    </span>
                  </div>
                ) : null}

                {/* Skills */}
                <div className="flex flex-wrap gap-1">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-1.5 py-0.5 rounded text-slate-500 bg-white/5 border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Verify link */}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
                    style={{ color: cert.color }}
                  >
                    <FaExternalLinkAlt size={10} />
                    Verify Credential
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
