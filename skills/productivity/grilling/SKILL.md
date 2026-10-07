---
name: grilling
description: Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or uses any 'grill' trigger phrases.
---

> **Local fork.** Base is Matt Pocock's grilling skill; local addition is the HTML round page (the "three or more questions" flow + assets/grill-round.html). Do not sync from upstream without re-applying it.

Interview the user relentlessly until you reach a shared understanding. Map this as a **design tree**: every decision branches into the decisions that hang off it.

Work the tree in **rounds**. The **frontier** is every decision whose prerequisites are already settled: the questions you can ask _now_ without guessing at answers you haven't heard yet. Ask the whole frontier in one round: number each question and give your recommended answer. Then wait for the user's answers before the next round.

A question is a title, a body of **40 words at most**, two to four labelled options, and a one-sentence recommendation. The body sets up the tension; the options carry the substance. Anything you're tempted to add beyond that is reasoning the user did not ask to read — cut it, and let their answer pull it out of you if they want it.

**Three or more questions in a round: build the page.** It costs one `cp` and one file of questions — never publish it as an artifact, that buys nothing and slows the round down.

```
mkdir -p <scratchpad>/grill/rN
cp ~/.claude/skills/grilling/assets/grill-round.html <scratchpad>/grill/rN/index.html
```

Then write `<scratchpad>/grill/rN/round.js`, which is the only thing you author — `assets/round.example.js` is its skeleton and documents every field. Option buttons prefill a free-text box per question, so the user can pick, write prose, or both, and copy one compiled reply.

Open it for them, then in the terminal list the question titles — one line each, no options, no reasoning — so they can judge whether the round is worth switching windows for, and finish with the path:

```
xdg-open <scratchpad>/grill/rN/index.html >/dev/null 2>&1 &
```

Writing `round.js` should cost you about what writing the questions into the terminal would. If you find yourself spending more than that, the questions are too long.

One or two questions: stay in the terminal, formatted like so:

```
❓ **Q1** - **<question title>**: <body, 40 words max>
   a) <option>  b) <option>  c) <option>

➡️ <recommendation, one sentence>

---

❓ **Q2** - **<question title>**: <body, 40 words max>
   a) <option>  b) <option>  c) <option>

➡️ <recommendation, one sentence>
```

Word each question so "yes" accepts your recommended answer.

Each round the user answers reshapes the tree: settled decisions push the frontier outward and unblock questions that depended on them. Recompute the frontier and ask the next round. A question whose answer depends on another question still open in this round belongs to a _later_ round, not this one.

Finding _facts_ is your job, never the user's. When a frontier question needs a fact from the environment (filesystem, tools, etc.), dispatch a sub-agent with a fresh context window to find it; don't ask the user for anything you could look up yourself. Don't block on it: a running exploration is an unsettled prerequisite, so only the questions downstream of it wait for the sub-agent to report; ask the rest of the frontier now, and name what's still in flight in the round's `pending` field. The _decisions_ are the user's: put each to them and wait.

The session is done when the frontier is empty: every branch of the design tree visited, nothing left silently assumed. Do not act on it until the user confirms you have reached a shared understanding.
