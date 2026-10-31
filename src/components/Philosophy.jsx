import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Code, Cpu, Activity, CheckCircle2 } from 'lucide-react';
import { overview, devopsPillars, competencies } from '../data/resumeData';

export default function Philosophy() {
  const [activePillar, setActivePillar] = useState(devopsPillars[0].id);

  const pillarIcons = {
    iac: Code,
    k8s: Cpu,
    sre: Activity,
    cicd: Shield
  };

  const selectedPillar = devopsPillars.find(p => p.id === activePillar) || devopsPillars[0];

  return (
    <section id="philosophy" className="section-padding" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="section-badge">
            <Activity size={14} />
            <span>Core Methodology</span>
          </div>
          <h2 className="section-title">
            DevOps Engineering & <span className="gradient-text">SRE Philosophy</span>
          </h2>
          <p className="section-subtitle">
            {overview.headline}
          </p>
        </div>

        {/* Overview Paragraphs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '4rem'
          }}
        >
          {overview.paragraphs.map((para, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card"
              style={{ padding: '28px', borderLeft: i === 0 ? '4px solid var(--brand)' : '1px solid var(--border)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-3)' }}>
                  Principle 0{i + 1}
                </span>
              </div>
              <p style={{ color: 'var(--text-2)', fontSize: '0.96rem', lineHeight: 1.7 }}>
                {para}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 4 Pillars Interactive Tab Selector */}
        <div style={{ marginBottom: '2rem' }}>
          <h3
            className="font-display"
            style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text)' }}
          >
            The 4 Architectural Pillars
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px',
              marginBottom: '2rem'
            }}
          >
            {devopsPillars.map((pillar) => {
              const IconComponent = pillarIcons[pillar.id] || Code;
              const isActive = activePillar === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(pillar.id)}
                  style={{
                    background: isActive ? 'var(--card-bg-hover)' : 'var(--card-bg)',
                    border: isActive ? '1px solid var(--accent)' : '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    padding: '20px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: isActive ? '0 0 20px rgba(20, 214, 196, 0.2)' : 'none'
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: isActive ? 'rgba(20, 214, 196, 0.15)' : 'var(--surface-2)',
                      color: isActive ? 'var(--accent)' : 'var(--text-2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '12px'
                    }}
                  >
                    <IconComponent size={20} />
                  </div>
                  <div
                    className="font-display"
                    style={{
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: isActive ? 'var(--text)' : 'var(--text-2)',
                      marginBottom: '4px'
                    }}
                  >
                    {pillar.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-3)', lineHeight: 1.4 }}>
                    {pillar.tagline}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Deep Dive Card */}
          <motion.div
            key={selectedPillar.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-card"
            style={{
              padding: '32px',
              borderTop: '3px solid var(--accent)',
              background: 'var(--surface-solid)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <div
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: 'rgba(20, 214, 196, 0.12)',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}
              >
                Pillar Focus
              </div>
              <h4 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                {selectedPillar.name}
              </h4>
            </div>

            <p style={{ color: 'var(--text-2)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '850px' }}>
              {selectedPillar.description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
