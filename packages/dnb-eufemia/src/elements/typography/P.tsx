/**
 * HTML Element
 *
 */

import React from 'react'
import classnames from 'classnames'
import { SpacingProps } from '../../components/space/types'
import { DynamicElement } from '../../shared/types'
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
    element?: DynamicElement & 'p'
    small?: boolean
    medium?: boolean
    bold?: boolean
    size?: PSize
    modifier?: string
  }

const P = ({
  modifier,
  element = 'p',
  className,
  small,
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
        size && `dnb-p__size--${size}`,
        small && 'dnb-p__size--small'
      )}
    />
  )
}

export default P
