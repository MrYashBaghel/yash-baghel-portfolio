import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileData } from '../data/resumeData';

/* ── Arrow SVG (matches reference) ─────────────────────────────── */
function ArrowIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Social links (Yash's profiles) ────────────────────────────── */
const SOCIALS = [
  {
    label: 'LinkedIn',
    handle: 'yash-baghel',
    href: profileData.linkedin,
  },
  {
    label: 'GitHub',
    handle: '@MrYashBaghel',
    href: profileData.github,
  },
];

const EMPTY = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const field = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((err) => ({ ...err, [key]: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Your name, please.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'A valid email helps me reply.';
    if (!form.message.trim() || form.message.trim().length < 10)
      errs.message = 'Tell me a little more (10+ chars).';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const subj = encodeURIComponent(form.subject || `New message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:yash.baghel@outlook.com?subject=${subj}&body=${body}`;
    setSent(true);
    setTimeout(() => { setSent(false); setForm(EMPTY); }, 5000);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('yash.baghel@outlook.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = 'mailto:yash.baghel@outlook.com';
    }
  };

  return (
    <section id="contact" className="section" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">

        {/* Page Head */}
        <div className="page-head" style={{ marginBottom: '3rem' }}>
          <span className="eyebrow" style={{ marginBottom: '1rem' }}>Contact</span>
          <h2 className="h-xl" style={{ marginTop: '0.6rem' }}>
            Let's build something <span className="gradient-text">together.</span>
          </h2>
          <p className="muted" style={{ marginTop: '0.8rem', maxWidth: '54ch', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Open to DevOps, Cloud & SRE opportunities. Tell me what you're working on.
          </p>
        </div>

        {/* 2-col grid — form left 1.25fr, info right 0.75fr */}
        <div className="contact">

          {/* ── LEFT: Contact Form ─────────────────────────────────── */}
          <motion.div
            className="card contact__formwrap"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <div className="contact__field">
                <label htmlFor="c-name">Name</label>
                <input
                  id="c-name"
                  type="text"
                  value={form.name}
                  onChange={field('name')}
                  placeholder="Your name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <span className="contact__err" role="alert">{errors.name}</span>}
              </div>

              <div className="contact__field">
                <label htmlFor="c-email">Email</label>
                <input
                  id="c-email"
                  type="email"
                  value={form.email}
                  onChange={field('email')}
                  placeholder="you@company.com"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <span className="contact__err" role="alert">{errors.email}</span>}
              </div>

              <div className="contact__field">
                <label htmlFor="c-subject">Subject</label>
                <input
                  id="c-subject"
                  type="text"
                  value={form.subject}
                  onChange={field('subject')}
                  placeholder="What's this about?"
                />
              </div>

              <div className="contact__field">
                <label htmlFor="c-message">Message</label>
                <textarea
                  id="c-message"
                  rows={5}
                  value={form.message}
                  onChange={field('message')}
                  placeholder="A few lines about the role, tech stack, or project…"
                  aria-invalid={!!errors.message}
                />
                {errors.message && <span className="contact__err" role="alert">{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary contact__submit">
                Send message
                <ArrowIcon size={16} />
              </button>
            </form>

            <AnimatePresence>
              {sent && (
                <motion.div
                  className="contact__sent"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="contact__sentmark"><CheckIcon /></span>
                  <h3>Your message is ready</h3>
                  <p className="muted">Your mail client just opened with everything filled in. Hit send and I'll get back to you.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── RIGHT: Info Panel ──────────────────────────────────── */}
          <div className="contact__info">

            {/* Available card */}
            <motion.div
              className="card contact__avail"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <span className="contact__status">
                <span className="glow-dot" />
                Available for new work
              </span>
              <p className="muted">{profileData.availability}</p>
            </motion.div>

            {/* Email card */}
            <motion.div
              className="card contact__email"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.06 }}
            >
              <span className="eyebrow" style={{ marginBottom: '0.8rem' }}>Direct</span>
              <button className="contact__emailbtn" onClick={copyEmail}>
                <span>yash.baghel@outlook.com</span>
                <span className="contact__copy mono">{copied ? 'Copied ✓' : 'Copy'}</span>
              </button>
            </motion.div>

            {/* Location card */}
            <motion.div
              className="card"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.12 }}
            >
              <span className="eyebrow" style={{ marginBottom: '0.6rem' }}>Based in</span>
              <p className="contact__loc">Faridabad, Haryana, INDIA</p>
              <p className="muted mono" style={{ fontSize: '0.82rem' }}>IST · UTC+5:30</p>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="contact__socials"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.18 }}
            >
              {SOCIALS.map(({ label, handle, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="card contact__social"
                >
                  <span>{label}</span>
                  <span className="muted">{handle}</span>
                  <ArrowIcon size={16} className="contact__socialarrow" />
                </a>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
