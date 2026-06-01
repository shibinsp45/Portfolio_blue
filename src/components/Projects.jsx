import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { projects, typeLabels } from '../data/index.js';
import { GlowCard } from './ui/spotlight-card';
import CoverflowCarousel from './CoverflowCarousel';
import { VerticalImageStack } from './ui/vertical-image-stack';

/* ─── Domain section config ─── */
const domainSections = [
  { key: 'ux', title: 'UI UX Design and Case Study' },
  { key: 'web', title: 'Web Development' },
  { key: 'brand', title: 'Branding' },
  { key: 'ai', title: 'Generative AI' },
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
          background: 'var(--glass-section)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)', position: 'relative',
          paddingBottom: '6rem'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} style={{ 
          position: 'fixed', top: '2rem', right: '2rem', zIndex: 50,
          width: 48, height: 48, borderRadius: '50%', 
          background: 'var(--glass-card)', backdropFilter: 'blur(12px)', border: '1px solid var(--border2)',
          color: 'var(--fg)', cursor: 'pointer', fontSize: '1.2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
        }}>✕</button>

        <div style={{ width: '100%', height: '50vh', background: 'var(--glass-card)', overflow: 'hidden', position: 'relative' }}>
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
                    <div key={item.t} style={{ padding: '1.75rem', background: 'var(--glass-card)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: 20, border: '1px solid var(--border)', transition: 'border-color 0.3s' }}
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

function ProjectCard({ project, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setParallaxY(0);
      return;
    }
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = (viewH - rect.top) / (viewH + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      const speed = index % 2 === 1 ? 25 : -10;
      setParallaxY((clamped - 0.5) * speed);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [index]);

  const buttonText = project.type === 'web' ? 'Web Preview' : 'View Case Study';

  return (
    <div
      ref={cardRef}
      className="project-card-wrapper"
      style={{
        transform: `translateY(${parallaxY}px)`,
        willChange: 'transform',
        position: 'relative',
        cursor: 'pointer',
      }}
      onClick={() => onClick(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <GlowCard
        glowColor="purple"
        customSize={true}
        className="w-full h-full overflow-hidden"
        style={{
          borderRadius: '1.75rem',
          height: '100%',
          border: hovered ? '1px solid var(--accent)' : '1px solid var(--border)',
          transform: hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
          boxShadow: hovered ? '0 20px 40px rgba(124,109,250,0.15)' : '0 4px 20px rgba(0,0,0,0.1)',
          backgroundColor: 'var(--bg2)',
          transition: 'all 0.35s cubic-bezier(0.23, 1, 0.32, 1)',
          position: 'relative',
        }}
      >
        {/* Full Card Image Background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', borderRadius: 'inherit' }}>
          <img 
            src={project.img} 
            alt={project.title} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
            }} 
            loading="lazy" 
          />
        </div>

        {/* Dark Gradient Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 20%, rgba(10, 10, 15, 0.4) 50%, rgba(10, 10, 15, 0.95) 100%)', zIndex: 1, pointerEvents: 'none', borderRadius: 'inherit' }} />



        {/* Card Content Overlay */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.75rem', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', pointerEvents: 'none', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.5rem', fontWeight: 600, lineHeight: 1.3 }}>{project.title}</h3>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.6, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{project.desc}</p>
        </div>

        {/* Hover Blur + Dim Overlay (less blur: 2px) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10, 10, 15, 0.45)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
          zIndex: 3,
          borderRadius: 'inherit'
        }} />

        {/* Center CTA Button */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: hovered ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.9)',
          opacity: hovered ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
          zIndex: 4,
          pointerEvents: 'none'
        }}>
          <div style={{
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 8,
            padding: '12px 24px', 
            borderRadius: 999,
            background: 'var(--accent)',
            color: '#ffffff', 
            border: '1px solid rgba(255, 255, 255, 0.15)',
            fontSize: '0.85rem', 
            fontWeight: 600,
            letterSpacing: '0.02em',
            boxShadow: '0 8px 24px rgba(124, 109, 250, 0.45)',
          }}>
            {buttonText}
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}

/* ─── Sticky Horizontal Scroll Section for Desktop ─── */
function HorizontalProjectsSection({ domain, domainProjects, idx, isMobile, setSelectedProject }) {
  const targetRef = useRef(null);
  
  // Card configuration
  const cardWidth = 360; 
  const gap = 24; 
  const totalWidth = domainProjects.length * cardWidth + (domainProjects.length - 1) * gap;
  
  // Determine if horizontal scroll is needed
  const containerWidth = 1000;
  const overflowWidth = Math.max(0, totalWidth - containerWidth);
  
  // Height of the scroll container determines scroll speed/duration
  const scrollHeight = overflowWidth > 0 ? `calc(100vh + ${overflowWidth * 1.2}px)` : 'auto';

  const { scrollYProgress } = useScroll({
    target: overflowWidth > 0 ? targetRef : undefined,
    offset: ["start start", "end end"]
  });

  // Smooth scroll translation
  const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${overflowWidth}px`]);

  if (isMobile) {
    return (
      <div className="project-category-block" style={{ width: '100%', marginBottom: '4rem' }}>
        {/* Category Header */}
        <div style={{ marginBottom: '1.5rem', padding: '0 1.5rem', textAlign: 'left' }}>
          <span className="eyebrow" style={{ color: 'var(--accent2)', display: 'block', marginBottom: '0.25rem' }}>
            / {domain.key.toUpperCase()}
          </span>
          <h3 className="category-title" style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "1.8rem",
            fontWeight: 700,
            color: "var(--fg)",
            margin: 0
          }}>
            {domain.title}
          </h3>
        </div>

        {/* Mobile Vertical List of Project Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '0 1.5rem', width: '100%' }}>
          {domainProjects.map((project, pIdx) => (
            <div 
              key={pIdx} 
              style={{ 
                width: '100%', 
                borderRadius: '1.25rem', 
                overflow: 'hidden',
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Header Bar */}
              <div style={{ 
                background: '#111118', 
                padding: '1rem 1.25rem', 
                borderBottom: '1px solid var(--border)',
                textAlign: 'left'
              }}>
                <h4 style={{ 
                  fontSize: '0.95rem', 
                  fontWeight: 600, 
                  color: '#ffffff', 
                  margin: 0,
                  fontFamily: "'Inter', sans-serif" 
                }}>
                  {project.title}
                </h4>
              </div>

              {/* Project Image */}
              <div style={{ width: '100%', aspectRatio: '16 / 10', overflow: 'hidden' }}>
                <img 
                  src={project.img} 
                  alt={project.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={targetRef} 
      style={{ 
        height: scrollHeight, 
        position: overflowWidth > 0 ? 'relative' : 'static',
        marginBottom: overflowWidth > 0 ? '0' : '6rem'
      }}
    >
      <div style={{
        position: overflowWidth > 0 ? 'sticky' : 'static',
        top: 0,
        height: overflowWidth > 0 ? '100vh' : 'auto',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div className="max-w" style={{ width: '100%', padding: '0 2rem' }}>
          {/* Category Header */}
          <div style={{ marginBottom: '3rem', textAlign: 'left' }}>
            <span className="eyebrow" style={{ color: 'var(--accent2)', display: 'block', marginBottom: '0.5rem' }}>
              / {domain.key.toUpperCase()}
            </span>
            <h3 className="category-title" style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontWeight: 700,
              color: "var(--fg)",
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}>
              {domain.title}
            </h3>
          </div>

          {/* Horizontal projects list */}
          <div style={{ width: '100%', overflow: 'visible' }}>
            <motion.div style={{ x: overflowWidth > 0 ? x : '0px', display: 'flex', gap: `${gap}px` }}>
              {domainProjects.map((project, pIdx) => (
                <div key={pIdx} style={{ flex: `0 0 ${cardWidth}px`, height: '340px' }}>
                  <ProjectCard 
                    project={project}
                    index={pIdx}
                    onClick={setSelectedProject}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Projects Section ─── */
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeDomain, setActiveDomain] = useState(domainSections[0].key);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    handleResize();
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

  const activeImage = projects.find(p => p.type === activeDomain)?.img || '';

  return (
    <section id="work" className="section section--alt" style={{ padding: '0', position: 'relative' }}>
      <div className="max-w" style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '4rem' : '0' }}>
        
        {domainSections.map((domain, idx) => {
          const domainProjects = projects.filter(p => p.type === domain.key);
          if (domainProjects.length === 0) return null;

          return (
            <HorizontalProjectsSection
              key={domain.key}
              domain={domain}
              domainProjects={domainProjects}
              idx={idx}
              isMobile={isMobile}
              setSelectedProject={setSelectedProject}
            />
          );
        })}
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <style>{`
        .services-layout {
          display: flex;
          gap: 4rem;
          align-items: flex-start;
        }
        .services-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .service-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(2.5rem, 4.5vw, 4rem);
          font-weight: 700;
          color: var(--fg);
          opacity: 0.25;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          letter-spacing: -0.03em;
          line-height: 1.1;
          text-transform: uppercase;
        }
        .service-title.active {
          opacity: 1;
          color: var(--fg);
        }
        .service-title:hover {
          opacity: 0.6;
        }
        .service-title.active:hover {
          opacity: 1;
        }
        
        .services-image-col {
          flex: 0 0 45%;
          position: sticky;
          top: 120px;
        }
        .services-image-container {
          width: 100%;
          aspect-ratio: 4 / 5;
          border-radius: 2rem;
          overflow: hidden;
          background: var(--glass-card);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          position: relative;
        }
        .service-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .projects-scroll-track::-webkit-scrollbar { display: none; }
        .projects-scroll-track {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .project-card-wrapper {
          height: 340px;
        }
        .domain-card {
          width: 280px;
        }
        
        @media (max-width: 900px) {
          .services-layout {
            flex-direction: column;
          }
          .services-image-col {
            display: block;
            width: 100%;
            margin-top: 2rem;
            position: relative;
            top: 0;
          }
          .services-image-container {
            aspect-ratio: auto;
            height: 370px;
            background: transparent;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
          }
          .service-title {
            font-size: clamp(2.2rem, 8vw, 3rem);
          }
          .domain-card {
            width: 260px;
          }
        }
        @media (max-width: 600px) {
          .domain-card {
            width: 85vw;
          }
        }
      `}</style>
    </section>
  );
}
