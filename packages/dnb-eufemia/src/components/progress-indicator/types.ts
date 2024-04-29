import * as React from 'react'
import CSS from 'csstype'
import { SpacingProps } from '../space/types'

const validSizes = ['default', 'small', 'medium', 'large', 'huge'] as const

export type ValidSizes = (typeof validSizes)[number]
export type CustomSize = CSS.Property.Width

export function isValidSize(
  size: ProgressIndicatorProps['size']
): size is ValidSizes {
  return validSizes.some((validSize) => validSize === size)
}

export type ProgressIndicatorProps = {
  /**
   * Defines the visibility of the progress. Toggling the `visible` property to `false` will force a fade-out animation. Defaults to `true`.
   */
  visible?: boolean
  /**
   * Defines the type. Defaults to `circular`.
   */
  type?: 'circular' | 'linear' | 'countdown'
  /**
   * Disables the fade-in and fade-out animation. Defaults to `false`.
   */
  noAnimation?: boolean
  /**
   * Defines the size. Defaults to `default`.
   */
  size?: ValidSizes | CustomSize
  /**
   * A number between 0-100, if not supplied a continous loading-type animation will be used. Defaults to `undefined`
   */
  progress?: string | number
  /**
   * Content of a custom label. (Overrides `indicator_label` and `showDefaultLabel`)
   */
  label?: React.ReactNode
  /**
   * Same as `label` prop (`label` prop has priority)
   */
  children?: React.ReactNode
  /**
   * Sets the position of the label. `'inside'` only works with `type='circular'. Defaults to `horizontal`.
   */
  labelDirection?: 'horizontal' | 'vertical' | 'inside'
  /**
   * If set to `true` a default label (from text locales) will be shown.
   */
  showDefaultLabel?: boolean
  /**
   * Use this to override the default label from text locales.
   */
  indicator_label?: string
  /**
   * Used to set title and aria-label. Defaults to the value of progress property, formatted as a percent.
   */
  title?: string
  /**
   * Will be called once it's no longer `visible`.
   */
  onComplete?: (...args: any[]) => any
  /**
   * Send in custom css colors that overrides any css. Default is `undefined`.
   */
  customColors?: {
    line?: CSS.Property.BackgroundColor
    shaft?: CSS.Property.BackgroundColor
    background?: CSS.Property.BackgroundColor
  }
}

export type ProgressIndicatorAnimationProps = Pick<
  ProgressIndicatorProps,
  'size' | 'visible' | 'progress' | 'onComplete' | 'customColors'
> & {
  size?: ValidSizes | 'custom-size'
  progress?: number
}

export type ProgressIndicatorAllProps = Omit<
  React.HTMLProps<HTMLSpanElement>,
  'ref' | 'label' | 'size'
> &
  SpacingProps &
  ProgressIndicatorProps

export type ProgressIndicatorCircularAllProps = Omit<
  React.HTMLProps<HTMLElement>,
  'size'
> &
  ProgressIndicatorAnimationProps & {
    /**
     * Reverse the direction of the progress bar. Defaults to `false`.
     */
    reverse?: boolean
    maxOffset?: number
    callOnCompleteHandler?: (...args: any[]) => any
  }

export type ProgressIndicatorLinearAllProps = Omit<
  React.HTMLProps<HTMLElement>,
  'size'
> &
  ProgressIndicatorAnimationProps & {
    callOnCompleteHandler?: (...args: any[]) => any
  }
