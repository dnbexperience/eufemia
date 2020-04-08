# v7

- [Migration](#migration)
- [New components](#new-components)
- [New icons](#new-icons)
- [New features](#new-features)
- [Font fixes](#font-fixes)
- [How to Install](#install)

## Migration

v7 contains a couple of braking changes. As a migration process, you can simply search and replace:

1. find `sea-green-alt-30` replace it with `sea-green-30`
1. find `sea-green-alt` replace it with `sea-green`
1. find `#B3DADA` replace it with `#B3D5D5`
1. find `#008484` replace it with `#007272`
1. **For UMD usage only** find `dnb-ui-lib.min.js` replace it with `dnb-ui-web-components.min.js`

## New components

- New component [Autocomplete](/uilib/components/autocomplete).
- New component [Pagination](/uilib/components/pagination) including **infinity scroller**.

## New features

- Icons inside of [Input](/uilib/components/input#input-icon) fields.
- [Buttons](/uilib/components/button) now supports overflow text to wrap (break-word) by using `wrap="true"`.
- [Dropdown](/uilib/components/dropdown) supports now also plain objects as data source.

```jsx
<Dropdown
  data={{
    a: 'AA',
    b: 'BB'
  }}
/>
```

- ESM bundles to load directly in to modern browsers:
  - `dnb-ui-lib/esm/dnb-ui-icons.min.mjs`
  - `dnb-ui-lib/esm/dnb-ui-lib.min.mjs`

### Table (new features)

- Sticky [Table](/uilib/elements/tables#table-with-sticky-header) header.
- Sorable [table](/uilib/elements/tables) header buttons supports now word-wrap by using `wrap="true"`.
- [Table](/uilib/elements/table) headers supports now `small` font-size as well as `right` and `center` aligned headers.

## New icons

- New [secondary icons](/icons/secondary): `pay_from`, `transfer_to`

## Font fixes

- The `DNB` Font got updates on the bold weight. The changes effects these characters: `i?!`.

## Install

To upgrade to v7 with NPM, use:

```bash
$ npm i dnb-ui-lib@7
```

_April, 12. 2020_
