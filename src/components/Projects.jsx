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

function ProjectCard({ project }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{
        width: 'clamp(280px, 80vw, 400px)',
        flexShrink: 0,
        borderRadius: 24, overflow: 'hidden',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(24px) saturate(150%)',
        WebkitBackdropFilter: 'blur(24px) saturate(150%)',
        border: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        position: 'relative',
        transition: 'border-color 0.4s, box-shadow 0.4s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.boxShadow = '0 24px 72px rgba(0,0,0,0.3)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* Top Image */}
      <div style={{ position: 'relative', aspectRatio: '16/11', background: 'var(--bg3)', overflow: 'hidden' }}>
        <img src={project.img} alt={project.title} 
             style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }} 
             loading="lazy" 
             onError={e => { e.target.style.display = 'none'; }}
             onMouseEnter={e => { e.target.style.transform = 'scale(1.04)'; }}
             onMouseLeave={e => { e.target.style.transform = 'scale(1)'; }}
        />
      </div>

      {/* Info Content */}
      <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontFamily: "'Inter', 'DM Sans', sans-serif", fontSize: '1.35rem', fontWeight: 600, color: 'var(--fg)', letterSpacing: '-0.02em', marginBottom: '0.875rem', lineHeight: 1.25 }}>
          {project.title.split('—')[0].trim()}
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--fg2)', lineHeight: 1.6, flex: 1, marginBottom: '2rem' }}>
          {project.desc}
        </p>

        {/* Bottom Domain Pill */}
        <div style={{ alignSelf: 'flex-start' }}>
          <span style={{ fontSize: '0.7rem', padding: '6px 14px', borderRadius: 999, background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--fg)', fontWeight: 500, letterSpacing: '0.02em' }}>
            {typeLabels[project.type] || 'Project Task'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function HorizontalDomainScroll({ domainType, items }) {
  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);

  const { scrollYProgress } = useScroll({ target: targetRef });

  // Recompute horizontally scrollable distance on mount and resize
  useEffect(() => {
    const computeRange = () => {
      if (trackRef.current) {
        const scrollWidth = trackRef.current.scrollWidth;
        const clientWidth = trackRef.current.parentElement.clientWidth;
        setScrollRange(Math.max(0, scrollWidth - clientWidth));
      }
    };
    computeRange();
    window.addEventListener('resize', computeRange);
    return () => window.removeEventListener('resize', computeRange);
  }, [items]);

  // Smooth physical translation tied vertically
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  // Dynamically calculate wrapping height to provide enough scroll space without jumping, but cap for small tracks
  const containerHeight = scrollRange > 0 ? `calc(100vh + ${scrollRange}px)` : 'auto';
  
  // If it doesn't need scrolling (e.g. 1 item), disable the sticky wrapper natively
  const isSticky = scrollRange > 0;

  return (
    <section ref={targetRef} style={{ height: containerHeight, position: 'relative', marginBottom: isSticky ? 0 : '4rem' }}>
      <div style={{ position: isSticky ? 'sticky' : 'relative', top: 0, height: isSticky ? '100vh' : 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        
        {/* Fixed Title Header */}
        <div className="max-w" style={{ width: '100%', marginBottom: '2.5rem' }}>
           <h3 style={{ fontFamily: "'Inter', 'DM Sans', sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 600, color: 'var(--fg)', letterSpacing: '-0.02em' }}>
            {domainHeaders[domainType] || 'Special Projects'}
          </h3>
        </div>

        {/* Sliding Horizontal Cards Track */}
        <div style={{ width: '100%', overflowX: isSticky ? 'visible' : 'auto', scrollbarWidth: 'none' }}>
           <motion.div ref={trackRef} style={{ x: isSticky ? x : 0, display: 'flex', gap: '2rem', paddingLeft: 'max(2rem, calc((100vw - 1200px) / 2))', paddingRight: 'max(2rem, calc((100vw - 1200px) / 2))', width: 'max-content' }}>
              {items.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
           </motion.div>
        </div>

      </div>
    </section>
  );
}

export default function Projects() {
  return (
    <section id="work" className="section section--alt" style={{ padding: '6rem 0' }}>
      
      {/* Global Master Header */}
      <div className="max-w" style={{ padding: '0 2rem', marginBottom: '2rem' }}>
        <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <div className="eyebrow">Selected work</div>
            <h2 className="section-title">Projects</h2>
        </motion.div>
      </div>

      {/* Render a sticky scroll tracker for EACH mapped domain */}
      {Object.entries(groupedProjects).map(([domain, items]) => (
        <HorizontalDomainScroll key={domain} domainType={domain} items={items} />
      ))}
      
    </section>
  );
}
