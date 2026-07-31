"use client";
import { SCHOOL_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { MapPin, Phone, Mail, Globe, Camera, Play, MessageCircle } from "lucide-react";
import AnimateOnScroll from "@/components/animations/AnimateOnScroll";

export default function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-white" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          <AnimateOnScroll animation="fade-up" delay={0}>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-playfair)] mb-4">
                {SCHOOL_INFO.name}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {SCHOOL_INFO.tagline}
              </p>
              <p className="text-white/60 text-sm mt-2">
                CBSE Affiliation No. {SCHOOL_INFO.affiliationNo}
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={100}>
            <div>
              <h4 className="font-semibold mb-4 uppercase text-xs sm:text-sm tracking-wider text-white/70">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#about" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">About Us</a></li>
                <li><a href="#events" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">News & Events</a></li>
                <li><a href="#explore" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">Infrastructure</a></li>
                <li><a href="#gallery" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">Gallery</a></li>
                <li><a href="/login" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">Student Portal</a></li>
              </ul>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={200}>
            <div>
              <h4 className="font-semibold mb-4 uppercase text-xs sm:text-sm tracking-wider text-white/70">
                Contact Us
              </h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex items-start gap-2 group">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 group-hover:text-primary transition-colors" />
                  <span>{SCHOOL_INFO.address}</span>
                </li>
                <li className="flex items-center gap-2 group">
                  <Phone className="w-4 h-4 shrink-0 group-hover:text-primary transition-colors" />
                  <span suppressHydrationWarning>{SCHOOL_INFO.phone.join(", ")}</span>
                </li>
                <li className="flex items-center gap-2 group">
                  <Mail className="w-4 h-4 shrink-0 group-hover:text-primary transition-colors" />
                  <span>{SCHOOL_INFO.email}</span>
                </li>
              </ul>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={300}>
            <div>
              <h4 className="font-semibold mb-4 uppercase text-xs sm:text-sm tracking-wider text-white/70">
                Follow Us
              </h4>
              <div className="flex gap-3">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                  <Globe className="w-5 h-5" />
                </a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                  <Camera className="w-5 h-5" />
                </a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                  <Play className="w-5 h-5" />
                </a>
                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      <div className="border-t border-white/10 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col items-center gap-3 text-xs sm:text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} {SCHOOL_INFO.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-center">
            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <a href="/terms-and-conditions" className="hover:text-white transition-colors">Terms</a>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <a href="/credits" className="hover:text-white transition-colors">Credits</a>
          </div>
          <p suppressHydrationWarning>Toll Free: 1800-572-5884</p>
        </div>
      </div>
    </footer>
  );
}
