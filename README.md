# Threshold

A local web app for one hard message you are about to send.

This repository is a Forage Harness test. The brief below is the whole product. Plot should plan from it. Smith should implement that plan. Do not add a platform, an account system, or a feed.

## What it is

You are about to send a difficult email, Slack, or text, or you are about to walk into a conversation you would rather skip. Threshold asks one honest worry, gives one reviewed reframe and one suggested line, then stops.

It is a thoughtful colleague who already respects you. It is not a coach, a therapist, or a chatbot that keeps going.

This is the same family of product as Anchor Lift: a short, grounded loop, local first, no performance of wellness. Anchor Lift is for a hard meeting on the calendar. Threshold is for the message in the draft box.

## Who it is for

One person on their own machine. A private pilot, not a hosted service.

## The loop (v1)

1. Name the situation in one line (who it is for, and what kind of send: email, chat, or in person).
2. Paste the draft, or leave it blank if there is no draft yet.
3. Answer one honest worry question. The app asks exactly one. It does not interview you.
4. Get one reframe and one suggested line. Then stop. No follow-up questions, no "want me to rewrite the whole thing."
5. Optional: copy the suggested line. Optional: mark whether it helped. That is all.

## Voice

Second person. Specific. Inclusive. Short. Do not diagnose. Do not treat the user's fear as a fact. Do not praise them for using the app.

The reframe and the suggested line must come from a small reviewed library in the repo (plain Markdown or JSON), not from a model inventing advice on the fly. Matching can be keyword or embedding later. v1 may be dumb matching. Invented advice is a bug.

## Screens

Keep three surfaces. No more.

| Screen | What it shows | Primary action |
| --- | --- | --- |
| Home | Empty state or the last saved situation. No fake sample drama. | Start |
| Draft | Situation line, optional pasted draft, the one worry question. | Get the lift |
| Lift | The situation echoed back, one reframe, one suggested line, copy, "this helped" / "not this." | Done |

No settings page in v1. No history gallery. Persist the last situation locally so a refresh does not wipe it. Older items can wait.

## Stack

- Vite + React on loopback only.
- Tailwind is fine; do not add a component kit.
- Persist last situation in `localStorage`. No database.
- Bind to a high port in 4100–4999, never 3000 or 3001.
- `npm test` must exist. Unit-test the matcher and the "one question, then stop" rule. Playwright can wait until there is a screen to click.

## Non-goals (v1)

- Accounts, OAuth, multi-user, billing.
- Sending the email or posting to Slack for the user.
- Calendar, contacts, or inbox sync.
- A public URL.
- A model that writes unconstrained advice.
- Native apps.
- Dark-pattern engagement (streaks, badges, daily nag).

## Done when

A person can run `npm install` and `npm run dev`, open the local URL, complete the loop once, copy a suggested line, refresh, and still see the last situation. Tests for the matcher pass. There is no second question after the lift.

## For Plot

Read this file. Map the files you will create. The plan should name routes, the library format, and the tests. Do not implement. Hand Ready to Smith with a claimed path such as `src/`.

## For Smith

Implement only that plan. Smallest change that meets **Done when**. Branch `forage/issue-N` off `main`. Do not invent extra screens.

## For Prover

Run `npm test`. If Playwright is not there yet, unit tests are the bar. Do not mark verify ok with an empty test command.
