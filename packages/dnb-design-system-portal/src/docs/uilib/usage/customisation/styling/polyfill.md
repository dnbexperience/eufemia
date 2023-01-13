---
title: 'Polyfill'
# order: 4
---

# Properties Polyfill

By using Eufemia properties, like [color names](/uilib/usage/customisation/colors) and [typography properties](/uilib/typography), instead of defining colors and typography directly as hard coded values, you make your code much more readable and future proof in terms of refactoring and new enhancements. [Maintainability](/uilib/getting-started/maintainability) is important. But it fits also better in thinking of the [Living system](/uilib/getting-started/living-system) terms.

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
        browsers: ['defaults and supports es6-module'],
        importFrom: [require.resolve('@dnb/eufemia/style/dnb-ui-properties.css')]
      })
    ]
  }
},
```

_Notes_: Use `preserve: true` so we get the calc from vars `calc(var() + var())`, to get processed for IE later with [postcss-calc](https://github.com/postcss/postcss-calc) if this is needed.

### Post CSS and Create React App

Here's an example [CRA Codesandbox](https://codesandbox.io/s/eufemia-scss-polyfill-knfpz?file=/config-overrides.js) with `postcss` config and omit of file hashing.

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

### CSS Properties (variables)

You can also import all the main properties as a JavaScript Object:

```js
import properties from '@dnb/eufemia/style/properties'
// properties gives you { '--color-sea-green': '#007272', ... }
```

### Styled Components

Is supported from v5 of [styled-components](https://www.styled-components.com) and above.

```jsx
import stylisPlugin from '@dnb/eufemia/style/stylis'
import { StyleSheetManager } from 'styled-components'

render(
  <StyleSheetManager stylisPlugins={[stylisPlugin]}>
    <MyApp />
  </StyleSheetManager>
)
```

#### Add custom properties:

```jsx
import { withProperties } from '@dnb/eufemia/style/stylis'
import { StyleSheetManager } from 'styled-components'

const stylisPlugin = withProperties({
  '--custom-property': 'CSS value',
})

render(
  <StyleSheetManager stylisPlugins={[stylisPlugin]}>
    <MyApp />
  </StyleSheetManager>
)
```

### Emotion

```jsx
import stylisPlugin from '@dnb/eufemia/style/stylis'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from '@emotion/cache'

const emotionCache = createEmotionCache({
  key: 'my-prefix-key',
  stylisPlugins: [stylisPlugin],
})

render(
  <CacheProvider value={emotionCache}>
    <MyApp />
  </CacheProvider>
)
```
