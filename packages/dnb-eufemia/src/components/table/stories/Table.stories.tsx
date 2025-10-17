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

import {
  H2,
  P,
  Anchor,
  Dl,
  Lead,
  Card,
  Flex,
  Badge,
  Input,
  Checkbox,
} from '../../..'
import { Button, ToggleButton, NumberFormat, Avatar } from '../../'
import _TableAccordionRows from './TableAccordionRows'
import shopping_cart from '../../../icons/shopping_cart'
import useHandleSortState from '../useHandleSortState'
import { compose as composeIcon, stop as stopIcon } from '../../../icons'
import { useMedia } from '../../../shared'

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
    /* Define the width of the THs so they are aligned across tables */
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

export const TableDeprecatedAccordionProp = () => {
  const [skeleton, setSkeleton] = React.useState(false)
  return (
    <main aria-label="main area">
      <h1 className="dnb-sr-only">Table with accordion row</h1>
      <ToggleButton
        // size="small"
        on_change={() => {
          setSkeleton((s) => !s)
        }}
      >
        Toggle Skeleton
      </ToggleButton>

      <Table.ScrollView top>
        <Table
          mode="accordion"
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

export const TableAccordionMode = () => {
  const [skeleton, setSkeleton] = React.useState(false)
  return (
    <main aria-label="main area">
      <h1 className="dnb-sr-only">Table with accordion row</h1>
      <ToggleButton
        // size="small"
        on_change={() => {
          setSkeleton((s) => !s)
        }}
      >
        Toggle Skeleton
      </ToggleButton>

      <Table.ScrollView top>
        <Table
          mode="accordion"
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

export const TableNavigationMode = () => {
  const [skeleton, setSkeleton] = React.useState(false)
  return (
    <main aria-label="main area">
      <h1 className="dnb-sr-only">Table with accordion row</h1>
      <ToggleButton
        // size="small"
        on_change={() => {
          setSkeleton((s) => !s)
        }}
      >
        Toggle Skeleton
      </ToggleButton>

      <Table.ScrollView top>
        <Table
          mode="navigation"
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

export const TableAccordionRows = () => <_TableAccordionRows />

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

  interface Row {
    name: string
    minAmount: number
  }

  const product1: Row = { name: 'cab', minAmount: 1 }
  const product2: Row = { name: 'abc', minAmount: 3 }
  const product3: Row = { name: 'bac', minAmount: 2 }

  const mockData = [product1, product2, product3]

  const [sortedRows, setRowData] = React.useState<Row[]>(mockData)

  React.useEffect(() => {
    switch (sortState.column1.direction) {
      case 'asc':
        setRowData([...mockData].sort(compareAsc))
        break

      case 'desc':
        setRowData([...mockData].sort(compareDesc))
        break

      default:
      case 'off':
        setRowData(mockData)
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortState.column1.direction])

  React.useEffect(() => {
    switch (sortState.column2.direction) {
      case 'asc':
        setRowData([...mockData].sort((a, b) => a.minAmount - b.minAmount))
        break

      case 'desc':
        setRowData([...mockData].sort((a, b) => b.minAmount - a.minAmount))
        break

      default:
      case 'off':
        setRowData(mockData)
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortState.column2.direction])

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
        {sortedRows.map((product) => (
          <Tr key={product.minAmount}>
            <Td>{product.name}</Td>
            <Td>{product.minAmount}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  )

  function compareDesc(a: Row, b: Row) {
    return b.name.localeCompare(a.name)
  }

  function compareAsc(a: Row, b: Row) {
    return a.name.localeCompare(b.name)
  }
}

export const InCard = () => {
  const { isSmall, isLarge } = useMedia()

  const header = {
    title: 'Tittel',
    description: 'Beskrivelse',
    status: 'Status',
    deadline: 'Frist',
  }

  const content = {
    title: 'Lorem ipsum',
    description: 'Lorem ipsum.',
    status: <Badge content="Ikke påbegynt" />,
    deadline: '17.04.2025',
  }

  const align = isLarge ? 'flex-end' : isSmall ? 'center' : 'flex-start'

  const tableRow = (
    <>
      {isLarge ? (
        <Tr noWrap>
          <Td>{content.title}</Td>
          <Td>{content.description}</Td>
          <Td>{content.status}</Td>
          <Td>{content.deadline}</Td>
        </Tr>
      ) : (
        <>
          <Tr noWrap variant="odd">
            <Th scope="row">{header.title}</Th>
            <Td>{content.title}</Td>
          </Tr>
          <Tr>
            <Th scope="row">{header.description}</Th>
            <Td>{content.description}</Td>
          </Tr>
          <Tr>
            <Th scope="row">{header.status}</Th>
            <Td>{content.status}</Td>
          </Tr>
          <Tr>
            <Th scope="row">{header.deadline}</Th>
            <Td>{content.deadline}</Td>
          </Tr>
        </>
      )}

      <Tr>
        <Td colSpan={isLarge ? 4 : 2} aria-label={header.title}>
          <Flex.Horizontal justify={align}>
            <Button
              variant="tertiary"
              icon={stopIcon}
              icon_position="left"
            >
              Avvis signering
            </Button>
            <Button variant="secondary" icon={composeIcon}>
              Start signering
            </Button>
          </Flex.Horizontal>
        </Td>
      </Tr>
    </>
  )

  const MyTable = () => {
    return (
      <Table.ScrollView>
        <Table border outline size="medium">
          {isLarge && (
            <thead>
              <Tr noWrap>
                <Th>{header.title}</Th>
                <Th>{header.description}</Th>
                <Th>{header.status}</Th>
                <Th>{header.deadline}</Th>
              </Tr>
            </thead>
          )}

          <tbody>
            {tableRow}
            {tableRow}
          </tbody>
        </Table>
      </Table.ScrollView>
    )
  }

  return (
    <Card title="Card title" responsive={false} innerSpace={0} filled>
      <MyTable />
    </Card>
  )
}

const tableData = [
  {
    id: 1,
    fact: 'DNB was founded in 1822',
    category: 'History',
    location: 'Norway',
    year: '1822',
    detail:
      "Originally established as Norges Bank's first commercial division",
    context:
      'DNB has been serving Norway for over 200 years, making it one of the oldest banks in the Nordic region.',
  },
  {
    id: 2,
    fact: "DNB is Norway's largest bank",
    category: 'Size',
    location: 'Norway',
    year: '2024',
    detail: 'Holds approximately 30% market share in Norway',
    context:
      'DNB dominates the Norwegian financial market with the largest customer base and assets under management.',
  },
  {
    id: 3,
    fact: "DNB's headquarters is in Oslo",
    category: 'Location',
    location: 'Oslo',
    year: '1822',
    detail: 'Located at Dronning Eufemias gate 30',
    context:
      'The modern headquarters building is named after Queen Eufemia, reflecting Norwegian royal heritage.',
  },
  {
    id: 4,
    fact: 'DNB has over 2 million customers',
    category: 'Customers',
    location: 'Norway',
    year: '2024',
    detail: 'Serving both personal and business customers',
    context:
      "With Norway's population being 5.4 million, DNB serves nearly half of all Norwegians.",
  },
  {
    id: 5,
    fact: 'DNB Eufemia design system launched',
    category: 'Design',
    location: 'Digital',
    year: '2018',
    detail: 'Named after Queen Eufemia of Norway',
    context:
      'The design system ensures consistent user experience across all DNB digital products and services.',
  },
  {
    id: 6,
    fact: 'DNB operates in 20+ countries',
    category: 'Global',
    location: 'International',
    year: '2024',
    detail: 'Strong presence in Nordic and Baltic regions',
    context:
      "DNB's international presence supports Norwegian companies expanding globally and serves local markets.",
  },
  {
    id: 7,
    fact: 'DNB pioneered mobile banking in Norway',
    category: 'Innovation',
    location: 'Digital',
    year: '2007',
    detail: 'First Norwegian bank to launch comprehensive mobile app',
    context:
      "DNB's early adoption of mobile technology positioned them as digital banking leaders in Scandinavia.",
  },
  {
    id: 8,
    fact: "DNB's logo features a triangle",
    category: 'Branding',
    location: 'Visual',
    year: '2003',
    detail: 'Symbolizes stability, growth, and progress',
    context:
      "The distinctive triangle logo is recognized as one of Norway's most trusted financial symbols.",
  },
  {
    id: 9,
    fact: 'DNB Green financing initiative',
    category: 'Sustainability',
    location: 'Norway',
    year: '2015',
    detail: 'Committed to sustainable finance and ESG principles',
    context:
      "DNB leads Nordic sustainable finance, supporting Norway's transition to a green economy.",
  },
  {
    id: 10,
    fact: 'DNB House built in 2012',
    category: 'Architecture',
    location: 'Oslo',
    year: '2012',
    detail: 'Award-winning sustainable office building',
    context:
      "The headquarters building showcases DNB's commitment to environmental responsibility and modern design.",
  },
  {
    id: 11,
    fact: 'DNB sponsors Norwegian sports',
    category: 'Sports',
    location: 'Norway',
    year: '1990',
    detail: 'Major sponsor of cross-country skiing and biathlon',
    context:
      "DNB's sports sponsorship reflects Norwegian culture and supports the nation's athletic achievements.",
  },
  {
    id: 12,
    fact: 'DNB uses AI for customer service',
    category: 'Technology',
    location: 'Digital',
    year: '2019',
    detail: "Chatbot 'Ailo' assists customers 24/7",
    context:
      "Named after a Sami word meaning 'holy' or 'sacred', Ailo represents DNB's tech innovation.",
  },
  {
    id: 13,
    fact: "DNB's stock is publicly traded",
    category: 'Finance',
    location: 'Oslo Stock Exchange',
    year: '2005',
    detail: 'Ticker symbol: DNB',
    context:
      'DNB went public in 2005, with the Norwegian government maintaining significant ownership.',
  },
  {
    id: 14,
    fact: 'DNB Art Collection is extensive',
    category: 'Culture',
    location: 'Norway',
    year: '1980',
    detail: "One of Norway's largest corporate art collections",
    context:
      'The collection features works by prominent Norwegian and international artists, promoting cultural heritage.',
  },
  {
    id: 15,
    fact: 'DNB supports startups',
    category: 'Innovation',
    location: 'Norway',
    year: '2016',
    detail: 'DNB Startup Accelerator program launched',
    context:
      'Supporting Norwegian fintech innovation and entrepreneurship through mentorship and funding.',
  },
  {
    id: 16,
    fact: 'DNB processes millions of transactions daily',
    category: 'Operations',
    location: 'Digital',
    year: '2024',
    detail: 'Over 10 million daily digital transactions',
    context:
      "DNB's robust infrastructure handles Norway's digital payment ecosystem efficiently and securely.",
  },
  {
    id: 17,
    fact: 'DNB card payments are contactless',
    category: 'Payments',
    location: 'Norway',
    year: '2018',
    detail: 'First Norwegian bank to make all cards contactless',
    context:
      'DNB led the contactless payment revolution in Norway, enhancing customer convenience and safety.',
  },
  {
    id: 18,
    fact: 'DNB has carbon-neutral operations',
    category: 'Environment',
    location: 'Norway',
    year: '2019',
    detail: 'Achieved carbon neutrality in own operations',
    context:
      'DNB demonstrates environmental leadership through renewable energy use and carbon offset programs.',
  },
  {
    id: 19,
    fact: "DNB's research team analyzes markets",
    category: 'Research',
    location: 'Norway',
    year: '1950',
    detail: 'Publishes economic forecasts and market analysis',
    context:
      "DNB's research insights influence Norwegian economic policy and business decision-making.",
  },
  {
    id: 20,
    fact: 'DNB uses biometric authentication',
    category: 'Security',
    location: 'Digital',
    year: '2020',
    detail: 'Fingerprint and face recognition in mobile app',
    context:
      'Advanced biometric security ensures customer data protection while maintaining user convenience.',
  },
  {
    id: 21,
    fact: 'DNB acquired multiple banks',
    category: 'Growth',
    location: 'Scandinavia',
    year: '2000s',
    detail: 'Strategic acquisitions expanded market presence',
    context:
      "DNB's growth strategy included acquiring regional banks to strengthen Nordic market position.",
  },
  {
    id: 22,
    fact: 'DNB supports Norwegian oil industry',
    category: 'Energy',
    location: 'North Sea',
    year: '1970',
    detail: 'Major financier of offshore oil and gas projects',
    context:
      "DNB's energy financing expertise supported Norway's transformation into a major oil-producing nation.",
  },
  {
    id: 23,
    fact: "DNB's pension fund is massive",
    category: 'Investment',
    location: 'Global',
    year: '1990',
    detail: 'Manages billions in pension assets',
    context:
      "DNB's pension management helps secure financial futures for Norwegian retirees and institutions.",
  },
  {
    id: 24,
    fact: 'DNB pioneered BankID in Norway',
    category: 'Digital Identity',
    location: 'Norway',
    year: '2010',
    detail: 'Co-created national digital identity solution',
    context:
      "BankID became Norway's primary digital identity system, used for government and private services.",
  },
  {
    id: 25,
    fact: "DNB's trading floor is advanced",
    category: 'Trading',
    location: 'Oslo',
    year: '2005',
    detail: 'State-of-the-art financial markets operation',
    context:
      "DNB's trading capabilities support Norwegian businesses and international market participation.",
  },
  {
    id: 26,
    fact: 'DNB branches feature modern design',
    category: 'Retail',
    location: 'Norway',
    year: '2015',
    detail: 'Redesigned branches focus on customer experience',
    context:
      "DNB's branch modernization program created welcoming spaces that blend digital and personal service.",
  },
  {
    id: 27,
    fact: "DNB's data centers are secure",
    category: 'Infrastructure',
    location: 'Norway',
    year: '2010',
    detail: 'Multiple redundant data centers ensure uptime',
    context:
      "DNB's robust IT infrastructure guarantees reliable banking services even during extreme conditions.",
  },
  {
    id: 28,
    fact: 'DNB supports women in finance',
    category: 'Diversity',
    location: 'Norway',
    year: '2018',
    detail: 'Active in promoting gender equality in banking',
    context:
      'DNB leads Nordic banking in gender diversity and inclusion, setting industry standards.',
  },
  {
    id: 29,
    fact: "DNB's mobile app is award-winning",
    category: 'Digital',
    location: 'Norway',
    year: '2021',
    detail: 'Recognized for exceptional user experience',
    context:
      "DNB's mobile banking app consistently ranks among the best in Europe for usability and features.",
  },
  {
    id: 30,
    fact: 'DNB offers student banking',
    category: 'Education',
    location: 'Norway',
    year: '1980',
    detail: 'Special banking services for students',
    context:
      "DNB's student banking products help Norwegian students manage finances during their education.",
  },
  {
    id: 31,
    fact: "DNB's crisis management is robust",
    category: 'Risk',
    location: 'Norway',
    year: '2008',
    detail: 'Successfully navigated 2008 financial crisis',
    context:
      "DNB's strong risk management helped maintain stability during global financial turbulence.",
  },
  {
    id: 32,
    fact: 'DNB invests in Norwegian innovation',
    category: 'Innovation',
    location: 'Norway',
    year: '2020',
    detail: 'Venture capital arm supports tech startups',
    context:
      "DNB's investment activities nurture Norwegian technology companies and digital transformation.",
  },
  {
    id: 33,
    fact: "DNB's customer service is multilingual",
    category: 'Service',
    location: 'Norway',
    year: '2000',
    detail: 'Support available in Norwegian, English, and more',
    context:
      "DNB's multilingual support reflects Norway's international character and diverse population.",
  },
  {
    id: 34,
    fact: 'DNB uses blockchain technology',
    category: 'Technology',
    location: 'Digital',
    year: '2018',
    detail: 'Exploring blockchain for trade finance',
    context:
      "DNB's blockchain initiatives aim to revolutionize international trade and payment processing.",
  },
  {
    id: 35,
    fact: "DNB's corporate culture is people-focused",
    category: 'Culture',
    location: 'Norway',
    year: '2000',
    detail: 'Emphasis on work-life balance and employee wellbeing',
    context:
      "DNB's employee-centric approach reflects Norwegian values and contributes to high job satisfaction.",
  },
  {
    id: 36,
    fact: 'DNB sponsors cultural events',
    category: 'Culture',
    location: 'Norway',
    year: '1990',
    detail: 'Major supporter of Norwegian arts and festivals',
    context:
      "DNB's cultural sponsorship strengthens Norwegian artistic communities and cultural heritage.",
  },
  {
    id: 37,
    fact: "DNB's wealth management is premium",
    category: 'Wealth',
    location: 'Scandinavia',
    year: '1995',
    detail: 'Exclusive services for high-net-worth individuals',
    context:
      "DNB's private banking serves Norway's wealthiest families and successful entrepreneurs.",
  },
  {
    id: 38,
    fact: "DNB's API platform is open",
    category: 'Technology',
    location: 'Digital',
    year: '2019',
    detail: 'Open banking APIs enable fintech integration',
    context:
      "DNB's open banking platform fosters innovation and competition in Norwegian financial services.",
  },
  {
    id: 39,
    fact: 'DNB has maritime financing expertise',
    category: 'Shipping',
    location: 'Global',
    year: '1970',
    detail: 'Leading financier of Norwegian shipping industry',
    context:
      "DNB's maritime expertise supports Norway's position as a global shipping and offshore leader.",
  },
  {
    id: 40,
    fact: "DNB's credit scoring is sophisticated",
    category: 'Analytics',
    location: 'Digital',
    year: '2017',
    detail: 'AI-powered credit assessment systems',
    context:
      "DNB's advanced analytics enable faster, more accurate lending decisions while managing risk.",
  },
  {
    id: 41,
    fact: 'DNB supports entrepreneurship',
    category: 'Business',
    location: 'Norway',
    year: '2010',
    detail: 'Specialized support for small business owners',
    context:
      "DNB's entrepreneurship programs help Norwegian small businesses grow and succeed in competitive markets.",
  },
  {
    id: 42,
    fact: "DNB's cybersecurity is world-class",
    category: 'Security',
    location: 'Digital',
    year: '2015',
    detail: 'Advanced threat detection and prevention systems',
    context:
      "DNB's cybersecurity investments protect customer data and maintain trust in digital banking.",
  },
  {
    id: 43,
    fact: 'DNB offers sustainable investment products',
    category: 'Investment',
    location: 'Global',
    year: '2020',
    detail: 'ESG-focused investment funds and advice',
    context:
      "DNB's sustainable investing options align with Norway's environmental values and global climate goals.",
  },
  {
    id: 44,
    fact: "DNB's instant payments are real-time",
    category: 'Payments',
    location: 'Norway',
    year: '2019',
    detail: '24/7 instant money transfers between accounts',
    context:
      "DNB's real-time payment system revolutionized Norwegian money transfers with immediate settlement.",
  },
  {
    id: 45,
    fact: 'DNB celebrates Norwegian heritage',
    category: 'Heritage',
    location: 'Norway',
    year: 'Always',
    detail: 'Proud supporter of Norwegian traditions and values',
    context:
      "DNB's commitment to Norwegian culture and values reflects its deep roots in the nation's history.",
  },
]

export function Overflow() {
  return (
    <div
    // style={{
    //   padding: '2rem',
    //   minHeight: '100vh',
    // }}
    >
      {/* <h1
        style={{
          color: '#007272',
          fontSize: '2rem',
          fontWeight: '500',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}
      >
        DNB Eufemia Design System Test - Fun Facts About DNB
      </h1> */}
      <Table.ScrollView
        top="6rem"
        style={{
          maxHeight: '400px',
          // backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
        }}
      >
        <Table
          fixed
          border
          outline
          mode="accordion"

          // style={{
          //   '--table-border-color': '#d6d6d6',
          // }}
        >
          {/* <caption
            style={{
              color: '#707070',
              fontSize: '1rem',
              marginBottom: '1rem',
              textAlign: 'left',
              fontWeight: '400',
            }}
          >
            Interesting Facts About DNB with Expandable Details
          </caption> */}
          <thead>
            <Tr>
              <Th style={{ width: '30%' }}>Fun Fact</Th>
              <Th style={{ width: '30%' }}>Category</Th>
              <Th style={{ width: '20%' }}>Location</Th>
              <Th align="right" style={{ width: '20%' }}>
                Year
              </Th>
            </Tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <Tr
                key={item.id}
                // style={{
                //   borderBottom: '1px solid #e5e5e5',
                // }}
              >
                <Td>{item.fact}</Td>
                <Td>{item.category}</Td>
                <Td>{item.location}</Td>
                <Td align="right">{item.year}</Td>
                <Td.AccordionContent>Content</Td.AccordionContent>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Table.ScrollView>
    </div>
  )
}

export function Accodion() {
  const AccordionTable = ({ id, showCheckbox = false, ...props }) => {
    const TdCheckbox = () => {
      return <Checkbox label="Select row" labelSrOnly />
    }
    const TdInput = () => {
      return <Input label="Label" label_sr_only size={4} />
    }
    const Content = ({ shareId }) => {
      const ref = React.useRef()
      // const { copy, CopyTooltip } = useCopyWithNotice()
      const shareHandler = () => {
        const url = new URL(location.href)
        url.hash = '#' + shareId
        // copy(url.toString())
      }
      return (
        <>
          <Button top icon="bell" variant="secondary">
            Ring the bell
          </Button>

          {/* <Section top spacing>
            <Dl>
              <Dt>Favorittfarge</Dt>
              <Dd>Grønn</Dd>
              <Dt>Favorittmat</Dt>
              <Dd>Taco</Dd>
            </Dl>
          </Section> */}

          <Button
            top
            variant="tertiary"
            // icon={copyIcon}
            icon_position="left"
            on_click={shareHandler}
            inner_ref={ref}
          >
            Copy link to this row
          </Button>

          {/* <CopyTooltip target={ref.current} /> */}
        </>
      )
    }
    const Row = ({ nr }) => {
      const shareId = id + '-' + nr
      return (
        <Tr id={shareId}>
          <Td>{showCheckbox ? <TdCheckbox /> : 'Row ' + nr}</Td>
          <Td>Row {nr}</Td>
          <Td spacing="horizontal">
            <TdInput />
          </Td>
          <Td align="right">Row {nr}</Td>

          <Td.AccordionContent>
            <Content shareId={shareId} />
          </Td.AccordionContent>
        </Tr>
      )
    }
    return (
      <Table mode="accordion" id={id} {...props}>
        <caption className="dnb-sr-only">A Table Caption</caption>

        <thead>
          <Tr>
            <Th>Column A</Th>
            <Th>Column B</Th>
            <Th>Column C</Th>
            <Th align="right">Column D</Th>
          </Tr>
        </thead>

        <tbody>
          <Row nr="1" />
          <Row nr="2" />
          <Row nr="3" />
        </tbody>
      </Table>
    )
  }

  return (
    <>
      <Table.ScrollView>
        <AccordionTable
          id="accordion-table-1"
          showCheckbox
          accordionChevronPlacement="end"
        />
      </Table.ScrollView>

      <Table.ScrollView top>
        <AccordionTable
          id="accordion-table-2"
          border
          outline
          size="medium"
        />
      </Table.ScrollView>
    </>
  )
}
