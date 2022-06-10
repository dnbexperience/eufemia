/**
 * UI lib Component Example
 *
 */

import React from 'react'
import { css, Global } from '@emotion/react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

export const TableVariantBasic = () => (
  <ComponentBox hideCode data-visual-test="table-default">
    {
      /* jsx */ `
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
        <P space={0}>Column 1 <b>width p</b></P>
      </td>
      <td>
        <Code>Column 2 with code</Code>
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
`
    }
  </ComponentBox>
)

export const TableClassHelpers = () => (
  <ComponentBox hideCode data-visual-test="table-classes">
    {
      /* jsx */ `
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
`
    }
  </ComponentBox>
)

export const TableLongHeader = () => (
  <ComponentBox hideCode data-visual-test="table-header">
    {
      /* jsx */ `
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
        <P space={0}>col span of 4</P>
      </td>
    </tr>
  </tbody>
</Table>
`
    }
  </ComponentBox>
)

export const TableSticky = () => (
  <>
    <Global
      styles={css`
        body {
          .dnb-app-content {
            /** Because of position: sticky; */
            overflow: visible;
          }

          .dnb-tabbar {
            /** Because the tabbar has an bottom border that will be whown on top of the side-menu */
            overflow: hidden;
          }
        }
      `}
    />
    <ComponentBox hideCode data-visual-test="table-sticky">
      {
        /* jsx */ `
<Table sticky={true} sticky_offset="4rem" className="dnb-table--fixed">
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
        <P space={0}>Column 1 <b>width p</b></P>
      </td>
      <td>
        <Code>Column 2 with code</Code>
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
`
      }
    </ComponentBox>
  </>
)
