"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Home, Info, Calendar, Image, Phone, GraduationCap } from "lucide-react";
import { IMAGES, NAV_LINKS, SCHOOL_INFO } from "@/lib/constants";
import { animate } from "framer-motion";

const mobileNavItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: Info },
  { label: "Events", href: "#events", icon: Calendar },
  { label: "Gallery", href: "#gallery", icon: Image },
  { label: "Contact", href: "#contact", icon: Phone },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverX, setHoverX] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["#home", "#about", "#events", "#gallery", "#contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.querySelector(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveIndex(i);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Spotlight mouse tracking
  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setHoverX(x);
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };

    const handleMouseLeave = () => {
      setHoverX(null);
      const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
      if (activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const targetX = itemRect.left - navRect.left + itemRect.width / 2;
        animate(spotlightX.current, targetX, {
          type: "spring",
          stiffness: 200,
          damping: 20,
          onUpdate: (v) => {
            spotlightX.current = v;
            nav.style.setProperty("--spotlight-x", `${v}px`);
          },
        });
      }
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeIndex]);

  // Active item ambience
  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;
    const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
    if (activeItem) {
      const navRect = nav.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const targetX = itemRect.left - navRect.left + itemRect.width / 2;
      animate(ambienceX.current, targetX, {
        type: "spring",
        stiffness: 200,
        damping: 20,
        onUpdate: (v) => {
          ambienceX.current = v;
          nav.style.setProperty("--ambience-x", `${v}px`);
        },
      });
    }
  }, [activeIndex]);

  const handleNavClick = (href: string, idx: number) => {
    setActiveIndex(idx);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Header */}
      <header
        className={`hidden lg:block sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
            : "bg-white/70 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <img src={IMAGES.logo} alt="PIET Sanskriti School Logo" className="h-9 w-auto" />
              <div>
                <h1 className="text-sm font-bold text-primary leading-tight font-[family-name:var(--font-playfair)]">
                  {SCHOOL_INFO.name}
                </h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {SCHOOL_INFO.affiliation} · {SCHOOL_INFO.affiliationNo}
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-6">
              <div
                ref={navRef}
                className="relative h-10 rounded-full overflow-hidden"
                style={{ background: "rgba(0,0,0,0.03)" }}
              >
                <ul className="relative flex items-center h-full px-1.5 gap-0 z-[10]">
                  {NAV_LINKS.map((link, idx) => (
                    <li key={idx} className="relative h-full flex items-center">
                      <a
                        href={link.href}
                        data-index={idx}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(link.href, idx);
                        }}
                        className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full relative z-[5] ${
                          activeIndex === idx
                            ? "text-gray-900"
                            : "text-gray-400 hover:text-gray-700"
                        }`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div
                  className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-[1] transition-opacity duration-300"
                  style={{
                    opacity: hoverX !== null ? 1 : 0,
                    background: `radial-gradient(100px circle at var(--spotlight-x) 100%, rgba(0,0,0,0.06) 0%, transparent 50%)`,
                  }}
                />
                <div
                  className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px] z-[2]"
                  style={{
                    background: `radial-gradient(50px circle at var(--ambience-x) 0%, rgba(0,0,0,0.8) 0%, transparent 100%)`,
                  }}
                />
              </div>

              <Link
                href="/login"
                className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-300 active:scale-95"
              >
                <GraduationCap className="w-4 h-4" />
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header
        className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
            : "bg-white/80 backdrop-blur-md"
        }`}
      >
        <div className="px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src={IMAGES.logo} alt="PIET" className="h-8 w-auto" />
            <span className="text-sm font-bold text-primary font-[family-name:var(--font-playfair)]">
              PIET Sanskriti
            </span>
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-1.5 bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-medium active:scale-95 transition-transform"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Login
          </Link>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-2xl border-t border-gray-200 safe-area-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          {mobileNavItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeIndex === idx;
            return (
              <a
                key={idx}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href, idx);
                }}
                className="flex flex-col items-center justify-center gap-0.5 w-16 h-full relative"
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-gray-900 text-white scale-110 shadow-lg shadow-gray-900/20"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span
                  className={`text-[10px] font-medium transition-colors duration-300 ${
                    isActive ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Spacer for mobile bottom bar */}
      <div className="lg:hidden h-16" />
    </>
  );
}
