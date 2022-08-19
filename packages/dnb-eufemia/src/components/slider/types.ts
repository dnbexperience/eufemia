import React from 'react'

import type { ISpacingProps } from '../../shared/interfaces'
import type { SuffixChildren } from '../../shared/helpers/Suffix'
import type {
  formatReturnType,
  formatOptionParams,
} from '../number-format/NumberUtils'
import { IncludeCamelCase } from '../../shared/helpers/withCamelCaseProps'

export type ValueTypes = number | Array<number>
export type onChangeEventProps = {
  value: ValueTypes
  rawValue: number
  number?: formatReturnType | null
  event?: Event

  /** @deprecated use rawValue instead */
  raw_value?: number
}

export type SliderProps = {
  id?: string
  label?: React.ReactNode
  label_direction?: 'vertical' | 'horizontal'
  label_sr_only?: boolean
  status?: string | boolean
  status_state?: 'error' | 'info'
  status_props?: Record<string, unknown>
  status_no_animation?: boolean
  global_status_id?: string
  suffix?: SuffixChildren
  thumb_title?: string
  add_title?: string
  subtract_title?: string
  min?: number
  max?: number
  value?: ValueTypes
  step?: number
  vertical?: boolean
  reverse?: boolean
  stretch?: boolean
  number_format?: formatOptionParams
  disabled?: boolean
  hide_buttons?: boolean
  skeleton?: boolean

  class?: string
  className?: string

  on_change?: (props: onChangeEventProps) => void
  on_drag_start?: (props: { event: MouseEvent | TouchEvent }) => void
  on_drag_end?: (props: { event: MouseEvent | TouchEvent }) => void

  /** @deprecated */
  on_init?: (props: Omit<onChangeEventProps, 'rawValue'>) => void

  /** @deprecated The Slider does not support mouse wheel  */
  use_scrollwheel?: boolean

  children?: React.ReactChild
}

export type ThumbStateEnums =
  | 'initial'
  | 'normal'
  | 'activated'
  | 'focused'
  | 'jumped'

export type SliderContextTypes = {
  isMulti: boolean
  isReverse: boolean
  isVertical: boolean
  thumbState: ThumbStateEnums
  thumbIndex: React.RefObject<number>
  showStatus: boolean
  showButtons: boolean
  attributes: unknown
  allProps: SliderProps
  value: ValueTypes
  values: Array<number>
  setValue: (value: ValueTypes) => void
  setThumbState: (thumbState: ThumbStateEnums) => void
  setThumbIndex: (thumbIndex: number) => void
  emitChange: (emitEvent: MouseEvent | TouchEvent, value: number) => void
  trackRef: React.RefObject<HTMLElement>
  setJumpedState: () => void
  jumpedTimeout: React.RefObject<NodeJS.Timeout>
}

export type AllSliderProps = SliderProps &
  IncludeCamelCase<SliderProps> &
  ISpacingProps
