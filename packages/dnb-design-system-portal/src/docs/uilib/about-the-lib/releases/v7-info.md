# v7

- [Migration](#migration)
- [New components](#new-components)
- [New icons](#new-icons)
- [Font fixes](#font-fixes)
- [How to Install](#install)

## Migration

v7 contains a couple of braking changes. As a migration process, you can simply search and replace:

1. find `sea-green-alt-30` replace it with `sea-green-30`
1. find `sea-green-alt` replace it with `sea-green`
1. find `#B3DADA` replace it with `#B3D5D5`
1. find `#008484` replace it with `#007272`

## New components

- New component [Autocomplete](/uilib/components/autocomplete)
- New component [Pagination](/uilib/components/pagination) including infinity scroller

## New icons

- New [secondary icons](/icons/secondary): `pay_from`, `transfer_to`

## Font fixes

- The `DNB` Font got updates on the bold weight. The changes effects these characters: `i?!`.

## Install

To upgrade to v7 with NPM, use:

```bash
$ npm i dnb-ui-lib@7
```

_March, 28. 2020_
