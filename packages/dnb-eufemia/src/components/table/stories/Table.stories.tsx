/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'

import Table from '../Table'
import Td from '../TableTd'
import Th from '../TableTh'
import Tr from '../TableTr'
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
        <Tr>
          <Th scope="col" colSpan={2}>
            Header <Th.HelpButton>Help content</Th.HelpButton>
          </Th>
          <Th scope="col" reversed sortable>
            <Th.SortButton text="Sortable" title="Sort table column" />
          </Th>
          <Th scope="col" active sortable>
            <Th.SortButton text="Active" title="Sort table column" />
          </Th>
        </Tr>
      </thead>
      <tbody>
        <Table.StickyHelper />
        <Tr>
          <Td>
            <p className="dnb-p">
              Column 1 <b>width p</b>
            </p>
          </Td>
          <Td>
            <code className="dnb-code">Column 2 with code</code>
          </Td>
          <Td>
            <span>Column 3 with span</span>
          </Td>
          <Td>Column 4</Td>
        </Tr>
        <Tr>
          <Td colSpan={2}>Column which spans over two columns</Td>
          <Td>Column 3</Td>
          <Td>Column 4</Td>
        </Tr>
        <Tr>
          <Td>Column 1</Td>
          <Td>Column 2</Td>
          <Td>Column 3</Td>
          <Td>Column 4</Td>
        </Tr>
        <Tr>
          <Td>Column 1</Td>
          <Td>Column 2</Td>
          <Td>Column 3</Td>
          <Td>Column 4</Td>
        </Tr>
        <Tr>
          <Td>Column 1</Td>
          <Td>Column 2</Td>
          <Td>Column 3</Td>
          <Td>Column 4</Td>
        </Tr>
      </tbody>
      <tfoot>
        <Tr>
          <Td colSpan={3}>Footer</Td>
          <Td>Sum</Td>
        </Tr>
      </tfoot>
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
          <Tr>
            <Th scope="col" colSpan={2} className="dnb-table--no-wrap">
              Header
            </Th>
            <Th scope="col" reversed sortable>
              <Th.SortButton text="Sortable" title="Sort table column" />
            </Th>
            <Th scope="col" align="right" active sortable>
              <Th.SortButton text="Active" title="Sort table column" />
            </Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td>
              <p className="dnb-p">
                Column 1 <b>width p</b>
              </p>
            </Td>
            <Td>
              <code className="dnb-code">Column 2 with code</code>
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
    </Provider>
  )
}
