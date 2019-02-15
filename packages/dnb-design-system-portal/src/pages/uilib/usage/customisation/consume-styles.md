---
title: 'Importing CSS'
draft: false
order: 2
---

# Importing the CSS

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
// Imports only the Button CSS and Main DNB Theme
import 'dnb-ui-lib/components/button/style'
import 'dnb-ui-lib/components/button/style/themes/ui'
```
