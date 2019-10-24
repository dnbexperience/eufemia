# v5

- [ESM module format](#esm-module-format) **(major change)**
- [How to Install](#install)

## ESM module format

The `dnb-ui-lib` uses now `ESM` as the default module format. But every component is still compiled down to ES5.

### Do I have to make changes?

**Mostly likely no**. The majority of applications / projects does not to have to make changes.

If you are in **Node.js** (SSR) land, [read more about CJS](/uilib/usage/first-steps/es6).

### What is ESM good for?

Your project is most likely already using `ESM` (import / export). Now that the `dnb-ui-lib` uses `ESM`, [tree shaking](/uilib/usage/first-steps/es6#tree-shaking) is much more easy to handle and most likely be handled out of the box by your application bundler of choice (e.g. [webpack](https://webpack.js.org) ([create-react-app](https://github.com/facebook/create-react-app)), [rollup.js](https://rollupjs.org/guide/en/) and [parcel.js](https://parceljs.org)).

## Install

To upgrade to v5 with NPM, use:

```bash
$ npm i dnb-ui-lib@5
```

_October, 24. 2019_
