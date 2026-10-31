import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, MessageSquare, Copy, Check } from 'lucide-react';
import { profileData } from '../data/resumeData';

function LinkedinIcon({ size = 18, color = '#0a66c2' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    const subj = encodeURIComponent(formData.subject || `DevOps Opportunity Discussion: ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\n— From: ${formData.name} (${formData.email})`);
    window.location.href = `mailto:yash.baghel@outlook.com?subject=${subj}&body=${body}`;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4500);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('yash.baghel@outlook.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = 'mailto:yash.baghel@outlook.com';
    }
  };

  return (
    <section id="contact" className="section-padding" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="section-badge">
            <MessageSquare size={14} />
            <span>Get in Touch</span>
          </div>
          <h2 className="section-title">
            Let's Build Reliable <span className="gradient-text">Cloud Infrastructure</span>
          </h2>
          <p className="section-subtitle">
            Targeting DevOps Engineer, Cloud Architecture, and SRE opportunities in Delhi NCR or remote. Reach out directly or send a message below.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}
        >
          {/* Direct Contact Details Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card"
              style={{ padding: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'rgba(20, 214, 196, 0.12)',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-3)', textTransform: 'uppercase' }}>
                    Email Address
                  </div>
                  <a
                    href="mailto:yash.baghel@outlook.com"
                    style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)', textDecoration: 'none' }}
                  >
                    yash.baghel@outlook.com
                  </a>
                </div>
              </div>

              <button
                onClick={copyEmail}
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  color: copied ? 'var(--accent)' : 'var(--text-2)',
                  borderRadius: '999px',
                  padding: '6px 12px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </motion.div>

            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card"
              style={{ padding: '28px', display: 'flex', alignItems: 'center', gap: '20px' }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(74, 147, 240, 0.12)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <MapPin size={22} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-3)', textTransform: 'uppercase' }}>
                  Base Location
                </div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>
                  Noida, Uttar Pradesh, 201301
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-2)', marginTop: '2px' }}>
                  Open to Hybrid (Delhi NCR) & Remote roles
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '14px' }}>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="glass-card"
                style={{
                  flex: 1,
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  color: 'var(--text)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                <LinkedinIcon size={18} />
                <span>LinkedIn</span>
              </a>

              <a
                href={profileData.github}
                target="_blank"
                rel="noreferrer"
                className="glass-card"
                style={{
                  flex: 1,
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  color: 'var(--text)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                <GithubIcon size={18} />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Interactive Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{ padding: '36px' }}
          >
            <h3 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text)' }}>
              Send an Instant Inquiry
            </h3>

            {submitted ? (
              <div
                style={{
                  padding: '30px',
                  borderRadius: 'var(--radius)',
                  background: 'rgba(20, 214, 196, 0.1)',
                  border: '1px solid rgba(20, 214, 196, 0.3)',
                  textAlign: 'center',
                  color: 'var(--accent)'
                }}
              >
                <CheckCircle2 size={44} style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>Message Prepared!</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-2)' }}>
                  Your mail client has been opened with your inquiry prefilled for <strong>yash.baghel@outlook.com</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-3)', marginBottom: '6px' }}>
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-3)', marginBottom: '6px' }}>
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-3)', marginBottom: '6px' }}>
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DevOps Engineer Opportunity / Consulting"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-3)', marginBottom: '6px' }}>
                    MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about the role, tech stack, or infrastructure project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', marginTop: '6px' }}
                >
                  <Send size={16} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
