import type { HTMLProps, ReactNode } from 'react'
import type CSS from 'csstype'
import type { SpacingProps } from '../../shared/types'

const validSizes = ['default', 'small', 'medium', 'large', 'huge'] as const

export type ValidSizes = (typeof validSizes)[number]
export type ProgressIndicatorCustomSize = CSS.Property.Width

export function isValidSize(
  size: ProgressIndicatorProps['size']
): size is ValidSizes {
  return validSizes.some((validSize) => validSize === size)
}

export type ProgressIndicatorProps = {
  /**
   * Defines the visibility of the progress. Toggling the `show` property to `false` will force a fade-out animation.
   * Default: `true`
   */
  show?: boolean
  /**
   * Defines the type.
   * Default: `"circular"`
   */
  type?: 'circular' | 'linear' | 'countdown'
  /**
   * Disables the fade-in and fade-out animation.
   * Default: `false`
   */
  noAnimation?: boolean
  /**
   * Defines the size.
   * Default: `"default"`
   */
  size?: ValidSizes | ProgressIndicatorCustomSize
  /**
   * A number between 0-100, if not supplied a continuous loading-type animation will be used.
   * Default: `undefined`
   */
  progress?: string | number
  /**
   * Content of a custom label. (Overrides `indicatorLabel` and `showDefaultLabel`.).
   * Default: `undefined`
   */
  label?: ReactNode
  /**
   * Same as `label` prop (`label` prop has priority).
   * Default: `undefined`
   */
  children?: ReactNode
  /**
   * Sets the position of the label. `'inside'` only works with `type='circular'`.
   * Default: `"vertical"`
   */
  labelDirection?: 'horizontal' | 'vertical' | 'inside'
  /**
   * If set to `true` a default label (from text locales) will be shown.
   * Default: `false`
   */
  showDefaultLabel?: boolean
  /**
   * Use this to override the default label from text locales.
   * Default: `undefined`
   */
  indicatorLabel?: string
  /**
   * Used to set title and `aria-label`. Defaults to the value of progress property, formatted as a percent.
   * Default: `undefined`
   */
  title?: string
  /**
   * Will be called once it's no longer visible (`show=false`).
   * Default: `undefined`
   */
  onComplete?: () => void
  /**
   * Send in custom CSS colors that override any CSS. Default: `undefined`.
   */
  customColors?: {
    /**
     * Override the moving line color.
     * Default: `undefined`
     */
    line?: CSS.Property.BackgroundColor
    /**
     * Override the background line color.
     * Default: `undefined`
     */
    shaft?: CSS.Property.BackgroundColor
    /**
     * Set a background color for the center of the circle.
     * Default: `undefined`
     */
    background?: CSS.Property.BackgroundColor
  }
  /**
   * Send in custom CSS width for circle progress line. (`undefined` defaults to one eighth of the size).
   * Default: `undefined`
   */
  customCircleWidth?: CSS.Property.StrokeWidth
}

export type ProgressIndicatorAnimationProps = Pick<
  ProgressIndicatorProps,
  | 'size'
  | 'show'
  | 'progress'
  | 'onComplete'
  | 'customColors'
  | 'customCircleWidth'
> & {
  size?: ValidSizes | 'custom-size'
  progress?: number
  /**
   * Callback when animation ends because `show` is set to false
   */
  callOnCompleteHandler?: () => void
}

export type ProgressIndicatorAllProps = Omit<
  HTMLProps<HTMLSpanElement>,
  'ref' | 'label' | 'size'
> &
  SpacingProps &
  ProgressIndicatorProps

export type ProgressIndicatorCircularAllProps = Omit<
  HTMLProps<HTMLElement>,
  'size'
> &
  ProgressIndicatorAnimationProps & {
    /**
     * Reverse the direction of the progress bar. Defaults to `false`.
     */
    counterClockwise?: boolean
  }

export type ProgressIndicatorLinearAllProps = Omit<
  HTMLProps<HTMLElement>,
  'size'
> &
  Omit<ProgressIndicatorAnimationProps, 'customCircleWidth'>
