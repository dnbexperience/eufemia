---
name: eufemia-migrate
description: Migrate Eufemia usage using current release documentation. Use when upgrading Eufemia, resolving removed APIs, applying codemods, or planning a version migration.
compatibility: Requires the Eufemia MCP server and its packaged documentation.
metadata:
  owner: dnbexperience/eufemia
  manifest-version: '1'
---

# Migrate Eufemia

Base migrations on the installed and target Eufemia versions.

1. Determine the current and target package versions. Call `docs_meta` when
   available. Do not call `docs_entry` unless an exhaustive documentation index
   is explicitly required.
2. Use `docs_search` to find every release guide between those versions, then
   read the relevant documents with `docs_read`.
3. Inventory affected imports, properties, events, styles, tokens, types, and
   documented behavior changes in the target project.
4. Use documented codemods only for their declared versions and transformations.
   Review their diff before continuing.
5. For remaining component changes, use `component_find` and `component_props`
   to verify the target API. Do not derive migrations from stale examples.
6. Separate mechanical changes from behavioral and visual changes. Implement
   and validate them in reviewable steps.
7. Run relevant type checks, linting, integration tests, accessibility checks,
   and visual verification before declaring the migration complete.

Do not use broad regular-expression replacements where component-specific
semantics differ. Record unresolved changes and the documentation needed to
decide them.
