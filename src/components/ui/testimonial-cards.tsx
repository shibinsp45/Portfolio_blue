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
        borderRadius: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'linear-gradient(180deg, rgba(30,30,40,0.95) 0%, rgba(20,20,30,0.95) 100%)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        filter: isFront ? 'none' : isMiddle ? 'blur(2px) brightness(0.8)' : 'blur(4px) brightness(0.6)',
        cursor: isFront ? 'grab' : 'auto'
      }}
      animate={{
        rotate: isFront ? "-4deg" : isMiddle ? "0deg" : "4deg",
        x: isFront ? "-10%" : isMiddle ? "10%" : "30%",
        y: isFront ? 0 : isMiddle ? "5%" : "10%",
        scale: isFront ? 1 : isMiddle ? 0.95 : 0.9
      }}
      drag={isFront ? "x" : false}
      dragElastic={0.35}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      whileTap={{ cursor: isFront ? "grabbing" : "auto" }}
      onDragEnd={(e, info) => {
        if (info.offset.x < -100 || info.offset.x > 100) {
          handleShuffle();
        }
      }}
      transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
    >
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem' }}>
        <img
          src={avatar}
          alt={author}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
