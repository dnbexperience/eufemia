---
header: 'UI Library'
title: 'Styling'
status: 'imp'
draft: false
order: 1
---

# Styling

The CSS is a compiled and minified version. You will find it here: `dnb-ui-lib/style/dnb-ui-lib.min.css`

**TODO:** CSS structure graphics

## Apply the DNB Style

To use the default DNB style, you have to define a CSS class called: `dnb-style`
You can set this class on the document body or on any content container.

<!-- prettier-ignore-start -->
```html
<div class="dnb-style">
  <!-- The styled Content -->
</div>
```
<!-- prettier-ignore-end -->

### The Reason

The benefits of explicitly defining the style class `dnb-style`, is that we then can use the components on their own, without effecting all the existing styled browser elements and tags. This gives use a kind of backwards compatibility.
But it makes it also more flexible, like if we only want to apply our DNB style to a certain area of our web application.

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

You may have a look at the guides about [colors](/quickguide-designer/colors/) and [fonts](/quickguide-designer/fonts/#fonts-to-show-code).
