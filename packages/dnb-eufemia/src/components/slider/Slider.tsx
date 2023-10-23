/**
 * Web Slider Component
 *
 */

import React from 'react'

import { SliderProvider } from './SliderProvider'
import { SliderInstance } from './SliderInstance'

import type { SliderAllProps } from './types'

export * from './types'

function Slider(localProps: SliderAllProps) {
  return (
    <SliderProvider {...localProps}>
      <SliderInstance />
    </SliderProvider>
  )
}

Slider._supportsSpacingProps = true

export default Slider
