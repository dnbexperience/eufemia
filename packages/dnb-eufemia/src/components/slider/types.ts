import React from 'react'

import type { SuffixChildren } from '../../shared/helpers/Suffix'
import type {
  formatReturnType,
  formatOptionParams,
} from '../number-format/NumberUtils'
import { IncludeSnakeCase } from '../../shared/helpers/withSnakeCaseProps'

export type ValueTypes = number | Array<number>
export type onChangeEventProps = {
  value: ValueTypes
  rawValue: number
  number?: formatReturnType | null
  event?: Event

  /** @deprecated use rawValue instead */
  raw_value?: number
}

export type SliderProps = IncludeSnakeCase<{
  id?: string
  label?: React.ReactNode
  labelDirection?: 'vertical' | 'horizontal'
  labelSrOnly?: boolean
  status?: string | boolean
  statusState?: 'error' | 'info'
  statusProps?: Record<string, unknown>
  statusNoAnimation?: boolean
  globalStatusId?: string
  suffix?: SuffixChildren
  thumbTitle?: string
  addTitle?: string
  subtractTitle?: string
  min?: number
  max?: number
  value?: ValueTypes
  step?: number
  vertical?: boolean
  reverse?: boolean
  stretch?: boolean
  numberFormat?: formatOptionParams
  disabled?: boolean
  hideButtons?: boolean
  skeleton?: boolean

  class?: string
  className?: string

  onChange?: (props: onChangeEventProps) => void
  onDragStart?: (props: { event: MouseEvent | TouchEvent }) => void
  onDragEnd?: (props: { event: MouseEvent | TouchEvent }) => void

  /** @deprecated */
  onInit?: (props: Omit<onChangeEventProps, 'rawValue'>) => void

  /** @deprecated The Slider does not support mouse wheel  */
  use_scrollwheel?: boolean

  children?: React.ReactChild
}>

export type ThumbStateEnums =
  | 'initial'
  | 'normal'
  | 'activated'
  | 'released'
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
