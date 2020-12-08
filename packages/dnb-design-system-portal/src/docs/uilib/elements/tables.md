---
title: 'Tables'
---

import ComponentBox from 'Tags/ComponentBox'
import { css, Global } from '@emotion/react'

<Global styles={css`body{ .dnb-app-content { overflow: visible; } }`} />

## Tables

The following table has a default style. But in future, there will be several patterns and styles to choose from.

You may consider using `table-layout: fixed;`. You can use the modifier class in doing so: `.dnb-table--fixed`

### Working Demo

Check out a [working example on CodeSandbox](https://codesandbox.io/embed/eufemia-react-table-x4cwc), using `react-table`.

### Classes

**NB:** Tables get their default table style by only having correct markup and the **`.dnb-table`** class assigned.

To enhance or manipulate the the table style, you can make use of a couple helper classes:

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

<ComponentBox hideCode data-visual-test="table-classes" caption="Example usage of class helpers">
{`
<Table className="dnb-table">
  <thead>
    <tr className="dnb-table__tr">
      <th className="dnb-table__th">
        .dnb-table__th
      </th>
      <th scope="col" className="dnb-table__th dnb-table--sortable dnb-table--reversed">
        <Button
          variant="tertiary"
          icon="arrow-down"
          text="dnb-table--reversed"
          title="dnb-table__th dnb-table--sortable dnb-table--reversed"
          wrap="true"
        />
      </th>
      <th scope="col" className="dnb-table__th dnb-table--sortable dnb-table--active">
        <Button
          variant="tertiary"
          icon="arrow-down"
          text="dnb-table--active"
          title="dnb-table__th dnb-table--sortable dnb-table--active"
          wrap="true"
        />
      </th>
    </tr>
  </thead>
  <tbody>
    <tr className="dnb-table__tr dnb-table__tr--even">
      <td colSpan="3" className="dnb-table__td">.dnb-table__tr--even > .dnb-table__td</td>
    </tr>
    <tr className="dnb-table__tr dnb-table__tr--odd">
      <td colSpan="3" className="dnb-table__td">.dnb-table__tr--odd > .dnb-table__td</td>
    </tr>
  </tbody>
</Table>
`}
</ComponentBox>

### Default Table style

<ComponentBox hideCode data-visual-test="table-default">
{`
<Table className="dnb-table">
  <caption>A Table Caption</caption>
  <thead>
    <tr>
      <th scope="col" colSpan="2" className="dnb-table--no-wrap">
        Header
      </th>
      <th scope="col" className="dnb-table--sortable dnb-table--reversed">
        <Button
          variant="tertiary"
          icon="arrow-down"
          text="Sortable"
          title="Sort table column"
          wrap="true"
        />
      </th>
      <th scope="col" align="right" className="dnb-table--sortable dnb-table--active">
        <Button
          variant="tertiary"
          icon="arrow-down"
          text="Active"
          title="Sort table column"
          wrap="true"
        />
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <p className="dnb-p">
          Column 1 <b>width p</b>
        </p>
      </td>
      <td>
        <code className="dnb-code">Column 2 with code</code>
      </td>
      <td>
        <span>Column 3 with span</span>
      </td>
      <td align="right">Column 4</td>
    </tr>
    <tr>
      <td colSpan="2">Column which spans over two columns</td>
      <td>Column 3</td>
      <td align="right">Column 4</td>
    </tr>
    <tr>
      <td>Column 1</td>
      <td>Column 2</td>
      <td>Column 3</td>
      <td align="right">Column 4</td>
    </tr>
  </tbody>
</Table>
`}
</ComponentBox>

### Table with sticky header

**NB:** Keep in mind, you have to avoid using `overflow: hidden;` on any child elements to get `position: sticky;` to work. This is a know issue happening on every modern browser. There are various tricks, including [this deallocation / sync solution](https://uxdesign.cc/position-stuck-96c9f55d9526).

<ComponentBox hideCode data-visual-test="table-sticky">
{`
<Table sticky="true" sticky_offset="4rem" className="dnb-table--fixed">
  <caption className="dnb-sr-only">A Table Caption</caption>
  <thead>
    <tr>
      <th scope="col" colSpan="2">
        Header
      </th>
      <th scope="col" className="dnb-table--sortable dnb-table--reversed">
        <Button
          variant="tertiary"
          icon="arrow-down"
          text="Sortable"
          title="Sort table column"
          wrap="true"
        />
      </th>
      <th scope="col" className="dnb-table--sortable dnb-table--active">
        <Button
          variant="tertiary"
          icon="arrow-down"
          text="Active"
          title="Sort table column"
          wrap="true"
        />
      </th>
    </tr>
  </thead>
  <tfoot>
    <tr>
      <td colSpan="3">Footer</td>
      <td>Sum</td>
    </tr>
  </tfoot>
  <tbody>
    <Table.StickyHelper />
    <tr>
      <td>
        <p className="dnb-p">
          Column 1 <b>width p</b>
        </p>
      </td>
      <td>
        <code className="dnb-code">Column 2 with code</code>
      </td>
      <td>
        <span>Column 3 with span</span>
      </td>
      <td>Column 4</td>
    </tr>
    <tr>
      <td colSpan="2">Column which spans over two columns</td>
      <td>Column 3</td>
      <td>Column 4</td>
    </tr>
    <tr>
      <td>Column 1</td>
      <td>Column 2</td>
      <td>Column 3</td>
      <td>Column 4</td>
    </tr>
  </tbody>
</Table>
`}
</ComponentBox>

### Table with long header text (wrapping)

Also, the table header is set to **small** font-size.

<ComponentBox hideCode data-visual-test="table-header">
{`
<Table>
  <caption className="dnb-sr-only">A Table Caption</caption>
  <thead>
    <tr className="dnb-table--small">
      <th scope="col" colSpan="2">
        Static long header senectus ornare convallis ut at  erat imperdiet commodo
      </th>
      <th scope="col" className="dnb-table--sortable dnb-table--reversed">
        <Button
          variant="tertiary"
          icon="arrow-down"
          text="Sortable long header ridiculus laoreet turpis netus at vitae"
          title="Sort table column"
          wrap="true"
        />
      </th>
      <th scope="col" align="right" className="dnb-table--sortable dnb-table--active">
        <Button
          variant="tertiary"
          icon="arrow-down"
          text="Active and right aligned long header ridiculus laoreet turpis netus at vitae"
          title="Sort table column"
          wrap="true"
        />
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colSpan="4">
        <p className="dnb-p">
          col span of 4
        </p>
      </td>
    </tr>
  </tbody>
</Table>
`}
</ComponentBox>
