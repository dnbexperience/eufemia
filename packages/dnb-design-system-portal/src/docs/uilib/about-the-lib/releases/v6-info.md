# v6

- [Migration](#migration)
- [New DNB font](#new-dnb-font) **(feature)**
- [Color changes](#color-changes) **(feature and major change)**
- [Icon changes](#icon-changes) **(feature)**
- [Resources package](#resources-package) **(feature)**
- [How to Install](#install)

## Migration

v6 contains a couple of braking changes. As a migration process, you can simply search your application for:

- find `save_alt_01` and replace if with `save`
- find `--color-signal-yellow` or `--color-signal-yellow-30` and replace it with `--color-accent-yellow` and `--color-accent-yellow-30`
- find `dnb-ui-lib-icons.min.js` and replace it with `dnb-ui-icons.min.js`

## New DNB font

We have now our very own _DNB font_. As this font behaves very differently than Fedre, the DNB UX has spesifyed how we will use the _DNB font_ on digital medium. Therefore `font-family`, `font-size`, `font-weight` and `line-height` properties have changed.

In normal circumstances, you have to do **nothing** regarding to this change.

> Font's and typography are handled out of the box

- [font-size](/uilib/typography/font-size)
- [line-heigh](/uilib/typography/line-height)

## Color changes

- _Signal Yellow_ got replaced by _Accent Yellow_.
- _Signal Yellow 30%_ got replaced by _Accent Yellow 30%_.

You may check your application code and **replace** `signal-yellow` with `accent-yellow`.

```css
/* New */
color: var(--color-accent-yellow);
color: var(--color-accent-yellow-30);

/* Deprecated */
color: var(--color-signal-yellow);
color: var(--color-signal-yellow-30);
```

## Icon changes

```js
/* New */
import { settings, home } from 'dnb-ui-lib/icons/secondary'
```

## Resources package

A new package, only containing resources needed by the DNB DCE team. This package is provided as a `tar` file.

- `https://unpkg.com/browse/dnb-ui-lib/dist/dnb-ui-resources.tgz`

## Install

To upgrade to v6 with NPM, use:

```bash
$ npm i dnb-ui-lib@6
```

_November, 25. 2019_
