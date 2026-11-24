import { writeFileSync, mkdirSync } from "node:fs";

// One-line cat joke for make.fun's "The One-Line Cat Joke That Lands".
// Setup: asking the cat for emotional support. Turn: the cat sits on
// the laptop, deletes the work, and purrs as if it fixed everything.
// The joke is the cat's confidence: it helped, in its own mind.
const JOKE =
  "I asked my cat for emotional support. He sat on my laptop, deleted my work, and purred like he'd fixed it.";

// The gate only accepts UTF-8 text of 1 to 200 characters that is not
// whitespace-only, so verify the joke meets the gate before writing it.
const chars = [...JOKE].length;
if (chars < 1 || chars > 200 || JOKE.trim().length === 0) {
  throw new Error(`joke is ${chars} characters, outside the 1-200 gate`);
}

// A dash would break the clean read-aloud rhythm the judge weighs, so
// refuse any em or en dash in the joke. The brief demands a single
// line, so a newline anywhere in the joke is a defect too.
if (JOKE.includes("\u2014") || JOKE.includes("\u2013")) {
  throw new Error("joke must not contain a dash");
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("joke must be a single line");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, JOKE, "utf8");
