'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { fadeIn, staggerContainer } from '@/lib/utils';
import SectionTitle from './ui/SectionTitle';
import NeonButton from './ui/NeonButton';
import profile from '@/data/profile.json';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactInfo = [
  { icon: FaEnvelope, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: FaPhone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
  { icon: FaMapMarkerAlt, label: 'Location', value: profile.location, href: null },
];

const socials = [
  { icon: FaGithub, label: 'GitHub', href: profile.github, color: '#6B7280' },
  { icon: FaLinkedin, label: 'LinkedIn', href: profile.linkedin, color: '#0EA5E9' },
  { icon: FaEnvelope, label: 'Email', href: `mailto:${profile.email}`, color: '#00E5FF' },
];

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      // EmailJS integration
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        const emailjs = await import('@emailjs/browser');
        await emailjs.send(serviceId, templateId, {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_email: profile.email,
        }, publicKey);
        toast.success('Message sent! I\'ll get back to you soon.');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        // Fallback: open email client
        const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject || 'Portfolio Contact')}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`;
        window.open(mailtoLink);
        toast.success('Opening your email client…');
        setForm({ name: '', email: '', subject: '', message: '' });
      }
    } catch {
      toast.error('Failed to send message. Please try emailing directly.');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = `w-full px-4 py-3 bg-slate-900/80 border border-white/10 rounded-lg text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-neon-cyan/50 focus:bg-slate-800/80 transition-all duration-200`;

  return (
    <section id="contact" className="py-24 relative">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(139,92,246,0.1) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle
          tag="contact"
          title="Get In "
          highlight="Touch"
          subtitle="Have a project in mind or just want to talk testing and automation? I'd love to hear from you."
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: info */}
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={fadeIn('right', 0)}>
              <h3 className="text-xl font-bold text-white mb-2 font-orbitron">Let&apos;s Connect</h3>
              <p className="text-slate-400 leading-relaxed">
                Whether you&apos;re looking for a test automation engineer, want to collaborate on a project, or just want to talk testing and quality engineering — I&apos;m always open to interesting conversations.
              </p>
            </motion.div>

            <motion.div variants={staggerContainer(0.08)} className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <motion.div
                  key={label}
                  variants={fadeIn('right', 0)}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 border border-neon-cyan/15 flex items-center justify-center text-neon-cyan flex-shrink-0 group-hover:shadow-neon-cyan transition-shadow duration-300">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 uppercase tracking-widest">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm text-slate-300 hover:text-neon-cyan transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-slate-300">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeIn('right', 0)}>
              <p className="text-xs text-slate-600 uppercase tracking-widest mb-4">Find Me Online</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={label}
                    className="w-11 h-11 glass rounded-lg border border-white/8 flex items-center justify-center text-slate-500 transition-all duration-200"
                    style={{
                      ['--hover-color' as string]: color,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = color;
                      (e.currentTarget as HTMLElement).style.borderColor = `${color}40`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = '';
                      (e.currentTarget as HTMLElement).style.borderColor = '';
                    }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            variants={fadeIn('left', 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl border border-white/8 p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 uppercase tracking-widest mb-1.5">
                    Name <span className="text-neon-cyan">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 uppercase tracking-widest mb-1.5">
                    Email <span className="text-neon-cyan">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-500 uppercase tracking-widest mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block text-xs text-slate-500 uppercase tracking-widest mb-1.5">
                  Message <span className="text-neon-cyan">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity…"
                  required
                  rows={5}
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <NeonButton
                type="submit"
                variant="primary"
                size="md"
                disabled={loading}
                className="w-full justify-center"
              >
                {loading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="inline-block"
                    >
                      ⟳
                    </motion.span>
                    Sending…
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={14} />
                    Send Message
                  </>
                )}
              </NeonButton>

              <p className="text-xs text-slate-600 text-center">
                Or email directly:{' '}
                <a href={`mailto:${profile.email}`} className="text-neon-cyan hover:underline">
                  {profile.email}
                </a>
              </p>
            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
