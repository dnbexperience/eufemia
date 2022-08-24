/**
 * Web Slider Component
 *
 */

import React from 'react'

import { SliderProvider } from './SliderProvider'
import { SliderInstance } from './SliderInstance'

import { ISpacingProps } from '../../shared/interfaces'

import type { SliderProps } from './types'

export * from './types'

function Slider(localProps: SliderProps & ISpacingProps) {
  return (
    <SliderProvider {...localProps}>
      <SliderInstance />
    </SliderProvider>
  )
}

export default Slider
