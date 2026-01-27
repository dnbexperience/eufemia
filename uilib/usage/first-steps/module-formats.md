---
title: 'ESM / SSR'
description: 'Eufemia uses ESM as their default module format. More info on this topic below.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.370Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# ESM and transpiling

To support every modern front end environment, the `@dnb/eufemia` supports different transpiled module formats:

- `ESM` transpiled [for broad browser compatibility](/uilib/usage/#supported-browsers-and-platforms) (**default**)
- `CJS` transpiled [for broad browser compatibility](/uilib/usage/#supported-browsers-and-platforms)
- `ES` with modern JavaScript syntax

**Bundles**

- `ESM` bundle with modern JavaScript syntax
- `UMD` bundle with modern JavaScript syntax

## Default module format

The `@dnb/eufemia` uses **ESM** as the default module format:

```js
// Imports only the code needed for the button
import { Button } from '@dnb/eufemia' // ESM transpiled for broad browser compatibility
import { Button } from '@dnb/eufemia/es' // Modern JavaScript syntax version
```

Because the package is published with `"type": "module"`, Node.js treats its `.js` files as ES modules by default. This means you should use `import`/`export` syntax, and `require()` will not work unless you target the `/cjs` build.

## CommonJS (CJS)

[Node.js](https://nodejs.org/) may use [RequireJS](https://requirejs.org) and has [CommonJS](https://requirejs.org/docs/commonjs.html) as their default module format, depending on your version and flags.

### SSR

In case you are using the `@dnb/eufemia` in an environment that can't use ESM, you can import or require everything from the `/cjs` subfolder:

```js
// Components
import { Button } from '@dnb/eufemia/cjs'
const { Button } = require('@dnb/eufemia/cjs/components')
const Button = require('@dnb/eufemia/cjs/components/Button')

// Styles
import '@dnb/eufemia/cjs/style'
require('@dnb/eufemia/cjs/style')
```

#### Jest and ESM (Node testing environments)

Older Jest versions uses still CommonJS as the default module format. If you use the default `@dnb/eufemia` imports, then you get a mismatch between ES module and CommonJS formats. To ensure that Jest transforms your code in to CJS, you can use the following Jest configuration `--moduleNameMapper`

```bash
jest --moduleNameMapper '{"@dnb/eufemia(.*)":"@dnb/eufemia/cjs$1"}'
```

or in a `jest.config.js` or `jest.preset.js` file:

```js
  module.exports = {
    ...
    moduleNameMapper: { '@dnb/eufemia(.*)': '@dnb/eufemia/cjs$1' }
  }
```
