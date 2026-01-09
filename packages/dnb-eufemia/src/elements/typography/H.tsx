/**
 * HTML Element
 *
 */

import React, { useContext } from 'react'
import classnames from 'classnames'
import type { SpacingProps } from '../../components/space/types'
import type { ElementProps } from '../Element'
import E from '../Element'
import type { HeadingSize } from '../../components/heading/Heading'
import {
  setNextLevel,
  getHeadingSize,
} from '../../components/heading/HeadingHelpers'
import { useTheme } from '../../shared'
import { TypographyContext } from './Typography'

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
    /**
     * Sets the maximum width based on character count. This will limit the text width to approximately the specified number of characters. Use `true` for a default value of 60ch.
     */
    proseMaxWidth?: number | boolean
  } & ElementProps

export type SharedHProps = Omit<HProps, 'as'>

const H = ({
  as = 'h1',
  is,
  level,
  size,
  proseMaxWidth: proseMaxWidthProp,
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

  const { proseMaxWidth: proseMaxWidthContext } =
    useContext(TypographyContext)

  // Use prop value if provided, otherwise fall back to context
  const proseMaxWidth = proseMaxWidthProp ?? proseMaxWidthContext

  const style = proseMaxWidth
    ? { maxWidth: `${proseMaxWidth === true ? 60 : proseMaxWidth}ch` }
    : undefined

  return (
    <E
      as={as || is}
      internalClass={classnames(
        targetSize && `dnb-h--${targetSize}`,
        className
      )}
      {...props}
      style={{ ...style, ...props.style }}
    />
  )
}

H._isHeadingElement = true
H._supportsSpacingProps = true

export default H
