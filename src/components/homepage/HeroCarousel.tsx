"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IMAGES, SCHOOL_INFO, APP_INFO } from "@/lib/constants";

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [textKey, setTextKey] = useState(0);
  const images = IMAGES.hero;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
    setTextKey((k) => k + 1);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
    setTextKey((k) => k + 1);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[50vh] sm:h-[55vh] md:h-[65vh] lg:h-[80vh] overflow-hidden">
      {images.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <img
            src={src}
            alt={`PIET Sanskriti - ${SCHOOL_INFO.tagline}`}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 gradient-overlay" />
        </div>
      ))}

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl" key={textKey}>
            <p
              className="text-white/80 text-xs sm:text-sm uppercase tracking-[0.2em] mb-3 sm:mb-4 transition-all"
              style={{
                animation: "heroSlideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both",
              }}
            >
              {SCHOOL_INFO.affiliation} Affiliated · Est. {SCHOOL_INFO.inception}
            </p>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight font-[family-name:var(--font-playfair)]"
              style={{
                animation: "heroSlideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both",
              }}
            >
              {APP_INFO.tagline}
            </h1>
            <p
              className="mt-4 sm:mt-6 text-white/80 text-sm sm:text-base lg:text-lg max-w-lg transition-all"
              style={{
                animation: "heroSlideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both",
              }}
            >
              {APP_INFO.description.slice(0, 140)}...
            </p>
            <div
              className="mt-6 sm:mt-8 flex flex-wrap gap-3"
              style={{
                animation: "heroSlideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.6s both",
              }}
            >
              <a
                href="#about"
                className="inline-flex items-center px-5 sm:px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 text-sm sm:text-base hover:scale-105 active:scale-95 hover:shadow-lg"
              >
                Explore More
              </a>
              <a
                href="#events"
                className="inline-flex items-center px-5 sm:px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 text-sm sm:text-base hover:scale-105 active:scale-95"
              >
                News & Events
              </a>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 active:scale-90"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 active:scale-90"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setTextKey((k) => k + 1); }}
            className={`rounded-full transition-all duration-500 ease-out ${
              i === current ? "bg-white w-8 h-3" : "bg-white/40 w-3 h-3 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes heroSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
