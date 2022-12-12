/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import styled from '@emotion/styled'

import Table from '../Table'
import Td from '../TableTd'
import Th from '../TableTh'
import Tr from '../TableTr'
import TableContainer from '../TableContainer'

import { H2, P, Anchor } from '../../../elements'

export default {
  title: 'Eufemia/Components/Table',
}

export const StickyBasicTable = () => {
  return (
    <Table
      // top="5rem"
      // skeleton // toggle
      border
      outline
      sticky="css-position"
      // stickyOffset="2.5rem" // height of header
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

export const ContainerTable = () => {
  const StyledContainer = styled(TableContainer)`
    /* Define the width of the THs so they are aligned accross tables */
    .dnb-table__container__body {
      min-width: 800px;
      max-width: 70rem;
    }
    table {
      thead {
        th:nth-of-type(1) {
          width: 30%;
        }
        th:nth-of-type(2) {
          width: 30%;
        }
        th:nth-of-type(3) {
          width: 20%;
        }
        th:nth-of-type(4) {
          width: 20%;
        }
      }
    }
  `
  return (
    <StyledContainer aria-label="I contain two tables" bottom="large">
      <TableContainer.Head>
        <H2>Header</H2>
        <P top>Text</P>
      </TableContainer.Head>

      <TableContainer.Body>
        <Table
          fixed
          border
          sticky
          // stickyOffset="2.5rem"
        >
          <caption className="dnb-sr-only">Table One</caption>
          <thead>
            <Tr noWrap>
              <Th scope="col">
                I have a superscript{' '}
                <sup>
                  <Anchor href="#unique-ref-id">1</Anchor>
                </sup>
              </Th>
              <Th scope="col">Column 2</Th>
              <Th scope="col">Column 3</Th>
              <Th scope="col">Column 4</Th>
            </Tr>
          </thead>
          <tbody>
            <Tr>
              <Td>Row 1</Td>
              <Td>Row 1</Td>
              <Td>Row 1</Td>
              <Td>Row 1</Td>
            </Tr>
            <Tr>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
            </Tr>
            <Tr>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
            </Tr>
            <Tr>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
            </Tr>
            <Tr>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
            </Tr>
            <Tr>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
            </Tr>
          </tbody>
        </Table>

        <Table
          fixed
          border
          sticky
          // stickyOffset="2.5rem"
        >
          <caption className="dnb-sr-only">Table Two</caption>
          <thead>
            <Tr noWrap>
              <Th scope="col">Column 1</Th>
              <Th scope="col">Column 2</Th>
              <Th scope="col">Column 3</Th>
              <Th scope="col">Column 4</Th>
            </Tr>
          </thead>
          <tbody>
            <Tr>
              <Td>Row 1</Td>
              <Td>Row 1</Td>
              <Td>Row 1</Td>
              <Td>Row 1</Td>
            </Tr>
            <Tr>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
            </Tr>
            <Tr>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
            </Tr>
            <Tr>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
            </Tr>
            <Tr>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
            </Tr>
            <Tr>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
            </Tr>
            <Tr>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
            </Tr>
            <Tr>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
            </Tr>
            <Tr>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
            </Tr>
            <Tr>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
            </Tr>
            <Tr>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
              <Td>Row 2</Td>
            </Tr>
          </tbody>
        </Table>
      </TableContainer.Body>

      <TableContainer.Foot>
        <P id="unique-ref-id">Footer</P>
      </TableContainer.Foot>
    </StyledContainer>
  )
}

export const BasicTable = () => {
  const [activeCol, setActiveCol] = React.useState('col1')
  const [directionCol1, setSortDirectionCol1] = React.useState(false)
  const [directionCol2, setSortDirectionCol2] = React.useState(false)
  const [directionCol3, setSortDirectionCol3] = React.useState(false)
  const sortCol1 = () => {
    setActiveCol('col1')
    setSortDirectionCol1((s) => !s)
  }
  const sortCol2 = () => {
    setActiveCol('col2')
    setSortDirectionCol2((s) => !s)
  }
  const sortCol3 = () => {
    setActiveCol('col3')
    setSortDirectionCol3((s) => !s)
  }

  return (
    <Table top>
      <caption className="dnb-sr-only">A Table Caption</caption>
      <thead>
        <Tr>
          <Th
            scope="col"
            sortable
            reversed={directionCol1}
            active={activeCol === 'col1'}
          >
            <Th.SortButton
              on_click={sortCol1}
              text="Column 1"
              title="Sort table column"
            />
          </Th>
          <Th
            scope="col"
            sortable
            reversed={directionCol2}
            active={activeCol === 'col2'}
          >
            <Th.SortButton
              on_click={sortCol2}
              text="Column 2"
              title="Sort table column"
            />
          </Th>
          <Th
            scope="col"
            align="right"
            sortable
            reversed={directionCol3}
            active={activeCol === 'col3'}
          >
            <Th.SortButton
              on_click={sortCol3}
              text="Column 3"
              title="Sort table column"
            />
          </Th>
        </Tr>
      </thead>
      <tbody>
        <Tr variant="even">
          <Td>
            <p className="dnb-p">
              Row 1 <b>width p</b>
            </p>
          </Td>
          <Td>
            <span>Row 1 with span</span>
          </Td>
          <Td align="right">Row 1</Td>
        </Tr>
        <Tr>
          <Td colSpan={2}>Row 2 which spans over two columns</Td>
          <Td align="right">Row 2</Td>
        </Tr>
        <Tr>
          <Td>Row 3</Td>
          <Td>Row 3</Td>
          <Td align="right">Row 3</Td>
        </Tr>
      </tbody>
    </Table>
  )
}

export const TableSortable = () => {
  const [list, setlist] = React.useState([
    'content cab',
    'content abc',
    'content bac',
    'content x',
    'content y',
    'content z',
  ])

  const [count, setCount] = React.useState(0)

  return (
    <React.StrictMode>
      <button onClick={handleCount}>count {count}</button>
      <Table>
        <thead>
          <Tr>
            <th>
              <button onClick={handleReorder}>re-order</button>
              <button onClick={handleRemove}>remove</button>
              <button onClick={handleAdd}>add</button>
              <button onClick={handleCount}>count {count}</button>
            </th>
          </Tr>
        </thead>
        <tbody>
          {list.map((value) => (
            <Tr key={value}>
              <td>{value}</td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </React.StrictMode>
  )

  function sortByName(a, b) {
    return a.localeCompare(b)
  }

  function handleReorder() {
    setlist([...list].sort(sortByName))
  }
  function handleRemove() {
    setlist([
      'content cab',
      'content abc',
      'content bac',
      'content y',
      'content z',
    ])
  }
  function handleAdd() {
    setlist([
      'content cab',
      'content abc',
      'content bac',
      'content x2',
      'content y',
      'content z',
    ])
  }
  function handleCount() {
    setCount((c) => c + 1)
  }
}
