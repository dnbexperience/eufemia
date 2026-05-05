import { useContext } from 'react'
import { SliderContext } from '../SliderProvider'

export function useSliderProps() {
  return useContext(SliderContext)
}
