import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Your name, please.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'A valid email helps me reply.'
    if (!form.message.trim() || form.message.trim().length < 10) errs.message = 'Please provide a little more detail (10+ characters).'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const subj = encodeURIComponent(form.subject || `DevOps Opportunity from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`)
    window.location.href = `mailto:yash.baghel@outlook.com?subject=${subj}&body=${body}`
    setSent(true)
  }

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('yash.baghel@outlook.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = 'mailto:yash.baghel@outlook.com'
    }
  }

  return (
    <motion.main
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container">
        {/* ── 01. PAGE HEAD ──────────────────────────────────────────────── */}
        <div className="page-head scrim">
          <span className="eyebrow">Contact · Collaboration</span>
          <h1 className="display" style={{ marginBottom: '0.6rem' }}>
            Let's build reliable, <span className="grad-text">scalable systems.</span>
          </h1>
          <p className="lead" style={{ maxWidth: '68ch' }}>
            Targeting DevOps Engineer and Cloud Architecture roles in Delhi NCR or remote. Reach out directly using the form below or through direct email.
          </p>
        </div>

        {/* ── 02. TWO-COLUMN SPLIT CONTACT ───────────────────────────────── */}
        <div className="contact" style={{ marginBottom: '5rem' }}>
          {/* Form Card */}
          <div className="contact__formwrap card">
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__field">
                <label htmlFor="c-name">NAME</label>
                <input
                  id="c-name"
                  type="text"
                  placeholder="What should I call you?"
                  value={form.name}
                  onChange={handleChange('name')}
                />
                {errors.name && <span className="contact__err">{errors.name}</span>}
              </div>

              <div className="contact__field">
                <label htmlFor="c-email">EMAIL</label>
                <input
                  id="c-email"
                  type="email"
                  placeholder="Where can I reach you back?"
                  value={form.email}
                  onChange={handleChange('email')}
                />
                {errors.email && <span className="contact__err">{errors.email}</span>}
              </div>

              <div className="contact__field">
                <label htmlFor="c-subj">SUBJECT</label>
                <input
                  id="c-subj"
                  type="text"
                  placeholder="DevOps role, cloud architecture, or consulting?"
                  value={form.subject}
                  onChange={handleChange('subject')}
                />
              </div>

              <div className="contact__field">
                <label htmlFor="c-msg">MESSAGE</label>
                <textarea
                  id="c-msg"
                  rows={5}
                  placeholder="Tell me about your tech stack, role requirements, or challenge..."
                  value={form.message}
                  onChange={handleChange('message')}
                />
                {errors.message && <span className="contact__err">{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary contact__submit">
                Send Message
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </form>

            {/* Success Overlay */}
            <AnimatePresence>
              {sent && (
                <motion.div
                  className="contact__sent"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="contact__sentmark">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>Your message is ready</h3>
                  <p className="muted" style={{ maxWidth: '40ch' }}>
                    Your mail client has been opened with your message prefilled. Hit send and I'll respond promptly!
                  </p>
                  <button
                    className="btn btn-ghost"
                    onClick={() => setSent(false)}
                    style={{ marginTop: '0.8rem', padding: '.4rem 1rem', fontSize: '.82rem' }}
                  >
                    Reset Form
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Info Column */}
          <div className="contact__info">
            {/* Availability */}
            <div className="card contact__avail">
              <span className="contact__status">
                <span className="glow-dot" />
                Available for new DevOps roles
              </span>
              <p className="muted" style={{ fontSize: '.88rem', lineHeight: 1.6 }}>
                Immediate joiner / Standard notice. Targeting DevOps Engineer, Cloud Infrastructure, and SRE positions in Delhi NCR or remote.
              </p>
            </div>

            {/* Direct Email with One-Click Copy */}
            <div className="card contact__email">
              <span className="eyebrow">Direct Contact</span>
              <button
                className="contact__emailbtn"
                onClick={handleCopyEmail}
                title="Click to copy email address"
              >
                <span>yash.baghel@outlook.com</span>
                <span className="contact__copy mono">
                  {copied ? '✓ Copied' : 'Copy'}
                </span>
              </button>
            </div>

            {/* Base Location */}
            <div className="card">
              <span className="eyebrow">Base Location</span>
              <h3 className="contact__loc">Noida, Uttar Pradesh</h3>
              <p className="muted mono" style={{ fontSize: '.78rem' }}>
                PIN 201301 · Open to Hybrid & Remote
              </p>
            </div>

            {/* Professional Profiles */}
            <div className="contact__socials">
              <a
                href="mailto:yash.baghel@outlook.com"
                className="card contact__social"
              >
                <span>Outlook Mail</span>
                <span className="muted">Direct Communication</span>
                <span className="contact__socialarrow">↗</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="card contact__social"
              >
                <span>LinkedIn</span>
                <span className="muted">Professional Network</span>
                <span className="contact__socialarrow">↗</span>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="card contact__social"
              >
                <span>GitHub</span>
                <span className="muted">Code & Terraform Blueprints</span>
                <span className="contact__socialarrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  )
}
