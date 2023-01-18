---
title: 'Theming'
order: 7
---

# Theming

Read the [Styling examples](/uilib/usage/customisation/styling) on how to include styles and a theme.
This section is about how theming works and how to actually create a custom theme.

- [Theming](#theming)
  - [Integrated theming](#integrated-theming)
    - [Brand theming](#brand-theming)
  - [Run your application with a different theme](#run-your-application-with-a-different-theme)
    - [Run the portal with a different theme](#run-the-portal-with-a-different-theme)
    - [Technical aspects](#technical-aspects)
    - [Local Theming setup](#local-theming-setup)
      - [_Method:_ yarn link and SASS](#method-yarn-link-and-sass)
  - [WIP: Ready to use themes](#wip-ready-to-use-themes)
    - [Chrome Extension: Eufemia Theme Manager](#chrome-extension-eufemia-theme-manager)
  - [Component theming](#component-theming)
    - [Theming inside your application](#theming-inside-your-application)
    - [Using `postcss-replace`](#using-postcss-replace)
    - [Using CSS (vars) Custom Properties](#using-css-vars-custom-properties)

## Integrated theming

Eufemia supports theming right inside where all the style-sources lives. Having the ability to control different styles as close to the source as possible, will make it possible to carefully handle continues improvements over time.

Themes are independent style packages, which should not be imported in parallel. But rather either – or.

### Brand theming

Eufemia is design system that aims to help DNB brands unleash their power.

Eufemia is a system that is build on top of brand-assets. So means, it should be possible to swap out or extend these brand-assets.

Therefore, instead of overwriting Eufemia (DNB main brand) styles inside projects, it is beneficial to create additional brand themes – directly where the source of the original brand lives.

The default DNB brand theme is called: `ui` which stands for _universal identity_.

## Run your application with a different theme

You can easily switch the static import of styles to a different theme:

```diff
import '@dnb/eufemia/style/core' // or /basis, when "dnb-core-style" is used
import '@dnb/eufemia/style/components'
- import '@dnb/eufemia/style/themes/ui'
+ import '@dnb/eufemia/style/themes/eiendom'
```

How ever, giving the user the ability to switch a theme during runtime, is a very much different challenge.

The Eufemia Portal (documentation) uses [`gatsby-plugin-eufemia-theme-handler`](https://github.com/dnbexperience/eufemia/tree/main/packages/gatsby-plugin-eufemia-theme-handler) to handle it both in development and production mode. You may install it to use it in your application as well.

### Run the portal with a different theme

- Create a new `/packages/dnb-design-system-portal/.env` file that includes e.g. `GATSBY_THEME_STYLE_DEV=eiendom` and start the portal with `$ yarn start`.
- What theme gets imported is handled in the Gatsby Plugin `gatsby-plugin-eufemia-theme-handler`.
- In the Portal Tools you can switch to a different theme.
- You can also define a different them in the url itself `path/?dnb-theme=ui`.

### Technical aspects

The included themes are built using SASS. Simply because we can reuse the _@mixin_'s and variables from SASS.

We have the **Main Theming File**, which is located here: `dnb-eufemia/src/style/themes/dnb-theme-[THEME].scss`

From here, we "can" reuse some default theming mechanism, just to have a fallback:

```scss
@import '../theme-ui/dnb-theme-ui.scss';
```

All the additional sub theming files (for every component) are automatically added to the **Main Theming File** by running `$ yarn build`. More on that further down.

If we need a custom theming file for one or more components, we can do so by creating `dnb-eufemia/src/components/[COMPONENT]/style/dnb-button-theme-[THEME].scss`.

**NB:** Every time you create a new theme file, you have to run `$ yarn build`. This way the new theme file gets added/bundled to the **Main Theming File**.

### Local Theming setup

There are several solutions to **create a new theme**.
One of which is by using the [linking feature of Yarn](https://yarnpkg.com/lang/en/docs/cli/link/).

#### _Method:_ yarn link and SASS

Make sure your project can handle **\*.scss** files.

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
import { Button } from 'dnb-eufemia/components'
import 'dnb-eufemia/style/components'

// See the "src" in the path?
import 'dnb-eufemia/src/style/themes/dnb-theme-[MY THEME].scss'
```

**6.** Don't forget to add `"@dnb/eufemia": "*"` with the respective version (alongside React) to your dependencies:

```json
  "dependencies": {
    "@dnb/eufemia": "*",
    "react": "17",
    "react-dom": "17",
    ...
  }
```

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

## Component theming

By default, all the HTML Elements (components) are built by separating the "visual styling" parts from the "functional layout" parts. This way we can create new custom visual styles:

```js
/button/style/dnb-button.scss // layout styles
/button/style/themes/dnb-button-theme-ui.scss // main theme styles
/button/style/themes/dnb-button-theme-eiendom.scss// additional theme styles
```

- The main theme (`ui`) does contain mainly colorization and sizes.
- While all the raw positioning and layout related properties are in the main `.scss` file, starting with an underscore: `_button.scss`

It's still possible to overwrite the _layout_ properties to customize our theme even further, if that is needed.

### Theming inside your application

You can skip to import the default theme `dnb-theme-ui` and create your own visual styles for every component you use in your App:

```diff
import '@dnb/eufemia/style/core' // or /basis, when "dnb-core-style" is used
import '@dnb/eufemia/style/components'
- import '@dnb/eufemia/style/themes/ui'
```

This approach is fragile, because further Eufemia changes and updates will possibly misalign with your customization.

Therefore, its probably a good idea to rather create theme styling files inside of the Eufemia repo itself. More on that topic in [integrated theming](#integrated-theming).

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

This is a very nice and powerful solution.
