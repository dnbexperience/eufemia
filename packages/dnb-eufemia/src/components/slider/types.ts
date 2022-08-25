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
  /** prepends the Form Label component. If no ID is provided, a random ID is created. */
  label?: React.ReactNode

  /** use `labelDirection="vertical"` to change the label layout direction. Defaults to `horizontal`. */
  labelDirection?: 'vertical' | 'horizontal'

  /** use `true` to make the label only readable by screen readers. */
  labelSrOnly?: boolean

  /** text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message. */
  status?: string | boolean

  /** defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`. */
  statusState?: 'error' | 'info'

  /** use an object to define additional FormStatus properties. */
  statusProps?: Record<string, unknown>
  statusNoAnimation?: boolean

  /** the `status_id` used for the target [GlobalStatus](/uilib/components/global-status). */
  globalStatusId?: string

  /** text describing the content of the Slider more than the label. You can also send in a React component, so it gets wrapped inside the Slider component. */
  suffix?: SuffixChildren

  /** give the slider thumb button a title for accessibility reasons. Defaults to `null`. */
  thumbTitle?: string

  /** give the add button a title for accessibility reasons. Defaults to `+`. */
  addTitle?: string

  /** give the subtract button a title for accessibility reasons. Defaults to `−`. */
  subtractTitle?: string

  /** the minimum value. Defaults to `0`. */
  min?: number

  /** the maximum value. Defaults to `100` */
  max?: number

  /** the `value` of the slider as a number. If an array with numbers is provided, each number will represent a thumb button (the `+` and `-` button will be hidden on multible thumbs). */
  value?: ValueTypes

  /** the steps the slider takes on changing the value. Defaults to `null` */
  step?: number

  /** show the slider vertically. Defaults to `false`. */
  vertical?: boolean

  /** show the slider reversed. Defaults to `false`. */
  reverse?: boolean

  /** if set to `true`, then the slider will be 100% in `width`. */
  stretch?: boolean

  /** Will extend the return object with a `number` property (from `onChange` event). You can use all the options from the [NumberFormat](/uilib/components/number-format/properties) component. It also will use that formatted number in the increase/decrease buttons. If it has to represent a currency, then use e.g. `numberFormat={{ currency: true, decimals: 0 }}` */
  numberFormat?: formatOptionParams

  /** removes the helper buttons. Defaults to `false`. */
  hideButtons?: boolean

  /** use either `omit`, `push` or `swap`. This property only works for two (range) or more thumb buttons, while `omit` will stop the thumb from swapping, `push` will push its nearest thumb along. Defaults to `swap`. */
  multiThumbBehavior?: 'swap' | 'omit' | 'push'

  /** if set to `true`, an overlaying skeleton with animation will be shown. */
  skeleton?: boolean

  id?: string
  disabled?: boolean
  className?: string

  /**  will be called on state changes made by the user. The callback `value` and `rawValue` is a number `{ value, rawValue, event }`. But if the prop `numberFormat` is given, then it will return an additional `number` with the given format `{ value, number, rawValue, event }`. */
  onChange?: (props: onChangeEventProps) => void

  /** will be called once the user stops dragging. Returns `{ event }`. */
  onDragStart?: (props: { event: MouseEvent | TouchEvent }) => void

  /** will be called once the user starts dragging. Returns `{ event }`. */
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
