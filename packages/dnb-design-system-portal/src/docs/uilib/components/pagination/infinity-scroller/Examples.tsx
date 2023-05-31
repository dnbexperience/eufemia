/**
 * UI lib Component Example
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import styled from '@emotion/styled'

import { Section, Space, Button } from '@dnb/eufemia/src/components'
import { H1, P, Ul } from '@dnb/eufemia/src/elements'
import Table from '@dnb/eufemia/src/components/Table'
import { hasSelectedText } from '@dnb/eufemia/src/shared/helpers'

import { createPagination } from '@dnb/eufemia/src/components/Pagination'

import { Pagination } from '@dnb/eufemia/src'

const HeightLimit = styled.div`
  height: ${(props) => props.height || '20rem'};
  overflow-y: scroll;
  background-color: var(--color-white);
  border: 0.25rem dotted var(--color-black);
`
const LargePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 15vw;

  background-color: ${(props) => props.color || 'tomato'};
  font-size: 15vw;
  font-weight: var(--font-weight-bold);
  font-feature-settings: 'pnum' on, 'lnum' on;

  color: var(--color-white);
`

export const PaginationExampleInfinityLoadButton = () => (
  <ComponentBox scope={{ HeightLimit, LargePage }}>
    <HeightLimit>
      <Pagination
        mode="infinity"
        use_load_button
        startup_page={5}
        min_wait_time={0}
        on_load={({ page, setContent }) => {
          // simulate server communication delay
          const timeout = setTimeout(() => {
            setContent(page, <LargePage>{page}</LargePage>)
          }, Math.ceil(Math.random() * 500))

          return () => clearTimeout(timeout)
        }}
      />
    </HeightLimit>
  </ComponentBox>
)

export const PaginationExampleInfinityIndicator = () => (
  <ComponentBox scope={{ HeightLimit, LargePage }}>
    <HeightLimit>
      <Pagination
        mode="infinity"
        indicator_element={() => (
          <LargePage color="lightgreen">Loading ...</LargePage>
        )}
        startup_page={3}
        page_count={10}
        min_wait_time={0}
        on_load={({ page, setContent }) => {
          // simulate server communication delay
          const timeout = setTimeout(() => {
            setContent(page, <LargePage>{page}</LargePage>)
          }, Math.ceil(Math.random() * 500))

          return () => clearTimeout(timeout)
        }}
        on_end={({ page, setContent }) => {
          setContent(page, <LargePage color="lightgreen">End</LargePage>)
        }}
      />
    </HeightLimit>
  </ComponentBox>
)

export const PaginationExampleInfinityUnknown = () => (
  <ComponentBox scope={{ HeightLimit, LargePage }}>
    <HeightLimit>
      <Pagination
        mode="infinity"
        parallel_load_count={2}
        min_wait_time={0}
        on_load={({ page, setContent, endInfinity }) => {
          // simulate server communication delay
          const timeout = setTimeout(() => {
            if (page > 10) {
              endInfinity()
            } else {
              setContent(page, <LargePage>{page}</LargePage>)
            }
          }, Math.ceil(Math.random() * 1e3))

          return () => clearTimeout(timeout)
        }}
        on_end={({ page, setContent }) => {
          setContent(page, <LargePage color="lightgreen">End</LargePage>)
        }}
      />
    </HeightLimit>
  </ComponentBox>
)

export const PaginationExampleInfinityTable = () => (
  <ComponentBox scope={{ HeightLimit, PaginationTableExample }}>
    <HeightLimit height="60rem">
      <PaginationTableExample />
    </HeightLimit>
  </ComponentBox>
)

export function PaginationTableExample() {
  return (
    <Wrapper className="dnb-core-style" spacing>
      <Space left>
        <H1 size="small">Infinity Table</H1>
        <P bottom>
          This is a semantic correct table using infinity scrolling. It
          also has a sticky header.
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
}

// create our items
const tableItems = []
for (let i = 1; i <= 300; i++) {
  tableItems.push({ ssn: i, text: String(i), expanded: false })
}

export const InfinityPaginationTable = ({ tableItems, ...props }) => {
  const startupPage = 3 // what we start with
  const perPageCount = 10 // how many items per page
  const maxPagesCount = Math.floor(tableItems?.length / perPageCount)

  // create our Pagination instance
  const [
    { Pagination, setContent, resetContent, resetInfinity, endInfinity },
  ] = React.useState(createPagination)
  const [orderDirection, setOrderDirection] = React.useState('asc')
  const [currentPage, setLocalPage] = React.useState(null)
  const [cacheHash, forceRerender] = React.useState(null) // eslint-disable-line

  React.useEffect(() => {
    // Could also be set as "startup_page" in <Pagination startup_page={startupPage} ...>
    setLocalPage(startupPage)
  }, [])

  // ascending / descending
  tableItems = reorderDirection(tableItems, orderDirection)

  const onToggleExpanded = (
    { ssn: _ssn },
    { pageNumber, element = null, onExpanded = null } = {}
  ) => {
    const index = tableItems.findIndex(({ ssn }) => ssn === _ssn)
    if (index > -1) {
      const item = tableItems[index]

      // update only the current item
      tableItems[index] = {
        ...item,
        expanded: !item.expanded,
      }

      // define what page should update
      // used to update the page inside the Pagination Component
      setLocalPage(pageNumber)

      // force re-render of this component
      forceRerender(new Date().getTime())

      // set new height
      if (element) {
        setHeight({ element, expanded: !item.expanded })
      }

      setTimeout(onExpanded, 10)
    }
  }
  // set the startup height
  const onMounted = (items) => {
    items.forEach(({ element: { current: element }, expanded }) =>
      setHeight({ element, expanded, animation: false })
    )
  }

  // This limits the items to perPageCount
  const content = (
    <InfinityPagination
      items={tableItems}
      perPageCount={perPageCount}
      currentPage={currentPage}
      onToggleExpanded={onToggleExpanded}
      onMounted={onMounted}
      endInfinity={endInfinity}
    />
  )

  setContent(currentPage, content)
  let serverDelayTimeout
  React.useEffect(() => () => clearTimeout(serverDelayTimeout))

  const action = ({ page }) => {
    console.log('on_change: with page', page)

    // simulate server delay
    clearTimeout(serverDelayTimeout)
    serverDelayTimeout = setTimeout(() => {
      if (page === currentPage) {
        // once we set current page, we force a re-render, and sync of data
        // but only if we are on the same page
        forceRerender(new Date().getTime())
      } else {
        setLocalPage(page)
      }
    }, Math.ceil(Math.random() * 1e3)) // simulate random delay
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
                clearTimeout(serverDelayTimeout) // stop the server delay simulation

                resetInfinity()
                resetContent()

                // re-render our component to get back the default state
                setOrderDirection('asc')

                // re-render our component to get back the default state
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
                // 1. empty
                resetContent()

                setOrderDirection((o) => (o === 'asc' ? 'desc' : 'asc'))
              }}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <Pagination
          mode="infinity"
          // use_load_button // disables infinity scroller, but will add a button to do so
          marker_element="tr"
          fallback_element={({ className, ...props }) => (
            <TableRow className={className}>
              <TableData colSpan="2" {...props} />
            </TableRow>
          )} // in order to show the injected "indicator" and "load button" in the middle of the row
          current_page={currentPage}
          page_count={maxPagesCount}
          {...props}
          on_startup={action}
          on_change={action}
        />
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
  perPageCount,
  onToggleExpanded,
  onMounted,
  endInfinity,
  ...props
}) => {
  const mountedItems = []
  if (onMounted) {
    React.useEffect(() => onMounted && onMounted(mountedItems), []) // eslint-disable-line
  }

  items = items.filter((cur, idx) => {
    const floor = (currentPage - 1) * perPageCount
    const ceil = floor + perPageCount
    return idx >= floor && idx < ceil
  })

  if (items.length === 0) {
    endInfinity()
    return null
  }

  return items.map((item, i) => {
    const params = {
      onClick: (e) => {
        if (
          !hasSelectedText(e.currentTarget) ||
          /button/.test(document.activeElement.type)
        ) {
          let element = e.currentTarget
          onToggleExpanded(item, {
            pageNumber: currentPage,
            // element,
            onExpanded: () => {
              try {
                // rather find the next tr
                element = element.nextElementSibling
                setHeight({ element, expanded: !item.expanded })
                element.focus() // for better ally we set the focus to the new content
              } catch (e) {
                //
              }
            },
          })
        }
      },
    }

    // we do this only to have a working useEffect, so we can call onMounted
    const trRef = React.createRef(null)
    mountedItems.push({ ...item, element: trRef })

    return (
      <React.Fragment key={item.ssn}>
        <TableRow
          {...props}
          {...params}
          className={`dnb-table--${i % 2 ? 'even' : 'odd'} ${
            item.expanded ? 'expanded' : ''
          }`}
          ref={trRef}
        >
          <TableData>
            {/* The button "bubbles" the event just down */}
            <Button
              title={item.expanded ? 'Hide details' : 'Show more details'}
              icon="chevron_down"
              size="small"
              right="large"
            />
          </TableData>
          <TableData>
            <P>
              {item.text} {children}
            </P>
          </TableData>
        </TableRow>

        <TableRow
          className={`expanded-content dnb-no-focus ${
            item.expanded ? 'expanded' : ''
          }`}
          tabIndex="-1"
        >
          <TableData colSpan="2">
            {item.expanded && (
              <div className="expanded-content__outer">
                <div className="expanded-content__inner">
                  <P>What ever content ...</P>
                  <Button variant="secondary" top>
                    {'🔥'}
                  </Button>
                </div>
              </div>
            )}
          </TableData>
        </TableRow>
      </React.Fragment>
    )
  })
}

const StyledTable = styled(Table)`
  table-layout: fixed;
`

const TableRow = styled.tr`
  &:not(.expanded-content):hover {
    cursor: pointer;
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

  &.expanded-content {
    /*
      This is our expanded height (maxHeight)
      NB: we can use max-height, because max-height is not supported in tr
    */
    max-height: 10rem;

    transform: translateY(-10px);
    opacity: 0;

    transition: height 400ms ease-out, opacity 600ms ease-out,
      transform 400ms ease-out;

    td {
      height: inherit;
      padding: 0;
      background-color: var(--color-white);

      .expanded-content__outer {
        height: inherit;
      }

      /* If we don't wrapp with an additional inner, then we get a jump in the animation */
      .expanded-content__inner {
        height: inherit;
        padding: 2rem 0 2rem 3rem;

        background-color: tomato;
      }
    }
  }
  &.expanded.expanded-content {
    opacity: 1;
    transform: translateY(0);
  }
`

const TableData = styled.td`
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
