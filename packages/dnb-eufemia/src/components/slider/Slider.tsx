/**
 * Web Slider Component
 *
 */

import React from 'react'

import { SliderProvider } from './SliderProvider'
import { SliderInstance } from './SliderInstance'

import type { SliderAllProps } from './types'

export * from './types'

// Export the extensions
export { default as SliderMarker } from './SliderMarker'

function Slider(
  localProps: SliderAllProps,
  ref: React.ForwardedRef<HTMLSpanElement>
) {
  return (
    <SliderProvider {...localProps} innerRef={ref}>
      <SliderInstance />
    </SliderProvider>
  )
}

const SliderWithRef = React.forwardRef(Slider)
SliderWithRef.displayName = 'Slider'

// @ts-expect-error - Adding custom property to component
SliderWithRef._formElement = true
// @ts-expect-error - Adding custom property to component
SliderWithRef._supportsSpacingProps = true

export default SliderWithRef
