import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <motion.main
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div className="center" style={{ padding: '4rem 1rem' }}>
        <motion.p
          style={{ fontFamily: 'var(--font-mono)', fontSize: '.75rem', color: 'var(--primary)', letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: '1rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          404
        </motion.p>
        <motion.h1
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.04em', marginBottom: '1rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Page not found
        </motion.h1>
        <motion.p
          className="lead"
          style={{ marginInline: 'auto', marginBottom: '2rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <Link to="/" className="btn btn-primary">Back to home</Link>
        </motion.div>
      </div>
    </motion.main>
  )
}
