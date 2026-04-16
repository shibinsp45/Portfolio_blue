import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects, typeLabels, typeColors } from '../data/index.js';

const FILTERS = ['all', 'ux', 'web', 'brand', 'ai'];
const FILTER_LABELS = { all: 'All', ux: 'UI / UX', web: 'Web Dev', brand: 'Branding', ai: 'Gen AI' };

function StackCard({ project, index, total }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Each card sticks with a slight offset based on index
  const stickyTop = 80 + index * 16;
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 1 - (total - 1 - index) * 0.015]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const tc = typeColors[project.type] || typeColors.ux;

  return (
    <div ref={ref} style={{ position: 'sticky', top: stickyTop, zIndex: index + 1, paddingBottom: index === total - 1 ? 0 : '1.5rem' }}>
      <motion.div
        style={{ scale, opacity }}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="stack-card-grid" style={{
          borderRadius: 24, overflow: 'hidden',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(24px) saturate(150%)',
          WebkitBackdropFilter: 'blur(24px) saturate(150%)',
          border: '1px solid var(--border)',
          minHeight: 260, position: 'relative',
          transition: 'border-color 0.4s, box-shadow 0.4s',
          cursor: 'default',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.boxShadow = '0 24px 72px rgba(0,0,0,0.5)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          {/* Left: info */}
          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.7rem', padding: '4px 12px', borderRadius: 999, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.04em', background: tc.bg, color: tc.color }}>
                  {typeLabels[project.type]}
                </span>
                <span style={{ fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace", color: 'var(--fg3)' }}>
                  {project.year}
                </span>
              </div>

              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(1.25rem,2vw,1.75rem)', fontWeight: 400, color: 'var(--fg)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '1rem' }}>
                {project.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--fg2)', lineHeight: 1.7, maxWidth: 320 }}>
                {project.desc}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: '2rem' }}>
              <motion.div
                whileHover={{ x: 4, y: -4 }}
                style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg3)', cursor: 'pointer', transition: 'all 0.3s' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
              </motion.div>
              <span style={{ fontSize: '0.8rem', color: 'var(--fg3)' }}>View project</span>
            </div>
          </div>

          {/* Right: image */}
          <div className="project-image-wrap" style={{ overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, var(--bg3), transparent)`, zIndex: 1, pointerEvents: 'none' }} />
            <img src={project.img} alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }}
              loading="lazy"
              onError={e => { e.target.closest('div').style.background = 'var(--bg2)'; e.target.style.display = 'none'; }}
              onMouseEnter={e => { e.target.style.transform = 'scale(1.04)'; }}
              onMouseLeave={e => { e.target.style.transform = 'scale(1)'; }}
            />
          </div>

          {/* Accent line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${project.color}44, ${project.color}22, transparent)` }} />
          {/* Index badge */}
          <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace", color: 'var(--fg3)' }}>
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="section section--alt">
      <div className="max-w">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ marginBottom: '4rem' }}
        >
          <div className="eyebrow">Selected work</div>
          <h2 className="section-title">Projects that<br /><em>shipped</em></h2>
        </motion.div>

        {/* Stacking cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {projects.map((project, i) => (
            <StackCard key={project.title} project={project} index={i} total={projects.length} />
          ))}
        </div>

        {/* Bottom padding to allow scrolling past last card */}
        <div style={{ height: '8rem' }} />
      </div>

      <style>{`
        .stack-card-grid { display: grid; grid-template-columns: 1fr 1fr; }
        .project-image-wrap { min-height: 100%; }
        @media(max-width: 900px) {
          .stack-card-grid { grid-template-columns: 1fr !important; }
          .project-image-wrap { min-height: 260px; height: 100%; border-top: 1px solid var(--border); }
        }
      `}</style>
    </section>
  );
}
