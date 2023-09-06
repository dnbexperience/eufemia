/**
 * Storybook Story
 *
 */

import React from 'react'
import styled from '@emotion/styled'
import { Wrapper, Box } from 'storybook-utils/helpers'
import Button from '../../components/button/Button'
import { Provider, MediaQuery, useMediaQuery, useMedia } from '../'

export default {
  title: 'Eufemia/Helpers/MediaQuery',
}

const useWindowWidth = () => {
  const [innerWidth, setWidth] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  )

  React.useEffect(() => {
    const resizeHandler = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', resizeHandler)
    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  return { innerWidth }
}

export const UseMediaHook = () => {
  const { isSmall, isMedium, isLarge, isSSR } = useMedia()
  const { innerWidth } = useWindowWidth()

  console.dir({ isSmall, isMedium, isLarge, isSSR, innerWidth })

  return (
    <pre>
      {JSON.stringify(
        { isSmall, isMedium, isLarge, isSSR, innerWidth },
        null,
        2
      )}
    </pre>
  )
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

          <MediaQuery matchOnSSR when={query}>
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
