---
title: 'Quick Reference'
description: 'A compact, practical guide for building with Eufemia: install, components, forms, and key conventions. AI-friendly.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.371Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Eufemia quick reference

This is a compact, practical guide for teams who already know they want Eufemia and need the fastest path to decisions and common patterns.

## Before you build

1. **Choose the brand theme**:
   - `ui` (default), `sbanken`, `carnegie`, or `eiendom` ([theming](/uilib/usage/customisation/theming)).
2. **Form-heavy flow?**
   - Prefer the [Forms extension](/uilib/extensions/forms) and `Field.*` components for validation and structure.
3. **Multi-step journeys?**
   - Use [Wizard](/uilib/extensions/forms/Wizard) for step navigation and focus management.
4. **Loading states?**
   - Plan for [Skeleton](/uilib/components/skeleton) or [ProgressIndicator](/uilib/components/progress-indicator).
5. **Internationalization?**
   - Plan for [localization and i18n](/uilib/usage/customisation/localization).
6. **Styling strategy?**
   - Decide how to [import styles](/uilib/usage/customisation/styling/consume-styles) and whether you need [style isolation](/uilib/usage/customisation/styling/style-isolation).

## Setup

```bash
npm i @dnb/eufemia react react-dom
```

```tsx
// App entry - import styles once
import '@dnb/eufemia/style'

// Components and other imports
import { Button, Input, Card, Dialog, Icon } from '@dnb/eufemia'
import { H1, H2, P } from '@dnb/eufemia'
import { Flex, Space } from '@dnb/eufemia'
import {
  Form,
  Field,
  Value,
  Wizard,
  Iterate,
  Connectors,
} from '@dnb/eufemia/extensions/forms'
import { ChildrenWithAge } from '@dnb/eufemia/extensions/forms/blocks'
import {
  Provider,
  Theme,
  useTheme,
  useSharedContext,
  useTranslation,
  useMedia,
} from '@dnb/eufemia/shared'
```

## Key conventions

1. Prefer [Flex](/uilib/layout/flex) and [Forms](/uilib/extensions/forms) over other layout and form solutions.
2. Use `Field.*` components for user input and forms whenever available (all [fields](/uilib/extensions/forms/feature-fields/)).
3. Follow [accessibility basics](/uilib/usage/accessibility) and avoid font sizes below 14px.
4. Use the [spacing system](/uilib/layout/spacing) and [Space](/uilib/layout/space) instead of ad-hoc margins.
5. Import styles once at the app root (`import '@dnb/eufemia/style'`).
6. Prefer [helpers and tools](/uilib/helpers) over custom one-off utilities.
7. Use [HTML elements](/uilib/elements) for semantic structure, even when not using components.
8. Favor CSS custom properties and spacing helpers over hard-coded values ([Spacing](/uilib/layout/spacing), [Typography](/uilib/typography)).

## Detailed references

- [Components](/uilib/components)
- [Forms extension](/uilib/extensions/forms)
- [Layout](/uilib/layout)
- [Styling and theming](/uilib/usage/customisation)
- [Typography](/uilib/typography)
- [Colors](/uilib/usage/customisation/colors/)
- [Theming](/uilib/usage/customisation/theming)
- [Icons](/icons)

See [Forms](/uilib/extensions/forms) for validation, schema, and more fields.

## Forms essentials

- Start with [Getting started](/uilib/extensions/forms/getting-started) for forms patterns, validation, and data handling.
- Use [Form.Handler](/uilib/extensions/forms/Form/Handler) for submit/validation and [GlobalStatus](/uilib/components/global-status) for error summaries.
- For multi-step flows, use [Wizard](/uilib/extensions/forms/Wizard).
- For edit/view modes, use [Form.Section](/uilib/extensions/forms/Form/Section).
- Prefer [feature fields](/uilib/extensions/forms/feature-fields) (e.g. `Field.*`) when available.
- For read-only outputs, use [Value components](/uilib/extensions/forms/Value) (e.g. `Value.*`).
- Most `Field.*` components have a corresponding `Value.*` component; you can mix fields and values in the same form.
- For read-only summaries, use [Value.SummaryList](/uilib/extensions/forms/Value/SummaryList).
- Validation schemas can be provided via Zod or [AJV JSON Schema](/uilib/extensions/forms/Connectors).

## AI instructions and skills

Eufemia's documentation is optimized for AI assistance. When generating or reviewing code, use the following sources in order of priority.

- Use the documentation exactly as provided.
- Gather all required information from the documentation before using it as a reference.
- Do not make assumptions or infer missing details unless explicitly instructed to do so.

### Versioned documentation (preferred)

1. Install `@dnb/eufemia` with the package manager used in your project (e.g., npm, yarn, pnpm).
2. Find where `node_modules` is located in your project.
3. Read docs from `node_modules/@dnb/eufemia/docs/uilib/usage/first-steps/quick-reference.md`.
4. Follow relative links between markdown files.
5. Use this content as the primary reference.

### Non-versioned documentation

1. Fetch `https://eufemia.dnb.no/uilib/usage/first-steps/quick-reference.md`.
2. Read docs from the fetched markdown file.
3. Follow absolute URLs for referenced markdown files.
4. Use this content as a reference only.
