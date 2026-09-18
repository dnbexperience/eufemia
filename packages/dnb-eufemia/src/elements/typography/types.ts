/**
 * Types for Typography
 *
 */

import type { HTMLAttributes, ReactNode } from 'react'
import type { DynamicElement, SpacingProps } from '../../shared/types'

export type TypographySize =
  | 'x-small'
  | 'small'
  | 'basis'
  | 'medium'
  | 'large'
  | 'x-large'
  | 'xx-large'

export type TypographyAlign = 'center' | 'left' | 'right'

export type TypographyFamily = 'basis' | 'heading' | 'monospace'

export type TypographyWeight = 'regular' | 'medium' | 'bold'

export type TypographyDecoration = 'underline'

export type TypographySlant = 'italic'

export type TypographyContextType = Pick<
  TypographyProps,
  'proseMaxWidth'
> & {
  /**  Whether or not responsive typography is enabled for typography components. Default is `false`. */
  responsive?: boolean
}

export type TypographyProviderProps = TypographyContextType & {
  children: ReactNode
}

export type TypographyProps<
  ElementType extends HTMLElement = HTMLElement,
> = SpacingProps &
  HTMLAttributes<ElementType> & {
    /**
     * Defines the Element Type, like `p`.
     */
    element?: DynamicElement
    /**
     * Sets the font size, also sets the line-height if `lineHeight` property is not set.
     */
    size?: TypographySize
    /**
     * Sets the line height, will use same value as `size` if not set.
     */
    lineHeight?: TypographySize
    /**
     * Sets the text alignment.
     */
    align?: TypographyAlign
    /**
     * Sets the font family.
     */
    family?: TypographyFamily
    /**
     * Sets the font weight.
     */
    weight?: TypographyWeight
    /**
     * Sets the font decoration.
     */
    decoration?: TypographyDecoration
    /**
     * Sets the font style.
     */
    slant?: TypographySlant
    /**
     * Sets the maximum width based on character count for all Typography children. This will limit the text width to approximately the specified number of characters. Use `true` for a default value of 60ch.
     */
    proseMaxWidth?: number | boolean
  }

export type TypographyUseProps = Pick<
  TypographyProps,
  'proseMaxWidth' | 'style' | 'className'
>
