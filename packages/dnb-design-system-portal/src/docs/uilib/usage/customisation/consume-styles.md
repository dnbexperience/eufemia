---
title: 'Importing CSS'
draft: false
order: 4
---

# Importing the CSS

To include the packages `dnb-ui-core`, `dnb-ui-components` and `dnb-theme-ui` in a [Node.js](https://nodejs.org) based environment (given you have a CSS loader in place), do this:

```js
// This includes the "dnb-ui-core", "dnb-ui-components" and "dnb-theme-ui"
import 'dnb-ui-lib/style'
```

## Legacy import

Read more about [how to deal with existing styles](/uilib/usage/customisation/styling#how-to-deal-with-existing-styles).

```js
// NB: needs a wrapper class: ".dnb-core-style"
import 'dnb-ui-lib/style/basis'
import 'dnb-ui-lib/style/components'
import 'dnb-ui-lib/style/themes/ui'
```

## No Theme

If You want to import the styles of all components only - without **dnb-theme-ui**:

```js
// No Theme is included
import 'dnb-ui-lib/style/components'
```

## Custom Theme

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

## Single Component only

It is possible to import a single CSS Style of a single component at once:

```js
// Import the minimum required package: "dnb-ui-basis"
import 'dnb-ui-lib/style/basis'

// Imports only the Button CSS and Main DNB Theme
import 'dnb-ui-lib/components/button/style'
import 'dnb-ui-lib/components/button/style/themes/ui'
```
