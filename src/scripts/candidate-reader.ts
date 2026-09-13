type State = {
  date: string; title: string; summary: string; focus: string; mobile: string;
  tracks: [string, string, number, string][]; facts: string[][];
};

export function chapterAtReadingLine(tops: number[], line: number): number {
  let index = 0;
  tops.forEach((top, candidate) => { if (top <= line) index = candidate; });
  return index;
}

// Same scroll rule as the original scenario; the candidate has one continuous
// manuscript rather than two switchable branches. Never change the URL on scroll.
if (typeof document !== "undefined") {
  // Fragment links must also reveal the collapsed synopsis on mobile and desktop.
  const revealFragment = () => {
    let id: string;
    try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    const details = target instanceof HTMLDetailsElement ? target : target?.closest("details");
    if (details) details.open = true;
  };
  window.addEventListener("hashchange", revealFragment);
  document.querySelectorAll<HTMLAnchorElement>('a[href$="#resumo-do-cenario"]').forEach(link => {
    link.addEventListener("click", () => {
      const details = document.getElementById("resumo-do-cenario");
      if (details instanceof HTMLDetailsElement) details.open = true;
    });
  });
  revealFragment();
  const dashboard = document.querySelector<HTMLElement>("[data-candidate-states]");
  const entries = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-candidate-nav] a")).map(link => ({
    link, section: document.getElementById(decodeURIComponent(link.hash.slice(1))),
  })).filter((entry): entry is { link: HTMLAnchorElement; section: HTMLElement } => !!entry.section);
  let states: State[] = [];
  try { states = JSON.parse(dashboard?.dataset.candidateStates ?? "[]"); } catch { /* Static reading stays available. */ }
  let current = -1;
  const update = () => {
    if (!entries.length) return;
    const index = chapterAtReadingLine(entries.map(({ section }) => section.getBoundingClientRect().top), Math.max(96, window.innerHeight * 0.18));
    if (index === current) return;
    current = index;
    entries.forEach(({ link }, i) => {
      link.classList.toggle("is-active", i === index);
      if (i === index) link.setAttribute("aria-current", "location"); else link.removeAttribute("aria-current");
    });
    const state = states[index];
    if (!dashboard || !state) return;
    const setText = (selector: string, text: string) => { const element = document.querySelector(selector); if (element) element.textContent = text; };
    setText("[data-current-chapter]", entries[index].link.dataset.chapterLabel ?? "");
    setText("[data-mobile-state]", state.mobile);
    setText("[data-dashboard-date]", state.date);
    setText("[data-dashboard-title]", state.title);
    setText("[data-dashboard-summary]", state.summary);
    setText("[data-dashboard-focus]", state.focus);
    dashboard.dataset.stateIndex = String(index);
    dashboard.dataset.sectionKind = index === 5 ? "choices" : index > 5 ? "reference" : "scenario";
    dashboard.querySelectorAll<HTMLElement>(".dashboard-tracks, .dashboard-facts").forEach(el => { el.hidden = !state.tracks.length; });
    dashboard.querySelectorAll("[data-dashboard-track]").forEach((track, i) => {
      const values = state.tracks[i];
      if (!values) return;
      const [, label, score, value] = values;
      const text = track.querySelector("[data-track-value]");
      if (text) text.textContent = value;
      track.querySelectorAll("[data-track-dot]").forEach((dot, j) => dot.classList.toggle("is-filled", j < score));
      track.querySelector("[data-track-dots]")?.setAttribute("aria-label", `${label}: ${value}. Escala qualitativa, não uma medição.`);
    });
    dashboard.querySelectorAll("[data-dashboard-fact]").forEach((fact, i) => { if (state.facts[i]) fact.textContent = state.facts[i][1]; });
  };
  let pending = false;
  const requestUpdate = () => {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(() => { update(); pending = false; });
  };
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("hashchange", requestUpdate);
  window.addEventListener("pageshow", requestUpdate);
  window.addEventListener("load", requestUpdate, { once: true });
  document.addEventListener("toggle", requestUpdate, true);
  document.fonts?.ready.then(requestUpdate);
  update();
}
