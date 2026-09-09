import React from 'react';
import {
  Document, Page, View, Text, Image, StyleSheet, Font,
} from '@react-pdf/renderer';
import profile from '@/data/profile.json';
import experienceData from '@/data/experience.json';
import educationData from '@/data/education.json';
import skillsData from '@/data/skills.json';
import projectsData from '@/data/projects.json';
import certificationsData from '@/data/certifications.json';
import type { Experience, Education, SkillCategory, Project, Certification } from '@/types';

const experiences  = experienceData  as Experience[];
const educations   = educationData   as Education[];
const skillCats    = skillsData      as SkillCategory[];
const featuredProj = (projectsData   as Project[]).filter((p) => p.featured);
const certs        = certificationsData as Certification[];

/* ── Colours ──────────────────────────────────────────────────────────── */
const C = {
  dark:    '#0F172A',
  heading: '#1E293B',
  body:    '#374151',
  muted:   '#6B7280',
  accent:  '#0891B2',  // cyan
  purple:  '#7C3AED',
  green:   '#059669',
  border:  '#E2E8F0',
  badge:   '#EFF6FF',
  bg:      '#F8FAFC',
};

/* ── Styles ───────────────────────────────────────────────────────────── */
const s = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: C.body,
    backgroundColor: '#FFFFFF',
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 36,
  },

  /* header */
  header: { flexDirection: 'row', gap: 16, marginBottom: 14 },
  photo: { width: 68, height: 68, borderRadius: 8, objectFit: 'cover' },
  headerText: { flex: 1, justifyContent: 'center' },
  name: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: C.dark, letterSpacing: 0.5 },
  jobTitle: { fontSize: 10, color: C.accent, marginTop: 2, fontFamily: 'Helvetica-Bold' },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 5 },
  contactChip: { fontSize: 7.5, color: C.muted },
  dot: { fontSize: 7.5, color: C.border },

  /* award highlight */
  awardBox: {
    flexDirection: 'row', gap: 6, backgroundColor: '#FFFBEB',
    borderLeft: 3, borderLeftColor: '#F59E0B',
    paddingHorizontal: 8, paddingVertical: 5, borderRadius: 4, marginBottom: 10,
  },
  awardText: { fontSize: 8, color: '#92400E', flex: 1 },
  awardName: { fontFamily: 'Helvetica-Bold', color: '#78350F' },

  /* section */
  section: { marginBottom: 10 },
  sectionTitle: {
    fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.accent,
    textTransform: 'uppercase', letterSpacing: 1.2,
    borderBottom: 1, borderBottomColor: C.accent,
    paddingBottom: 2, marginBottom: 6,
  },

  /* experience */
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1 },
  expRole: { fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: C.dark },
  expMeta: { fontSize: 7.5, color: C.muted, textAlign: 'right' },
  expCompany: { fontSize: 8.5, color: C.accent, marginBottom: 3 },
  bullet: { flexDirection: 'row', gap: 5, marginBottom: 1.5 },
  bulletDot: { color: C.muted, marginTop: 0.5 },
  bulletText: { flex: 1, fontSize: 8, color: C.body, lineHeight: 1.5 },
  starDot: { color: C.accent, marginTop: 0.5 },
  techRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 4 },
  techChip: {
    fontSize: 7, color: C.accent, backgroundColor: C.badge,
    paddingHorizontal: 5, paddingVertical: 2, borderRadius: 3,
  },

  /* skills */
  skillRow: { flexDirection: 'row', marginBottom: 3 },
  skillLabel: { width: 130, fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.heading },
  skillValue: { flex: 1, fontSize: 8, color: C.body, lineHeight: 1.5 },

  /* education */
  eduRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  eduDeg: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.dark },
  eduInst: { fontSize: 8, color: C.muted, marginTop: 1 },
  eduDur: { fontSize: 8, color: C.muted, textAlign: 'right' },
  badge: {
    fontSize: 7, fontFamily: 'Helvetica-Bold', color: C.purple,
    backgroundColor: '#EDE9FE', paddingHorizontal: 5, paddingVertical: 2,
    borderRadius: 3, marginLeft: 5,
  },

  /* projects */
  projTitle: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.dark },
  projDesc: { fontSize: 8, color: C.body, marginTop: 1.5, lineHeight: 1.5 },
  projStack: { fontSize: 7.5, color: C.muted, marginTop: 2 },

  /* certs */
  certRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  certName: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: C.dark },
  certIssuer: { fontSize: 8, color: C.muted },
  certStatus: {
    fontSize: 7, fontFamily: 'Helvetica-Bold', color: C.accent,
    backgroundColor: C.badge, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 3,
  },

  divider: { borderBottom: 0.5, borderBottomColor: C.border, marginVertical: 8 },
  expBlock: { marginBottom: 8 },
  projBlock: { marginBottom: 6 },
});

/* ── Document ─────────────────────────────────────────────────────────── */
export function ResumePDFDoc({ photoBase64 }: { photoBase64?: string }) {
  return (
    <Document
      title={`${profile.name} — Resume`}
      author={profile.name}
      subject="Software Quality Engineer Resume"
    >
      <Page size="A4" style={s.page}>

        {/* ── HEADER ──────────────────────────────────────────────── */}
        <View style={s.header}>
          {photoBase64 && (
            <Image style={s.photo} src={`data:image/png;base64,${photoBase64}`} />
          )}
          <View style={s.headerText}>
            <Text style={s.name}>{profile.name}</Text>
            <Text style={s.jobTitle}>{profile.title}</Text>
            <View style={s.contactRow}>
              <Text style={s.contactChip}>{profile.location}</Text>
              <Text style={s.dot}>·</Text>
              <Text style={s.contactChip}>{profile.email}</Text>
              <Text style={s.dot}>·</Text>
              <Text style={s.contactChip}>{profile.phone}</Text>
              <Text style={s.dot}>·</Text>
              <Text style={s.contactChip}>linkedin.com/in/aman-kumar-2a809753</Text>
              <Text style={s.dot}>·</Text>
              <Text style={s.contactChip}>github.com/codedbyaman</Text>
            </View>
          </View>
        </View>

        {/* ── AWARD HIGHLIGHT ─────────────────────────────────────── */}
        {experiences[0]?.awards?.map((award) => (
          <View key={award.name} style={s.awardBox}>
            <Text style={{ fontSize: 10 }}>🏆</Text>
            <Text style={s.awardText}>
              <Text style={s.awardName}>{award.name} — </Text>
              {award.description}
            </Text>
          </View>
        ))}

        {/* ── SUMMARY ─────────────────────────────────────────────── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Professional Summary</Text>
          <Text style={{ fontSize: 8, lineHeight: 1.6, color: C.body }}>{profile.bio}</Text>
        </View>

        {/* ── EXPERIENCE ──────────────────────────────────────────── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Professional Experience</Text>
          {experiences.map((exp) => (
            <View key={exp.id} style={s.expBlock} wrap={false}>
              <View style={s.expHeader}>
                <Text style={s.expRole}>{exp.role}</Text>
                <View>
                  <Text style={s.expMeta}>{exp.duration}</Text>
                  <Text style={s.expMeta}>{exp.location}</Text>
                </View>
              </View>
              <Text style={s.expCompany}>
                {exp.company}{exp.clientNote ? `  ·  ${exp.clientNote}` : ''}
              </Text>

              {exp.responsibilities.slice(0, 5).map((r, i) => (
                <View key={i} style={s.bullet}>
                  <Text style={s.bulletDot}>▸</Text>
                  <Text style={s.bulletText}>{r}</Text>
                </View>
              ))}

              {exp.achievements.slice(0, 3).map((a, i) => (
                <View key={i} style={s.bullet}>
                  <Text style={s.starDot}>★</Text>
                  <Text style={s.bulletText}>{a}</Text>
                </View>
              ))}

              {exp.technologies.length > 0 && (
                <View style={s.techRow}>
                  {exp.technologies.map((t) => (
                    <Text key={t} style={s.techChip}>{t}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* ── SKILLS ──────────────────────────────────────────────── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Technical Skills</Text>
          {skillCats.map((cat) => (
            <View key={cat.id} style={s.skillRow}>
              <Text style={s.skillLabel}>{cat.name}:</Text>
              <Text style={s.skillValue}>{cat.skills.map((sk) => sk.name).join('  ·  ')}</Text>
            </View>
          ))}
        </View>

        {/* ── EDUCATION ───────────────────────────────────────────── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Education</Text>
          {educations.map((edu) => (
            <View key={edu.id} style={s.eduRow}>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={s.eduDeg}>{edu.degree}</Text>
                  {edu.status && <Text style={s.badge}>{edu.status}</Text>}
                </View>
                <Text style={s.eduInst}>{edu.institution}  ·  {edu.location}</Text>
              </View>
              <Text style={s.eduDur}>{edu.duration}</Text>
            </View>
          ))}
        </View>

        {/* ── PROJECTS ────────────────────────────────────────────── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Key Projects</Text>
          {featuredProj.map((proj) => (
            <View key={proj.id} style={s.projBlock} wrap={false}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={s.projTitle}>
                  {proj.title}{proj.stars && proj.stars > 0 ? `  ⭐ ${proj.stars}` : ''}
                </Text>
                {proj.github && <Text style={{ fontSize: 7.5, color: C.accent }}>{proj.github}</Text>}
              </View>
              <Text style={s.projDesc}>{proj.description}</Text>
              <Text style={s.projStack}>Stack: {proj.technologies.join(', ')}</Text>
            </View>
          ))}
        </View>

        {/* ── CERTIFICATIONS ──────────────────────────────────────── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Certifications</Text>
          {certs.map((cert) => (
            <View key={cert.id} style={s.certRow}>
              <View>
                <Text style={s.certName}>{cert.name}</Text>
                <Text style={s.certIssuer}>{cert.issuer}</Text>
              </View>
              <Text style={s.certStatus}>{cert.status ?? 'Completed'}</Text>
            </View>
          ))}
        </View>

      </Page>
    </Document>
  );
}
