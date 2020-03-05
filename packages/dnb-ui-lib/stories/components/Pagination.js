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

const PaginationWithState = ({ children }) => {
  const [currentPage, setCurrentPage] = React.useState(1)

  return (
    <Pagination
      page_count={30}
      current_page={currentPage}
      on_change={pageNo => {
        console.log('PaginationWithState on_change:', pageNo)
        setCurrentPage(pageNo)
      }}
    >
      {children}
    </Pagination>
  )
}
const InfinityPagination = ({ children }) => {
  // const [currentPage, setCurrentPage] = React.useState(1)

  return (
    <Pagination
      // page_count={30}
      // current_page={currentPage}
      on_change={pageNo => {
        console.log('InfinityPagination on_change:', pageNo)
        // setCurrentPage(pageNo)
      }}
    >
      {children}
    </Pagination>
  )
}

export default [
  'Pagination',
  () => (
    <Wrapper>
      <Box>
        <Pagination
          align="left"
          page_count={30}
          // current_page={2}
          on_change={pageNo => {
            console.log('on_change:', pageNo)
          }}
        ></Pagination>
      </Box>
      <Box>
        <PaginationWithState
          page_count={30}
          // current_page={2}
          on_change={pageNo => {
            console.log('on_change:', pageNo)
          }}
        ></PaginationWithState>
      </Box>
      <Box>
        <InfinityPagination
          enable_infinity_scroll
          on_change={pageNo => {
            console.log('on_change:', pageNo)
          }}
        >
          <LargePage>one</LargePage>
        </InfinityPagination>
      </Box>
    </Wrapper>
  )
]
