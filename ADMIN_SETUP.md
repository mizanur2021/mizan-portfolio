# Setting up the Work admin panel

The site works exactly as before with zero setup — the Work section falls
back to the projects already in the code until you complete these steps.
Once done, you'll be able to add/edit/delete projects at `/admin` and see
changes on the live site immediately, with no redeploy needed.

## 1. Add a database (2 minutes)

1. Open your project in the [Vercel dashboard](https://vercel.com/dashboard).
2. Go to **Storage** → **Create Database** → choose **Postgres** (any
   provider works — Neon, Prisma Postgres, Supabase, etc. — the app talks to
   it over the standard Postgres protocol).
3. Connect it to this project. Vercel automatically adds a `POSTGRES_URL`
   environment variable — you don't need to copy anything.

## 2. Add image storage (1 minute)

1. Same **Storage** tab → **Create** → **Blob**.
2. Connect it to this project. Vercel adds `BLOB_READ_WRITE_TOKEN`
   automatically.
3. **Important**: make sure the store's access level is set to **Public**
   (check the store's Settings tab). A private store will reject uploads —
   portfolio images need to be viewable by anyone visiting the site, without
   login.

## 3. Set your admin password (1 minute)

1. Go to **Settings** → **Environment Variables**.
2. Add `ADMIN_PASSWORD` with a strong password of your choice. This is the
   only value you pick yourself.
3. Redeploy (Vercel usually prompts you to, or push any commit).

## 4. Import your existing projects

1. Visit `https://your-domain.com/admin` and log in with the password from
   step 3.
2. You'll see an empty dashboard with an **"Import existing projects from
   the site"** button — click it once. This copies the current 8 projects
   from the code into your new database so you're not starting from scratch.
3. From then on, edit/add/delete projects directly in `/admin` — the code's
   static project list is no longer used once the database has any rows.

## Local development (optional)

To test the admin panel on your own machine before deploying:

```
npx vercel env pull .env.local
```

This downloads the real `POSTGRES_URL` and `BLOB_READ_WRITE_TOKEN` values
from your Vercel project into a local `.env.local` file (already
git-ignored). Add `ADMIN_PASSWORD=whatever-you-want` to that same file for
local logins.
