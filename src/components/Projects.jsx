import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, typeLabels } from '../data/index.js';
import { GlowCard } from './ui/spotlight-card';

/* ─── Domain section config ─── */
const domainSections = [
  { key: 'ux',    title: 'UI UX Design and Case Study' },
  { key: 'web',   title: 'Web Development' },
  { key: 'brand', title: 'Branding' },
  { key: 'ai',    title: 'Generative AI' },
];

/* ─── Project Detail Modal ─── */
function ProjectDetail({ project, onClose }) {
  if (!project) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(10,10,15,0.98)', backdropFilter: 'blur(24px)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '0', overflowY: 'auto' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        style={{ width: '100%', maxWidth: '1200px', minHeight: '100vh', background: 'var(--glass-section)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)', position: 'relative', paddingBottom: '6rem' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} style={{ position: 'fixed', top: '2rem', right: '2rem', zIndex: 50, width: 48, height: 48, borderRadius: '50%', background: 'var(--glass-card)', backdropFilter: 'blur(12px)', border: '1px solid var(--border2)', color: 'var(--fg)', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>✕</button>
        <div style={{ width: '100%', height: '50vh', background: 'var(--glass-card)', overflow: 'hidden', position: 'relative' }}>
          <img src={project.img} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, var(--bg))' }} />
        </div>
        <div style={{ padding: '0 1.5rem', marginTop: '-8vh', position: 'relative', zIndex: 5 }}>
          <div className="max-w" style={{ maxWidth: 800 }}>
            <span className="eyebrow" style={{ color: 'var(--accent2)' }}>{typeLabels[project.type]}</span>
            <h1 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', color: 'var(--fg)', margin: '1rem 0 1.5rem', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{project.title}</h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--fg2)', lineHeight: 1.85, marginBottom: '2.5rem', maxWidth: 640 }}>{project.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '4rem' }}>
              {project.behance && (
                <a href={project.behance} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '1rem 2rem', borderRadius: 999, background: 'var(--accent)', color: '#fff', fontSize: '1rem', fontWeight: 600, transition: 'all 0.25s', boxShadow: '0 4px 20px rgba(124,109,250,0.3)', textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(124,109,250,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,109,250,0.3)'; }}
                >
                  View on Behance
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                </a>
              )}
              <button onClick={onClose} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '1rem 2rem', borderRadius: 999, background: 'transparent', color: 'var(--fg)', border: '1.5px solid var(--border2)', fontSize: '1rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent2)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--fg)'; }}
              >← Back to Projects</button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Desktop: full-image cover card with hover CTA ─── */
function ProjectCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false);
  const buttonText = project.type === 'web' ? 'Web Preview' : 'View Case Study';
  return (
    <div
      className="project-card-wrapper"
      style={{ position: 'relative', cursor: 'pointer', height: '100%' }}
      onClick={() => onClick(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <GlowCard glowColor="purple" customSize={true} className="w-full h-full overflow-hidden" style={{ borderRadius: '1.75rem', height: '100%', border: hovered ? '1px solid var(--accent)' : '1px solid var(--border)', transform: hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)', boxShadow: hovered ? '0 20px 40px rgba(124,109,250,0.15)' : '0 4px 20px rgba(0,0,0,0.1)', backgroundColor: 'var(--bg2)', transition: 'all 0.35s cubic-bezier(0.23, 1, 0.32, 1)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', borderRadius: 'inherit' }}>
          <img src={project.img} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' }} loading="lazy" />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 20%, rgba(10,10,15,0.4) 50%, rgba(10,10,15,0.95) 100%)', zIndex: 1, borderRadius: 'inherit' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.75rem', zIndex: 2, pointerEvents: 'none' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem', fontWeight: 600, lineHeight: 1.3 }}>{project.title}</h3>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{project.desc}</p>
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,15,0.45)', backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s', zIndex: 3, borderRadius: 'inherit' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: hovered ? 'translate(-50%,-50%) scale(1)' : 'translate(-50%,-50%) scale(0.9)', opacity: hovered ? 1 : 0, transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)', zIndex: 4, pointerEvents: 'none' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 24px', borderRadius: 999, background: 'var(--accent)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.15)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.02em', boxShadow: '0 8px 24px rgba(124, 109, 250, 0.45)', whiteSpace: 'nowrap' }}>
            {buttonText}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}

/* ─── Mobile / tablet: dark header + image, sticky stacked ─── */
function StickyCard({ project, index, total, onClick }) {
  const [hovered, setHovered] = useState(false);
  const topOffset = 80 + index * 58;

  return (
    <div style={{ position: 'sticky', top: `${topOffset}px`, zIndex: index + 1, marginBottom: index === total - 1 ? 0 : -58 }}>
      <div
        onClick={() => onClick(project)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ background: 'var(--bg2)', borderRadius: '1.25rem', border: hovered ? '1px solid var(--accent)' : '1px solid var(--border)', overflow: 'hidden', boxShadow: hovered ? '0 24px 48px rgba(0,0,0,0.35)' : '0 6px 24px rgba(0,0,0,0.25)', cursor: 'pointer', transition: 'all 0.35s cubic-bezier(0.23,1,0.32,1)' }}
      >
        {/* Header bar */}
        <div style={{ background: '#0d0d14', padding: '0 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', height: '58px' }}>
          <h3 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600, margin: 0, fontFamily: "'Inter', sans-serif", letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.title}</h3>
          <span style={{ color: 'var(--accent2)', fontSize: '0.72rem', fontWeight: 600, padding: '0.2rem 0.6rem', background: 'rgba(167,139,250,0.12)', borderRadius: 99, whiteSpace: 'nowrap', flexShrink: 0 }}>{project.year}</span>
        </div>
        {/* Image */}
        <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', background: '#111' }}>
          <img src={project.img} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        </div>
      </div>
    </div>
  );
}


/* ─── Desktop: horizontal scroll row per domain — arrows + drag ─── */
function DesktopDomainSection({ domain, domainProjects, setSelectedProject }) {
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [canScrollLeft, setCanScrollLeft]   = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const CARD_W   = 340;
  const CARD_GAP = 20;
  const SCROLL_BY = CARD_W + CARD_GAP;

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  const scrollTo = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * SCROLL_BY, behavior: 'smooth' });
    setTimeout(updateArrows, 350);
  };

  /* Drag handlers */
  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = 'grabbing';
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current);
    updateArrows();
  };
  const stopDrag = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
    updateArrows();
  };

  const SideArrow = ({ dir }) => {
    const active = dir === -1 ? canScrollLeft : canScrollRight;
    return (
      <button
        onClick={() => scrollTo(dir)}
        disabled={!active}
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          [dir === -1 ? 'left' : 'right']: '-24px',
          width: 48, height: 48, borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.12)',
          background: active ? 'rgba(15,15,20,0.85)' : 'rgba(15,15,20,0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          color: active ? '#fff' : 'rgba(255,255,255,0.2)',
          cursor: active ? 'pointer' : 'default',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.25s ease',
          fontSize: '1.1rem',
          zIndex: 10,
          boxShadow: active ? '0 4px 20px rgba(0,0,0,0.4)' : 'none',
          opacity: active ? 1 : 0,
          pointerEvents: active ? 'auto' : 'none',
        }}
        onMouseEnter={e => { if (active) { e.currentTarget.style.background = 'rgba(124,109,250,0.35)'; e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; }}}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(15,15,20,0.85)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
      >
        {dir === -1 ? '‹' : '›'}
      </button>
    );
  };

  return (
    <div className="max-w" style={{ marginBottom: '5rem' }}>
      {/* Title */}
      <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: 'var(--fg)', margin: '0 0 1.5rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
        {domain.title}
      </h3>

      {/* Track wrapper with side arrows */}
      <div style={{ position: 'relative' }}>
        <SideArrow dir={-1} />
        <SideArrow dir={1} />

        {/* Scroll track — draggable */}
        <div
          ref={trackRef}
          className="h-scroll-track"
          onScroll={updateArrows}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          style={{
            display: 'flex',
            gap: `${CARD_GAP}px`,
            overflowX: 'auto',
            paddingBottom: '1rem',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            cursor: 'grab',
            userSelect: 'none',
          }}
        >
          {domainProjects.map((project, pIdx) => (
            <div key={pIdx} style={{ flex: `0 0 ${CARD_W}px`, height: '340px', scrollSnapAlign: 'start' }}>
              <ProjectCard project={project} onClick={setSelectedProject} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



/* ─── Main Projects Section ─── */
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
  }, [selectedProject]);

  return (
    <section id="work" className="section section--alt" style={{ padding: '0', position: 'relative' }}>

      {/* ── DESKTOP (≥ 1024px): horizontal scroll per domain ── */}
      {isDesktop && (
        <div style={{ padding: '5rem 0 6rem' }}>
          <div className="max-w" style={{ marginBottom: '4rem' }}>
            <div className="eyebrow" style={{ color: 'var(--accent2)', marginBottom: '0.5rem' }}>Work Archive</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, color: 'var(--fg)', margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Selected<br />projects
            </h2>
          </div>
          {domainSections.map(domain => {
            const domainProjects = projects.filter(p => p.type === domain.key);
            if (!domainProjects.length) return null;
            return <DesktopDomainSection key={domain.key} domain={domain} domainProjects={domainProjects} setSelectedProject={setSelectedProject} />;
          })}
        </div>
      )}

      {/* ── MOBILE / PORTRAIT TABLET (< 1024px): sticky stacking per domain ── */}
      {!isDesktop && (
        <div style={{ padding: '5rem 1.25rem 10rem' }}>
          <div style={{ marginBottom: '4rem' }}>
            <div className="eyebrow" style={{ color: 'var(--accent2)', marginBottom: '0.5rem' }}>Work Archive</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(2.2rem, 8vw, 3.5rem)', fontWeight: 700, color: 'var(--fg)', margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Selected<br />projects
            </h2>
          </div>

          {domainSections.map(domain => {
            const domainProjects = projects.filter(p => p.type === domain.key);
            if (!domainProjects.length) return null;
            return (
              <div key={domain.key} style={{ marginBottom: '7rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent2)', marginBottom: '0.4rem' }}>/ {domain.key}</span>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(1.6rem, 6vw, 2.2rem)', fontWeight: 700, color: 'var(--fg)', margin: 0, lineHeight: 1.15, letterSpacing: '-0.02em' }}>{domain.title}</h3>
                </div>
                {domainProjects.map((project, index) => (
                  <StickyCard key={project.title} project={project} index={index} total={domainProjects.length} onClick={setSelectedProject} />
                ))}
              </div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {selectedProject && <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>

      <style>{`
        .project-card-wrapper { height: 100%; }
        .h-scroll-track::-webkit-scrollbar { display: none; }
        .h-scroll-track { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </section>
  );
}
