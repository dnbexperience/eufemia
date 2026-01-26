---
title: 'CSS Styles'
description: 'To ensure flexibility and the possibility of theming, the DNB CSS Styles area built as flexible packages you can import and combine.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.348Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# CSS Styles

To ensure flexibility and the possibility of [theming](/uilib/usage/customisation/theming), the DNB CSS Styles are built in a bottom-up manner.

The styles are decoupled from the functional [components](/uilib/components).
There are several packages you can use and combine.

## Main Packages

- **dnb-ui-core**: includes the _DNB Main Styles_ like [helper classes](/uilib/helpers), HTML and body reset (normalize).
  - We have an alternative package, **dnb-ui-basis**, that can be used if your page has other CSS that conflicts with Eufemia. It does the same but adds resets to the `.dnb-core-style` class instead of the `body` element, so Eufemia styling can be scoped to just a part of your page.
    **NB:** requires a `.dnb-core-style` [wrapper class](/uilib/usage/customisation/styling#core-style).

## Theme Packages

- **ui-theme-basis**: includes css variables, fonts, [optional class selectors for elements](/uilib/elements), [optional default spacing](#spacing), [default typography](/uilib/typography).
- **ui-theme-components**: includes all the styles for [components](/uilib/components).

### Additional Theme Packages

- **ui-theme-properties**: includes only the CSS Custom Properties. You can find this package inside `/style/themes/theme-ui/`.
  - There is also a [JavaScript file containing](/uilib/usage/customisation/styling#a-list-of-all-css-properties-variables) the same properties.
- **ui-theme-extensions**: includes all the styles (and themes) for [extensions](/uilib/extensions) (not shown in the [Diagram](#css-structure-diagram)).
- **ui-theme-fonts**: includes only the `@font-face` and properties. You can find this package inside `/style/themes/theme-ui/`.
- **ui-theme-tags**: this package will force styles on all HTML tags like `<h1>` instead of CSS classes like `.dnb-h--xx-large`.
  - **NB:** requires a `.dnb-core-style` [wrapper class](/uilib/usage/customisation/styling#core-style).
  - Use it carefully because this will affect existing styles as well.

All the CSS packages are ready to use, **minified CSS files**. You will find the main style here: `@dnb/eufemia/style/dnb-ui-core.min.css`

### Individual styles

Additionally, it is also possible to import a style and theme for every single component separately. You can find the styles here: `@dnb/eufemia/components/{button}/style/dnb-{button}.min.css`. Read more about [how to import a single-component style](/uilib/usage/customisation/styling/consume-styles#single-component-only).

## CSS Structure Diagram

The following Diagram gives an overall overview how the packages are structured.

<CSSDiagram />

## How to deal with existing styles

The **dnb-ui-core** package includes some styles that affect the global scope (`<body>` reset). To avoid interference with existing styles, such as a header or menu, you could use only the **dnb-ui-basis** package in combination with other packages like **ui-theme-basis** and **ui-theme-components**.

### Example import

```js
// NB: needs a wrapper class: ".dnb-core-style"
import '@dnb/eufemia/style/basis'
import '@dnb/eufemia/style/themes/ui'

// instead of all together
/* import '@dnb/eufemia/style' */
```

### Core Style

To have the Eufemia Core styles inside a wrapper anyway, simply use the following helper class: `.dnb-core-style`:

```html
<body>
  <p>I'm not Eufemia</p>
  <!-- Wrapper to have correct Eufemia css reset and styles -->
  <div id="app" class="dnb-core-style">
    <h1 class="dnb-h--xx-large">I have an Eufemia Style</h1>
    <p class="dnb-p">👉 Me as well</p>
  </div>
</body>
```

#### CSS Specificity

Once you use the `.dnb-core-style` wrapper class, you may in some circumstances, need to use it to modify already given properties.

For **Styled Components** you do it this way:

```jsx
import { P } from '@dnb/eufemia'
const MyElement = styled(P)`
  .dnb-core-style & {
    margin-top: 3rem;
  }
  color: var(--color-sky-blue);
`
```

In CSS you simply do it this way:

```css
.dnb-core-style .my-element {
  margin-top: 3rem;
  color: var(--color-sky-blue);
}
```

## Spacing for Articles \{#spacing\}

To ensure more flexibility in styling, all margins/spacings are reset to zero. However, we often need default spacing defined, such as `margin` on HTML elements like headings or paragraphs.

To use the default DNB spacings, define a CSS class called `.dnb-spacing`.
HTML elements inside this container will then have default spacing. This is especially helpful for article-like pages.

```html
<article class="dnb-spacing">
  <!-- DNB spacings -->
  <h1 class="dnb-h--xx-large">
    e.g., I now have Eufemia spacing (margin)
  </h1>
  <p class="dnb-p">👉 Me as well</p>
</article>
```

The styles for `.dnb-spacing` are included in the package: **ui-theme-basis**.
For more details, check out the source file: `spacing.scss`.

## Styling of HTML Elements (tags)

To work with HTML elements without declaring them with individual CSS classes (like `<h1 class="dnb-h--xx-large">`), you can import the sub-package **ui-theme-tags**.

**NB:** Use it carefully because this will affect existing styles as well!

```diff
import '@dnb/eufemia/style/dnb-ui-core.min.css'
import '@dnb/eufemia/style/themes/theme-ui/ui-theme-basis.min.css'

- import '@dnb/eufemia/style/themes/theme-ui/ui-theme-components.min.css'
+ import '@dnb/eufemia/style/themes/theme-ui/ui-theme-tags.min.css'
```

```html
<!-- HTML Elements in the wild -->
<div class="dnb-core-style">
  <h1>I'm now Eufemia styled</h1>
  <ul>
    <li>Me as well</li>
  </ul>
</div>
```

## A list of all CSS properties (variables)

Beside the portal documentation with related tables and additional information, you may have a look at the [CSS file](https://unpkg.com/browse/@dnb/eufemia@latest/style/themes/theme-ui/ui-theme-properties.css) containing the custom properties (CSS variables), as well as a [JavaScript file](https://unpkg.com/browse/@dnb/eufemia@latest/style/themes/theme-ui/properties.js) that is auto-generated from the CSS data.

### Access CSS properties (variables) in JavaScript

```js
import properties from '@dnb/eufemia/style/themes/theme-ui/properties.js'

const seaGreenColor = properties['--color-sea-green']
const basisFontSize = properties['--font-size-basis']
```

## Using Tailwind with Eufemia

Tailwind can act as a utility layer on top of (or beside) Eufemia. Keep Eufemia as the single source of tokens, colors, spacing, typography, CSS reset, etc.

Guidelines:

- Keep Eufemia resets: use either `@dnb/eufemia/style` (global) or the scoped combo `basis + themes`.
- Disable Tailwind's `preflight` (its reset) to avoid collisions.
- Let Tailwind generate utilities and its theme layer.

You can import the pre-generated `properties-tailwind.css` files that contain all Eufemia CSS custom properties in Tailwind-compatible format:

```css
/* Import Tailwind layers */
@layer eufemia, theme, utilities;

/* Import Eufemia styles */
@import '@dnb/eufemia/style/dnb-ui-core.min.css' layer(eufemia);
@import '@dnb/eufemia/style/themes/theme-ui/ui-theme-components.min.css'
  layer(eufemia);
@import '@dnb/eufemia/style/themes/theme-ui/ui-theme-basis.min.css' layer(eufemia);

/* Import Tailwind base, theme and utilities layers */
@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/utilities.css' layer(utilities);

/* Import Eufemia properties in Tailwind format */
@import '@dnb/eufemia/style/themes/theme-ui/properties-tailwind.css' layer(utilities);
```

### Tailwind-Compatible CSS Variables

The `properties-tailwind.css` files contain Eufemia's CSS custom properties transformed to be compatible with Tailwind CSS. This transformation makes Eufemia properties available as Tailwind theme variables.

#### Available Namespaces

The following CSS variable namespaces are available in Tailwind-compatible format:

- **`--color-*`** - Color variables (e.g., `--color-black`, `--color-sea-green`, `--color-sky-blue`)
- **`--font-*`** - Font family variables (e.g., `--font-default`, `--font-heading`) - converted from `--font-family-*`
- **`--font-weight-*`** - Font weight variables (e.g., `--font-weight-default`, `--font-weight-medium`)
- **`--text-*`** - Font size variables (e.g., `--text-small`, `--text-large`) - converted from `--font-size-*`
- **`--leading-*`** - Line height variables (e.g., `--leading-small`, `--leading-medium`) - converted from `--line-height-*`
- **`--spacing-*`** - Spacing variables (e.g., `--spacing-small`, `--spacing-large`)
- **`--shadow-*`** - Box shadow variables (e.g., `--shadow-default`, `--shadow-sharp`)
- **`--ease-*`** - Transition timing function variables (e.g., `--ease-default`) - converted from `--easing-*`
- **`--breakpoint-*`** - Responsive breakpoint variables (e.g., `--breakpoint-small`, `--breakpoint-large`) - converted from `--layout-*`

#### Brand-Specific Variables

For brand-specific properties, variables are transformed to include the brand identifier after the namespace.

For Sbanken, the following namespaces are available:

- **`--color-sb-*`** - (e.g., `--color-sb-purple`, `--color-sb-green`)
- **`--font-sb-*`** - (e.g., `--font-sb-default`, `--font-sb-heading`)
- **`--font-weight-sb-*`** - (e.g., `--font-weight-sb-default`, `--font-weight-sb-medium`)
- **`--text-sb-*`** - (e.g., `--text-sb-small`, `--text-sb-large`)
- **`--leading-sb-*`** - (e.g., `--leading-sb-small`, `--leading-sb-medium`)
- **`--spacing-sb-*`** - (e.g., `--spacing-sb-small`, `--spacing-sb-large`)
- **`--shadow-sb-*`** - (e.g., `--shadow-sb-small`, `--shadow-sb-medium`)
- **`--ease-sb-*`** - (e.g., `--ease-sb-default`)
- **`--breakpoint-sb-*`** - (e.g., `--breakpoint-sb-small`, `--breakpoint-sb-large`)

This makes Eufemia properties directly usable with Tailwind's utility classes while maintaining brand-specific variants.

## Known styling and CSS issues

- Safari, both on mobile and desktop, has a problem where we combine `border-radius` with the usage of `inset` in a `box-shadow`. The solution for now is to not use `inset`, which results in an outer border. This is not ideal as we don't follow the UX guidelines for these browsers. We have a SASS function handling this for us: `@mixin fakeBorder`.
