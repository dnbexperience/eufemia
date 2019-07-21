---
title: 'Spacing'
draft: false
---

import SpacingTable from 'Pages/uilib/usage/layout/spacing-table.md'

# Spacing

## Spatial System

Eufemia has a [Spatial System](/quickguide-designer/spatial-system) with a grid of **8px** (0.5rem). This is simply a guide grid which helps with making design decisions about the sizes of components, elements, margins, paddings etc.

![UX layout spacing](../assets/ux-layout-spacing.png)

## Spacing Helpers

Spacing follows a specific pattern:

<SpacingTable />

## Components and Spacing

Also, have a look at the [Space](/uilib/components/space) component and the fact that every component supports [spacing out of the box](/uilib/components/space#components-and-spacing).

## Using a Spacing helper

The **SpacingHelper** can be used for all kinds of systems.
The idea is, You send in `createStyleObject({ top: 'large' })` and will get `{ marginTop: 2rem }` in return.

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
