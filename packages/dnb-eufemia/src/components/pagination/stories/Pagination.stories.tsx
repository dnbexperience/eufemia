/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import { P } from '../../..'
import { Button, Section } from '../..'
import Pagination, { createPagination } from '../Pagination'

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
  font-feature-settings:
    'pnum' on,
    'lnum' on;

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
    currentPage: 3,
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
      onStartup={action}
      onChange={action}
    />
  )
}

export const PaginationNoChildren = () => (
  <Wrapper>
    <Pagination
      pageCount={10}
      currentPage={2}
      onChange={(params) => {
        console.log(params)
      }}
    />
    <Box>
      <Pagination
        pageCount={10}
        currentPage={2}
        onChange={(params) => {
          console.log(params)
        }}
        align="right"
      />
    </Box>
    <Box>
      <Pagination
        pageCount={10}
        currentPage={2}
        onChange={(params) => {
          console.log(params)
        }}
        align="left"
      />
    </Box>
    <Box>
      <Pagination
        pageCount={10}
        currentPage={2}
        onChange={(params) => {
          console.log(params)
        }}
        align="center"
      />
    </Box>
    <Pagination
      pageCount={3}
      currentPage={2}
      onChange={(params) => {
        console.log(params)
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
        pageCount={10}
        currentPage={2}
        onChange={(params) => {
          console.log(params)
        }}
      />
    </Box>
    <Box>
      <Pagination pageCount={2}>
        {({ pageNumber, setContent }) => {
          const timeout = setTimeout(
            () => {
              setContent(pageNumber, <LargePage>{pageNumber}</LargePage>)
            },
            Math.ceil(Math.random() * 500)
          )

          return () => clearTimeout(timeout)
        }}
      </Pagination>
    </Box>

    <Box>
      <Pagination
        pageCount={30}
        startupPage={15}
        onChange={(pageNumber) => {
          console.log('onChange:', pageNumber)
        }}
      >
        {({ pageNumber }) => <P>Page {pageNumber}</P>}
      </Pagination>
    </Box>

    <Box>
      <PaginationWithState
        align="center"
        onChange={(pageNumber) => {
          console.log('onChange:', pageNumber)
        }}
      >
        {(pageNumber) => (
          <LargePage color="HotPink">{pageNumber}</LargePage>
        )}
      </PaginationWithState>
    </Box>

    <Box>
      <HeightLimit>
        <InfinityPagination useLoadButton startupPage={5}>
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
          indicatorElement={() => (
            <CustomIndicator>Loading ...</CustomIndicator>
          )}
          startupPage={3}
          pageCount={10}
          minWaitTime={0}
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
          startupCount={2}
          minWaitTime={0}
          onLoad={({ pageNumber, setContent, endInfinity }) => {
            console.log('onLoad: ', pageNumber)
            if (pageNumber > 10) {
              endInfinity()
            } else {
              setContent(pageNumber, <LargePage>{pageNumber}</LargePage>)
            }
          }}
          onEnd={({ pageNumber, setContent }) => {
            console.log('onEnd: ', pageNumber)
            setContent(
              pageNumber,
              <LargePage color="lightgreen">End</LargePage>
            )
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
const PaginationWithState = ({ children, ...props }) => {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [{ Pagination: PaginationInstance, setContent, resetContent }] =
    React.useState(createPagination)
  setContent(currentPage, children(currentPage))
  if (currentPage == 30) {
    setTimeout(() => {
      resetContent()
      setCurrentPage(1)
    }, 1)
  }

  return (
    <PaginationInstance
      {...props}
      pageCount={30}
      currentPage={currentPage}
      onChange={({ pageNumber }) => {
        console.log('PaginationWithState onChange:', pageNumber)
        setCurrentPage(pageNumber)
      }}
    >
      {/* {({ pageNumber, setContent }) => {
        setTimeout(() => {
          setContent(pageNumber, children(pageNumber))
        }, Math.ceil(Math.random() * 1e3))
      }} */}
    </PaginationInstance>
  )
}
const InfinityPagination = ({ children, ...props }) => {
  return (
    <Pagination
      mode="infinity"
      {...props}
      onLoad={({ pageNumber, setContent }) => {
        console.log('InfinityPagination onLoad:', pageNumber)

        setTimeout(
          () => {
            setContent(pageNumber, children(pageNumber))
          },
          Math.ceil(Math.random() * 1e3)
        )
      }}
      onEnd={({ pageNumber, setContent }) => {
        console.log('InfinityPagination onEnd:', pageNumber)
        setContent(pageNumber, <LargePage>End</LargePage>)
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
        pageCount={pageCount}
        startupPage={startupPage}
        currentPage={delayedCount}
        onChange={({ pageNumber }) => {
          setCurrentPage(pageNumber)
        }}
      >
        <div className="pagination-content">
          <code>{JSON.stringify({ currentPage, delayedCount })}</code>
        </div>
      </Pagination>
    </Section>
  )
}

export function PaginationBarSpacing() {
  return (
    <Section>
      <Pagination
        barSpace={{
          top: 'x-large',
          right: 'large',
          bottom: 'small small',
          left: 'x-small x-small small',
        }}
        pageCount={888}
        currentPage={4}
        onChange={({ pageNumber }) => {
          console.log('onChange:', pageNumber)
        }}
      />
      <Pagination
        barSpace={{
          left: 'xx-large',
        }}
        pageCount={888}
        currentPage={4}
        onChange={({ pageNumber }) => {
          console.log('onChange:', pageNumber)
        }}
      />
      <Pagination
        barSpace={{
          left: true,
        }}
        pageCount={888}
        currentPage={4}
        onChange={({ pageNumber }) => {
          console.log('onChange:', pageNumber)
        }}
      />
    </Section>
  )
}
