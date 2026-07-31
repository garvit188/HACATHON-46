"use client";
import { useRef } from "react";
import { IMAGES } from "@/lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimateOnScroll from "@/components/animations/AnimateOnScroll";

export default function ExploreGrid() {
  const items = IMAGES.infrastructure;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = dir === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section id="explore" className="py-16 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <AnimateOnScroll animation="fade-right" duration={600}>
            <div>
              <p className="text-primary text-xs sm:text-sm uppercase tracking-[0.2em] mb-2">
                Facilities
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-playfair)]">
                Explore Our Campus
              </h2>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-left" duration={600} delay={200}>
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Horizontal Scroll Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 sm:px-6 lg:px-[calc((100vw-1280px)/2+2rem)] pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, i) => (
          <AnimateOnScroll key={i} animation="scale-up" delay={i * 120} duration={700}>
            <a
              href="https://pietsanskriti.com/infrastructure/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-shrink-0 w-[260px] sm:w-[300px] lg:w-[340px] aspect-[3/4] rounded-2xl overflow-hidden snap-start block"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    const gradient = document.createElement("div");
                    gradient.className = "absolute inset-0";
                    gradient.style.background = [
                      "linear-gradient(135deg, #1a3a4a 0%, #2d5a6a 50%, #1a3a4a 100%)",
                      "linear-gradient(135deg, #c97b4a 0%, #d4956a 50%, #c97b4a 100%)",
                      "linear-gradient(135deg, #2d5a6a 0%, #1a3a4a 50%, #3d6a7a 100%)",
                      "linear-gradient(135deg, #1a4a3a 0%, #2d6a5a 50%, #1a4a3a 100%)",
                      "linear-gradient(135deg, #3a2a1a 0%, #5a4a3a 50%, #3a2a1a 100%)",
                    ][i % 5];
                    parent.insertBefore(gradient, target);
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <h3 className="text-white font-bold text-base sm:text-lg font-[family-name:var(--font-playfair)]">
                  {item.title}
                </h3>
                <p className="text-white/60 text-xs mt-1 group-hover:text-white/80 transition-colors group-hover:translate-x-1 transition-transform duration-300">
                  Tap to explore →
                </p>
              </div>
            </a>
          </AnimateOnScroll>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
