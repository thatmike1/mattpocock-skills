/* Copy this to round.js next to grill-round.html and replace the contents.
   This file is the only thing that changes between rounds. */

window.GRILL = {
  round: {
    eyebrow: "Grill · round 1", // "Grill · round N", or the subject
    title: "", // what this round is deciding
    lede: "", // optional, one or two sentences
    pending: "", // optional: facts sub-agents are still fetching
  },

  questions: [
    {
      title: "", // the question itself, as a sentence
      body: "", // 40 words max — set up the tension, nothing more
      options: [
        { code: "a", label: "", detail: "" }, // detail: one line, the trade-off
        { code: "b", label: "", detail: "" },
      ],
      recommend: { code: "a", why: "" }, // one sentence; omit if you have none
    },
  ],
};
