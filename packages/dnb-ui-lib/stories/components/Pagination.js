/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

// import { Button } from '../../src/components'
import Pagination, {
  createPagination
} from '../../src/components/pagination/Pagination'
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
          <InfinityPagination use_load_button startup_page={5}>
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
            startup_page={2}
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

const {
  Pagination: PaginationInstance,
  setPage,
  resetContent
} = createPagination()

// eslint-disable-next-line
const PaginationWithState = ({ children, ...props }) => {
  const [currentPage, setCurrentPage] = React.useState(1)

  setPage(currentPage, children(currentPage))

  // will reset the pagination
  if (currentPage == 30) {
    setTimeout(() => {
      resetContent()
      setCurrentPage(1)
    }, 1)
  }

  return (
    <PaginationInstance
      {...props}
      page_count={30}
      current_page={currentPage}
      on_change={({ page }) => {
        console.log('PaginationWithState on_change:', page)
        setCurrentPage(page)

        // setTimeout(() => {
        //   setPage(page, children(page))
        // }, Math.ceil(Math.random() * 1e3))
      }}
    >
      {/* {({ page, setPage }) => {
        setTimeout(() => {
          setPage(page, children(page))
        }, Math.ceil(Math.random() * 1e3))
      }} */}
    </PaginationInstance>
  )
}

// eslint-disable-next-line
const InfinityPagination = ({ children, ...props }) => {
  return (
    <Pagination
      mode="infinity"
      {...props}
      on_load={({ page, setPage }) => {
        console.log('InfinityPagination on_load:', page)

        setTimeout(() => {
          setPage(page, children(page))
        }, Math.ceil(Math.random() * 1e3))
      }}
    >
      {/* just a child */}
    </Pagination>
  )
}
