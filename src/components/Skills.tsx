'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCode, FaRobot, FaMobileAlt, FaLayerGroup, FaInfinity, FaBrain, FaCloud,
} from 'react-icons/fa';
import { fadeIn, staggerContainer } from '@/lib/utils';
import SectionTitle from './ui/SectionTitle';
import GlowCard from './ui/GlowCard';
import skillsData from '@/data/skills.json';
import type { SkillCategory } from '@/types';

const skills = skillsData as SkillCategory[];

const iconMap: Record<string, React.ElementType> = {
  FaCode, FaRobot, FaMobileAlt, FaLayerGroup, FaInfinity, FaBrain, FaCloud,
};

interface SkillBarProps {
  name: string;
  level: number;
  color: string;
  delay: number;
}

function SkillBar({ name, level, color, delay }: SkillBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="space-y-1.5"
    >
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-300 font-medium">{name}</span>
        <span className="text-xs font-mono" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
        >
          <motion.div
            animate={{ x: ['0%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skills[0].id);
  const activeSkill = skills.find((s) => s.id === activeCategory)!;

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          tag="skills"
          title="Technical "
          highlight="Skills"
          subtitle="A comprehensive toolkit built through years of hands-on experience in mobile QA and automation."
        />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category tabs */}
          <motion.div
            variants={staggerContainer(0.06, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 flex-shrink-0"
          >
            {skills.map((category) => {
              const Icon = iconMap[category.icon] || FaCode;
              const isActive = activeCategory === category.id;
              return (
                <motion.button
                  key={category.id}
                  variants={fadeIn('right', 0)}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 whitespace-nowrap lg:whitespace-normal flex-shrink-0 lg:flex-shrink ${
                    isActive
                      ? 'text-dark-300 font-semibold'
                      : 'glass text-slate-400 hover:text-slate-200 border border-white/5 hover:border-white/10'
                  }`}
                  style={
                    isActive
                      ? {
                          background: `linear-gradient(135deg, ${category.color}, ${category.color}99)`,
                          boxShadow: `0 0 20px ${category.color}40`,
                        }
                      : {}
                  }
                >
                  <Icon size={16} />
                  <span className="text-sm font-medium">{category.name}</span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Skills panel */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
              >
                <GlowCard className="p-6 lg:p-8" hover={false}>
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="p-3 rounded-xl"
                      style={{ background: `${activeSkill.color}20`, color: activeSkill.color }}
                    >
                      {(() => {
                        const Icon = iconMap[activeSkill.icon] || FaCode;
                        return <Icon size={22} />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white font-orbitron">{activeSkill.name}</h3>
                      <p className="text-sm text-slate-500">{activeSkill.skills.length} skills</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                    {activeSkill.skills.map((skill, i) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        color={activeSkill.color}
                        delay={i * 0.05}
                      />
                    ))}
                  </div>
                </GlowCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* All skills chip cloud */}
        <motion.div
          variants={staggerContainer(0.03, 0.5)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap gap-2 justify-center"
        >
          {skills.flatMap((cat) =>
            cat.skills.map((skill) => (
              <motion.span
                key={`${cat.id}-${skill.name}`}
                variants={fadeIn('up', 0)}
                whileHover={{ scale: 1.08, y: -2 }}
                className="px-3 py-1.5 text-xs rounded-full font-medium cursor-default transition-all duration-200"
                style={{
                  color: cat.color,
                  borderColor: `${cat.color}30`,
                  backgroundColor: `${cat.color}08`,
                  border: '1px solid',
                }}
              >
                {skill.name}
              </motion.span>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}
