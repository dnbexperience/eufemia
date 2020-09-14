---
title: 'ESM / SSR'
description: 'Eufemia uses ESM as their default module format. More info on this topic below.'
order: 8
redirect_from:
  - /uilib/usage/first-steps/es6
---

# ESM and transpiling

To support every modern front end environment, the `dnb-ui-lib` supports different transpiled module formats:

- `ESM` with ES5 (**default**)
- `ES` with ES6
- `CJS` with ES5
- `UMD` with ES5

## Default module format

The `dnb-ui-lib` uses **ESM** as the default module format. This allows us to more easily and by default [tree shaking](/uilib/usage/first-steps/es6#tree-shaking) support:

```js
// Imports only the code needed for the button
import { Button } from 'dnb-ui-lib'
import { Button } from 'dnb-ui-lib/esm'

// Imports only the code needed for the icon
import { question } from 'dnb-ui-lib/icons'
import { question } from 'dnb-ui-lib/esm/icons'
```

## CommonJS (CJS)

[Node.js](https://nodejs.org/) uses [RequireJS](https://requirejs.org) and has [CommonJS](https://requirejs.org/docs/commonjs.html) as their default module format.

### SSR

In case you are using the `dnb-ui-lib` in a classic Node.js environment, like typical in SSR, you can import or require everything from the `/cjs` subfolder:

```js
// Components
import { Button } from 'dnb-ui-lib/cjs'
const { Button } = require('dnb-ui-lib/cjs/components')
const Button = require('dnb-ui-lib/cjs/components/Button')

// Icons
import { question } from 'dnb-ui-lib/cjs/icons'
const { question } = require('dnb-ui-lib/cjs/icons')
const question = require('dnb-ui-lib/cjs/icons/question')

// Styles
import 'dnb-ui-lib/cjs/style'
require('dnb-ui-lib/cjs/style')
```

### Next.js and Node.js version 12 and above

**NB:** If you use Next.js with Node.js version 12 and above, we may have to define explicitly that we want to use CommonJS:

```js
import { Button } from 'dnb-ui-lib/cjs'
const { Button } = require('dnb-ui-lib/cjs/components')
```

Alternatively, you can make use of [next-transpile-modules](https://www.npmjs.com/package/next-transpile-modules).

### ESM in Node.js version 10

You can easily use [ESM](https://nodejs.org/api/esm.html) in Node.js environment. Have a look at the [Next.js example](https://github.com/dnbexperience/eufemia-examples/tree/master/packages/example-next).

1. Install the `esm` package: `npm i esm -D`
2. Call Node with an environment variable: `NODE_OPTIONS='-r esm' node ...`

```json
// package.json
"start": "NODE_OPTIONS='-r esm' next start ./src"
```

#### Jest and ESM (Node testing environments)

Older Jest versions uses still CommonJS as the default module format. If you use the default `dnb-ui-lib` imports, then you get a missmatch between ES module and CommonJS formats. To ensure that Jest transforms your code in to CSJ, you can use the following Jest configuration `--transformIgnorePatterns`

```bash
jest --transformIgnorePatterns \"node_modules/(?!(dnb-ui-lib))/\"
```

## Pure ES6

In some cases you may want to import an ES6 version.

```js
// ES6 version of all Components
import { Button } from 'dnb-ui-lib/es'
import { Button } from 'dnb-ui-lib/es/components'

// ES6 version of a single component
import Button from 'dnb-ui-lib/es/components/Button'
```

Make sure your environment has a production build with:

- Tree Shaking
- Compile to ES5 for IE support
- Minify and mangle the Output

By default, [webpack v4](https://webpack.js.org) does this fine.

## Tree shaking

To optimize the bundle size, we have several options. It also depends on what is used to make the bundle. Is [webpack](https://webpack.js.org) used, then you may read a [good guide on Tree Shaking](https://webpack.js.org/guides/tree-shaking).

If you only need / import a few components, you may consider to import them directly, without named imports (**ES5**):

```js
import MyMaskedInput from 'dnb-ui-lib/components/InputMasked'
import MyMaskedInput from 'dnb-ui-lib/cjs/components/InputMasked'

// or
import Input from 'dnb-ui-lib/components/input-masked/InputMasked'
import Input from 'dnb-ui-lib/cjs/components/input-masked/InputMasked'
```

... or as **ES6** imports:

```js
import { InputMasked } from 'dnb-ui-lib/es/components'
```

<!-- You also have to make sure your application gets [minified and mangled](https://webpack.js.org/guides/tree-shaking/#minify-the-output). -->
