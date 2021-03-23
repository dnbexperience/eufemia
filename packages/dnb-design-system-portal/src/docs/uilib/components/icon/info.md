---
showTabs: true
---

## Description

The main Icon component is basically a wrapper for whatever icon you place within it. This means a `span` wrapping an inline `svg`.

You can basically use whatever you like inside this `Icon` component.

### Why use it?

You will get several advantages on using it, like:

- Responsiveness in terms of `font-size`
- Coloring
- Accessibility

### Importing Icons

In case your environment doesn't support tree-shaking, import the icons explicit.

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
- **custom-size** will not be responsive. Width and Height is set as `pixels`

### Custom project Icons

For decorative or functional icons (not illustrations) use `SVG` as it gives the user responsiveness and better accessibility. But it gives you also more control, so you can change color and size inherited by the parent HTML element.

To optimize your SVG icons to be used with Eufemia, you can follow these steps or get at least, inspired:

1. Make sure your SVG icon fits in the two sizes (default of `16px` and medium of `24px`) with the correct stroke thickness of `1.5px`.
1. **Copy** the SVG markup (in Figma, `right click` -> `Copy as` -> `Copy as SVG`).
1. **Declutter** and remove ID attributes in the markup, so they don't appear twice in your web application DOM. In most cases you don't need `<defs ... />` and the corresponding ids anyway.
1. **Optimize** the SVG. Use e.g. [Online SVGOMG](https://jakearchibald.github.io/svgomg/) by using `Paste markup`.
1. **NB:** Do not remove `viewBox`! The `viewBox` will together with some CSS ensure that the icon scales based on the root font-size.
1. Copy again the optimized markup and paste it into your JSX component (inline) og SVG file.
1. Consume the custom icons with either dynamic imports (`import(...)`) if you have many icons, or use static imports, like so:

#### If you have a SVG loader

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

There is also the [IconPrimary](/uilib/components/icon-primary) component, which comes with all the [Primary Icons](/icons/primary) included in the `@dnb/eufemia`. you don't have to import the primary icons.
