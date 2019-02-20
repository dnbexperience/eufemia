---
title: 'CSS Styles'
draft: false
order: 1
---

import Img from 'Tags/Img'
import { Icon } from 'dnb-ui-lib/src'
import CSSDiagram from 'Pages/uilib/usage/customisation/assets/css_structure_diagram.js'

# CSS Styles

To ensure flexibility and the possibility of [theming](/uilib/usage/customisation/theming), the DNB CSS Styles area build in a bottom up manner.

The styles are decoupled from the functional [components](/uilib/components).
There are several Packages You can use and combine.

## Main Packages

- **dnb-ui-core** - Includes the _DNB Main Styles_ like [helper classes](/uilib/helper-classes), font loader, colors and a over-all reset (normalize).
- **dnb-theme-ui** - Includes [optional class selectors for elements](/uilib/elements), [optional default spacing](#spacing), [default typography](/uilib/typography) as well as a theme for every [component](/uilib/components).
- **dnb-ui-components** - Includes all the basic layout styles for the [components](/uilib/components).
- **dnb-ui-patterns** - Includes all the styles (and themes) for [patterns](/uilib/patterns) (not shown in the [Diagram](#css-structure-diagram)).

## Sub Packages

- **dnb-ui-body** - Includes the default body style and a CSS reset (normalize).
- **dnb-ui-basis** - Includes everything from `dnb-ui-core`, except `dnb-ui-body`.
- **dnb-ui-elements** - This package will force styles for all the HTML Elements/Tags. Use it carefully - cause this will effect existing styles as well.

All the CSS packages are ready to use, **minified CSS files**. You will find the main style here: `dnb-ui-lib/style/dnb-ui-core.min.css`

Additionally, it is also possible to import a style and theme for every single component separately. You find the styles here, like: `dnb-ui-lib/components/[button]/style/dnb-button.min.css` - read more about [how to import a single-component style](/uilib/usage/customisation/consume-styles#single-component-only)

The following Diagram gives an overall overview how the packages are structured.

## CSS Structure Diagram

<div class="margin-bottom">
  <CSSDiagram />
</div>

## How to deal with existing styles

The **dnb-ui-core** package includes some styles witch effects the global scope (body and CSS reset). To avoid interference with existing styles, let's say a header or a menu, You could only use the **dnb-ui-basis** package in combination with other packages like **dnb-theme-ui** and **dnb-ui-components**.

### Use Body Style elsewhere

If You neither include the **dnb-ui-core** nor the **dnb-ui-body** package, then You ending up having no Eufemia styles for the Document `<body>`. To having them inside a wrapper anyway, simply use the following helper class: `.dnb-core-style`

```html
<div class="dnb-core-style">
  Wrapper with the DNB Body Styles
</div>
```

### Example import

```js
import 'dnb-ui-lib/style/basis'
import 'dnb-ui-lib/style/components'
import 'dnb-ui-lib/style/themes/ui'

// instead of all together
/* import 'dnb-ui-lib/style' */
```

## Spacing for Articles {#spacing}

To ensure more flexibility in styling, all the margins / spacings are reset to zero. But more often we have to have a by default defined spacing, e.g. `margin` on HTML Elements like headings or paragraphs.

To use the default DNB spacings, define a CSS class called: `.dnb-spacing`
Effected HTML Elements inside this container will then have a default spacing. This will be specially helpful for article alike pages.

```html
<article class="dnb-spacing">
  <!-- DNB spacings -->
  <h1>e.g. I have now a margin</h1>
  <p>☝🏻 Me as well</p>
</article>
```

The styles for the `.dnb-spacing` are included in the package: **dnb-theme-ui**
For more details, check out the source file: `spacing.scss`
