(() => {
  "use strict";

  const SESSION_KEY = "practice_session_v1";
  const slideEl = document.getElementById("slide");
  const revealBtn = document.getElementById("reveal-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const progressNum = document.getElementById("progress-num");
  const progressTotal = document.getElementById("progress-total");
  const progressFill = document.getElementById("progress-fill");

  let questions = [];
  let order = [];
  let cursor = 0;
  let revealed = false;
  let picks = null;

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function loadSession() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.order)) return null;
      return parsed;
    } catch (_) { return null; }
  }

  function saveSession() {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ order, cursor }));
  }

  function clearSession() { sessionStorage.removeItem(SESSION_KEY); }

  function startNewSession() {
    order = shuffle(questions.map((_, i) => i));
    cursor = 0;
    revealed = false;
    picks = null;
    saveSession();
    render();
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderMarkdown(md) {
    return window.marked ? window.marked.parse(md) : escapeHtml(md);
  }

  function normalize(s) {
    return String(s || "").trim().replace(/\s+/g, " ").replace(/\.$/, "").toLowerCase();
  }

  function topicLabel(t) { return `Topic ${t}`; }

  function typeLabel(t) {
    return ({
      "multiple-choice": "Multiple Choice",
      "multi-select": "Multi-Select",
      "hotspot": "Hotspot",
      "drag-drop": "Drag & Drop",
    })[t] || t;
  }

  function initPicksFor(q) {
    switch (q.type) {
      case "multiple-choice": return { letter: null };
      case "multi-select": return { set: new Set() };
      case "hotspot": return { slots: q.slots ? q.slots.map(() => null) : [] };
      case "drag-drop": return { targets: q.targets ? q.targets.map(() => null) : [] };
      default: return { letter: null };
    }
  }

  function hasAnyPicks(q, p) {
    if (!p) return false;
    switch (q.type) {
      case "multiple-choice": return p.letter !== null;
      case "multi-select": return p.set && p.set.size > 0;
      case "hotspot": return p.slots && p.slots.some(x => x !== null);
      case "drag-drop": return p.targets && p.targets.some(x => x !== null);
      default: return false;
    }
  }

  function renderHeader(q) {
    const tags = [
      `<span class="tag">${topicLabel(q.topic)} · Q${q.question_number}</span>`,
      `<span class="tag tag-type">${typeLabel(q.type)}</span>`,
    ];
    if (q.case_study) {
      tags.push(`<span class="tag tag-case">Case Study: ${escapeHtml(q.case_study)}</span>`);
    }
    return `<div class="slide-meta">${tags.join("")}</div>
            <div class="question-text">${renderMarkdown(q.question_text || "")}</div>`;
  }

  function renderMultipleChoice(q) {
    const correct = new Set(q.correct_letters || []);
    const optsHtml = (q.options || []).map(opt => {
      const isPicked = picks.letter === opt.letter;
      const isCorrect = correct.has(opt.letter);
      let cls = "option";
      if (revealed) {
        if (isCorrect) cls += " correct";
        else if (isPicked) cls += " wrong";
      } else if (isPicked) {
        cls += " picked";
      }
      const dis = revealed ? "disabled" : "";
      return `<button class="${cls}" data-letter="${opt.letter}" ${dis}>
        <span class="option-letter">${opt.letter}</span>
        <span class="option-text">${escapeHtml(opt.text)}</span>
      </button>`;
    }).join("");
    return `<div class="options">${optsHtml}</div>`;
  }

  function renderMultiSelect(q) {
    const correct = new Set(q.correct_letters || []);
    const optsHtml = (q.options || []).map(opt => {
      const isPicked = picks.set.has(opt.letter);
      const isCorrect = correct.has(opt.letter);
      let cls = "option option-checkable";
      if (revealed) {
        if (isCorrect && isPicked) cls += " correct";
        else if (isCorrect && !isPicked) cls += " missed";
        else if (!isCorrect && isPicked) cls += " wrong";
      } else if (isPicked) {
        cls += " picked";
      }
      const dis = revealed ? "disabled" : "";
      return `<button class="${cls}" data-letter="${opt.letter}" ${dis}>
        <span class="option-checkbox">${isPicked ? "✓" : ""}</span>
        <span class="option-letter">${opt.letter}</span>
        <span class="option-text">${escapeHtml(opt.text)}</span>
      </button>`;
    }).join("");
    return `<div class="options" data-multi="true">${optsHtml}</div>`;
  }

  function renderSlot(label, options, picked, correct, idx) {
    let cls = "slot";
    let resultHtml = "";
    let selectHtml = "";
    if (revealed) {
      const isRight = picked && normalize(picked) === normalize(correct);
      cls += isRight ? " slot-correct" : " slot-wrong";
      if (isRight) {
        resultHtml = `<div class="slot-result">
          <span class="slot-pick correct-pick">${escapeHtml(picked)}</span>
          <span class="slot-icon">✓</span>
        </div>`;
      } else if (picked) {
        resultHtml = `<div class="slot-result">
          <span class="slot-pick wrong-pick">${escapeHtml(picked)}</span>
          <span class="slot-icon">✗</span>
          <div class="slot-correct-text">Correct: <strong>${escapeHtml(correct || "")}</strong></div>
        </div>`;
      } else {
        resultHtml = `<div class="slot-result">
          <span class="slot-pick empty-pick">(no selection)</span>
          <div class="slot-correct-text">Correct: <strong>${escapeHtml(correct || "")}</strong></div>
        </div>`;
      }
    } else {
      const optsHtml = ['<option value="">— select —</option>']
        .concat(options.map(o => `<option value="${escapeHtml(o)}" ${picked === o ? "selected" : ""}>${escapeHtml(o)}</option>`))
        .join("");
      selectHtml = `<select class="slot-select" data-idx="${idx}">${optsHtml}</select>`;
    }
    return `<div class="${cls}">
      <div class="slot-label">${escapeHtml(label)}</div>
      ${selectHtml}
      ${resultHtml}
    </div>`;
  }

  function renderHotspot(q) {
    const slotsHtml = (q.slots || []).map((slot, i) => {
      return renderSlot(slot.label, slot.options, picks.slots[i], slot.correct, i);
    }).join("");
    return `<div class="slots" data-kind="hotspot">${slotsHtml}</div>`;
  }

  function renderDragDrop(q) {
    const sourcesHtml = revealed ? "" : `
      <div class="dnd-sources">
        <div class="dnd-sources-label">Available items</div>
        <ul>${(q.sources || []).map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
      </div>`;
    const targetsHtml = (q.targets || []).map((tgt, i) => {
      return renderSlot(tgt.label, q.sources || [], picks.targets[i], tgt.correct, i);
    }).join("");
    return `${sourcesHtml}<div class="slots" data-kind="drag-drop">${targetsHtml}</div>`;
  }

  function gradeAll(q) {
    switch (q.type) {
      case "multiple-choice": {
        const correct = new Set(q.correct_letters || []);
        if (!picks.letter) return "skipped";
        return correct.has(picks.letter) ? "correct" : "wrong";
      }
      case "multi-select": {
        const correct = new Set(q.correct_letters || []);
        if (picks.set.size === 0) return "skipped";
        if (picks.set.size !== correct.size) return "wrong";
        for (const l of picks.set) if (!correct.has(l)) return "wrong";
        return "correct";
      }
      case "hotspot": {
        const slots = q.slots || [];
        let any = false, allRight = true;
        slots.forEach((s, i) => {
          if (picks.slots[i]) any = true;
          if (normalize(picks.slots[i]) !== normalize(s.correct)) allRight = false;
        });
        if (!any) return "skipped";
        return allRight ? "correct" : "wrong";
      }
      case "drag-drop": {
        const targets = q.targets || [];
        let any = false, allRight = true;
        targets.forEach((t, i) => {
          if (picks.targets[i]) any = true;
          if (normalize(picks.targets[i]) !== normalize(t.correct)) allRight = false;
        });
        if (!any) return "skipped";
        return allRight ? "correct" : "wrong";
      }
    }
    return "skipped";
  }

  function renderVerdict(q) {
    if (!revealed) return "";
    const v = gradeAll(q);
    if (v === "correct") {
      return `<div class="verdict verdict-correct">✓ Correct</div>`;
    } else if (v === "wrong") {
      const total = q.type === "hotspot" ? (q.slots || []).length
                  : q.type === "drag-drop" ? (q.targets || []).length
                  : null;
      let detail = "Incorrect";
      if (total !== null) {
        let right = 0;
        if (q.type === "hotspot") {
          (q.slots || []).forEach((s, i) => { if (normalize(picks.slots[i]) === normalize(s.correct)) right++; });
        } else if (q.type === "drag-drop") {
          (q.targets || []).forEach((t, i) => { if (normalize(picks.targets[i]) === normalize(t.correct)) right++; });
        }
        detail = `${right} of ${total} correct`;
      }
      return `<div class="verdict verdict-wrong">✗ ${detail} — see explanation below</div>`;
    } else {
      return `<div class="verdict verdict-revealed">Answer revealed — see explanation below</div>`;
    }
  }

  function renderExplanation(q) {
    if (!revealed) return "";
    const md = (q.explanation_md || "").replace(/^#\s+.*$/m, "").trim();
    return `<div class="explanation">${renderMarkdown(md)}</div>`;
  }

  function render() {
    if (cursor >= order.length) { renderSummary(); return; }
    const q = questions[order[cursor]];
    progressNum.textContent = String(cursor + (revealed ? 1 : 0));
    progressTotal.textContent = String(order.length);
    progressFill.style.width = ((cursor + (revealed ? 1 : 0)) / order.length) * 100 + "%";

    if (!picks) picks = initPicksFor(q);

    let bodyHtml = "";
    switch (q.type) {
      case "multiple-choice": bodyHtml = renderMultipleChoice(q); break;
      case "multi-select": bodyHtml = renderMultiSelect(q); break;
      case "hotspot": bodyHtml = renderHotspot(q); break;
      case "drag-drop": bodyHtml = renderDragDrop(q); break;
      default: bodyHtml = renderMultipleChoice(q);
    }

    slideEl.innerHTML =
      renderHeader(q) +
      bodyHtml +
      renderVerdict(q) +
      renderExplanation(q);

    attachHandlers(q);
    updateFooter(q);
  }

  function attachHandlers(q) {
    if (revealed) return;
    if (q.type === "multiple-choice") {
      slideEl.querySelectorAll(".option").forEach(btn => {
        btn.addEventListener("click", () => {
          picks.letter = btn.dataset.letter;
          revealed = true;
          saveSession();
          render();
        });
      });
    } else if (q.type === "multi-select") {
      slideEl.querySelectorAll(".option").forEach(btn => {
        btn.addEventListener("click", () => {
          const l = btn.dataset.letter;
          if (picks.set.has(l)) picks.set.delete(l);
          else picks.set.add(l);
          render();
        });
      });
    } else if (q.type === "hotspot" || q.type === "drag-drop") {
      const arr = q.type === "hotspot" ? picks.slots : picks.targets;
      slideEl.querySelectorAll(".slot-select").forEach(sel => {
        sel.addEventListener("change", () => {
          const i = parseInt(sel.dataset.idx, 10);
          arr[i] = sel.value || null;
        });
      });
    }
  }

  function updateFooter(q) {
    const isClickAuto = q.type === "multiple-choice";
    if (revealed) {
      revealBtn.hidden = true;
      nextBtn.hidden = false;
      restartBtn.hidden = false;
      nextBtn.textContent = cursor === order.length - 1 ? "Finish" : "Next Question";
    } else {
      if (isClickAuto) {
        revealBtn.hidden = true;
      } else {
        revealBtn.hidden = false;
        revealBtn.textContent = hasAnyPicks(q, picks) ? "Submit Answer" : "Show Answer";
      }
      nextBtn.hidden = true;
      restartBtn.hidden = true;
    }
  }

  function submit() {
    if (revealed || cursor >= order.length) return;
    revealed = true;
    saveSession();
    render();
  }

  function next() {
    if (!revealed) return;
    cursor += 1;
    revealed = false;
    picks = null;
    saveSession();
    render();
  }

  function renderSummary() {
    progressNum.textContent = String(order.length);
    progressFill.style.width = "100%";
    slideEl.innerHTML = `
      <div class="summary">
        <h2>Session complete</h2>
        <p>You worked through every question in this session.</p>
        <div class="stat-row">
          <div>
            <span class="stat-num">${order.length}</span>
            <span class="stat-label">Questions reviewed</span>
          </div>
          <div>
            <span class="stat-num">${questions.length}</span>
            <span class="stat-label">Total in bank</span>
          </div>
        </div>
        <p>Click <strong>Start New Session</strong> below to reshuffle.</p>
      </div>`;
    revealBtn.hidden = true;
    nextBtn.hidden = true;
    restartBtn.hidden = false;
  }

  revealBtn.addEventListener("click", submit);
  nextBtn.addEventListener("click", next);
  restartBtn.addEventListener("click", () => { clearSession(); startNewSession(); });

  document.addEventListener("keydown", e => {
    const tag = e.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if (e.code === "Space" && !revealBtn.hidden) {
      e.preventDefault();
      submit();
    } else if (e.code === "ArrowRight" && !nextBtn.hidden) {
      e.preventDefault();
      next();
    }
  });

  fetch("questions.json", { cache: "no-store" })
    .then(r => {
      if (!r.ok) throw new Error("Failed to load questions.json: " + r.status);
      return r.json();
    })
    .then(data => {
      questions = (data.questions || []).slice();
      if (questions.length === 0) {
        slideEl.innerHTML = `<div class="slide-loading">No questions found. Run <code>build.py</code> first.</div>`;
        return;
      }
      const saved = loadSession();
      if (saved && saved.order.length === questions.length) {
        order = saved.order;
        cursor = saved.cursor || 0;
      } else {
        order = shuffle(questions.map((_, i) => i));
        cursor = 0;
        saveSession();
      }
      revealed = false;
      picks = null;
      render();
    })
    .catch(err => {
      slideEl.innerHTML = `<div class="slide-loading">Error: ${escapeHtml(err.message)}<br><br>If running locally, serve this folder over HTTP (e.g. <code>py -m http.server</code>) — opening index.html directly will block fetch().</div>`;
    });
})();
