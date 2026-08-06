import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms governing use of ${site.url} and engagement of services from ${site.name}.`,
  alternates: { canonical: `${site.url}/terms` },
};

export default function TermsPage() {
  return (
    <main className="relative min-h-screen py-16 sm:py-24">
      <div className="container max-w-3xl">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Terms of Use</h1>
        <p className="mt-2 text-sm text-muted">Last updated: August 2026</p>

        <div className="prose prose-invert mt-8 max-w-none space-y-6 text-sm leading-relaxed text-muted [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-white [&_p]:mt-2">
          <p>
            These terms cover your use of {site.url} (the &quot;Site&quot;), operated by {site.name}. By
            browsing the Site, you agree to them. They don&apos;t constitute a service contract —
            actual client work is agreed separately, directly with you, before any project starts.
          </p>

          <div>
            <h2>Site content</h2>
            <p>
              Content on this Site — including the portfolio case studies, written copy, and
              images — belongs to {site.name} unless otherwise credited, and is shared to
              demonstrate past work. Please don&apos;t reproduce it elsewhere without permission.
            </p>
          </div>

          <div>
            <h2>Case studies &amp; results</h2>
            <p>
              Metrics shown in the Work section (views, growth, ROAS, etc.) reflect real outcomes
              for those specific clients under their specific circumstances. They&apos;re shared as
              illustrations of past work, not a guarantee of results for any future project —
              digital marketing outcomes depend on factors outside my control, including budget,
              market, and platform algorithm changes.
            </p>
          </div>

          <div>
            <h2>Engaging services</h2>
            <p>
              Pricing shown on the Site is indicative. Scope, timeline, and final pricing for any
              engagement are confirmed directly with you — via WhatsApp, email, or the contact form
              — before work begins.
            </p>
          </div>

          <div>
            <h2>No warranty</h2>
            <p>
              The Site is provided &quot;as is.&quot; While I keep it accurate and up to date, I don&apos;t
              warrant that it will always be error-free or uninterrupted.
            </p>
          </div>

          <div>
            <h2>Limitation of liability</h2>
            <p>
              To the extent permitted by law, {site.name} isn&apos;t liable for indirect or
              consequential loss arising from your use of the Site itself. This doesn&apos;t affect
              the separate terms of any paid service agreement you enter into directly with me.
            </p>
          </div>

          <div>
            <h2>Governing law</h2>
            <p>These terms are governed by the laws of Bangladesh, where this business is based.</p>
          </div>

          <div>
            <h2>Contact</h2>
            <p>
              Questions about these terms? Email{" "}
              <a href={`mailto:${site.email}`} className="text-primary hover:underline">
                {site.email}
              </a>{" "}
              or see the{" "}
              <Link href="/#contact" className="text-primary hover:underline">
                contact section
              </Link>
              . See also the{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
