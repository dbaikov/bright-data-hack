# AccessFox — 4-Hour Hackathon MVP Plan

## Context
Bright Data AI Agents Web Data Hackathon. AccessFox = healthcare account-readiness
intelligence from live web signals. Demo: surface hospitals/health systems showing
signs of radiopharmaceutical / theranostics expansion. Greenfield repo (only CLAUDE.md
exists). Must ship to Vercel today. Reliability + UI polish > architecture. Everything
external is env-gated with a deterministic fallback so the live demo cannot fail.

**Locked decisions:** Next.js (App Router) + TypeScript + Tailwind. AI layer = Anthropic
Claude (env-gated). Live signals = Bright Data SERP API (env-gated). Fallback dataset
always present. shadcn = optional stretch only if ahead of schedule.

---

## 1. File Structure
```
bright-data-hack/
├── app/
│   ├── layout.tsx                 # root layout, fonts, global shell
│   ├── page.tsx                   # single-page dashboard (client component)
│   ├── globals.css                # tailwind + design tokens
│   └── api/
│       └── opportunities/
│           └── route.ts           # POST: orchestrates search → extract → score
├── lib/
│   ├── types.ts                   # data model (Organization, Signal, Evidence...)
│   ├── brightdata.ts              # SERP API client (env-gated) + isLive flag
│   ├── score.ts                   # deterministic scoring + signal weighting
│   ├── ai.ts                      # Anthropic extraction/scoring (env-gated)
│   └── fallback.ts                # demo dataset (6-8 orgs, fully populated)
├── components/
│   ├── SearchBar.tsx              # input + "Find Expansion Opportunities" button
│   ├── DataSourceBadge.tsx        # "Live Web Signals via Bright Data" / Demo badge
│   ├── ResultsGrid.tsx            # ranked layout + empty/loading states
│   ├── OrgCard.tsx                # the rich org card (all 8 required fields)
│   ├── ScoreRing.tsx              # readiness score visual
│   └── SignalChips.tsx           # signal-type pills
├── .env.local.example            # BRIGHTDATA_API_KEY, BRIGHTDATA_SERP_ZONE, ANTHROPIC_API_KEY
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md                     # 1-screen: what it is, how to run, Bright Data usage
```

## 2. Implementation Sequence (time-boxed ~3h45)
1. **(20m) Scaffold** — `create-next-app` (TS, Tailwind, App Router). Verify dev server + blank page render. Commit.
2. **(15m) Data model + fallback** — `lib/types.ts`, `lib/fallback.ts` (6–8 fully-populated radiopharma orgs). → verify: import compiles, data shape matches types.
3. **(30m) Deterministic scoring** — `lib/score.ts` (signal weights → 0–100). → verify: unit-ish console run ranks fallback orgs sensibly.
4. **(35m) API route (fallback path first)** — `app/api/opportunities/route.ts` returns scored fallback immediately, `meta.source="demo"`. → verify: `curl` POST returns ranked JSON.
5. **(45m) UI** — `page.tsx` + SearchBar + ResultsGrid + OrgCard + ScoreRing + SignalChips + DataSourceBadge wired to the route. → verify: end-to-end in browser, cards render all 8 fields, loading/empty states work.
6. **(30m) Bright Data SERP (env-gated)** — `lib/brightdata.ts`; if key present, query live, map results into org candidates; on any error fall back. Set `meta.source="live"`. → verify: with key returns live + badge flips; without key still works.
7. **(20m) AI extraction/scoring (env-gated)** — `lib/ai.ts`; if `ANTHROPIC_API_KEY` present, enrich/score candidates, else `lib/score.ts`. Wrap in try/catch → fallback. → verify: toggling key changes `meta.aiEnabled` flag, never crashes.
8. **(20m) Polish + deploy** — empty/error states, responsive check, favicon/title, README. `vercel` deploy, smoke test prod (no env vars → demo mode works). → verify: live Vercel URL renders demo.
9. **(buffer) shadcn / extra polish** only if time remains.

## 3. Minimal Data Model (`lib/types.ts`)
```ts
type SignalType =
  | "facility_expansion" | "clinical_trial" | "hiring"
  | "partnership" | "equipment_investment" | "regulatory" | "funding";

interface Evidence {
  signal: SignalType;
  excerpt: string;        // short quote/summary of the signal
  sourceUrl: string;
  sourceName: string;     // e.g. publication / domain
  date?: string;          // ISO if known
}

interface Organization {
  id: string;
  name: string;
  type: "hospital" | "health_system" | "academic_medical_center";
  location?: string;
  readinessScore: number;       // 0–100
  signalTypes: SignalType[];
  evidence: Evidence[];         // the evidence ledger
  whyNow: string;
  recommendedAction: string;
  outreachAngle: string;
}

interface OpportunityResponse {
  query: string;
  meta: { source: "live" | "demo"; aiEnabled: boolean; fetchedAt: string; resultCount: number };
  organizations: Organization[]; // sorted desc by readinessScore
}
```

## 4. API Route Design (`POST /api/opportunities`)
- **Request:** `{ query: string }` (therapy/market term; default seeded to theranostics).
- **Pipeline (each stage degrades gracefully):**
  1. If `BRIGHTDATA_API_KEY` present → `searchSignals(query)` via SERP API; else skip.
  2. If live results → map to candidate orgs; else use `lib/fallback.ts`.
  3. If `ANTHROPIC_API_KEY` present → `lib/ai.ts` extracts signals/why-now/action/angle + score; else `lib/score.ts` deterministic.
  4. Sort by `readinessScore` desc, return `OpportunityResponse`.
- **Guarantees:** wrapped in try/catch; ANY failure returns scored fallback with `meta.source="demo"`. Always HTTP 200 with valid payload. `meta` drives the UI source badge — making Bright Data usage visible.
- Runtime: Node (not edge) for SDK compatibility. `export const dynamic = "force-dynamic"`.

## 5. UI Component List
- **SearchBar** — text input (placeholder: "e.g. radiopharmaceutical therapy / theranostics"), primary "Find Expansion Opportunities" button, loading spinner state.
- **DataSourceBadge** — pill showing "● Live Web Signals via Bright Data" (live) or "Demo dataset" (fallback), + AI-enabled indicator; reads `meta`.
- **ResultsGrid** — responsive ranked grid; loading skeletons; empty state.
- **OrgCard** — name + type/location, ScoreRing, SignalChips, **Evidence ledger** (list of excerpt + source link), Why Now, Recommended Action, Outreach Angle. Rank badge (#1, #2...).
- **ScoreRing** — circular/▮ readiness score 0–100 with color band (red→amber→green).
- **SignalChips** — colored pills per signal type.
- Header with AccessFox brand + one-line value prop; subtle enterprise theme (slate/indigo, generous spacing, rounded-xl, soft shadows).

## 6. Acceptance Criteria
- [ ] `npm run dev` serves single-page dashboard with input + "Find Expansion Opportunities" button.
- [ ] Clicking the button with NO env vars returns 6–8 ranked org cards from fallback (demo never fails).
- [ ] Each card shows all 8 fields: name, readiness score, signal types, evidence ledger, source links, why now, recommended action, outreach angle.
- [ ] Cards are sorted by readiness score (highest first) with visible rank.
- [ ] Source badge reads "Live Web Signals via Bright Data" when `BRIGHTDATA_API_KEY` set + live results returned; "Demo" otherwise.
- [ ] With `ANTHROPIC_API_KEY` set, scoring/extraction uses AI; without it, deterministic scoring; neither crashes.
- [ ] Source links are real, clickable `target="_blank"` anchors.
- [ ] Deployed to a public Vercel URL that works in demo mode (zero env vars).
- [ ] No auth, no DB, TypeScript compiles clean, loading + empty states present.

## 7. Risks & Fastest Mitigations
- **Bright Data SERP returns unexpected/empty shape** → mitigate: strict try/catch in `brightdata.ts`, validate then fall back to demo; never block the response.
- **AI call slow/over budget on time** → mitigate: hard timeout (~8s) around Anthropic call; on timeout use deterministic `score.ts`. AI is enrichment, never the critical path.
- **Vercel function timeout / Node-vs-edge SDK issues** → mitigate: force Node runtime, `dynamic="force-dynamic"`, keep external calls bounded; demo path needs no network.
- **shadcn setup eats the clock** → mitigate: Tailwind-only is the committed spine; shadcn only touched in the buffer step.
- **Live demo network failure at judging** → mitigate: fallback dataset is the default; can demo entirely offline; badge honestly reflects source.
- **Mapping noisy SERP results into clean org cards** → mitigate: AI extraction handles messy text when key present; otherwise demo data guarantees a clean, impressive ranked view.
- **Scope creep on UI** → mitigate: one card component, fixed field set; polish via spacing/color tokens, not new features.

## Verification (end-to-end)
1. `npm run dev` → open localhost, click button → cards render (demo). 
2. `curl -X POST localhost:3000/api/opportunities -d '{"query":"theranostics"}'` → valid ranked JSON, `meta.source="demo"`.
3. Add `BRIGHTDATA_API_KEY` + zone → re-run → badge flips to live, results populated.
4. Add `ANTHROPIC_API_KEY` → `meta.aiEnabled=true`, enriched fields.
5. `vercel` deploy with no env vars → public URL renders demo successfully.