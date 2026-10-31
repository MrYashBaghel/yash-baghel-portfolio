import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/* ─── Interactive Demo: Hick's Law (Choice Reduction in Deployments) ───── */
function HicksDemo() {
  const [choices, setChoices] = useState(3)
  const timeMs = Math.round((0.2 + 0.15 * Math.log2(choices + 1)) * 1000)
  const barWidth = 15 + ((choices - 2) / 10) * 85

  return (
    <div className="pdemo">
      <div className="pdemo__stage pdemo__hicks" aria-hidden="true" style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', minHeight: 48, alignItems: 'center' }}>
        {Array.from({ length: choices }).map((_, i) => (
          <motion.span
            key={i}
            layout
            className={`pdemo__choice chip ${i === 0 ? 'chip-dot' : ''}`}
            style={{
              background: i === 0 ? 'var(--primary)' : 'var(--surface-2)',
              color: i === 0 ? 'var(--on-primary)' : 'var(--text-2)',
              fontWeight: 600,
              fontSize: '.75rem',
            }}
          >
            {i === 0 ? 'Auto-Deploy 🚀' : `Manual Gate ${i}`}
          </motion.span>
        ))}
      </div>
      <div className="pdemo__control" style={{ marginTop: '0.8rem' }}>
        <label className="pdemo__label" htmlFor="hicks-n" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.78rem', marginBottom: '0.3rem' }}>
          <span>Deployment Steps / Choices:</span>
          <b className="mono">{choices}</b>
        </label>
        <input
          id="hicks-n"
          type="range"
          min="2"
          max="10"
          value={choices}
          onChange={(e) => setChoices(+e.target.value)}
          style={{ width: '100%', accentColor: 'var(--primary)' }}
        />
      </div>
      <div className="pdemo__readout" style={{ marginTop: '0.6rem' }}>
        <div style={{ height: 4, background: 'var(--surface-2)', borderRadius: 99, overflow: 'hidden', marginBottom: '0.4rem' }}>
          <motion.div
            style={{ height: '100%', background: choices <= 3 ? 'var(--accent)' : 'var(--error)' }}
            animate={{ width: `${barWidth}%` }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="pdemo__metric mono" style={{ fontSize: '.82rem', fontWeight: 700, color: choices <= 3 ? 'var(--accent)' : 'var(--error)' }}>
            ~{timeMs}ms cognitive overhead
          </span>
          <span className="pdemo__metriclabel" style={{ fontSize: '.74rem', color: 'var(--text-3)' }}>
            {choices <= 3 ? 'Streamlined CI/CD flow' : 'Decision paralysis & error risk'}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─── Interactive Demo: Doherty Threshold (<400ms Build Feedback) ──────── */
function DohertyDemo() {
  const [latency, setLatency] = useState(250)
  const [state, setState] = useState<'idle' | 'running' | 'done'>('idle')
  const isOptimal = latency <= 400

  const handleRun = () => {
    if (state === 'running') return
    setState('running')
    setTimeout(() => {
      setState('done')
      setTimeout(() => setState('idle'), 1400)
    }, latency)
  }

  return (
    <div className="pdemo">
      <div
        className={`pdemo__stage ${isOptimal ? 'is-good' : 'is-bad'}`}
        style={{
          padding: '0.9rem',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--surface-2)',
          textAlign: 'center',
          minHeight: 52,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {state === 'running' ? (
          <span className="mono" style={{ fontSize: '.8rem', color: 'var(--primary)' }}>⚙️ Verifying pipeline...</span>
        ) : state === 'done' ? (
          <span className="mono" style={{ fontSize: '.84rem', fontWeight: 700, color: isOptimal ? 'var(--accent)' : 'var(--error)' }}>
            {isOptimal ? `✓ Pipeline Gate Passed in ${latency}ms` : `⚠️ Slow Gate: ${latency}ms (Context Broken)`}
          </span>
        ) : (
          <span className="mono" style={{ fontSize: '.8rem', color: 'var(--text-3)' }}>Ready for automated test gate</span>
        )}
      </div>

      <div className="pdemo__control" style={{ marginTop: '0.8rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.78rem', marginBottom: '0.3rem' }}>
          <span>Pipeline Feedback Loop:</span>
          <b className="mono">{latency}ms</b>
        </div>
        <input
          type="range"
          min="100"
          max="1200"
          step="50"
          value={latency}
          onChange={(e) => setLatency(+e.target.value)}
          style={{ width: '100%', accentColor: isOptimal ? 'var(--accent)' : 'var(--error)' }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.6rem' }}>
        <button
          className="btn btn-ghost"
          onClick={handleRun}
          disabled={state === 'running'}
          style={{ padding: '.4rem .9rem', fontSize: '.78rem' }}
        >
          Run Gate Test
        </button>
        <span style={{ fontSize: '.74rem', color: isOptimal ? 'var(--accent)' : 'var(--error)' }}>
          {isOptimal ? '<400ms keeps engineers in flow' : '>400ms causes context switching'}
        </span>
      </div>
    </div>
  )
}

/* ─── Interactive Demo: Miller's Law (IaC Modular Chunking) ───────────── */
function MillersDemo() {
  const [chunked, setChunked] = useState(true)

  return (
    <div className="pdemo">
      <div
        style={{
          padding: '1rem',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--surface-2)',
          textAlign: 'center',
          minHeight: 52,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.4rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {chunked ? (
          <>
            <span className="chip chip-dot" style={{ fontSize: '.74rem' }}>vpc-module</span>
            <span className="chip chip-dot" style={{ fontSize: '.74rem' }}>eks-cluster</span>
            <span className="chip chip-dot" style={{ fontSize: '.74rem' }}>rds-postgres</span>
            <span className="chip chip-dot" style={{ fontSize: '.74rem' }}>s3-iam</span>
          </>
        ) : (
          <span className="mono" style={{ fontSize: '.72rem', color: 'var(--error)', wordBreak: 'break-all' }}>
            main.tf[3,200 lines: vpc+subnets+sg+eks+nodes+rds+iam+dynamo+route53+acm+cloudwatch]
          </span>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.8rem' }}>
        <button
          className="btn btn-ghost"
          onClick={() => setChunked(!chunked)}
          style={{ padding: '.4rem .9rem', fontSize: '.78rem' }}
        >
          {chunked ? 'Show Monolith' : 'Decompose into Modules'}
        </button>
        <span className="mono" style={{ fontSize: '.74rem', color: chunked ? 'var(--accent)' : 'var(--text-3)' }}>
          {chunked ? '4 clean chunks (7 ± 2 rule)' : '1 cognitive monolith'}
        </span>
      </div>
    </div>
  )
}

/* ─── Interactive Demo: Goal-Gradient Effect (Deployment Rollout) ──────── */
function GoalGradientDemo() {
  const [progress, setProgress] = useState(25)
  const isDone = progress >= 100

  const handleStep = () => {
    setProgress((p) => (p >= 100 ? 25 : Math.min(100, p + 25)))
  }

  return (
    <div className="pdemo">
      <div style={{ height: 10, background: 'var(--surface-2)', borderRadius: 99, overflow: 'hidden', marginBottom: '0.8rem' }}>
        <motion.div
          style={{
            height: '100%',
            background: isDone ? 'var(--accent)' : 'var(--grad-brand)',
          }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="mono" style={{ fontSize: '.88rem', fontWeight: 700, color: isDone ? 'var(--accent)' : 'var(--primary)' }}>
          {progress}% · {progress === 25 ? 'Canary (10% Traffic)' : progress === 50 ? 'Staging Verified' : progress === 75 ? 'Traffic Shift (80%)' : '100% Production Live 🎉'}
        </span>
        <button
          className="btn btn-ghost"
          onClick={handleStep}
          style={{ padding: '.35rem .85rem', fontSize: '.76rem' }}
        >
          {isDone ? 'Reset Rollout' : 'Next Stage'}
        </button>
      </div>
    </div>
  )
}

export default function Psychology() {
  return (
    <motion.main
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container">
        {/* ── 01. HEAD & STATS ────────────────────────────────────────────── */}
        <div className="page-head psy__head scrim">
          <span className="eyebrow">Mental Models · Systems Engineering</span>
          <h1 className="display" style={{ marginBottom: '0.6rem' }}>
            Engineering principles, <span className="grad-text">proven under load.</span>
          </h1>
          <p className="lead" style={{ maxWidth: '68ch' }}>
            Applied psychology and systems theory behind high-reliability infrastructure: minimizing operator cognitive load, preventing human configuration variance, and tightening feedback loops.
          </p>

          <div className="psy__stats">
            <div className="psy__stat">
              <span className="kpi__value">&lt;400ms</span>
              <span className="kpi__label">Doherty Threshold</span>
              <span className="kpi__sub mono">Fast CI/CD feedback keeps engineers in flow</span>
            </div>
            <div className="psy__stat">
              <span className="kpi__value">7 ± 2</span>
              <span className="kpi__label">Miller's Law</span>
              <span className="kpi__sub mono">Modular Terraform state & microservices</span>
            </div>
            <div className="psy__stat">
              <span className="kpi__value">99.9%</span>
              <span className="kpi__label">Error Budget Target</span>
              <span className="kpi__sub mono">SLI / SLO telemetry discipline</span>
            </div>
          </div>
        </div>

        {/* ── 02. INTERACTIVE DEMO GRID ──────────────────────────────────── */}
        <section className="section" style={{ padding: '2.5rem 0' }}>
          <div className="psy__grid">
            {/* Hick's Law */}
            <article className="psy__card glass" style={{ padding: '2rem', borderRadius: 'var(--radius)' }}>
              <div className="psy__cardhead" style={{ marginBottom: '1.2rem' }}>
                <span className="psy__cardno mono" style={{ fontSize: '.78rem', color: 'var(--primary)', letterSpacing: '.12em', display: 'block', marginBottom: '0.3rem' }}>
                  01 · COGNITIVE FRICTION
                </span>
                <h3 className="psy__cardname" style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: '0.4rem' }}>
                  Hick's Law in Deployment Pipelines
                </h3>
                <p className="muted" style={{ fontSize: '.88rem' }}>
                  Time to decide increases logarithmically with the number of manual options. By automating CI/CD stages with GitLab and Jenkins, we eliminated 12 manual gate choices down to a single automated deployment command.
                </p>
              </div>
              <HicksDemo />
            </article>

            {/* Doherty Threshold */}
            <article className="psy__card glass" style={{ padding: '2rem', borderRadius: 'var(--radius)' }}>
              <div className="psy__cardhead" style={{ marginBottom: '1.2rem' }}>
                <span className="psy__cardno mono" style={{ fontSize: '.78rem', color: 'var(--primary)', letterSpacing: '.12em', display: 'block', marginBottom: '0.3rem' }}>
                  02 · FLOW STATE
                </span>
                <h3 className="psy__cardname" style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: '0.4rem' }}>
                  Doherty Threshold in Build & Test Gates
                </h3>
                <p className="muted" style={{ fontSize: '.88rem' }}>
                  Productivity soars when computers and users interact at a pace (&lt;400ms) that ensures neither has to wait. Fast unit tests and automated linting keep developers in flow; slow 8-hour releases encourage distraction.
                </p>
              </div>
              <DohertyDemo />
            </article>

            {/* Miller's Law */}
            <article className="psy__card glass" style={{ padding: '2rem', borderRadius: 'var(--radius)' }}>
              <div className="psy__cardhead" style={{ marginBottom: '1.2rem' }}>
                <span className="psy__cardno mono" style={{ fontSize: '.78rem', color: 'var(--primary)', letterSpacing: '.12em', display: 'block', marginBottom: '0.3rem' }}>
                  03 · WORKING MEMORY
                </span>
                <h3 className="psy__cardname" style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: '0.4rem' }}>
                  Miller's Law & Modular Terraform States
                </h3>
                <p className="muted" style={{ fontSize: '.88rem' }}>
                  Human working memory can hold roughly 7 items. Decomposing massive cloud architectures into isolated, modular Terraform blueprints allows engineers to understand, audit, and modify infrastructure without cognitive overload.
                </p>
              </div>
              <MillersDemo />
            </article>

            {/* Goal Gradient */}
            <article className="psy__card glass" style={{ padding: '2rem', borderRadius: 'var(--radius)' }}>
              <div className="psy__cardhead" style={{ marginBottom: '1.2rem' }}>
                <span className="psy__cardno mono" style={{ fontSize: '.78rem', color: 'var(--primary)', letterSpacing: '.12em', display: 'block', marginBottom: '0.3rem' }}>
                  04 · MOMENTUM & CONFIDENCE
                </span>
                <h3 className="psy__cardname" style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: '0.4rem' }}>
                  Goal-Gradient Effect in Progressive Rollouts
                </h3>
                <p className="muted" style={{ fontSize: '.88rem' }}>
                  The tendency to approach a goal increases with proximity. Staged deployments (Canary, Blue/Green on Kubernetes) provide continuous positive feedback with visible milestones, replacing deploy-day dread with confidence.
                </p>
              </div>
              <GoalGradientDemo />
            </article>
          </div>
        </section>

        {/* ── 03. THREE MENTAL MODELS ────────────────────────────────────── */}
        <section className="section" style={{ padding: '2rem 0 3.5rem' }}>
          <span className="eyebrow" style={{ marginBottom: '1rem' }}>Architectural Axioms</span>
          <div className="psy__mini card-grid card-grid--3">
            <div className="card psy__minicard">
              <span className="psy__minitag mono">BLAST RADIUS CONTAINMENT</span>
              <h3 className="psy__mininame">Partition Failure Domains</h3>
              <p className="muted">
                Isolating VPCs, private subnets, and Kubernetes namespaces guarantees that a cascading failure in a single service never brings down the core platform.
              </p>
            </div>

            <div className="card psy__minicard">
              <span className="psy__minitag mono">IMMUTABLE INFRASTRUCTURE</span>
              <h3 className="psy__mininame">Cattle, Never Pets</h3>
              <p className="muted">
                Servers and containers are ephemeral. All configuration, security patches, and AMI images originate from version-controlled Git commits, preventing configuration drift.
              </p>
            </div>

            <div className="card psy__minicard">
              <span className="psy__minitag mono">BLAMELESS SRE POST-MORTEMS</span>
              <h3 className="psy__mininame">Telemetry Over Fault</h3>
              <p className="muted">
                Every downtime incident reveals an opportunity to implement automated circuit breakers, tighter health check probes, and predictive Prometheus alert thresholds.
              </p>
            </div>
          </div>
        </section>

        {/* ── 04. CALL TO ACTION ─────────────────────────────────────────── */}
        <section className="section" style={{ padding: '2rem 0 5rem' }}>
          <div className="psy__cta glass">
            <div>
              <span className="eyebrow" style={{ marginBottom: '0.6rem' }}>Next Step</span>
              <h2 className="h-lg" style={{ marginBottom: '0.6rem' }}>
                Interested in systems engineered for <span className="grad-text">zero downtime?</span>
              </h2>
              <p className="lead" style={{ fontSize: '1.05rem', margin: 0 }}>
                Let's discuss how we can bring robust automation and site reliability engineering to your stack.
              </p>
            </div>
            <div className="psy__ctabtns">
              <Link to="/contact" className="btn btn-primary">
                Get in Touch
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link to="/projects" className="btn btn-ghost">
                View Projects
              </Link>
            </div>
          </div>
        </section>
      </div>
    </motion.main>
  )
}
