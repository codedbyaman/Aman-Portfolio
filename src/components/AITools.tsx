'use client';

import { motion } from 'framer-motion';
import {
  FaCode, FaRobot, FaBrain,
} from 'react-icons/fa';
import { SiGithub, SiGoogle } from 'react-icons/si';
import { fadeIn, staggerContainer } from '@/lib/utils';
import SectionTitle from './ui/SectionTitle';
import aiToolsData from '@/data/aiTools.json';
import type { AITool } from '@/types';

const aiTools = aiToolsData as AITool[];

const iconMap: Record<string, React.ElementType> = {
  SiGithub, SiGoogle, FaCode, FaRobot, FaBrain,
  SiAnthropic: FaBrain,
  SiOpenai: FaRobot,
};

// We use a custom Anthropic icon (just brain since react-icons doesn't have it)
function getIcon(iconName: string): React.ElementType {
  return iconMap[iconName] || FaBrain;
}

export default function AITools() {
  return (
    <section id="ai-tools" className="py-24 relative">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,229,255,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle
          tag="ai & productivity"
          title="AI Tools & "
          highlight="Workflows"
          subtitle="Harnessing the power of modern AI to write better tests, faster — without compromising quality."
        />

        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {aiTools.map((tool, index) => {
            const Icon = getIcon(tool.icon);
            return (
              <motion.div
                key={tool.id}
                variants={fadeIn('up', index * 0.05)}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass rounded-xl border border-white/8 p-5 space-y-4 transition-all duration-300 group hover:border-white/15"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{ background: `${tool.color}20`, color: tool.color }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">{tool.name}</h3>
                      <p className="text-xs text-slate-600">{tool.tagline}</p>
                    </div>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium border flex-shrink-0"
                    style={{
                      color: tool.color,
                      borderColor: `${tool.color}30`,
                      background: `${tool.color}10`,
                    }}
                  >
                    {tool.category}
                  </span>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed">{tool.description}</p>

                {/* Use cases */}
                <div>
                  <p className="text-xs text-slate-600 uppercase tracking-widest mb-2">Use Cases</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tool.useCases.map((uc) => (
                      <span
                        key={uc}
                        className="text-xs px-2 py-0.5 rounded-md text-slate-400 border border-white/8 bg-white/4"
                      >
                        {uc}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* AI productivity banner */}
        <motion.div
          variants={fadeIn('up', 0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-10 p-6 rounded-xl border border-neon-purple/20 bg-gradient-to-r from-neon-purple/5 to-neon-cyan/5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        >
          <div className="w-12 h-12 rounded-full bg-neon-purple/20 flex items-center justify-center flex-shrink-0">
            <FaBrain size={22} className="text-neon-purple" />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">
              AI-Augmented Testing Philosophy
            </h4>
            <p className="text-sm text-slate-400">
              I believe in using AI as a force multiplier — not a replacement. Every AI-generated test is reviewed, refined, and validated. The result: faster delivery without sacrificing reliability.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
