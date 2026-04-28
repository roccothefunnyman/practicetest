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
  let pickedLetter = null;

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
    } catch (_) {
      return null;
    }
  }

  function saveSession() {
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ order, cursor })
    );
  }

  function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
  }

  function startNewSession() {
    order = shuffle(questions.map((_, i) => i));
    cursor = 0;
    revealed = false;
    pickedLetter = null;
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

  function answerLetters(answerStr) {
    if (!answerStr) return [];
    const letters = answerStr.match(/\b[A-Z]\b/g);
    return letters ? Array.from(new Set(letters)) : [];
  }

  function isClickToAnswer(q) {
    if (q.type !== "multiple-choice") return false;
    if (!q.options || q.options.length === 0) return false;
    const letters = answerLetters(q.answer);
    return letters.length === 1;
  }

  function topicLabel(t) {
    return `Topic ${t}`;
  }

  function typeLabel(t) {
    const map = {
      "multiple-choice": "Multiple Choice",
      "multi-select": "Multi-Select",
      "hotspot": "Hotspot",
      "drag-drop": "Drag & Drop",
      "yes-no-series": "Yes / No Series",
    };
    return map[t] || t;
  }

  function render() {
    if (cursor >= order.length) {
      renderSummary();
      return;
    }
    const q = questions[order[cursor]];
    const totalAnswered = cursor;
    progressNum.textContent = String(totalAnswered + (revealed ? 1 : 0));
    progressTotal.textContent = String(order.length);
    progressFill.style.width =
      ((totalAnswered + (revealed ? 1 : 0)) / order.length) * 100 + "%";

    const tags = [
      `<span class="tag">${topicLabel(q.topic)} · Q${q.question_number}</span>`,
      `<span class="tag tag-type">${typeLabel(q.type)}</span>`,
    ];
    if (q.case_study) {
      tags.push(`<span class="tag tag-case">Case Study: ${escapeHtml(q.case_study)}</span>`);
    }

    const clickMode = isClickToAnswer(q);
    const correctLetters = answerLetters(q.answer);
    const correctSet = new Set(correctLetters);

    let optionsHtml = "";
    if (q.options && q.options.length > 0) {
      optionsHtml = `<div class="options">${q.options
        .map((opt) => {
          const isCorrect = correctSet.has(opt.letter);
          const isPicked = pickedLetter === opt.letter;
          let cls = "option";
          if (revealed) {
            if (isCorrect) cls += " correct";
            else if (isPicked) cls += " wrong";
          } else if (isPicked) {
            cls += " picked";
          }
          const disabled = revealed ? "disabled" : "";
          return `<button class="${cls}" data-letter="${opt.letter}" ${disabled}>
            <span class="option-letter">${opt.letter}</span>
            <span class="option-text">${escapeHtml(opt.text)}</span>
          </button>`;
        })
        .join("")}</div>`;
    }

    let verdictHtml = "";
    if (revealed) {
      if (clickMode && pickedLetter) {
        const correct = correctSet.has(pickedLetter);
        verdictHtml = `<div class="verdict ${correct ? "verdict-correct" : "verdict-wrong"}">
          ${correct ? "✓ Correct" : `✗ Incorrect — correct answer: ${escapeHtml(q.answer)}`}
        </div>`;
      } else {
        verdictHtml = `<div class="verdict verdict-revealed">
          Answer: ${escapeHtml(q.answer || "(see explanation)")}
        </div>`;
      }
    }

    let explanationHtml = "";
    if (revealed) {
      const md = q.explanation_md || "";
      const cleaned = md.replace(/^#\s+.*$/m, "").trim();
      const rendered = window.marked ? window.marked.parse(cleaned) : escapeHtml(cleaned);
      explanationHtml = `<div class="explanation">${rendered}</div>`;
    }

    slideEl.innerHTML = `
      <div class="slide-meta">${tags.join("")}</div>
      <div class="question-text">${escapeHtml(q.question_text)}</div>
      ${optionsHtml}
      ${verdictHtml}
      ${explanationHtml}
    `;

    if (clickMode && !revealed) {
      slideEl.querySelectorAll(".option").forEach((btn) => {
        btn.addEventListener("click", () => {
          pickedLetter = btn.dataset.letter;
          revealed = true;
          saveSession();
          render();
        });
      });
    }

    revealBtn.hidden = clickMode || revealed;
    nextBtn.hidden = !revealed;
    restartBtn.hidden = !revealed;

    nextBtn.textContent = cursor === order.length - 1 ? "Finish" : "Next Question";
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
        <p>Click <strong>Start New Session</strong> below to reshuffle and go again.</p>
      </div>
    `;
    revealBtn.hidden = true;
    nextBtn.hidden = true;
    restartBtn.hidden = false;
  }

  function reveal() {
    if (revealed || cursor >= order.length) return;
    revealed = true;
    saveSession();
    render();
  }

  function next() {
    if (!revealed) return;
    cursor += 1;
    revealed = false;
    pickedLetter = null;
    saveSession();
    render();
  }

  revealBtn.addEventListener("click", reveal);
  nextBtn.addEventListener("click", next);
  restartBtn.addEventListener("click", () => {
    clearSession();
    startNewSession();
  });

  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    if (e.code === "Space" && !revealBtn.hidden) {
      e.preventDefault();
      reveal();
    } else if (e.code === "ArrowRight" && !nextBtn.hidden) {
      e.preventDefault();
      next();
    }
  });

  fetch("questions.json", { cache: "no-store" })
    .then((r) => {
      if (!r.ok) throw new Error("Failed to load questions.json: " + r.status);
      return r.json();
    })
    .then((data) => {
      questions = (data.questions || []).slice();
      if (questions.length === 0) {
        slideEl.innerHTML = `<div class="slide-loading">No questions found. Run <code>build.py</code> first.</div>`;
        return;
      }
      const saved = loadSession();
      if (saved && saved.order.length === questions.length) {
        order = saved.order;
        cursor = saved.cursor || 0;
        revealed = false;
        pickedLetter = null;
        render();
      } else {
        startNewSession();
      }
    })
    .catch((err) => {
      slideEl.innerHTML = `<div class="slide-loading">Error: ${escapeHtml(err.message)}<br><br>If running locally, serve this folder over HTTP (e.g. <code>python -m http.server</code>) — opening index.html directly will block fetch().</div>`;
    });
})();
