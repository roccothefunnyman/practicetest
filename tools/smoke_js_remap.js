// Smoke-test the browser shuffle.js remap by loading it under a fake `window`
// and checking that remapMarkdown produces byte-identical output to the
// Python remap (which is tested against the full corpus). If this matches,
// we have high confidence the JS port matches the Python contract.
//
// Usage:
//   node tools/smoke_js_remap.js
//
// Compares JS output to Python output by spawning `py tools/remap_one.py`.

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

// Load shuffle.js into a fake window/document context
const shuffleSrc = fs.readFileSync(path.join(__dirname, "..", "app", "shuffle.js"), "utf-8");
const fakeWindow = {};
const fn = new Function("window", shuffleSrc);
fn(fakeWindow);
const Shuffle = fakeWindow.Shuffle;

if (!Shuffle || typeof Shuffle.remapMarkdown !== "function") {
  console.error("shuffle.js did not expose Shuffle.remapMarkdown");
  process.exit(1);
}

function readBody(qid) {
  const [topic, qstem] = qid.split("/");
  const file = path.join(__dirname, "..", "extracted", topic, qstem + "_answer.md");
  let raw = fs.readFileSync(file, "utf-8");
  if (raw.startsWith("---")) {
    const end = raw.indexOf("\n---", 3);
    if (end !== -1) raw = raw.substring(end + 4).replace(/^\n+/, "");
  }
  return raw;
}

function pyRemap(qid, perm) {
  const permArg = Object.entries(perm).map(([k, v]) => `${k}=${v}`).join(",");
  const out = execFileSync("py", [path.join(__dirname, "remap_one.py"), qid, permArg], { encoding: "utf-8" });
  return out;
}

// Build the full case list from questions.json: every shuffleable question
// gets a deterministic reverse permutation across its actual letter set.
const qjson = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "app", "questions.json"), "utf-8"));
const cases = [];
for (const q of qjson.questions) {
  if (!Shuffle.isShuffleable(q)) continue;
  const letters = (q.options || []).map(o => o.letter).sort();
  if (letters.length < 2) continue;
  const reversed = letters.slice().reverse();
  const perm = {};
  for (let i = 0; i < letters.length; i++) perm[letters[i]] = reversed[i];
  cases.push({ qid: q.id, perm });
}
console.log(`Smoke testing ${cases.length} shuffleable questions...`);

let failures = 0;
for (const { qid, perm } of cases) {
  const body = readBody(qid);

  const identity = {};
  Object.keys(perm).forEach(k => { identity[k] = k; });
  const idOut = Shuffle.remapMarkdown(body, identity);
  if (idOut !== body) {
    console.error(`FAIL identity ${qid}`);
    failures++;
    continue;
  }

  const jsOut = Shuffle.remapMarkdown(body, perm);
  const pyOut = pyRemap(qid, perm);
  if (jsOut !== pyOut) {
    console.error(`FAIL ${qid}: JS output differs from Python output`);
    let i = 0;
    while (i < jsOut.length && i < pyOut.length && jsOut[i] === pyOut[i]) i++;
    console.error(`  first divergence at offset ${i}:`);
    console.error(`  js: ${JSON.stringify(jsOut.substring(Math.max(0, i - 30), i + 30))}`);
    console.error(`  py: ${JSON.stringify(pyOut.substring(Math.max(0, i - 30), i + 30))}`);
    failures++;
    continue;
  }

  // Bijection: invert perm, remap twice, expect original
  const inv = {};
  Object.entries(perm).forEach(([k, v]) => { inv[v] = k; });
  const back = Shuffle.remapMarkdown(jsOut, inv);
  if (back !== body) {
    console.error(`FAIL bijection ${qid}`);
    failures++;
    continue;
  }

}
console.log(`${cases.length - failures} / ${cases.length} OK`);

if (failures > 0) {
  console.error(`${failures} smoke test(s) failed`);
  process.exit(1);
}
console.log("All smoke tests passed");
