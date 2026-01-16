---
title: 'Spacing'
metadata: https://eufemia.dnb.no/uilib/layout/spacing/metadata.json
---

# Spacing

## Spatial System

Eufemia has a [Spatial System](/quickguide-designer/spatial-system) with a grid of **8px** (0.5rem). This is simply a guide grid which helps with making design decisions about the sizes of components, elements, margins, paddings etc.

![UX layout spacing](../usage/assets/ux-layout-spacing.png)

Also have a look at the designers example guide on [using Eufemia's spatial system for layout](/quickguide-designer/inspiration#using-eufemias-spatial-system-for-layout).

## Spacing Helpers

Spacing follows a specific pattern:

| Pixel | Type       | Rem     | Custom Property      |
| ----- | ---------- | ------- | -------------------- |
| 8     | `x-small`  | **0.5** | `--spacing-x-small`  |
| 16    | `small`    | **1**   | `--spacing-small`    |
| 24    | `medium`   | **1.5** | `--spacing-medium`   |
| 32    | `large`    | **2**   | `--spacing-large`    |
| 48    | `x-large`  | **3**   | `--spacing-x-large`  |
| 56    | `xx-large` | **3.5** | `--spacing-xx-large` |

**NB:** In some circumstances you may be in need of using **0.25rem** (4px) - therefore `xx-small` also exists, but as a single type. So, combining `xx-small` and `small` would not result in 0.25rem, but still remain 1rem.

### Code Editor Extensions

You may be interested to install an [Eufemia code editor extension](/uilib/helpers/tools/#code-editor-extensions) that allows you to quickly auto complete the correct spacing.

## Components and Spacing

Also, have a look at the [Space](/uilib/layout/space) component and the fact that every component supports [spacing out of the box](/uilib/layout/space#components-and-spacing).

```jsx
<Button top="small" />
<Button right="large x-small medium" />
<Button space={{ top:'small', right: 'large x-small medium' }} />
```

### CSS Custom Property

```css
margin-top: calc(var(--spacing-large) + var(--spacing-small));
```

### The Space component and Space Components (Emotion)

```js
import { Space } from '@dnb/eufemia/components'

// A div with a margin-top of 2.5rem
<Space top="large x-small">
  ...
</Space>

// With Styled Components
const Custom = styled(Space)`
  /* additional css */
`
<Custom top="large x-small">
  ...
</Custom>
```

## Using Spacing helpers

You may use the internals to build helpers suited to your needs.

```tsx
import { calc } from '@dnb/eufemia/components/space/SpacingUtils'

// With Styled Components
const StyledDiv = styled.div`
  margin-top: ${calc('medium large')};
  margin-top: ${calc('medium', 'large')};
  margin-top: ${calc('1.5rem', '2rem')};
  margin-top: ${calc('24px', '32px')};
`
```

All of the examples do output: `calc(var(--spacing-medium) + var(--spacing-large))`

Invalid values will be corrected to its nearest spacing type (e.g. 17px to `var(--spacing-small)`).
