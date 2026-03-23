/**
 * HTML Element
 *
 */

import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import React, { useContext } from 'react'
import clsx from 'clsx'
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
     * Defines the Element Type, like "h1".
     * Default: h1
     */
    element?: string
    /**
     * @deprecated Use `element` prop instead.
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

export type SharedHProps = Omit<HProps, 'element' | 'as'>

const H = ({
  element,
  as: asProp = 'h1',
  is,
  level,
  size,
  proseMaxWidth: proseMaxWidthProp,
  className,
  ...props
}: HProps) => {
  const resolvedElement = element ?? asProp ?? is
  const numSiz = parseFloat(String(resolvedElement).substring(1))

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
      as={resolvedElement}
      internalClass={clsx(targetSize && `dnb-h--${targetSize}`, className)}
      {...props}
      style={{ ...style, ...props.style }}
    />
  )
}

withComponentMarkers(H, {
  _isHeadingElement: true,
  _supportsSpacingProps: true,
})

export default H
