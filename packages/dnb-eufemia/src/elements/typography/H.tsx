/**
 * HTML Element
 *
 */

import React from 'react'
import classnames from 'classnames'
import { SpacingProps } from '../../components/space/types'
import E from '../Element'
import { HeadingSize } from '../../components/heading/Heading'
import { setNextLevel } from '../../components/heading/HeadingHelpers'

export type HSize = HeadingSize

type HProps = SpacingProps &
  React.HTMLAttributes<HTMLHeadingElement> & {
    /**
     * Defines the Element Type, like "h1"
     * Default: h1
     */
    as?: string
    /**
     * Makes the component use the elements heading level. e.g. h3 will make the component use level 3
     */
    level?: 'use'
    /**
     * Sets the font size based on headingSize_#{HEADING_SIZE} mixins found in typography-mixins.scss. For more detailed information go here: https://eufemia.dnb.no/uilib/typography/font-size/
     * Default: xx-large
     */
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
  if (level === 'use') {
    setNextLevel(parseFloat(String(as || is).substring(1)))
  }

  return (
    <E
      as={as || is}
      internalClass={classnames(size && `dnb-h--${size}`, className)}
      {...props}
    />
  )
}

export default H
