/**
 * HTML Element
 *
 */

import React from 'react'
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
export type TypographyDecoration = 'italic' | 'underline'

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
    line?: TypographySize
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
  }

type TypographyInternalProps = {
  innerRef?: React.RefObject<HTMLElement> | React.ForwardedRef<unknown>
}

const Typography = ({
  element = 'p',
  className,
  size,
  line,
  align,
  family,
  weight,
  decoration,
  ...props
}: TypographyProps & TypographyInternalProps) => {
  return (
    <E
      as={element}
      {...props}
      className={classnames(
        className,
        size && `dnb-t__size--${size}`,
        align && `dnb-t__align--${align}`,
        family && `dnb-t__family--${family}`,
        weight && `dnb-t__weight--${weight}`,
        decoration && `dnb-t__decoration--${decoration}`,
        (line || size) && `dnb-t__line--${line || size}`
      )}
    />
  )
}

Typography._supportsSpacingProps = true

export default Typography
