/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import { P } from '../../../elements'
import { Button, Section } from '../../'
import Pagination, {
  createPagination,
  Bar,
} from '../../pagination/Pagination'

export default {
  title: 'Eufemia/Components/Pagination',
}

const LargePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 15vw;

  background-color: ${(props) => props.color || 'hotpink'};
  font-size: 15vw;
  font-weight: var(--font-weight-bold);
  font-feature-settings: 'pnum' on, 'lnum' on;

  color: var(--color-white);
`
const CustomIndicator = styled(LargePage)`
  color: purple;
`

const tableItems = []
for (let i = 1; i <= 300; i++) {
  tableItems.push({ ssn: i, text: String(i), expanded: false })
}

export const InfinitySandbox = () => {
  const props = {
    current_page: 3,
    // page_count: 30,
  }

  const action = ({ pageNumber, setContent }) => {
    console.log('pageNumber', pageNumber)
    setTimeout(() => {
      setContent(
        pageNumber,
        <LargePage color="lightgreen">{pageNumber}</LargePage>
      )
    }, 100)
  }

  return (
    <Pagination
      mode="infinity"
      {...props}
      on_startup={action}
      on_change={action}
    />
  )
}

export const PaginationNoChildren = () => (
  <Wrapper>
    <Bar
      page_count={10}
      currentPage={2}
      on_change={(page) => {
        console.log(page)
      }}
    />
    <Box>
      <Bar
        page_count={10}
        currentPage={2}
        on_change={(page) => {
          console.log(page)
        }}
        align="right"
      />
    </Box>
    <Box>
      <Bar
        page_count={10}
        currentPage={2}
        on_change={(page) => {
          console.log(page)
        }}
        align="left"
      />
    </Box>
    <Box>
      <Bar
        page_count={10}
        currentPage={2}
        on_change={(page) => {
          console.log(page)
        }}
        align="center"
      />
    </Box>
    <Bar
      page_count={3}
      currentPage={2}
      on_change={(page) => {
        console.log(page)
      }}
    />
  </Wrapper>
)

export const PaginationSandbox = () => (
  <Wrapper>
    <Box>
      <PaginationRender />
    </Box>
    <Box>
      <Pagination
        page_count={10}
        currentPage={2}
        on_change={(page) => {
          console.log(page)
        }}
      />
    </Box>
    <Box>
      <Pagination page_count={2}>
        {({ page, setContent }) => {
          // simulate server communication delay
          const timeout = setTimeout(() => {
            setContent(page, <LargePage>{page}</LargePage>)
          }, Math.ceil(Math.random() * 500))

          return () => clearTimeout(timeout)
        }}
      </Pagination>
    </Box>

    <Box>
      <Pagination
        page_count={30}
        startup_page={15}
        on_change={(pageNumber) => {
          console.log('on_change:', pageNumber)
        }}
      >
        {({ pageNumber }) => <P>Page {pageNumber}</P>}
      </Pagination>
    </Box>

    <Box>
      <PaginationWithState
        align="center"
        on_change={(pageNumber) => {
          console.log('on_change:', pageNumber)
        }}
      >
        {(pageNumber) => (
          <LargePage color="HotPink">{pageNumber}</LargePage>
        )}
      </PaginationWithState>
    </Box>

    <Box>
      <HeightLimit>
        <InfinityPagination use_load_button startup_page={5}>
          {(pageNumber, ref) => (
            <LargePage ref={ref} color="LightCoral">
              {pageNumber}
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
          startup_page={3}
          page_count={10}
          min_wait_time={0}
        >
          {(pageNumber, ref) => (
            <LargePage ref={ref} color="Indigo">
              {pageNumber}
            </LargePage>
          )}
        </InfinityPagination>
      </HeightLimit>
    </Box>

    <Box>
      <HeightLimit>
        <Pagination
          mode="infinity"
          startup_count={2}
          // parallel_load_count={1}
          // page_count={10} // the last one we fill with "End"
          min_wait_time={0}
          on_load={({ page, setContent, endInfinity }) => {
            console.log('on_load: ', page)
            if (page > 10) {
              endInfinity()
            } else {
              setContent(page, <LargePage>{page}</LargePage>)
            }
          }}
          on_end={({ page, setContent }) => {
            console.log('on_end: ', page)
            setContent(page, <LargePage color="lightgreen">End</LargePage>)
          }}
        />
      </HeightLimit>
    </Box>
  </Wrapper>
)

const HeightLimit = styled.div`
  height: 20rem;
  overflow-y: scroll;
  background-color: var(--color-white);
  border: 4px solid blue;
`

// eslint-disable-next-line
const PaginationWithState = ({ children, ...props }) => {
  const [currentPage, setCurrentPage] = React.useState(1)

  // create our Pagination instance
  const [{ Pagination: PaginationInstance, setContent, resetContent }] =
    React.useState(createPagination)
  setContent(currentPage, children(currentPage))

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
        //   setContent(page, children(page))
        // }, Math.ceil(Math.random() * 1e3))
      }}
    >
      {/* {({ page, setContent }) => {
        setTimeout(() => {
          setContent(page, children(page))
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
      on_load={({ page, setContent }) => {
        console.log('InfinityPagination on_load:', page)

        setTimeout(() => {
          setContent(page, children(page))
        }, Math.ceil(Math.random() * 1e3))
      }}
      on_end={({ page, setContent }) => {
        console.log('InfinityPagination on_end:', page)
        setContent(page, <LargePage>End</LargePage>)
      }}
    >
      {/* just a child */}
    </Pagination>
  )
}

function PaginationRender() {
  const pageCount = 8
  const startupPage = 2
  const [currentPage, setCurrentPage] = React.useState(startupPage)
  const [delayedCount, setDelayedCount] = React.useState(currentPage)

  React.useEffect(() => {
    setDelayedCount(currentPage)
  }, [currentPage])

  return (
    <Section>
      <Button
        on_click={() => setCurrentPage(1)}
        text="Reset"
        bottom
        size="small"
        right
      />
      <Button
        on_click={() => setCurrentPage((prevCount) => prevCount - 1)}
        text="Decrease"
        size="small"
        variant="secondary"
        right
      />
      <Button
        on_click={() => setCurrentPage((prevCount) => prevCount + 1)}
        text="Increase"
        size="small"
        variant="secondary"
        right
      />
      <Pagination
        page_count={pageCount}
        startup_page={startupPage}
        current_page={delayedCount}
        on_change={({ page }) => {
          setCurrentPage(page)
        }}
      >
        <div className="pagination-content">
          <code>{JSON.stringify({ currentPage, delayedCount })}</code>
        </div>
      </Pagination>
    </Section>
  )
}
