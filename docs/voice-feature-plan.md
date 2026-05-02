# Voice feature plan

Browser-native voice IO for the practice test app. No external services, no API keys, free on every device that already has the app working. Built on the Web Speech API (`SpeechSynthesis` for read-aloud, `SpeechRecognition` for spoken answers).

## Scope

In scope for this first cut:

1. **Read button** on each slide. Tap to hear the question stem and lettered options. Tap again (or any of the controls) to stop. No auto-read.
2. **Push-to-talk answering**, hotkey `V`, plus an on-screen mic button. Multiple-choice and multi-select only — hotspot and drag-drop are skipped because positional voice answers are fragile.
3. **Voice-only mode toggle.** When on:
   - The question is read aloud automatically as soon as the slide renders.
   - After read-aloud finishes, mic auto-arms and listens for the answer (no key press needed).
   - On reveal, after a 1.5s pause, the app advances to the next question. (Explanation is *not* spoken — user requested.)
   - The mode persists across sessions in `localStorage`.
4. **Voice picker** for read-aloud. Default is the OS default; user can choose any installed system voice and a rate slider (0.8–1.4×).
5. Settings (selected voice, rate, voice-only mode) persist via `localStorage`.

Out of scope for this cut:

- Reading the explanation aloud after reveal (user said no).
- Voice answers for hotspot / drag-drop.
- Cloud TTS upgrades (Azure Neural TTS) — fine if stock voices ever feel too robotic, but free local voices first.
- Wake-word / always-on listening.

## UX decisions

- **No auto-read** outside voice-only mode. User must tap Read each time.
- **Mic placement**: a small mic button next to the Read button on the slide-meta row. Both are quiet by default; they animate (pulse) while active.
- **Push-to-talk** is press-and-hold-style toggle. Press `V` to start listening, press again (or hit Esc) to cancel. Auto-stops on first confident result. While listening, show a thin overlay or pulse on the mic with a transient "Listening…" caption.
- **Voice-only mode** shows a small badge in the topbar so you know it's on. A clear "Stop voice mode" hook is offered on every slide.
- **Confidence and confirmation**: low-confidence results don't commit. The captured transcript is briefly shown so the user can confirm via voice ("yes" / "submit") or by saying a different letter.
- **iPad/Safari**: the first time the user taps Read or the mic, a permission prompt fires for mic. We catch the rejection cleanly and show a one-time hint.

## Spoken-answer parsing

For multiple-choice (single letter) and multi-select (multiple letters), the parser maps spoken text → letters. Examples:

| User says                                      | Parsed         |
| ---------------------------------------------- | -------------- |
| "A"                                            | `[A]`          |
| "B"                                            | `[B]`          |
| "the second one" / "second"                    | `[B]`          |
| "A and C"                                      | `[A, C]`       |
| "A, C, and D"                                  | `[A, C, D]`    |
| "all of them"                                  | `[A, B, C, D]` |
| "I don't know" / "skip"                        | no commit, ask again |
| (any phrase containing a verbatim option text) | letter for that option (fuzzy substring match against option.text, lowercase, punctuation stripped) |

Implementation: a `parseSpokenAnswer(text, q)` helper. Tries letter words first (`a`, `bee`, `cee`, `dee`, single tokens, "and"-separated lists, ordinals, "all"), then falls back to fuzzy match on option text (longest match wins, requires Jaro-Winkler ≥ 0.85 or substring containment).

For multiple-choice, accept first letter found and commit. For multi-select, collect all matched letters then submit.

## Architecture

- **Web Speech API** is browser-native; no library needed.
- All voice code lives in a new `app/voice.js` (loaded after `app.js`), exposing a small singleton:
  ```js
  Voice.speak(text, opts);     // SpeechSynthesisUtterance, returns a promise
  Voice.cancel();
  Voice.listen({ onResult, onError, onEnd, lang });  // returns { stop }
  Voice.voices();              // installed SpeechSynthesisVoice[]
  ```
- `app.js` calls `Voice.speak(...)` from the Read button handler and from the auto-read step in voice-only mode. It calls `Voice.listen(...)` from the mic / `V` handler.
- A new `voice.css` block (added to `style.css`) styles the mic + Read buttons, listening overlay, and the topbar voice-only badge.

## State

`localStorage`:

- `quiz_voice_v1` → `{ voiceURI: string|null, rate: number, voiceOnly: boolean }`

That's it. No session-scoped voice state needed.

## Files touched

- `app/index.html` — add `<button id="read-btn">`, `<button id="mic-btn">`, voice-only badge in topbar, settings popover (or just a `<select>` inline), and `<script src="voice.js?v=7">`. Bump `?v=` on `app.js` and `style.css` too.
- `app/app.js` — wire the buttons, render hooks for slide-render → auto-read in voice-only mode, mic key binding (`V`), spoken-answer commit path that goes through the existing `picks` state and `finalizeReveal()`.
- `app/style.css` — mic / read button styles, listening pulse, topbar voice-only badge.
- `app/voice.js` — new file with the `Voice` singleton, the `parseSpokenAnswer` helper, and a tiny voice picker modal markup (or inline).
- `README.md` and `CLAUDE.md` — short voice section once it ships.

## Edge cases to handle

- **No SpeechSynthesis or SpeechRecognition** on this browser/device → hide the voice buttons, show a one-line note in the settings popover. Don't break the rest of the app.
- **Mic permission denied** → catch, surface a tooltip "Enable mic in browser settings to use voice answers", auto-disable voice-only mode.
- **Multiple results returned by recognition** → take the highest-confidence final result.
- **Recognition picks up the read-aloud audio** in voice-only mode → ensure read-aloud finishes (`onend` event) before arming the mic.
- **User toggles voice-only mid-session** → re-render the current slide so the auto-read fires.
- **Slide changes mid-read** → cancel any in-flight `speechSynthesis` before starting the next.
- **Cache-buster** → bump `?v=` on `app.js`, `style.css`, and add `voice.js?v=N`.

## Smoke test before pushing

1. Desktop Chrome: Read works, voice picker lists multiple voices, mic answers an MC question via `V`.
2. Desktop Edge: same, plus check for any Edge-specific quirks.
3. iPad Safari: Read works (system voices), mic prompts for permission once, voice answers commit.
4. Voice-only mode: enable, advance to a fresh question, confirm auto-read fires, mic auto-arms, answer commits, slide auto-advances after 1.5s.
5. Disable voice-only mode mid-session — confirm no auto-read happens on next slide.
6. Browser without `SpeechRecognition` (e.g. some Firefox setups) — Read still works, mic button hidden.

## Rollout

Single commit + push. Bump cache-buster to `?v=7`. After deploy, smoke-test on at least one iPad path to confirm the mic permission prompt is sane.

## Update log

### 2026-05-02 — Initial deployment

Shipped under commit `f596bfb` and pushed to GitHub Pages. Cache-buster bumped to `?v=7` on `style.css`, `app.js`, and the new `voice.js`. Local smoke test confirmed `index.html`, `voice.js?v=7`, `app.js?v=7`, and `style.css?v=7` all serve 200 with the expected voice IDs in the markup.

Implementation deltas vs. the plan above:

- **No separate inline voice picker**: settings live in a topbar modal opened from a `Voice` button. Cleaner than cramming a dropdown into the slide-meta row, especially on iPad widths.
- **Voice-only "no match" handling**: when the recognizer returns text that doesn't map to any letter or option, the app speaks "Sorry, I didn't catch that. Please say a letter." and re-arms the mic. This was lighter-touch than building a full confirm-by-voice flow and works fine in practice.
- **Cancel paths**: `Esc` cancels an active listen, closes the voice settings modal, closes the picker, or closes the case-study modal in that priority order. Mic state is also cleared on `Next`, `Back`, and on `finalizeReveal` so the recognizer doesn't keep listening past a transition.
- **Permission failure**: a denied mic prompt auto-disables voice-only mode, surfaces a one-time `alert()`, and unchecks the toggle. The user can flip it back on after fixing browser permissions.
- **Read button reads the question and lettered options only.** Hotspot/drag-drop questions get a one-line summary like "Hotspot question with 4 selections to make." instead of trying to read each dropdown.

### Open follow-ups

- Try this on iPad Safari — confirm the mic permission dialog shows the right origin and the recognizer settles within the first phrase. Anecdotally Safari is stricter about needing a direct user gesture to start a recognizer, which voice-only mode doesn't have on the auto-arm step. If it bites, fall back to push-to-talk only on Safari, with a one-line note in the settings modal.
- Decide whether to label the `V` shortcut on the slide-meta when the mic button is visible (currently only in the kbd-hint footer line).
- Consider a `R` shortcut for Read, mirroring `V`. Skipped here because `R` is sometimes typed by accident; happy to add if you actually want it.
- If stock voices ever feel robotic, swap the read path to Azure Neural TTS via a tiny serverless proxy (Cloudflare Worker / Azure Function) so the API key isn't shipped in the static site. Free tier is ~0.5M characters/month, well above what daily study would burn.
