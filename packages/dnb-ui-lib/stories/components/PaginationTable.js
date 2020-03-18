/**
 * To showcase the usage of FormRow
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { Section, Pagination, Button } from '../../src/components'
import { Table, P } from '../../src/elements'
import { StickyHelper } from '../../src/elements/Table'

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

  // const [pagesStack, setPagesStack] = React.useState({})
  const [currentPage, setCurrentPage] = React.useState(null)
  const [cacheHash, forceRerender] = React.useState(null) // eslint-disable-line

  // placeholders
  const setContent = React.useRef(null)
  const resetItems = React.useRef(null)
  const maxPagesCount = Math.floor(tableItems?.length / per_page_count)

  const updateContent = () => {
    if (setContent.current) {
      const onToggleExpanded = ({ ssn: _ssn }, pageNo, element = null) => {
        const index = tableItems.findIndex(({ ssn }) => ssn === _ssn)
        if (index > -1) {
          const item = tableItems[index]

          // update only the current item
          tableItems[index] = {
            ...item,
            expanded: !item.expanded
          }

          // define what page should update
          // used to update the page inside the Paginatio Component
          setCurrentPage(pageNo)

          // force rerender of this component
          forceRerender(Math.random())

          // set new height
          if (
            element &&
            typeof window !== 'undefined' &&
            window.requestAnimationFrame
          ) {
            // get tr element
            if (String(element.nodeName).toLowerCase() === 'td') {
              element = element.parentElement
            }

            // get the new height
            const newHeight = !item.expanded
              ? window.getComputedStyle(element)['min-height'] // maxHeight
              : element.scrollHeight

            // make the animation
            window.requestAnimationFrame(() => {
              element.style.height = '1px'
              window.requestAnimationFrame(
                () => (element.style.height = newHeight)
              )
            })
          }
        }
      }

      // InfinityPagination basically limits the items
      const content = (
        <InfinityPagination
          items={tableItems}
          per_page_count={per_page_count}
          current_page={currentPage}
          onToggleExpanded={onToggleExpanded}
        />
      )

      setContent.current(currentPage, content)
    }
  }

  // once currentPage get's changed during on_load
  React.useEffect(updateContent, [currentPage, cacheHash])

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

      <StyledTable sticky>
        <thead>
          <tr>
            <th scope="col">Header One</th>
            <th scope="col">Header Two</th>
          </tr>
        </thead>
        <tbody>
          <StickyHelper />
          <Pagination
            mode="infinity"
            parallel_load_count={2}
            // use_load_button
            marker_element="tr"
            fallback_element={({ className, ...props }) => (
              <TableRow className={className}>
                <TableData colSpan="2" {...props} />
              </TableRow>
            )} // can we a string like 'tr'
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
          />
        </tbody>
      </StyledTable>
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
        onClick: e => {
          onToggleExpanded(item, current_page, e.currentTarget)
        }
      }
      return (
        <TableRow
          key={item.ssn}
          {...props}
          className={item.expanded ? 'expanded' : ''}
        >
          <TableData {...params}>
            <Button
              title={item.expanded ? 'Hide details' : 'Show more details'}
              icon="chevron_down"
              size="small"
              right
            />
            {item.expanded && <strong> I'm expanded!</strong>}
          </TableData>
          <TableData {...params}>
            <P>
              {item.text} {children}
            </P>
          </TableData>
        </TableRow>
      )
    })
}

const StyledTable = styled(Table)`
  table-layout: fixed;
`

const TableRow = styled.tr`
  &:hover {
    opacity: 0.8;
  }
  .dnb-icon {
    transition: transform 300ms ease-out;
  }

  &.expanded {
    .dnb-icon {
      ${'' /* transform: scale(-1); */}
      transform: rotate(-180deg);
    }
  }

  /** This is our expanded height (maxHeight) */
  /** NB: we can use min-height, because min-height is not supported in tr */
  min-height: 10rem;
  transition: height 0.4s ease-out;
`

const TableData = styled.td`
  cursor: pointer;

  .dnb-pagination__loadbar {
    justify-content: flex-start;
  }

  .dnb-p {
    font-size: 2rem;
    font-weight: var(--font-weight-bold);
    font-feature-settings: 'pnum' on, 'lnum' on;
  }
`

// Page layout
const Wrapper = styled(Section)`
  width: 100%;
`
