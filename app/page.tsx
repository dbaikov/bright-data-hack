"use client";

import { useState } from "react";
import type { OpportunityResponse } from "@/lib/types";
import OrgCard from "@/components/OrgCard";
import DataSourceBadge from "@/components/DataSourceBadge";

export default function Home() {
  const [query, setQuery] = useState("radiopharmaceutical therapy / theranostics");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OpportunityResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-indigo-600 tracking-tight">
                AccessFox
              </span>
              <span className="hidden sm:inline text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full px-2 py-0.5">
                beta
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Healthcare account-readiness intelligence
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400 font-medium">Powered by</p>
            <p className="text-xs font-semibold text-slate-600">
              Bright Data live web infrastructure
            </p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Find healthcare organizations preparing to adopt advanced therapies
          </h1>
          <p className="text-indigo-200 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Live web signals surface hospitals and health systems showing adoption readiness
            across complex care programs — ranked by Account Readiness Score.
          </p>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && handleSearch()}
              placeholder="e.g. radiopharmaceutical therapy / theranostics"
              className="flex-1 rounded-xl px-4 py-3 text-slate-900 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder:text-slate-400"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed px-6 py-3 text-sm font-semibold text-white transition-colors whitespace-nowrap flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Scanning...
                </>
              ) : (
                "Find Expansion Opportunities"
              )}
            </button>
          </div>

          <p className="mt-3 text-xs text-indigo-400">
            Try: theranostics · cell therapy · proton therapy · robotic surgery · hospital-at-home
          </p>

          {/* Bright Data callout */}
          <p className="mt-3 text-xs text-indigo-300">
            Live signals sourced via{" "}
            <span className="font-semibold text-white">Bright Data</span> SERP API ·
            Scored by{" "}
            <span className="font-semibold text-white">Account Readiness Score</span>
          </p>
        </div>
      </section>

      {/* Results */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700 mb-6">
            Error: {error}
          </div>
        )}

        {data && (
          <>
            {/* Meta bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {data.meta.resultCount} accounts ranked by readiness
                </h2>
                <p className="text-sm text-slate-500">
                  Query:{" "}
                  <span className="font-medium text-slate-700">&ldquo;{data.query}&rdquo;</span>
                  {" · "}
                  {new Date(data.meta.fetchedAt).toLocaleTimeString()}
                </p>
              </div>
              <DataSourceBadge source={data.meta.source} aiEnabled={data.meta.aiEnabled} />
            </div>

            {/* Cards grid */}
            <div className="grid gap-5 md:grid-cols-2">
              {data.organizations.map((org, i) => (
                <OrgCard key={org.id} org={org} rank={i + 1} />
              ))}
            </div>

            {/* Evidence Ledger callout */}
            <div className="mt-8 rounded-xl border border-indigo-100 bg-indigo-50 px-6 py-4">
              <p className="text-sm text-indigo-700">
                <span className="font-semibold">Evidence Ledger</span> — each card's signals
                are sourced from live web data via Bright Data, including clinical trial
                registries, job boards, press releases, and regulatory filings. Every excerpt
                links to its original source.
              </p>
            </div>
          </>
        )}

        {!data && !loading && !error && (
          <div className="text-center py-20 text-slate-400">
            <div className="text-5xl mb-4">🦊</div>
            <p className="text-lg font-medium text-slate-600">
              Enter a therapy area and click{" "}
              <span className="text-indigo-600 font-semibold">
                Find Expansion Opportunities
              </span>
            </p>
            <p className="text-sm mt-2">
              Demo mode works with no API keys — live mode activates with Bright Data credentials.
            </p>
          </div>
        )}

        {loading && (
          <div className="grid gap-5 md:grid-cols-2 mt-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 h-64 animate-pulse"
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 px-4 text-center">
        <p className="text-xs text-slate-400">
          AccessFox · Healthcare account-readiness intelligence powered by{" "}
          <span className="font-semibold text-slate-600">Bright Data</span> live web infrastructure
          {" · "}Demo use case: radiopharmaceutical therapy / theranostics expansion
        </p>
      </footer>
    </div>
  );
}
