import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CoverflowCarousel({ projects, onProjectClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    setCurrentIndex(0);
  }, [projects]);

  useEffect(() => {
    if (!projects || projects.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [projects]);

  if (!projects || projects.length === 0) return null;

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
      }}
    >
      {projects.map((project, i) => {
        let distance = i - currentIndex;
        const len = projects.length;
        
        // Wrap around logic for shortest distance
        if (Math.abs(distance) > len / 2) {
          distance = distance > 0 ? distance - len : distance + len;
        }

        const absDistance = Math.abs(distance);
        const isActive = distance === 0;

        let x = '0%';
        let scale = 1;
        let zIndex = 10;
        let opacity = 1;

        if (isActive) {
          x = '0%';
          scale = 1;
          zIndex = 10;
          opacity = 1;
        } else if (absDistance === 1) {
          x = distance > 0 ? '45%' : '-45%';
          scale = 0.8;
          zIndex = 9;
          opacity = 0.9;
        } else if (absDistance === 2) {
          x = distance > 0 ? '80%' : '-80%';
          scale = 0.6;
          zIndex = 8;
          opacity = 0.7;
        } else {
          x = distance > 0 ? '100%' : '-100%';
          scale = 0.4;
          zIndex = 7;
          opacity = 0;
        }

        const isHovered = hoveredIndex === i;

        return (
          <motion.div
            key={i}
            animate={{ x, scale, zIndex, opacity }}
            transition={{ type: 'spring', stiffness: 250, damping: 25 }}
            style={{
              position: 'absolute',
              width: '65%',
              height: 'auto',
              borderRadius: '2rem',
              boxShadow: isActive ? '0 20px 40px rgba(0,0,0,0.3)' : '0 10px 20px rgba(0,0,0,0.15)',
              cursor: 'pointer',
              originX: 0.5,
              originY: 0.5,
              overflow: 'visible',
              backgroundColor: 'transparent',
            }}
            onClick={() => {
              if (isActive) {
                if (project.behance) {
                  window.open(project.behance, '_blank');
                } else if (onProjectClick) {
                  onProjectClick(project);
                }
              } else {
                setCurrentIndex(i);
              }
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img 
              src={project.img} 
              alt={project.title} 
              style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', display: 'block', borderRadius: '2rem' }}
            />
            
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(10, 10, 15, 0.5)',
                    borderRadius: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ position: 'absolute', bottom: 'calc(100% + 24px)', left: '-50%', right: '-50%', textAlign: 'center', pointerEvents: 'none' }}>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--fg)', marginBottom: '0.5rem', fontWeight: 600 }}>{project.title}</h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--fg2)', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', padding: '0 20px' }}>{project.desc}</p>
                  </div>

                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '12px 24px',
                    borderRadius: 999,
                    background: 'var(--accent)',
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: '0 8px 24px rgba(124,109,250,0.4)',
                  }}>
                    View Case Study
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="19" x2="19" y2="5" /><polyline points="9 5 19 5 19 15" /></svg>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
