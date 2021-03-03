# v9

- [Migration](#migration)
- [Changes](#changes)
- [Feature](#features)

## Migration

v9 of @dnb/eufemia contains _braking changes_. As a migration process, you can simply search and replace:

1. Uninstall `dnb-ui-lib` and install `@dnb/eufemia`
1. Rename with Regex `("|')dnb-ui-lib` and replace with `$1@dnb/eufemia`
1. Find `formRow` inside a (e.g. <Provider formRow= ...) and replace it with `FormRow` (PascalCase).
1. Find the `Number` component and rename it with `NumberFormat`.
1. Find the `dnb-number` and replace it with `dnb-number-format`.
1. In case you import it from `components/number/Number`, it has to be `components/number-format/NumberFormat`.
1. In case you use `format` or `cleanNumber` from either `/components/Number` or `/components/number/Number`, replace the import path to be `/components/number-format/NumberUtils`.
1. You can also use Regex: Find `Number([^F)]|$)` and replace with `NumberFormat$1`

### Patterns vs Extensions

Most of the Eufemia "patterns" got removed in favor of calling this part as **extensions**.

1. Find `dnb-ui-lib/patterns` or `@dnb/eufemia/patterns` and replace with `@dnb/eufemia/extensions`
1. Find `dnb-ui-patterns` and replace with `dnb-ui-extensions`

The following extensions are removed:

- ActionNav
- DescriptionList
- Footer
- Form
- Grid
- MainMenu
- SummaryTable
- FieldsetDescription
- FormSummaryPage
- RangeSlider
- ViewTitle

## Changes

### Updates to the language files

Strings where changed/removed and added to the [language files](/uilib/usage/customisation/localization) `nb-NO.js` and `en-GB.js`:

- NumberFormat (added)

## Features

- Enhance Webpack v5 compatibility
- Enhance React v17 compatibility

## Install

To upgrade to @dnb/eufemia v9 with NPM, use:

```bash
$ npm i @dnb/eufemia@9
```

_March, 3. 2021_
