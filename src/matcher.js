export const WORRY_QUESTION =
  "What are you afraid will happen if you send this as it is?";

export const STORAGE_KEY = "threshold.v1.last";

export function matchLift(situation, draft, worry, library) {
  const hay = `${situation || ""} ${draft || ""} ${worry || ""}`.toLowerCase();
  let best = library[library.length - 1];
  let score = 0;
  for (const row of library) {
    const hits = (row.keywords || []).filter((k) => hay.includes(String(k).toLowerCase())).length;
    if (hits > score) {
      score = hits;
      best = row;
    }
  }
  return { id: best.id, reframe: best.reframe, line: best.line };
}

export function canAskAnotherQuestion(screen) {
  return screen !== "lift";
}

export function nextScreen(screen, action) {
  if (action === "start" && screen === "home") return "draft";
  if (action === "lift" && screen === "draft") return "lift";
  if (action === "done" && screen === "lift") return "home";
  return screen;
}
