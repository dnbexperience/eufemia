import React from 'react'
import { AriaLiveAllProps } from './types'
import useAriaLive from './useAriaLive'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

function AriaLive({ element, ...props }: AriaLiveAllProps) {
  const ariaAttributes = useAriaLive(props)
  const Element = element || 'section'

  return <Element {...ariaAttributes} />
}

export default withComponentMarkers(AriaLive, {
  _supportsSpacingProps: 'children',
})
