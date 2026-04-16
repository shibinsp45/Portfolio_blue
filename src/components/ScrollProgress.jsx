import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setW(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, height: 2, zIndex: 1000,
      width: `${w}%`, pointerEvents: 'none',
      background: 'linear-gradient(90deg, #7c6dfa, #a78bfa)',
      transition: 'width 0.1s linear',
    }} />
  );
}
