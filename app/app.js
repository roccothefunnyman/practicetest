(() => {
  "use strict";

  const SESSION_KEY = "practice_session_v1";
  const STATS_KEY = "quiz_stats_v1";
  const THEME_KEY = "quiz_theme";
  const VOICE_KEY = "quiz_voice_v1";

  const slideEl = document.getElementById("slide");
  const revealBtn = document.getElementById("reveal-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const backBtn = document.getElementById("back-btn");
  const clearBtn = document.getElementById("clear-btn");
  const copyBtn = document.getElementById("copy-btn");
  const themeBtn = document.getElementById("theme-toggle");
  const resetStatsBtn = document.getElementById("reset-stats-btn");

  const overallAnsweredEl = document.getElementById("overall-answered");
  const overallTotalEl = document.getElementById("overall-total");
  const overallCorrectEl = document.getElementById("overall-correct");
  const overallWrongEl = document.getElementById("overall-wrong");
  const overallFillCorrect = document.getElementById("overall-fill-correct");
  const overallFillWrong = document.getElementById("overall-fill-wrong");
  const sectionGridEl = document.getElementById("section-grid");

  const csModal = document.getElementById("cs-modal");
  const csFrame = document.getElementById("cs-frame");
  const csTitle = document.getElementById("cs-title");

  const voiceSettingsBtn = document.getElementById("voice-settings-btn");
  const voiceOnlyBadge = document.getElementById("voice-only-badge");
  const voiceModalEl = document.getElementById("voice-modal");
  const voiceSelectEl = document.getElementById("voice-select");
  const voiceRateEl = document.getElementById("voice-rate");
  const voiceRateValEl = document.getElementById("voice-rate-val");
  const voiceOnlyToggleEl = document.getElementById("voice-only-toggle");
  const voiceTestBtn = document.getElementById("voice-test-btn");
  const voiceSupportNote = document.getElementById("voice-support-note");
  const listeningOverlay = document.getElementById("listening-overlay");
  const listeningTranscriptEl = document.getElementById("listening-transcript");
  const listeningCancelBtn = document.getElementById("listening-cancel");

  const pickerModalEl = document.getElementById("picker-modal");
  const pickerBodyEl = document.getElementById("picker-body");
  const pickerCountEl = document.getElementById("picker-count");
  const pickerBankTotalEl = document.getElementById("picker-bank-total");
  const pickerPresetsEl = document.getElementById("picker-presets");
  const pickerStartBtn = document.getElementById("picker-start");
  const newSessionBtn = document.getElementById("new-session-btn");

  const DOMAIN_FALLBACK = {
    plan:   { label: "Plan" },
    design: { label: "Design" },
    deploy: { label: "Deploy" },
  };

  const CASE_STUDY_PATHS = {
    Fabrikam: "../extracted/topic-1/case-study.html",
    Contoso:  "../extracted/topic-1/case-study-contoso.html",
  };

  let questions = [];
  let domains = DOMAIN_FALLBACK;
  let order = [];
  let cursor = 0;
  let revealed = false;
  let picks = null;
  let stats = loadStats();
  let pickerSelected = new Set();
  let voicePrefs = loadVoicePrefs();
  let activeListen = null;
  let isReading = false;
  let pendingAutoAdvance = null;

  /* ---------- Theme ---------- */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (themeBtn) {
      themeBtn.textContent = theme === "dark" ? "Light mode" : "Dark mode";
    }
    if (csFrame && csFrame.contentDocument && csFrame.contentDocument.documentElement) {
      try { csFrame.contentDocument.documentElement.setAttribute("data-theme", theme); } catch (_) {}
    }
  }
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") || "dark";
  }
  function initTheme() {
    let t = "dark";
    try { t = localStorage.getItem(THEME_KEY) || "dark"; } catch (_) {}
    applyTheme(t === "light" ? "light" : "dark");
  }
  themeBtn.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    try { localStorage.setItem(THEME_KEY, next); } catch (_) {}
    applyTheme(next);
  });

  /* ---------- Voice ---------- */
  function loadVoicePrefs() {
    try {
      const raw = localStorage.getItem(VOICE_KEY);
      if (!raw) return { voiceURI: null, rate: 1.0, voiceOnly: false };
      const parsed = JSON.parse(raw);
      return {
        voiceURI: parsed.voiceURI || null,
        rate: typeof parsed.rate === "number" ? parsed.rate : 1.0,
        voiceOnly: !!parsed.voiceOnly,
      };
    } catch (_) { return { voiceURI: null, rate: 1.0, voiceOnly: false }; }
  }
  function saveVoicePrefs() {
    try { localStorage.setItem(VOICE_KEY, JSON.stringify(voicePrefs)); } catch (_) {}
  }
  function reflectVoiceOnlyBadge() {
    voiceOnlyBadge.hidden = !voicePrefs.voiceOnly;
  }
  function questionPlainTextForRead(q) {
    const stem = (q.question_text || "").replace(/\s+/g, " ").trim();
    const lines = [stem];
    if (q.options && q.options.length) {
      lines.push("");
      q.options.forEach(opt => {
        lines.push(opt.letter + ". " + opt.text);
      });
    } else if (q.slots && q.slots.length) {
      lines.push("Hotspot question with " + q.slots.length + " selections to make.");
    } else if (q.targets && q.targets.length) {
      lines.push("Drag and drop with " + q.targets.length + " targets.");
    }
    return lines.join(". ");
  }
  function readCurrentQuestion() {
    if (!window.Voice || !Voice.hasTTS) return Promise.resolve();
    if (cursor >= order.length) return Promise.resolve();
    const q = questions[order[cursor]];
    const text = questionPlainTextForRead(q);
    isReading = true;
    setReadButtonState(true);
    return Voice.speak(text, { rate: voicePrefs.rate, voiceURI: voicePrefs.voiceURI })
      .catch(() => {})
      .finally(() => { isReading = false; setReadButtonState(false); });
  }
  function setReadButtonState(active) {
    const btn = slideEl.querySelector("[data-voice-read]");
    if (btn) btn.classList.toggle("is-active", !!active);
  }
  function toggleRead() {
    if (!window.Voice || !Voice.hasTTS) return;
    if (Voice.isSpeaking() || isReading) {
      Voice.cancel();
      isReading = false;
      setReadButtonState(false);
      return;
    }
    readCurrentQuestion();
  }
  function canVoiceAnswer(q) {
    return q && (q.type === "multiple-choice" || q.type === "multi-select");
  }
  function startListening() {
    if (!window.Voice || !Voice.hasASR) return;
    if (cursor >= order.length || revealed) return;
    const q = questions[order[cursor]];
    if (!canVoiceAnswer(q)) return;
    if (activeListen) { activeListen.stop(); return; }
    if (Voice.isSpeaking()) Voice.cancel();
    listeningOverlay.hidden = false;
    listeningTranscriptEl.textContent = "";
    setMicListeningClass(true);
    activeListen = Voice.listen({
      lang: "en-US",
      interim: true,
      onInterim: ({ transcript }) => { listeningTranscriptEl.textContent = transcript; },
      onResult: ({ transcript }) => {
        listeningTranscriptEl.textContent = transcript;
        handleSpokenAnswer(transcript, q);
      },
      onError: (e) => {
        const code = (e && e.error) || "error";
        if (code === "not-allowed" || code === "service-not-allowed") {
          alert("Microphone access was blocked. Enable mic in your browser settings to use voice answers.");
          if (voicePrefs.voiceOnly) {
            voicePrefs.voiceOnly = false;
            saveVoicePrefs();
            reflectVoiceOnlyBadge();
            voiceOnlyToggleEl.checked = false;
          }
        }
      },
      onEnd: () => {
        activeListen = null;
        listeningOverlay.hidden = true;
        setMicListeningClass(false);
      },
    });
    if (!activeListen) {
      listeningOverlay.hidden = true;
      setMicListeningClass(false);
    }
  }
  function stopListening() {
    if (activeListen) { activeListen.stop(); }
    activeListen = null;
    listeningOverlay.hidden = true;
    setMicListeningClass(false);
  }
  function setMicListeningClass(on) {
    const btn = slideEl.querySelector("[data-voice-mic]");
    if (btn) btn.classList.toggle("is-listening", !!on);
  }
  function handleSpokenAnswer(transcript, q) {
    if (!window.parseSpokenAnswer) return;
    const parsed = parseSpokenAnswer(transcript, q);
    if (parsed.skip) {
      stopListening();
      return;
    }
    if (parsed.letters.length === 0) {
      // No match. In voice-only, give a short audio nudge and re-listen.
      if (voicePrefs.voiceOnly) {
        Voice.speak("Sorry, I didn't catch that. Please say a letter.", { rate: voicePrefs.rate, voiceURI: voicePrefs.voiceURI })
          .then(() => { if (voicePrefs.voiceOnly) startListening(); }).catch(() => {});
      }
      return;
    }
    if (q.type === "multiple-choice") {
      picks.letter = parsed.letters[0];
      finalizeReveal(q);
    } else if (q.type === "multi-select") {
      picks.set = new Set(parsed.letters);
      finalizeReveal(q);
    }
  }
  function maybeAutoAdvance() {
    if (!voicePrefs.voiceOnly) return;
    clearTimeout(pendingAutoAdvance);
    pendingAutoAdvance = setTimeout(() => {
      if (revealed && cursor < order.length) next();
    }, 1500);
  }
  function maybeVoiceOnlyOnRender(q) {
    if (!voicePrefs.voiceOnly) return;
    if (revealed) { maybeAutoAdvance(); return; }
    if (!canVoiceAnswer(q)) return;
    if (!window.Voice || !Voice.hasTTS) return;
    readCurrentQuestion().then(() => {
      if (!voicePrefs.voiceOnly) return;
      if (revealed) return;
      if (Voice.hasASR) startListening();
    }).catch(() => {});
  }
  function populateVoiceSelect(voices) {
    voiceSelectEl.innerHTML = "";
    if (!voices || !voices.length) {
      const o = document.createElement("option");
      o.textContent = "(default)";
      o.value = "";
      voiceSelectEl.appendChild(o);
      return;
    }
    const def = document.createElement("option");
    def.value = "";
    def.textContent = "Default (system)";
    voiceSelectEl.appendChild(def);
    voices
      .slice()
      .sort((a, b) => (a.lang || "").localeCompare(b.lang || "") || a.name.localeCompare(b.name))
      .forEach(v => {
        const o = document.createElement("option");
        o.value = v.voiceURI;
        o.textContent = v.name + " (" + v.lang + ")";
        voiceSelectEl.appendChild(o);
      });
    voiceSelectEl.value = voicePrefs.voiceURI || "";
  }
  function openVoiceSettings() {
    voiceModalEl.hidden = false;
    document.body.style.overflow = "hidden";
    voiceRateEl.value = String(voicePrefs.rate);
    voiceRateValEl.innerHTML = voicePrefs.rate.toFixed(2) + "&times;";
    voiceOnlyToggleEl.checked = !!voicePrefs.voiceOnly;
    if (window.Voice) {
      const supportMsgs = [];
      if (!Voice.hasTTS) supportMsgs.push("Read-aloud is not supported in this browser.");
      if (!Voice.hasASR) supportMsgs.push("Spoken answers are not supported in this browser.");
      if (supportMsgs.length) {
        voiceSupportNote.textContent = supportMsgs.join(" ");
        voiceSupportNote.hidden = false;
      } else {
        voiceSupportNote.hidden = true;
      }
      Voice.onVoicesChanged(populateVoiceSelect);
    } else {
      voiceSupportNote.textContent = "Voice features are not supported in this browser.";
      voiceSupportNote.hidden = false;
    }
  }
  function closeVoiceSettings() {
    voiceModalEl.hidden = true;
    document.body.style.overflow = "";
  }
  voiceSettingsBtn.addEventListener("click", openVoiceSettings);
  voiceModalEl.addEventListener("click", (e) => {
    if (e.target.dataset && "voiceClose" in e.target.dataset) closeVoiceSettings();
  });
  voiceSelectEl.addEventListener("change", () => {
    voicePrefs.voiceURI = voiceSelectEl.value || null;
    saveVoicePrefs();
  });
  voiceRateEl.addEventListener("input", () => {
    voicePrefs.rate = parseFloat(voiceRateEl.value) || 1.0;
    voiceRateValEl.innerHTML = voicePrefs.rate.toFixed(2) + "&times;";
    saveVoicePrefs();
  });
  voiceOnlyToggleEl.addEventListener("change", () => {
    voicePrefs.voiceOnly = voiceOnlyToggleEl.checked;
    saveVoicePrefs();
    reflectVoiceOnlyBadge();
    if (voicePrefs.voiceOnly && cursor < order.length) {
      const q = questions[order[cursor]];
      if (q) maybeVoiceOnlyOnRender(q);
    }
  });
  voiceTestBtn.addEventListener("click", () => {
    if (!window.Voice || !Voice.hasTTS) return;
    Voice.speak("This is a sample of the read-aloud voice at your selected rate.", {
      rate: voicePrefs.rate, voiceURI: voicePrefs.voiceURI,
    }).catch(() => {});
  });
  voiceOnlyBadge.addEventListener("click", () => {
    voicePrefs.voiceOnly = false;
    saveVoicePrefs();
    reflectVoiceOnlyBadge();
    voiceOnlyToggleEl.checked = false;
    Voice && Voice.cancel && Voice.cancel();
    stopListening();
  });
  listeningCancelBtn.addEventListener("click", stopListening);
  reflectVoiceOnlyBadge();

  /* ---------- Stats ---------- */
  function loadStats() {
    try {
      const raw = localStorage.getItem(STATS_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (_) { return {}; }
  }
  function saveStats() {
    try { localStorage.setItem(STATS_KEY, JSON.stringify(stats)); } catch (_) {}
  }
  function recordResult(qid, result) {
    if (!qid) return;
    if (result === "correct" || result === "wrong") {
      stats[qid] = result;
      saveStats();
    }
  }
  resetStatsBtn.addEventListener("click", () => {
    if (!confirm("Clear correct/wrong history for all questions?")) return;
    stats = {};
    saveStats();
    renderProgress();
  });

  /* ---------- Session ---------- */
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

  function startSessionWithIds(ids) {
    const idToIndex = new Map();
    questions.forEach((q, i) => idToIndex.set(q.id, i));
    const indices = ids.map(id => idToIndex.get(id)).filter(i => i !== undefined);
    if (indices.length === 0) return;
    order = shuffle(indices);
    cursor = 0;
    revealed = false;
    picks = null;
    saveSession();
    closePicker();
    render();
  }

  /* ---------- Helpers ---------- */
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
  function categoryLabel(code) {
    return (domains[code] && domains[code].label) || (DOMAIN_FALLBACK[code] && DOMAIN_FALLBACK[code].label) || null;
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

  /* ---------- Picker ---------- */
  function openPicker(prefillIds) {
    pickerSelected = new Set();
    if (prefillIds && prefillIds.length) {
      prefillIds.forEach(id => pickerSelected.add(id));
    } else {
      questions.forEach(q => pickerSelected.add(q.id));
    }
    pickerBankTotalEl.textContent = String(questions.length);
    pickerModalEl.hidden = false;
    document.body.style.overflow = "hidden";
    renderPicker();
  }

  function closePicker() {
    pickerModalEl.hidden = true;
    document.body.style.overflow = "";
  }

  function renderPicker() {
    const groups = { plan: [], design: [], deploy: [], other: [] };
    questions.forEach(q => {
      const cat = (q.category && groups[q.category]) ? q.category : "other";
      groups[cat].push(q);
    });

    const catOrder = ["plan", "design", "deploy"];
    const html = catOrder.map(code => {
      const list = groups[code];
      if (!list || list.length === 0) return "";
      const label = (domains[code] && domains[code].label) || (DOMAIN_FALLBACK[code] && DOMAIN_FALLBACK[code].label) || code;
      const selectedCount = list.filter(q => pickerSelected.has(q.id)).length;
      const rows = list.map(q => {
        const checked = pickerSelected.has(q.id);
        const m = stats[q.id];
        const mClass = m === "correct" ? "correct" : (m === "wrong" ? "wrong" : "unseen");
        const stem = (q.question_text || "").replace(/\s+/g, " ").trim();
        const preview = stem.length > 110 ? stem.slice(0, 107) + "..." : stem;
        const tags = [`<span class="picker-tag">${escapeHtml(typeShort(q.type))}</span>`];
        if (q.case_study) tags.push(`<span class="picker-tag case">${escapeHtml(q.case_study)}</span>`);
        return `<label class="picker-row${checked ? " is-checked" : ""}" data-id="${escapeHtml(q.id)}">
          <input type="checkbox" ${checked ? "checked" : ""} data-id="${escapeHtml(q.id)}">
          <span class="picker-row-id">T${q.topic} Q${String(q.question_number).padStart(2,"0")}</span>
          <span class="picker-row-meta"><span class="picker-mastery ${mClass}"></span>${tags.join("")}</span>
          <span class="picker-row-stem">${escapeHtml(preview)}</span>
        </label>`;
      }).join("");
      return `<div class="picker-domain" data-cat="${code}">
        <div class="picker-domain-head">
          <div class="picker-domain-name cat-${code}">${escapeHtml(label)}</div>
          <div class="picker-domain-actions">
            <span class="picker-domain-count" data-count="${code}">${selectedCount} / ${list.length}</span>
            <button class="picker-link" type="button" data-group-action="all" data-cat="${code}">All</button>
            <button class="picker-link" type="button" data-group-action="none" data-cat="${code}">None</button>
          </div>
        </div>
        <div class="picker-rows">${rows}</div>
      </div>`;
    }).join("");

    pickerBodyEl.innerHTML = html;
    updatePickerCount();
  }

  function typeShort(t) {
    return ({
      "multiple-choice": "MC",
      "multi-select": "MS",
      "hotspot": "Hotspot",
      "drag-drop": "Drag",
    })[t] || t;
  }

  function updatePickerCount() {
    pickerCountEl.textContent = String(pickerSelected.size);
    pickerStartBtn.disabled = pickerSelected.size === 0;
    pickerBodyEl.querySelectorAll(".picker-domain").forEach(div => {
      const cat = div.dataset.cat;
      const total = div.querySelectorAll(".picker-row").length;
      const selected = div.querySelectorAll(".picker-row input:checked").length;
      const label = div.querySelector(`[data-count="${cat}"]`);
      if (label) label.textContent = `${selected} / ${total}`;
    });
  }

  function applyPreset(preset) {
    pickerSelected = new Set();
    questions.forEach(q => {
      let include = false;
      switch (preset) {
        case "all": include = true; break;
        case "none": include = false; break;
        case "wrong": include = stats[q.id] === "wrong"; break;
        case "unanswered": include = !stats[q.id]; break;
        case "correct": include = stats[q.id] === "correct"; break;
        case "plan": include = q.category === "plan"; break;
        case "design": include = q.category === "design"; break;
        case "deploy": include = q.category === "deploy"; break;
        case "case-fabrikam": include = q.case_study === "Fabrikam"; break;
        case "case-contoso": include = q.case_study === "Contoso"; break;
        case "case-none": include = !q.case_study; break;
      }
      if (include) pickerSelected.add(q.id);
    });
    renderPicker();
  }

  function applyGroupAction(cat, action) {
    questions.forEach(q => {
      if (q.category !== cat) return;
      if (action === "all") pickerSelected.add(q.id);
      else if (action === "none") pickerSelected.delete(q.id);
    });
    renderPicker();
  }

  pickerPresetsEl.addEventListener("click", e => {
    const btn = e.target.closest("[data-preset]");
    if (!btn) return;
    applyPreset(btn.dataset.preset);
  });

  pickerBodyEl.addEventListener("change", e => {
    const cb = e.target.closest('input[type="checkbox"]');
    if (!cb) return;
    const id = cb.dataset.id;
    if (cb.checked) pickerSelected.add(id);
    else pickerSelected.delete(id);
    const row = cb.closest(".picker-row");
    if (row) row.classList.toggle("is-checked", cb.checked);
    updatePickerCount();
  });

  pickerBodyEl.addEventListener("click", e => {
    const link = e.target.closest("[data-group-action]");
    if (!link) return;
    e.preventDefault();
    applyGroupAction(link.dataset.cat, link.dataset.groupAction);
  });

  pickerStartBtn.addEventListener("click", () => {
    if (pickerSelected.size === 0) return;
    startSessionWithIds(Array.from(pickerSelected));
  });

  pickerModalEl.addEventListener("click", (e) => {
    if (e.target.dataset && "pickerClose" in e.target.dataset) {
      closePicker();
    }
  });

  newSessionBtn.addEventListener("click", () => {
    const prefill = order.map(i => questions[i] && questions[i].id).filter(Boolean);
    openPicker(prefill);
  });

  /* ---------- Progress bars ---------- */
  function renderProgress() {
    const total = order.length;
    let correct = 0, wrong = 0;
    const byCat = { plan: { total: 0, correct: 0, wrong: 0 },
                    design: { total: 0, correct: 0, wrong: 0 },
                    deploy: { total: 0, correct: 0, wrong: 0 } };
    order.forEach(idx => {
      const q = questions[idx];
      if (!q) return;
      const cat = q.category;
      if (cat && byCat[cat]) byCat[cat].total += 1;
      const s = stats[q.id];
      if (s === "correct") {
        correct += 1;
        if (cat && byCat[cat]) byCat[cat].correct += 1;
      } else if (s === "wrong") {
        wrong += 1;
        if (cat && byCat[cat]) byCat[cat].wrong += 1;
      }
    });

    overallAnsweredEl.textContent = String(correct + wrong);
    overallTotalEl.textContent = String(total);
    overallCorrectEl.textContent = String(correct);
    overallWrongEl.textContent = String(wrong);
    overallFillCorrect.style.width = total ? (correct / total * 100) + "%" : "0%";
    overallFillWrong.style.width   = total ? (wrong   / total * 100) + "%" : "0%";

    const catOrder = ["plan", "design", "deploy"];
    sectionGridEl.innerHTML = catOrder.map(code => {
      const c = byCat[code];
      if (c.total === 0) return "";
      const pctC = c.correct / c.total * 100;
      const pctW = c.wrong   / c.total * 100;
      return `
        <div class="progress-row">
          <div class="progress-label">
            <span class="progress-name">${escapeHtml(categoryLabel(code) || code)}</span>
            <span class="progress-counts">
              ${c.correct + c.wrong} / ${c.total}
              <span class="progress-detail">
                <span class="dot dot-good"></span>${c.correct}
                <span class="dot dot-bad"></span>${c.wrong}
              </span>
            </span>
          </div>
          <div class="progress-bar">
            <div class="seg seg-correct" style="width:${pctC}%"></div>
            <div class="seg seg-wrong" style="width:${pctW}%"></div>
          </div>
        </div>`;
    }).join("");
  }

  /* ---------- Slide rendering ---------- */
  function renderHeader(q) {
    const tags = [
      `<span class="tag">${topicLabel(q.topic)} &middot; Q${q.question_number}</span>`,
      `<span class="tag tag-type">${typeLabel(q.type)}</span>`,
    ];
    if (q.category) {
      tags.push(`<span class="tag tag-cat-${escapeHtml(q.category)}">${escapeHtml(categoryLabel(q.category) || q.category)}</span>`);
    }
    if (q.case_study) {
      tags.push(`<span class="tag tag-case">Case Study: ${escapeHtml(q.case_study)}</span>`);
      tags.push(`<button class="cs-button" data-cs="${escapeHtml(q.case_study)}" type="button">View case study</button>`);
    }
    const ttsAvailable = !!(window.Voice && Voice.hasTTS);
    const asrAvailable = !!(window.Voice && Voice.hasASR);
    let voiceCtl = "";
    if (ttsAvailable || asrAvailable) {
      const readBtn = ttsAvailable
        ? `<button class="voice-icon-btn" data-voice-read type="button" title="Read question aloud" aria-label="Read question aloud">&#x1F50A;</button>`
        : "";
      const micBtn = (asrAvailable && canVoiceAnswer(q))
        ? `<button class="voice-icon-btn" data-voice-mic type="button" title="Speak your answer (V)" aria-label="Speak your answer">&#x1F3A4;</button>`
        : "";
      voiceCtl = `<span class="slide-voice-controls">${readBtn}${micBtn}</span>`;
    }
    return `<div class="slide-meta">${tags.join("")}${voiceCtl}</div>
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
        <span class="option-checkbox">${isPicked ? "&#10003;" : ""}</span>
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
          <span class="slot-icon">&#10003;</span>
        </div>`;
      } else if (picked) {
        resultHtml = `<div class="slot-result">
          <span class="slot-pick wrong-pick">${escapeHtml(picked)}</span>
          <span class="slot-icon">&#10007;</span>
          <div class="slot-correct-text">Correct: <strong>${escapeHtml(correct || "")}</strong></div>
        </div>`;
      } else {
        resultHtml = `<div class="slot-result">
          <span class="slot-pick empty-pick">(no selection)</span>
          <div class="slot-correct-text">Correct: <strong>${escapeHtml(correct || "")}</strong></div>
        </div>`;
      }
    } else {
      const optsHtml = ['<option value="">&mdash; select &mdash;</option>']
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
      return `<div class="verdict verdict-correct">&#10003; Correct</div>`;
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
      return `<div class="verdict verdict-wrong">&#10007; ${detail} &mdash; see explanation below</div>`;
    } else {
      return `<div class="verdict verdict-revealed">Answer revealed &mdash; see explanation below</div>`;
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
    renderProgress();
    maybeVoiceOnlyOnRender(q);
  }

  function attachHandlers(q) {
    slideEl.querySelectorAll(".cs-button").forEach(btn => {
      btn.addEventListener("click", () => openCaseStudy(btn.dataset.cs));
    });
    const readBtn = slideEl.querySelector("[data-voice-read]");
    if (readBtn) readBtn.addEventListener("click", toggleRead);
    const micBtn = slideEl.querySelector("[data-voice-mic]");
    if (micBtn) micBtn.addEventListener("click", () => {
      if (activeListen) stopListening();
      else startListening();
    });
    if (revealed) return;
    if (q.type === "multiple-choice") {
      slideEl.querySelectorAll(".option").forEach(btn => {
        btn.addEventListener("click", () => {
          picks.letter = btn.dataset.letter;
          finalizeReveal(q);
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

  function finalizeReveal(q) {
    revealed = true;
    const v = gradeAll(q);
    if (v === "correct" || v === "wrong") {
      recordResult(q.id, v);
    }
    saveSession();
    stopListening();
    if (window.Voice && Voice.cancel) Voice.cancel();
    render();
    if (voicePrefs.voiceOnly) maybeAutoAdvance();
  }

  function updateFooter(q) {
    const isClickAuto = q.type === "multiple-choice";
    const canCopy = q.type === "multiple-choice" || q.type === "multi-select";
    backBtn.hidden = cursor === 0;
    copyBtn.hidden = !canCopy;
    if (revealed) {
      revealBtn.hidden = true;
      nextBtn.hidden = false;
      restartBtn.hidden = false;
      clearBtn.hidden = true;
      nextBtn.textContent = cursor === order.length - 1 ? "Finish" : "Next Question";
    } else {
      if (isClickAuto) {
        revealBtn.hidden = true;
      } else {
        revealBtn.hidden = false;
        revealBtn.textContent = hasAnyPicks(q, picks) ? "Submit Answer" : "Show Answer";
      }
      clearBtn.hidden = !hasAnyPicks(q, picks);
      nextBtn.hidden = true;
      restartBtn.hidden = true;
    }
  }

  function submit() {
    if (revealed || cursor >= order.length) return;
    const q = questions[order[cursor]];
    finalizeReveal(q);
  }

  function next() {
    if (!revealed) return;
    clearTimeout(pendingAutoAdvance);
    if (window.Voice && Voice.cancel) Voice.cancel();
    stopListening();
    cursor += 1;
    revealed = false;
    picks = null;
    saveSession();
    render();
  }

  function back() {
    if (cursor <= 0) return;
    clearTimeout(pendingAutoAdvance);
    if (window.Voice && Voice.cancel) Voice.cancel();
    stopListening();
    cursor -= 1;
    revealed = false;
    picks = null;
    saveSession();
    render();
  }

  function clearPicks() {
    if (revealed) return;
    if (cursor >= order.length) return;
    const q = questions[order[cursor]];
    picks = initPicksFor(q);
    render();
  }

  function questionPlainText(q) {
    const stem = (q.question_text || "")
      .replace(/\s+/g, " ")
      .trim();
    const lines = [
      `Topic ${q.topic} · Q${q.question_number} · ${typeLabel(q.type)}`,
    ];
    if (q.case_study) lines.push(`Case Study: ${q.case_study}`);
    lines.push("");
    lines.push(stem);
    if (q.options && q.options.length) {
      lines.push("");
      q.options.forEach(opt => {
        lines.push(`${opt.letter}. ${opt.text}`);
      });
    }
    return lines.join("\n");
  }

  function copyCurrentQuestion() {
    if (cursor >= order.length) return;
    const q = questions[order[cursor]];
    if (q.type !== "multiple-choice" && q.type !== "multi-select") return;
    const text = questionPlainText(q);
    const original = copyBtn.textContent;
    const showCopied = (ok) => {
      copyBtn.textContent = ok ? "Copied!" : "Copy failed";
      setTimeout(() => { copyBtn.textContent = original; }, 1400);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showCopied(true), () => fallbackCopy(text, showCopied));
    } else {
      fallbackCopy(text, showCopied);
    }
  }

  function fallbackCopy(text, cb) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      cb(ok);
    } catch (_) {
      cb(false);
    }
  }

  function renderSummary() {
    let correct = 0, wrong = 0;
    questions.forEach(q => {
      const s = stats[q.id];
      if (s === "correct") correct += 1;
      else if (s === "wrong") wrong += 1;
    });
    slideEl.innerHTML = `
      <div class="summary">
        <h2>Session complete</h2>
        <p>You worked through every question in this session.</p>
        <div class="stat-row">
          <div>
            <span class="stat-num ok">${correct}</span>
            <span class="stat-label">Correct overall</span>
          </div>
          <div>
            <span class="stat-num no">${wrong}</span>
            <span class="stat-label">Wrong overall</span>
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
    renderProgress();
  }

  /* ---------- Case study modal ---------- */
  function openCaseStudy(name) {
    const path = CASE_STUDY_PATHS[name];
    if (!path) return;
    csTitle.textContent = "Case Study: " + name;
    const sep = path.indexOf("?") === -1 ? "?" : "&";
    csFrame.src = path + sep + "theme=" + currentTheme();
    csModal.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeCaseStudy() {
    csModal.hidden = true;
    csFrame.src = "about:blank";
    document.body.style.overflow = "";
  }
  csModal.addEventListener("click", (e) => {
    if (e.target.dataset && "close" in e.target.dataset) closeCaseStudy();
  });

  /* ---------- Wiring ---------- */
  revealBtn.addEventListener("click", submit);
  nextBtn.addEventListener("click", next);
  backBtn.addEventListener("click", back);
  clearBtn.addEventListener("click", clearPicks);
  copyBtn.addEventListener("click", copyCurrentQuestion);
  restartBtn.addEventListener("click", () => {
    const prefill = order.map(i => questions[i] && questions[i].id).filter(Boolean);
    clearSession();
    openPicker(prefill);
  });

  document.addEventListener("keydown", e => {
    const tag = e.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if (e.key === "Escape" && !csModal.hidden) {
      e.preventDefault();
      closeCaseStudy();
      return;
    }
    if (e.key === "Escape" && !pickerModalEl.hidden) {
      e.preventDefault();
      closePicker();
      return;
    }
    if (e.key === "Escape" && !voiceModalEl.hidden) {
      e.preventDefault();
      closeVoiceSettings();
      return;
    }
    if (e.key === "Escape" && activeListen) {
      e.preventDefault();
      stopListening();
      return;
    }
    if (e.code === "Space" && !revealBtn.hidden) {
      e.preventDefault();
      submit();
    } else if (e.code === "ArrowRight" && !nextBtn.hidden) {
      e.preventDefault();
      next();
    } else if (e.code === "ArrowLeft" && !backBtn.hidden) {
      e.preventDefault();
      back();
    } else if ((e.key === "c" || e.key === "C") && csModal.hidden) {
      const q = questions[order[cursor]];
      if (q && q.case_study && CASE_STUDY_PATHS[q.case_study]) {
        e.preventDefault();
        openCaseStudy(q.case_study);
      }
    } else if ((e.key === "v" || e.key === "V") && pickerModalEl.hidden && voiceModalEl.hidden && csModal.hidden) {
      const q = (cursor < order.length) ? questions[order[cursor]] : null;
      if (q && !revealed && canVoiceAnswer(q) && window.Voice && Voice.hasASR) {
        e.preventDefault();
        if (activeListen) stopListening();
        else startListening();
      }
    }
  });

  initTheme();

  fetch("questions.json", { cache: "no-store" })
    .then(r => {
      if (!r.ok) throw new Error("Failed to load questions.json: " + r.status);
      return r.json();
    })
    .then(data => {
      questions = (data.questions || []).slice();
      domains = data.domains || DOMAIN_FALLBACK;
      if (questions.length === 0) {
        slideEl.innerHTML = `<div class="slide-loading">No questions found. Run <code>build.py</code> first.</div>`;
        return;
      }
      const saved = loadSession();
      if (saved && Array.isArray(saved.order) && saved.order.length > 0
          && saved.order.every(i => i >= 0 && i < questions.length)) {
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
      slideEl.innerHTML = `<div class="slide-loading">Error: ${escapeHtml(err.message)}<br><br>If running locally, serve this folder over HTTP (e.g. <code>py -m http.server</code>) &mdash; opening index.html directly will block fetch().</div>`;
    });
})();
