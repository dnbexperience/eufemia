/**
 * Types for Heading
 *
 */

import type { HTMLProps, ReactNode } from 'react'
import type { HeadingCounter, HeadingDebugCounter } from './HeadingCounter'
import type { DynamicElement, SpacingProps } from '../../shared/types'
import type { SkeletonShow } from '../Skeleton'

export type HeadingLevelSizeResolutions = {
  1: HeadingSize
  3: HeadingSize
  2: HeadingSize
  4: HeadingSize
  5: HeadingSize
  6: HeadingSize
}

export type HeadingSize =
  | 'xx-large'
  | 'x-large'
  | 'large'
  | 'medium'
  | 'basis'
  | 'small'
  | 'x-small'

export type HeadingLevel =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6

export type InternalHeadingLevel = number

export type HeadingProps = {
  id?: string
  group?: string

  /**
   * A heading, can be text or `React.ReactNode`.
   */
  text?: ReactNode

  /**
   * Define the typography [font-size](/uilib/typography/font-size) by a size _type_, e.g. `x-large`. Defaults to the predefined heading sizes.
   */
  size?: HeadingSize
  level?: HeadingLevel

  /**
   * If set to `true`, the heading level will be incremented by 1.
   */
  increase?: boolean

  /**
   * If set to `true`, the heading level will be decremented by 1.
   */
  decrease?: boolean
  up?: boolean
  down?: boolean

  /**
   * If set to `true`, the heading will not be corrected and warnings will not be shown. Warnings do not show up in **production builds** else either.
   */
  skipCorrection?: boolean

  /**
   * Sets the maximum width based on character count. This will limit the text width to approximately the specified number of characters. Use `true` for a default value of 60ch.
   */
  proseMaxWidth?: number | boolean

  /**
   * If set to `true`, the content will have a prefix, showing the heading level.
   */
  debug?: boolean | (() => void)

  /**
   * If set to `true`, the content will have both a prefix and a JSON log attached to both headings and level contexts.
   */
  debugCounter?: HeadingDebugCounter
  counter?: HeadingCounter

  /**
   * If set to `true`, the heading last used level will be inherited. Also from inside a level context.
   */
  inherit?: boolean

  /**
   * If set to `true`, the heading level will be reset to 2. You can give it a custom level if you need to, e.g. `reset(1)`.
   */
  reset?: number | boolean

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow

  /**
   * Define what HTML element should be used. If you use, e.g. a `span`, then `role="heading"` and `aria-level` gets set. Defaults to semantic heading element.
   */
  element?: DynamicElement
}

export type HeadingAllProps = HeadingProps &
  Omit<HTMLProps<HTMLElement>, 'size'> &
  SpacingProps
