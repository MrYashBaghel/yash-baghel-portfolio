import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Terminal, Award, Send } from 'lucide-react';
import { profileData, stats, recognitions } from '../data/resumeData';

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      style={{
        paddingTop: 'calc(var(--nav-h) + 20px)',
        paddingBottom: '80px',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden'
      }}
    >
      <div className="container">
        {/* Hero Grid: Intro Copy on Left, Open 3D Space on Right for ThreeHeroCanvas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center',
            marginBottom: '3.5rem',
            minHeight: '68vh'
          }}
        >
          {/* Left Column: Intro Copy & Actions */}
          <div style={{ maxWidth: '640px' }}>
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: '1.2rem' }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  background: 'rgba(20, 214, 196, 0.1)',
                  border: '1px solid rgba(20, 214, 196, 0.3)',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  letterSpacing: '0.04em'
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    boxShadow: '0 0 10px var(--accent)',
                    animation: 'pulse 2s infinite'
                  }}
                />
                <span>{profileData.availability}</span>
              </div>
            </motion.div>

            {/* Main Title & Role */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1
                className="font-display"
                style={{
                  fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  marginBottom: '0.8rem'
                }}
              >
                <span className="gradient-text">{profileData.name}</span>
              </h1>

              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.1rem, 2vw, 1.45rem)',
                  fontWeight: 600,
                  color: 'var(--text-2)',
                  marginBottom: '1.2rem'
                }}
              >
                {profileData.role}
              </div>

              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: 'var(--text-2)',
                  marginBottom: '2rem'
                }}
              >
                {profileData.pitch}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                display: 'flex',
                gap: '14px',
                flexWrap: 'wrap',
                alignItems: 'center',
                marginBottom: '2.5rem'
              }}
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="btn-primary"
              >
                <span>Explore Architecture</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="btn-secondary"
              >
                <Send size={15} />
                <span>Get in Touch</span>
              </button>
            </motion.div>

            {/* Quick Metrics Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap'
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--text-2)'
                }}
              >
                <Cpu size={14} style={{ color: 'var(--accent)' }} />
                <span>AWS EKS & K8s</span>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--text-2)'
                }}
              >
                <Terminal size={14} style={{ color: 'var(--accent-2)' }} />
                <span>Terraform IaC</span>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--text-2)'
                }}
              >
                <Award size={14} style={{ color: '#ff9900' }} />
                <span>AWS & Terraform Certified</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Open space letting full-screen 3D model show through with no frame */}
          <div
            style={{
              minHeight: '380px',
              pointerEvents: 'none'
            }}
          />
        </div>

        {/* 4 Stats Metric Counters Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '3rem'
          }}
        >
          {stats.map((st, i) => (
            <div
              key={i}
              className="glass-card"
              style={{
                padding: '24px',
                borderBottom: '2px solid var(--accent)'
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  lineHeight: 1,
                  color: 'var(--accent)',
                  marginBottom: '8px'
                }}
              >
                {st.value}{st.suffix}
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-2)', fontWeight: 500 }}>
                {st.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Industry Recognition Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px'
          }}
        >
          {recognitions.map((rec, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px 20px',
                borderRadius: 'var(--radius)',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)'
              }}
            >
              <Award size={24} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text)' }}>
                  {rec.value} — {rec.label}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-3)' }}>
                  {rec.source}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
