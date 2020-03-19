/**
 * To showcase the usage of FormRow
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { Section, Button } from '../../src/components'
import { Table, P } from '../../src/elements'
import { StickyHelper } from '../../src/elements/Table'

import { createPagination } from '../../src/components/Pagination'

// NB: Second method
// import Pagination from '../../src/components/pagination/Pagination'

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

let { Pagination, setContent, resetItems } = createPagination()
setContent = { current: setContent }
resetItems = { current: resetItems }

export const InfinityPaginationTable = ({ tableItems, ...props }) => {
  const startupPage = 3 // what we start with
  const perPageCount = 10 // how many items per page

  const [currentPage, setCurrentPage] = React.useState(null)
  const [cacheHash, forceRerender] = React.useState(null) // eslint-disable-line

  // NB: Second method
  // const setContent = React.useRef(null)
  // const resetItems = React.useRef(null)

  const maxPagesCount = Math.floor(tableItems?.length / perPageCount)

  if (typeof setContent.current === 'function') {
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
        forceRerender(new Date().getTime())

        setHeight({ element, expanded: !item.expanded })
      }
    }

    // InfinityPagination basically limits the items
    const content = (
      <InfinityPagination
        items={tableItems}
        perPageCount={perPageCount}
        currentPage={currentPage}
        onToggleExpanded={onToggleExpanded}
        onMounted={items => {
          items.forEach(({ element: { current: element }, expanded }) => {
            setHeight({ element, expanded, animation: false })
          })
        }}
      />
    )

    setContent.current(currentPage, content)
  }

  return (
    <>
      <Button
        on_click={() => {
          resetItems.current && resetItems.current()

          // rerender our component to get back the default state
          forceRerender(new Date().getTime())
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
            // use_load_button
            marker_element="tr"
            fallback_element={({ className, ...props }) => (
              <TableRow className={className}>
                <TableData colSpan="2" {...props} />
              </TableRow>
            )} // in order to show the injected "indicator" and "load button" in the middle of the orw
            startup_count={1} // how many pages to show on starutp
            parallel_load_count={1} // how many pages to load during next load
            startup_page={startupPage} // the very first page we load
            // current_page={currentPage}// is not needed
            page_count={maxPagesCount}
            //
            // NB: Second method
            // set_content_handler={fn => (setContent.current = fn)}
            // reset_items_handler={fn => (resetItems.current = fn)}

            {...props}
            on_startup={({ page /*, setContent, resetItems */ }) => {
              console.log('on_startup: with page', page)

              // simulate server delay
              setTimeout(() => {
                // once we set current page, we force a rerender, and sync of data
                setCurrentPage(page)

                // since currentPage already is the same
                forceRerender(new Date().getTime())
              }, Math.ceil(Math.random() * 1e3)) // simulate random delay
            }}
            on_load={({ page /*, setContent, resetItems */ }) => {
              console.log('on_load: with page', page)

              // simulate server delay
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
  currentPage,
  perPageCount,
  onToggleExpanded,
  onMounted,
  ...props
}) => {
  const mountedItems = []
  React.useEffect(() => {
    if (onMounted) {
      onMounted(mountedItems)
    }
  }, [])
  return items
    .filter((cur, idx) => {
      const floor = (currentPage - 1) * perPageCount
      const ceil = floor + perPageCount
      return idx >= floor && idx < ceil
    })
    .map(item => {
      const params = {
        onClick: e => {
          onToggleExpanded(item, currentPage, e.currentTarget)
        }
      }
      const ref = React.useRef(null)
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

const setHeight = ({
  element,
  expanded = false,
  animation = true
} = {}) => {
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
    const newHeight = expanded
      ? window.getComputedStyle(element)['min-height'] // maxHeight
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
