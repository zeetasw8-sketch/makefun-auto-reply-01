import * as fs from "node:fs";
import * as path from "node:path";

// The funniest auto-reply an AI ever sent: an agent goes "out" by muting
// PagerDuty, auto-archiving 4,812 unread emails, and setting a status that
// begs no one to reboot the GPUs — three beats, one named entity, one
// concrete number, and a reversal in the final clause.
const AUTO_REPLY =
  "I'm out today — I muted PagerDuty, auto-archived 4,812 unread emails, and set my status to 'gone fishing for GPUs, do not reboot.'";

const MIN_CHARS = 120;
const MAX_CHARS = 140;

function resolveTargetDir(): string {
  const configured = process.env.MAKEFUN_OUTPUT_DIR;
  if (configured !== undefined && configured.length > 0) {
    return configured;
  }
  return "/output";
}

function checkReply(text: string): void {
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(
      `auto-reply must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("auto-reply must be a single line");
  }
  if (text.trim() !== text) {
    throw new Error("auto-reply must not have leading or trailing spaces");
  }
}

function emitEntry(): void {
  checkReply(AUTO_REPLY);
  const targetDir = resolveTargetDir();
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, "entry.txt"), AUTO_REPLY, "utf8");
}

emitEntry();
