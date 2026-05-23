import React, { useState, useRef, useEffect, useCallback, CSSProperties } from 'react';

// --- Component Interfaces ---
export interface Testimonial {
  id: string | number;
  initials: string;
  name: string;
  role: string;
  quote: string;
  tags: { text: string; type: 'featured' | 'default' }[];
  stats: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; text: string; }[];
  avatarGradient: string;
  avatar?: string;
}

export interface TestimonialStackProps {
  testimonials: Testimonial[];
  /** How many cards to show behind the main card */
  visibleBehind?: number;
  dark?: boolean;
}

// --- The Component ---
export const TestimonialStack = ({ testimonials, visibleBehind = 2, dark = true }: TestimonialStackProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartRef = useRef(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const totalCards = testimonials.length;

  const navigate = useCallback((newIndex: number) => {
    setActiveIndex((newIndex + totalCards) % totalCards);
  }, [totalCards]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, index: number) => {
    if (index !== activeIndex) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartRef.current = clientX;
    cardRefs.current[activeIndex]?.classList.add('is-dragging');
  };

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragOffset(clientX - dragStartRef.current);
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    cardRefs.current[activeIndex]?.classList.remove('is-dragging');
    if (Math.abs(dragOffset) > 50) {
      navigate(activeIndex + (dragOffset < 0 ? 1 : -1));
    }
    setIsDragging(false);
    setDragOffset(0);
  }, [isDragging, dragOffset, activeIndex, navigate]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);
  
  if (!testimonials?.length) return null;

  return (
    <section className="testimonials-stack relative pb-14 w-full max-w-[640px] mx-auto min-h-[360px]">
      {testimonials.map((testimonial, index) => {
        const isActive = index === activeIndex;
        // Calculate the card's position in the display order
        const displayOrder = (index - activeIndex + totalCards) % totalCards;

        // --- DYNAMIC STYLE CALCULATION ---
        const style: CSSProperties = {};
        if (displayOrder === 0) { // The active card
          style.transform = `translateX(${dragOffset}px)`;
          style.opacity = 1;
          style.zIndex = totalCards;
        } else if (displayOrder <= visibleBehind) { // Cards stacked behind
          const scale = 1 - 0.05 * displayOrder;
          const translateY = -1.5 * displayOrder; // Stacked slightly tighter for compact fit
          style.transform = `scale(${scale}) translateY(${translateY}rem)`;
          style.opacity = 1 - 0.22 * displayOrder;
          style.zIndex = totalCards - displayOrder;
        } else { // Cards that are out of view
          style.transform = 'scale(0)';
          style.opacity = 0;
          style.zIndex = 0;
        }

        const tagClasses = (type: 'featured' | 'default') => type === 'featured' 
          ? 'bg-[#7c6dfa]/15 text-[#a78bfa] border border-[#7c6dfa]/30' 
          : (dark 
              ? 'bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[var(--fg2)]' 
              : 'bg-[rgba(0,0,0,0.03)] border border-[rgba(0,0,0,0.06)] text-[var(--fg2)]');
          
        return (
          <div
            ref={el => cardRefs.current[index] = el}
            key={testimonial.id}
            className="testimonial-card absolute w-full left-0 right-0 p-6 md:p-8 rounded-[1.75rem] transition-all duration-300 select-none cursor-grab active:cursor-grabbing"
            style={{
              ...style,
              background: dark ? 'rgba(20, 20, 25, 0.45)' : 'rgba(255, 255, 255, 0.45)',
              border: dark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
              backdropFilter: 'blur(32px) saturate(180%)',
              WebkitBackdropFilter: 'blur(32px) saturate(180%)',
              boxShadow: dark 
                ? '0 20px 50px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                : '0 20px 50px rgba(31, 38, 135, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
            }} 
            onMouseDown={(e) => handleDragStart(e, index)}
            onTouchStart={(e) => handleDragStart(e, index)}
          >
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {testimonial.avatar ? (
                    <img src={testimonial.avatar} alt={testimonial.name} className="flex-shrink-0 w-11 h-11 rounded-xl object-cover" />
                  ) : (
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white font-semibold text-base" style={{ background: testimonial.avatarGradient }}>
                      {testimonial.initials}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-lg text-[var(--fg)]">{testimonial.name}</h3>
                    <p className="text-xs text-[var(--fg3)] mt-0.5">{testimonial.role}</p>
                  </div>
                </div>
              </div>
              
              <blockquote className="text-[var(--fg2)] leading-relaxed text-sm md:text-base mb-6 font-light italic">"{testimonial.quote}"</blockquote>
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-t border-[rgba(255,255,255,0.08)] pt-4 gap-4">
                <div className="flex flex-wrap gap-2">
                  {testimonial.tags.map((tag, i) => (
                    <span key={i} className={['text-[10px]', 'px-2.5', 'py-1', 'rounded-full', 'font-medium', tagClasses(tag.type)].join(' ')}>
                      {tag.text}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-[10px] text-[var(--fg3)] font-mono">
                  {testimonial.stats.map((stat, i) => {
                    const IconComponent = stat.icon;
                    return (
                      <span key={i} className="flex items-center">
                        <IconComponent className="mr-1 h-3 w-3" />
                        {stat.text}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
      <div className="pagination flex gap-2 justify-center absolute bottom-0 left-0 right-0 z-30">
        {testimonials.map((_, index) => (
          <button 
            key={index} 
            aria-label={`Go to testimonial ${index + 1}`} 
            onClick={() => navigate(index)} 
            className={`pagination-dot w-2 h-2 rounded-full transition-all duration-300 border-none cursor-pointer ${activeIndex === index ? 'bg-[#7c6dfa] scale-125' : 'bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.4)]'}`} 
          />
        ))}
      </div>
    </section>
  );
};
