import * as React from 'react';
import { motion } from 'framer-motion';

export function TestimonialCard({ handleShuffle, testimonial, position, avatar, author }) {
  const isFront = position === "front";
  const isMiddle = position === "middle";

  return (
    <motion.div
      style={{
        zIndex: isFront ? 2 : isMiddle ? 1 : 0,
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        borderRadius: '2rem',
        border: isFront ? '1px solid rgba(124,109,250,0.25)' : '1px solid rgba(255,255,255,0.06)',
        background: 'linear-gradient(160deg, rgba(30,28,50,0.97) 0%, rgba(18,17,35,0.97) 100%)',
        boxShadow: isFront
          ? '0 32px 64px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,109,250,0.1)'
          : '0 25px 50px -12px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2.5rem 2rem',
        textAlign: 'center',
        filter: isFront ? 'none' : isMiddle ? 'blur(2px) brightness(0.75)' : 'blur(4px) brightness(0.55)',
        cursor: isFront ? 'grab' : 'auto',
      }}
      animate={{
        rotate: isFront ? "-5deg" : isMiddle ? "0deg" : "5deg",
        x: isFront ? "-12%" : isMiddle ? "10%" : "32%",
        y: isFront ? 0 : isMiddle ? "5%" : "12%",
        scale: isFront ? 1 : isMiddle ? 0.94 : 0.88,
      }}
      whileHover={isFront ? { scale: 1.03, boxShadow: '0 40px 80px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(124,109,250,0.2)' } : {}}
      drag={isFront ? "x" : false}
      dragElastic={0.3}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      whileDrag={{ scale: 1.05, rotate: '0deg', cursor: 'grabbing' }}
      onDragEnd={(e, info) => {
        if (info.offset.x < -80 || info.offset.x > 80) {
          handleShuffle();
        }
      }}
      transition={{ duration: 0.45, type: "spring", stiffness: 180, damping: 22 }}
    >
      {/* Fully rounded avatar with accent ring */}
      <div style={{
        width: 96, height: 96,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '3px solid var(--accent)',
        boxShadow: '0 0 0 4px rgba(124,109,250,0.15), 0 8px 24px rgba(0,0,0,0.4)',
        marginBottom: '1.75rem',
        flexShrink: 0,
      }}>
        <img
          src={avatar}
          alt={author}
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
          draggable={false}
        />
      </div>
      
      <p style={{ fontSize: '0.9375rem', color: 'var(--fg2)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '2rem', flex: 1, display: 'flex', alignItems: 'center' }}>
        "{testimonial}"
      </p>

      <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.02em' }}>
        {author}
      </div>
    </motion.div>
  );
}
