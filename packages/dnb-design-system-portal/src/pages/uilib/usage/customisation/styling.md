---
title: 'Styling'
draft: false
order: 1
---

import Img from 'Tags/Img'
import { Icon } from 'dnb-ui-lib/src'
import CSSDiagram from 'Pages/uilib/usage/customisation/assets/css_structure_diagram.js'

# Styling

The CSS is a compiled and minified version. You will find it here: `dnb-ui-lib/style/dnb-ui-lib.min.css`

The following Diagram gives an overall overview how the styles are structured.

<CSSDiagram />

## Apply the DNB Style

To use the default DNB style, you have to define a CSS class called: `dnb-style`
You can set this class on the document body or on any content container.

```html
<div class="dnb-style">
  <!-- DNB spacings and sizing -->
  <h1>e.g. I have now a margin and a size</h1>
  <p>☝🏻 Me as well</p>
</div>
```

The styles for the `dnb-style` are included in the default UI Theme.

`dnb-ui-lib/style/themes/dnb-ui-theme.min.css`

### What does `.dnb-style` apply?

Once You have to style HTML Elements like:

- Headings
- Paragraphs
- Basic Tables
- Lists (ordered and unordered)

### The Reason

The benefits of explicitly defining the style class `.dnb-style`, is that we then can use our [components](/uilib/components) on their own, without effecting all the existing styled HTML Elements and tags. This gives use a kind of backwards compatibility.
But it makes it also more flexible, like if we only want to apply our DNB HTML Elements Styles to a certain area of our web application.

## For Node based environments

To include the `dnb-ui-lib` styles (except patterns), do this:

```js
// This also includes the default DNB UI Theme
import 'dnb-ui-lib/style'
```

If You want to import the styles of all components - **without** the default DNB UI Theme:

```js
// No Theme is included
import 'dnb-ui-lib/style/components'
```

You may want to import a theme as well:

```js
// Default DNB UI Theme
import 'dnb-ui-lib/style/theme'

// ... is equivalent to the default theme
import 'dnb-ui-lib/style/themes/ui'

// ... or some other theme
import 'dnb-ui-lib/style/themes/[NAME].css'
```

You also can import a single style of a single component:

```js
import 'dnb-ui-lib/components/button/style'
```

You may have a look at the guides about [Typography](/uilib/typography).
