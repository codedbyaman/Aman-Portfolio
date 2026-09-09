'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaRocket } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { fadeIn, staggerContainer } from '@/lib/utils';
import SectionTitle from './ui/SectionTitle';
import GlowCard from './ui/GlowCard';
import profile from '@/data/profile.json';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 });

  useEffect(() => {
    if (inView) {
      motionValue.set(target);
    }
  }, [inView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest: number) => {
      if (ref.current) {
        ref.current.textContent = `${Math.floor(latest)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const highlights = [
  { icon: FaMapMarkerAlt, label: 'Location', value: profile.location },
  { icon: FaBriefcase, label: 'Role', value: profile.title },
  { icon: MdVerified, label: 'Availability', value: profile.availability },
  { icon: FaRocket, label: 'Focus', value: 'Testing, Automation, AI' },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          tag="about me"
          title="Who I "
          highlight="Am"
          subtitle="Bridging quality engineering and modern AI tools to ship software that just works."
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: About text */}
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={fadeIn('right', 0)} className="space-y-4">
              {profile.aboutText.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-slate-400 leading-relaxed text-base lg:text-lg">
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* Highlights grid */}
            <motion.div
              variants={staggerContainer(0.08)}
              className="grid grid-cols-2 gap-3 pt-4"
            >
              {highlights.map(({ icon: Icon, label, value }) => (
                <motion.div
                  key={label}
                  variants={fadeIn('up', 0)}
                  className="glass rounded-lg p-3 border border-white/5 hover:border-neon-cyan/20 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-md bg-neon-cyan/10 text-neon-cyan group-hover:shadow-neon-cyan transition-shadow">
                      <Icon size={14} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 uppercase tracking-widest">{label}</p>
                      <p className="text-sm text-slate-300 font-medium mt-0.5 leading-tight">{value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            variants={staggerContainer(0.15, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  value: profile.stats.yearsOfExperience,
                  suffix: '+',
                  label: 'Years of Experience',
                  color: '#00E5FF',
                  icon: '⚡',
                },
                {
                  value: profile.stats.projectsCompleted,
                  suffix: '+',
                  label: 'Projects Completed',
                  color: '#8B5CF6',
                  icon: '🚀',
                },
                {
                  value: profile.stats.companiesWorked,
                  suffix: '',
                  label: 'Companies Worked',
                  color: '#22D3EE',
                  icon: '🏢',
                },
                {
                  value: null,
                  rawValue: profile.stats.testsAutomated,
                  label: 'Tests Automated',
                  color: '#F472B6',
                  icon: '🤖',
                },
              ].map((stat) => (
                <GlowCard
                  key={stat.label}
                  glowColor={
                    stat.color === '#00E5FF'
                      ? 'cyan'
                      : stat.color === '#8B5CF6'
                      ? 'purple'
                      : stat.color === '#22D3EE'
                      ? 'blue'
                      : 'pink'
                  }
                  hover
                  className="p-5 text-center"
                >
                  <div className="text-3xl mb-1">{stat.icon}</div>
                  <div
                    className="text-4xl font-black font-orbitron mb-1"
                    style={{ color: stat.color }}
                  >
                    {stat.value !== null ? (
                      <AnimatedCounter target={stat.value as number} suffix={stat.suffix} />
                    ) : (
                      <span>{stat.rawValue}</span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </GlowCard>
              ))}
            </div>

            {/* Tech chips */}
            <GlowCard className="p-5" hover={false}>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Core Expertise</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'XCTest', 'XCUITest', 'Appium', 'Espresso',
                  'Mobile Testing', 'iOS Testing', 'Android Testing',
                  'API Testing', 'Web Testing', 'Page Object Model',
                  'CI/CD', 'GitHub Actions', 'Testing Management',
                  'Agentic AI', 'AI', 'AI-Assisted Dev', 'Accessibility',
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs rounded-md font-medium text-neon-cyan border border-neon-cyan/20 bg-neon-cyan/5 hover:bg-neon-cyan/15 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
