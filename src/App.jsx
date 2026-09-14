import { useEffect, useMemo, useState } from "react";
import library from "./library.json";
import {
  STORAGE_KEY,
  WORRY_QUESTION,
  matchLift,
  nextScreen,
} from "./matcher.js";

const empty = { situation: "", kind: "email", draft: "", worry: "" };

export default function App() {
  const [screen, setScreen] = useState("home");
  const [form, setForm] = useState(empty);
  const [last, setLast] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLast(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const lift = useMemo(
    () => (screen === "lift" ? matchLift(form.situation, form.draft, form.worry, library) : null),
    [screen, form]
  );

  function saveLast(entry) {
    setLast(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
  }

  function go(action) {
    const next = nextScreen(screen, action);
    if (action === "lift") {
      const matched = matchLift(form.situation, form.draft, form.worry, library);
      saveLast({ ...form, ...matched, at: new Date().toISOString() });
    }
    setScreen(next);
  }

  function copyLine() {
    if (lift?.line) navigator.clipboard.writeText(lift.line);
  }

  return (
    <main>
      <h1>Threshold</h1>
      <p className="lede">One hard message. One worry. One line. Then stop.</p>

      {screen === "home" && (
        <section>
          <p>You are about to send something difficult. Threshold will not interview you and will not send it for you.</p>
          <div className="actions">
            <button type="button" onClick={() => { setForm(empty); go("start"); }}>
              Start
            </button>
          </div>
          {last && (
            <div className="last">
              <p className="muted">Last situation (still here after refresh)</p>
              <div className="card">
                <strong>{last.situation || "Untitled"}</strong>
                <p className="line">{last.line}</p>
              </div>
            </div>
          )}
        </section>
      )}

      {screen === "draft" && (
        <section>
          <label htmlFor="situation">Who is this for, and what kind of send?</label>
          <input
            id="situation"
            value={form.situation}
            onChange={(e) => setForm({ ...form, situation: e.target.value })}
            placeholder="Jordan, email"
          />
          <label htmlFor="draft">Draft (optional)</label>
          <textarea
            id="draft"
            value={form.draft}
            onChange={(e) => setForm({ ...form, draft: e.target.value })}
            placeholder="Paste it, or leave blank"
          />
          <label htmlFor="worry">{WORRY_QUESTION}</label>
          <textarea
            id="worry"
            value={form.worry}
            onChange={(e) => setForm({ ...form, worry: e.target.value })}
          />
          <div className="actions">
            <button type="button" disabled={!form.situation.trim() || !form.worry.trim()} onClick={() => go("lift")}>
              Get the lift
            </button>
            <button type="button" className="secondary" onClick={() => setScreen("home")}>
              Cancel
            </button>
          </div>
        </section>
      )}

      {screen === "lift" && lift && (
        <section>
          <p className="muted">{form.situation}</p>
          <div className="card">
            <p className="muted">Reframe</p>
            <p>{lift.reframe}</p>
          </div>
          <div className="card">
            <p className="muted">Suggested line</p>
            <p className="line">{lift.line}</p>
          </div>
          <div className="actions">
            <button type="button" onClick={copyLine}>Copy the line</button>
            <button type="button" className="secondary" onClick={() => go("done")}>This helped</button>
            <button type="button" className="secondary" onClick={() => go("done")}>Not this</button>
          </div>
          <p className="muted">There is no second question.</p>
        </section>
      )}
    </main>
  );
}
