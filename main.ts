// Leonida Ledger entry program (Node 22, standard library only).
// The guide is plain static files under app/: index.html, its modules and styles,
// and data/trophies.json with all 55 trophies and their guides. It runs offline,
// loading nothing over the network. This program hands the guide in: it copies
// app/ and screenshots/ from this repository into the output directory and writes
// dossier.json there with the vendored make.fun library, byte for byte the summary
// the scorer rebuilds. vendor/makefun-frontend.ts is the kit's copy, unchanged.
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoRoot, 'app'), join(outputDir, 'app'), { recursive: true });
mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
if (existsSync(join(repoRoot, 'screenshots'))) {
  cpSync(join(repoRoot, 'screenshots'), join(outputDir, 'screenshots'), { recursive: true });
}

// The scorer's own caps: only text_max_bytes shapes the dossier bytes; the rest
// refuse an entry the scorer would refuse (more than 4 screenshots or one over
// 256 KiB; more than 993 files and directories in app/ or 48 MiB of app files,
// counted beside /output's own 1000-entry cap with screenshots/ and dossier.json).
writeFileSync(
  join(outputDir, 'dossier.json'),
  buildDossier(outputDir, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 50331648 }),
);
