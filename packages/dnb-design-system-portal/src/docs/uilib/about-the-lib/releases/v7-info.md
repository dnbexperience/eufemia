# v7

- [Migration](#migration)
- [New components](#new-components)
- [New icons](#new-icons)
- [New features](#new-features)
- [Font fixes](#font-fixes)
- [How to Install](#install)

## Migration

v7 contains a couple of _braking changes_. As a migration process, you can simply search and replace:

1. Find `sea-green-alt-30` and replace it with `sea-green-30`
1. Find `sea-green-alt` and replace it with `sea-green`
1. Find `#B3DADA` and replace it with `#B3D5D5`
1. Find `#008484` and replace it with `#007272`
1. Find `['data-is-touch']` and replace it with `[data-whatintent='touch']`
1. Find `isIE11` and replace it with `IS_IE11`
1. Find `isEdge` and replace it with `IS_EDGE`
1. Find `dnb-h1--small` and replace it with `dnb-h--x-large`
1. Find `dnb-h1` and replace it with `dnb-h--xx-large`
1. Find `dnb-h2` and replace it with `dnb-h--large`
1. Find `dnb-h3` and replace it with `dnb-h--medium`
1. Find `dnb-h4` and replace it with `dnb-h--basis`
1. Find `dnb-h5` and replace it with `dnb-h--small`
1. Find `dnb-h6` and replace it with `dnb-h--x-small`
1. Find `prevent_selection` and replace it with `more_menu` (you may have to define a different icon as well)
1. If you used `style_type`, like `<H1 style_type="small">` before, use rather `<H1 size="x-large">` and the same applies to `<P style_type="small">`, so use the `modifier` prop here `<P modifier="small">`
1. **For UMD usage only** find `dnb-ui-lib.min.js` replace it with `dnb-ui-web-components.min.js`
1. The [Anchor (Text link)](/uilib/elements/anchor) has now also the default font-size of 18px (basis) - this means, you may have places where you would rather inherit the font-size by: `.dnb-anchor { font-size: inherit; }`
1. New strings where added to the [language files](/uilib/usage/customisation/localization) `nb-NO.js` and `en-US.js`. If you have a customized localization ([changes or addition](https://gist.github.com/tujoworker/f754da1137507fdd5d4bb61949a92259/revisions)), then make sure you maintain these new groups of strings:
   - Autocomplete
   - Pagination
   - ProgressIndicator
   - StepIndicator
1. The [Dropdown](/uilib/components/dropdown) uses now by default React Portal. This can have negative effects on scrollable views. Therefore, use the new [ScrollView](/uilib/components/fragments/scroll-view) fragment as the scrollable element.
1. For a custom [Dropdown](/uilib/components/dropdown) list width `.dnb-dropdown__list`, use `.dnb-dropdown .dnb-drawer-list__root` instead.
1. All events called `on_state_update` are now deprecated and will be removed in a future major version.
1. The property `default_state` in [Checkbox](/uilib/components/checkbox) and [Switch](/uilib/components/switch) is now deprecated and will be removed in a future major version.

## Heading changes

The new naming of h1, h2 etc. is to make it more clear that [semantic use of headings](/uilib/usage/best-practices/for-typography#headings-and-styling) don't have to do anything the actually styling. Developers still too often don't care about the correct [leveling of headings](/uilib/usage/best-practices/for-typography#think-semantics-first), because of the visual prioritization.

We hope with that change we embrace [better accessibility](/uilib/usage/accessibility/checklist).

## New components

- [Heading](/uilib/components/heading) component to automated semantic headings.
- [Autocomplete](/uilib/components/autocomplete) component.
- [Pagination](/uilib/components/pagination) component including **infinity scroller**.
- New element [Horizontal Rule (Hr)](/uilib/elements/horizontal-rule), called `hr-line` in Figma.
- New fragment [ScrollView](/uilib/components/fragments/scroll-view), used in [Modal](/uilib/components/modal) to fulfill the new Portal mode in the DrawerList scroll dependency inside of a Modal / Drawer.

## New features

- Icons inside of [Input](/uilib/components/input#input-icon) fields.
- [Number](/uilib/components/number) got more useful properties, like `decimals="0"` and `currency_position="after"` and also a neat [copy & paste](/uilib/components/number#accessibility) feature, where a unformatted number gets copied, instead of the visual number. Also, Norwegian organization numbers (`org`) are now supported.
- [Buttons](/uilib/components/button) now supports overflow text to wrap (break-word) by using `wrap="true"`.
- [Modal](/uilib/components/modal#drawer-mode) has now a **Drawer** mode inside the Modal component `mode="drawer"`.
- Also, the [Modal](/uilib/components/modal#drawer-mode) has now a dark background color and both open and close animation
- Expose [new helper functions](/uilib/helpers/functions#general-helpers) like, `isSafari`, `isiOS`, `isMac`, `isWin` and `isLinux` (beside `isIE11`,`isEdge`) in the shared helpers file: `import { isLinux } from 'dnb-ui-lib/shared/helpers'`. They are available as constants as well: `IS_IE11`, `IS_EDGE`, `IS_IOS`, `IS_MAC`, `IS_WIN` and `IS_LINUX`.

```jsx
<Dropdown
  data={{
    a: 'AA',
    b: 'BB'
  }}
/>
```

- [Dropdown](/uilib/components/dropdown) now also works fine inside of a [Modal](/uilib/components/modal#drawer-mode), taking the height of the Modal as the viewport reference.
- **ESM** (mjs) [bundles](/uilib/usage/first-steps/bundles) to load directly in to modern browsers.

### Table (new features)

- Sticky [Table](/uilib/elements/tables#table-with-sticky-header) header.
- Sortable [table](/uilib/elements/tables) header buttons supports now word-wrap by using `wrap="true"`.
- [Table](/uilib/elements/tables) headers supports now `small` font-size (`.dnb-table--small`) as well as `right` and `center` aligned headers.

## New icons

- New [secondary icons](/icons/secondary): `pay_from`, `transfer_to`

## Font fixes

- The `DNB` Font got updates on the bold weight. The changes effects these characters: `i?!`.

## Install

To upgrade to v7 with NPM, use:

```bash
$ npm i dnb-ui-lib@7
```

_June, 4. 2020_
