"use client";
import ThumbnailCarousel from "@/components/ThumbnailCarousel";
import AnimateOnScroll from "@/components/animations/AnimateOnScroll";

export default function GallerySection() {
  return (
    <section id="gallery" className="py-20 lg:py-28 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="fade-up" duration={600}>
          <div className="text-center mb-12">
            <p className="text-primary text-sm uppercase tracking-[0.2em] mb-3">
              Gallery
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-playfair)]">
              School Glimpses
            </h2>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="scale-up" duration={800} delay={200}>
          <ThumbnailCarousel />
        </AnimateOnScroll>
      </div>
    </section>
  );
}
