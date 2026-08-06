import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects information on ${site.url}.`,
  alternates: { canonical: `${site.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen py-16 sm:py-24">
      <div className="container max-w-3xl">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted">Last updated: August 2026</p>

        <div className="prose prose-invert mt-8 max-w-none space-y-6 text-sm leading-relaxed text-muted [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-white [&_p]:mt-2">
          <p>
            This policy explains what information {site.name} (&quot;I&quot;, &quot;me&quot;) collects through{" "}
            {site.url} (the &quot;Site&quot;), and how it&apos;s used. This is a personal freelance portfolio
            site, not a service that requires an account for visitors — the data footprint is
            intentionally small.
          </p>

          <div>
            <h2>Information I collect</h2>
            <p>
              <strong className="text-white">Contact form.</strong> If you submit the contact form,
              I receive the name, email address, and message you provide. This is sent via{" "}
              FormSubmit.co directly to my email inbox — it is not stored in a database on this
              Site. I use it solely to respond to your inquiry.
            </p>
            <p>
              <strong className="text-white">Analytics.</strong> This Site uses Google Analytics
              (GA4) to understand how visitors use it — pages viewed, approximate location,
              device/browser type, and referral source. Google Analytics uses cookies to do this.
              I don&apos;t use this data to identify individual visitors.
            </p>
            <p>
              <strong className="text-white">Admin session.</strong> A single authentication cookie
              is used to keep me (the site owner) signed in to the private admin dashboard used to
              manage portfolio content. It has no effect on regular visitors and stores no personal
              data about them.
            </p>
          </div>

          <div>
            <h2>Third-party services</h2>
            <p>
              This Site relies on a few third parties to operate: Google Analytics (usage
              analytics), FormSubmit.co (contact form delivery), and Vercel (hosting and image
              storage). Each has its own privacy practices governing the data that passes through
              their systems.
            </p>
          </div>

          <div>
            <h2>Cookies</h2>
            <p>
              Cookies on this Site are limited to Google Analytics (visitor analytics) and, only
              for me as the owner, an admin session cookie. No advertising or cross-site tracking
              cookies are used.
            </p>
          </div>

          <div>
            <h2>Your choices</h2>
            <p>
              You can use a browser extension or setting to block Google Analytics, and you&apos;re
              never required to use the contact form to browse the Site. To request that I delete
              any message you&apos;ve previously sent me, just email me and I&apos;ll remove it.
            </p>
          </div>

          <div>
            <h2>Children&apos;s privacy</h2>
            <p>This Site is a professional portfolio and isn&apos;t directed at children.</p>
          </div>

          <div>
            <h2>Changes to this policy</h2>
            <p>
              If this policy changes materially, I&apos;ll update the date at the top of this page.
            </p>
          </div>

          <div>
            <h2>Contact</h2>
            <p>
              Questions about this policy? Email{" "}
              <a href={`mailto:${site.email}`} className="text-primary hover:underline">
                {site.email}
              </a>{" "}
              or see the{" "}
              <Link href="/#contact" className="text-primary hover:underline">
                contact section
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
