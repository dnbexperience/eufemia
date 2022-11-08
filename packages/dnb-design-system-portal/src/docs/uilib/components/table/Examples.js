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
    <Tr>
      <Th scope="col" colSpan={2} noWrap>
        Header
      </Th>
      <Th scope="col" sortable reversed>
        <Th.SortButton
          text="Sortable"
          title="Sort table column"
        />
      </Th>
      <Th scope="col" align="right" sortable active>
        <Th.SortButton
          text="Active"
          title="Sort table column"
        />
      </Th>
    </Tr>
  </thead>
  <tbody>
    <Tr>
      <Td>
        <P space={0}>Column 1 <b>width p</b></P>
      </Td>
      <Td>
        <Code>Column 2 with code</Code>
      </Td>
      <Td>
        <span>Column 3 with span</span>
      </Td>
      <Td align="right">Column 4</Td>
    </Tr>
    <Tr>
      <Td colSpan={2}>Column which spans over two columns</Td>
      <Td>Column 3</Td>
      <Td align="right">Column 4</Td>
    </Tr>
    <Tr>
      <Td>Column 1</Td>
      <Td>Column 2</Td>
      <Td>Column 3</Td>
      <Td align="right">Column 4</Td>
    </Tr>
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
        <Th.SortButton
          text="dnb-table--reversed"
          title="dnb-table__th dnb-table--sortable dnb-table--reversed"
        />
      </th>
      <th scope="col" className="dnb-table__th dnb-table--sortable dnb-table--active">
        <Th.SortButton
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
    <Tr>
      <Th scope="col" colSpan="2">
        Static long header senectus ornare convallis ut at  erat imperdiet commodo
      </Th>
      <Th scope="col" className="dnb-table--sortable dnb-table--reversed">
        <Th.SortButton
          text="Sortable long header ridiculus laoreet turpis netus at vitae"
          title="Sort table column"
        />
      </Th>
      <Th scope="col" align="right" className="dnb-table--sortable dnb-table--active">
        <Th.SortButton
          text="Active and right aligned long header ridiculus laoreet turpis netus at vitae"
          title="Sort table column"
        />
      </Th>
    </Tr>
  </thead>
  <tbody>
    <Tr>
      <Td colSpan="4">
        <P space={0}>col span of 4</P>
      </Td>
    </Tr>
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
<Table sticky={true} stickyOffset="4rem" fixed>
  <caption className="dnb-sr-only">A Table Caption</caption>
  <thead>
    <Tr>
      <Th scope="col" colSpan="2">
        Header
      </Th>
      <Th scope="col" className="dnb-table--sortable dnb-table--reversed">
        <Th.SortButton
          text="Sortable"
          title="Sort table column"
        />
      </Th>
      <Th scope="col" className="dnb-table--sortable dnb-table--active">
        <Th.SortButton
          text="Active"
          title="Sort table column"
        />
      </Th>
    </Tr>
  </thead>
  <tfoot>
    <Tr>
      <Td colSpan="3">Footer</Td>
      <Td>Sum</Td>
    </Tr>
  </tfoot>
  <tbody>
    <Table.StickyHelper />
    <Tr>
      <Td>
        <P space={0}>Column 1 <b>width p</b></P>
      </Td>
      <Td>
        <Code>Column 2 with code</Code>
      </Td>
      <Td>
        <span>Column 3 with span</span>
      </Td>
      <Td>Column 4</Td>
    </Tr>
    <tr id="scroll-to-tr-id">
      <Td colSpan="2">Column which spans over two columns</Td>
      <Td>Column 3</Td>
      <Td>Column 4</Td>
    </tr>
    <Tr>
      <Td>Column 1</Td>
      <Td>Column 2</Td>
      <Td>Column 3</Td>
      <Td>Column 4</Td>
    </Tr>
  </tbody>
</Table>
`
      }
    </ComponentBox>
  </>
)
