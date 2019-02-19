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
There are several Packages You can use.

- **dnb-ui-core** - Includes the `DNB Main Style`.
- **dnb-ui-components** - Includes all the styles for the [components](/uilib/components).
- **dnb-ui-patterns** - Includes all the styles for the [patterns](/uilib/patterns).
- **dnb-theme-ui** - Includes both the `DNB Main Theme` (_inkl. HTML elements_) and themes for every `component`.

All the CSS packages are ready to use, minified CSS files. You will find the main style here, like: `dnb-ui-lib/style/dnb-ui-core.min.css`

Additionally, it is also possible to import a style and theme for every single component separately. You find the styles here, like: `dnb-ui-lib/components/[button]/style/dnb-button.min.css`

The following Diagram gives an overall overview how the packages are structured.

<div class="margin-bottom">
  <CSSDiagram />
</div>

You may have a look at the guides about [Typography](/uilib/typography).

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
