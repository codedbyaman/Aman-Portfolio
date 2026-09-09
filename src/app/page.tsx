'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import KrogerEngagement from '@/components/KrogerEngagement';
import AutomationExpertise from '@/components/AutomationExpertise';
import AITools from '@/components/AITools';
import Certifications from '@/components/Certifications';
import QAGame from '@/components/QAGame';
import Resume from '@/components/Resume';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <div className="section-divider" />
      <About />
      <div className="section-divider" />
      <Experience />
      <div className="section-divider" />
      <Education />
      <div className="section-divider" />
      <Skills />
      <div className="section-divider" />
      <Projects />
      <div className="section-divider" />
      <KrogerEngagement />
      <div className="section-divider" />
      <AutomationExpertise />
      <div className="section-divider" />
      <AITools />
      <div className="section-divider" />
      <section id="qa-game" className="py-24 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <QAGame />
        </div>
      </section>
      <div className="section-divider" />
      <Certifications />
      <div className="section-divider" />
      <Resume />
      <div className="section-divider" />
      <Contact />
      <Footer />
    </main>
  );
}
