import type { SignalType } from "@/lib/types";

const SIGNAL_CONFIG: Record<SignalType, { label: string; color: string }> = {
  facility_expansion: { label: "Facility Expansion", color: "bg-blue-100 text-blue-800" },
  clinical_trial: { label: "Clinical Trial", color: "bg-purple-100 text-purple-800" },
  hiring: { label: "Hiring", color: "bg-green-100 text-green-800" },
  partnership: { label: "Partnership", color: "bg-indigo-100 text-indigo-800" },
  equipment_investment: { label: "Equipment", color: "bg-cyan-100 text-cyan-800" },
  regulatory: { label: "Regulatory", color: "bg-orange-100 text-orange-800" },
  funding: { label: "Funding", color: "bg-yellow-100 text-yellow-800" },
};

interface Props {
  signals: SignalType[];
}

export default function SignalChips({ signals }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {signals.map((s) => {
        const cfg = SIGNAL_CONFIG[s];
        return (
          <span
            key={s}
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.color}`}
          >
            {cfg.label}
          </span>
        );
      })}
    </div>
  );
}
