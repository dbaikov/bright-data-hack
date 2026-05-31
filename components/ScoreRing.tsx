"use client";

interface Props {
  score: number;
}

export default function ScoreRing({ score }: Props) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 80
      ? "#22c55e"
      : score >= 60
      ? "#f59e0b"
      : score >= 40
      ? "#f97316"
      : "#ef4444";

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="6"
        />
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
        />
        <text
          x="36"
          y="40"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill={color}
        >
          {score}
        </text>
      </svg>
      <span className="text-xs text-slate-500 font-medium">Readiness</span>
    </div>
  );
}
