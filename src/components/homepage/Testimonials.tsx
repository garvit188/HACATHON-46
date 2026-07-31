"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "As a parent I am very satisfied with PIET Sanskrit school as everyday my child is looking forward to going back to School. She very much enjoys her time in school and is learning new things each and every day.",
    by: "Shilpa Arora, Mother of Nayra Arora",
    imgSrc: "/images/testimonial-3.jpg",
  },
  {
    tempId: 1,
    testimonial: "Piet is very Good school and provides us best facility and Good education. My daughter is studying here. I am quite satisfied as all the teachers are hard working and cooperative.",
    by: "Pooja Jain, Mother of Seeyal Jain",
    imgSrc: "/images/testimonial-2.jpg",
  },
  {
    tempId: 2,
    testimonial: "As parents we are glad to see that our child has progressed. You all are nurturing and loving while providing the structure and guidance our child needs. Thank you for the efforts you put in children.",
    by: "Syed Danish Ali, Parents of Mariam Ali",
    imgSrc: "/images/testimonial-1.jpg",
  },
  {
    tempId: 3,
    testimonial: "I am a happy parent as my kid enjoys the class and is very much influenced by the interactive way of her teaching. The output is beyond satisfactory with amazing guidance.",
    by: "Mother of Yuvaan Arora, Pre-Nur Rose",
    imgSrc: "/images/testimonial-5.jpg",
  },
  {
    tempId: 4,
    testimonial: "During the pandemic, we faced lots of problems with our previous school. We shifted our child to PIET Sanskriti School. It turned out to be a wise decision. The fee structure was very lenient.",
    by: "Khushbu Garg, Parent",
    imgSrc: "/images/testimonial-4.jpg",
  },
  {
    tempId: 5,
    testimonial: "As a parent I am very satisfied with PIET Sanskrit school. She participates in a variety of activities and events and enjoy both her teachers and classmates company.",
    by: "Shilpa Arora, Mother of Nayra Arora",
    imgSrc: "/images/testimonial-3.jpg",
  },
  {
    tempId: 6,
    testimonial: "PIET is very Good school and provides us best facility and Good education. All the teachers are hard working and cooperative. Thank you Mam for everything.",
    by: "Pooja Jain, Mother of Seeyal Jain",
    imgSrc: "/images/testimonial-2.jpg",
  },
  {
    tempId: 7,
    testimonial: "We are so happy with your hardwork and the progress of our child. Keep it up, May God bless you all. Thanks again.",
    by: "Syed Danish Ali, Parents of Mariam Ali",
    imgSrc: "/images/testimonial-1.jpg",
  },
  {
    tempId: 8,
    testimonial: "My kid enjoys the class and is very much influenced by the interactive way of her teaching. The School has put its best in this pandemic.",
    by: "Mother of Yuvaan Arora, Pre-Nur Rose",
    imgSrc: "/images/testimonial-5.jpg",
  },
  {
    tempId: 9,
    testimonial: "It turned out to be a wise decision. The fee structure was very lenient as compared to other educational institutions. I can now say that it is the best school in Panipat.",
    by: "Khushbu Garg, Parent",
    imgSrc: "/images/testimonial-4.jpg",
  },
  {
    tempId: 10,
    testimonial: "Everyday my child is looking forward to going back to School. She participates in a variety of activities and events and enjoy both her teachers and classmates company.",
    by: "Shilpa Arora, Mother of Nayra Arora",
    imgSrc: "/images/testimonial-3.jpg",
  },
  {
    tempId: 11,
    testimonial: "My daughter is studying here. I am quite satisfied as all the teachers are hard working and cooperative.",
    by: "Pooja Jain, Mother of Seeyal Jain",
    imgSrc: "/images/testimonial-2.jpg",
  },
  {
    tempId: 12,
    testimonial: "You all are nurturing and loving while providing the structure and guidance our child needs. Thank you for the efforts you put in children.",
    by: "Syed Danish Ali, Parents of Mariam Ali",
    imgSrc: "/images/testimonial-1.jpg",
  },
  {
    tempId: 13,
    testimonial: "I am a happy parent as my kid enjoys the class. The output is beyond satisfactory with amazing guidance of Miss Vaishali.",
    by: "Mother of Yuvaan Arora, Pre-Nur Rose",
    imgSrc: "/images/testimonial-5.jpg",
  },
  {
    tempId: 14,
    testimonial: "We shifted our child to PIET Sanskriti School. It turned out to be a wise decision. PIET was very flexible.",
    by: "Khushbu Garg, Parent",
    imgSrc: "/images/testimonial-4.jpg",
  },
  {
    tempId: 15,
    testimonial: "PIET Sanskrit school as everyday my child is looking forward to going back to School. She very much enjoys her time in school.",
    by: "Shilpa Arora, Mother of Nayra Arora",
    imgSrc: "/images/testimonial-3.jpg",
  },
  {
    tempId: 16,
    testimonial: "PIET is very Good school and provides us best facility and Good education. Thank you Mam for everything.",
    by: "Pooja Jain, Mother of Seeyal Jain",
    imgSrc: "/images/testimonial-2.jpg",
  },
  {
    tempId: 17,
    testimonial: "As parents we are glad to see that our child has progressed. Keep it up, May God bless you all.",
    by: "Syed Danish Ali, Parents of Mariam Ali",
    imgSrc: "/images/testimonial-1.jpg",
  },
  {
    tempId: 18,
    testimonial: "My kid enjoys the class and is very much influenced by the interactive way of her teaching. The School has put its best.",
    by: "Mother of Yuvaan Arora, Pre-Nur Rose",
    imgSrc: "/images/testimonial-5.jpg",
  },
  {
    tempId: 19,
    testimonial: "The fee structure was very lenient as compared to other educational institutions. It is the best school in Panipat for our children.",
    by: "Khushbu Garg, Parent",
    imgSrc: "/images/testimonial-4.jpg",
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: (typeof testimonials)[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 sm:p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 border-primary text-primary-foreground"
          : "z-0 border-border bg-white hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        background: isCenter ? "var(--primary)" : "white",
        clipPath:
          "polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)",
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px var(--border-color)"
          : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
          background: "var(--border-color)",
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by.split(",")[0]}
        className="mb-4 h-14 w-12 object-cover object-top"
        style={{
          background: "var(--muted)",
          boxShadow: "3px 3px 0px var(--background)",
        }}
      />
      <h3
        className={cn(
          "text-sm sm:text-lg font-medium leading-snug",
          isCenter ? "text-primary-foreground" : "text-foreground"
        )}
      >
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>
      <p
        className={cn(
          "absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 mt-2 text-xs sm:text-sm italic",
          isCenter ? "text-primary-foreground/70" : "text-muted-foreground"
        )}
      >
        &mdash; {testimonial.by}
      </p>
    </div>
  );
};

export default function Testimonials() {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (!mounted) {
    return (
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-primary text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
              Testimonials
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-playfair)]">
              What Parents Say
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-primary text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
            Testimonials
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-playfair)]">
            What Parents Say
          </h2>
        </div>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{ height: 600, background: "var(--muted)" }}
      >
        {testimonialsList.map((testimonial, index) => {
          const position = testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
          return (
            <TestimonialCard
              key={testimonial.tempId}
              testimonial={testimonial}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
            />
          );
        })}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
          <button
            onClick={() => handleMove(-1)}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300",
              "bg-white border-2 border-border hover:bg-primary hover:text-primary-foreground hover:border-primary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleMove(1)}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300",
              "bg-white border-2 border-border hover:bg-primary hover:text-primary-foreground hover:border-primary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
