import React from 'react'
import { SliderContext } from '../SliderProvider'

export function useSliderProps() {
  return React.useContext(SliderContext)
}
