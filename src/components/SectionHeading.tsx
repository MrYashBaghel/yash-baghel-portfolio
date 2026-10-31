import { motion, Variants } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface Props {
  label: string
  title: string
  subtitle?: string
  center?: boolean
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function SectionHeading({ label, title, subtitle, center = false }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={`section-heading${center ? ' center' : ''}`}
      style={{ marginBottom: '3rem' }}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <motion.p className="section-label" variants={itemVariants}>
        {label}
      </motion.p>
      <motion.h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          background: 'var(--grad-text)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: subtitle ? '1rem' : 0,
        }}
        variants={itemVariants}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p className="lead" style={center ? { marginInline: 'auto' } : {}} variants={itemVariants}>
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
