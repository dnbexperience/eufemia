---
title: 'ES6'
draft: false
order: 9
---

# ES6

In some cases you may want to import an ES6 version.

```js
// ES6 version of all Components
import { Button } from 'dnb-ui-lib/es/components'

// ES6 version of a single component
import Button from 'dnb-ui-lib/es/components/Button'
```

Make sure your environment has a build process with:

- Tree Shaking
- Compile to ES5
- Minify and mangle the Output

## Tree shaking

To optimize the bundle size, we have several options. It also depends on what is used to make the bundle. Is [webpack](https://webpack.js.org) used, then you may read a [good guide on Tree Shaking](https://webpack.js.org/guides/tree-shaking).

If you only need / import a few components, you may consider to import them directly, without named imports (**ES5**):

```js
import MyMaskedInput from 'dnb-ui-lib/components/InputMasked'

// or
import Input from 'dnb-ui-lib/components/input-masked/InputMasked'
```

... or as **ES6** imports:

```js
import { InputMasked } from 'dnb-ui-lib/es/components'
```

You also have to make sure your application gets [minified and mangled](https://webpack.js.org/guides/tree-shaking/#minify-the-output).
