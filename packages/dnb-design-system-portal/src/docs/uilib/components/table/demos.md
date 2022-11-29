---
showTabs: true
---

import {
TableVariantBasic,
TableVariantComplex,
TableVariantFixed,
TableStackedContainer,
TableClassHelpers,
TableLongHeader,
TableSticky,
TableSizeMedium,
TableSizeSmall,
} from 'Docs/uilib/components/table/Examples'

## Demos

### Basic table

<TableVariantBasic />

### Complex table

You can force a row to overwrite the automated odd/even counting by providing e.g. `variant="even"` to a `<Tr />`. You can use this in combination with `rowSpan`.

<TableVariantComplex />

### Fixed table

<TableVariantFixed />

### Medium and small sized

<TableSizeMedium />

A `small` sized table is only for special circumstances, where a lot of data needs to be shown on the screen at the same time.

<TableSizeSmall />

### Table with sticky header

You have two options (both have their downsides):

1. use `sticky="body-scroll"` property. It works even when using a `Table.ScrollView` or a `overflow: hidden;` is used on any parent elements. The downside is, that it uses JavaScript and the browser may drop some frames, which results in a potential flickering during scrolling.

2. use `sticky={true}` for using the CSS `position: sticky;` method. It is super smooth. But then you can not use a `overflow: hidden;` or `overflow: auto;` on any parent elements. This is a know issue happening on every modern browser. There are various tricks, including [this deallocation / sync solution](https://uxdesign.cc/position-stuck-96c9f55d9526).

<TableSticky />

### Table with long header text (wrapping)

<TableLongHeader />

### Several tables in one container

<details>
  <summary class="dnb-p">
    Show how the import and syntax is structured.
  </summary>

```jsx
import TableContainer from '@dnb/eufemia/components/table/TableContainer'
render(
  <TableContainer>
    <TableContainer.Head>
      <H2>Heading</H2>
    </TableContainer.Head>

    <TableContainer.Body>
      <Table />
      <Table />
    </TableContainer.Body>

    <TableContainer.Foot>
      <P>Footer</P>
    </TableContainer.Foot>
  </TableContainer>
)
```

</details>

<TableStackedContainer />

### Example usage of class helpers

<TableClassHelpers />
