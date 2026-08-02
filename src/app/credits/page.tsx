"use client";

import Link from "next/link";
import { ArrowLeft, Heart, Code, GraduationCap, Shield, TestTube } from "lucide-react";
import AnimateOnScroll from "@/components/animations/AnimateOnScroll";

const team = [
  {
    name: "Garvit Gupta",
    role: "Lead Developer & Designer",
    classInfo: "Class 8-D, PIET Sanskriti School",
    description:
      "Single-handedly built the entire PIET Sanskriti School Portal from scratch. Designed and coded every page, every component, every feature — from the brand homepage to the student dashboard, teacher panel, and admin panel. Handled all frontend development, backend integration, database design, authentication, image management, and deployment.",
    contributions: [
      "Complete frontend development with Next.js & Tailwind CSS",
      "Supabase authentication, RLS policies & database schema design",
      "Cloudinary image upload with video support & compression",
      "Admin dashboard with full content management (announcements, events, gallery)",
      "Student & teacher dashboard with Instagram-style feed",
      "Responsive mobile-first design with bottom tab navigation",
      "Hero carousel, gallery, testimonials with animations",
      "Privacy Policy, Terms & Conditions & Credits pages",
      "Vercel deployment & production setup",
    ],
    icon: Code,
  },
  {
    name: "Namish Saroha",
    role: "Product Ideation & QA Lead",
    classInfo: "Class 8-D, PIET Sanskriti School",
    description:
      "Served as a key advisor and quality tester throughout the development process. Provided valuable feedback on features, identified bugs, tested all pages and workflows, and helped ensure the final product meets the needs of students, teachers, and the school administration.",
    contributions: [
      "End-to-end testing of all pages and features",
      "Bug identification and feedback for fixes",
      "UI/UX suggestions and improvement ideas",
      "Feature validation — ensuring admin, teacher & student flows work correctly",
      "Mobile responsiveness testing",
      "Content review and accuracy checks",
    ],
    icon: TestTube,
  },
];

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-primary via-primary to-primary/80 py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <AnimateOnScroll animation="fade-up" duration={600}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-white/50 text-xs uppercase tracking-[0.3em]">Credits</span>
              <div className="h-px w-12 bg-white/20" />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" duration={700} delay={100}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-playfair)] leading-tight">
              Built with{" "}
              <span className="inline-flex items-center gap-2">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-red-400 fill-red-400 animate-pulse" />
              </span>
              <br />
              by the Team
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" duration={700} delay={200}>
            <p className="mt-6 text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              PIET Sanskriti School Portal — a full-stack web application built by students of
              PIET Sanskriti School, Class 8-D, as part of the school&apos;s digital initiative.
            </p>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <AnimateOnScroll animation="fade-up" duration={600}>
          <div className="text-center mb-16">
            <p className="text-primary text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
              The Team
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-playfair)]">
              Meet the Builders
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="space-y-12">
          {team.map((member, i) => (
            <AnimateOnScroll
              key={member.name}
              animation="fade-up"
              duration={700}
              delay={i * 200}
            >
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-primary to-primary/80 p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                      <member.icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-playfair)]">
                        {member.name}
                      </h3>
                      <p className="text-white/80 text-sm mt-1 font-medium">{member.role}</p>
                      <p className="text-white/50 text-xs mt-0.5">{member.classInfo}</p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8">
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6">
                    {member.description}
                  </p>

                  <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                    {i === 0 ? (
                      <Code className="w-4 h-4 text-primary" />
                    ) : (
                      <Shield className="w-4 h-4 text-primary" />
                    )}
                    Key Contributions
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {member.contributions.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-surface py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fade-up" duration={600}>
            <div className="text-center mb-12">
              <p className="text-primary text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Technology
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-playfair)]">
                Tech Stack
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: "Next.js", desc: "React Framework" },
              { name: "Tailwind CSS", desc: "Styling" },
              { name: "shadcn/ui", desc: "UI Components" },
              { name: "Supabase", desc: "Auth & Database" },
              { name: "Cloudinary", desc: "Image CDN" },
              { name: "Vercel", desc: "Hosting" },
              { name: "Framer Motion", desc: "Animations" },
              { name: "Lucide React", desc: "Icons" },
            ].map((tech, i) => (
              <AnimateOnScroll
                key={tech.name}
                animation="scale-up"
                duration={500}
                delay={i * 80}
              >
                <div className="bg-white rounded-2xl p-5 border border-gray-100 text-center hover:border-primary/20 hover:shadow-md transition-all duration-300 group">
                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {tech.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{tech.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* School Info */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <AnimateOnScroll animation="fade-up" duration={700}>
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-playfair)] mb-4">
                PIET Sanskriti School
              </h2>
              <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-2">
                Behind Mittal Mega Mall, Sector-25 HUDA, Panipat-132103, Haryana
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/50">
                <span>CBSE Affiliated</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>Est. 2011</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>Phone: 9992101166</span>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> by{" "}
            <span className="font-semibold text-foreground">Garvit Gupta</span> &{" "}
            <span className="font-semibold text-foreground">Namish Saroha</span>
            <span className="text-xs text-muted-foreground ml-2">(Class 8-D)</span>
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
