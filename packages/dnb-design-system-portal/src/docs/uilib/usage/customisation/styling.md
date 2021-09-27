---
title: 'CSS Styles'
description: 'To ensure flexibility and the possibility of theming, the DNB CSS Styles area built as flexible packages you can import and combine.'
order: 3
---

import InlineImg from 'Tags/Img'
import { Icon } from '@dnb/eufemia/src'
import CSSDiagram from 'Pages/uilib/usage/customisation/assets/css_structure_diagram.js'

# CSS Styles

To ensure flexibility and the possibility of [theming](/uilib/usage/customisation/theming), the DNB CSS Styles area built in a bottom up manner.

The styles are decoupled from the functional [components](/uilib/components).
There are several packages you can use and combine.

## Main Packages

- **dnb-ui-core** - Includes the _DNB Main Styles_ like [helper classes](/uilib/helpers), font loader, colors and a over-all reset (normalize).
- **dnb-theme-ui** - Includes [optional class selectors for elements](/uilib/elements), [optional default spacing](#spacing), [default typography](/uilib/typography) as well as a theme for every [component](/uilib/components).
- **dnb-ui-components** - Includes all the basic layout styles for the [components](/uilib/components).
- **dnb-ui-extensions** - Includes all the styles (and themes) for [extensions](/uilib/extensions) (not shown in the [Diagram](#css-structure-diagram)).

## Sub Packages

- **dnb-ui-body** - includes the default body style and a CSS reset (normalize).
- **dnb-ui-basis** - includes everything from `dnb-ui-core`, except `dnb-ui-body`
  - **NB:** needs a `.dnb-core-style` [wrapper class](/uilib/usage/customisation/styling#core-style).
- **dnb-ui-elements** - includes only the styles for [HTML Elements](/uilib/elements) CSS classes, like `.dnb-h--xx-large`.

## Additional Packages

- **dnb-ui-tags** - this package will force styles on all the HTML Tags like `<h1>` instead of CSS classes, like `.dnb-h--xx-large`
  - **NB:** needs a `.dnb-core-style` [wrapper class](/uilib/usage/customisation/styling#core-style).
  - Use it carefully - because this will effect existing styles as well.
- **dnb-ui-properties** - includes only the CSS Custom Properties.
  - There is also a [JavaScript file containing](/uilib/usage/customisation/styling#a-list-of-all-css-properties) the same properties.
- **dnb-ui-fonts** - includes only the `@font-face` and properties.

All the CSS packages are ready to use, **minified CSS files**. You will find the main style here: `@dnb/eufemia/style/dnb-ui-core.min.css`

### Individual styles

Additionally, it is also possible to import a style and theme for every single component separately. You find the styles here, like: `@dnb/eufemia/components/[button]/style/dnb-button.min.css` - read more about [how to import a single-component style](/uilib/usage/customisation/styling/consume-styles#single-component-only)

## CSS Structure Diagram

The following Diagram gives an overall overview how the packages are structured.

<div class="margin-bottom">
  <CSSDiagram />
</div>

## How to deal with existing styles

The **dnb-ui-core** package includes some styles which effects the global scope (body and CSS reset). To avoid interference with existing styles, let's say a header or a menu, You could only use the **dnb-ui-basis** package in combination with other packages like **dnb-theme-ui** and **dnb-ui-components**.

You may have a look at some [code examples of dealing with legacy code](/uilib/usage/customisation/styling/legacy-styling).

### Example import

```js
// NB: needs a wrapper class: ".dnb-core-style"
import '@dnb/eufemia/style/basis'
import '@dnb/eufemia/style/components'
import '@dnb/eufemia/style/themes/ui'

// instead of all together
/* import '@dnb/eufemia/style' */
```

### Core Style

If You neither include the **dnb-ui-core** nor the **dnb-ui-body** package, then You ending up having no Eufemia styles for the Document `<body>`. To have the Eufemia Core styles inside a wrapper anyway, simply use the following helper class: `.dnb-core-style`

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

Once You use the `.dnb-core-style` wrapper class, You may in some circumstances, need to use it to modify already given properties.

For **Styled Components** You do it this way:

```jsx
import { P } from '@dnb/eufemia/elements'
const MyElement = styled(P)`
  .dnb-core-style & {
    margin-top: 3rem;
  }
  color: var(--color-sky-blue);
`
```

In CSS You simply do it this way:

```css
.dnb-core-style .my-element {
  margin-top: 3rem;
  color: var(--color-sky-blue);
}
```

## Spacing for Articles {#spacing}

To ensure more flexibility in styling, all the margins / spacings are reset to zero. But more often we have to have a by default defined spacing, e.g. `margin` on HTML Elements like headings or paragraphs.

To use the default DNB spacings, define a CSS class called: `.dnb-spacing`
Effected HTML Elements inside this container will then have a default spacing. This will be specially helpful for article alike pages.

```html
<article class="dnb-spacing">
  <!-- DNB spacings -->
  <h1 class="dnb-h--xx-large">
    e.g. I have now the Eufemia spacing (margin)
  </h1>
  <p class="dnb-p">👉 Me as well</p>
</article>
```

The styles for the `.dnb-spacing` are included in the package: **dnb-theme-ui**
For more details, check out the source file: `spacing.scss`

## Styling of HTML Elements (tags)

To deal with HTML Elements, without declaring them individual with the right css classes, like `<h1 class="dnb-h--xx-large">`, You can import the sub package **dnb-ui-tags**.

**NB:** Use it carefully - cause this will effect existing styles as well!

```js
/* directly the CSS file */
import '@dnb/eufemia/style/dnb-ui-tags.min.css'

/* ... or by the shorthand */
import '@dnb/eufemia/style/elements'
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

Beside the portal documentation with related tables and additional information, you may have a look at the [CSS file](https://unpkg.com/browse/@dnb/eufemia@latest/style/dnb-ui-properties.css), containing the custom properties (CSS variables), as well as a[ JavaScript file](https://unpkg.com/browse/@dnb/eufemia@latest/style/properties.js), which is auto generated from the CSS data.

### Access CSS properties (variables) in JavaScript

```js
import properties from '@dnb/eufemia/style/properties.js'

const seaGreenColor = properties['--color-sea-green']
const basisFontSize = properties['--font-size-basis']
```

## Known styling and CSS issues

- Safari, both on mobile and desktop has a problem where we combine `border-radius` with the usage of `inset` in a `box-shadow`. The solution for now is to not use `inset` – which results in an outer border, which is not ideal as we then not do follow the UX guidelines for these browsers. We have a SASS function handling this for us: `@mixin fakeBorder`.
