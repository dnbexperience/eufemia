/**
 * To showcase the usage of FormRow
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
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

export const InfinityPaginationTable = ({ tableItems, ...props }) => {
  const current_page = 3 // what we start with
  const per_page_count = 10 // how many items per page

  const [currentPage, setCurrentPage] = React.useState(null)
  const [cacheHash, forceRerender] = React.useState(null) // eslint-disable-line

  // placeholders
  const setContent = React.useRef(null)
  const resetItems = React.useRef(null)

  // our items
  const updateItems = React.useRef(tableItems)
  const items = updateItems.current
  const maxPagesCount = Math.floor(items?.length / per_page_count)

  const updateContent = () => {
    if (setContent.current) {
      const onToggleExpanded = ({ ssn: _ssn }, current_page) => {
        const index = updateItems.current.findIndex(
          ({ ssn }) => ssn === _ssn
        )
        if (index > -1) {
          const item = updateItems.current[index]

          // update only the current item
          updateItems.current[index] = {
            ...item,
            expanded: !item.expanded
          }

          // make a copy to ensure correct rerender
          updateItems.current = [...updateItems.current]

          // define what page should update
          // used to update the page inside the Paginatio Component
          setCurrentPage(current_page)

          // force rerender of this component
          forceRerender(Math.random())
        }
      }

      const content = (
        <InfinityPagination
          items={items}
          per_page_count={per_page_count}
          current_page={currentPage}
          onToggleExpanded={onToggleExpanded}
        />
      )

      setContent.current(currentPage, content)
    }
  }

  // once currentPage get's changed during on_load
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
            parallel_load_count={2}
            // fallback_element="tr"
            fallback_element={TableRow} // can we a string like 'tr'
            current_page={current_page}
            page_count={maxPagesCount}
            {...props}
            on_load={({ page, ...rest }) => {
              setContent.current = rest.setContent
              resetItems.current = rest.resetItems

              // simulate delay
              setTimeout(() => {
                // once we set current page, we force a rerender, and sync of data
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
InfinityPaginationTable.propTypes = {
  tableItems: PropTypes.array.isRequired
}

const InfinityPagination = ({
  children,
  items,
  current_page,
  per_page_count,
  onToggleExpanded,
  ...props
}) => {
  return items
    .filter((cur, idx) => {
      const floor = (current_page - 1) * per_page_count
      const ceil = floor + per_page_count
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
