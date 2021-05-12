---
redirect_from:
  - /uilib/about-the-lib/releases/v6-info
---

# v6

- [Migration](#migration)
- [New DNB font](#new-dnb-font) **(major change)**
- [Color changes](#color-changes) **(feature and major change)**
- [Localization](#localization) **(feature)**
- [Other changes](#other-changes) **(major)**
- [Other features](#other-features) **(features)**
- [Resources package](#resources-package) **(feature)**
- [How to Install](#install)

## Migration

v6 contains a couple of braking changes. As a migration process, you can simply search and replace:

1. find `--color-signal-yellow` or `--color-signal-yellow-30` and replace it with `--color-accent-yellow` and `--color-accent-yellow-30`
1. find `weight-book` replace it with `weight-regular`
1. find `weight-default` replace it with `weight-basis`
1. find `dnb-p--medium` replace it with `dnb-p--bold`
1. find `weight-medium` replace it with `weight-bold`
1. find `style_type="medium` replace it with `style_type="bold`
1. find `dnb-p--demi` replace it with `dnb-p--medium`
1. find `weight-demi` replace it with `weight-medium`
1. find `style_type="demi` replace it with `style_type="medium`
1. find `family-book` replace it with `family-default`
1. find `family-medium` replace it with `family-default`
1. find `dnb-typo-number` remvoe it
1. find `dnb-typo-std` remvoe it

## New DNB font

We have now our very own _DNB font_. As this font behaves very differently than Fedra Sans, the DNB UX has spesifyed how we will use the _DNB font_ on digital medium. Therefore `font-family`, `font-size`, `font-weight` and `line-height` properties have changed.

In normal circumstances, you have to do **nothing** regarding to this change.

> ### Font's and typography are handled out of the box

More info and details in the respective documentation on:

- [font-size](/uilib/typography/font-size)
- [line-heigh](/uilib/typography/line-height)
- [font-weight](/uilib/typography/font-weight)

### Adjustments

A lot of small layout adjustments are med in v6 to fix alignment regarding new font and positioning styles.

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

### New colors

```css
/* New */
color: var(--color-lavender);
color: var(--color-sand-yellow);
color: var(--color-pistachio);
color: var(--color-success-green);
```

### Section

The [Section](/uilib/components/section) has reflected the color changes:

- `style_type="signal-yellow"` is now deprecated.
- `style_type="cherry-red"` got removed completely (v5 deprecation).

**New types**

- `style_type="lavender"`
- `style_type="sand-yellow"`
- `style_type="pistachio"`

## New Icons

```js
// new primary icons
import {
  reset,
  arrow_top,
  arrow_right,
  arrow_bottom,
  arrow_left,
} from 'dnb-ui-lib/icons/primary'

// new secondary icons
import {
  home,
  login,
  logout,
  settings,
  refresh,
  add_file,
  view_on,
  view_off,
} from 'dnb-ui-lib/icons/secondary'
```

## Localization

With v6 the `dnb-ui-lib` has it's own localization to be used both for component translation and your app strings. Read [more about how to use localization](/uilib/usage/customisation/localization).

## Other changes

- **major change** [Input](/uilib/components/input) got sizes. The height `medium` is now _2.5rem_ and `large` is now _2.5rem_

## Other features

- [FormLabel](/uilib/components/form-label) got a new prop `sr_only`. This way you still can provide a **label**, but available only for screen readers.
- [Blockquote](/uilib/elements/blockquote) is now up to date `dnb-blockquote--no-background` to display a quote without the contrast background, but rather a transparent.
- New helper class: `dnb-responsive-component` Makes some component form components, like [Input](/uilib/components/input) react to mobile sized screens. But as this can have some negative effects to have this enabled by default, you can enable this optionally by using this helper class.
- New helper class: `dnb-sr-only--inline` for [using in inline text contexts](/uilib/helpers), to make a better NVDA user experience.
- New [Table](/uilib/elements/tables#working-demo) style / icons on sorting buttons. Icon change: from `chevron` to `arrow`.
- All form components now have a `suffix` property e.g. [Slider](/uilib/components/slider).
- [GlobalStatus](/uilib/components/global-status) now supports visual type of info: `state="info"`.
- [FormStatus](/uilib/components/form-status) has now their own icons. You can [import these icons separately](/uilib/components/form-status#use-the-icons-only).

## Resources package

A new package, only containing resources needed by the DNB DCE team. This package is provided as a `tar` file.

- `https://unpkg.com/browse/dnb-ui-lib@6/dist/dnb-ui-resources.tgz`

## Install

To upgrade to v6 with NPM, use:

```bash
$ npm i dnb-ui-lib@6
```

_January, 30. 2020_
