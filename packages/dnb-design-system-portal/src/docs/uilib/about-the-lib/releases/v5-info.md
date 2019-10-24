# v5

- [Typography preparations](#typography-preparations) **(feature)**
- [Color changes](#color-change) **(major change)**
- [Icon changes](#icon-changes) **(major change)**
- [ESM module format](#esm-module-format) **(major change)**
- [UMD changes](#umd-changes) **(major change)**
- [How to Install](#install)

## Typography preparations

Soon we will have our own _DNB font_. This will have impact on both, `font-family`, `font-size`, `font-weight` and `line-height`.

To get prepared for these changes, you can today already (since `v4.24`) use the now exposed properties for both:

- [font-size](/uilib/typography/font-size)
- [line-heigh](/uilib/typography/line-height)

From before we had [font-weight](/uilib/typography/font-weights).

Read more on how to make CSS vars (Custom Properties) [work on IE](/uilib/usage/customisation/styling/polyfill).

### The benefits?

If you are using only properties to change actively your application typography, then a future update with changes will "automatically" happen, so you don't need to make manual code changes later.

### Properties as JS

You can now also import all the main properties as a [JavaScript Object](/uilib/usage/customisation/styling/polyfill#properties):

```js
import properties from 'dnb-ui-lib/style/properties
```

## Color change

- _Cherry Red_ will got replaced by _Fire Red_.
- _Cherry Red 8%_ will got replaced by _Fire Red 8%_.

You may check your application code and **replace** `cherry-red` with `fire-red`.

```css
/* New */
color: var(--color-fire-red);
color: var(--color-fire-red-8);

/* Deprecated */
color: var(--color-cherry-red);
color: var(--color-cherry-red-8);
```

## Icon changes

```js
/* New */
import { download } from 'dnb-ui-lib/icons/secondary'

/* Removed */
import { error } from 'dnb-ui-lib/icons/primary'
import { save_alt_01 } from 'dnb-ui-lib/icons/secondary'
```

## ESM module format

The `dnb-ui-lib` uses now `ESM` as the default module format. But every component is still compiled down to ES5.

### Do I have to make changes?

**Mostly likely no**. The majority of applications / projects does not to have to make changes.

If you are in **Node.js** (SSR) land, [read more about CJS](/uilib/usage/first-steps/es6#commonjs-cjs).

### What is ESM good for?

Your project is most likely already using `ESM` (import / export). Now that the `dnb-ui-lib` uses `ESM`, [tree shaking](/uilib/usage/first-steps/es6#tree-shaking) is much more easy to handle and most likely be handled out of the box by your application bundler of choice (e.g. [webpack](https://webpack.js.org) ([create-react-app](https://github.com/facebook/create-react-app)), [rollup.js](https://rollupjs.org/guide/en/) and [parcel.js](https://parceljs.org)).

## UMD changes

The `UMD` package for icons `dnb-ui-lib-icons.min.js` got a new naming:

- `dnb-ui-icons.min.js`

## Install

To upgrade to v5 with NPM, use:

```bash
$ npm i dnb-ui-lib@5
```

_October, 25. 2019_
