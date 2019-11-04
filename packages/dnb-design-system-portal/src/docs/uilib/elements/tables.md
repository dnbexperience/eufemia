---
title: 'Tables'
draft: false
---

import ComponentBox from 'Tags/ComponentBox'

## Tables

The following table has a default style. But in future, there will be several patterns and styles to choose from.

You may consider using `table-layout: fixed;`.

### Working Demo

Check out a [working example on CodeSandbox](https://codesandbox.io/embed/eufemia-react-table-x4cwc), using `react-table`.

### Styled Demo

<ComponentBox reactLive hideCode data-dnb-test="table-default">
{`
<table className="dnb-table">
  <caption>A Table Caption</caption>
  <thead>
    <tr>
      <th scope="col" colSpan="2" className="dnb-table--no-wrap">
        Header
      </th>
      <th scope="col" className="dnb-table--sortable dnb-table--reversed">
        {/* <a href="#sort">
          Sortable
          <IconPrimary icon="chevron-down" />
        </a> */}
        <Button
          variant="tertiary"
          icon="chevron-down"
          text="Sortable"
          title="Sort table row"
        />
      </th>
      <th scope="col" className="dnb-table--sortable dnb-table--active">
        {/* <a href="#sort">
          Active
          <IconPrimary icon="chevron-down" />
        </a> */}
        <Button
          variant="tertiary"
          icon="chevron-down"
          text="Active"
          title="Sort table row"
        />
      </th>
    </tr>
  </thead>
  {/* <tfoot>
    <tr>
      <td colSpan="3">Footer</td>
      <td>Sum</td>
    </tr>
  </tfoot> */}
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
      <td>Column 4</td>
    </tr>
    <tr>
      <td colSpan="2">Column witch spans over two columns</td>
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
</table>
`}
</ComponentBox>

### Classes

There are a couple helper classes to style tables:

- `.dnb-table__th` Table Header
- `.dnb-table__td` Table Data
- `.dnb-table__tr` Table Row
- `.dnb-table__tr--even` Use this on a `tr`
- `.dnb-table__tr--odd` Use this on a `tr`
- `.dnb-table--no-wrap` Use this on a `th`
- `.dnb-table--active` Use this on a `th`
- `.dnb-table--sortable` Use this on a `th`
- `.dnb-table--reversed` Use this on a `th`
- `.dnb-table--tabular` Use this on the `table` root

<ComponentBox reactLive hideCode data-dnb-test="table-classes" caption="Example usage of class helpers">
{`
<table className="dnb-table">
  <thead>
    <tr className="dnb-table__tr">
      <th className="dnb-table__th">
        .dnb-table__th
      </th>
      <th scope="col" className="dnb-table__th dnb-table--sortable dnb-table--reversed">
        <Button
          variant="tertiary"
          icon="chevron-down"
          text="dnb-table--reversed"
          title="dnb-table__th dnb-table--sortable dnb-table--reversed"
        />
      </th>
      <th scope="col" className="dnb-table__th dnb-table--sortable dnb-table--active">
        <Button
          variant="tertiary"
          icon="chevron-down"
          text="dnb-table--active"
          title="dnb-table__th dnb-table--sortable dnb-table--active"
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
</table>
`}
</ComponentBox>

### Tabular Numbers

Set [Tabular Lining](/uilib/typography/numbers) on tables by using this CSS class: `.dnb-table--tabular`

<ComponentBox reactLive hideCode data-dnb-test="table-tabular">
{`
<table className="dnb-table dnb-table--tabular">
  <thead>
    <tr>
      <th>
        Tabular Lining
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0123456789</td>
    </tr>
  </tbody>
</table>
`}
</ComponentBox>
