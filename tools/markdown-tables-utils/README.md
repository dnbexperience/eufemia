# Markdown Tables Utils

Shared markdown table extraction helpers used within the Eufemia monorepo.

## How it works

- Exposes a single helper, `extractMarkdownTables(md)`.
- Scans the markdown text line by line and skips fenced code blocks (` ``` ` and `~~~`).
- Detects tables by their separator row (for example `---|---`) and collects the surrounding rows.
- Returns an array of tables, where each table is an array of rows and each row is an array of cell strings.
- Handles escaped pipes (`\|`) inside cells.

## Usage

```ts
import { extractMarkdownTables } from 'markdown-tables-utils'

const tables = extractMarkdownTables(markdownString)
```

Consumed by [`eufemia-llm-metadata`](../eufemia-llm-metadata) when converting documentation pages.

## Scripts

- `yarn test` – run the unit tests with Vitest.
- `yarn lint` – lint the TypeScript sources with ESLint.
