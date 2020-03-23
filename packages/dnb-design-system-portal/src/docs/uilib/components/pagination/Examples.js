/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import styled from '@emotion/styled'
import PaginationTableExample from './PaginationTableExample'

const HeightLimit = styled.div`
  height: ${props => props.height || '20rem'};
  overflow-y: scroll;
  background-color: white;
  border: 0.25rem dotted black;
`
const LargePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 15vw;

  background-color: ${props => props.color || 'tomato'};
  font-size: 15vw;
  font-weight: var(--font-weight-bold);
  font-feature-settings: 'pnum' on, 'lnum' on;

  color: white;
`

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox
          title="Default pagination"
          data-dnb-test="pagination-default"
          scope={{ HeightLimit, LargePage }}
        >
          {/* @jsx */ `
<Pagination
  page_count={30}
  current_page={15}
  on_change={({ page }) => {
    console.log('on_change:', page)
  }}
>
  {({ pageNo }) => <div>Page {pageNo}</div>}
</Pagination>
          `}
        </ComponentBox>
        <ComponentBox
          title="Centered Pagination with random delay"
          description="Note that we keep the hight of the previous page. All pages can for sure have their own height."
          data-dnb-test="pagination-centered"
          scope={{ HeightLimit, LargePage }}
        >
          {/* @jsx */ `
<Pagination
  align="center"
  page_count={30}
>
  {({ page, setContent }) => {
    // simulate server communication delay
    setTimeout(() => {
      setContent(page, <LargePage>{page}</LargePage>)
    }, Math.ceil(Math.random() * 500))
  }}
</Pagination>
          `}
        </ComponentBox>
        <ComponentBox
          title="Infinity scroller with load button"
          description="A laod button is shown on the bottom by having `use_load_button={true}` - but here we define our `startup_page={5}`, so we also get a laod button on top."
          data-dnb-test="pagination-infinity-load-button"
          scope={{ HeightLimit, LargePage }}
        >
          {/* @jsx */ `
<HeightLimit>
  <Pagination
    mode="infinity"
    use_load_button
    startup_page={5}
    on_load={({ page, setContent }) => {
      // simulate server communication delay
      setTimeout(() => {
        setContent(page, (
          <LargePage>
            {page}
          </LargePage>)
        )
      }, Math.ceil(Math.random() * 500))
    }}
  />
</HeightLimit>
          `}
        </ComponentBox>
        <ComponentBox
          title="Infinity scroller with custom load indicator"
          data-dnb-test="pagination-infinity-indicator"
          scope={{ HeightLimit, LargePage }}
        >
          {/* @jsx */ `
<HeightLimit>
  <Pagination
    mode="infinity"
    indicator_element={() => (
      <LargePage color="lightgreen">Loading ...</LargePage>
    )}
    startup_page={2}
    page_count={20}
    on_load={({ page, setContent }) => {
      // simulate server communication delay
      setTimeout(() => {
        setContent(page, (
          <LargePage>
            {page}
          </LargePage>)
        )
      }, Math.ceil(Math.random() * 500))
    }}
  />
</HeightLimit>
          `}
        </ComponentBox>
        <ComponentBox
          title="Infinity scroller with unknown `page_count`"
          scope={{ HeightLimit, LargePage }}
        >
          {/* @jsx */ `
<HeightLimit>
  <Pagination
    mode="infinity"
    startup_count={1}
    parallel_load_count={2}
    on_load={({ page, setContent, endInfinity }) => {
      // simulate server communication delay
      setTimeout(() => {
        if(page > 10){
          endInfinity()
          setContent(
            page,
            <LargePage color="lightgreen">End</LargePage>
          )
        }
        else {
          setContent(page, (
            <LargePage>
              {page}
            </LargePage>)
          )
        }
      }, Math.ceil(Math.random() * 1e3))
    }}
  />
</HeightLimit>
          `}
        </ComponentBox>
        <ComponentBox
          title="Advanced Table infinity scroller"
          description="You can find the code either on [GitHub](https://github.com/dnbexperience/eufemia/blob/develop/packages/dnb-design-system-portal/src/docs/uilib/components/pagination/PaginationTableExample.js) or on [CodeSandbox](https://codesandbox.io/s/eufemia-table-pagination-infinity-546f7)"
          scope={{ HeightLimit, PaginationTableExample }}
        >
          {/* @jsx */ `
<HeightLimit height="60rem">
  <PaginationTableExample />
</HeightLimit>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default Example
