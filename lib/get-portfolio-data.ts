import "server-only";
import { projects as staticProjects, type Project } from "@/data/content";
import { getProjects } from "@/lib/db";

/**
 * Falls back to the bundled static project list whenever the database isn't
 * configured/reachable, or hasn't been seeded yet — so the public site keeps
 * working exactly as before until POSTGRES_URL is set up (see /admin setup
 * notes) and never goes down because of a database hiccup.
 */
export async function getPortfolioProjects(): Promise<Project[]> {
  if (!process.env.POSTGRES_URL) {
    return staticProjects;
  }
  try {
    const dbProjects = await getProjects();
    return dbProjects.length > 0 ? dbProjects : staticProjects;
  } catch (err) {
    console.error("[portfolio] failed to load projects from database, falling back to static data:", err);
    return staticProjects;
  }
}
