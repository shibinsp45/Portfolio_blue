import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function generateStars(n) {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    dur: (Math.random() * 3 + 2).toFixed(1),
    delay: (Math.random() * 3).toFixed(1),
    opacity: Math.random() * 0.7 + 0.2,
  }));
}


export default function Hero({ dark }) {
  const ref = useRef(null);
  const stars = useMemo(() => generateStars(140), []);
  const { scrollYProgress, scrollY } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Content — moves up fastest (foreground)
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const contentScale = useTransform(scrollY, [0, 800], [1, 0.8]);
  const bgScale = useTransform(scrollY, [0, 800], [1, 0.9]);

  // Stars layer — slow drift (deep background)
  const starsY  = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  // Ambient glow 1 — medium depth
  const glow1Y  = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  // Ambient glow 2 — slightly faster
  const glow2Y  = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  // Ambient glow 3
  const glow3Y  = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  // Planet glow — barely moves (feels anchored/massive)
  const planetY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["interactive experiences", "delightful interfaces", "seamless products", "clean engineering"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 3500);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <section ref={ref} id="home" style={{
      height: '100svh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '90px 2rem 3rem', position: 'sticky', top: 0, overflow: 'clip', zIndex: 0,
      background: dark 
        ? "linear-gradient(135deg, #0a0613 0%, #150d27 100%)" 
        : "var(--bg)",
    }}>
      <motion.div style={{ position: 'absolute', inset: 0, scale: bgScale, transformOrigin: 'center top' }}>
        {/* Noise */}
      <div className="noise" />

      {/* Stars — slow drift */}
      <motion.div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', y: starsY }}>
        {stars.map(s => (
          <div key={s.id} style={{
            position: 'absolute', borderRadius: '50%', background: 'var(--fg)',
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size,
            opacity: s.opacity,
            animation: `blink ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }} />
        ))}
      </motion.div>

      {/* Ambient glows — each at a different depth */}
      <motion.div style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,109,250,0.15) 0%, transparent 70%)', top: -150, right: -150, animation: 'drift 12s ease-in-out infinite', pointerEvents: 'none', y: glow1Y }} />
      <motion.div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)', bottom: -100, left: '5%', animation: 'drift 15s ease-in-out 2s infinite reverse', pointerEvents: 'none', y: glow2Y }} />
      <motion.div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)', bottom: '20%', right: '15%', animation: 'drift 18s ease-in-out 4s infinite', pointerEvents: 'none', y: glow3Y }} />

        {/* Planet glow — barely moves, feels massive and anchored */}
        <motion.div className="planet-glow" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%) translateY(85%)', pointerEvents: 'none', y: planetY }} />
      </motion.div>

      {/* Content */}
      <motion.div style={{ y, opacity, scale: contentScale, position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 1000, width: '100%' }}>
        {/* Intro Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ 
            display: 'inline-flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            gap: '6px',
            padding: '8px 20px', 
            borderRadius: 999, 
            background: 'var(--surface2)', 
            border: '1px solid var(--border)',
            marginBottom: '2rem',
            backdropFilter: 'blur(12px)'
          }}
        >
          <span style={{ fontSize: '0.875rem', color: 'var(--fg2)', fontWeight: 500 }}>
            Hey there, I'm
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: 'var(--fg)', fontWeight: 600, letterSpacing: '-0.01em' }}>
            Shibin S P
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ 
            fontFamily: "'Inter', sans-serif", 
            fontSize: 'clamp(1.5rem, 5.5vw, 5rem)', 
            fontWeight: 500, 
            lineHeight: 1.25, 
            letterSpacing: '-0.04em', 
            color: 'var(--fg)', 
            marginBottom: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <span style={{ whiteSpace: 'nowrap' }}>A Product Designer</span>
          <span style={{ whiteSpace: 'nowrap' }}>with focus on</span>
          <span style={{ 
            position: 'relative', 
            display: 'block', 
            height: '1.35em', 
            width: '100%', 
            overflow: 'hidden',
            marginTop: '0.1em'
          }}>
            {titles.map((title, index) => (
              <motion.span
                key={index}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  fontSize: 'clamp(1.3rem, 3.8vw, 4rem)',
                  letterSpacing: '-0.04em',
                  whiteSpace: 'nowrap',
                }}
                initial={{ opacity: 0, y: '110%' }}
                transition={{ type: 'spring', stiffness: 60, damping: 18 }}
                animate={
                  titleNumber === index
                    ? { y: '0%', opacity: 1 }
                    : { y: titleNumber > index ? '-110%' : '110%', opacity: 0 }
                }
              >
                {title}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ fontSize: '1rem', color: 'var(--fg2)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 2rem' }}
        >
          Specializing in user-centred interfaces and front-end engineering.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7, type: 'spring', stiffness: 100 }}
          style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'nowrap' }}
          className="hero-buttons"
        >
          <motion.a href="#work" 
            whileHover={{ 
              scale: 1.04, 
              y: -2,
              boxShadow: '0 0 25px rgba(155, 135, 245, 0.45)'
            }} 
            whileTap={{ scale: 0.97 }}
            className="hero-btn primary neumorphic-button"
            style={{ 
              display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 999, 
              background: 'var(--fg)', color: 'var(--bg)', fontSize: '1rem', fontWeight: 600, letterSpacing: '-0.01em', 
              cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap',
              position: 'relative', overflow: 'hidden'
            }}>
            Explore works
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </motion.a>
          <motion.a href="https://drive.google.com/drive/folders/1FMTzFedlti8jhFb-k_y83SzHGbcjUjvF" target="_blank" rel="noopener noreferrer" 
            whileHover={{ 
              scale: 1.04, 
              y: -2,
              boxShadow: '0 0 25px rgba(155, 135, 245, 0.3)'
            }} 
            whileTap={{ scale: 0.97 }}
            className="hero-btn secondary neumorphic-button"
            style={{ 
              display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 999, 
              background: 'transparent', color: 'var(--fg)', fontSize: '1rem', border: '1.5px solid var(--border2)', 
              cursor: 'pointer', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap',
              position: 'relative', overflow: 'hidden'
            }}>
            View Resume
          </motion.a>
        </motion.div>


      </motion.div>

    </section>
  );
}
