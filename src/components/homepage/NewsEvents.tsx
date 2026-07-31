"use client";
import { IMAGES } from "@/lib/constants";
import AnimateOnScroll from "@/components/animations/AnimateOnScroll";

const gradients = [
  "linear-gradient(135deg, #1a3a4a 0%, #2d5a6a 100%)",
  "linear-gradient(135deg, #c97b4a 0%, #d4956a 100%)",
  "linear-gradient(135deg, #2d5a6a 0%, #1a3a4a 100%)",
  "linear-gradient(135deg, #1a4a3a 0%, #2d6a5a 100%)",
  "linear-gradient(135deg, #3a2a1a 0%, #5a4a3a 100%)",
  "linear-gradient(135deg, #2a1a3a 0%, #4a3a5a 100%)",
];

export default function NewsEvents() {
  const events = IMAGES.events;

  return (
    <section id="events" className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="fade-up" duration={600}>
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-primary text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
              Latest
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-playfair)]">
              News & Events
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {events.map((event, i) => (
            <AnimateOnScroll key={i} animation="fade-up" delay={i * 100} duration={600}>
              <a
                href="https://pietsanskriti.com/news-events/"
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="img-zoom aspect-[4/3] relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector(".fallback-bg")) {
                        const fallback = document.createElement("div");
                        fallback.className = "fallback-bg absolute inset-0 flex items-center justify-center";
                        fallback.style.background = gradients[i % gradients.length];
                        fallback.innerHTML = `
                          <div class="text-center text-white/60 p-4">
                            <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                            </svg>
                            <p class="text-sm font-medium line-clamp-2">${event.title}</p>
                          </div>
                        `;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-semibold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors leading-snug">
                    {event.title}
                  </h3>
                  <span className="inline-block mt-3 text-xs sm:text-sm text-primary font-medium group-hover:translate-x-1 transition-transform duration-300">
                    Read More →
                  </span>
                </div>
              </a>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
