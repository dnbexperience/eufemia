/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'

import Table from '../Table'
import Td from '../TableTd'
import Th from '../TableTh'
import Tr from '../TableTr'
import {
  Button,
  Dl,
  // Dt,
  // Dd,
  P,
  Avatar,
  NumberFormat,
  ToggleButton,
} from '../../../'
// import { Provider } from '../../../shared'
// import { ResTable, Tr, Th } from './ResTable'
// import { hasSelectedText } from '../../../shared/helpers'
// import { getPreviousSibling } from '../../../shared/component-helper'
import { shopping_cart } from '../../../icons'

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
    <Table
      top // skeleton // toggle
    >
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
  )
}

const buttonClickHandler = (e) => {
  e.stopPropagation()
  e.preventDefault()
  console.log('buttonClickHandler')
}

const ContentTr = ({
  open = false,
  noAnimation = false,
  accordion = false,
} = {}) => (
  <Tr open={open} noAnimation={noAnimation}>
    <Td.MainCell
      title="Sbanken Global Indeks"
      info="Globalt indeksfond"
      avatar={
        <Avatar.Group aria-hidden label="Sbanken Global Indeks">
          <Avatar>S</Avatar>
        </Avatar.Group>
      }
      // alwaysToggleAccordionContent
      // onClick={() => {

      // }}
    />

    <Td info="1 år">
      <P
        element="span"
        size="x-small"
        style={{ color: 'var(--color-success-green)' }}
      >
        +<NumberFormat percent>17.24</NumberFormat>
      </P>
    </Td>

    <Td info="Kostnad 1">
      <P element="span" size="x-small">
        <NumberFormat percent>0.5</NumberFormat>
      </P>
    </Td>

    <Td info="Kostnad 2">
      <P element="span" size="x-small">
        <NumberFormat percent>0.8</NumberFormat>
      </P>
    </Td>

    <Td info={<>M.</>}>⭐️⭐️⭐️⭐️</Td>

    <Td align="right">
      <div>
        <Button
          variant="secondary"
          icon={shopping_cart}
          icon_position="left"
        >
          Legg til
        </Button>
      </div>
    </Td>

    {accordion && (
      <Table.AccordionContent>
        <Dl>
          <dt>Favorittfarge</dt>
          <dd>Grønn</dd>
          <dt>
            Favorittmat{' '}
            <button onClick={buttonClickHandler}>button</button>
          </dt>
          <dd>
            Taco <button onClick={buttonClickHandler}>button</button>
          </dd>
        </Dl>
      </Table.AccordionContent>
    )}
  </Tr>
)

const TableContent = ({ accordion = false } = {}) => {
  const manyRows = []
  for (let i = 0; i < 2; i++) {
    manyRows.push(<ContentTr key={i} accordion={accordion} />)
  }
  return (
    <>
      {/* <caption>A Table Caption</caption> */}
      <thead>
        <Tr>
          <Th
            scope="col"
            // colSpan={2}
            className="dnb-table--sortable dnb-table--active"
          >
            <HeaderSortButton>Fond</HeaderSortButton>
          </Th>
          <Th
            scope="col"
            className="dnb-table--sortable dnb-table--reversed"
          >
            <HeaderSortButton>1 år</HeaderSortButton>
          </Th>
          <Th scope="col" className="dnb-table--sortable">
            <HeaderSortButton>Kostnad 1</HeaderSortButton>
          </Th>
          <Th scope="col" className="dnb-table--sortable">
            <HeaderSortButton>Kostnad 2</HeaderSortButton>
          </Th>
          <Th scope="col" className="dnb-table--sortable">
            <HeaderSortButton>Morningstar</HeaderSortButton>
          </Th>
          <Th scope="col" align="right" className="dnb-table--sortable">
            <HeaderSortButton>Handlekurv</HeaderSortButton>
          </Th>
        </Tr>
      </thead>

      <tbody>
        <ContentTr
          // open
          // noAnimation
          accordion={accordion}
        />

        {manyRows}
      </tbody>
    </>
  )
}

const HeaderSortButton = ({ children }) => {
  return (
    <Button
      variant="tertiary"
      icon="arrow-down"
      text={children}
      title="Sort table column"
      // wrap="true"
    />
  )
}

export const ResponsiveTable = () => {
  const [skeleton, setSkeleton] = React.useState(false)
  return (
    <main aria-label="main area">
      <h1 className="dnb-sr-only">responsive tables</h1>
      <ToggleButton
        size="small"
        on_change={() => {
          setSkeleton((s) => !s)
        }}
      >
        Toggle Skeleton
      </ToggleButton>

      <h2>cards</h2>

      <Table
        skeleton={skeleton}
        lang="no"
        top
        responsive
        responsiveVariant="cards"
      >
        <TableContent />
      </Table>

      <h2>lines</h2>

      <Table
        skeleton={skeleton}
        lang="no"
        top
        responsive
        responsiveVariant="lines"
      >
        <TableContent />
      </Table>

      <h2>accordion cards</h2>

      <Table
        skeleton={skeleton}
        lang="no"
        top
        responsive
        responsiveVariant="cards"
      >
        <TableContent accordion />
      </Table>

      <h2>accordion lines</h2>

      <Table
        skeleton={skeleton}
        lang="no"
        top
        responsive
        responsiveVariant="lines"
      >
        <TableContent accordion />
      </Table>
    </main>
  )
}
