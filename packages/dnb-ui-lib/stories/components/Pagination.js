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

  height: 15vw;

  background-color: ${props => props.color || 'hotpink'};
  font-size: 15vw;
  font-weight: var(--font-weight-bold);
  font-feature-settings: 'pnum' on, 'lnum' on;

  color: white;
`
const CustomIndicator = styled(LargePage)`
  color: purple;
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
        >
          {({ pageNo }) => <div>Page {pageNo}</div>}
        </Pagination>
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
          <InfinityPagination use_load_button current_page={5}>
            {(pageNo, ref) => (
              <LargePage ref={ref} color="LightCoral">
                {pageNo}
              </LargePage>
            )}
          </InfinityPagination>
        </HeightLimit>
      </Box>
      <Box>
        <HeightLimit>
          <InfinityPagination
            indicator_element={() => (
              <CustomIndicator>Loading ...</CustomIndicator>
            )}
            current_page={2}
            page_count={20}
          >
            {(pageNo, ref) => (
              <LargePage ref={ref} color="Indigo">
                {pageNo}
              </LargePage>
            )}
          </InfinityPagination>
        </HeightLimit>
      </Box>
      <Box>
        <HeightLimit>
          <InfinityPaginationTable tableItems={tableItems} />
        </HeightLimit>
      </Box>
    </Wrapper>
  )
]

const HeightLimit = styled.div`
  height: 20rem;
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
      // page_element="div"
      // fallback_element="div"
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
