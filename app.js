/* =========================================================================
   app.js — Logique de la plateforme (prototype, sans backend)
   ========================================================================= */

/* ---------- Aplatissement du programme ---------- */
const FLAT_CHAPTERS = [];
COURSE.modules.forEach((mod) => {
  mod.chapters.forEach((chap, idxInModule) => {
    FLAT_CHAPTERS.push({ moduleId: mod.id, moduleTitle: mod.title, chapter: chap, idxInModule });
  });
});
function flatIndexOf(chapterId) {
  return FLAT_CHAPTERS.findIndex((f) => f.chapter.id === chapterId);
}

/* ---------- État persistant ---------- */
const STORAGE_KEY = "msflab_state_v1";
function loadPersisted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* localStorage indisponible: on continue sans persistance */ }
  return {};
}
function savePersisted() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      lang: state.lang, theme: state.theme, fontScale: state.fontScale, progress: state.progress
    }));
  } catch (e) { /* silencieux: mode privé, quota, etc. */ }
}

const persisted = loadPersisted();
const state = {
  lang: persisted.lang || "fr",
  theme: persisted.theme || "dark",
  fontScale: persisted.fontScale || 1,
  progress: persisted.progress || {},   // { [chapterId]: { passed, attempts, lastScore } }
  view: { type: "home" },
  runtime: {}                           // état transitoire (pratique / examen en cours), non persisté
};

function isUnlocked(chapterId) {
  const i = flatIndexOf(chapterId);
  if (i <= 0) return true;
  const prevId = FLAT_CHAPTERS[i - 1].chapter.id;
  return !!(state.progress[prevId] && state.progress[prevId].passed);
}
function isPassed(chapterId) {
  return !!(state.progress[chapterId] && state.progress[chapterId].passed);
}

/* ---------- Utilitaires ---------- */
function esc(s) { return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function normalize(s) { return String(s || "").trim().replace(/\s+/g, " "); }
function matches(input, acceptList) {
  const n = normalize(input);
  return acceptList.some((pat) => {
    if (pat instanceof RegExp) return pat.test(n);
    return n === pat || n.toLowerCase() === String(pat).toLowerCase();
  });
}
function downloadText(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function showToast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg; el.hidden = false;
  el.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => { el.classList.remove("show"); el.hidden = true; }, 3200);
}
function go(view) { state.view = view; window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" }); render(); }

/* ---------- Thème / langue / taille de police ---------- */
function applyChrome() {
  document.documentElement.setAttribute("data-theme", state.theme);
  document.documentElement.setAttribute("lang", state.lang);
  document.documentElement.style.setProperty("--font-scale", state.fontScale);
  document.getElementById("themeToggle").textContent = state.theme === "dark" ? "☾" : "☀";
  document.getElementById("langToggle").textContent = state.lang === "fr" ? "EN" : "FR";
  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.getAttribute("data-i18n")); });
}
document.getElementById("themeToggle").addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark"; applyChrome(); savePersisted();
});
document.getElementById("langToggle").addEventListener("click", () => {
  state.lang = state.lang === "fr" ? "en" : "fr"; applyChrome(); savePersisted(); render();
});
document.getElementById("fontUp").addEventListener("click", () => {
  state.fontScale = Math.min(1.5, +(state.fontScale + 0.1).toFixed(2)); applyChrome(); savePersisted();
});
document.getElementById("fontDown").addEventListener("click", () => {
  state.fontScale = Math.max(0.8, +(state.fontScale - 0.1).toFixed(2)); applyChrome(); savePersisted();
});
document.getElementById("resetProgress").addEventListener("click", () => {
  state.progress = {}; savePersisted(); renderFooterProgress(); showToast(t("toast.reset")); render();
});

/* ---------- Modales (mentions légales / CGU / licence) ---------- */
function openModal(key) {
  const titleKey = "modal." + key + ".title";
  const body = LEGAL_CONTENT[key][state.lang];
  document.getElementById("modalContent").innerHTML = `<h2>${esc(t(titleKey))}</h2>${body}`;
  document.getElementById("modalRoot").hidden = false;
}
function closeModal() { document.getElementById("modalRoot").hidden = true; }
document.querySelectorAll("[data-close-modal]").forEach((el) => el.addEventListener("click", closeModal));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
document.querySelectorAll("footer [data-modal]").forEach((el) => {
  el.addEventListener("click", (e) => { e.preventDefault(); openModal(el.getAttribute("data-modal")); });
});

/* ---------- Rendu : pied de page progression ---------- */
function renderFooterProgress() {
  const total = FLAT_CHAPTERS.length;
  const done = FLAT_CHAPTERS.filter((f) => isPassed(f.chapter.id)).length;
  document.getElementById("footerProgress").textContent = `${done} / ${total}`;
}

/* ---------- Rendu : sommaire (accueil) ---------- */
function renderHome() {
  const modulesHtml = COURSE.modules.map((mod) => {
    const chaptersHtml = mod.chapters.map((chap) => {
      const unlocked = isUnlocked(chap.id);
      const passed = isPassed(chap.id);
      const status = passed ? "done" : unlocked ? "open" : "locked";
      const icon = passed ? "✔" : unlocked ? "▸" : "🔒";
      return `
        <li class="chapter-row ${status}" data-go-chapter="${chap.id}">
          <span class="chapter-row-icon">${icon}</span>
          <span class="chapter-row-title">${esc(chap.title[state.lang])}</span>
        </li>`;
    }).join("");
    return `
      <section class="module-card">
        <h3>${esc(mod.title[state.lang])}</h3>
        <ul class="chapter-list">${chaptersHtml}</ul>
      </section>`;
  }).join("");

  document.getElementById("app").innerHTML = `
    <div class="hero">
      <p class="hero-kicker">Linux-Lab :: Metasploit</p>
      <h1>${esc(t("home.title"))}</h1>
      <p class="hero-sub">${t("home.subtitle")}</p>
      <button class="btn btn-primary" data-go-chapter="${FLAT_CHAPTERS[0].chapter.id}">${esc(t("home.start"))}</button>
    </div>
    <div class="module-grid">${modulesHtml}</div>
  `;
  bindChapterLinks();
}

function bindChapterLinks() {
  document.querySelectorAll("[data-go-chapter]").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.getAttribute("data-go-chapter");
      if (!isUnlocked(id)) { showToast(t("chapter.locked")); return; }
      go({ type: "chapter", chapterId: id, mode: "theory" });
    });
  });
}

/* ---------- Rendu : sidebar (vue chapitre) ---------- */
function renderSidebar(activeId) {
  const modulesHtml = COURSE.modules.map((mod) => {
    const items = mod.chapters.map((chap) => {
      const unlocked = isUnlocked(chap.id);
      const passed = isPassed(chap.id);
      const cls = ["side-chapter"];
      if (chap.id === activeId) cls.push("active");
      if (!unlocked) cls.push("locked");
      const icon = passed ? "✔" : unlocked ? "•" : "🔒";
      return `<li class="${cls.join(" ")}" data-go-chapter="${chap.id}"><span>${icon}</span>${esc(chap.title[state.lang])}</li>`;
    }).join("");
    return `<div class="side-module"><h4>${esc(mod.title[state.lang])}</h4><ul>${items}</ul></div>`;
  }).join("");
  return `
    <aside class="chapter-sidebar">
      <button class="btn btn-ghost" data-go-home>${esc(t("nav.backHome"))}</button>
      <p class="sidebar-label">${esc(t("sidebar.modules"))}</p>
      ${modulesHtml}
    </aside>`;
}

/* ---------- Console simulée (composant réutilisable) ---------- */
/**
 * Crée le HTML d'une console et retourne un contrôleur pour la brancher.
 * onSubmit(value) doit renvoyer { ok:boolean, output?:string }
 */
function consoleWidgetHtml(id, promptLabel) {
  return `
    <div class="terminal" id="${id}">
      <div class="terminal-titlebar"><span></span><span></span><span></span><em>${esc(promptLabel)}</em></div>
      <div class="terminal-body" id="${id}-log"></div>
      <form class="terminal-input-row" id="${id}-form" autocomplete="off">
        <span class="terminal-prompt">${esc(promptLabel)} $</span>
        <input type="text" id="${id}-input" placeholder="${esc(t("console.placeholder"))}" spellcheck="false">
        <button type="submit" class="btn btn-small">${esc(t("console.run"))}</button>
      </form>
    </div>`;
}
function logLine(logId, cls, html) {
  const log = document.getElementById(logId);
  const line = document.createElement("div");
  line.className = "term-line " + cls;
  line.innerHTML = html;
  log.appendChild(line);
  log.scrollTop = log.scrollHeight;
}

/* ---------- Rendu : théorie ---------- */
function renderChapterTheory(entry) {
  const chap = entry.chapter;
  const paragraphs = chap.theory.map((p) => `<p>${p[state.lang]}</p>`).join("");
  document.getElementById("app").innerHTML = `
    ${renderSidebar(chap.id)}
    <section class="chapter-content">
      <p class="crumb">${esc(entry.moduleTitle[state.lang])}</p>
      <h1>${esc(chap.title[state.lang])}</h1>
      <p class="lede">${chap.intro[state.lang]}</p>
      <h2 class="section-title">${esc(t("chapter.theory"))}</h2>
      <div class="theory-block">${paragraphs}</div>
      <div class="nav-row">
        <span></span>
        <button class="btn btn-primary" id="toPractice">${esc(t("chapter.practice"))} ▸</button>
      </div>
    </section>`;
  bindSidebarNav();
  document.getElementById("toPractice").addEventListener("click", () => {
    go({ type: "chapter", chapterId: chap.id, mode: "practice" });
  });
}

function bindSidebarNav() {
  document.querySelector("[data-go-home]").addEventListener("click", () => go({ type: "home" }));
  document.querySelectorAll("[data-go-chapter]").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.getAttribute("data-go-chapter");
      if (!isUnlocked(id)) { showToast(t("chapter.locked")); return; }
      go({ type: "chapter", chapterId: id, mode: "theory" });
    });
  });
}

/* ---------- Rendu : pratique guidée ---------- */
function renderPractice(entry) {
  const chap = entry.chapter;
  if (!state.runtime[chap.id]) state.runtime[chap.id] = {};
  if (state.runtime[chap.id].practiceStep === undefined) {
    state.runtime[chap.id].practiceStep = 0;
    state.runtime[chap.id].attempts = {};
  }
  const rt = state.runtime[chap.id];
  const stepIdx = rt.practiceStep;
  const finished = stepIdx >= chap.practice.length;

  document.getElementById("app").innerHTML = `
    ${renderSidebar(chap.id)}
    <section class="chapter-content">
      <p class="crumb">${esc(entry.moduleTitle[state.lang])} — ${esc(chap.title[state.lang])}</p>
      <h1>${esc(t("chapter.practice"))}</h1>
      ${finished ? `
        <div class="callout callout-success">
          <p>${esc(t("practice.done"))}</p>
          <button class="btn btn-primary" id="toExam">${esc(t("practice.toExam"))} ▸</button>
        </div>` : `
        <p class="step-indicator">${esc(t("chapter.step"))} ${stepIdx + 1} ${esc(t("chapter.of"))} ${chap.practice.length}</p>
        <p class="instruction">${chap.practice[stepIdx].instruction[state.lang]}</p>
        ${consoleWidgetHtml("practiceTerm", "kali@kali:~")}
        <div id="hintZone"></div>
      `}
    </section>`;
  bindSidebarNav();

  if (finished) {
    document.getElementById("toExam").addEventListener("click", () => go({ type: "chapter", chapterId: chap.id, mode: "exam" }));
    return;
  }

  const step = chap.practice[stepIdx];
  const form = document.getElementById("practiceTerm-form");
  const input = document.getElementById("practiceTerm-input");
  input.focus();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = input.value;
    if (!normalize(val)) return;
    logLine("practiceTerm-log", "term-echo", `<span class="term-prompt-inline">kali@kali:~ $</span> ${esc(val)}`);
    input.value = "";
    const key = String(stepIdx);
    rt.attempts[key] = (rt.attempts[key] || 0) + 1;

    if (matches(val, step.accept)) {
      if (step.output) logLine("practiceTerm-log", "term-out", esc(step.output[state.lang]).replace(/\n/g, "<br>"));
      logLine("practiceTerm-log", "term-ok", "✔ " + esc(t("console.correct")));
      logLine("practiceTerm-log", "term-info", esc(t("console.stepDone")));
      setTimeout(() => { rt.practiceStep = stepIdx + 1; render(); }, 700);
    } else {
      logLine("practiceTerm-log", "term-err", "✘ " + esc(t("console.incorrect")) + " " + step.missingHint[state.lang]);
      const hintZone = document.getElementById("hintZone");
      if (rt.attempts[key] === 2) {
        hintZone.innerHTML = `<button class="btn btn-ghost" id="btnHint">${esc(t("console.showHint"))}</button>`;
        document.getElementById("btnHint").addEventListener("click", () => {
          logLine("practiceTerm-log", "term-hint", "💡 " + esc(step.missingHint[state.lang]));
        });
      }
      if (rt.attempts[key] >= 3) {
        hintZone.innerHTML = `<button class="btn btn-ghost" id="btnReveal">${esc(t("console.reveal"))}</button>`;
        document.getElementById("btnReveal").addEventListener("click", () => {
          const answer = step.accept.find((a) => typeof a === "string") || "";
          logLine("practiceTerm-log", "term-hint", "💡 " + esc(t("console.revealed")) + ` <code>${esc(answer)}</code>`);
          input.value = answer;
          hintZone.innerHTML = "";
        });
      }
    }
  });
}

/* ---------- Rendu : examen ---------- */
function renderExam(entry) {
  const chap = entry.chapter;
  if (!state.runtime[chap.id]) state.runtime[chap.id] = {};
  const rt = state.runtime[chap.id];
  if (!rt.exam) rt.exam = { answers: chap.exam.questions.map(() => ""), submitted: false, result: null, scoreVisible: false };
  const ex = rt.exam;

  const questionsHtml = chap.exam.questions.map((q, i) => `
    <div class="exam-q">
      <p class="exam-q-prompt"><span class="exam-q-num">${i + 1}.</span> ${q.prompt[state.lang]}</p>
      <input type="text" class="exam-input" data-q="${i}" value="${esc(ex.answers[i])}" ${ex.submitted && ex.result && ex.result.pass ? "disabled" : ""} placeholder="kali@kali:~ $">
      ${ex.submitted && ex.result && !ex.result.pass ? `
        <div class="exam-feedback ${ex.result.perQuestion[i] ? "ok" : "bad"}">
          <span>${ex.result.perQuestion[i] ? "✔" : "✘"} ${esc(t(ex.result.perQuestion[i] ? "console.correct" : "console.incorrect"))}</span>
          <div class="exam-correction"><strong>${esc(t("exam.correction"))} :</strong> ${q.correction[state.lang]}</div>
        </div>` : ""}
    </div>
  `).join("");

  const resultBanner = (ex.submitted && ex.result) ? `
    <div class="callout ${ex.result.pass ? "callout-success" : "callout-fail"}">
      <h3>${esc(t(ex.result.pass ? "exam.pass.title" : "exam.fail.title"))}</h3>
      <p>${esc(t(ex.result.pass ? "exam.pass.text" : "exam.fail.text"))}</p>
      <label class="score-toggle">
        <input type="checkbox" id="scoreToggle" ${ex.scoreVisible ? "checked" : ""}>
        ${esc(t("exam.scoreToggle"))}
      </label>
      ${ex.scoreVisible ? `<p class="exam-score">${esc(t("exam.score"))} : <strong>${ex.result.correctCount} / ${chap.exam.questions.length}</strong></p>` : ""}
    </div>` : "";

  document.getElementById("app").innerHTML = `
    ${renderSidebar(chap.id)}
    <section class="chapter-content">
      <p class="crumb">${esc(entry.moduleTitle[state.lang])} — ${esc(chap.title[state.lang])}</p>
      <h1>${esc(t("exam.title"))}</h1>
      <p class="lede">${esc(t("exam.intro"))}</p>
      ${resultBanner}
      <form id="examForm">
        ${questionsHtml}
        <div class="exam-actions">
          <button type="button" class="btn btn-ghost" id="dlQuestions">${esc(t("exam.download.q"))}</button>
          <button type="button" class="btn btn-ghost" id="dlCorrection">${esc(t("exam.download.c"))}</button>
          ${ex.submitted && ex.result && ex.result.pass ? "" : `
            <button type="submit" class="btn btn-primary">${esc(t(ex.submitted ? "exam.retry" : "exam.submit"))}</button>`}
        </div>
      </form>
      ${ex.submitted && ex.result && ex.result.pass ? renderExamContinue(chap) : ""}
      <p class="attempts-line">${esc(t("exam.attempts"))} : ${state.progress[chap.id] ? state.progress[chap.id].attempts || 0 : 0}</p>
    </section>`;
  bindSidebarNav();

  document.querySelectorAll(".exam-input").forEach((inp) => {
    inp.addEventListener("input", () => { ex.answers[+inp.getAttribute("data-q")] = inp.value; });
  });

  const scoreToggle = document.getElementById("scoreToggle");
  if (scoreToggle) scoreToggle.addEventListener("change", () => { ex.scoreVisible = scoreToggle.checked; render(); });

  document.getElementById("examForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const perQuestion = chap.exam.questions.map((q, i) => matches(ex.answers[i], q.accept));
    const correctCount = perQuestion.filter(Boolean).length;
    const pass = correctCount === chap.exam.questions.length;
    ex.submitted = true;
    ex.result = { pass, perQuestion, correctCount };

    const prog = state.progress[chap.id] || { passed: false, attempts: 0, lastScore: 0 };
    prog.attempts += 1;
    prog.lastScore = correctCount;
    if (pass) prog.passed = true;
    state.progress[chap.id] = prog;
    savePersisted();
    renderFooterProgress();
    render();
  });

  document.getElementById("dlQuestions").addEventListener("click", () => {
    const lines = [chap.title[state.lang], "=".repeat(chap.title[state.lang].length), ""];
    chap.exam.questions.forEach((q, i) => lines.push(`${i + 1}. ${stripHtml(q.prompt[state.lang])}`));
    downloadText(`questionnaire-${chap.id}-${state.lang}.txt`, lines.join("\n"));
  });

  document.getElementById("dlCorrection").addEventListener("click", () => {
    const allAnswered = ex.answers.every((a) => normalize(a).length >= 2);
    if (!allAnswered) { showToast(t(ex.answers.some((a) => normalize(a)) ? "exam.download.empty" : "exam.download.locked")); return; }
    const lines = [chap.title[state.lang], "=".repeat(chap.title[state.lang].length), ""];
    chap.exam.questions.forEach((q, i) => {
      lines.push(`${i + 1}. ${stripHtml(q.prompt[state.lang])}`);
      lines.push(`   ${t("exam.correction")}: ${stripHtml(q.correction[state.lang])}`);
      lines.push("");
    });
    if (ex.scoreVisible && ex.result) lines.push(`${t("exam.score")}: ${ex.result.correctCount} / ${chap.exam.questions.length}`);
    downloadText(`corrige-${chap.id}-${state.lang}.txt`, lines.join("\n"));
  });
}
function stripHtml(s) { return String(s).replace(/<[^>]+>/g, ""); }
function renderExamContinue(chap) {
  const i = flatIndexOf(chap.id);
  const next = FLAT_CHAPTERS[i + 1];
  if (!next) return `<p class="course-done">🎉</p>`;
  return `<div class="nav-row"><span></span><button class="btn btn-primary" id="toNextChapter">${esc(t("exam.continue"))}</button></div>`;
}

/* ---------- Routeur ---------- */
function render() {
  applyChrome();
  if (state.view.type === "home") { renderHome(); }
  else {
    const entry = FLAT_CHAPTERS[flatIndexOf(state.view.chapterId)];
    if (!isUnlocked(entry.chapter.id)) { go({ type: "home" }); return; }
    if (state.view.mode === "theory") renderChapterTheory(entry);
    else if (state.view.mode === "practice") renderPractice(entry);
    else if (state.view.mode === "exam") renderExam(entry);
    const nextBtn = document.getElementById("toNextChapter");
    if (nextBtn) nextBtn.addEventListener("click", () => {
      const i = flatIndexOf(entry.chapter.id);
      const next = FLAT_CHAPTERS[i + 1];
      if (next) go({ type: "chapter", chapterId: next.chapter.id, mode: "theory" });
      else go({ type: "home" });
    });
  }
  renderFooterProgress();
}

render();
