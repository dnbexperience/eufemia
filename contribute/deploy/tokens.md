---
title: 'Design tokens (WIP)'
version: 11.2.0
generatedAt: 2026-05-08T07:25:35.810Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Design tokens (WIP)

## Description

---

**Beta:** The `--token-*` CSS custom properties are in beta. We encourage you to start using them and welcome your feedback. The token API may still change, but we will communicate any breaking changes.

---

The design tokens are exported manually from Figma and converted to CSS variables with the `make-properties` script. We only export colors for now. No sizes or typography.

## Overview

- Design tokens are not automatically exported from Figma.
- We only export colors. Sizes and strings (typography) are skipped for now.
- We export Foundation colors, plus light and dark brand token modes for DNB and Sbanken (Carnegie is light-only for now)

## How to update

### 1. Exporting design tokens

We currently export the Figma variable collections for:

- "Foundation" collection "colors" (`Mode 1.tokens 5.json`)
- "💻 Eufemia - Web" collection "brand" with modes:
  - "dnb-light" (`DNB Light.tokens.json`)
  - "dnb-dark" (`DNB Dark.tokens.json`)
  - "sbanken-light" (`Sbanken Light.tokens.json`)
  - "sbanken-dark" (`Sbanken Dark.tokens.json`)
  - "dnbcarnegie-light" (`DNB Carnegie Light.tokens.json`)

These files are manually exported from Figma and placed in the `packages/dnb-eufemia/src/style/themes/figma` folder.

Detailed steps:

- Go to the "💻 Eufemia - Web" file in Figma. (You need edit permissions to see sub-collections)
- Active "Design" mode.
- Click the "Open variables" icon next to the label "Variables" in the right side-menu (must deselect elements to see the side-menu).
- Click the "Collections options" icon next to the "Collections" heading and ensure "All collections" is selected.
- Right click the collections "brand" and "colors" and select "Export Modes".
- Unzip the downloaded .json files and place them in the `packages/dnb-eufemia/src/style/themes/figma`

We export the collections from the same Figma file in order to ensure the collections are in sync.

### 2. Generate CSS files

The CSS files are automatically generated during the "Prebuild" step by the `makePropertiesFile.ts` script (`packages/dnb-eufemia/scripts/prebuild/tasks/makePropertiesFile.ts`).

#### Generate locally (manual)

To generate the files manually you can run the command `yarn workspace @dnb/eufemia make-properties`.

## Naming conventions/transforms

Since Figma has different rules and limitations than CSS we have established some naming conventions to avoid errors.

- only use alphanumeric characters. (a-z and 0-9)
- Variables are not case-sensitive. (`onDark` and `ondark` are considered the same variable)
- We use dashes (`-`) to separate groups and words.

### Transforms

During the CSS generation, Figma variables are converted to lower case. And groups are separated by dashes (`-`).

Only characters `a-z` `A-Z` `0-9`. and `-` are supported. Any unsupported characters will throw an error.

We also add the prefix `token` to the variables from the `Brand` collection.

### Example

Figma variable: `Color/Dimmer/Action-Pressed-Subtle-OnDark`

CSS variable: `--token-color-dimmer-action-pressed-subtle-ondark`

### Potential issues

Even following all the rules, we still risk naming overlap since groups and words use the same separator in CSS `color/action/pressed` and `color/action-pressed` would map to the same variable.

But these will at least be caught on build.
