---
title: 'Styling'
draft: false
order: 1
---

import Img from 'Tags/Img'
import { Icon } from 'dnb-ui-lib/src'
import CSSDiagram from 'Pages/uilib/usage/customisation/assets/css_structure_diagram.js'

# Styling

To ensure flexibility and the possibility of [theming](/uilib/usage/customisation/theming), the DNB CSS Styles area build in a bottom up manner.

The styles are decoupled from the functional [components](/uilib/components).
There are several Packages You can use and consume.

- **dnb-ui-core** - Includes the `core styles`.
- **dnb-ui-components** - Includes all the styles for the `components`.
- **dnb-theme-ui** - Includes both the `core theme` (_inkl. HTML elements_) and themes for every `component`.

All the CSS packages are ready to use, minified CSS files. You will find the main style here, like: `dnb-ui-lib/style/dnb-ui-core.min.css`

Additionally, it is also possible to import a style and theme for every single component separately. You find theme here, like: `dnb-ui-lib/components/[button]/style/dnb-button.min.css`

The following Diagram gives an overall overview how the packages are structured.

<CSSDiagram />

## Spacing

To ensure more flexibility, all the margins / spacings are reset to zero. But more often we have to have a by default defined `margin-bottom` for HTML Elements like a heading or a paragraph.

To use the default DNB spacings, You can define a CSS class called: `.dnb-spacing`
Everything inside this container will then have a default spacing. This will be specially helpful for article alike pages.

```html
<div class="dnb-spacing">
  <!-- DNB spacings -->
  <h1>e.g. I have now a margin</h1>
  <p>☝🏻 Me as well</p>
</div>
```

The styles for the `.dnb-spacing` are included in the package: **dnb-theme-ui**

## Importing the CSS

To include the packages `dnb-ui-core`, `dnb-ui-components` and `dnb-theme-ui` in a [Node.js](https://nodejs.org) based environment (given You have a CSS loader in place), do this:

```js
// This includes the "dnb-ui-core", "dnb-ui-components" and "dnb-theme-ui"
import 'dnb-ui-lib/style'
```

### No Theme

If You want to import the styles of all components only - without **dnb-theme-ui**:

```js
// No Theme is included
import 'dnb-ui-lib/style/components'
```

### Custom Theme

You may want to import a theme as well:

```js
// No Theme is included
import 'dnb-ui-lib/style/components'

// Default DNB UI Theme
import 'dnb-ui-lib/style/theme'
```

```js
// ... is equivalent to the default theme
import 'dnb-ui-lib/style/themes/ui'

// ... or some other theme
import 'dnb-ui-lib/style/themes/[NAME].css'
```

### Single Component only

You also can import a single style of a single component:

```js
import 'dnb-ui-lib/components/button/style'
```

You may have a look at the guides about [Typography](/uilib/typography).
