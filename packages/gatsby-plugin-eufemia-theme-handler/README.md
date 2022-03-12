# Gatsby Plugin to load Eufemia Themes

This plugin is a easy to use drop-in solution to load different DNB Eufemia Themes. It also support changing a theme in production runtime.

## Features

- The current theme used is stored in the Browsers localStorage under the key `dnb-theme`
- You can define a theme in the URL (not IE11 supported): `https://eufemia.dnb.no/?dnb-theme=ui`
- Automatically splits theme styles into separate Webpack chunks, not matter if you have imported them already in your app or not
- Supports both build an dev mode with fast refresh and hot module replacement
- Loads only one theme package at a time. When the user switches to another theme, a new CSS theme file will be downloaded.

## How to use

Install `yarn add gatsby-plugin-eufemia-theme-handler` and add it to your `gatsby-config.js` file:

```js
// gatsby-config.js
{
  plugins: [
    {
      resolve: 'gatsby-plugin-eufemia-theme-handler',
      options: {
        themes: {
          ui: { name: 'DNB Eufemia' },
          eiendom: { name: 'DNB Eiendom' },
        },
        defaultTheme: 'ui',
      },
    },
  ]
}
```

You can also use the interceptor methods from inside your components:

```js
// Your React Component
import {
  getThemes,
  getTheme,
  setTheme,
} from 'gatsby-plugin-eufemia-theme-handler'
```

## How it works

Gatsby bundles all styles into one single Webpack chunk (commons.css) and inlines it into every HTML page as inline styles with the attribute `data-identity="gatsby-global-css"`.

What this plugin does is:

- Collect all `dnb-theme` files (`{scss,css}`) – also check if they are located in `/src` or needs to be collected from `/build`. Both are used by the Eufemia repo/portal.
- After we have collected all available theme files, we create or update a static import `load-eufemia-themes.js`, which is git-ignored.
- Split theme styles into separate CSS files (Webpack chunks) inside `gatsby-node.js`
- Inserts some JavaScript in the HTML head in order to handle what theme file should be shown (`inlineScriptProd` and `inlineScriptDev`)
- Load these inline scripts via Webpack inline module loaders: `!raw-loader!terser-loader!`
- By using localStorage, we block the HTML rendering, this way we do avoid flickering of a default theme

### In prod

- Leave the default theme style as a separate inline style, but move it after `commons.css` – this is how the styles should be imported in the first place (theme files after all other css packages) – if not, visual tests will fail, as we get wrong CSS specificity
- Remove all other themes styles to be inlined, but keep track on the CSS files, defined in `data-href`
- Only set the link href if the current theme is not the default one

### In dev

During dev, we do not get any inline styles from Gatsby – they are handled by Webpack only via the hot module replacement.

- Now, that we have split out the themes styles in separate CSS files `/${key}.css`, we simply need to load them as plain css files via a link with href inside the head element.
- During runtime, we need to ensure that our link with the id `eufemia-style-theme` is placed after `commons.css`. We do that with `headElement.appendChild(styleElement)`
- Use `uniqueId` to reload css files as there is not unique build hash, unlike we get during production
- Use `MutationObserver` to reload the current theme file, because Webpack uses hot module replacement, so we need to reload as well
