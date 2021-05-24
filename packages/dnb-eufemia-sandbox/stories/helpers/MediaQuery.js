/**
 * Storybook Story
 *
 */

import React from 'react'
import styled from '@emotion/styled'
import { Wrapper, Box } from '../helpers'
import { Button } from '@dnb/eufemia/src'
import { Provider } from '@dnb/eufemia/src/shared'
import { MediaQuery, useMediaQuery } from '@dnb/eufemia/src/shared'

export default {
  title: 'Eufemia/Helpers/MediaQuery',
}

const Div1 = styled.div`
  @media (min-width: 0) and (max-width: 60em) {
    color: blue;
  }
`
const Div2 = styled.div`
  @media (min-width: 60em) {
    color: red;
  }
`

export const MediaQuerySandbox = () => {
  const [query, updateQuery] = React.useState({
    screen: true,
    not: true,
    min: 'small',
    max: 'large',
  })
  const match1 = useMediaQuery({
    when: query,
  })
  const match2 = useMediaQuery({
    not: true,
    when: query,
  })
  console.log('mediaQuery > match', match1, match2)
  return (
    <Wrapper>
      <Box>
        <Provider
          value={{
            breakpoints: {
              medium: '40em',
            },
          }}
        >
          <Button
            onClick={() => {
              updateQuery({
                ...query,
                screen: !query.screen,
              })
            }}
          >
            Change
          </Button>
          <br />

          <MediaQuery ssr when={query}>
            when <br />
          </MediaQuery>
          <MediaQuery not when={query}>
            else when <br />
          </MediaQuery>

          <Div1>small</Div1>
          <Div2>large</Div2>

          <MediaQuery when={{ max: 'medium' }}>
            less than medium
          </MediaQuery>
          <MediaQuery when={{ min: 'medium' }}>
            more than medium
          </MediaQuery>
        </Provider>
      </Box>
    </Wrapper>
  )
}
