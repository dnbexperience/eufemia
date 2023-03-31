/**
 * HTML Element
 *
 */

import React, { useEffect } from 'react'
import classnames from 'classnames'
import { SpacingProps } from '../../components/space/types'
import E from '../Element'
import { setNextLevel } from '../../components/heading/HeadingHelpers'

export type HSize =
  | 'xx-large'
  | 'x-large'
  | 'large'
  | 'medium'
  | 'basis'
  | 'small'
  | 'x-small'

type HProps = SpacingProps &
  React.HTMLAttributes<HTMLHeadingElement> & {
    as?: string
    level?: string
    size?: HSize
  }

export type SharedHProps = Omit<HProps, 'as'>

const H = ({
  as = 'h1',
  is,
  level,
  size = 'xx-large',
  className,
  ...props
}: HProps) => {
  useEffect(() => {
    if (level === 'use') {
      setNextLevel(parseFloat(String(as || is).substring(1)))
    }
  }, [])

  return (
    <E
      as={as || is}
      internalClass={classnames(size && `dnb-h--${size}`, className)}
      {...props}
    />
  )
}

export default H
