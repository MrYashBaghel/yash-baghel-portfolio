import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Award, CheckCircle, Server, Cloud, Cpu, Activity, Shield } from 'lucide-react';
import { skillsGrouped, certifications } from '../data/resumeData';

export default function Skills() {
  const groupIcons = [Cloud, Wrench, Cpu, Activity, Server, Shield];

  return (
    <section id="skills" className="section-padding" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="section-badge">
            <Wrench size={14} />
            <span>Technical Expertise</span>
          </div>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Core Competencies</span>
          </h2>
          <p className="section-subtitle">
            Mastery over industry-standard cloud ecosystems, automation tools, monitoring stacks, and secret management engines.
          </p>
        </div>

        {/* Skills Group Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '4rem'
          }}
        >
          {skillsGrouped.map((grp, index) => {
            const IconComp = groupIcons[index % groupIcons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card"
                style={{ padding: '28px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.2rem' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'var(--surface-2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent)'
                    }}
                  >
                    <IconComp size={20} />
                  </div>
                  <h3 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)' }}>
                    {grp.group}
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {grp.items.map((item, i) => (
                    <span
                      key={i}
                      className="tech-tag"
                      style={{
                        padding: '6px 14px',
                        fontSize: '0.82rem',
                        background: 'var(--surface-2)',
                        borderColor: 'var(--border)'
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications Highlight */}
        <div>
          <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text)' }}>
            Verified Industry Certifications
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}
          >
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card"
                style={{
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  borderTop: '3px solid var(--accent)'
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(20, 214, 196, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent)',
                    flexShrink: 0
                  }}
                >
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="font-display" style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '4px' }}>
                    {cert.title}
                  </h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-3)' }}>
                    Issued by <strong style={{ color: 'var(--text-2)' }}>{cert.issuer}</strong>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
