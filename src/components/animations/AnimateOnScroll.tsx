"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale-up"
  | "scale-down"
  | "rotate-in"
  | "blur-in"
  | "flip-up"
  | "slide-up-bounce";

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

const animationStyles: Record<AnimationType, { initial: string; animate: string }> = {
  "fade-up": {
    initial: "opacity-0 translate-y-12",
    animate: "opacity-100 translate-y-0",
  },
  "fade-down": {
    initial: "opacity-0 -translate-y-12",
    animate: "opacity-100 translate-y-0",
  },
  "fade-left": {
    initial: "opacity-0 translate-x-12",
    animate: "opacity-100 translate-x-0",
  },
  "fade-right": {
    initial: "opacity-0 -translate-x-12",
    animate: "opacity-100 translate-x-0",
  },
  "scale-up": {
    initial: "opacity-0 scale-90",
    animate: "opacity-100 scale-100",
  },
  "scale-down": {
    initial: "opacity-0 scale-110",
    animate: "opacity-100 scale-100",
  },
  "rotate-in": {
    initial: "opacity-0 -rotate-6 scale-95",
    animate: "opacity-100 rotate-0 scale-100",
  },
  "blur-in": {
    initial: "opacity-0 blur-md",
    animate: "opacity-100 blur-0",
  },
  "flip-up": {
    initial: "opacity-0 [transform:perspective(800px)_rotateX(45deg)]",
    animate: "opacity-100 [transform:perspective(800px)_rotateX(0deg)]",
  },
  "slide-up-bounce": {
    initial: "opacity-0 translate-y-16",
    animate: "opacity-100 translate-y-0",
  },
};

export default function AnimateOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  className,
  threshold = 0.15,
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const styles = animationStyles[animation];

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all",
        isVisible ? styles.animate : styles.initial,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
}
