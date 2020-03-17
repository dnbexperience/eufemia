/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

// import { Button } from '../../src/components'
import Pagination from '../../src/components/pagination/Pagination'
import { InfinityPaginationTable } from './PaginationTable'

const LargePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 10rem;
  width: 100%;

  margin: 2rem 0;

  background-color: ${props => props.color || 'hotpink'};
  font-size: 10rem;
  font-weight: var(--font-weight-bold);
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: white;
`

const tableItems = []
for (let i = 1; i <= 300; i++) {
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
        <HeightLimit>
          <InfinityPagination use_load_button>
            {pageNo => <LargePage color="LightCoral">{pageNo}</LargePage>}
          </InfinityPagination>
        </HeightLimit>
      </Box>
      <Box>
        <HeightLimit>
          <InfinityPagination
            indicator_element={() => 'Loading ...'}
            current_page={2}
            page_count={3}
          >
            {pageNo => <LargePage color="Indigo">{pageNo}</LargePage>}
          </InfinityPagination>
        </HeightLimit>
      </Box>
      <Box>
        <HeightLimit>
          <InfinityPaginationTable tableItems={tableItems} />
        </HeightLimit>
      </Box>

      {/* <Box>
        <InfinityPaginationCached>
        {pageNo => <LargePage>{pageNo}</LargePage>}
      </InfinityPaginationCached>
    </Box> */}
    </Wrapper>
  )
]

const HeightLimit = styled.div`
  max-height: 20rem;
  overflow-y: scroll;
  background-color: white;
  border: 4px solid blue;
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
