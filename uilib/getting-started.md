---
title: 'Getting Started'
description: 'A fast path to using Eufemia in your app. Install, import styles, render your first component, and explore theming and customization.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.318Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Getting Started

Welcome to Eufemia — DNB's design system for building accessible, consistent digital experiences. Pick the guided intro or jump straight into the quick start below.

## Start Here

<Section backgroundColor="mint-green" innerSpace>
  <Button href="/uilib/intro" size="large" text="Quick Intro" />
</Section>

## Quick Start

1. Install the library (React and React DOM are required):

```bash
npm i @dnb/eufemia react react-dom
# or
yarn add @dnb/eufemia react react-dom
# or
pnpm add @dnb/eufemia react react-dom
```

2. Import the CSS once in your app entry (theme included):

```js
import '@dnb/eufemia/style'
```

3. Render your first component:

```tsx
import { Button } from '@dnb/eufemia'

export default function App() {
  return (
    <Button text="Hello Eufemia" onClick={() => console.log('clicked')} />
  )
}
```

Learn more about importing CSS in [Importing Styles](/uilib/usage/customisation/styling/consume-styles/).

## Choose Your Path

- [First steps and basics](/uilib/usage/first-steps/the-basics)
- [Quick reference](/uilib/usage/first-steps/quick-reference)
- [Use components](/uilib/components)
- [Use HTML elements](/uilib/elements)
- [Styling and CSS setup](/uilib/usage/customisation/styling)
- [Layout](/uilib/usage/layout)
- [Theming and brand customization](/uilib/usage/customisation/theming)
- [Internationalization (i18n)](/uilib/usage/customisation/localization)
- [Helpers and tools](/uilib/usage/first-steps/tools)
- [Contribution guide](/contribute)
- [Forms, validation and schema](/uilib/extensions/forms)

## Code Editor Extensions

Boost your workflow with the [Eufemia VS Code extension](/uilib/usage/first-steps/tools/#code-editor-extensions) (spacing, typography and more).

# Welcome Info

## Please contribute

Eufemia is a [living design system](/design-system/about/living-system) that does not have a "finished" state. Continuous improvement, removal, and addition of content are essential to keeping it relevant as a resource for current and future DNB products and services.

Your input, comments, and discussions are all valuable. Please [reach out to us](/design-system/contact) and [contribute](/contribute).
