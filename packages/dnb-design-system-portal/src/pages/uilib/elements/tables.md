---
draft: true
---

import ComponentBox from 'Tags/ComponentBox'

## Tables

The following table has a default style. But in future, there will be several patterns and styles to choose from.

<ComponentBox reactLive hideCode data-dnb-test="table-default">
{`
<table className="dnb-table">
  <thead>
    <tr>
      <th colSpan="2" className="dnb-table--no-wrap">
        Only text
      </th>
      <th className="dnb-table--sortable dnb-table--reversed">
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
      <th className="dnb-table--sortable dnb-table--active">
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
  <tbody>
    <tr>
      <td>
        <p>
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
      <td>Column 1</td>
      <td>Column 2</td>
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

### Tabular Numbers

Set [Tabular Lining](/uilib/typography/numbers) on tables by using this CSS class: `.dnb-table--tabular`

<ComponentBox reactLive hideCode data-dnb-test="table-default">
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
