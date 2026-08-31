# Eufemia LLM Metadata Generator

Generates Markdown copies with JSON blocks for documentation pages to aid LLMs.

## How it works

- Scans `packages/dnb-design-system-portal/src/docs/uilib` for entry MDX pages.
- Skips draft pages and robots-disallowed slugs.
- Extracts properties/events tables from `properties.mdx` / `events.mdx` (when present).
- Builds Markdown copies with JSON blocks for properties/events.
- Generates Markdown copies of each entry MDX and a top-level README (LLM entry file).
- NPM docs build: reuses the same helpers and writes to `packages/dnb-eufemia/build/docs` (no `llms.txt`, uses `llm.md`).

## Version metadata (`since` / `deprecatedIn` / `removedIn`)

Documented props and events can carry version metadata so an AI agent (or a
reader) can answer "is this available in the version I use?" and see upgrade
notes.

### Authoring (source of truth)

Set the optional fields directly on an entry in a `*Docs.ts` file. Author
annotations always win over anything inferred from git:

```ts
export const BreadcrumbProperties: PropertiesTableProps = {
  backgroundColor: {
    doc: 'No longer supported after the Breadcrumb redesign.',
    type: 'Various',
    status: 'deprecated',
    since: '11.0.0', // released in this version
    deprecatedIn: '11.4.0', // status became 'deprecated' here
    // removedIn: '12.0.0', // set when the prop is removed
  },
}
```

When you add a new prop, set `since` to the upcoming release version. When you
deprecate one, set `deprecatedIn` (alongside `status: 'deprecated'`).

### Inferred backfill

So the feature isn't empty for un-annotated props, `since` / `deprecatedIn` /
`removedIn` are inferred from git history by walking each `*Docs.ts` file and
mapping the introducing commit to the earliest release that contains it:

```bash
yarn workspace eufemia-llm-metadata build:version-metadata
```

This writes `version-metadata.json` (committed, cheap to merge at build time —
the expensive git walk only runs when you regenerate). Inferred values are
merged **under** author annotations during the docs build and are marked with
`sinceInferred: true`. `sinceFloor: true` means "at or before" — the entry was
already present in the file's first tracked commit, so its true origin may be
earlier (structured `*Docs.ts` files only go back to `v10.21.0`).

### Consuming

- Author-annotated fields appear inline in each component's props/events JSON
  (surfaced by the `component_props` MCP tool).
- The build aggregates everything (authored + inferred) into
  `build/docs/migrations.json`, exposed by the `migration_index` MCP tool with
  optional `component`, `fromVersion`, `toVersion`, and `changeType` filters. A
  call with no narrowing filter returns per-version counts only (the full index
  is large); pass a component or version range to get full entries.
