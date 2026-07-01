import type { ElementType, HTMLProps, ReactNode, RefObject } from 'react'

import type { SuffixChildren } from '../../shared/helpers/Suffix'
import type { FormElementProps } from '../../shared/helpers/filterValidProps'
import type { NumberFormatOptionParams } from '../number-format/NumberUtils'
import type { SpacingProps } from '../../shared/types'
import type { SkeletonShow } from '../Skeleton'
import type { GlobalStatusConfigObject } from '../GlobalStatus'

export type SliderValue = number | Array<number>
export type SliderNumberFormat =
  | NumberFormatOptionParams
  | ((value: number) => unknown)
export type SliderOnChangeParams = {
  value: SliderValue
  rawValue: number
  number?: string | null
  event?: Event
}

export type SliderExtensions = Record<
  string,
  { instance: ElementType; [key: string]: unknown }
>

export type SliderProps = {
  /**
   * Prepends the Form Label component. If no ID is provided, a random ID is created.
   */
  label?: ReactNode

  /**
   * Use `labelDirection="horizontal"` to change the label layout direction. Defaults to `vertical`.
   */
  labelDirection?: FormElementProps['labelDirection']

  /**
   * Use `true` to make the label only readable by screen readers.
   */
  labelSrOnly?: boolean

  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: string | boolean

  /**
   * Defines the state of the status. Currently, there are two statuses `[error, information]`. Defaults to `error`.
   */
  statusState?: 'error' | 'information'

  /**
   * Use an object to define additional FormStatus properties.
   */
  statusProps?: Record<string, unknown>
  statusNoAnimation?: boolean

  /**
   * The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).
   */
  globalStatus?: GlobalStatusConfigObject

  /**
   * Text describing the content of the Slider more than the label. You can also send in a React component, so it gets wrapped inside the Slider component.
   */
  suffix?: SuffixChildren

  /**
   * Give the slider thumb button a title for accessibility reasons. Defaults to `null`.
   */
  thumbTitle?: string

  /**
   * Give the add button a title for accessibility reasons. Defaults to `Increase (%s)`.
   */
  addTitle?: string

  /**
   * Give the subtract button a title for accessibility reasons. Defaults to `Decrease (%s)`.
   */
  subtractTitle?: string

  /**
   * The minimum value. Can be a negative number as well. Defaults to `0`.
   */
  min?: number

  /**
   * The maximum value. Defaults to `100`.
   */
  max?: number

  /**
   * The `value` of the slider as a number or an array. If an array with numbers is provided, each number will represent a thumb button (the `+` and `-` button will be hidden on multiple thumbs).
   */
  value?: SliderValue

  /**
   * The steps the slider takes on changing the value. Defaults to `null`.
   */
  step?: number

  /**
   * Makes it possible to display overlays with other functionality such as a marker on the slider marking a given value.
   */
  extensions?: SliderExtensions

  /**
   * Show the slider vertically. Defaults to `false`.
   */
  vertical?: boolean

  /**
   * Show the slider reversed. Defaults to `false`.
   */
  reverse?: boolean

  /**
   * If set to `true`, then the slider will be 100% in `width`.
   */
  stretch?: boolean

  /**
   * Will extend the return object with a `number` property (from `onChange` event). You can use all the options from the [NumberFormat](/uilib/components/number-format/properties) component. It also will use that formatted number in the increase/decrease buttons. If it has to represent a currency, then use e.g. `numberFormat={{ currency: true, decimals: 0 }}`.
   */
  numberFormat?: SliderNumberFormat

  /**
   * Use `true` to show a tooltip on `mouseOver`, `touchStart` and `focus`, showing the current number (if `numberFormat` is given) or the raw value.
   */
  tooltip?: boolean

  /**
   * Use `true` to always show the tooltip, in addition to the `tooltip` property.
   */
  alwaysShowTooltip?: boolean

  /**
   * Removes the helper buttons. Defaults to `false`.
   */
  hideButtons?: boolean

  /**
   * Use either `omit`, `push` or `swap`. This property only works for two (range) or more thumb buttons, while `omit` will stop the thumb from swapping, `push` will push its nearest thumb along. Defaults to `swap`.
   */
  multiThumbBehavior?: 'swap' | 'omit' | 'push'

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow

  id?: string
  disabled?: boolean
  className?: string

  /**
   * Will be called on state changes made by the user. The callback `value` and `rawValue` is a number `{ value, rawValue, event }`. But if the `numberFormat` property is given, then it will return an additional `number` with the given format `{ value, number, rawValue, event }`.
   */
  onChange?: (props: SliderOnChangeParams) => void

  /** Will be called once the user starts dragging. Returns `{ event }`. */
  onDragStart?: (props: { event: MouseEvent | TouchEvent }) => void

  /** Will be called once the user stops dragging. Returns `{ event }`. */
  onDragEnd?: (props: { event: MouseEvent | TouchEvent }) => void

  children?: ReactNode
}

export type SliderAllProps = SliderProps &
  SpacingProps &
  Omit<HTMLProps<HTMLElement>, keyof SliderProps>

export type SliderThumbState =
  | 'initial'
  | 'normal'
  | 'activated'
  | 'released'

export type SliderContextValue = {
  isMulti: boolean
  isReverse: boolean
  isVertical: boolean
  shouldAnimate: boolean
  thumbState: SliderThumbState
  thumbIndex: RefObject<number>
  showStatus: boolean
  showButtons: boolean
  attributes: unknown
  allProps: SliderProps
  value: SliderValue
  values: Array<number>
  setValue: (value: SliderValue) => void
  setThumbState: (thumbState: SliderThumbState) => void
  setThumbIndex: (thumbIndex: number) => void
  emitChange: (emitEvent: MouseEvent | TouchEvent, value: number) => void
  trackRef: RefObject<HTMLElement>
  setShouldAnimate: (state: boolean) => void
  animationTimeout: RefObject<NodeJS.Timeout>
}
