import React from 'react'
import type { AriaLiveAllProps } from './types'
import useAriaLive from './useAriaLive'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

function AriaLive({ element, ...props }: AriaLiveAllProps) {
  const ariaAttributes = useAriaLive(props)
  const Element = element || 'section'

  return <Element {...ariaAttributes} />
}

withComponentMarkers(AriaLive, {
  _supportsSpacingProps: 'children',
})

export default AriaLive
