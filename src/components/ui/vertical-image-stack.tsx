"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, type PanInfo } from "framer-motion"

interface Project {
  title: string;
  desc: string;
  img: string;
  type: string;
  year: string;
  behance?: string;
}

interface VerticalImageStackProps {
  projects?: Project[];
  onSelect?: (project: Project) => void;
}

const defaultImages = [
  {
    id: 1,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/luxury-black-sneaker-with-red-sole-on-grey-backgro-hj40sZT8MUUSeLz18VN7EjhcnV0kSD.jpg",
    alt: "Black sneaker with red sole",
    title: "Black Sneaker",
    desc: "Luxury sneaker with custom red sole design.",
    type: "brand",
    year: "2025"
  },
  {
    id: 2,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/white-minimalist-sneaker-on-light-background-xQxkXgGrSrAe6pvLPNC6yrh20Atqoa.jpg",
    alt: "White minimalist sneaker",
    title: "White Sneaker",
    desc: "Clean minimalist everyday sneaker concept.",
    type: "brand",
    year: "2025"
  },
  {
    id: 3,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/navy-blue-running-shoe-on-gradient-background-E1spqSK9gDvh3gTNwASkttEg76nZgm.jpg",
    alt: "Navy blue running shoe",
    title: "Running Shoe",
    desc: "High performance running gear.",
    type: "brand",
    year: "2025"
  },
  {
    id: 4,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/red-athletic-sneaker-on-dark-background-skamDX1NbCRW4jvHxijkfmCnHGr6NJ.jpg",
    alt: "Red athletic sneaker",
    title: "Athletic Sneaker",
    desc: "Lightweight workout and crossfit sneaker.",
    type: "brand",
    year: "2025"
  },
  {
    id: 5,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/green-forest-hiking-boot-on-natural-background-T41PNLzI60G2u6rFIRxeCbKT6RWKOH.jpg",
    alt: "Green hiking boot",
    title: "Hiking Boot",
    desc: "All-terrain hiking gear.",
    type: "brand",
    year: "2025"
  },
]

export function VerticalImageStack({ projects, onSelect }: VerticalImageStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastNavigationTime = useRef(0)
  const navigationCooldown = 400 // ms between navigations
  const containerRef = useRef<HTMLDivElement>(null)

  // Map incoming projects (if any) or fallback to default images
  const items = projects && projects.length > 0 
    ? projects.map((p, idx) => ({
        id: idx + 1,
        src: p.img,
        alt: p.title,
        title: p.title,
        desc: p.desc,
        type: p.type,
        year: p.year,
        rawProject: p
      }))
    : defaultImages.map(d => ({
        ...d,
        rawProject: {
          title: d.title,
          desc: d.desc,
          img: d.src,
          type: d.type,
          year: d.year
        }
      }));

  const navigate = useCallback((newDirection: number) => {
    const now = Date.now()
    if (now - lastNavigationTime.current < navigationCooldown) return
    lastNavigationTime.current = now

    setCurrentIndex((prev) => {
      if (newDirection > 0) {
        return prev === items.length - 1 ? 0 : prev + 1
      }
      return prev === 0 ? items.length - 1 : prev - 1
    })
  }, [items.length])

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    if (info.offset.y < -threshold) {
      navigate(1)
    } else if (info.offset.y > threshold) {
      navigate(-1)
    }
  }

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) {
          navigate(1)
        } else {
          navigate(-1)
        }
      }
    },
    [navigate],
  )

  const getCardStyle = (index: number) => {
    const total = items.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    if (diff === 0) {
      return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 }
    } else if (diff === -1) {
      return { y: -35, scale: 0.9, opacity: 0.65, zIndex: 4, rotateX: 6 }
    } else if (diff === -2) {
      return { y: -65, scale: 0.8, opacity: 0.35, zIndex: 3, rotateX: 12 }
    } else if (diff === 1) {
      return { y: 35, scale: 0.9, opacity: 0.65, zIndex: 4, rotateX: -6 }
    } else if (diff === 2) {
      return { y: 65, scale: 0.8, opacity: 0.35, zIndex: 3, rotateX: -12 }
    } else {
      return { y: diff > 0 ? 120 : -120, scale: 0.7, opacity: 0, zIndex: 0, rotateX: diff > 0 ? -18 : 18 }
    }
  }

  const isVisible = (index: number) => {
    const total = items.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return Math.abs(diff) <= 2
  }

  return (
    <div 
      ref={containerRef}
      onWheel={handleWheel}
      className="relative flex h-[320px] w-full items-center justify-center overflow-hidden"
    >
      {/* Card Stack */}
      <div className="relative flex h-[240px] w-[310px] items-center justify-center" style={{ perspective: "1000px" }}>
        {items.map((image, index) => {
          if (!isVisible(index)) return null
          const style = getCardStyle(index)
          const isCurrent = index === currentIndex

          return (
            <motion.div
              key={image.id}
              className="absolute cursor-grab active:cursor-grabbing"
              animate={{
                y: style.y,
                scale: style.scale,
                opacity: style.opacity,
                rotateX: style.rotateX,
                zIndex: style.zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1,
              }}
              drag={isCurrent ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.25}
              onDragEnd={handleDragEnd}
              onClick={() => {
                if (isCurrent && onSelect) {
                  onSelect(image.rawProject);
                }
              }}
              style={{
                transformStyle: "preserve-3d",
                zIndex: style.zIndex,
              }}
            >
              <div
                className="relative h-[180px] w-[280px] overflow-hidden rounded-2xl bg-card ring-1 ring-border/20"
                style={{
                  boxShadow: isCurrent
                    ? "0 20px 40px -10px rgba(124,109,250,0.3), 0 0 0 1px rgba(124,109,250,0.15)"
                    : "0 8px 24px -10px rgba(0,0,0,0.2)",
                }}
              >
                {/* Card inner glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 via-transparent to-transparent z-10 pointer-events-none" />

                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="object-cover w-full h-full pointer-events-none"
                  draggable={false}
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-1 pointer-events-none" />

                {/* Card content for identifying the project title on mobile */}
                <div className="absolute bottom-0 inset-x-0 p-4 text-left z-2 pointer-events-none">
                  <h4 className="text-sm font-semibold text-white truncate">{image.title}</h4>
                  <p className="text-[0.7rem] text-white/70 line-clamp-1 mt-0.5">{image.desc}</p>
                </div>

                {/* Tap Hint Overlay only on active card */}
                {isCurrent && (
                  <div className="absolute inset-0 bg-black/30 opacity-0 active:opacity-100 transition-opacity flex items-center justify-center z-12 pointer-events-none">
                    <span className="text-white text-xs font-semibold px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">Tap to View</span>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation dots - placed vertically on the right */}
      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-2 z-10">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index !== currentIndex) {
                setCurrentIndex(index)
              }
            }}
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? "h-4 bg-accent" : "bg-fg3/40 hover:bg-fg2/60"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

    </div>
  )
}
