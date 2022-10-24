/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import MediaQuery from '@dnb/eufemia/src/shared/MediaQuery'
import { useMedia, useMediaQuery } from '@dnb/eufemia/src/shared'

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

export const MediaQueryUseMedia = () => (
  <ComponentBox scope={{ useMedia, useWindowWidth }} useRender hideCode>
    {
      /* jsx */ `
const Playground = () => {
  const { isSmall, isMedium, isLarge, isSSR } = useMedia()
  const { innerWidth } = useWindowWidth()
  
  return (<Code>
    <pre>
      {JSON.stringify({ isSmall, isMedium, isLarge, isSSR, innerWidth }, null, 2)}
    </pre>
  </Code>)
}
render(Playground)
`
    }
  </ComponentBox>
)

export const MediaQueryLiveExample = () => (
  <ComponentBox scope={{ MediaQuery, useMediaQuery }} useRender hideCode>
    {
      /* jsx */ `
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
  // console.log('mediaQuery:', match1, match2)
  return (<>
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
  </>)
}
render(Playground)
`
    }
  </ComponentBox>
)
