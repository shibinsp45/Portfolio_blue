import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, typeLabels } from '../data/index.js';
import { GlowCard } from './ui/spotlight-card';


/* ─── Domain section config ─── */
const domainSections = [
  { key: 'ux', title: 'UI UX Designs', subtitle: 'Case Studies' },
  { key: 'web', title: 'Web Development', subtitle: 'Engineering' },
  { key: 'brand', title: 'Branding', subtitle: 'Visual Identity' },
  { key: 'ai', title: 'Generative AI', subtitle: 'Integrations' },
];

/* ─── Project Detail (Inner Page) ─── */
function ProjectDetail({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(10, 10, 15, 0.98)',
        backdropFilter: 'blur(24px)',
        display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
        padding: '0', overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        style={{
          width: '100%', maxWidth: '1200px', minHeight: '100vh',
          background: 'var(--bg)', position: 'relative',
          paddingBottom: '6rem'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} style={{ 
          position: 'fixed', top: '2rem', right: '2rem', zIndex: 50,
          width: 48, height: 48, borderRadius: '50%', 
          background: 'var(--bg2)', border: '1px solid var(--border2)',
          color: 'var(--fg)', cursor: 'pointer', fontSize: '1.2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
        }}>✕</button>

        <div style={{ width: '100%', height: '50vh', background: 'var(--bg2)', overflow: 'hidden', position: 'relative' }}>
          <img src={project.img} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, var(--bg))' }} />
        </div>

        <div style={{ padding: '0 1.5rem', marginTop: '-8vh', position: 'relative', zIndex: 5 }}>
           <div className="max-w" style={{ maxWidth: 800 }}>
              <span className="eyebrow" style={{ color: 'var(--accent2)' }}>{typeLabels[project.type]}</span>
              <h1 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', color: 'var(--fg)', margin: '1rem 0 1.5rem', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                {project.title}
              </h1>
              
              <p style={{ fontSize: '1.125rem', color: 'var(--fg2)', lineHeight: 1.85, marginBottom: '2.5rem', maxWidth: 640 }}>
                {project.desc}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '4rem' }}>
                {project.behance && (
                  <a href={project.behance} target="_blank" rel="noopener noreferrer" 
                    style={{ 
                      display: 'inline-flex', alignItems: 'center', gap: 10,
                      padding: '1rem 2rem', borderRadius: 999,
                      background: 'var(--accent)', color: '#fff', 
                      fontSize: '1rem', fontWeight: 600, 
                      transition: 'all 0.25s',
                      boxShadow: '0 4px 20px rgba(124,109,250,0.3)',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(124,109,250,0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,109,250,0.3)'; }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/></svg>
                    View on Behance
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                  </a>
                )}
                <button onClick={onClose}
                  style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '1rem 2rem', borderRadius: 999,
                    background: 'transparent', color: 'var(--fg)', 
                    border: '1.5px solid var(--border2)',
                    fontSize: '1rem', fontWeight: 500, cursor: 'pointer',
                    transition: 'all 0.25s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--fg)'; }}
                >
                  ← Back to Projects
                </button>
              </div>

              <div style={{ height: '1px', background: 'var(--border)', marginBottom: '3rem' }} />

              <section>
                <h3 style={{ color: 'var(--fg)', fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 500 }}>Project Highlights</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                  {[
                    { t: 'User Research', d: 'In-depth analysis of user pain points and behavioral patterns.' },
                    { t: 'UX Strategy', d: 'Defining the core product goals and mapping out the user journey.' },
                    { t: 'UI Design', d: 'Crafting a visually stunning and accessible interface system.' },
                    { t: 'Interaction', d: 'Building prototypes to test and refine all key interactions.' }
                  ].map(item => (
                    <div key={item.t} style={{ padding: '1.75rem', background: 'var(--bg2)', borderRadius: 20, border: '1px solid var(--border)', transition: 'border-color 0.3s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                    >
                      <h4 style={{ color: 'var(--accent2)', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>{item.t}</h4>
                      <p style={{ color: 'var(--fg2)', fontSize: '0.875rem', lineHeight: 1.65 }}>{item.d}</p>
                    </div>
                  ))}
                </div>
              </section>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Project Card with parallax ─── */
function ProjectCard({ project, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = (viewH - rect.top) / (viewH + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      const speed = index % 2 === 1 ? 30 : -10;
      setParallaxY((clamped - 0.5) * speed);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => onClick(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: '100%',
        transform: `translateY(${hovered ? parallaxY - 8 : parallaxY}px)`,
        transition: 'transform 0.35s ease',
        willChange: 'transform',
        cursor: 'pointer',
      }}
    >
      <GlowCard
        glowColor="purple"
        customSize={true}
        className="w-full h-full flex flex-col p-0"
        style={{
          borderRadius: '1.75rem',
          overflow: 'hidden',
          border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
          transition: 'border-color 0.35s, box-shadow 0.35s',
          boxShadow: hovered
            ? '0 20px 60px rgba(124,109,250,0.15), 0 0 0 1px rgba(124,109,250,0.1)'
            : 'none',
        }}
      >
        {/* Image with hover overlay */}
        <div style={{ height: '240px', overflow: 'hidden', background: 'var(--bg3)', position: 'relative' }}>
          <img 
            src={project.img} alt={project.title} 
            style={{ 
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: hovered ? 'scale(1.08)' : 'scale(1)'
            }} 
            loading="lazy" 
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(10, 10, 15, 0.65)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.35s ease',
            backdropFilter: 'blur(4px)'
          }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 28px', borderRadius: 999,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.25)',
              color: '#fff', fontSize: '0.9rem', fontWeight: 600,
              letterSpacing: '0.02em',
              backdropFilter: 'blur(12px)',
              transform: hovered ? 'translateY(0)' : 'translateY(10px)',
              transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              View Project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </div>
        </div>

        {/* Card content */}
        <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--fg)', marginBottom: '0.75rem', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.3 }}>{project.title}</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--fg2)', lineHeight: 1.65, flex: 1 }}>{project.desc}</p>
        </div>
      </GlowCard>
    </motion.div>
  );
}


/* ─── Single Domain Row ─── */
function DomainRow({ domain, items, onSelect, isMobile }) {
  const scrollRef = useRef(null);

  return (
    <div className="max-w" style={{ marginBottom: isMobile ? '4rem' : '6rem' }}>
      {/* Left-aligned domain heading */}
      <div className="mobile-center" style={{ marginBottom: '2rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 style={{ 
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', 
            fontWeight: 300, 
            color: 'var(--fg)', 
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginBottom: '0.35rem'
          }}>
            {domain.title}
          </h3>

        </motion.div>
      </div>

      {/* Cards row */}
      <div
        ref={scrollRef}
        className="projects-scroll-track"
        style={{
          display: 'flex',
          gap: '1.5rem',
          overflowX: items.length > 3 || isMobile ? 'auto' : 'visible',
          touchAction: 'pan-y',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: '1.5rem',
          paddingTop: '0.5rem',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {items.map((project, idx) => (
          <div
            key={project.title}
            className="domain-card"
            style={{
              flex: '0 0 auto',
              width: isMobile 
                ? 'calc(100% - 1.5rem)' 
                : 'calc((100% - 3rem) / 3)',
              scrollSnapAlign: 'start',
            }}
          >
            <ProjectCard
              project={project}
              index={idx}
              onClick={onSelect}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Projects Section ─── */
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedProject]);

  return (
    <section id="work" className="section section--alt" style={{ paddingBottom: '4rem' }}>
      {/* Main heading — left aligned */}
      <div className="max-w mobile-center" style={{ marginBottom: '5rem' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="eyebrow">Work Archive</div>
          <h2 className="section-title">Selected<br /><em>design solutions</em></h2>
        </motion.div>
      </div>

      {/* Separate section per domain */}
      {domainSections.map(domain => {
        const items = projects.filter(p => p.type === domain.key);
        if (items.length === 0) return null;
        return (
          <DomainRow 
            key={domain.key}
            domain={domain}
            items={items}
            onSelect={setSelectedProject}
            isMobile={isMobile}
          />
        );
      })}

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <style>{`
        .projects-scroll-track::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
