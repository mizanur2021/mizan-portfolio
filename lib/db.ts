import "server-only";
import { Pool } from "pg";
import type { Project } from "@/data/content";

type ProjectRow = {
  id: string;
  title: string;
  category: Project["category"];
  cover: string;
  images: string[];
  description: string;
  result: string;
  tags: string[];
  metrics: Project["metrics"];
  sort_order: number;
};

// Cached on `global` so hot-reload in dev and warm serverless invocations in
// production reuse one pool instead of leaking a new one per request.
declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
}

function getPool(): Pool {
  if (!global.__pgPool) {
    const connectionString = process.env.POSTGRES_URL;
    if (!connectionString) throw new Error("POSTGRES_URL environment variable is not set");
    global.__pgPool = new Pool({ connectionString });
  }
  return global.__pgPool;
}

function rowToProject(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    cover: row.cover,
    images: row.images,
    description: row.description,
    result: row.result,
    tags: row.tags,
    metrics: row.metrics,
  };
}

/** Idempotent — safe to call on every cold start. Creates the table on first use. */
export async function ensureSchema() {
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      cover TEXT NOT NULL,
      images JSONB NOT NULL DEFAULT '[]',
      description TEXT NOT NULL,
      result TEXT NOT NULL,
      tags JSONB NOT NULL DEFAULT '[]',
      metrics JSONB NOT NULL DEFAULT '[]',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
}

export async function getProjects(): Promise<Project[]> {
  await ensureSchema();
  const { rows } = await getPool().query<ProjectRow>(
    `SELECT id, title, category, cover, images, description, result, tags, metrics, sort_order
     FROM projects ORDER BY sort_order ASC, created_at ASC`
  );
  return rows.map(rowToProject);
}

export async function getProject(id: string): Promise<Project | null> {
  await ensureSchema();
  const { rows } = await getPool().query<ProjectRow>(
    `SELECT id, title, category, cover, images, description, result, tags, metrics, sort_order
     FROM projects WHERE id = $1`,
    [id]
  );
  return rows[0] ? rowToProject(rows[0]) : null;
}

export async function createProject(p: Project, sortOrder: number) {
  await ensureSchema();
  await getPool().query(
    `INSERT INTO projects (id, title, category, cover, images, description, result, tags, metrics, sort_order)
     VALUES ($1, $2, $3, $4, $5::jsonb, $6, $7, $8::jsonb, $9::jsonb, $10)`,
    [
      p.id,
      p.title,
      p.category,
      p.cover,
      JSON.stringify(p.images),
      p.description,
      p.result,
      JSON.stringify(p.tags),
      JSON.stringify(p.metrics),
      sortOrder,
    ]
  );
}

export async function updateProject(id: string, p: Project) {
  await ensureSchema();
  await getPool().query(
    `UPDATE projects SET
       title = $2,
       category = $3,
       cover = $4,
       images = $5::jsonb,
       description = $6,
       result = $7,
       tags = $8::jsonb,
       metrics = $9::jsonb,
       updated_at = now()
     WHERE id = $1`,
    [
      id,
      p.title,
      p.category,
      p.cover,
      JSON.stringify(p.images),
      p.description,
      p.result,
      JSON.stringify(p.tags),
      JSON.stringify(p.metrics),
    ]
  );
}

export async function deleteProject(id: string) {
  await ensureSchema();
  await getPool().query(`DELETE FROM projects WHERE id = $1`, [id]);
}

export async function projectCount(): Promise<number> {
  await ensureSchema();
  const { rows } = await getPool().query<{ count: number }>(`SELECT COUNT(*)::int AS count FROM projects`);
  return rows[0]?.count ?? 0;
}
