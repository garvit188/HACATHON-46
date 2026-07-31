"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AnimateOnScroll from "@/components/animations/AnimateOnScroll";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-playfair)]">
            Privacy Policy
          </h1>
          <p className="text-white/50 mt-3 text-sm">Last updated: July 31, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="prose prose-lg max-w-none space-y-8">
          <AnimateOnScroll animation="fade-up" delay={0}>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3">
                1. Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Welcome to PIET Sanskriti School Portal (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our student and teacher portal, located at piet-sanskriti-portal (the &quot;Service&quot;).
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mt-2">
                PIET Sanskriti School is committed to protecting your privacy. This Privacy Policy applies to all users of the Service, including students, teachers, administrators, and visitors.
              </p>
            </section>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={100}>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3">
                2. Information We Collect
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-3">
                We may collect information about you in various ways, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm sm:text-base">
                <li><strong>Personal Data:</strong> Name, email address, and other contact information provided during registration.</li>
                <li><strong>Usage Data:</strong> Information on how the Service is accessed and used, including pages visited, time spent, and interaction patterns.</li>
                <li><strong>Academic Data:</strong> Grades, assignments, attendance, and other academic records maintained within the portal.</li>
                <li><strong>Content Data:</strong> Posts, announcements, images, lost &amp; found items, and classroom problem reports submitted by users.</li>
              </ul>
            </section>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={200}>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3">
                3. How We Use Your Information
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-3">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm sm:text-base">
                <li>To provide and maintain the Service</li>
                <li>To notify you about changes to the Service</li>
                <li>To allow you to participate in interactive features</li>
                <li>To provide academic tracking and reporting</li>
                <li>To manage announcements, events, and gallery content</li>
                <li>To provide customer support</li>
                <li>To gather analysis so that we can improve the Service</li>
                <li>To monitor the usage of the Service</li>
                <li>To detect, prevent, and address technical issues</li>
              </ul>
            </section>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={300}>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3">
                4. Data Security
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                The security of your data is important to us. We strive to use commercially acceptable means of protecting your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </section>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={400}>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3">
                5. Data Retention
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.
              </p>
            </section>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={500}>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3">
                6. Third-Party Services
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                The Service uses third-party services that collect information used to identify you. These third-party service providers have their own privacy policies addressing how they use such information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm sm:text-base mt-3">
                <li><strong>Supabase</strong> — Authentication and database services</li>
                <li><strong>Cloudinary</strong> — Image hosting and optimization</li>
                <li><strong>Vercel</strong> — Hosting and deployment platform</li>
              </ul>
            </section>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={600}>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3">
                7. Children&apos;s Privacy
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                The Service is intended for use by students of PIET Sanskriti School under the supervision of their parents or guardians. We do not knowingly collect personal information from children under 13 without parental consent. If we discover that a child under 13 has provided us with personal information, we will immediately delete this from our servers.
              </p>
            </section>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={700}>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3">
                8. Changes to This Privacy Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={800}>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3">
                9. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm sm:text-base mt-3">
                <li suppressHydrationWarning>By email: pietsanskriti@piet.co.in</li>
                <li suppressHydrationWarning>By phone: 9992101166, 9069645000</li>
                <li suppressHydrationWarning>Toll Free: 1800-572-5884</li>
                <li suppressHydrationWarning>Visit: Behind Mittal Mega Mall, Sector-25 HUDA, Panipat-132103, Haryana</li>
              </ul>
            </section>
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  );
}
