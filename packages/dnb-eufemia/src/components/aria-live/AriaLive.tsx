import React from 'react'
import { AriaLiveAllProps } from './types'
import useAriaLive from './useAriaLive'

export default function AriaLive(props: AriaLiveAllProps) {
  const ariaAttributes = useAriaLive(props)

  return <section {...ariaAttributes} />
}

AriaLive._supportsSpacingProps = 'children'
