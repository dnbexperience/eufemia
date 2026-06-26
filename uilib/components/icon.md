---
title: 'Icon'
description: 'Use Icon to render and size an icon in line with Eufemia styling.'
version: 11.8.0
generatedAt: 2026-06-26T12:38:09.290Z
checksum: b98a4453b871bd7a5f0c3d48e34ad2f3f5acac3fed6daf200822fe89dc43f67d
---

# Icon

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

### Filled Icons

Some icons support a filled variant where the SVG paths are filled with `currentColor` instead of being stroked outlines. This is useful for visual emphasis — for example, a filled star to indicate a favorited item, or a filled chevron inside a button.

#### Using the `fill` prop

Set `fill` on an `Icon` to fill its SVG paths with `currentColor`:

```jsx
<Icon icon={star} fill />
```

See the [Icon Library](/icons#filled-icons) for icons that are known to look good when filled.

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

<RelatedComponents />


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
render(<Flex.Horizontal align="center">
      <Icon border={true} icon={Bell} />
      <Icon border={true} icon={BellMedium} size="medium" />
      <IconPrimary border={true} icon="information" />
      <IconPrimary border={true} icon="information" size="medium" />
      <Button icon={<IconPrimary icon="add" border />} text="Button" />
    </Flex.Horizontal>)
```


### Filled icons

Use the `fill` prop on a single icon to fill it.


```tsx
render(<Flex.Stack>
      <Flex.Horizontal align="center">
        <Icon icon={Star} fill />
        <Icon icon={Heart} fill />
        <Avatar icon={<Icon icon={Star} fill />} size="small" hasLabel />
        <Button icon={<Icon icon={Heart} fill />} title="Favorite" />
      </Flex.Horizontal>
    </Flex.Stack>)
```


### Responsive to its inherited `font-size`


```tsx
render(<h1 className="dnb-h--xx-large">
      h1 with auto sized <Icon icon={BellMedium} size="auto" aria-hidden />{' '}
      icon
    </h1>)
```


### Icon color variations

All of these methods will output the same color


```tsx
<Icon icon={BellMedium} color="var(--color-fire-red)" title="CSS variable" />
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


### Icon transition

Use `Icon.transition()` to animate between SVG icon states. Define named states and use `Icon.transition.activate(element, state)` to switch between them.

When icons have compatible path structures (same number and type of segments), the transition animates via CSS `d` property interpolation. This suits directional variants like `arrow_down` ↔ `arrow_up` or `chevron_down` ↔ `chevron_up`.


```tsx
const directionIcon = Icon.transition({
  down: arrow_down,
  up: arrow_up,
  left: arrow_left,
  right: arrow_right
});
const handleChange = direction => {
  const iconEl = document.querySelector('[data-visual-test="icon-transition"] .dnb-icon') as HTMLElement;
  if (iconEl) {
    Icon.transition.activate(iconEl, direction);
  }
};
render(<>
            <Flex.Horizontal align="center" gap="small">
              <Icon icon={directionIcon} />

              <Field.Selection variant="button" value="down" optionsLayout="horizontal" onChange={handleChange}>
                <Field.Option value="down" title="Down" />
                <Field.Option value="up" title="Up" />
                <Field.Option value="left" title="Left" />
                <Field.Option value="right" title="Right" />
              </Field.Selection>
            </Flex.Horizontal>
            {notSupported}
          </>);
```


### Icon transition fallback

When icons have incompatible path structures (e.g. `question` ↔ `close`), `Icon.transition()` automatically falls back to a transform/opacity crossfade using stacked SVGs. The same `Icon.transition.activate()` API works for both modes.


```tsx
const helpIcon = Icon.transition({
  question,
  close
});
const handleChange = state => {
  const iconEl = document.querySelector('[data-visual-test="icon-transition-fallback"] .dnb-icon') as HTMLElement;
  if (iconEl) {
    Icon.transition.activate(iconEl, state);
  }
};
render(<Flex.Horizontal align="center" gap="small">
            <Icon icon={helpIcon} />

            <Field.Selection variant="button" value="question" optionsLayout="horizontal" onChange={handleChange}>
              <Field.Option value="question" title="Question" />
              <Field.Option value="close" title="Close" />
            </Field.Selection>
          </Flex.Horizontal>);
```

## Properties


```json
{
  "props": {
    "icon": {
      "doc": "A React SVG Component.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "title": {
      "doc": "Use a title to provide extra information about the icon used.",
      "type": "string",
      "status": "optional"
    },
    "border": {
      "doc": "Use `true` to display a rounded border with an inherited color. Keep in mind that the icon will have a larger total width and height of `+0.5em`.",
      "type": "boolean",
      "status": "optional"
    },
    "fill": {
      "doc": "If set to `true`, the icon paths will be filled with `currentColor`.",
      "type": "boolean",
      "status": "optional"
    },
    "alt": {
      "doc": "The alternative label (text version) of the icon. Defaults to the imported icon name.",
      "type": "string",
      "status": "optional"
    },
    "size": {
      "doc": "The dimension of the icon. This will be the `viewBox` and represent `width` and `height`. Defaults to `16`. You can use `small`, `medium`, `large` or `auto`. Auto will enable that the icon size gets inherited by the parent HTML element if it provides a `font-size`.",
      "type": [
        "\"default\"",
        "\"small\"",
        "\"medium\"",
        "\"large\"",
        "\"x-large\"",
        "\"xx-large\"",
        "\"basis\"",
        "\"auto\"",
        "number"
      ],
      "status": "optional"
    },
    "color": {
      "doc": "The color can be any valid color property, such as Hex, RGB or preferable – any CSS variable from the [colors table](/uilib/usage/customisation/colors), e.g. `var(--color-ocean-green)`. Defaults to no color, which means `--color-black-80`.",
      "type": "Various",
      "status": "optional"
    },
    "inheritColor": {
      "doc": "Defaults to `true`. Set to `false` if you do not want to inherit the color by `currentColor`.",
      "type": "boolean",
      "status": "optional"
    },
    "modifier": {
      "doc": "Modifier class to define. Will result in: `dnb-icon--${modifier}`.",
      "type": "string",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```
