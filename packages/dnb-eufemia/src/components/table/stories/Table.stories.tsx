/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'

import Table from '../Table'
import Td from '../TableTd'
import Th from '../TableTh'
import Tr from '../TableTr'
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
      // className="dnb-table--fixed"
      stickyOffset="4rem"
    >
      <caption className="dnb-sr-only">A Table Caption</caption>
      <thead>
        <Tr>
          <Th scope="col" colSpan={2}>
            Header
          </Th>
          <Th scope="col" reversed sortable>
            <Button
              variant="tertiary"
              icon="arrow-down"
              text="Sortable"
              title="Sort table column"
              wrap="true"
            />
          </Th>
          <Th scope="col" active sortable>
            <Button
              variant="tertiary"
              icon="arrow-down"
              text="Active"
              title="Sort table column"
              wrap="true"
            />
          </Th>
        </Tr>
      </thead>
      <tfoot>
        <Tr>
          <Td colSpan={3}>Footer</Td>
          <Td>Sum</Td>
        </Tr>
      </tfoot>
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
              <Button
                variant="tertiary"
                icon="arrow-down"
                text="Sortable"
                title="Sort table column"
                wrap="true"
              />
            </Th>
            <Th scope="col" align="right" active sortable>
              <Button
                variant="tertiary"
                icon="arrow-down"
                text="Active"
                title="Sort table column"
                wrap="true"
              />
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
