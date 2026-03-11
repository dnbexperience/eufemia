/**
 * Web Slider Component
 *
 */

import React from 'react'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

import { SliderProvider } from './SliderProvider'
import { SliderInstance } from './SliderInstance'

import type { SliderAllProps } from './types'

export * from './types'

// Export the extensions
export { default as SliderMarker } from './SliderMarker'

function Slider(localProps: SliderAllProps) {
  return (
    <SliderProvider {...localProps}>
      <SliderInstance />
    </SliderProvider>
  )
}

withComponentMarkers(Slider, {
  _formElement: true,
  _supportsSpacingProps: true,
})

export default Slider
