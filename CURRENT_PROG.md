# FitBridge — rebuild progress

## Milestone 1 — Backend & Supabase (DONE, this commit)

**Goal:** make auth + data actually work, and make sure a runtime error can never
show a blank white page again.

### What was built
- **Real Supabase project wired** (`fit bridge`, `wurkhgxhrqqhdzjzmawy`).
  - `src/lib/supabase.js` — client with public URL + publishable key baked in as a
    fallback (overridable via `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`).
- **Database schema** (`supabase/migrations/`):
  - `profiles`, `workouts`, `weight_logs` tables.
  - Row Level Security on all three (own-row read/write; public profiles readable
    for future leaderboard).
  - Trigger auto-creates a profile row on signup.
  - Security advisors: **0 warnings** (search_path pinned, trigger fns locked from RPC).
- **Auth rewritten** (`src/state/AppState.jsx`) — real `signUp` / `signIn` /
  `signOut` / session restore, replacing the old fake localStorage auth. Same public
  API + state shape, so no consumer components broke.
- **Data persistence** — profile, workouts and weight logs now read/write Supabase.
  Onboarding seeds a demo training history into the account so the dashboard is alive.
- **No more blank page:**
  - `src/components/ui/ErrorBoundary.jsx` wraps the whole app — any render error now
    shows a recoverable screen with a Reload button.
  - Auth pages show real loading + mapped error banners (verified in a browser: a
    failed sign-in shows an inline error, it does **not** white-screen).
  - `PageShell` waits for the session to resolve before redirecting.
- **Deploy:** root `vercel.json` builds `trial-client` and adds the SPA rewrite, so
  the repo deploys correctly even when Vercel's root is the repo root.

### Verified
- `npm run build` ✅  · `npm run lint` ✅ (only pre-existing warnings)
- Browser drive-through of home → login → submit: renders at every step, graceful
  error on unreachable backend (sandbox blocks outbound to Supabase).

### Not verifiable in this sandbox
- A *successful* login round-trip (sandbox blocks outbound HTTPS to supabase.co).
  This will work on Vercel / locally where the network is open.

### One dashboard toggle you may want
- Supabase → Authentication → Providers → Email → **turn off "Confirm email"** for a
  frictionless demo (otherwise new signups must click an email link first — the app
  already handles both cases: it shows a "check your inbox" screen when confirmation
  is on).

---

## Milestone 2 — Visual rebuild (IN PROGRESS)

Design plan approved. Working dark-first, Strava-style, pushing per screen.

### Done + pushed
- **Foundation** — retuned tokens to a dark-first, logo-derived palette (near-black
  Strava surfaces + vivid ember orange, AA-safe accent split). Archivo display +
  Be Vietnam Pro body. Logo now loads `/brand/fitbridge-mark.png` with an SVG
  fallback; fixed the wordmark being invisible on dark panels.
- **Muscle heat map** — rebuilt as front + back anatomical figures, muscles glow
  orange by trained volume, all 12 groups selectable. Matches the reference's
  structure/feel (hand-built SVG; a drop-in exact asset can replace it like the logo).
- **Home** — hero rebuilt around the pose-skeleton camera-proof signature
  (TRACKING / reps / live-form / joint-angle chips). Kills the banned centered hero.

### Round 2 — expressive layer (done + pushed)
- **Real data, not fake** — removed the seeded year of demo workouts; app now shows
  only real logged sessions (empty states cover new accounts).
- **Interactive 3D** — the hero pose-skeleton is now a real orbitable 3D figure
  (drag to spin, inertia, idle auto-rotate, pauses off-screen / reduced-motion).
  Pure SVG + math, no WebGL, so it stays crisp and un-AI-looking.
- **Papercut / Vox band** — "how it works" rebuilt as a warm pasted-paper editorial
  insert with layered cut-paper step cards; added `--paper-*` + radius tokens.

> Higgsfield + Motion connectors both have **0 credits**, so no AI media was
> generated (would require a paid top-up). Everything above is hand-built, which
> also better serves the "don't look too AI" goal.

### Remaining screens (next)
- App shell: Strava-style **bottom tab bar** (mobile).
- Dashboard → **activity feed** with workout cards (distance/pace/time, kudos,
  muscle-map thumbnails).
- Auth pages / onboarding polish · AI Coach · Profile · Ranking layout.

### Round 3 — crash root-caused + user requests (done + pushed)
- **Crash fixed for real.** The production "l is not a function" was ScrollToTop's
  `useEffect(() => window.scrollTo(0,0), ...)` returning scrollTo's result to React
  as a cleanup — fatal on browsers where scrollTo returns a value. Reproduced by
  stubbing scrollTo, fixed with braces, verified old-crashes/new-survives.
  Production sourcemaps enabled.
- **Username-only auth** (no email anywhere), animated **multi-exercise stickman**
  (squat / push-up / bicep curl with dumbbells, real rep counter, drag-to-orbit),
  **real-video demo slot** (`public/media/demo-pushups.mp4`, frame fits the video),
  hero stats row removed (no fake-looking numbers), TalkBridge-style logo pill +
  bigger nav logo, Features/How-it-works nav links, warmer non-glare light mode,
  natural Vietnamese copy, **avatar upload** (Supabase storage bucket + RLS,
  camera button on profile + edit modal).

### Round 4 — bug fixes + fake-data purge (done + pushed)
- Stickman animates on ALL machines (reduced-motion now only stops auto-rotation
  — this was why Windows/Alienware saw it frozen). Chips can no longer stretch.
- Demo-video section always visible (elegant placeholder until the file exists).
- Real /terms page (EN/VI); register links go there — loophole closed.
- Forgot-password removed; @fitbridge.app shown as a fixed suffix on username
  fields; professional placeholders.
- Fake data fully purged: leaderboard = real public profiles from the DB only
  (score/streak persisted, migration 0004); mockData.js deleted; achievements
  computed from real workouts incl. per-exercise clean-form badges.
- Profile right-column overflow fixed for scaled laptop displays.

---

## ROADMAP — big features queued for next sessions (user-approved direction)

Work top-to-bottom; each item ends with commit + push + this file updated.

1. **Coach session UX + AI summary** (user's top complaint)
   - Replace the white flash when the camera starts with a dark stage +
     "Bắt đầu bài tập" overlay button; camera only starts after pressing it.
   - Save every finished session to Supabase (already wired via addWorkout) and
     show an end-of-session AI-style summary (form breakdown per rep from the
     existing usePoseDetection angle data; no external paid API needed —
     summarize locally, optionally later a free LLM endpoint).
   - **Sequence builder**: let the user queue exercises (e.g. push-up ×12 →
     squat ×15 → plank 40s), then the session runs the queue automatically.
2. **Strava-style social layer** (schema next session):
   - `posts` table (user, workout ref, caption, visibility) + `kudos` +
     `follows`; feed page = real posts from followed users; share-progress
     posts from the profile. RLS mirrors profiles.metrics_public.
   - Run tracking (GPS w/ geolocation API, route map, distance/pace) as a new
     exercise type.
3. **Nutrition tracking**: meals table (photo, kcal estimate), daily 3-meal log,
   calendar + reminders (Notification API), progress charts. Photo→calorie
   needs a vision API — pick a free tier (e.g. OpenRouter free vision model)
   and keep the key server-side (Supabase Edge Function).
4. **Body map v2**: continuous human silhouette (single outline, muscles as
   clipped regions inside it) so it reads as one person, front/back.
5. **Cluely-style interactive compare slider** on the landing page: two meeting
   photos (user will supply), drag divider, bilingual positive bubble matching
   the chosen locale. Keep the existing Sarah/Minh conversation.
6. **Luxury polish pass**: glass morphing transitions between routes, magnified
   dock-style bottom nav on mobile, refined hover ring on every control
   (already tokenized), light/dark audit at 125% Windows scaling.

### Blocked on you (needed to fully verify + finish)
1. **Deploy the current branch to Vercel and confirm sign-in works** — this is the
   one thing I can't test here (sandbox blocks outbound to Supabase).
2. **Add the logo file** at `trial-client/public/brand/fitbridge-mark.png`.
3. **Supabase → Auth → Email → turn off "Confirm email"** for a frictionless demo.
