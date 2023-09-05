/**
 * HTML Element
 *
 */

import React from 'react'
import classnames from 'classnames'
import { SpacingProps } from '../../components/space/types'
import E from '../Element'
import { HeadingSize } from '../../components/heading/Heading'
import {
  setNextLevel,
  getHeadingSize,
} from '../../components/heading/HeadingHelpers'
import { useTheme } from '../../shared'

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
     * Sets the font size based on headingSize_#{HEADING_SIZE} mixins found in typography-mixins.scss. For more detailed information go here: https://eufemia.dnb.no/uilib/typography/font-size/.
     * Use value 'auto' to base size on heading level
     * Default: xx-large
     */
    size?: HSize | 'auto'
  }

export type SharedHProps = Omit<HProps, 'as'>

const H = ({
  as = 'h1',
  is,
  level,
  size,
  className,
  ...props
}: HProps) => {
  const numSiz = parseFloat(String(as || is).substring(1))

  if (level === 'use') {
    setNextLevel(numSiz)
  }

  const theme = useTheme()
  const targetSize =
    (size === 'auto' && getHeadingSize(theme?.name)[numSiz]) ||
    size ||
    'xx-large'

  return (
    <E
      as={as || is}
      internalClass={classnames(
        targetSize && `dnb-h--${targetSize}`,
        className,
      )}
      {...props}
    />
  )
}

export default H
