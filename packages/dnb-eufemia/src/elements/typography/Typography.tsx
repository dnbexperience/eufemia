/**
 * HTML Element
 *
 */

import React, { createContext, useContext } from 'react'
import classnames from 'classnames'
import { SpacingProps } from '../../components/space/types'
import type { DynamicElement } from '../../shared/types'
import E from '../Element'

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

export type TypographyContextType = {
  proseMaxWidth?: number | 'auto'
}

export const TypographyContext = createContext<TypographyContextType>({
  proseMaxWidth: undefined,
})

export type TypographyProviderProps = {
  /**
   * Sets the maximum width based on character count for all Typography children. This will limit the text width to approximately the specified number of characters. Use "auto" for a default value of 60ch.
   */
  proseMaxWidth?: number | 'auto'
  children: React.ReactNode
}

export type TypographyProps<
  ElementType extends HTMLElement = HTMLElement,
> = SpacingProps &
  React.HTMLAttributes<ElementType> & {
    /**
     * Defines the Element Type, like "p".
     */
    element?: DynamicElement
    /**
     * Sets the font size, also sets the line-height if `line` prop is not set
     */
    size?: TypographySize
    /**
     * Sets the line height, will use same value as `size` if not set.
     */
    lineHeight?: TypographySize
    /**
     * Sets the text alignment
     */
    align?: TypographyAlign
    /**
     * Sets the font family
     */
    family?: TypographyFamily
    /**
     * Sets the font weight
     */
    weight?: TypographyWeight
    /**
     * Sets the font decoration
     */
    decoration?: TypographyDecoration
    /**
     * Sets the font style
     */
    slant?: TypographySlant
    /**
     * Sets the maximum width based on character count. This will limit the text width to approximately the specified number of characters. Use "auto" for a default value of 60ch.
     */
    proseMaxWidth?: number | 'auto'
  }

type TypographyInternalProps = {
  innerRef?: React.RefObject<HTMLElement> | React.ForwardedRef<unknown>
}

const Typography = ({
  element = 'p',
  className,
  size,
  lineHeight,
  align,
  family,
  weight,
  decoration,
  slant,
  proseMaxWidth: proseMaxWidthProp,
  ...props
}: TypographyProps & TypographyInternalProps) => {
  const { proseMaxWidth: proseMaxWidthContext } =
    useContext(TypographyContext)

  // Use prop value if provided, otherwise fall back to context
  const proseMaxWidth = proseMaxWidthProp ?? proseMaxWidthContext

  const style = proseMaxWidth
    ? { maxWidth: `${proseMaxWidth === 'auto' ? 60 : proseMaxWidth}ch` }
    : undefined

  return (
    <E
      as={element}
      {...props}
      style={{ ...props.style, ...style }}
      className={classnames(
        className,
        size && `dnb-t__size--${size}`,
        align && `dnb-t__align--${align}`,
        family && `dnb-t__family--${family}`,
        weight && `dnb-t__weight--${weight}`,
        decoration && `dnb-t__decoration--${decoration}`,
        slant && `dnb-t__slant--${slant}`,
        (lineHeight || size) && `dnb-t__line-height--${lineHeight || size}`
      )}
    />
  )
}

const Provider = ({
  children,
  proseMaxWidth,
}: TypographyProviderProps) => {
  return (
    <TypographyContext.Provider value={{ proseMaxWidth }}>
      {children}
    </TypographyContext.Provider>
  )
}

Typography._supportsSpacingProps = true
Typography.Provider = Provider

export default Typography
export { Provider }
