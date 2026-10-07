// One-time copy of images from the old WordPress site into src/work/wp-content/uploads,
// keeping the same paths so old image links keep working.
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const OLD = "https://mikelwashington.com";
const external = JSON.parse(readFileSync("scripts/external-images.json", "utf8"));
const files = ["src/bio.md", ...readdirSync("src/projects").filter(f => f.endsWith(".md")).map(f => join("src/projects", f))];
const paths = new Set();
for (const f of files) for (const m of readFileSync(f, "utf8").matchAll(/\/work\/wp-content\/uploads\/[^\s"')]+/g)) paths.add(m[0]);

let ok = 0, failed = [];
for (const p of paths) {
  const dest = join("src", p);
  if (existsSync(dest)) { ok++; continue; }
  const url = external[p] ?? OLD + p;
  const res = await fetch(url);
  if (!res.ok) { failed.push(`${res.status} ${url}`); continue; }
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  ok++;
}
console.log(`${ok}/${paths.size} images ready`);
if (failed.length) { console.log("Failed:\n" + failed.join("\n")); process.exitCode = 1; }
