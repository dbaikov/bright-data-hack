interface Props {
  source: "live" | "demo";
  aiEnabled: boolean;
}

export default function DataSourceBadge({ source, aiEnabled }: Props) {
  const isLive = source === "live";

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
          isLive
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-slate-100 text-slate-600 border border-slate-200"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-slate-400"}`}
        />
        {isLive
          ? "Live Web Signals via Bright Data"
          : "Demo dataset · Bright Data infrastructure"}
      </span>
      {aiEnabled && (
        <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
          Enriched via AIML API · GPT-4o
        </span>
      )}
    </div>
  );
}
