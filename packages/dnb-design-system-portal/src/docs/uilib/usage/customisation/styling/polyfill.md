---
title: 'Polyfill'
draft: false
# order: 4
---

# Properties Polyfill

By using Eufemia properties, like [color names](/uilib/usage/customisation/colors) and [typography properties](/uilib/typography), instead of defining colors and typography directly as hard coded values, you make your code much more readable and future proof in terms of refactoring and new enhancements. [Maintainability](/uilib/getting-started/maintainability) is important. But it fits also better in thinking of the [Living system](/uilib/getting-started/living-system) terms.

But as long as we have to support legacy browsers like [Internet Explorer](!/uilib/usage#supported-browsers-and-platforms) we have to deal with a fallback or polyfill.

## Post CSS

Use [postcss-preset-env](https://github.com/csstools/postcss-preset-env). Example [webpack](https://webpack.js.org) loader config:

```js
{
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [
      postcssPresetEnv({
        stage: 0,
        preserve: true,
        browsers: ['last 2 versions', 'explorer >= 11'],
        importFrom: [
          path.resolve(
            __dirname,
            '../../node_modules/dnb-ui-lib/style/dnb-ui-properties.css'
          )
        ]
      })
    ]
  }
},
```

_Notes_: Use `preserve: true` so we get the calc from vars `calc(var() + var())`, to get processed for IE later with [postcss-calc](https://github.com/postcss/postcss-calc) if this is needed.

## SASS (SCSS) / LESS

Use the [Post CSS](/uilib/usage/customisation/styling/polyfill#post-css) method.

## CSS-in-JS

For **CSS-in-JS** you can use [css-vars-ponyfill](https://github.com/jhildenbiddle/css-vars-ponyfill).

In your application root:

```js
// import the polyfill (Ponyfill)
import cssVars from 'css-vars-ponyfill'

// run the polyfill
cssVars()
```

But on large applications, the polyfill lacks in stability, therefore we made and recommend using the approach by using the Stylis Plugin method. Se examples below.

### Properties

You can also import all the main properties as a JavaScript Object:

```js
import properties from 'dnb-ui-lib/style/properties'
// properties gives you { '--color-sea-green': '#007272', ... }
```

### Styled Components

Is supported from v5 of [styled-components](https://www.styled-components.com) and above.

```jsx
import stylisPlugin from 'dnb-ui-lib/style/stylis'
import { StyleSheetManager } from 'styled-components'

render(
  <StyleSheetManager stylisPlugins={[stylisPlugin]}>
    <YourApp />
  </StyleSheetManager>
)
```

### Emotion

```jsx
import stylisPlugin from 'dnb-ui-lib/style/stylis'
import { CacheProvider } from '@emotion/core'
import createEmotionCache from '@emotion/cache'

const emotionCache = createEmotionCache({
  stylisPlugins: [stylisPlugin]
})

render(
  <CacheProvider value={emotionCache}>
    <YourApp />
  </CacheProvider>
)
```
