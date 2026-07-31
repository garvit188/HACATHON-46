"use client";

import { useEffect, useRef, useState } from "react";

interface CarouselImage {
  src: string;
  alt?: string;
}

interface MagneticCarouselProps {
  images: CarouselImage[];
  collapsedWidth?: number;
  hoverWidth?: number;
  collapsedHeight?: number;
  hoverHeight?: number;
  openSize?: number;
  gap?: number;
  influence?: number;
  blur?: number;
}

export default function MagneticCarousel({
  images,
  collapsedWidth = 100,
  hoverWidth = 200,
  collapsedHeight = 340,
  hoverHeight = 400,
  openSize = 600,
  gap = 16,
  influence = 200,
  blur = 2,
}: MagneticCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [factors, setFactors] = useState<number[]>(() => images.map(() => 0));
  const [open, setOpen] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);

  const targetRef = useRef<number[]>(images.map(() => 0));
  const curRef = useRef<number[]>(images.map(() => 0));
  const loopRef = useRef(0);
  const closeTimer = useRef<any>(0);

  useEffect(() => {
    targetRef.current = images.map(() => 0);
    curRef.current = images.map(() => 0);
    setFactors(images.map(() => 0));
  }, [images.length]);

  useEffect(
    () => () => {
      cancelAnimationFrame(loopRef.current);
      clearTimeout(closeTimer.current);
    },
    []
  );

  const startLoop = () => {
    if (loopRef.current) return;
    const step = () => {
      const tgt = targetRef.current;
      const cur = curRef.current;
      let moving = false;
      for (let i = 0; i < cur.length; i++) {
        const d = (tgt[i] ?? 0) - cur[i];
        if (Math.abs(d) > 0.001) {
          cur[i] += d * 0.2;
          moving = true;
        } else {
          cur[i] = tgt[i] ?? 0;
        }
      }
      setFactors([...cur]);
      loopRef.current = moving ? requestAnimationFrame(step) : 0;
    };
    loopRef.current = requestAnimationFrame(step);
  };

  const setTargetFromCursor = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = clientX - rect.left;
    const n = images.length;
    const totalBase = n * collapsedWidth + (n - 1) * gap;
    const startX = (rect.width - totalBase) / 2;
    targetRef.current = images.map((_, i) => {
      const center =
        startX + i * (collapsedWidth + gap) + collapsedWidth / 2;
      const dist = Math.abs(cx - center);
      const f = Math.max(0, 1 - dist / influence);
      return f * f * (3 - 2 * f);
    });
    startLoop();
  };

  const onMove = (e: React.MouseEvent) => {
    if (open !== null) return;
    setTargetFromCursor(e.clientX);
  };

  const onLeave = () => {
    if (open !== null) return;
    targetRef.current = images.map(() => 0);
    startLoop();
  };

  const close = () => {
    targetRef.current = images.map(() => 0);
    curRef.current = images.map(() => 0);
    setFactors(images.map(() => 0));
    setClosing(true);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setClosing(false), 300);
    setOpen(null);
  };

  const sizeFor = (i: number) => {
    if (open !== null) {
      return i === open
        ? { width: openSize, height: openSize }
        : { width: collapsedWidth, height: collapsedHeight };
    }
    const f = factors[i] ?? 0;
    return {
      width: collapsedWidth + (hoverWidth - collapsedWidth) * f,
      height: collapsedHeight + (hoverHeight - collapsedHeight) * f,
    };
  };

  const barTransition =
    open !== null || closing
      ? "width 0.3s ease-in-out, height 0.3s ease-in-out, filter 0.3s ease-in-out, opacity 0.3s ease-in-out"
      : "none";

  return (
    <div
      ref={containerRef}
      className="w-full flex items-center justify-center relative"
      style={{ gap, overflow: "visible" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          pointerEvents: open !== null ? "auto" : "none",
        }}
        onClick={close}
      />
      {images.map((img, i) => {
        const { width, height } = sizeFor(i);
        const blurred = open !== null && i !== open;
        return (
          <div
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              if (open === i) close();
              else setOpen(i);
            }}
            style={{
              flex: "none",
              width,
              height,
              overflow: "hidden",
              cursor: "pointer",
              transition: barTransition,
              willChange: "width, height",
              position: "relative",
              zIndex: open === i ? 3 : 2,
              filter: blurred ? `blur(${blur}px)` : "none",
              opacity: blurred ? 0.6 : 1,
              borderRadius: "12px",
            }}
          >
            <img
              src={img.src}
              alt={img.alt || `Gallery ${i + 1}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        );
      })}
    </div>
  );
}
