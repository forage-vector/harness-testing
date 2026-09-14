import { describe, expect, it } from "vitest";
import library from "./library.json";
import {
  WORRY_QUESTION,
  canAskAnotherQuestion,
  matchLift,
  nextScreen,
} from "./matcher.js";

describe("matchLift", () => {
  it("picks anger when the draft is hot", () => {
    const got = matchLift("note to Jordan", "This is unacceptable and I am furious", "they will explode", library);
    expect(got.id).toBe("anger");
    expect(got.line).toMatch(/frustrated/i);
  });

  it("picks apology for a miss", () => {
    const got = matchLift("to the team", "I am sorry I dropped this", "they will think I am careless", library);
    expect(got.id).toBe("apology");
  });

  it("falls back when nothing matches", () => {
    const got = matchLift("hello", "", "a quiet Tuesday", library);
    expect(got.id).toBe("fallback");
  });

  it("does not invent a line outside the library", () => {
    const lines = new Set(library.map((r) => r.line));
    const got = matchLift("xyz", "qwerty", "asdf", library);
    expect(lines.has(got.line)).toBe(true);
  });
});

describe("one question then stop", () => {
  it("exposes exactly one worry question", () => {
    expect(WORRY_QUESTION.includes("?")).toBe(true);
    expect(WORRY_QUESTION.split("?").length).toBe(2);
  });

  it("refuses a second question on the lift screen", () => {
    expect(canAskAnotherQuestion("draft")).toBe(true);
    expect(canAskAnotherQuestion("lift")).toBe(false);
  });

  it("goes home after done, not into another interview", () => {
    expect(nextScreen("lift", "done")).toBe("home");
    expect(nextScreen("lift", "lift")).toBe("lift");
  });
});
