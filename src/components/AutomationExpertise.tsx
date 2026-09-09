'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaLayerGroup, FaFlask, FaInfinity, FaNetworkWired, FaProjectDiagram,
  FaMobileAlt, FaAndroid, FaApple, FaGlobe, FaPlug,
} from 'react-icons/fa';
import { SiXcode, SiKotlin, SiSelenium } from 'react-icons/si';
import { fadeIn, staggerContainer } from '@/lib/utils';
import SectionTitle from './ui/SectionTitle';
import automationData from '@/data/automation.json';
import type { AutomationItem } from '@/types';

const automation = automationData as AutomationItem[];

const iconMap: Record<string, React.ElementType> = {
  SiXcode, FaLayerGroup, FaFlask, FaInfinity, FaNetworkWired, FaProjectDiagram,
  FaMobileAlt, FaAndroid, FaGlobe,
};

// ─── Code tokens helper ───────────────────────────────────────────────────────
type Token = { t: string; c: string };
const kw   = (t: string): Token => ({ t, c: 'text-neon-purple' });
const fn_  = (t: string): Token => ({ t, c: 'text-neon-cyan' });
const str  = (t: string): Token => ({ t, c: 'text-neon-green' });
const cmt  = (t: string): Token => ({ t, c: 'text-slate-500 italic' });
const op   = (t: string): Token => ({ t, c: 'text-slate-300' });
const id   = (t: string): Token => ({ t, c: 'text-white' });
const num  = (t: string): Token => ({ t, c: 'text-yellow-400' });
const ann  = (t: string): Token => ({ t, c: 'text-yellow-300' });

const NL = '\n';

// ─── Code definitions ─────────────────────────────────────────────────────────
const tabs = [
  {
    id: 'ios',
    label: 'iOS — XCUITest',
    lang: 'Swift',
    file: 'LoginTests.swift',
    color: '#00E5FF',
    Icon: FaApple,
    lines: [
      [kw('class '), fn_('LoginTests'), op(': XCTestCase {')],
      [op('  '), kw('private var '), id('loginScreen'), op(': LoginScreen!')],
      [op('')],
      [op('  '), kw('func '), fn_('testSuccessfulLogin'), op('() {')],
      [op('    '), cmt('// Arrange — inject mock API response')],
      [op('    '), fn_('MockServer'), op('.stub('), fn_('.loginSuccess'), op(')')],
      [op('')],
      [op('    '), cmt('// Act — interact via Page Object')],
      [op('    '), id('loginScreen')],
      [op('      .'), fn_('enterEmail'), op('('), str('"test@example.com"'), op(')')],
      [op('      .'), fn_('enterPassword'), op('('), str('"password"'), op(')')],
      [op('      .'), fn_('tapLogin'), op('()')],
      [op('')],
      [op('    '), cmt('// Assert')],
      [op('    '), fn_('XCTAssertTrue'), op('('), fn_('HomeScreen'), op('().isDisplayed)')],
      [op('  }')],
      [op('}')],
    ],
  },
  {
    id: 'android',
    label: 'Android — Espresso',
    lang: 'Kotlin',
    file: 'LoginTest.kt',
    color: '#4ADE80',
    Icon: FaAndroid,
    lines: [
      [ann('@RunWith'), op('('), fn_('AndroidJUnit4'), op('::class.java)')],
      [kw('class '), fn_('LoginTest'), op(' {')],
      [op('')],
      [op('  '), ann('@get:Rule')],
      [op('  '), kw('val '), id('activityRule'), op(' = '), fn_('ActivityScenarioRule'), op('(')],
      [op('    '), fn_('LoginActivity'), op('::class.java)')],
      [op('')],
      [op('  '), ann('@Test')],
      [op('  '), kw('fun '), fn_('testSuccessfulLogin'), op('() {')],
      [op('    '), cmt('// Arrange — mock network response')],
      [op('    '), fn_('MockWebServer'), op('.enqueue('), id('loginSuccessResponse'), op(')')],
      [op('')],
      [op('    '), cmt('// Act — interact via Page Object')],
      [op('    '), fn_('LoginScreen'), op('()')],
      [op('      .'), fn_('enterEmail'), op('('), str('"test@example.com"'), op(')')],
      [op('      .'), fn_('enterPassword'), op('('), str('"password"'), op(')')],
      [op('      .'), fn_('tapLogin'), op('()')],
      [op('')],
      [op('    '), cmt('// Assert')],
      [op('    '), fn_('HomeScreen'), op('().'), fn_('assertDisplayed'), op('()')],
      [op('  }')],
      [op('}')],
    ],
  },
  {
    id: 'selenium',
    label: 'Web — Selenium',
    lang: 'Java',
    file: 'LoginTest.java',
    color: '#F59E0B',
    Icon: FaGlobe,
    lines: [
      [kw('public class '), fn_('LoginTest'), op(' extends '), fn_('BaseTest'), op(' {')],
      [op('')],
      [op('  '), kw('private '), fn_('LoginPage'), op(' loginPage;')],
      [op('')],
      [op('  '), ann('@Test')],
      [op('  '), kw('public void '), fn_('testSuccessfulLogin'), op('() {')],
      [op('    '), cmt('// Arrange')],
      [op('    '), id('driver'), op('.get('), id('BASE_URL'), op(' + '), str('"/login"'), op(')')],
      [op('    '), id('loginPage'), op(' = '), kw('new '), fn_('LoginPage'), op('(driver)')],
      [op('')],
      [op('    '), cmt('// Act — interact via Page Object')],
      [op('    '), id('loginPage')],
      [op('      .'), fn_('enterEmail'), op('('), str('"test@example.com"'), op(')')],
      [op('      .'), fn_('enterPassword'), op('('), str('"password"'), op(')')],
      [op('      .'), fn_('clickLogin'), op('()')],
      [op('')],
      [op('    '), cmt('// Assert')],
      [fn_('    HomePage'), op(' homePage = '), kw('new '), fn_('HomePage'), op('(driver)')],
      [op('    '), fn_('assertTrue'), op('(homePage.'), fn_('isDisplayed'), op('())')],
      [op('  }')],
      [op('}')],
    ],
  },
  {
    id: 'api',
    label: 'API — Rest Assured',
    lang: 'Java',
    file: 'LoginApiTest.java',
    color: '#A78BFA',
    Icon: FaPlug,
    lines: [
      [kw('public class '), fn_('LoginApiTest'), op(' extends '), fn_('BaseApiTest'), op(' {')],
      [op('')],
      [op('  '), ann('@Test')],
      [op('  '), kw('public void '), fn_('testSuccessfulLoginReturns200'), op('() {')],
      [op('    '), cmt('// Arrange')],
      [fn_('    LoginRequest'), op(' request = '), fn_('LoginRequest'), op('.builder()')],
      [op('      .'), fn_('email'), op('('), str('"test@example.com"'), op(')')],
      [op('      .'), fn_('password'), op('('), str('"password"'), op(')')],
      [op('      .'), fn_('build'), op('()')],
      [op('')],
      [op('    '), cmt('// Act + Assert')],
      [op('    '), fn_('given'), op('()')],
      [op('      .'), fn_('contentType'), op('(ContentType.JSON)')],
      [op('      .'), fn_('body'), op('(request)')],
      [op('    .'), fn_('when'), op('()')],
      [op('      .'), fn_('post'), op('('), str('"/api/v1/auth/login"'), op(')')],
      [op('    .'), fn_('then'), op('()')],
      [op('      .'), fn_('statusCode'), op('('), num('200'), op(')')],
      [op('      .'), fn_('body'), op('('), str('"token"'), op(', notNullValue())')],
      [op('      .'), fn_('body'), op('('), str('"user.email"'), op(', equalTo('), str('"test@example.com"'), op('))')],
      [op('  }')],
      [op('}')],
    ],
  },
];

function CodeShowcase() {
  const [active, setActive] = useState('ios');
  const tab = tabs.find((t) => t.id === active)!;

  return (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="mt-14"
    >
      <p className="text-center text-xs font-mono text-slate-500 uppercase tracking-widest mb-5">
        // Real automation code across platforms
      </p>

      <div className="glass rounded-2xl border border-white/8 overflow-hidden">
        {/* Tab bar */}
        <div className="flex overflow-x-auto border-b border-white/6 bg-white/2">
          {tabs.map((t) => {
            const Icon = t.Icon;
            const isActive = t.id === active;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`flex items-center gap-1.5 px-3 sm:px-5 py-3 sm:py-3.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 border-b-2 ${
                  isActive
                    ? 'text-white border-current'
                    : 'text-slate-500 border-transparent hover:text-slate-300'
                }`}
                style={isActive ? { borderColor: t.color, color: t.color } : {}}
              >
                <Icon size={13} />
                {t.label}
              </button>
            );
          })}
          {/* Spacer + lang badge */}
          <div className="ml-auto flex items-center pr-4">
            <span className="text-xs text-slate-600 font-mono px-2 py-0.5 rounded border border-white/8">
              {tab.lang}
            </span>
          </div>
        </div>

        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-dark-200/60">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-neon-green/60" />
          <span className="ml-3 text-xs text-slate-600 font-mono">{tab.file}</span>
          {/* Active color dot */}
          <span className="ml-auto w-2 h-2 rounded-full animate-pulse" style={{ background: tab.color }} />
        </div>

        {/* Code panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="overflow-x-auto"
          >
            <table className="w-full font-mono text-sm border-collapse">
              <tbody>
                {tab.lines.map((tokens, i) => (
                  <tr key={i} className="hover:bg-white/2 transition-colors group">
                    {/* Line number */}
                    <td className="select-none text-right pr-5 pl-4 py-0.5 text-slate-700 text-xs w-12 border-r border-white/4 group-hover:text-slate-500 transition-colors">
                      {i + 1}
                    </td>
                    {/* Code */}
                    <td className="pl-5 pr-6 py-0.5 leading-6">
                      {tokens.map((tok, j) => (
                        <span key={j} className={tok.c}>{tok.t}</span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Bottom padding row */}
            <div className="h-4" />
          </motion.div>
        </AnimatePresence>

        {/* Footer bar */}
        <div
          className="px-5 py-2.5 border-t border-white/5 flex items-center justify-between"
          style={{ background: `${tab.color}08` }}
        >
          <span className="text-xs font-mono" style={{ color: tab.color }}>
            ✓ Page Object Model · Clean Architecture · Maintainable
          </span>
          <span className="text-xs text-slate-600 font-mono">{tab.lines.length} lines</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function AutomationExpertise() {
  return (
    <section id="automation" className="py-24 relative">
      {/* Subtle background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle
          tag="automation expertise"
          title="Automation "
          highlight="Expertise"
          subtitle="Deep technical proficiency in automation frameworks, patterns, and integrations."
        />

        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {automation.map((item, index) => {
            const Icon = iconMap[item.icon] || FaLayerGroup;
            return (
              <motion.div
                key={item.id}
                variants={fadeIn('up', index * 0.05)}
                whileHover={{ y: -6, scale: 1.01 }}
                className="glass rounded-xl border border-white/8 p-6 space-y-4 transition-all duration-300 group"
                style={{
                  '--glow-color': item.color,
                } as React.CSSProperties}
              >
                {/* Icon */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${item.color}18`,
                      color: item.color,
                      boxShadow: `0 0 20px ${item.color}20`,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3
                    className="font-bold text-white text-base font-orbitron leading-tight group-hover:transition-colors"
                    style={{ transition: 'color 0.2s' }}
                  >
                    {item.title}
                  </h3>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>

                {/* Features list */}
                <ul className="space-y-2">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-400">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: item.color }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Bottom accent */}
                <div
                  className="h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded"
                  style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Multi-language code showcase */}
        <CodeShowcase />
      </div>
    </section>
  );
}
