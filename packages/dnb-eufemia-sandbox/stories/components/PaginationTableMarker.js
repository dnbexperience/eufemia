/**
 * To showcase the Pagination in combination with a Table
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { Section, Space, Button } from '@dnb/eufemia/src/components'
import { Table, H1, P, Ul } from '@dnb/eufemia/src/elements'
import { StickyHelper } from '@dnb/eufemia/src/elements/Table'
import { hasSelectedText } from '@dnb/eufemia/src/shared/helpers'

import { createPagination } from '@dnb/eufemia/src/components/Pagination'

export default {
  title: 'Eufemia/Components/Pagination-TableMarker',
}

export const PaginationTableMarker = () => (
  <Wrapper className="dnb-core-style" spacing>
    <Space left>
      <H1 size="small">Infinity Table</H1>
      <P bottom>
        This is a semantic correct table using infinity scrolling. It also
        has a sticky header.
      </P>
      <Ul bottom>
        <li>The startup page number is set to 3.</li>
        <li>And per page we show 10 items.</li>
        <li>
          A random delay is added to simulate asynchronous interaction.
        </li>
      </Ul>
    </Space>
    <InfinityPaginationTable tableItems={tableItems} />
  </Wrapper>
)

// create our items
const tableItems = []
for (let i = 1; i <= 60; i++) {
  tableItems.push({ ssn: i, text: String(i), expanded: false })
}

export const InfinityPaginationTable = ({ tableItems, ...props }) => {
  const startupPage = 3 // what we start with
  const perPageCount = 10 // how many items per page

  // create our Pagination instance
  const [{ InfinityMarker, endInfinity, resetInfinity }] = React.useState(
    createPagination
  )
  const [orderDirection, setOrderDirection] = React.useState('asc')
  const [cacheHash, forceRerender] = React.useState(null) // eslint-disable-line
  const [currentPage, setCurrentPage] = React.useState(startupPage)
  const localStack = React.useRef({})

  // ascending / descending
  tableItems = reorderDirection(tableItems, orderDirection)

  // fill the stack as we go
  tableItems
    .filter((cur, idx) => {
      const floor = (currentPage - 1) * perPageCount
      const ceil = floor + perPageCount
      return idx >= floor && idx < ceil
    })
    .forEach((item) => {
      localStack.current[item.ssn] = item
    })

  let items = Object.values(localStack.current)
  items = reorderDirection(items, orderDirection)

  const onToggleExpanded = ({ ssn: _ssn }, pageNumber, element = null) => {
    const index = tableItems.findIndex(({ ssn }) => ssn === _ssn)
    if (index > -1) {
      const item = tableItems[index]

      // update only the current item
      tableItems[index] = {
        ...item,
        expanded: !item.expanded,
      }
      localStack.current[item.ssn] = tableItems[index]

      // force rerender of this component
      forceRerender(new Date().getTime())

      // set new height
      setHeight({ element, expanded: !item.expanded })
    }
  }
  // set the startup height
  const onMounted = (items) => {
    items.forEach(({ element: { current: element }, expanded }) =>
      setHeight({ element, expanded, animation: false })
    )
  }

  let serverDelayTimeout
  React.useEffect(() => () => clearTimeout(serverDelayTimeout))
  const resetHandler = () => {
    clearTimeout(serverDelayTimeout)
    localStack.current = {}
    setCurrentPage(startupPage)
    resetInfinity()
  }

  return (
    <StyledTable sticky>
      <thead>
        <tr>
          <th scope="col">
            <Button
              size="small"
              icon="reset"
              icon_position="left"
              variant="secondary"
              on_click={() => {
                resetHandler()

                // rerender our component to get back the default state
                setOrderDirection('asc')

                // call this, because currentPage and orderDirection could be the same
                forceRerender(new Date().getTime())
              }}
            >
              Reset everything
            </Button>
          </th>
          <th
            scope="col"
            className={`dnb-table--sortable dnb-table--active ${
              orderDirection === 'desc' ? ' dnb-table--reversed' : ''
            }`}
          >
            <Button
              variant="tertiary"
              icon="arrow-down"
              text="Sortable"
              title="Sort table row"
              on_click={() => {
                resetHandler()

                setOrderDirection((o) => (o === 'asc' ? 'desc' : 'asc'))
              }}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <StickyHelper />
        <InfinityMarker
          marker_element="tr"
          fallback_element={({ className, ...props }) => (
            <TableRow className={className}>
              <TableData colSpan="2" {...props} />
            </TableRow>
          )} // in order to show the injected "indicator" and "load button" in the middle of the orw
          // startup_page={startupPage} // is not needed
          startup_count={2}
          current_page={currentPage} // Mandatory!
          // page_count={maxPagesCount}// is not needed
          // page_count={4} // is not needed
          {...props}
          // on_startup={({ page }) => {
          //   console.log('on_startup: with page', page)
          // }}
          on_load={({ page }) => {
            console.log('on_load: with page', page)

            if (page > tableItems.length / perPageCount) {
              endInfinity()
            } else {
              // simulate server delay
              clearTimeout(serverDelayTimeout)
              serverDelayTimeout = setTimeout(() => {
                // once we set current page, we force a rerender, and sync of data
                setCurrentPage(page)
              }, Math.ceil(Math.random() * 1e3)) // simulate random delay
            }
          }}
          on_end={({ page }) => {
            console.log('on_end: with page', page)
          }}
        >
          <InfinityPagination
            items={items}
            currentPage={currentPage}
            onToggleExpanded={onToggleExpanded}
            onMounted={onMounted}
          />
        </InfinityMarker>
      </tbody>
    </StyledTable>
  )
}
InfinityPaginationTable.propTypes = {
  tableItems: PropTypes.array.isRequired,
}

const InfinityPagination = ({
  children,
  items,
  currentPage,
  onToggleExpanded,
  onMounted,
  ...props
}) => {
  const mountedItems = []
  React.useEffect(() => onMounted && onMounted(mountedItems), []) // eslint-disable-line

  return items.map((item) => {
    const params = {
      onClick: (e) => {
        if (!hasSelectedText(e.currentTarget)) {
          onToggleExpanded(item, currentPage, e.currentTarget)
        }
      },
    }
    const ref = React.createRef(null)
    mountedItems.push({ ...item, element: ref })

    return (
      <TableRow
        key={item.ssn}
        {...props}
        ref={ref}
        className={item.expanded ? 'expanded' : ''}
      >
        <TableData {...params}>
          <Button
            title={item.expanded ? 'Hide details' : 'Show more details'}
            icon="chevron_down"
            size="small"
            right="large"
          />
          {item.expanded && <span>I'm expanded!</span>}
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
      transform: rotate(-180deg);
    }
  }

  /** This is our expanded height (maxHeight)
      NB: we can use max-height, because max-height is not supported in tr
  */
  max-height: 10rem;
  transition: height 0.4s ease-out;
`

const TableData = styled.td`
  tr:not(.expanded) & {
    cursor: pointer;
  }

  .dnb-pagination__loadbar {
    justify-content: flex-start;
  }
  .dnb-pagination__indicator,
  .dnb-pagination__loadbar {
    height: 6rem;
  }

  .dnb-p {
    cursor: text;

    font-feature-settings: 'pnum' on, 'lnum' on;
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-large);

    /** reset css specificity */
    .dnb-spacing &.dnb-h--large:not([class*='space__bottom']),
    .dnb-core-style
      .dnb-spacing
      &.dnb-h--large:not([class*='space__bottom']) {
      margin: 0;
    }
  }
`

const setHeight = ({
  element,
  expanded = false,
  animation = true,
} = {}) => {
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
    const newHeight = expanded
      ? window.getComputedStyle(element)['max-height'] // maxHeight
      : element.scrollHeight

    // make the animation
    window.requestAnimationFrame(() => {
      if (animation) {
        element.style.height = '1px'
      }
      window.requestAnimationFrame(
        () => (element.style.height = newHeight)
      )
    })
  }
}

const reorderDirection = (items, dir) =>
  items.sort(({ text: A }, { text: B }) => {
    const a = parseFloat(A)
    const b = parseFloat(B)
    return (dir === 'asc' ? a > b : a < b) ? 1 : -1
  })

// Page layout
const Wrapper = styled(Section)`
  width: 100%;
  background: var(--color-white);
`
