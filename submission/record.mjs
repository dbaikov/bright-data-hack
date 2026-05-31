import { chromium } from "playwright";
import { execSync, spawn } from "child_process";
import { existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = __dirname;
const FRAMES_DIR = join(OUT_DIR, "frames");
const AUDIO_FILE = join(OUT_DIR, "narration.aiff");
const OUTPUT_MP4 = join(OUT_DIR, "accessfox-demo.mp4");

mkdirSync(FRAMES_DIR, { recursive: true });

// Narration timing: [seconds, action_label]
const TIMELINE = [
  { t: 0,    action: "homepage" },
  { t: 5,    action: "hover_examples" },
  { t: 9,    action: "clear_and_type" },
  { t: 16,   action: "click_search" },
  { t: 18,   action: "show_loading" },
  { t: 32,   action: "results_badge" },
  { t: 42,   action: "scroll_cards" },
  { t: 52,   action: "score_ring" },
  { t: 60,   action: "evidence_ledger" },
  { t: 70,   action: "why_now" },
  { t: 78,   action: "scroll_top" },
  { t: 85,   action: "end" },
];

const FPS = 10;
const TOTAL_SECONDS = 88;
const TOTAL_FRAMES = TOTAL_SECONDS * FPS;

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function captureFrames(page, startSec, endSec, label) {
  const frames = Math.round((endSec - startSec) * FPS);
  console.log(`  Capturing ${frames} frames for: ${label}`);
  for (let i = 0; i < frames; i++) {
    const frameNum = Math.round(startSec * FPS) + i;
    const padded = String(frameNum).padStart(5, "0");
    await page.screenshot({ path: join(FRAMES_DIR, `frame_${padded}.png`) });
    await sleep(1000 / FPS);
  }
}

(async () => {
  console.log("Starting AccessFox demo recording...");

  const browser = await chromium.launch({
    headless: true,
    args: ["--window-size=1280,800"],
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  // ── 0s: Homepage ──────────────────────────────────────────────
  console.log("[0s] Loading homepage...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await sleep(500);
  await captureFrames(page, 0, 5, "homepage");

  // ── 5s: Hover example terms ───────────────────────────────────
  console.log("[5s] Hovering example terms...");
  await page.hover("text=theranostics").catch(() => {});
  await sleep(300);
  await captureFrames(page, 5, 9, "examples");

  // ── 9s: Clear input and type search term ──────────────────────
  console.log("[9s] Typing search term...");
  const input = page.locator("input[type=text]");
  await input.click({ clickCount: 3 });
  await input.type("radiopharmaceutical therapy / theranostics adoption readiness", { delay: 60 });
  await captureFrames(page, 9, 16, "typing");

  // ── 16s: Click search ─────────────────────────────────────────
  console.log("[16s] Clicking Find Expansion Opportunities...");
  await page.click("button:has-text('Find Expansion Opportunities')");
  await captureFrames(page, 16, 18, "click");

  // ── 18s: Loading skeletons ────────────────────────────────────
  console.log("[18s] Showing loading state...");
  await captureFrames(page, 18, 32, "loading");

  // ── 32s: Wait for results, show badge ─────────────────────────
  console.log("[32s] Waiting for results...");
  await page.waitForSelector("text=accounts ranked by readiness", { timeout: 60000 }).catch(() => {});
  await sleep(500);

  // Scroll to badge
  await page.evaluate(() => {
    const el = document.querySelector("[class*='green']");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  await sleep(500);
  await captureFrames(page, 32, 42, "badge");

  // ── 42s: Scroll through cards ─────────────────────────────────
  console.log("[42s] Scrolling through cards...");
  await page.evaluate(() => window.scrollBy({ top: 400, behavior: "smooth" }));
  await sleep(600);
  await captureFrames(page, 42, 52, "cards");

  // ── 52s: Highlight score ring ─────────────────────────────────
  console.log("[52s] Highlighting score ring...");
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: "smooth" }));
  await sleep(400);
  await captureFrames(page, 52, 60, "score");

  // ── 60s: Evidence ledger ─────────────────────────────────────
  console.log("[60s] Showing evidence ledger...");
  await page.evaluate(() => {
    const el = document.querySelector("[class*='Evidence']") ||
      [...document.querySelectorAll("h4")].find(h => h.textContent.includes("Evidence"));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  await sleep(600);
  await captureFrames(page, 60, 70, "evidence");

  // ── 70s: Why Now + Recommended Action ────────────────────────
  console.log("[70s] Showing Why Now / Recommended Action...");
  await page.evaluate(() => window.scrollBy({ top: 300, behavior: "smooth" }));
  await sleep(400);
  await captureFrames(page, 70, 78, "why_now");

  // ── 78s: Scroll back to top ───────────────────────────────────
  console.log("[78s] Scrolling back to top...");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await sleep(800);
  await captureFrames(page, 78, 88, "end");

  await browser.close();
  console.log("✓ Frame capture complete");

  // ── Combine frames into video with narration ──────────────────
  console.log("Combining frames + audio into MP4...");
  execSync(
    `ffmpeg -y \
      -framerate ${FPS} \
      -pattern_type glob \
      -i "${FRAMES_DIR}/frame_?????.png" \
      -i "${AUDIO_FILE}" \
      -c:v libx264 \
      -pix_fmt yuv420p \
      -c:a aac \
      -shortest \
      -vf "scale=1280:800" \
      "${OUTPUT_MP4}"`,
    { stdio: "inherit" }
  );

  console.log(`\n✅ Done! Video saved to: ${OUTPUT_MP4}`);
})().catch((err) => {
  console.error("Recording failed:", err);
  process.exit(1);
});
