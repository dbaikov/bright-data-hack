import type { Organization, SignalType } from "./types";

const SIGNAL_WEIGHTS: Record<SignalType, number> = {
  clinical_trial: 25,
  facility_expansion: 20,
  equipment_investment: 18,
  hiring: 15,
  regulatory: 12,
  partnership: 8,
  funding: 8,
};

export function scoreOrganization(org: Omit<Organization, "readinessScore">): number {
  let score = 0;
  const seenSignals = new Set<SignalType>();

  for (const ev of org.evidence) {
    if (!seenSignals.has(ev.signal)) {
      score += SIGNAL_WEIGHTS[ev.signal] ?? 5;
      seenSignals.add(ev.signal);
    }
  }

  // recency bonus: evidence with dates in last 90 days
  const cutoff = Date.now() - 90 * 24 * 60 * 60 * 1000;
  const recentCount = org.evidence.filter(
    (e) => e.date && new Date(e.date).getTime() > cutoff
  ).length;
  score += recentCount * 3;

  // diversity bonus
  score += seenSignals.size * 2;

  return Math.min(100, Math.round(score));
}
