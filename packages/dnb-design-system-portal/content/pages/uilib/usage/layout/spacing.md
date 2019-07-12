---
title: 'Spacing'
draft: false
---

# Spacing

## Spatial System

Eufemia has a [Spatial System](/quickguide-designer/spatial-system) with a grid of **8px** (0.5rem). This is simply a guide grid which helps with making design decisions about the sizes of components, elements, margins, paddings etc.

![UX layout spacing](../assets/ux-layout-spacing.png)

## Spacing Helpers

Spacing follows a specific pattern:

| Custom Property      | Size       |
| -------------------- | ---------- |
| `--spacing-x-small`  | **0.5rem** |
| `--spacing-small`    | **1rem**   |
| `--spacing-medium`   | **1.5rem** |
| `--spacing-large`    | **2rem**   |
| `--spacing-x-large`  | **3rem**   |
| `--spacing-xx-large` | **3.5rem** |

## Using a Spacing helper

The **SpacingHelper** can be used for all kinds of systems.
The idea is, You send in `SpacingHelper({ top: 'large' })` and will get `{ marginTop: 2rem }` in return.

### Styled Components (Emotion)

```js
import { SpacingHelper } from 'dnb-ui-lib/shared'

// With Styled Components
const Spacing = styled.div(SpacingHelper)

// JSX - with a margin-top of 2rem
<Spacing top="large">
  ...
</Spacing>
```

### CSS Custom Property

```css
margin-top: var(--spacing-large);
```
