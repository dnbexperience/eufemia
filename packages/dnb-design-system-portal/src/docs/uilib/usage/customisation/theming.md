---
title: 'Theming'
order: 7
---

# Theming

Read the [Styling examples](/uilib/usage/customisation/styling) on how to include styles and a theme.
This section is about how theming works and how to actually create a custom theme.

## WIP: Ready to use themes

Right now, theres work going on to create Eufemia Themes that utilize both color and spacing and the [Spatial system](/quickguide-designer/spatial-system).

The plan is to extend the documentation here later on on how to select and use a theme inside an application.

### Chrome Extension: Eufemia Theme Manager

Use the [Chrome Browser Extension](https://chrome.google.com/webstore/detail/eufemia-theme-manager/pijolaebmeacaekbhoefjmhogckdcclb) to:

- test themes on web applications
- create new possible themes
- look how the outcome would be if a theme would be used
- and create areas where a different or a modified theme would make more sense

You can also download the [Chrome Browser Extension (ZIP)](https://github.com/dnbexperience/eufemia-theme-manager/raw/main/eufemia-theme-manager-extension/web-ext-artifacts/eufemia_theme_manager-latest.zip), and install it manually in your browser. To do so, go to `chrome://extensions` and drag & drop the downloaded ZIP file in the opened extensions tab.

Contributions are welcome. Heres the [source code](https://github.com/dnbexperience/eufemia-theme-manager).

## How are component themes built

By default, all the HTML Elements (components) are built by separating the "visual styling" parts from the "functional layout" parts. This way we can create new custom visual styles.

Of course, we can still overwrite the functional layout properties to customize our theme even further.

### The total custom way

Simply do not import **dnb-theme-ui** and create your own visual styles for every component you use in your App.

### Using `postcss-replace`

If your applications only need new colors or other CSS properties, you could simply replace all the properties with [postcss-replace](https://www.npmjs.com/package/postcss-replace) using this config scheme:

```js
{
  resolve: 'gatsby-plugin-postcss',
  options: {
    postCssPlugins: [
      require('postcss-replace')({
        pattern: /#([A-Fa-f0-9]+)/,
        data: {
          '007272': '#YOUR_COLOR' // sea-green
        }
      })
    ]
  }
}
```

### Using CSS (vars) Custom Properties

This is for sure a very nice and powerful solution, but lacks Internet Explorer support.

## The hard way

Maybe the most common ways would be:

- Make a Fork of Eufemia and go from there
- Submit a request of creating a theme inside the main Eufemia repository so everyone can get access to it.

### Technical aspects

The included themes are built using SASS. Simply because we can reuse the _@mixin_'s and variables from SASS.

We have the **Main Theming File**, which is located here: `@dnb/eufemia/src/style/themes/dnb-theme-[THEME].scss`

From here, we "can" reuse some default theming mechanism, just to have a fallback:

```scss
@import '../theme-ui/dnb-theme-ui.scss';
```

All the additional sub theming files (for every component) are automatically added to the **Main Theming File** by running `$ yarn build`. More on that further down.

If we need a custom theming file for one or more components, we can do so by creating `@dnb/eufemia/src/components/[COMPONENT]/style/dnb-button-theme-[THEME].scss`.

### Local Theming setup

There are several solutions to **create a new theme**.
One of which is by using the [linking feature of Yarn](https://yarnpkg.com/lang/en/docs/cli/link/).

#### _Method:_ yarn link and SASS

Make sure Your project can handle **\*.scss** files.

**1.** make a copy of the [repository](https://github.com/dnbexperience/eufemia). Place it somewhere locally on your machine

**2.** change your command line (Terminal) directory to the sub package `@dnb/eufemia` (_eufemia/packages/eufemia_)

**3.** make the package ready for development by running:

```bash
$ yarn install && yarn build && yarn link
```

**4.** on your application root directory, run:

```bash
$ yarn link "@dnb/eufemia"
```

**5.** That's it. Now you can use (import/require) the NPM module in your application like:

```js
import { Button } from '@dnb/eufemia/components'
import '@dnb/eufemia/style/components'

// See the "src" in the path?
import '@dnb/eufemia/src/style/themes/dnb-theme-[MY THEME].scss'
```

**6.** Don't forget to add `"@dnb/eufemia": "*"` with the respective version (alongside React) to your dependencies:

```json
  "dependencies": {
    "@dnb/eufemia": "*",
    "react": "^17",
    "react-dom": "^17",
    ...
  }
```

**7.** _Note:_ Every time you create a new theme file, you have to run `yarn build` again. This way the new theme file gets added/bundled to the **Main Theming File**.
