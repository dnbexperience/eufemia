---
showTabs: true
---

# Tables

The following table has a default style. But in future, there will be several extensions and styles to choose from.

## Fixed layout

You may consider using `table-layout: fixed;`. You can use the modifier class in doing so: `.dnb-table--fixed`

## Data-grid driven tables

You may have a look at React [Table](https://github.com/TanStack/table) (former `react-table`) including this [CodeSandbox example](https://codesandbox.io/embed/eufemia-react-table-x4cwc).

## Classes

**NB:** Tables get their default table style by only having correct markup and the **`.dnb-table`** class assigned.

To enhance or manipulate the table style, you can make use of a couple helper classes:

- `.dnb-table--fixed` Table Layout
- `.dnb-table__th` Table Header
- `.dnb-table__td` Table Data
- `.dnb-table__tr` Table Row
- `.dnb-table__tr--even` Use this on a `tr` - if manual definition is needed
- `.dnb-table__tr--odd` Use this on a `tr` - if manual definition is needed
- `.dnb-table--no-wrap` Use this on a `th`
- `.dnb-table--sortable` Use this on a `th` - sortable column
- `.dnb-table--active` Use this on a `th` - current column is sorted
- `.dnb-table--reversed` Use this on a `th` - defines the order
- `.dnb-table--right` Use this on a `th`, `td` or `tr` - align the content to the right (or use `align="right"`)
- `.dnb-table--center` Use this on a `th`, `td` or `tr` - align the content to the left (or use `align="center"`)

<!-- - `.dnb-table--small` Use this on a `th`, `td` or `tr` - [font-size](/uilib/typography/font-size) is then `small` (`x-small` is also supported, but should generally be avoided due to bad accessibility) -->

<!-- - `.dnb-table--tabular` Use this on the `table` root -->
