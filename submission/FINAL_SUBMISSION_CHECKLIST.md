# AccessFox — Final Submission Checklist

## Submission Metadata

**Title:** AccessFox

**Short Description:**
Healthcare account-readiness intelligence from live web signals, helping teams find hospitals preparing to adopt advanced therapies.

**Long Description:**
AccessFox helps enterprise healthcare GTM and strategy teams identify which hospitals and health systems are becoming ready to adopt advanced therapies.

Early adoption signals are public, but fragmented across hospital websites, clinical trial pages, job postings, conference activity, physician profiles, press releases, and market news. These signals often appear before formal buying intent shows up in CRM systems or static market datasets.

AccessFox uses Bright Data live web infrastructure to surface current public web signals and converts them into ranked account-readiness intelligence. The app generates Account Readiness Scores, Evidence Ledgers with source links, why-now reasoning, recommended commercial actions, and outreach angles for each organization.

The demo focuses on radiopharmaceutical therapy and theranostics adoption readiness, but the workflow applies broadly to complex healthcare markets such as cell therapy, proton therapy, robotic surgery, hospital-at-home, medical AI, and other advanced clinical programs.

AccessFox demonstrates how live public web data can power enterprise AI workflows that turn scattered evidence into practical business action.

**Categories / Tags:**
GTM Intelligence, Bright Data, AI Agents, Healthcare, Market Intelligence, Enterprise AI, Live Web Data, Account Readiness, Evidence Ledger, Next.js, React, TypeScript, Tailwind, Vercel

---

## Artifact Checklist

- [x] **Cover Image** — `submission/cover.png` (1600×900, 517KB)
- [x] **Cover Image SVG** — `submission/cover.svg`
- [x] **Video Presentation** — `submission/accessfox-demo.mp4` (78s, 1.6MB)
- [x] **Narration Audio** — `submission/narration.aiff`
- [x] **Video Script** — `submission/VIDEO_SCRIPT.md`
- [x] **Slide Presentation HTML** — `submission/slides.html` (4 slides, standalone)
- [x] **Slide Presentation PDF** — `submission/slides.pdf` (219KB)
- [x] **GitHub Repository** — https://github.com/dbaikov/brigh-data-hack
- [x] **Application URL** — https://accessfox.vercel.app

---

## Submission Form Fields

| Field | Value |
|-------|-------|
| Project Name | AccessFox |
| Tagline | Healthcare account-readiness intelligence from live web signals |
| Demo URL | https://accessfox.vercel.app |
| GitHub | https://github.com/dbaikov/brigh-data-hack |
| Cover Image | submission/cover.png |
| Video | submission/accessfox-demo.mp4 |
| Slides | submission/slides.pdf |
| Built with | Bright Data SERP API, AIML API, Next.js, TypeScript, Tailwind, Vercel |

---

## Bright Data Usage Proof

- **SERP API proxy** at `brd.superproxy.io` used to fetch live Google search results
- Routes through Bright Data residential proxy infrastructure (port 33335)
- Live badge visible in UI: "● Live Web Signals via Bright Data"
- Code: `lib/brightdata.ts` — `ProxyAgent` with Bright Data credentials
- Environment variable: `BRIGHTDATA_PROXY_URL`
- Demo mode gracefully falls back when key not present

---

## Final Smoke Test

1. Open https://accessfox.vercel.app
2. Confirm homepage loads with AccessFox header
3. Click **Find Expansion Opportunities**
4. Confirm 8 ranked cards render (demo mode, no env vars)
5. Confirm each card shows: Score, Evidence Ledger, Why Now, Recommended Action, Outreach Angle
6. Confirm badge shows "Demo dataset · Bright Data infrastructure"

---

## Next 3 Actions

1. **Upload video** — submit `submission/accessfox-demo.mp4` to the hackathon video field
2. **Upload cover** — submit `submission/cover.png` to the hackathon cover image field
3. **Add env vars to Vercel** (optional, for live demo) — Vercel dashboard → Project Settings → Environment Variables:
   - `BRIGHTDATA_PROXY_URL` = `http://brd-customer-hl_d052029e-zone-serp_api1:PASSWORD@brd.superproxy.io:33335`
   - `AIMLAPI_KEY` = your AIML API key
