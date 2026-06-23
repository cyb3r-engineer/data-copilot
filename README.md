# Data Co-Pilot v3 — Vercel + Supabase + Gemini (free)

Two pages:
- **`/`** — Capture: upload a photo or try a sample, AI parses it, saves to Supabase
- **`/queue.html`** — Review queue: see all captures, approve or flag, add notes

---

## Setup — three services, ~15 minutes total

### 1. Supabase (the database)

1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Click **New project**, give it a name, pick a region, set a password
3. Wait ~2 minutes for it to spin up
4. Click **SQL Editor** in the left sidebar and run this:

```sql
create table captures (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  doc_type text,
  confidence integer,
  summary text,
  result_json jsonb,
  status text default 'needs_review',
  source text default 'upload',
  teacher_note text,
  reviewed_at timestamptz
);
```

5. Go to **Project Settings → API** and copy:
   - **Project URL** — `https://xxxx.supabase.co`
   - **anon public** key — starts with `eyJ...`

---

### 2. Gemini API key (free — no card needed)

1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Sign in with a Google account
3. Click **Get API key** → **Create API key**
4. Copy the key — starts with `AIza...`
5. Free tier: 1,500 requests/day — more than enough for a prototype

---

### 3. GitHub + Vercel

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com), sign up with GitHub, click **Add New Project**
3. Import your repo and click **Deploy**
4. Go to **Settings → Environment Variables** and add:

| Name | Value |
|------|-------|
| `GEMINI_API_KEY` | `AIza...` |
| `SUPABASE_URL` | `https://xxxx.supabase.co` |
| `SUPABASE_ANON_KEY` | `eyJ...` |

5. Go to **Deployments** → **Redeploy**

Your app is live at `https://your-project.vercel.app`

---

## Project structure

```
copilot-v3/
├── api/
│   ├── parse.js       # POST /api/parse — calls Gemini, saves to Supabase
│   ├── queue.js       # GET  /api/queue — fetches captures from Supabase
│   └── update.js      # PATCH /api/update — approve/flag a capture
├── public/
│   ├── index.html     # Capture page
│   └── queue.html     # Review queue page
├── vercel.json
├── package.json
└── README.md
```
