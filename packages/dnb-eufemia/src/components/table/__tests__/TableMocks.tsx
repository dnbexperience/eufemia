import React from 'react'
import Button from '../../Button'
import { Tr, Th, Td } from '../../../elements'

declare global {
  interface Window {
    IntersectionObserver: jest.Mock
  }
}

export const BasicTable = () => (
  <>
    <caption className="dnb-sr-only">A Table Caption</caption>
    <thead>
      <Tr>
        <Th scope="col" colSpan={2}>
          Header
        </Th>
        <Th
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
        </Th>
        <Th scope="col" className="dnb-table--sortable dnb-table--active">
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
    </tbody>
  </>
)
