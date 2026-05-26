import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu, Zap } from 'lucide-react';
import logo from '../assets/logo.png';

const navLinks = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Projects', href: '#work' },
  { label: 'Journey',  href: '#journey' },
  { label: 'Connect',  href: '#contact' },
];

export default function Navbar({ dark, toggleTheme }) {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [activeSection,  setActiveSection]  = useState('');

  /* ── scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── active section tracking ── */
  useEffect(() => {
    const ids = navLinks.map(l => l.href.replace('#', ''));
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const scrollPos = window.scrollY + 200;
        const sorted = ids
          .map(id => ({ id, el: document.getElementById(id) }))
          .filter(s => s.el)
          .sort((a, b) => a.el.offsetTop - b.el.offsetTop);
        let cur = '';
        for (const { id, el } of sorted) {
          if (el.offsetTop <= scrollPos) cur = id;
        }
        setActiveSection(p => p !== cur ? cur : p);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
    setMobileOpen(false);
  };

  /* ── shared glass surface tokens ── */
  const glassBg = dark 
    ? 'rgba(10, 10, 15, 0.45)' 
    : 'rgba(255, 255, 255, 0.35)';

  const glassBdr = dark 
    ? 'rgba(255, 255, 255, 0.08)' 
    : 'rgba(255, 255, 255, 0.5)';

  const glassShadow = dark
    ? (scrolled 
        ? '0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 0 50px rgba(124, 109, 250, 0.15)' 
        : '0 4px 20px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.06)')
    : (scrolled 
        ? '0 12px 40px rgba(31, 38, 135, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.65)' 
        : '0 4px 20px rgba(31, 38, 135, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.4)');

  return (
    <>
      {/* ══════════════════════════════════════
          DESKTOP — single floating capsule
      ══════════════════════════════════════ */}
      <motion.nav
        className="desktop-nav"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0,    opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        style={{
          position: 'fixed',
          top: 18,
          left: 0,
          right: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: 'calc(100% - 48px)',
          maxWidth: '1200px',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          borderRadius: 999,
          background: glassBg,
          border: `1px solid ${glassBdr}`,
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          boxShadow: glassShadow,
          transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
          whiteSpace: 'nowrap',
        }}
      >
        {/* Left Side: Logo */}
        <div style={{ flex: '1 0 0', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <motion.a
            href="#home"
            onClick={e => handleNavClick(e, '#home')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <img
              src={logo}
              alt="Shibin S P"
              className="nav-logo"
              style={{ height: 44, objectFit: 'contain', opacity: 0.92 }}
            />
          </motion.a>
        </div>

        {/* Center: Nav links (nested capsule) */}
        <div className="desktop-only" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.15)',
          padding: '4px 6px',
          borderRadius: 999,
        }}>
          {navLinks.map(link => {
            const isActive  = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                className={`desktop-only nav-opt ${isActive ? 'active' : ''}`}
                onClick={e => handleNavClick(e, link.href)}
                style={{
                  position: 'relative',
                  fontSize: '0.875rem',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: isActive ? '-0.01em' : '0',
                  padding: '8px 18px',
                  borderRadius: 999,
                  color: isActive ? '#fff' : 'var(--fg2)',
                  background: isActive
                    ? 'linear-gradient(135deg, #7c6dfa 0%, #a78bfa 100%)'
                    : 'transparent',
                  boxShadow: isActive
                    ? '0 0 20px rgba(124,109,250,0.5), inset 0 1px 0 rgba(255,255,255,0.2)'
                    : 'none',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
                {/* Active underline glow dot */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-dot"
                    style={{
                      position: 'absolute',
                      bottom: 4,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.8)',
                      boxShadow: '0 0 6px rgba(255,255,255,0.8)',
                    }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Side: Toggle + Connect */}
        <div style={{ flex: '1 0 0', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }}>
          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255, 255, 255, 0.4)',
              background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(255, 255, 255, 0.2)',
              boxShadow: dark ? 'none' : '0 2px 8px rgba(31, 38, 135, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--fg2)',
              flexShrink: 0,
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {dark
                ? <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                : <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></>
              }
            </svg>
          </motion.button>

          {/* Connect CTA */}
          <motion.a
            href="mailto:shibinsp45@gmail.com"
            className="desktop-only-connect"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              fontSize: '0.85rem', fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600, letterSpacing: '-0.01em',
              padding: '9px 20px', borderRadius: 999,
              background: 'linear-gradient(135deg, #7c6dfa 0%, #a78bfa 100%)',
              color: '#fff',
              boxShadow: '0 0 24px rgba(124,109,250,0.45), inset 0 1px 0 rgba(255,255,255,0.2)',
              flexShrink: 0,
            }}
          >
            <Zap size={13} strokeWidth={2.5} />
            Connect
          </motion.a>

          {/* Mobile hamburger (visible only on small screens via CSS) */}
          <button
            onClick={() => setMobileOpen(true)}
            className="mobile-only-btn"
            style={{
              display: 'none',
              width: 36, height: 36, borderRadius: '50%',
              border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
              background: 'transparent',
              cursor: 'pointer', alignItems: 'center', justifyContent: 'center',
              color: 'var(--fg2)', flexShrink: 0,
            }}
          >
            <Menu size={18} />
          </button>
        </div>
      </motion.nav>

      {/* ══════════════════════════════════════
          MOBILE DRAWER
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,   scale: 1 }}
            exit={{   opacity: 0, y: -20, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 250 }}
            style={{
              position: 'fixed', inset: 0,
              background: dark ? 'rgba(8,8,14,0.97)' : 'rgba(250,250,252,0.97)',
              backdropFilter: 'blur(40px)', zIndex: 200,
              display: 'flex', flexDirection: 'column',
              padding: '5.5rem 2.5rem 2.5rem',
            }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'absolute', top: '1.25rem', right: '1.25rem',
                width: 44, height: 44, borderRadius: '50%',
                border: '1px solid var(--border)', background: 'var(--surface)',
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: 'var(--fg)',
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={e => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.07 }}
                    style={{
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'Inter', sans-serif",
                      fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
                      fontWeight: 500,
                      color: isActive ? 'var(--accent)' : 'var(--fg)',
                      display: 'block',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                    }}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
              <motion.a
                href="mailto:shibinsp45@gmail.com"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  width: '100%', padding: '1.1rem', borderRadius: 16,
                  background: 'linear-gradient(135deg, #7c6dfa, #a78bfa)',
                  color: '#fff', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: 8,
                  fontWeight: 600, marginBottom: '1.5rem', fontSize: '1rem',
                  boxShadow: '0 0 32px rgba(124,109,250,0.4)',
                }}
              >
                <Zap size={16} />
                Connect
              </motion.a>
              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                <a href="https://linkedin.com/in/shibinsp45" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.875rem', color: 'var(--fg3)' }}>LinkedIn</a>
                <a href="https://wa.me/918606129072"          target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.875rem', color: 'var(--fg3)' }}>WhatsApp</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-opt {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-opt:hover:not(.active) {
          color: var(--fg) !important;
          background: ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'} !important;
        }
        @media (max-width: 860px) {
          .desktop-nav {
            top: 12px !important;
            padding: 6px 12px 6px 16px !important;
            left: 1.5rem !important;
            right: 1.5rem !important;
            transform: none !important;
            width: auto !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          .desktop-only { display: none !important; }
          .desktop-only-connect { display: none !important; }
          .mobile-only-btn { display: flex !important; }
        }
        @media (max-width: 480px) {
          .desktop-nav {
            left: 1rem !important;
            right: 1rem !important;
            padding: 6px 10px 6px 14px !important;
          }
        }
      `}</style>
    </>
  );
}
