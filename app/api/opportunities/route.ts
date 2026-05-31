import { NextResponse } from "next/server";
import type { OpportunityResponse } from "@/lib/types";
import { FALLBACK_ORGS } from "@/lib/fallback";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  let query = "theranostics";
  try {
    const body = await req.json();
    if (typeof body?.query === "string" && body.query.trim()) {
      query = body.query.trim();
    }
  } catch {
    // use default query
  }

  try {
    const { isLive, searchSignals } = await import("@/lib/brightdata");
    const { aiEnabled, enrichWithAI } = await import("@/lib/ai");
    const { scoreOrganization } = await import("@/lib/score");

    const aiOn = aiEnabled();
    console.log("[route] isLive:", isLive, "aiEnabled:", aiOn);

    let source: "live" | "demo" = "demo";
    let orgs = FALLBACK_ORGS;

    if (isLive) {
      try {
        const serpResults = await searchSignals(query);
        console.log("[brightdata] serpResults count:", serpResults.length);
        if (serpResults.length > 0 && aiOn) {
          const aiOrgs = await enrichWithAI(serpResults, query);
          console.log("[ai] enriched orgs count:", aiOrgs.length);
          if (aiOrgs.length > 0) {
            orgs = aiOrgs;
            source = "live";
          }
        } else if (serpResults.length > 0) {
          source = "live";
        }
      } catch (err) {
        console.error("[brightdata/ai] error, falling back to demo:", err);
      }
    } else {
      console.log("[brightdata] isLive=false — keys missing or not loaded");
    }

    const scored = orgs.map((org) => {
      if (org.readinessScore > 0) return org;
      return { ...org, readinessScore: scoreOrganization(org) };
    });

    scored.sort((a, b) => b.readinessScore - a.readinessScore);

    const response: OpportunityResponse = {
      query,
      meta: {
        source,
        aiEnabled: aiOn,
        fetchedAt: new Date().toISOString(),
        resultCount: scored.length,
      },
      organizations: scored,
    };

    return NextResponse.json(response);
  } catch {
    const fallback: OpportunityResponse = {
      query,
      meta: {
        source: "demo",
        aiEnabled: false,
        fetchedAt: new Date().toISOString(),
        resultCount: FALLBACK_ORGS.length,
      },
      organizations: FALLBACK_ORGS,
    };
    return NextResponse.json(fallback);
  }
}
