"use client";
import { SCHOOL_INFO } from "@/lib/constants";
import { Quote } from "lucide-react";
import AnimateOnScroll from "@/components/animations/AnimateOnScroll";

export default function PrincipalSection() {
  return (
    <section className="py-16 lg:py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <AnimateOnScroll animation="fade-right" duration={800}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-[400px] group">
              <img
                src="/images/principal.jpg"
                alt="Principal - PIET Sanskriti School"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = document.createElement("div");
                    fallback.className = "absolute inset-0 flex items-center justify-center";
                    fallback.style.background = "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)";
                    fallback.innerHTML = `
                      <div class="text-center text-white/40">
                        <svg class="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        <p class="text-sm font-medium">Principal</p>
                        <p class="text-xs mt-1">PIET Sanskriti School</p>
                      </div>
                    `;
                    parent.appendChild(fallback);
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-left" duration={800} delay={200}>
            <div className="text-white">
              <p className="text-white/60 text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                From The Principal
              </p>
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-white/30 mb-4 animate-pulse" />
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-[family-name:var(--font-playfair)] leading-relaxed">
                &ldquo;{SCHOOL_INFO.principalQuote}&rdquo;
              </blockquote>
              <a
                href="https://pietsanskriti.com/about-us/principal-message/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-6 px-5 sm:px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 text-sm hover:scale-105 active:scale-95"
              >
                Read More
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
