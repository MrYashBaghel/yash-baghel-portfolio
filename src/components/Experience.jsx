import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle, Award } from 'lucide-react';
import { experience, education } from '../data/resumeData';

export default function Experience() {
  return (
    <section id="experience" className="section-padding" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="section-badge">
            <Briefcase size={14} />
            <span>Career History</span>
          </div>
          <h2 className="section-title">
            Work Experience & <span className="gradient-text">Track Record</span>
          </h2>
          <p className="section-subtitle">
            Leading cloud deployments, DevOps automation, Kubernetes cluster management, and incident response for tech enterprises.
          </p>
        </div>

        {/* Experience Cards Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '4rem' }}>
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card"
              style={{
                padding: '36px',
                borderLeft: exp.current ? '4px solid var(--accent)' : '1px solid var(--border)'
              }}
            >
              {/* Header Info */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '20px',
                  flexWrap: 'wrap',
                  marginBottom: '1rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)' }}>
                      {exp.role}
                    </h3>
                    {exp.current && (
                      <span
                        style={{
                          padding: '3px 10px',
                          borderRadius: '999px',
                          background: 'rgba(20, 214, 196, 0.15)',
                          color: 'var(--accent)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          fontWeight: 600
                        }}
                      >
                        Present Role
                      </span>
                    )}
                  </div>

                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>
                    {exp.company}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    color: 'var(--text-3)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} style={{ color: 'var(--accent)' }} />
                    <span>{exp.period}</span>
                    <span style={{ opacity: 0.6 }}>({exp.duration})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Role Summary */}
              <p style={{ color: 'var(--text-2)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {exp.summary}
              </p>

              {/* Highlights & Key Achievements */}
              <div style={{ marginBottom: '1.8rem' }}>
                <h4
                  className="font-display"
                  style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}
                >
                  Key Result Areas & Achievements
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px' }}>
                  {exp.highlights.map((item, hIdx) => (
                    <div
                      key={hIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        fontSize: '0.92rem',
                        color: 'var(--text-2)',
                        background: 'var(--surface-2)',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid var(--border)'
                      }}
                    >
                      <CheckCircle size={16} style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div>
                <h4
                  className="font-display"
                  style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-3)', marginBottom: '8px' }}
                >
                  Technologies & Tools
                </h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {exp.stack.map((st, sIdx) => (
                    <span key={sIdx} className="tech-tag">
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education Highlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card"
          style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '14px',
              background: 'var(--surface-2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)'
            }}
          >
            <Award size={26} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent)', textTransform: 'uppercase' }}>
              Academic Qualification
            </div>
            <h4 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 700, margin: '2px 0' }}>
              {education[0].degree}
            </h4>
            <div style={{ color: 'var(--text-2)', fontSize: '0.9rem' }}>
              {education[0].school} · {education[0].location} ({education[0].period})
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
