export const isLive = !!process.env.BRIGHTDATA_PROXY_URL;

export interface SerpResult {
  title: string;
  snippet: string;
  url: string;
}

export async function searchSignals(query: string): Promise<SerpResult[]> {
  if (!isLive) return [];

  const proxyUrl = process.env.BRIGHTDATA_PROXY_URL!;
  const { ProxyAgent, fetch: undiciFetch } = await import("undici");

  const dispatcher = new ProxyAgent({
    uri: proxyUrl,
    proxyTls: { rejectUnauthorized: false },
    requestTls: { rejectUnauthorized: false },
  });

  const searchUrl = new URL("https://www.google.com/search");
  searchUrl.searchParams.set("q", `${query} hospital health system expansion adoption`);
  searchUrl.searchParams.set("num", "20");
  searchUrl.searchParams.set("gl", "us");
  searchUrl.searchParams.set("hl", "en");

  const res = await undiciFetch(searchUrl.toString(), {
    dispatcher,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "en-US,en;q=0.9",
    },
    signal: AbortSignal.timeout(12000),
  });

  console.log("[brightdata] status:", res.status);
  if (!res.ok) {
    console.error("[brightdata] error:", res.status);
    return [];
  }

  const html = await res.text();
  console.log("[brightdata] html length:", html.length);

  // Strip scripts and styles
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");

  const results: SerpResult[] = [];

  // Extract direct https:// hrefs from raw HTML (Google returns direct URLs)
  const urlRe = /href="(https?:\/\/[^"]{10,})"/g;
  const urls: string[] = [];
  let um;
  while ((um = urlRe.exec(html)) !== null) {
    const u = um[1];
    if (
      !u.includes("google.") &&
      !u.includes("gstatic.com") &&
      !u.includes("youtube.com") &&
      !u.includes("accounts.") &&
      !u.includes("support.google") &&
      !urls.includes(u)
    ) {
      urls.push(u);
    }
  }

  // Extract visible text blocks from stripped HTML
  const textBlocks = stripped
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .match(/[A-Za-z][^.!?]{40,200}[.!?]/g) ?? [];

  console.log("[brightdata] urls found:", urls.length, "text blocks:", textBlocks.length);

  for (let i = 0; i < Math.min(urls.length, 20); i++) {
    results.push({
      url: urls[i],
      title: textBlocks[i * 2] ?? urls[i],
      snippet: textBlocks[i * 2 + 1] ?? "",
    });
  }

  console.log("[brightdata] serpResults count:", results.length);
  return results;
}
