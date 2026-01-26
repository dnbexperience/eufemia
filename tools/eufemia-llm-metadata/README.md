# Eufemia LLM Metadata Generator

Generates Markdown copies with JSON blocks for documentation pages to aid LLMs.

## How it works

- Scans `packages/dnb-design-system-portal/src/docs/uilib` for entry MDX pages.
- Skips draft pages and robots-disallowed slugs.
- Extracts properties/events tables from `properties.mdx` / `events.mdx` (when present).
- Builds Markdown copies with JSON blocks for properties/events.
- Generates Markdown copies of each entry MDX and a top-level README (LLM entry file).
- NPM docs build: reuses the same helpers and writes to `packages/dnb-eufemia/build/docs` (no `llms.txt`, uses `llm.md`).
