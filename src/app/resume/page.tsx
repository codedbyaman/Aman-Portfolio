'use client';

import profile from '@/data/profile.json';
import experienceData from '@/data/experience.json';
import educationData from '@/data/education.json';
import skillsData from '@/data/skills.json';
import projectsData from '@/data/projects.json';
import certificationsData from '@/data/certifications.json';
import type { Experience, Education, SkillCategory, Project, Certification } from '@/types';
import Link from 'next/link';
import { FaDownload, FaArrowLeft, FaTrophy, FaStar, FaGithub } from 'react-icons/fa';

const experiences = experienceData as Experience[];
const educations = educationData as Education[];
const skillCategories = skillsData as SkillCategory[];
const featuredProjects = (projectsData as Project[]).filter((p) => p.featured);
const certifications = certificationsData as Certification[];

function Divider() {
  return <div className="border-b-2 border-gray-800 mb-2" />;
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-2">
      <h2 className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-800">{title}</h2>
      <Divider />
    </div>
  );
}

export default function ResumePage() {
  return (
    <>
      <style>{`
        @media print {
          @page { margin: 0.45in 0.5in; size: A4; }
          html, body { background: white !important; }
          .no-print { display: none !important; }
          a { color: inherit; text-decoration: none; }
        }
        @media screen {
          body { background: #f3f4f6; }
        }
      `}</style>

      {/* Screen-only action bar */}
      <div className="no-print fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-gray-900 border-b border-white/10">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <FaArrowLeft size={12} />
          Back to Portfolio
        </Link>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-gray-900 rounded-lg transition-colors"
        >
          <FaDownload size={12} />
          Download / Save as PDF
        </button>
      </div>

      {/* Page wrapper */}
      <div className="min-h-screen bg-gray-100 print:bg-white pt-16 pb-12 print:pt-0 print:pb-0">
        <div
          id="resume-content"
          className="max-w-[780px] mx-auto bg-white print:shadow-none shadow-2xl px-10 py-9 print:px-0 print:py-0 text-gray-800"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          {/* ── HEADER ─────────────────────────────────────────────── */}
          <div className="text-center mb-5">
            <h1
              className="text-[26px] font-black tracking-wide text-gray-900 uppercase"
              style={{ fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '0.12em' }}
            >
              {profile.name}
            </h1>
            <p
              className="text-[12.5px] font-semibold text-gray-600 mt-0.5 tracking-wide"
              style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
            >
              {profile.title}
            </p>
            <div
              className="flex flex-wrap items-center justify-center gap-x-3 mt-2 text-[10.5px] text-gray-500"
              style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
            >
              <span>{profile.location}</span>
              <span className="text-gray-300">|</span>
              <a href={`mailto:${profile.email}`} className="hover:text-gray-800">{profile.email}</a>
              <span className="text-gray-300">|</span>
              <span>{profile.phone}</span>
              <span className="text-gray-300">|</span>
              <a href={profile.linkedin} className="hover:text-gray-800">LinkedIn</a>
              <span className="text-gray-300">|</span>
              <a href={profile.github} className="hover:text-gray-800">github.com/codedbyaman</a>
            </div>
          </div>

          {/* ── SUMMARY ────────────────────────────────────────────── */}
          <div className="mb-4">
            <SectionTitle title="Professional Summary" />
            <p className="text-[11px] leading-[1.7] text-gray-700">{profile.bio}</p>
          </div>

          {/* ── EXPERIENCE ─────────────────────────────────────────── */}
          <div className="mb-4">
            <SectionTitle title="Professional Experience" />
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div
                    className="flex justify-between items-start"
                    style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
                  >
                    <div>
                      <h3 className="text-[12px] font-black text-gray-900">{exp.role}</h3>
                      <p className="text-[11px] font-bold text-gray-700">
                        {exp.company}
                        {exp.clientNote && (
                          <span className="font-normal text-gray-500"> · {exp.clientNote}</span>
                        )}
                      </p>
                    </div>
                    <div className="text-right text-[10.5px] text-gray-500 flex-shrink-0 ml-4">
                      <p className="font-semibold">{exp.duration}</p>
                      <p>{exp.location} · {exp.type}</p>
                    </div>
                  </div>

                  {/* Award highlight */}
                  {exp.awards && exp.awards.length > 0 && exp.awards.map((award) => (
                    <div
                      key={award.name}
                      className="mt-1.5 flex items-start gap-1.5 bg-yellow-50 border border-yellow-200 rounded px-2 py-1"
                    >
                      <span className="text-yellow-500 text-[11px] flex-shrink-0">🏆</span>
                      <p className="text-[10.5px] text-gray-800">
                        <strong>{award.name}</strong> — {award.description}
                      </p>
                    </div>
                  ))}

                  {/* Responsibilities */}
                  <ul className="mt-1.5 space-y-0.5">
                    {exp.responsibilities.slice(0, 6).map((resp, i) => (
                      <li key={i} className="text-[10.5px] text-gray-700 flex items-start gap-2 leading-[1.55]">
                        <span className="text-gray-400 flex-shrink-0 mt-[1px]">▸</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Key achievements */}
                  {exp.achievements.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {exp.achievements.slice(0, 3).map((ach, i) => (
                        <li key={i} className="text-[10.5px] text-gray-700 flex items-start gap-2 leading-[1.55]">
                          <span className="text-blue-500 flex-shrink-0 mt-[1px]">★</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech stack */}
                  <p className="mt-1.5 text-[10px] text-gray-500">
                    <strong className="text-gray-600">Technologies:</strong>{' '}
                    {exp.technologies.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── TECHNICAL SKILLS ───────────────────────────────────── */}
          <div className="mb-4">
            <SectionTitle title="Technical Skills" />
            <div className="space-y-1">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="flex text-[10.5px] leading-[1.5]">
                  <span
                    className="font-bold text-gray-800 flex-shrink-0 w-[160px]"
                    style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
                  >
                    {cat.name}:
                  </span>
                  <span className="text-gray-700">{cat.skills.map((s) => s.name).join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── EDUCATION ──────────────────────────────────────────── */}
          <div className="mb-4">
            <SectionTitle title="Education" />
            <div className="space-y-2">
              {educations.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3
                      className="text-[11.5px] font-bold text-gray-900"
                      style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
                    >
                      {edu.degree}
                      {edu.status && (
                        <span className="ml-2 text-[10px] font-semibold text-blue-600 border border-blue-300 rounded px-1.5 py-0.5">
                          {edu.status}
                        </span>
                      )}
                    </h3>
                    <p className="text-[10.5px] text-gray-600">{edu.institution} · {edu.location}</p>
                    {edu.relevantAreas && edu.relevantAreas.length > 0 && (
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        Relevant areas: {edu.relevantAreas.join(', ')}
                      </p>
                    )}
                  </div>
                  <p className="text-[10.5px] text-gray-500 flex-shrink-0 ml-4 font-medium">{edu.duration}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── KEY PROJECTS ───────────────────────────────────────── */}
          <div className="mb-4">
            <SectionTitle title="Key Projects" />
            <div className="space-y-2.5">
              {featuredProjects.map((proj) => (
                <div key={proj.id} className="break-inside-avoid">
                  <div className="flex justify-between items-start">
                    <h3
                      className="text-[11.5px] font-bold text-gray-900"
                      style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
                    >
                      {proj.title}
                      {proj.stars && proj.stars > 0 && (
                        <span className="ml-2 text-[10px] font-normal text-gray-500">⭐ {proj.stars}</span>
                      )}
                    </h3>
                    {proj.github && (
                      <a
                        href={proj.github}
                        className="text-[10px] text-blue-600 hover:underline flex-shrink-0 ml-2"
                      >
                        github
                      </a>
                    )}
                  </div>
                  <p className="text-[10.5px] text-gray-700 mt-0.5 leading-[1.55]">{proj.description}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    <strong className="text-gray-600">Stack:</strong> {proj.technologies.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── CERTIFICATIONS ─────────────────────────────────────── */}
          <div>
            <SectionTitle title="Certifications" />
            <div className="space-y-1">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-center text-[10.5px]">
                  <div>
                    <span className="font-bold text-gray-800">{cert.name}</span>
                    <span className="text-gray-500"> — {cert.issuer}</span>
                  </div>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded border flex-shrink-0 ml-2"
                    style={{
                      color: cert.status === 'In Progress' ? '#0891b2' : '#059669',
                      borderColor: cert.status === 'In Progress' ? '#a5f3fc' : '#a7f3d0',
                      background: cert.status === 'In Progress' ? '#ecfeff' : '#ecfdf5',
                    }}
                  >
                    {cert.status ?? 'Completed'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
