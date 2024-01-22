import React from 'react'
import { AriaLiveAllProps } from './types'
import useAriaLive from './useAriaLive'

export default function AriaLive({ element, ...props }: AriaLiveAllProps) {
  const ariaAttributes = useAriaLive(props)
  const Element = element || 'section'

  return <Element {...ariaAttributes} />
}

AriaLive._supportsSpacingProps = 'children'
