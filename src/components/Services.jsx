import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Cloud, Code, Cpu, Activity, Shield } from 'lucide-react';
import { services } from '../data/resumeData';

export default function Services() {
  const serviceIcons = {
    cloud: Cloud,
    layers: Layers,
    code: Code,
    cpu: Cpu,
    activity: Activity,
    shield: Shield
  };

  return (
    <section id="services" className="section-padding" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="section-badge">
            <Layers size={14} />
            <span>DevOps Capabilities</span>
          </div>
          <h2 className="section-title">
            Services & <span className="gradient-text">Engineering Offerings</span>
          </h2>
          <p className="section-subtitle">
            Delivering high-reliability cloud solutions, continuous delivery pipelines, and robust security posture for high-growth tech organizations.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {services.map((srv, idx) => {
            const IconComp = serviceIcons[srv.icon] || Cloud;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-card"
                style={{ padding: '32px' }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: 'var(--surface-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent)',
                    marginBottom: '1.5rem',
                    boxShadow: '0 4px 15px rgba(20, 214, 196, 0.15)'
                  }}
                >
                  <IconComp size={24} />
                </div>

                <h3
                  className="font-display"
                  style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px', color: 'var(--text)' }}
                >
                  {srv.title}
                </h3>

                <p style={{ color: 'var(--text-2)', fontSize: '0.94rem', lineHeight: 1.7 }}>
                  {srv.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
