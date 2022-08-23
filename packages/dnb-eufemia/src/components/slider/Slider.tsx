/**
 * Web Slider Component
 *
 */

import React from 'react'

import { SliderProvider } from './SliderProvider'
import { SliderInstance } from './SliderInstance'

import type { SliderProps, ValueTypes } from './types'
import { ISpacingProps } from '../../shared/interfaces'

export type { SliderProps, ValueTypes }

function Slider(localProps: SliderProps & ISpacingProps) {
  return (
    <SliderProvider {...localProps}>
      <SliderInstance />
    </SliderProvider>
  )
}

export default Slider
