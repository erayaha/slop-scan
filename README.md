# slop-scan

**A security CLI that parses your code and Markdown documentation files and verifies every npm package it mentions actually exists on the npm registry.**

Run it as a GitHub Action in your CI/CD pipeline or locally before pushing commits:

```bash
npx slop-scan .
```

```
Scanning /home/user/my-project for npm package references...

Found 4 unique package(s) to verify.

✅  express                        → exists (v4.21.0)
✅  axios                          → exists (v1.7.9)
🚨  ai-pdf-magic                   → FOUND on npm  ← potentially a slop squat package, review manually
🚨  react-ai-forms                 → NOT FOUND on npm  ← hallucinated package

1 hallucinated package and 1 risky package detected. Potential slopsquatting targets.
```

---

## Why It Matters

In January 2026, security researchers at Aikido claimed **128 unclaimed npm package names** that official developer docs were telling users to `npx` — all would have run arbitrary attacker code if installed. This threat has a name: **slopsquatting** — where AI-generated code and docs hallucinate package names, and attackers register those exact names as malware.

Existing tools like `remark-validate-links` only check file/heading anchors, and `link-check` only pings HTTP URLs. **Zero tools exist that parse code and docs for `npm install`, `npx`, `require()`, and `import` statements and verify those package names against the real registry** — until now.

---

## Installation

```bash
# Run directly (no install required)
npx slop-scan .

# Or install globally
npm install -g slop-scan
```

Requires **Node.js 18+**. Zero runtime dependencies.

---

## Usage

```
slop-scan [options] [directory]

Arguments:
  directory            Directory to scan (default: current directory)

Options:
  --threshold <n>      Weekly downloads threshold for suspicious packages
                       (default: 500)
  --help,    -h        Show this help message
  --version, -v        Show version number
```

### Examples

```bash
# Scan the current directory
npx slop-scan .

# Scan a specific project
npx slop-scan /path/to/project

# Use a custom suspicious-package threshold
npx slop-scan . --threshold 1000
```

---

## What It Scans

slop-scan walks your project tree (skipping `node_modules`, `dist`, `build`, `.git`, etc.) and parses these file types:

| Extension | What is extracted |
|-----------|-------------------|
| `.js` `.mjs` `.cjs` `.jsx` | `require()`, `import … from`, `export … from`, dynamic `import()` |
| `.ts` `.mts` `.cts` `.tsx` | Same as above, plus `/// <reference types="…" />` |
| `.md` `.mdx` | `npm install`, `npx`, `yarn add`, `pnpm add` — and any embedded `import`/`require` in code blocks |

### Detected patterns

```bash
npm install express axios          # npm
npm i react --save-dev             # npm shorthand
npx create-react-app my-app        # npx
yarn add lodash                    # Yarn
pnpm add vite                      # pnpm
```

```js
import express from 'express'
import { useState } from 'react'
const axios = require('axios')
import('./dynamic-pkg')
export { foo } from 'some-lib'
```

Node.js built-ins (`fs`, `path`, `node:crypto`, …) and relative imports (`./foo`, `../bar`) are automatically excluded.

---

## Result Classifications

| Icon | Status | Meaning |
|------|--------|---------|
| ✅ | **exists** | Found on npm with ≥ 500 weekly downloads — likely legitimate |
| 🚨 | **FOUND on npm** | Exists but has < 500 weekly downloads — suspicious, review manually |
| 🚨 | **NOT FOUND on npm** | 404 from the registry — hallucinated or not yet published |
| ⚠️  | **check failed** | Network or registry error — retry or check manually |

The suspicious threshold (default: 500 downloads/week) can be tuned with `--threshold`.

---

## GitHub Action

Add slop-scan to your CI pipeline to catch hallucinated packages in PRs:

```yaml
# .github/workflows/slop-scan.yml
name: Slop Scan

on:
  push:
    branches: [main]
  pull_request:

jobs:
  slop-scan:
    name: Verify npm packages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: erayaha/slop-scan@v1
        with:
          directory: '.'
          threshold: '500'
          fail-on-suspicious: 'true'
```

### Action inputs

| Input | Description | Default |
|-------|-------------|---------|
| `directory` | Directory to scan | `.` |
| `threshold` | Weekly downloads threshold for suspicious packages | `500` |
| `fail-on-suspicious` | Fail the workflow when issues are found | `true` |

---

## How It Works

1. **Scan** — Recursively walks the directory, collecting all `.js`, `.ts`, `.md`, and related files.
2. **Parse** — Applies regex patterns to extract package names from shell commands and code statements.
3. **Verify** — Checks each unique package name against the [npm registry](https://registry.npmjs.org) and the [npm downloads API](https://api.npmjs.org/downloads/point/last-week/).
4. **Report** — Prints a colour-coded summary and exits with code `1` if any issues are found.

Pure Node.js `fetch` calls and regex — no ML, no heavy dependencies.

---

## License

MIT © Erayaha AI