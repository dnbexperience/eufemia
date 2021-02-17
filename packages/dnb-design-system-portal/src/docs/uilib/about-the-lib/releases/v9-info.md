# v9

- [Migration](#migration)
- [Changes](#changes)

## Migration

v9 contains a couple of _braking changes_. As a migration process, you can simply search and replace:

1. Find `formRow` inside a (e.g. <Provider formRow= ...) and replace it with `FormRow` (PascalCase).
1. Find the `Number` component and rename it with `NumberFormat`.
1. In case you import it from `components/number-format/Number`, it has to be `components/number-format/NumberFormat`.
1. In case you use `format` or `cleanNumber` from either `/components/Number` or `/components/number-format/Number`, replace the import path to be `/components/number-format/NumberUtils`.

## Changes

### Updates to the language files

Strings where changed/removed and added to the [language files](/uilib/usage/customisation/localization) `nb-NO.js` and `en-GB.js`:

- Number (added)

## Install

To upgrade to v9 with NPM, use:

```bash
$ npm i dnb-ui-lib@9
```

_February, 16. 2021_
