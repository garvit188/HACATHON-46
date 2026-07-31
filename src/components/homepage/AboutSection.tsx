"use client";
import { IMAGES, SCHOOL_INFO } from "@/lib/constants";
import AnimateOnScroll from "@/components/animations/AnimateOnScroll";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={IMAGES.aboutBg}
          alt=""
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 gradient-overlay-dark" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <AnimateOnScroll animation="fade-right" duration={800}>
            <div className="text-white">
              <p className="text-white/60 text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                About
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-playfair)] leading-tight">
                PIET Sanskriti School
              </h2>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-left" duration={800} delay={200}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/10">
              <h3 className="text-lg sm:text-xl font-bold text-white uppercase mb-4 tracking-wide">
                Grow Responsibly
              </h3>
              <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                {SCHOOL_INFO.about}
              </p>
              <a
                href="https://pietsanskriti.com/about-us/know-us/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-6 px-5 sm:px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 text-sm hover:scale-105 active:scale-95"
              >
                Learn More
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
