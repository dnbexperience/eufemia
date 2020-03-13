/**
 * To showcase the usage of FormRow
 *
 */

import React from 'react'
import styled from '@emotion/styled'

import { Section, Pagination, Button } from '../../src/components'
import { Table, P } from '../../src/elements'

export default [
  'PaginationTable',
  () => (
    <Wrapper className="dnb-core-style" spacing>
      <InfinityPaginationTable tableItems={tableItems} />
    </Wrapper>
  )
]

const tableItems = []
for (let i = 1; i <= 300; i++) {
  tableItems.push({ ssn: i, text: String(i), expanded: false })
}

const InfinityPaginationTable = ({ tableItems, ...props }) => {
  const [items, updateItems] = React.useState(tableItems)

  const current_page = 3
  const page_count = 5

  const [currentPage, setCurrentPage] = React.useState(null)

  const setContent = React.useRef(null)
  const resetItems = React.useRef(null)

  const onToggleExpanded = ({ ssn: nr }, current_page) => {
    const item = items.find(({ ssn }) => ssn === nr)
    if (item) {
      updateItems(
        items.map(cur => {
          if (cur.ssn === item.ssn) {
            cur = {
              ...item,
              expanded: !item.expanded
            }
          }
          return cur
        })
      )
      setCurrentPage(current_page)
    }
  }

  const updateContent = () => {
    (function(page) {
      const content = (
        <InfinityPagination
          items={items}
          page_count={page_count}
          current_page={page}
          onToggleExpanded={onToggleExpanded}
        />
      )

      setContent.current && setContent.current(currentPage, content)
      // setCurrentPage(page)
      // setTimeout(() => {
      // }, Math.ceil(Math.random() * 1e3)) // simulate random delay
    })(currentPage)
  }

  React.useEffect(updateContent, [currentPage, items])

  return (
    <>
      <Button
        on_click={() => {
          setCurrentPage(1) // only to make sure we call our sideeffect/useEffect
          resetItems.current && resetItems.current()
        }}
      >
        Reset
      </Button>
      <CustomTable>
        <tbody>
          <Pagination
            mode="infinity"
            // fallback_element="tr"
            fallback_element={TableRow}
            current_page={current_page}
            page_count={Math.floor(items.length / page_count)}
            accumulate_count={1}
            {...props}
            on_load={({ page, ...rest }) => {
              setContent.current = rest.setContent
              resetItems.current = rest.resetItems

              console.log('page', page, rest)

              // simulate delay
              setTimeout(() => {
                setCurrentPage(page)
              }, Math.ceil(Math.random() * 1e3)) // simulate random delay
            }}
          >
            {/* just a child */}
          </Pagination>
        </tbody>
      </CustomTable>
    </>
  )
}

const InfinityPagination = ({
  children,
  items,
  current_page,
  page_count,
  onToggleExpanded,
  ...props
}) => {
  return items
    .filter((cur, idx) => {
      const floor = (current_page - 1) * page_count
      const ceil = floor + page_count
      return idx >= floor && idx < ceil
    })
    .map(item => {
      const params = {
        onClick: () => {
          onToggleExpanded(item, current_page)
        }
      }
      return (
        <TableRow
          key={item.ssn}
          {...props}
          className={item.expanded ? 'expanded' : ''}
        >
          <TableData color="Gold" {...params}>
            <P>
              {item.text} {children}
              {item.expanded && <strong> I'm expanded!</strong>}
            </P>
          </TableData>
        </TableRow>
      )
    })
}

const CustomTable = styled(Table)``

const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &.expanded {
    background-color: hotpink !important;
  }
`

const TableData = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 6rem;

  .dnb-p {
    font-size: 2rem;
    font-weight: var(--font-weight-bold);
    font-feature-settings: 'pnum' on, 'lnum' on;

    strong {
      font-size: 1rem;
    }
  }
`

// Page layout
const Wrapper = styled(Section)`
  width: 100%;

  /* .dnb-pagination__page {
    min-height: 30rem;
  } */
`
