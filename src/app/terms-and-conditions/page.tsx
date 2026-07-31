"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AnimateOnScroll from "@/components/animations/AnimateOnScroll";

export default function TermsAndConditions() {
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
            Terms &amp; Conditions
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
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                By accessing and using the PIET Sanskriti School Portal (&quot;Service&quot;), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the Service.
              </p>
            </section>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={100}>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3">
                2. Eligibility
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                The Service is available only to authorized users of PIET Sanskriti School, including currently enrolled students, employed teachers, and designated administrators. Registration is required to access certain features of the portal.
              </p>
            </section>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={200}>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3">
                3. User Accounts
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-3">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party.
              </p>
            </section>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={300}>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3">
                4. Acceptable Use
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-3">
                You agree to use the Service only for its intended purposes. You shall not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm sm:text-base">
                <li>Use the Service for any unlawful purpose or to solicit the performance of any illegal activity</li>
                <li>Attempt to gain unauthorized access to any portion of the Service</li>
                <li>Interfere with or disrupt the Service or servers connected to the Service</li>
                <li>Upload or transmit viruses, malware, or any harmful code</li>
                <li>Post inappropriate, offensive, or misleading content</li>
                <li>Impersonate another user or person</li>
                <li>Use the Service to harass, abuse, or harm another person</li>
              </ul>
            </section>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={400}>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3">
                5. Content Ownership
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Users retain ownership of the content they post on the Service. However, by posting content, you grant PIET Sanskriti School a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such content for educational and promotional purposes.
              </p>
            </section>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={500}>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3">
                6. Intellectual Property
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                The Service and its original content, features, and functionality are owned by PIET Sanskriti School and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
            </section>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={600}>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3">
                7. Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                In no event shall PIET Sanskriti School, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>
            </section>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={700}>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3">
                8. Termination
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will cease immediately.
              </p>
            </section>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={800}>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3">
                9. Governing Law
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                These Terms shall be governed by and defined following the laws of India. PIET Sanskriti School and yourself irrevocably consent that the courts of Panipat, Haryana shall have exclusive jurisdiction to resolve any dispute arising from these Terms.
              </p>
            </section>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={900}>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3">
                10. Changes to Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={1000}>
            <section>
              <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3">
                11. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                If you have any questions about these Terms, please contact us:
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
