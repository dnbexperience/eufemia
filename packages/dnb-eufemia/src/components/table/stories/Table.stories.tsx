/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'

import Table from '../Table'
// import Td from '../TableTd'
// import Th from '../TableTh'
// import Tr from '../TableTr'
import { Button } from '../../'
import { Provider } from '../../../shared'

export default {
  title: 'Eufemia/Components/Table',
}

export const StickyBasicTable = () => {
  return (
    <Table
      top="5rem"
      // skeleton // toggle
      sticky
      // fixed
      stickyOffset="4rem"
    >
      <caption className="dnb-sr-only">A Table Caption</caption>
      <thead>
        <tr>
          <th scope="col" colSpan={2}>
            Header
          </th>
          <th
            scope="col"
            className="dnb-table--sortable dnb-table--reversed"
          >
            <Button
              variant="tertiary"
              icon="arrow-down"
              text="Sortable"
              title="Sort table column"
              wrap="true"
            />
          </th>
          <th
            scope="col"
            className="dnb-table--sortable dnb-table--active"
          >
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
          <td colSpan={3}>Footer</td>
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
          <td colSpan={2}>Column which spans over two columns</td>
          <td>Column 3</td>
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
        <tr>
          <td>Column 1</td>
          <td>Column 2</td>
          <td>Column 3</td>
          <td>Column 4</td>
        </tr>
      </tbody>
    </Table>
  )
}

export const BasicTable = () => {
  return (
    <Provider
    // skeleton // toggle
    >
      <Table top>
        <caption>A Table Caption</caption>
        <thead>
          <tr>
            <th scope="col" colSpan={2} className="dnb-table--no-wrap">
              Header
            </th>
            <th
              scope="col"
              className="dnb-table--sortable dnb-table--reversed"
            >
              <Button
                variant="tertiary"
                icon="arrow-down"
                text="Sortable"
                title="Sort table column"
                wrap="true"
              />
            </th>
            <th
              scope="col"
              align="right"
              className="dnb-table--sortable dnb-table--active"
            >
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
            <td colSpan={2}>Column which spans over two columns</td>
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
    </Provider>
  )
}
