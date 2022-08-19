/**
 * Web Slider Component
 *
 */

import React from 'react'
import { withCamelCaseProps } from '../../shared/helpers/withCamelCaseProps'

import { SliderProvider } from './SliderProvider'
import { SliderInstance } from './SliderInstance'

import type { SliderProps, ValueTypes, AllSliderProps } from './types'

export type { SliderProps, ValueTypes }

function Slider(localProps: AllSliderProps) {
  return (
    <SliderProvider {...localProps}>
      <SliderInstance />
    </SliderProvider>
  )
}

export { Slider as OriginalComponent }
export default withCamelCaseProps(Slider)
