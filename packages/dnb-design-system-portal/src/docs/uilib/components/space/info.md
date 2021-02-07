---
showTabs: true
---

import SpacingTable from 'Pages/uilib/usage/layout/spacing-table.md'

## Description

The Space component provides `margins` within the [provided spacing patterns](/uilib/usage/layout/spacing#spacing-helpers).

The reason why this exists is to make Your Syntax as clean as possible.
This way You see directly in words what the spacing is for every effected component

### Spacing Table

<SpacingTable />

### Value Format

There are a couple different ways You can define the spacing types and values:

- **Types:** `small small x-small` (combine types up to _10rem_)
- **number:** `2.5` (equivalent to `rem`)
- **rem:** `2.5rem`
- **px:** `40px` (gets converted to `rem`)

To get a spacing of e.g. **2.5rem** (40px)- You may combine types `large` and `x-small`.

```jsx
/** All of these methods will result in the same spacing */
<Space top="large x-small" right="2.5" bottom="2.5rem" left="40px" />
```

With React, you can also use an object with the different directions:

```jsx
/** All of these methods will result in the same spacing */
<Space
  space={{
    top: 'large x-small',
    right: '2.5',
    bottom: '2.5rem',
    left: '40px'
  }}
/>
```

### Components and Spacing

Every component supports the spacing patterns, so it's possible to send in the `top`, `right`, `bottom`, `left` and `space` properties directly, like:

```jsx
<Button top="large x-small medium" />
<Button space={{ top: "large x-small medium" }} />
```

### Spacing shorthands

A shorthand for getting 1rem (most used) is to simply send in a boolean, set as true. No given value in JSX means true, so you only need the property key:

```jsx
/** Equivalent to top="small" */
<Button top />

/** Equivalent to top="small" right="small" bottom="small" left="small" */
<Button space />
```

In order to set all four directions at once, you can provide a string as the `space` value:

```jsx
<Button space="large x-small medium" />
```

### Does it not work as expected?

Is `margin` not giving the expected spacing? That may be the reason due to **Margin Collapsing**. Margins collapse in the following situations:

- Adjacent siblings
- Completely empty boxes
- Parent and first or last child element

The best solution is to only use once direction of margins e.g. `bottom`. Or You can set the [collapse property](/uilib/components/space/properties) to `false`.

### Margin collapsing

In order to help out to handle unwanted margin collapsing in typography elements, se [this example](/uilib/typography/heading#example-of-margin-collapsing)
