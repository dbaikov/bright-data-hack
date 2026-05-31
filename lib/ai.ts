import type { Organization } from "./types";
import type { SerpResult } from "./brightdata";

export const aiEnabled = () => !!process.env.AIMLAPI_KEY;

export async function enrichWithAI(
  results: SerpResult[],
  _query: string
): Promise<Organization[]> {
  if (!aiEnabled() || results.length === 0) return [];

  // Filter to likely healthcare URLs, then batch
  const SKIP_DOMAINS = ["fiercebiotech","fiercepharma","biospace","businesswire","prnewswire",
    "globenewswire","reuters","bloomberg","statnews","beckershospital","modernhealthcare",
    "healthcareitnews","radiologybusiness","appliedradiology","snmmi","eanm","astro","asco"];
  const urls = results
    .map((r) => r.url)
    .filter((u) => !SKIP_DOMAINS.some((d) => u.includes(d)))
    .slice(0, 15);
  const batchSize = 5;
  const batches: string[][] = [];
  for (let i = 0; i < urls.length; i += batchSize) {
    batches.push(urls.slice(i, i + batchSize));
  }

  function buildPrompt(batchUrls: string[]): string {
    const urlList = batchUrls.map((u, i) => `[${i + 1}] ${u}`).join("\n");
    return `You are a healthcare market intelligence analyst specializing in advanced therapy adoption.

These URLs came from a live Google search for "${_query}" at hospitals and health systems. Identify which organizations are actively adopting or expanding "${_query}" and generate account intelligence cards.

URLs:
${urlList}

Return a JSON array (no markdown) of 2-3 organizations. Each must match:
{
  "id": "unique-slug",
  "name": "Full organization name",
  "type": "hospital" | "health_system" | "academic_medical_center",
  "location": "City, State",
  "readinessScore": 0-100,
  "signalTypes": ["facility_expansion","clinical_trial","hiring","partnership","equipment_investment","regulatory","funding"],
  "evidence": [
    {"signal":"...","excerpt":"Specific 2-3 sentence signal about this org's adoption of ${_query}","sourceUrl":"use URL from list","sourceName":"domain","date":"2024-MM-DD"},
    {"signal":"...","excerpt":"...","sourceUrl":"...","sourceName":"...","date":"..."},
    {"signal":"...","excerpt":"...","sourceUrl":"...","sourceName":"...","date":"..."}
  ],
  "whyNow": "1-2 sentence urgency for a sales rep targeting ${_query} adoption",
  "recommendedAction": "Specific next step for selling into this org's ${_query} program",
  "outreachAngle": "Messaging angle tailored to this org's ${_query} readiness"
}

Hospitals/health systems/AMCs only. Skip vendors, news sites, general info. Return only the JSON array.`;
  }

  async function callBatch(batchUrls: string[]): Promise<Organization[]> {
    const res = await fetch("https://api.aimlapi.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AIMLAPI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        max_tokens: 4096,
        messages: [{ role: "user", content: buildPrompt(batchUrls) }],
      }),
      signal: AbortSignal.timeout(20000),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`AIML API ${res.status}: ${err.slice(0, 200)}`);
    }
    const data = await res.json();
    const text: string = data?.choices?.[0]?.message?.content ?? "";
    console.log("[ai] batch response preview:", text.slice(0, 200));
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleaned) as Organization[];
  }

  const batchResults = await Promise.allSettled(batches.map((b, i) =>
    callBatch(b).catch((e) => { console.error(`[ai] batch ${i} failed:`, e.message); return []; })
  ));

  const allOrgs: Organization[] = [];
  const seenNames = new Set<string>();
  for (const result of batchResults) {
    if (result.status === "fulfilled") {
      for (const org of result.value) {
        if (!seenNames.has(org.name)) {
          seenNames.add(org.name);
          allOrgs.push(org);
        }
      }
    }
  }

  console.log("[ai] parallel batches:", batches.length, "orgs collected:", allOrgs.length);
  return allOrgs;
}
