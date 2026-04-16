import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import logo from '../assets/logo.png';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ dark, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── Desktop nav ── */}
      <motion.nav
        className="desktop-nav"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 3rem', height: 80,
          transition: 'all 0.4s ease',
          background: scrolled
            ? (dark ? 'rgba(10,10,15,0.55)' : 'rgba(255,255,255,0.7)')
            : 'transparent',
          backdropFilter: scrolled ? 'blur(28px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(180%)' : 'none',
          borderBottom: scrolled ? (dark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.08)') : '1px solid transparent',
          boxShadow: scrolled ? (dark ? '0 1px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)' : '0 1px 40px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)') : 'none',

        }}
      >
        {/* Logo */}
        <a href="#home" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Shibin S P Logo" className="nav-logo" style={{ maxHeight: '56px', objectFit: 'contain' }} />
        </a>

        {/* Center pills */}
        <div className="nav-center-pills" style={{
          display: 'flex', gap: 2, padding: '5px 6px', borderRadius: 999,
          background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
          border: dark ? '1px solid rgba(255,255,255,0.09)' : '1px solid rgba(0,0,0,0.08)',
          backdropFilter: 'blur(20px)',
        }}>
          {navLinks.map(link => (
            <a key={link.label} href={link.href} style={{
              fontSize: '0.8125rem', padding: '7px 18px', borderRadius: 999,
              color: 'var(--fg2)', transition: 'all 0.2s', fontWeight: 400,
            }}
              onMouseEnter={e => { e.target.style.color = 'var(--fg)'; e.target.style.background = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'; }}
              onMouseLeave={e => { e.target.style.color = 'var(--fg2)'; e.target.style.background = 'transparent'; }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Theme toggle */}
          <button onClick={toggleTheme} aria-label="Toggle theme"
            style={{ width: 36, height: 36, borderRadius: '50%', border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)', background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg2)', transition: 'all 0.2s', backdropFilter: 'blur(10px)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'; e.currentTarget.style.color = 'var(--fg)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'; e.currentTarget.style.color = 'var(--fg2)'; }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {dark
                ? <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                : <><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /></>
              }
            </svg>
          </button>

          {/* Let's talk */}
          <motion.a href="mailto:shibinsp45@gmail.com" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{ fontSize: '0.8125rem', padding: '8px 20px', borderRadius: 999, background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.01em', display: 'inline-flex', alignItems: 'center' }}>
            Let's talk
          </motion.a>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(true)}
            style={{ display: 'none', width: 36, height: 36, borderRadius: '50%', border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)', background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', cursor: 'pointer', alignItems: 'center', justifyContent: 'center', color: 'var(--fg2)' }}
            className="mobile-only-btn"
          >
            <Menu size={16} />
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: dark ? 'rgba(10,10,15,0.97)' : 'rgba(248,249,250,0.97)', backdropFilter: 'blur(20px)', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '3rem 2rem', gap: '2rem' }}
          >
            <button onClick={() => setMobileOpen(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--border)', background: 'var(--surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg2)' }}>
              <X size={16} />
            </button>
            {navLinks.map(link => (
              <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                style={{ fontFamily: "'Fraunces', serif", fontSize: '2.5rem', fontWeight: 300, color: 'var(--fg2)', transition: 'color 0.2s', letterSpacing: '-0.02em' }}
                onMouseEnter={e => e.target.style.color = 'var(--fg)'}
                onMouseLeave={e => e.target.style.color = 'var(--fg2)'}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@media(max-width:900px){.mobile-only-btn{display:flex!important}.nav-center-pills{display:none!important}.desktop-nav{padding:0 1.5rem!important;height:64px!important}}`}</style>
    </>
  );
}
