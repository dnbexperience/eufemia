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

export default Slider
