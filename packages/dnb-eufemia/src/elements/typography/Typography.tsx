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

export type TypographyProps<
  ElementType extends HTMLElement = HTMLElement,
> = SpacingProps &
  React.HTMLAttributes<ElementType> & {
    /**
     * Defines the Element Type, like "p".
     */
    element?: DynamicElement
    /**
     * Tells the component to use the medium font-weight styling dnb-p--medium defined in paragraphStyle - typography-mixins.scss. Find more details here https://eufemia.dnb.no/uilib/typography/font-weight/
     */
    medium?: boolean
    /**
     * Tells the component to use the bold font-weight styling dnb-p--bold defined in paragraphStyle - typography-mixins.scss. Find more details here https://eufemia.dnb.no/uilib/typography/font-weight/
     */
    bold?: boolean
    /**
     * Sets the font size based on size classes defined in paragraphStyle - typography-mixins.scss. For more detailed information go here: https://eufemia.dnb.no/uilib/typography/font-size/
     */
    size?: TypographySize
    /**
     * A string containing a combination of modifiers, used to set both font-size and weight in one property. e.g. "x-small bold" would make the paragraph extra small and bold.
     * Works as a flexible alternative to setting the medium, bold and size props.
     * List of modifiers can be found at https://eufemia.dnb.no/uilib/typography/font-size/ and https://eufemia.dnb.no/uilib/typography/font-weight/
     */
    modifier?: string
  }

type TypographyInternalProps = {
  innerRef?: React.RefObject<HTMLElement> | React.ForwardedRef<unknown>
  /**
   * Replaces the base class of typography styles. Only used for "dnb-p".
   *
   * Default: "dnb-t"
   */
  modifierClassName?: string
}

const Typography = ({
  modifier,
  element = 'p',
  className,
  modifierClassName = 'dnb-t',
  medium,
  bold,
  size,
  ...props
}: TypographyProps & TypographyInternalProps) => {
  const allModifiers = [medium && 'medium', bold && 'bold']

  if (modifier) {
    modifier
      .split(/\s/g)
      .forEach((modifier) => allModifiers.push(modifier))
  }

  const modifierClasses = allModifiers
    .filter(Boolean)
    .reduce((acc, cur) => {
      if (['x-small', 'small'].includes(cur)) {
        return `${acc} ${modifierClassName}__size--${cur}`
      }

      return `${acc} ${modifierClassName}--${cur}`
    }, '')

  return (
    <E
      as={element}
      {...props}
      className={classnames(
        modifierClasses,
        className,
        size && `${modifierClassName}__size--${size}`
      )}
    />
  )
}

Typography._supportsSpacingProps = true

export default Typography
