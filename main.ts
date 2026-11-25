import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const AUTO_REPLY =
  "I'm out today — I muted PagerDuty, auto-archived 4,812 unread emails, and set my status to 'gone fishing for GPUs, do not reboot.'";

function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function main(): void {
  if (AUTO_REPLY.length < 120 || AUTO_REPLY.length > 140) {
    throw new Error(`auto-reply must be 120-140 characters, got ${AUTO_REPLY.length}`);
  }
  if (AUTO_REPLY.includes("\n")) {
    throw new Error("auto-reply must be a single line");
  }
  mkdirSync(outputDir(), { recursive: true });
  writeFileSync(join(outputDir(), "entry.txt"), AUTO_REPLY);
}

main();
