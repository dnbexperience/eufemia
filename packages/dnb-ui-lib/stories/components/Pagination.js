/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import { Button } from '../../src/components'
import Pagination from '../../src/components/pagination/Pagination'

const LargePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 30rem;
  width: 100%;

  margin: 2rem 0;

  background-color: ${props => props.color || 'hotpink'};
  font-size: 20rem;
  font-weight: var(--font-weight-bold);
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: white;
`

const tableItems = []
for (let i = 1; i <= 30; i++) {
  tableItems.push({ ssn: i, text: String(i), expanded: false })
}

export default [
  'Pagination',
  () => (
    <Wrapper>
      <Box>
        <Pagination
          page_count={30}
          current_page={15}
          on_change={pageNo => {
            console.log('on_change:', pageNo)
          }}
        ></Pagination>
      </Box>
      <Box>
        <PaginationWithState
          align="center"
          on_change={pageNo => {
            console.log('on_change:', pageNo)
          }}
        >
          {pageNo => <LargePage color="HotPink">{pageNo}</LargePage>}
        </PaginationWithState>
      </Box>

      <Box>
        <InfinityPagination use_load_button>
          {pageNo => <LargePage color="LightCoral">{pageNo}</LargePage>}
        </InfinityPagination>
      </Box>
      <Box>
        <InfinityPagination
          indicator_element={() => 'Loading ...'}
          current_page={2}
          page_count={3}
        >
          {pageNo => <LargePage color="Indigo">{pageNo}</LargePage>}
        </InfinityPagination>
      </Box>
      <Box>
        <InfinityPaginationTable tableItems={tableItems} />
      </Box>

      {/* <Box>
        <InfinityPaginationCached>
        {pageNo => <LargePage>{pageNo}</LargePage>}
      </InfinityPaginationCached>
    </Box> */}
    </Wrapper>
  )
]

// function TablePagination({ tableItems }) {
//   // const [items, updateItems] = React.useState(tableItems)
//   //
//   // const onToggleExpanded = nr => {
//   //   const item = items.find(({ ssn }) => ssn === nr)
//   //   updateItems(
//   //     items.map(cur => {
//   //       if (cur.ssn === item.ssn) {
//   //         cur = item
//   //       }
//   //       return cur
//   //     })
//   //   )
//   // }
//
//   return (
//     <InfinityPaginationTable
//
//     />
//   )
// }
// {
//   /* <TableContext.Provider
//   value={{
//     expandItem
//   }}
//   >
//   </TableContext.Provider> */
// }

const InfinityPaginationDesktop = ({
  children,
  items,
  current_page,
  page_count,
  onToggleExpanded,
  ...props
}) => {
  // const [expanded, setAsExpanded] = React.useState(false)
  return (
    // <TableContext.Consumer>
    //   {({ ssn, expanded, ...rest }) => {
    items
      .filter((cur, idx) => {
        const floor = (current_page - 1) * page_count
        const ceil = floor + page_count
        // console.log('idx', idx, floor, ceil)
        return idx >= floor && idx < ceil
      })
      .map(item => {
        const params = {
          onClick: () => {
            // console.log('onClick', expanded)
            // setAsExpanded(s => !s)
            onToggleExpanded(item, current_page)
          }
        }
        // console.log('rest', i, ssn, expanded, rest)
        return (
          <TableRow key={item.ssn} {...props}>
            <TableData color="Gold" {...params}>
              <details>
                <summary>
                  {item.text}
                  {children}
                </summary>
              </details>
              {item.expanded && <section>I'm expanded!</section>}
            </TableData>
          </TableRow>
        )
      })
    //   }}
    // </TableContext.Consumer>
  )
}

const InfinityPaginationTable = ({ tableItems, ...props }) => {
  const [items, updateItems] = React.useState(tableItems)

  const current_page = 3
  const page_count = 5
  // let current_page = items.findIndex(({ selected }) => selected)
  // if (current_page === -1) {
  //   current_page = 1
  // }

  const [currentPage, setCurrentPage] = React.useState(null)
  // console.log('currentPage', currentPage)

  // const [pagesStack, updatePagesStack] = React.useState([])
  const setContent = React.useRef(null)
  // const setItems = React.useRef(null)
  const resetItems = React.useRef(null)
  // const contentCache = React.useRef(null)

  const onToggleExpanded = ({ ssn: nr }, current_page) => {
    const item = items.find(({ ssn }) => ssn === nr)
    if (item) {
      // const olditems = items
      updateItems(
        items.map(cur => {
          if (cur.ssn === item.ssn) {
            cur = {
              ...item,
              // text: `${item.ssn} hello`,
              expanded: !item.expanded
            }
          }
          return cur
        })
      )
      setCurrentPage(current_page)
    }
  }

  // console.log('InfinityPaginationTable pagesStack:', pagesStack)
  // console.log('items', items)

  const updateContent = () => {
    const content = (
      <InfinityPaginationDesktop
        items={items}
        page_count={page_count}
        current_page={currentPage}
        onToggleExpanded={onToggleExpanded}
      />
    )
    // updateContent([page, content])
    setContent.current && setContent.current(currentPage, content)
  }
  // updateContent(currentPage)

  React.useEffect(updateContent, [currentPage, items])

  // setTimeout(() => {
  // }, 1)
  // setTimeout(() => {
  // if (contentCache.current !== content && pagesStack.length > 0) {
  // if (pagesStack.length > 0) {
  //   const { page, insertContent } = pagesStack.find(
  //     ({ page }) => page === currentPage
  //   ) //.shift()
  //
  //   // {
  //   //   pageNo => <Expand>{pageNo}</Expand>
  //   // }
  //
  //   // const item = items.find(({ ssn }) => ssn === nr)2
  //
  //   insertContent([page, content])
  //   updatePagesStack([...pagesStack])
  //
  //   // contentCache.current = content
  // }
  // }, Math.ceil(Math.random() * 2e3))

  return (
    <>
      <Button
        on_click={() => {
          setCurrentPage(1) // only to make sure we call our sideeffect/useEffect
          // updateItems([...items])
          resetItems.current && resetItems.current()
        }}
      >
        Reset
      </Button>
      <Table>
        <tbody>
          <Pagination
            // items={items.map(({ ssn }) => {
            //   return { content: ssn }
            // })}
            // items={[]}
            mode="infinity"
            // page_element={null}
            // page_element="tr"
            // page_element={TableRow}
            // fallback_element="tr"
            fallback_element={TableRow}
            // indicator_element={props => (
            //   <TableRow>
            //     <td {...props} />
            //   </TableRow>
            // )}
            // marker_element={React.forwardRef((props, ref) => (
            //   <TableRow ref={ref}>
            //     <td {...props} />
            //   </TableRow>
            // ))}
            // marker_element="tr"
            current_page={current_page}
            page_count={Math.floor(items.length / page_count)}
            // accumulate_count={3}
            // set_content_handler={fn => (setContent.current = fn)}
            // set_items_handler={fn => (setItems.current = fn)}
            // reset_items_handler={fn => (resetItems.current = fn)}
            {...props}
            on_load={({ page, ...rest }) => {
              setContent.current = rest.setContent
              resetItems.current = rest.resetItems
              // updatePagesStack([...pagesStack, { page, insertContent }])

              setTimeout(() => {
                setCurrentPage(page)
              }, Math.ceil(Math.random() * 1e3)) // simulate random delay
            }}
          >
            {/* just a child */}
          </Pagination>
        </tbody>
      </Table>
    </>
  )
}

const Table = styled.table`
  width: 100%;
`
const TableRow = styled.tr`
  ${'' /* min-height: 3rem; */}
  background-color: blue;
  color: white;
`
const TableData = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 6rem;
  ${'' /* width: 100%; */}

  ${'' /* margin: 2rem 0; */}

  background-color: ${props => props.color || 'hotpink'};

  details {
    display: block;
  }
  summary {
    font-size: 2rem;
    font-weight: var(--font-weight-bold);
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: white;
  }
  section {
    display: block;
  }
`

const PaginationWithState = ({ children, ...props }) => {
  const [currentPage, setCurrentPage] = React.useState(1)

  return (
    <Pagination
      {...props}
      page_count={30}
      current_page={currentPage}
      // on_load={({ page, insertContent }) => {
      //   console.log('PaginationWithState on_load:', page)
      //   // setCurrentPage(page)
      //
      //   setTimeout(() => {
      //     insertContent([page, children(page)])
      //   }, 300)
      // }}
      on_change={({ page }) => {
        console.log('PaginationWithState on_change:', page)
        setCurrentPage(page)

        // setTimeout(() => {
        //   insertContent([page, children(page)])
        // }, 300)
      }}
    >
      {({ page, insertContent }) => {
        setTimeout(() => {
          insertContent([page, children(page)])
        }, 300)
      }}
      {/* <Pagination.Content>Content</Pagination.Content>
      <Pagination.Bar
        on_change={({ page }) => {
          setCurrentPage(page)
        }}
      /> */}
      {/* just a child */}
    </Pagination>
  )
}

const InfinityPagination = ({ children, ...props }) => {
  // const [currentPage, setCurrentPage] = React.useState(1)
  // console.log('children', children)
  return (
    <Pagination
      mode="infinity"
      // hide_progress_indicator
      // page_count={30}
      // current_page={currentPage}
      // current_page={10}
      {...props}
      on_load={({ page, insertContent }) => {
        console.log('InfinityPagination on_load:', page)
        // setCurrentPage(page)

        setTimeout(() => {
          insertContent([page, children(page)])
        }, 300)
      }}
    >
      {/* just a child */}
    </Pagination>
  )
}
