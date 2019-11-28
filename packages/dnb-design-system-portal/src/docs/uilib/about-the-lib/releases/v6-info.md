# v6

- [Migration](#migration)
- [New DNB font](#new-dnb-font) **(major change)**
- [Color changes](#color-changes) **(feature and major change)**
- [Icon changes](#icon-changes) **(feature)**
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
- [font-weight](/uilib/typography/font-weights)

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

## New Icons

```js
// new primary icons
import {
  reset,
  arrow_top,
  arrow_right,
  arrow_bottom,
  arrow_left
} from 'dnb-ui-lib/icons/primary'

// new secondary icons
import {
  home,
  settings,
  refresh,
  add_file,
  view_on,
  view_off
} from 'dnb-ui-lib/icons/secondary'
```

## Other features

- [FormLabel](/uilib/components/form-label) got a new prop `sr_only`. This way you still can provide a **label**, but available only for screen readers.
- [DatePicker](/uilib/components/date-picker) got a new prop `show_reset_button` to show a _Reset_ button inside the date picker.
- [Blockquote](/uilib/elements/blockquote) is now up to date `dnb-blockquote--no-background` to display a quote without the contrast background, but rather a transparent.
- New helper class: `dnb-responsive-component` Makes some component form components, like [Input](/uilib/components/input) react to mobile sized screens. But as this can have some negative effects to have this enabled by default, you can enable this optionally by using this helper class.
- Added `keep_placeholder` property to [Input](/uilib/components/input) component.
- Added `currency_display` property to [Number](/uilib/components/number) including Provider support.
- Added `border` property to [Icon](/uilib/components/icon) to show a rounded border on icons.
- New [Table](/uilib/elements/tables#working-demo) style / icons on sorting buttons. Icon change: from `chevron` to `arrow`.
- Enhanced support on nested [Lists](/uilib/elements/lists), especially on ordered lists (with numbers).

## Resources package

A new package, only containing resources needed by the DNB DCE team. This package is provided as a `tar` file.

- `https://unpkg.com/browse/dnb-ui-lib/dist/dnb-ui-resources.tgz`

## Install

To upgrade to v6 with NPM, use:

```bash
$ npm i dnb-ui-lib@6
```

_November, 26. 2019_
