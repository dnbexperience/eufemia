/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'

import Table from '../Table'
import Td from '../TableTd'
import Th from '../TableTh'
import Tr, { TableTrProps } from '../TableTr'
import TableContainer from '../TableContainer'

import { H2, P, Anchor, Dl, Lead } from '../../../elements'
import { Button, ToggleButton, NumberFormat, Avatar } from '../../'
import shopping_cart from '../../../icons/shopping_cart'
import useHandleSortState from '../useHandleSortState'

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
          <Th colSpan={2}>
            Header <Th.HelpButton>Help content</Th.HelpButton>
          </Th>
          <Th reversed sortable>
            <Th.SortButton text="Sortable" title="Sort table column" />
          </Th>
          <Th active sortable>
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
    &,
    .dnb-table__scroll-view {
      max-width: 70rem;
    }
    .dnb-table__container__body {
      min-width: 800px;
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
              <Th>
                I have a superscript{' '}
                <sup>
                  <Anchor href="#unique-ref-id">1</Anchor>
                </sup>
              </Th>
              <Th>Column 2</Th>
              <Th>Column 3</Th>
              <Th>Column 4</Th>
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
              <Th>Column 1</Th>
              <Th>Column 2</Th>
              <Th>Column 3</Th>
              <Th>Column 4</Th>
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
  const { sortState, sortHandler, activeSortName } = useHandleSortState({
    column1: { active: true, direction: 'desc' },
    column2: { modes: ['asc', 'off'] },
    column3: { modes: ['asc'] },
  })

  console.log('activeSortName', activeSortName)

  const [count, setCount] = React.useState(0)

  return (
    <React.StrictMode>
      <button onClick={handleCount}>count {count}</button>
      <Table top>
        <caption className="dnb-sr-only">A Table Caption</caption>
        <thead>
          <Tr>
            <Th
              sortable
              reversed={sortState.column1.reversed}
              active={sortState.column1.active}
            >
              <Th.SortButton
                on_click={sortHandler.column1}
                text="Column 1"
                title="Sort table column"
              />
            </Th>
            <Th
              sortable
              reversed={sortState.column2.reversed}
              active={sortState.column2.active}
            >
              <Th.SortButton
                on_click={sortHandler.column2}
                text="Column 2"
                title="Sort table column"
              />
            </Th>
            <Th
              align="right"
              sortable
              reversed={sortState.column3.reversed}
              active={sortState.column3.active}
            >
              <Th.SortButton
                on_click={sortHandler.column3}
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
    </React.StrictMode>
  )

  function handleCount() {
    setCount((c) => c + 1)
  }
}

export const TableOddEven = () => {
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

type ContentTrProps = {
  expanded?: boolean
  disabled?: boolean
}

const ContentTr = ({
  expanded = false,
  disabled = false,
  ...rest
}: ContentTrProps & Partial<TableTrProps> = {}) => {
  const SuccessGreen = styled(P)`
    color: var(--color-success-green);
  `

  return (
    <Tr
      expanded={expanded}
      disabled={disabled}
      // noAnimation
      onClick={trClickHandler}
      onOpened={trOpenHandler}
      onClosed={trCloseHandler}
      {...rest}
    >
      <Td>
        <Lead>
          <Avatar.Group
            aria-hidden
            label="Sbanken Global Indeks"
            right="x-small"
          >
            <Avatar>S</Avatar>
          </Avatar.Group>
          Sbanken Global Indeks
        </Lead>
        {/* <Table.AccordionToggleButton /> */}
      </Td>

      <Td>
        <SuccessGreen size="x-small">
          +<NumberFormat percent>17.24</NumberFormat>
        </SuccessGreen>
      </Td>

      <Td>
        <P size="x-small">
          <NumberFormat percent>0.5</NumberFormat>
        </P>
      </Td>

      <Td>
        <P size="x-small">
          <NumberFormat percent>0.8</NumberFormat>
        </P>
      </Td>

      <Td>⭐️⭐️⭐️⭐️</Td>

      <Td align="right">
        <span>some content</span>
      </Td>

      <Td.AccordionContent
      // noAnimation
      >
        <Dl>
          <dt>Favorittfarge</dt>
          <dd>Grønn</dd>
          <dt>Favorittmat</dt>
          <dd>
            <Button
              variant="secondary"
              icon={shopping_cart}
              icon_position="left"
              on_click={buttonClickHandler}
            >
              Taco
            </Button>
          </dd>
        </Dl>
      </Td.AccordionContent>
    </Tr>
  )

  function trClickHandler(event) {
    console.log('trClickHandler', event)
  }
  function trOpenHandler(event) {
    console.log('trOpenHandler', event)
  }
  function trCloseHandler(event) {
    console.log('trCloseHandler', event)
  }
  function buttonClickHandler({ event }) {
    event.preventDefault()
  }
}

const TableContent = () => {
  const manyRows = []
  for (let i = 0; i < 2; i++) {
    manyRows.push(<ContentTr key={i} />)
  }
  return (
    <>
      {/* <caption>A Table Caption</caption> */}
      <thead>
        <Tr>
          <Th
            // colSpan={2}
            sortable
            active
          >
            <HeaderSortButton>Fond</HeaderSortButton>
          </Th>
          <Th sortable reversed>
            <HeaderSortButton>1 år</HeaderSortButton>
          </Th>
          <Th sortable>
            <HeaderSortButton>Kostnad</HeaderSortButton>
          </Th>
          <Th sortable>
            <HeaderSortButton>Kostnad</HeaderSortButton>
          </Th>
          <Th sortable>
            <HeaderSortButton>Morningstar</HeaderSortButton>
          </Th>
          <Th sortable align="right">
            <HeaderSortButton>Handlekurv</HeaderSortButton>
          </Th>
        </Tr>
      </thead>

      <tbody>
        <ContentTr
        // variant="even"
        // disabled
        // expanded
        />

        {manyRows}
      </tbody>
    </>
  )
}

const HeaderSortButton = ({ children }) => {
  return (
    <Th.SortButton
      wrap={false}
      text={children}
      title="Sort table column"
    />
  )
}

export const TableAccordion = () => {
  const [skeleton, setSkeleton] = React.useState(false)
  return (
    <main aria-label="main area">
      <h1 className="dnb-sr-only">Table with accordion row</h1>
      <ToggleButton
        size="small"
        on_change={() => {
          setSkeleton((s) => !s)
        }}
      >
        Toggle Skeleton
      </ToggleButton>

      <Table.ScrollView top>
        <Table
          accordion
          skeleton={skeleton}
          outline
          border
          size="large"
          sticky
          // lang="no"
        >
          <TableContent />
        </Table>
      </Table.ScrollView>

      <Global
        styles={css`
          html {
            overflow: scroll;
          }
        `}
      />
    </main>
  )
}

export function TableSort() {
  const { sortState, sortHandler } = useHandleSortState({
    column1: {
      active: true,
      direction: 'asc',
    },
    column2: {
      direction: 'desc',
    },
  })

  interface Column1 {
    name: string
    minAmount: number
  }

  const product1: Column1 = { name: 'cab', minAmount: 1 }
  const product2: Column1 = { name: 'abc', minAmount: 3 }
  const product3: Column1 = { name: 'bac', minAmount: 2 }

  const mockData = [product1, product2, product3]

  const [sortedColumn1, setColumn1Data] =
    React.useState<Column1[]>(mockData)

  React.useEffect(() => {
    switch (sortState.column1.direction) {
      case 'asc':
        setColumn1Data([...mockData].sort(compareAsc))
        break

      case 'desc':
        setColumn1Data([...mockData].sort(compareDesc))
        break

      default:
      case 'off':
        setColumn1Data(mockData)
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortState.column1.direction])

  return (
    <Table>
      <thead>
        <Tr>
          <Th
            scope="col"
            sortable
            active={sortState.column1.active}
            reversed={sortState.column1.reversed}
          >
            <Th.SortButton text="Name" onClick={sortHandler.column1} />
          </Th>
          <Th
            scope="col"
            sortable
            active={sortState.column2.active}
            reversed={sortState.column2.reversed}
          >
            <Th.SortButton
              text="Min amount"
              onClick={sortHandler.column2}
            />
          </Th>
        </Tr>
      </thead>
      <tbody>
        {sortedColumn1.map((product) => (
          <Tr key={product.minAmount}>
            <Td>{product.name}</Td>
            <Td>{product.minAmount}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  )

  function compareDesc(a: Column1, b: Column1) {
    return b.name.localeCompare(a.name)
  }

  function compareAsc(a: Column1, b: Column1) {
    return a.name.localeCompare(b.name)
  }
}
