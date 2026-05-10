/* Option-shuffle support.
 *
 * Mirrors tools/letter_remap.py: same anchor patterns, same bijective
 * remap. Tested in Python against every shuffleable answer file in the
 * corpus (identity, bijection, structure, anchor-set invariants). The
 * Python tests pin the contract; this JS port has to match it.
 *
 * Exposes window.Shuffle:
 *   isShuffleable(question)          -> bool
 *   makePermutation(letters, rng?)   -> { origToDisp, dispToOrig }
 *   identityPermutation(letters)     -> { origToDisp, dispToOrig }
 *   displayOptions(question, perm)   -> [{displayLetter, originalLetter, text}]
 *   remapMarkdown(body, origToDisp)  -> string
 */
(function () {
  "use strict";

  function isShuffleable(q) {
    if (!q) return false;
    if (q.type !== "multiple-choice" && q.type !== "multi-select") return false;
    if (q.shuffle === false) return false;
    const opts = q.options || [];
    if (opts.length < 2) return false;
    if (opts.length < 3) {
      const yesNo = new Set(["yes", "no"]);
      const allYesNo = opts.every(o => yesNo.has((o.text || "").trim().toLowerCase()));
      if (allYesNo) return false;
    }
    return true;
  }

  function identityPermutation(letters) {
    const o2d = {}, d2o = {};
    letters.forEach(l => { o2d[l] = l; d2o[l] = l; });
    return { origToDisp: o2d, dispToOrig: d2o };
  }

  function makePermutation(letters, rng) {
    if (!letters || letters.length < 2) return identityPermutation(letters || []);
    const rand = rng || Math.random;
    const sorted = letters.slice().sort();
    let shuffled;
    for (let attempt = 0; attempt < 16; attempt++) {
      shuffled = sorted.slice();
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        const t = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = t;
      }
      let same = true;
      for (let k = 0; k < shuffled.length; k++) {
        if (shuffled[k] !== sorted[k]) { same = false; break; }
      }
      if (!same) break;
    }
    const o2d = {}, d2o = {};
    for (let i = 0; i < sorted.length; i++) {
      o2d[shuffled[i]] = sorted[i];
      d2o[sorted[i]] = shuffled[i];
    }
    return { origToDisp: o2d, dispToOrig: d2o };
  }

  function displayOptions(q, perm) {
    const opts = (q.options || []).slice();
    if (!perm) {
      return opts.map(o => ({
        displayLetter: o.letter, originalLetter: o.letter, text: o.text,
      }));
    }
    const out = opts.map(o => ({
      displayLetter: perm.origToDisp[o.letter] || o.letter,
      originalLetter: o.letter,
      text: o.text,
    }));
    out.sort((a, b) => a.displayLetter.localeCompare(b.displayLetter));
    return out;
  }

  /* ---------- markdown remap ---------- */

  // Anchor patterns. MUST stay in sync with tools/letter_remap.py.
  const HEADER_SINGLE       = /^#{2,}\s+Why\s+([A-Z])\s+(?:is|are)\s+(?:correct|wrong|incorrect)\b/gm;
  const HEADER_COMPOUND     = /^#{2,}\s+Why\s+([A-Z](?:\s*(?:,|and|&)\s*[A-Z])+)\s+(?:is|are)\s+(?:correct|wrong|incorrect)\b/gm;
  const CORRECT_ANSWER_BLK  = /\*\*Correct\s+answers?\s*:[^*]*?\*\*/gi;
  const LETTER_DOT_INSIDE   = /\b([A-Z])\.\s/g;
  const BOLD_LETTER_DOT     = /\*\*([A-Z])\.\s/g;
  const BOLD_LETTER_ALONE   = /\*\*([A-Z])\*\*/g;
  const PAREN_SINGLE        = /\(([A-Z])\)/g;

  // No-touch regions: code blocks, inline code, URLs, and link target spans.
  const FENCED_CODE = /```[\s\S]*?```/g;
  const INLINE_CODE = /`[^`]*`/g;
  const URLS        = /https?:\/\/\S+/g;
  const LINK_TARGET = /\]\(([^)]*)\)/g;

  function noTouchSpans(body) {
    const spans = [];
    function collect(re, useG1) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(body)) !== null) {
        if (useG1) spans.push([m.index + (m[0].indexOf(m[1])), m.index + (m[0].indexOf(m[1])) + m[1].length]);
        else spans.push([m.index, m.index + m[0].length]);
        if (m[0].length === 0) re.lastIndex++;
      }
    }
    collect(FENCED_CODE, false);
    collect(INLINE_CODE, false);
    collect(URLS, false);
    collect(LINK_TARGET, true);
    return spans;
  }

  function inSpans(pos, spans) {
    for (let i = 0; i < spans.length; i++) {
      if (pos >= spans[i][0] && pos < spans[i][1]) return true;
    }
    return false;
  }

  function isIdentityMap(map) {
    if (!map) return true;
    const keys = Object.keys(map);
    if (keys.length === 0) return true;
    for (const k of keys) if (map[k] !== k) return false;
    return true;
  }

  function remapMarkdown(body, letterMap) {
    if (typeof body !== "string" || !body) return body || "";
    if (isIdentityMap(letterMap)) return body;

    const noTouch = noTouchSpans(body);
    const rewrites = new Map(); // pos -> [original, new]

    function add(pos, original) {
      const target = letterMap[original];
      if (!target || target === original) return;
      if (inSpans(pos, noTouch)) return;
      const existing = rewrites.get(pos);
      if (existing && (existing[0] !== original || existing[1] !== target)) {
        throw new Error("Conflicting rewrite at " + pos);
      }
      rewrites.set(pos, [original, target]);
    }

    function eachMatch(re, fn) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(body)) !== null) {
        fn(m);
        if (m[0].length === 0) re.lastIndex++;
      }
    }

    eachMatch(HEADER_SINGLE, (m) => {
      add(m.index + m[0].lastIndexOf(m[1]), m[1]);
    });

    eachMatch(HEADER_COMPOUND, (m) => {
      const g1 = m[1];
      const g1Start = m.index + m[0].indexOf(g1);
      for (let i = 0; i < g1.length; i++) {
        const ch = g1.charAt(i);
        if (ch >= "A" && ch <= "Z") add(g1Start + i, ch);
      }
    });

    eachMatch(CORRECT_ANSWER_BLK, (m) => {
      const block = m[0];
      const blockStart = m.index;
      LETTER_DOT_INSIDE.lastIndex = 0;
      let lm;
      while ((lm = LETTER_DOT_INSIDE.exec(block)) !== null) {
        const letterPosInBlock = lm.index + lm[0].indexOf(lm[1]);
        add(blockStart + letterPosInBlock, lm[1]);
        if (lm[0].length === 0) LETTER_DOT_INSIDE.lastIndex++;
      }
    });

    eachMatch(BOLD_LETTER_DOT, (m) => {
      add(m.index + m[0].indexOf(m[1]), m[1]);
    });

    eachMatch(BOLD_LETTER_ALONE, (m) => {
      add(m.index + m[0].indexOf(m[1]), m[1]);
    });

    eachMatch(PAREN_SINGLE, (m) => {
      add(m.index + m[0].indexOf(m[1]), m[1]);
    });

    if (rewrites.size === 0) return body;

    const positions = Array.from(rewrites.keys()).sort((a, b) => a - b);
    let out = "";
    let last = 0;
    for (const pos of positions) {
      const [original, replacement] = rewrites.get(pos);
      if (body.charAt(pos) !== original) {
        throw new Error("Rewrite mismatch at " + pos + ": expected " + original + " got " + body.charAt(pos));
      }
      out += body.substring(last, pos) + replacement;
      last = pos + 1;
    }
    out += body.substring(last);
    return out;
  }

  window.Shuffle = {
    isShuffleable,
    identityPermutation,
    makePermutation,
    displayOptions,
    remapMarkdown,
  };
})();
