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
        ></PaginationWithState>
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
        <InfinityPaginationStacked>
          {pageNo => <TdPage color="Gold">{pageNo}</TdPage>}
        </InfinityPaginationStacked>
      </Box>
      {/* <Box>
        <InfinityPaginationCached>
        {pageNo => <LargePage>{pageNo}</LargePage>}
      </InfinityPaginationCached>
    </Box> */}
    </Wrapper>
  )
]

const PaginationWithState = ({ children, ...props }) => {
  const [currentPage, setCurrentPage] = React.useState(1)

  return (
    <Pagination
      {...props}
      page_count={30}
      current_page={currentPage}
      on_change={({ page, insertContent }) => {
        console.log('PaginationWithState on_load:', page)
        setCurrentPage(page)

        setTimeout(() => {
          insertContent([page, children])
        }, 300)
      }}
    >
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

const InfinityPaginationStacked = ({ children, ...props }) => {
  const [pagesStack, updatePagesStack] = React.useState([])
  const resetItems = React.useRef(null)

  if (pagesStack.length > 0) {
    setTimeout(() => {
      const { page, insertContent } = pagesStack.shift()
      insertContent([page, children(page)])

      // NB: this is new here!
      updatePagesStack(pagesStack)
    }, 300)
  }

  return (
    <>
      <Button on_click={() => resetItems?.current()}>Reset</Button>
      <Table>
        <tbody>
          <Pagination
            mode="infinity"
            // page_element="tr"
            page_element={Element}
            page_count={20}
            accumulate_count={3} // NB: this is new here!
            reset_items_handler={fn => (resetItems.current = fn)} // NB: this is new here!
            {...props}
            on_load={({ page, insertContent }) => {
              console.log('InfinityPaginationStacked on_load:', page)

              // start getting new content
              updatePagesStack([...pagesStack, { page, insertContent }])
            }}
          >
            {/* just a child */}
          </Pagination>
        </tbody>
      </Table>
    </>
  )
}

// const Element = ({ children }) => <tr className="x">{children}</tr>
const Table = styled.table`
  width: 100%;
`
const Element = styled.tr`
  width: 100%;
  ${'' /* min-height: 5rem !important; */}
`
const TdPage = styled.td`
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

// const InfinityPaginationCached = ({ children, ...props }) => {
//   const [currentPage, setCurrentPage] = React.useState(3)
//   const [{ page, content }, setNewContent] = React.useState({})
//   const [pageCache, updatePageCache] = React.useState({})
//
//   if (typeof pageCache[page] === 'function') {
//     // here we do actually a state update during render, therefore we delay it one tick
//     setTimeout(() => pageCache[page]([page, content]), 0)
//   }
//
//   return (
//     <Pagination
//       mode="infinity"
//       page_count={5}
//       current_page={currentPage}
//       {...props}
//       on_load={({ page, insertContent }) => {
//         console.log('InfinityPagination on_load:', page)
//
//         // just to show case, we don't actually need to track the currentPage in here
//         setCurrentPage(page)
//
//         // has no content yet, but make everything ready
//         updatePageCache({ ...pageCache, ...{ [page]: insertContent } })
//
//         // start getting new content
//         setTimeout(() => {
//           setNewContent({ page, content: children(page) })
//         }, 300)
//       }}
//     >
//       {/* just a child */}
//     </Pagination>
//   )
// }
