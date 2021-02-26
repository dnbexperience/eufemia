# v9

- [Migration](#migration)
- [Changes](#changes)

## Migration

v9 contains a couple of _braking changes_. As a migration process, you can simply search and replace:

1. Find `formRow` inside a (e.g. <Provider formRow= ...) and replace it with `FormRow` (PascalCase).
1. In case you use `format` or `cleanNumber` from either `/components/Number` or `/components/number/Number`, replace the import path to be `/components/number/NumberUtils`.

## Changes

## Install

To upgrade to v8 with NPM, use:

```bash
$ npm i dnb-ui-lib@9
```

_April, 15. 2021_
