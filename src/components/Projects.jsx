import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, typeLabels } from '../data/index.js';

const domainHeaders = {
  ux: "UI UX Designs and Case Studies",
  brand: "Branding and Visual Identity",
  web: "Web Development and Engineering",
  ai: "Generative AI Integrations"
};

const groupedProjects = projects.reduce((acc, project) => {
  if (!acc[project.type]) acc[project.type] = [];
  acc[project.type].push(project);
  return acc;
}, {});

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
        {/* Close Button */}
        <button onClick={onClose} style={{ 
          position: 'fixed', top: '2rem', right: '2rem', zIndex: 50,
          width: 48, height: 48, borderRadius: '50%', 
          background: 'var(--bg2)', border: '1px solid var(--border2)',
          color: 'var(--fg)', cursor: 'pointer', fontSize: '1.2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
        }}>✕</button>

        {/* Hero Image */}
        <div style={{ width: '100%', height: '60vh', background: 'var(--bg2)', overflow: 'hidden', position: 'relative' }}>
          <img src={project.img} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, var(--bg))' }} />
        </div>

        {/* Content */}
        <div style={{ padding: '0 2rem', marginTop: '-10vh', position: 'relative', zIndex: 5 }}>
           <div className="max-w" style={{ maxWidth: 800 }}>
              <span className="eyebrow" style={{ color: 'var(--accent2)' }}>{typeLabels[project.type]} • {project.year}</span>
              <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'var(--fg)', margin: '1rem 0 2rem', fontWeight: 600, letterSpacing: '-0.03em' }}>
                {project.title}
              </h1>
              
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3.5rem' }}>
                {project.behance && (
                  <a href={project.behance} target="_blank" rel="noopener noreferrer" 
                    className="contact-link" style={{ background: 'var(--accent)', color: '#fff', padding: '1rem 2rem', fontSize: '1rem' }}>
                    View Case Study on Behance ↗
                  </a>
                )}
              </div>

              <div style={{ display: 'grid', gap: '3rem' }}>
                <section>
                  <h3 style={{ color: 'var(--fg)', fontSize: '1.5rem', marginBottom: '1.25rem' }}>Overview</h3>
                  <p style={{ fontSize: '1.125rem', color: 'var(--fg2)', lineHeight: 1.8 }}>{project.desc}</p>
                </section>

                <div style={{ height: '1px', background: 'var(--border)' }} />

                <section>
                  <h3 style={{ color: 'var(--fg)', fontSize: '1.5rem', marginBottom: '1.25rem' }}>Project Highlights</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {[
                      { t: 'User Research', d: 'In-depth analysis of user pain points and behavioral patterns.' },
                      { t: 'UX Strategy', d: 'Defining the core product goals and mapping out the user journey.' },
                      { t: 'UI Design', d: 'Crafting a visually stunning and accessible interface system.' },
                      { t: 'Interaction', d: 'Building prototypes to test and refine all key interactions.' }
                    ].map(item => (
                      <div key={item.t} style={{ padding: '2rem', background: 'var(--bg2)', borderRadius: 24, border: '1px solid var(--border)' }}>
                        <h4 style={{ color: 'var(--accent2)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{item.t}</h4>
                        <p style={{ color: 'var(--fg2)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.d}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index, onClick, isMobile }) {
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      onClick={() => onClick(project)}
      style={{
        width: '100%', maxWidth: '1100px',
        margin: '0 auto',
        borderRadius: isMobile ? 24 : 32, 
        overflow: 'hidden',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(32px) saturate(180%)',
        WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        border: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        position: isMobile ? 'relative' : 'sticky',
        top: isMobile ? '0' : `${100 + (index * 20)}px`,
        zIndex: index + 10,
        boxShadow: '0 -20px 80px rgba(0,0,0,0.4)',
        cursor: 'pointer',
        marginBottom: isMobile ? '4rem' : '15rem', 
        transition: 'transform 0.3s ease, border-color 0.3s ease',
      }}
      whileHover={{ y: -5, borderColor: 'var(--border2)' }}
    >
      <div style={{ position: 'relative', aspectRatio: '16/9', background: 'var(--bg3)', overflow: 'hidden' }}>
        <img src={project.img} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        <div style={{ position: 'absolute', top: 24, right: 24, padding: '8px 16px', borderRadius: 99, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em' }}>
          {project.year}
        </div>
      </div>
      <div style={{ padding: '3rem', flex: 1 }}>
        <div className="eyebrow" style={{ marginBottom: '1rem', color: 'var(--accent2)' }}>{typeLabels[project.type]}</div>
        <h3 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.25rem)', fontWeight: 600, color: 'var(--fg)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>{project.title}</h3>
        <p style={{ fontSize: '1.125rem', color: 'var(--fg2)', lineHeight: 1.7, maxWidth: '700px', marginBottom: '2.5rem' }}>{project.desc}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--accent2)', fontSize: '1rem', fontWeight: 500 }}>
          Explores Case Study <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </div>
      </div>
    </motion.div>
  );
}

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
      document.body.style.overflow = 'auto';
    }
  }, [selectedProject]);

  return (
    <section id="work" className="section section--alt" style={{ padding: '10rem 0' }}>
      <div className="max-w" style={{ padding: '0 2rem', marginBottom: '8rem' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="eyebrow">Work Archive</div>
          <h2 className="section-title">Selected Case Studies &<br /><em>Design Solutions</em></h2>
        </motion.div>
      </div>

      <div className="max-w" style={{ padding: '0 2rem' }}>
        {Object.entries(groupedProjects).map(([domain, items]) => (
          <div key={domain} style={{ marginBottom: '15rem' }}>
             <div style={{ 
               position: 'sticky', top: '100px', zIndex: 1, marginBottom: '6rem', 
               background: 'transparent',
               opacity: 0.8
             }}>
               <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--fg3)', textTransform: 'uppercase', letterSpacing: '0.25em' }}>
                 {domainHeaders[domain]}
               </h3>
             </div>
             <div style={{ position: 'relative' }}>
               {items.map((project, idx) => (
                 <ProjectCard 
                   key={project.title} 
                   project={project} 
                   index={idx} 
                   onClick={setSelectedProject}
                   isMobile={isMobile}
                 />
               ))}
             </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
