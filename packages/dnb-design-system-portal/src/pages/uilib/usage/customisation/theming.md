---
header: 'UI Library'
title: 'Theming'
draft: false
order: 2
---

# Theming

Read the [Styling examples](/uilib/usage/styling) on how to include styles and a theme.
This section here is more dedicated on how theming works and how to actually create a custom theme.

## How Themes are build

By default, all the HTML Elements (components) are build by separating the "visual styling" parts from the "functional layout" parts. This way can create new custom visual styles. Fore sure, we sill can overwrite the functional layout properties to customize our theme even further.

The included themes are build by using SASS. Simply because we this way can reuse the _@mixin_'s and variables from SASS.

We have the **Main Theming File**, witch is located here: `dnb-ui-lib/src/style/themes/dnb-theme-[THEME].scss`

From there on, we "can" reuse some default theming mechanism, just to have a fallback:

```scss
@import '../core/dnb-style.scss';
```

All the additional sub theming files (for every component) are automatically added to the **Main Theming File** by running `$ yarn build`. More on that further down.

If we need a custom theming file for one or more components, we can do so by creating `dnb-ui-lib/src/components/[COMPONENT]/style/dnb-button-theme-[THEME].scss`.

## Local Theming setup

There are several solutions to **create a new theme**.
One of them are using the [linking feature of Yarn](https://yarnpkg.com/lang/en/docs/cli/link/).

### _Method:_ yarn link and SASS

Make sure Your project can handle **\*.scss** files.

**1.** Make a copy of the [repository](https://github.com/dnbexperience/eufemia). Place it where ever locally on Your machine.

**2.** Change Your Command Line (Terminal) directory to the sub package `dnb-ui-lib` (_eufemia/packages/dnb-ui-lib_).

**3.** Make the package ready for development by running:

```bash
$ yarn install && yarn build && yarn link
```

**4.** On Your application root directory, run:

```bash
$ yarn link "dnb-ui-lib"
```

**5.** Thats it. Now You can use (import/require) the NPM module in Your application like:

```js
import { Button } from 'dnb-ui-lib/components'
import 'dnb-ui-lib/style/components'

// See the "src" in the path?
import 'dnb-ui-lib/src/style/themes/dnb-theme-[MY THEME].scss'
```

**6.** Don't forge to add `"dnb-ui-lib": "*"` with the respective version (alongside with React) to Your dependencies:

```json
  "dependencies": {
    "dnb-ui-lib": "*",
    "react": "^16",
    "react-dom": "^16",
    ...
  }
```

**7.** _Note:_ Every time You create a new theme file, You have to run again `yarn build`. This way the new theme file gets added/bundled to the **Main Theming File**.
