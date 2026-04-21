import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects, typeLabels } from '../data/index.js';

// Domain mapping based on request
const domainHeaders = {
  ux: "UI UX Designs and Case Studies",
  brand: "Branding and Visual Identity",
  web: "Web Development and Engineering",
  ai: "Generative AI Integrations"
};

// Group projects logically
const groupedProjects = projects.reduce((acc, project) => {
  if (!acc[project.type]) acc[project.type] = [];
  acc[project.type].push(project);
  return acc;
}, {});

function ProjectCard({ project, index, isMobile }) {
  return (
    <motion.div
      initial={isMobile ? { opacity: 0, y: 20 } : false}
      whileInView={isMobile ? { opacity: 1, y: 0 } : false}
      viewport={{ once: true }}
      style={{
        width: isMobile ? '100%' : 'clamp(280px, 80vw, 400px)',
        flexShrink: 0,
        borderRadius: 24, overflow: 'hidden',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(32px) saturate(180%)',
        WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        border: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        position: isMobile ? 'sticky' : 'relative',
        top: isMobile ? `${120 + (index * 20)}px` : 'auto',
        zIndex: isMobile ? index + 10 : 1,
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.3s ease',
        cursor: 'pointer',
        marginBottom: isMobile ? '4rem' : 0,
        boxShadow: isMobile ? '0 -10px 40px rgba(0,0,0,0.2), 0 20px 50px rgba(0,0,0,0.3)' : 'none',
        willChange: isMobile ? 'transform, top' : 'auto',
        transform: isMobile ? `scale(${1 - (index * 0.01)})` : 'none',
      }}
      onMouseEnter={e => { if(!isMobile) { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.boxShadow = '0 24px 72px rgba(0,0,0,0.3)'; } }}
      onMouseLeave={e => { if(!isMobile) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; } }}
    >
      {/* Top Image */}
      <div style={{ position: 'relative', aspectRatio: '16/10', background: 'var(--bg3)', overflow: 'hidden' }}>
        <img src={project.img} alt={project.title} 
             style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
             loading="lazy" 
             onError={e => { e.target.style.display = 'none'; }}
        />
        <div style={{ position: 'absolute', top: 16, right: 16, padding: '6px 12px', borderRadius: 99, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em' }}>
          {project.year}
        </div>
      </div>

      {/* Info Content */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--fg)', letterSpacing: '-0.01em', marginBottom: '0.5rem' }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--fg2)', lineHeight: 1.6, flex: 1, marginBottom: '1.5rem' }}>
          {project.desc}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', padding: '5px 12px', borderRadius: 99, background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--fg2)' }}>
            {typeLabels[project.type]}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent2)', fontSize: '0.8125rem', fontWeight: 500 }}>
            Case Study <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function HorizontalDomainScroll({ domainType, items, isMobile }) {
  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);

  const { scrollYProgress } = useScroll({ target: targetRef });

  useEffect(() => {
    if (isMobile) return;
    const computeRange = () => {
      if (trackRef.current) {
        setScrollRange(Math.max(0, trackRef.current.scrollWidth - trackRef.current.parentElement.clientWidth));
      }
    };
    computeRange();
    window.addEventListener('resize', computeRange);
    return () => window.removeEventListener('resize', computeRange);
  }, [items, isMobile]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  
  if (isMobile) {
    return (
      <div style={{ marginBottom: '8rem', padding: '0 1rem' }}>
        <div style={{ 
          position: 'sticky', 
          top: '80px', 
          zIndex: 5, 
          background: 'var(--bg2)', 
          padding: '1rem 0',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--border)',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--fg)', margin: 0 }}>
            {domainHeaders[domainType]}
          </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {items.map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx} isMobile={true} />
          ))}
        </div>
      </div>
    );
  }

  const isSticky = scrollRange > 0;
  return (
    <section ref={targetRef} style={{ height: isSticky ? `calc(100vh + ${scrollRange}px)` : 'auto', position: 'relative', marginBottom: isSticky ? 0 : '4rem' }}>
      <div style={{ position: isSticky ? 'sticky' : 'relative', top: 0, height: isSticky ? '100vh' : 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        <div className="max-w" style={{ width: '100%', marginBottom: '2.5rem' }}>
           <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 600, color: 'var(--fg)' }}>
            {domainHeaders[domainType]}
          </h3>
        </div>
        <div style={{ width: '100%', overflowX: isSticky ? 'visible' : 'auto', scrollbarWidth: 'none' }}>
           <motion.div ref={trackRef} style={{ x: isSticky ? x : 0, display: 'flex', gap: '2rem', paddingLeft: 'max(2rem, calc((100vw - 1200px) / 2))', paddingRight: 'max(2rem, calc((100vw - 1200px) / 2))', width: 'max-content' }}>
              {items.map((project) => (
                <ProjectCard key={project.title} project={project} isMobile={false} />
              ))}
           </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Projects() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section id="work" className="section section--alt" style={{ padding: '6rem 0' }}>
      <div className="max-w" style={{ padding: '0 2rem', marginBottom: '4rem' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="eyebrow">Selected work</div>
          <h2 className="section-title">Case Studies</h2>
        </motion.div>
      </div>

      {Object.entries(groupedProjects).map(([domain, items]) => (
        <HorizontalDomainScroll key={domain} domainType={domain} items={items} isMobile={isMobile} />
      ))}
    </section>
  );
}
