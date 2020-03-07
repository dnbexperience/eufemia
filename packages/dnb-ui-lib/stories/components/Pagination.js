/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

// import { Pagination } from '../../src/components'
import Pagination from '../../src/components/pagination/Pagination'

const LargePage = styled.div`
  height: 60rem;
  width: 100%;
  background-color: hotpink;
  margin: 2rem 0;
`

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
        }, 10)
      }}
    >
      just a child
    </Pagination>
  )
}
const InfinityPagination = ({ children, ...props }) => {
  // const [currentPage, setCurrentPage] = React.useState(1)
  // console.log('children', children)
  return (
    <Pagination
      enable_infinity_scroll
      show_progress_indicator
      // page_count={30}
      // current_page={currentPage}
      // current_page={10}
      {...props}
      on_load={({ page, insertContent }) => {
        console.log('InfinityPagination on_load:', page)
        // setCurrentPage(page)

        setTimeout(() => {
          insertContent([page, children(page)])
        }, 1)
      }}
    >
      just a child
    </Pagination>
  )
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
        ></PaginationWithState>
      </Box>
      <Box>
        <InfinityPagination
          use_load_button
          // page_count={3}
          on_load={pageNo => {
            console.log('on_load:', pageNo)
          }}
        >
          {pageNo => <LargePage>{pageNo}</LargePage>}
        </InfinityPagination>
      </Box>
      <Box>
        <InfinityPagination
          on_load={pageNo => {
            console.log('on_load:', pageNo)
          }}
        >
          {pageNo => <LargePage>{pageNo}</LargePage>}
        </InfinityPagination>
      </Box>
    </Wrapper>
  )
]
