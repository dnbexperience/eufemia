---
showTabs: true
---

import {
TableVariantBasic,
TableVariantComplex,
TableRowScopeOnly,
TableVariantFixed,
TableStackedContainer,
TableContainerEmptyHeaderFooter,
TableClassHelpers,
TableLongHeader,
TableSticky,
TableStickyMaxHeight,
TableSizeMedium,
TableSizeSmall,
PaginationTable,
TableAccordion,
} from 'Docs/uilib/components/table/Examples'

## Demos

### Basic table

**NB:** In this example, the sort buttons do react on your input. But will not change the table data.

<TableVariantBasic />

### Complex table

You can force a row to overwrite the automated odd/even counting by providing e.g. `variant="even"` to a `<Tr />`. You can use this in combination with `rowSpan`.

**NB:** The table header in the first column needs to have `scope="row"`!

<TableVariantComplex />

### Row scope headers only

This table has only `scope="row"` and `scope="rowgroup"` headers – without the default `scope="col"`.

<TableRowScopeOnly />

### Fixed table

<TableVariantFixed />

### Medium and small sized

<TableSizeMedium />

A `small` sized table is only for special circumstances, where a lot of data needs to be shown on the screen at the same time.

<TableSizeSmall />

### Table with accordion rows

The second example uses both a `border` and an `outline`.

<TableAccordion />

### Table with sticky header

<TableSticky />

### Table with a max height

A sticky table header with `sticky="css-position"` and `max-height` on the `Table.ScrollView`.

<TableStickyMaxHeight />

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

With no (empty) `head` and `foot` content.

<TableContainerEmptyHeaderFooter />

### Table with long header text (wrapping)

<TableLongHeader />

### Table with pagination

<PaginationTable />

### Example usage of class helpers

<TableClassHelpers />
