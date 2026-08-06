import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight, TrendingUp } from "lucide-react";
import { getPortfolioProjects } from "@/lib/get-portfolio-data";
import { Badge } from "@/components/ui/badge";
import { site } from "@/lib/site";
import { caseStudyJsonLd } from "@/lib/jsonld";

export const revalidate = 3600;

async function findProject(slug: string) {
  const projects = await getPortfolioProjects();
  return projects.find((p) => p.id === slug) ?? null;
}

export async function generateStaticParams() {
  const projects = await getPortfolioProjects();
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await findProject(slug);
  if (!project) return {};

  const title = project.title;
  const description = `${project.description} ${project.result}.`;
  const url = `${site.url}/work/${project.id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: [project.cover] },
    twitter: { card: "summary_large_image", title, description, images: [project.cover] },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await findProject(slug);
  if (!project) notFound();

  return (
    <main className="relative min-h-screen py-16 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd(project)) }}
      />
      <div className="container max-w-3xl">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
          <Link href="/" className="transition-colors hover:text-primary">Home</Link>
          <ChevronRight size={12} className="shrink-0" />
          <Link href="/#work" className="transition-colors hover:text-primary">Work</Link>
          <ChevronRight size={12} className="shrink-0" />
          <span className="truncate text-white/70">{project.title}</span>
        </nav>

        <Link
          href="/#work"
          className="mt-4 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
        >
          <ArrowLeft size={15} /> Back to all work
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge>{project.category}</Badge>
          <span className="flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
            <TrendingUp size={11} />
            {project.result}
          </span>
        </div>

        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">{project.description}</p>

        {project.cover && (
          <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-line bg-white/[0.02]">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {project.metrics.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-line bg-white/[0.02] p-4">
                <p className="text-xs text-muted">{m.label}</p>
                <p className="mt-2 flex flex-wrap items-center gap-2 font-display font-bold">
                  <span className="text-muted line-through decoration-white/20">{m.before}</span>
                  <ArrowRight size={12} className="shrink-0 text-primary" />
                  <span className="text-primary">{m.after}</span>
                </p>
              </div>
            ))}
          </div>
        )}

        {project.images.length > 1 && (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {project.images.slice(1).map((src, i) => (
              <div
                key={src}
                className="relative aspect-video overflow-hidden rounded-xl border border-line bg-white/[0.02]"
              >
                <Image
                  src={src}
                  alt={`${project.title} — image ${i + 2}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {project.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Badge key={t}>#{t}</Badge>
            ))}
          </div>
        )}

        <div className="mt-12 border-t border-line pt-8 text-center">
          <p className="text-sm text-muted">Want results like this for your brand?</p>
          <Link
            href="/#contact"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-opacity hover:opacity-90"
          >
            Get in touch <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </main>
  );
}
