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
  background-color: white;
  border: 0.25rem dotted black;
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

  color: white;
`

class Example extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <ComponentBox
          title="Default pagination"
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
        <ComponentBox
          title="Centered Pagination with random delay"
          description="Note that we keep the hight of the previous page. All pages can for sure have their own height."
          scope={{ HeightLimit, LargePage }}
        >
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
        <ComponentBox
          title="Infinity scroller with load button"
          description="A laod button is shown on the bottom by having `use_load_button={true}` - but here we define our `startup_page={5}`, so we also get a laod button on top."
          scope={{ HeightLimit, LargePage }}
        >
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
        <ComponentBox
          title="Infinity scroller with custom load indicator"
          scope={{ HeightLimit, LargePage }}
        >
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
        <ComponentBox
          title="Infinity scroller with unknown `page_count`"
          scope={{ HeightLimit, LargePage }}
        >
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
        <ComponentBox
          title="Advanced Table infinity scroller"
          description="You can find the code either on [GitHub](https://github.com/dnbexperience/eufemia/blob/develop/packages/dnb-design-system-portal/src/docs/uilib/components/pagination/PaginationTableExample.js) or on [CodeSandbox](https://codesandbox.io/s/eufemia-table-pagination-infinity-546f7)"
          scope={{ HeightLimit, PaginationTableExample }}
        >
          {
            /* @jsx */ `
<HeightLimit height="60rem">
  <PaginationTableExample />
</HeightLimit>
          `
          }
        </ComponentBox>
      </React.Fragment>
    )
  }
}

export { Example }
export default Example
