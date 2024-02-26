/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import styled from '@emotion/styled'

import Table from '../Table'
import Td from '../TableTd'
import Th from '../TableTh'
import Tr, { TableTrProps } from '../TableTr'

import { P, Lead } from '../../..'
import { ToggleButton, NumberFormat, Avatar } from '../../'

type ContentTrAccordionProps = {
  expanded?: boolean
  disabled?: boolean
}

const ContentTrAccordion = ({
  expanded = false,
  disabled = false,
  ...rest
}: ContentTrAccordionProps & Partial<TableTrProps> = {}) => {
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

      <Tr.AccordionContent>
        <Td>a1</Td>
        <Td>a2</Td>
        <Td>a3</Td>
        <Td>a4</Td>
        <Td>a5</Td>
        <Td>a6</Td>
      </Tr.AccordionContent>

      <Tr.AccordionContent>
        <Td>b1</Td>
        <Td>b2</Td>
        <Td>b3</Td>
        <Td>b4</Td>
        <Td>b5</Td>
        <Td>b6</Td>
      </Tr.AccordionContent>

      <Tr.AccordionContent>
        <Td>b1</Td>
        <Td>b2</Td>
        <Td>b3</Td>
        <Td>b4</Td>
        <Td>b5</Td>
        <Td>b6</Td>
      </Tr.AccordionContent>
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

const TableAccordionRowContent = () => {
  const manyRows = []
  for (let i = 0; i < 2; i++) {
    manyRows.push(<ContentTrAccordion key={i} />)
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
        <ContentTrAccordion
        // variant="even"
        // disabled
        // expanded
        />

        {manyRows}
      </tbody>
    </>
  )
}

const TableAccordionRows = () => {
  const [skeleton, setSkeleton] = React.useState(false)
  return (
    <main aria-label="main area">
      <h1 className="dnb-sr-only">
        Table with accordion with multiple rows
      </h1>
      <ToggleButton
        bottom
        // size="small"
        on_change={() => {
          setSkeleton((s) => !s)
        }}
      >
        Toggle Skeleton
      </ToggleButton>

      <Table
        accordion
        skeleton={skeleton}
        outline
        border
        size="large"
        sticky
        // lang="no"
      >
        <TableAccordionRowContent />
      </Table>
    </main>
  )
}

export default TableAccordionRows
