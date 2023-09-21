/**
 * HTML Element
 *
 */

import React from 'react'
import classnames from 'classnames'
import { SpacingProps } from '../../components/space/types'
import type { DynamicElement } from '../../shared/types'
import E from '../Element'

export type PSize =
  | 'x-small'
  | 'small'
  | 'basis'
  | 'medium'
  | 'large'
  | 'x-large'
  | 'xx-large'

export type PProps = SpacingProps &
  React.HTMLAttributes<HTMLParagraphElement> & {
    /**
     * Defines the Element Type, like "p"
     * Default: p
     */
    element?: DynamicElement & 'p'
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
    size?: PSize
    /**
     * A string containing a combination of modifiers, used to set both font-size and weight in one property. e.g. "x-small bold" would make the paragraph extra small and bold.
     * Works as a flexible alternative to setting the medium, small, bold and size props.
     * List of modifiers can be found at https://eufemia.dnb.no/uilib/typography/font-size/ and https://eufemia.dnb.no/uilib/typography/font-weight/
     */
    modifier?: string
  }

const P = ({
  modifier,
  element = 'p',
  className,
  medium,
  bold,
  size,
  ...props
}: PProps) => {
  const allModifiers = [medium && 'medium', bold && 'bold']

  if (modifier) {
    modifier
      .split(/\s/g)
      .forEach((modifier) => allModifiers.push(modifier))
  }

  const modifierString = allModifiers
    .filter(Boolean)
    .reduce((acc, cur) => {
      if (['x-small', 'small'].includes(cur)) {
        return `${acc} dnb-p__size--${cur}`
      }

      return `${acc} dnb-p--${cur}`
    }, '')

  return (
    <E
      as={element}
      {...props}
      className={classnames(
        'dnb-p',
        modifierString,
        className,
        size && `dnb-p__size--${size}`
      )}
    />
  )
}

export default P
