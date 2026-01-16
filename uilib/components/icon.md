---
title: 'Icon'
description: 'The main Icon component is basically a wrapper for whatever icon you place within it.'
metadata: https://eufemia.dnb.no/uilib/components/icon/metadata.json
---

## Import

```tsx
import { Icon } from '@dnb/eufemia'
```

## Description

The main Icon component is a wrapper for whatever icon you place within it. This means a `span` wrapping an inline `SVG`.

You can use any content you like inside this `Icon` component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/icon)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/icon)

### Why use it?

You will get several advantages when using it, such as:

- Responsiveness in terms of `font-size`
- Coloring
- Accessibility

### Importing Icons

In case your environment does not support tree-shaking, import the icons explicitly.

```jsx
// Named ES import
import { bell } from '@dnb/eufemia/icons'

// or named import with modifier
import { bell as Bell } from '@dnb/eufemia/icons'

// Default and explicit ES import
import Bell from '@dnb/eufemia/icons/bell'
```

### Icon Sizes

_Exists in the [Icon Library](/icons)_

- **default** `1rem` (16px)
- **medium** `1.5rem` (24px)

_Additional Sizes_

- **small** `0.75rem` (12px)
- **large** `2rem` (32px)
- **x-large** `2.5rem` (40px)
- **xx-large** `3rem` (48px)
- **custom-size** will not be responsive. Width and Height is set as `pixels`

### Custom project Icons

For decorative or functional icons (not illustrations), use `SVG` as it gives the user responsiveness and better accessibility. It also gives you more control, so you can change the color and size inherited by the parent HTML element.

To optimize your SVG icons to be used with Eufemia, you can follow these steps or at least get inspired:

1. Make sure your SVG icon fits in the two sizes (default of `16px` and medium of `24px`) with the correct stroke thickness of `1.5px`.
1. **Copy** the SVG markup (in Figma, `right click` -> `Copy as` -> `Copy as SVG`).
1. **Declutter** and remove ID attributes in the markup, so they do not appear twice in your web application DOM. In most cases, you do not need `<defs ... />` and the corresponding ids anyway.
1. **Optimize** the SVG. Use e.g. [Online SVGOMG](https://jakearchibald.github.io/svgomg/) by using `Paste markup`.
1. **NB:** Do not remove `viewBox`! The `viewBox` will together with some CSS ensure that the icon scales based on the root font-size.
1. Copy again the optimized markup and paste it into your JSX component (inline) or SVG file.
1. Consume the custom icons with either dynamic imports (`import(...)`) if you have many icons, or use static imports, like so:

#### If you have an SVG loader

```jsx
import ImportedSVGIcon from 'my-icons/custom_icon.svg'

render(<Icon icon={ImportedSVGIcon} />)
```

#### Inline the SVG in your JSX

```jsx
function CustomSVGIcon(props) {
  return <svg {...props}>...</svg>
}

render(<Button icon={CustomSVGIcon} />)
```

#### SVG import in Create React App

```jsx
import { ReactComponent as CustomIcon } from './custom_icon.svg'

render(<Icon size="medium">{CustomIcon}</Icon>)
```

### Primary Icon

There is also the [IconPrimary](/uilib/components/icon-primary) component, which comes with all the [Primary Icons](/icons/primary) included in `@dnb/eufemia`. You do not have to import the primary icons separately.

## Demos

### Default and Medium-sized icons (Responsive)

```tsx
<Icon icon={Bell} title="Give Icons a Title, or ..." />
<Icon icon={BellMedium} aria-hidden />
<Bell title="I'm not responsive!" />
{/* <- Not responsive! */}
```

### Icons with border

**NB:** Use it with caution. It should not be used where it can confuse users with being a clickable button.

```tsx
render(
  <P>
    <Icon border={true} icon={Bell} right />
    <Icon border={true} icon={BellMedium} size="medium" right />
    <IconPrimary border={true} icon="information" right />
    <IconPrimary border={true} icon="information" size="medium" right />
    <Button icon={<IconPrimary icon="add" border />} text="Button" />
  </P>,
)
```

### Responsive to its inherited `font-size`

```tsx
render(
  <h1 className="dnb-h--xx-large">
    h1 with auto sized <Icon icon={BellMedium} size="auto" aria-hidden />{' '}
    icon
  </h1>,
)
```

### Icon color variations

All of these methods will output the same color

```tsx
<Icon
  icon={BellMedium}
  color="var(--color-fire-red)"
  title="CSS variable"
/>
<Icon icon={BellMedium} color="#DC2A2A" title="Hex" />
<Icon icon={BellMedium} color="rgb(220,42,42)" title="RGB" />
```

### Icon size variations

The official supported sizes are `default` and `medium`.

**NB:** If you need to use the `large`, `x-large` or `xx-large` sizes, then you should use the `*_medium` version of the icon. Ensure you import the `*_medium` version of the icon.

```tsx
<Icon icon={BellMedium} title="Beach" size="large" />
<Icon icon={BellMedium} title="Beach" size="x-large" />
<Icon icon={BellMedium} title="Beach" size="xx-large" />
```
