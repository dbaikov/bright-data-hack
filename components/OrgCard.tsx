import type { Organization } from "@/lib/types";
import ScoreRing from "./ScoreRing";
import SignalChips from "./SignalChips";

interface Props {
  org: Organization;
  rank: number;
}

const TYPE_LABELS = {
  hospital: "Hospital",
  health_system: "Health System",
  academic_medical_center: "Academic Medical Center",
};

const SIGNAL_ICONS: Record<string, string> = {
  facility_expansion: "🏗️",
  clinical_trial: "🧪",
  hiring: "👥",
  partnership: "🤝",
  equipment_investment: "⚙️",
  regulatory: "📋",
  funding: "💰",
};

export default function OrgCard({ org, rank }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-slate-100">
        <div className="flex items-start gap-4">
          {/* Rank badge */}
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">#{rank}</span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-slate-900 leading-tight">{org.name}</h3>
            <p className="text-sm text-slate-500 mt-0.5">
              {TYPE_LABELS[org.type]}{org.location ? ` · ${org.location}` : ""}
            </p>
            <div className="mt-2">
              <SignalChips signals={org.signalTypes} />
            </div>
          </div>

          <div className="flex-shrink-0">
            <ScoreRing score={org.readinessScore} />
          </div>
        </div>
      </div>

      {/* Evidence Ledger */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Evidence Ledger
        </h4>
        <ul className="space-y-2.5">
          {org.evidence.map((ev, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="flex-shrink-0 text-base leading-tight mt-0.5">
                {SIGNAL_ICONS[ev.signal] ?? "📌"}
              </span>
              <div className="min-w-0">
                <p className="text-sm text-slate-700 leading-snug">{ev.excerpt}</p>
                <div className="flex items-center gap-2 mt-1">
                  <a
                    href={ev.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline font-medium truncate"
                  >
                    {ev.sourceName}
                  </a>
                  {ev.date && (
                    <span className="text-xs text-slate-400">
                      {new Date(ev.date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Why Now + Action + Angle */}
      <div className="px-6 py-4 space-y-3">
        <div>
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
            Why Now
          </span>
          <p className="text-sm text-slate-700 mt-1">{org.whyNow}</p>
        </div>
        <div>
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            Recommended Action
          </span>
          <p className="text-sm text-slate-700 mt-1">{org.recommendedAction}</p>
        </div>
        <div>
          <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">
            Outreach Angle
          </span>
          <p className="text-sm text-slate-700 mt-1">{org.outreachAngle}</p>
        </div>
      </div>
    </div>
  );
}
