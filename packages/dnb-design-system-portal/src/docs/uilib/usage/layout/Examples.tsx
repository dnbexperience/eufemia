/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import MediaQuery from '@dnb/eufemia/src/shared/MediaQuery'
import { useMedia, useMediaQuery } from '@dnb/eufemia/src/shared'
import { Code, Button } from '@dnb/eufemia/src'

const useWindowWidth = () => {
  const [innerWidth, setWidth] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
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

export const MediaQueryUseMedia = () => (
  <ComponentBox scope={{ useMedia, useWindowWidth }} hideCode>
    {() => {
      const Playground = () => {
        const { isSmall, isMedium, isLarge, isSSR } = useMedia()
        const { innerWidth } = useWindowWidth()

        return (
          <Code>
            <pre>
              {JSON.stringify(
                { isSmall, isMedium, isLarge, isSSR, innerWidth },
                null,
                2,
              )}
            </pre>
          </Code>
        )
      }
      return <Playground />
    }}
  </ComponentBox>
)

export const MediaQueryLiveExample = () => (
  <ComponentBox scope={{ MediaQuery, useMediaQuery }} hideCode>
    {() => {
      const Playground = () => {
        const [query, updateQuery] = React.useState({
          screen: true,
          not: true,
          min: 'small',
          max: 'large',
        })

        const match1 = useMediaQuery({
          matchOnSSR: true,
          when: query,
        })
        const match2 = useMediaQuery({
          matchOnSSR: true,
          not: true,
          when: query,
        })

        React.useEffect(() => {
          console.log('mediaQuery:', match1, match2)
        }, [match1, match2])

        return (
          <>
            <Button
              onClick={() => {
                updateQuery({
                  ...query,
                  screen: !query.screen,
                })
              }}
              right
            >
              Switch
            </Button>
            <MediaQuery when={query}>
              <Code>when</Code>
            </MediaQuery>
            <MediaQuery not when={query}>
              <Code>not when</Code>
            </MediaQuery>
          </>
        )
      }
      return <Playground />
    }}
  </ComponentBox>
)
