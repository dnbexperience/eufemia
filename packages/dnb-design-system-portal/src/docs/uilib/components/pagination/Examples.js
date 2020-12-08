/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import styled from '@emotion/styled'
import PaginationTableExample from './PaginationTableExample'

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

export const PaginationExampleDefault = () => (
  <ComponentBox
    data-visual-test="pagination-default"
    scope={{ HeightLimit, LargePage }}
  >
    {
      /* @jsx */ `
<Pagination
  page_count={30}
  startup_page={15}
  on_change={({ page }) => {
    console.log('on_change:', page)
  }}
>
  {({ pageNo }) => <P>Page {pageNo}</P>}
</Pagination>
          `
    }
  </ComponentBox>
)

export const PaginationExampleCentered = () => (
  <ComponentBox scope={{ HeightLimit, LargePage }}>
    {
      /* @jsx */ `
<Pagination
  align="center"
  page_count={30}
>
  {({ page, setContent }) => {
    // simulate server communication delay
    const timeout = setTimeout(() => {
      setContent(page, <LargePage>{page}</LargePage>)
    }, Math.ceil(Math.random() * 500))

    return () => clearTimeout(timeout)
  }}
</Pagination>
          `
    }
  </ComponentBox>
)

export const PaginationExampleInfinityLoadButton = () => (
  <ComponentBox scope={{ HeightLimit, LargePage }}>
    {
      /* @jsx */ `
<HeightLimit>
  <Pagination
    mode="infinity"
    use_load_button
    startup_page={5}
    min_wait_time={0}
    on_load={({ page, setContent }) => {
      // simulate server communication delay
      const timeout = setTimeout(() => {
        setContent(page, (
          <LargePage>
            {page}
          </LargePage>)
        )
      }, Math.ceil(Math.random() * 500))
      
      return () => clearTimeout(timeout)
    }}
  />
</HeightLimit>
          `
    }
  </ComponentBox>
)

export const PaginationExampleInfinityIndicator = () => (
  <ComponentBox scope={{ HeightLimit, LargePage }}>
    {
      /* @jsx */ `
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
        setContent(page, (
          <LargePage>
            {page}
          </LargePage>)
        )
      }, Math.ceil(Math.random() * 500))

      return () => clearTimeout(timeout)
    }}
    on_end={({ page, setContent }) => {
      setContent(page, <LargePage color="lightgreen">End</LargePage>)
    }}
  />
</HeightLimit>
          `
    }
  </ComponentBox>
)

export const PaginationExampleInfinityUnknown = () => (
  <ComponentBox scope={{ HeightLimit, LargePage }}>
    {
      /* @jsx */ `
<HeightLimit>
  <Pagination
    mode="infinity"
    parallel_load_count={2}
    min_wait_time={0}
    on_load={({ page, setContent, endInfinity }) => {
      // simulate server communication delay
      const timeout = setTimeout(() => {
        if(page > 10){
          endInfinity()
        }
        else {
          setContent(page, (
            <LargePage>
              {page}
            </LargePage>)
          )
        }
      }, Math.ceil(Math.random() * 1e3))

      return () => clearTimeout(timeout)
    }}
    on_end={({ page, setContent }) => {
      setContent(page,
        <LargePage color="lightgreen">
          End
        </LargePage>
      )
    }}
  />
</HeightLimit>
          `
    }
  </ComponentBox>
)

export const PaginationExampleInfinityTable = () => (
  <ComponentBox scope={{ HeightLimit, PaginationTableExample }}>
    {
      /* @jsx */ `
<HeightLimit height="60rem">
  <PaginationTableExample />
</HeightLimit>
          `
    }
  </ComponentBox>
)
