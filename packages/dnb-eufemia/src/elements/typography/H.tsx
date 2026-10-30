/**
 * HTML Element
 *
 */

import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { useContext } from 'react'
import type { HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import type { SpacingProps } from '../../shared/types'
import type { ElementProps } from '../Element'
import E from '../Element'
import type { HeadingSize } from '../../components/heading/Heading'
import {
  setNextLevel,
  getHeadingSize,
} from '../../components/heading/HeadingHelpers'
import { useTheme } from '../../shared'
import Context from '../../shared/Context'
import { useTypography } from './Typography'

export type HSize = HeadingSize

type HProps = SpacingProps &
  HTMLAttributes<HTMLHeadingElement> & {
    /**
     * Defines the HTML element of `H`, like `h2`. `H1` to `H6` always use their own heading element. Defaults to `h1`.
     */
    element?: string
    /**
     * Set to `use` to let the automated [Heading](/uilib/components/heading) levels continue from the level of this element. For example, `<H3 level="use" />` makes the next `Heading` use level 3.
     */
    level?: 'use'
    /**
     * Define the typography [font-size](/uilib/typography/font-size) by a size _type_, e.g. `x-large`. Use `auto` to use the size of the heading level. `H1` to `H6` default to `auto`.
     */
    size?: HSize | 'auto'
    /**
     * Sets the maximum width based on character count. This will limit the text width to approximately the specified number of characters. Use `true` for a default value of 60ch.
     */
    proseMaxWidth?: number | boolean
  } & ElementProps

export type SharedHProps = Omit<HProps, 'element'>

const H = (props: HProps) => {
  const {
    element = 'h1',
    is,
    level,
    size,
    className,
    ...rest
  } = useTypography(props)

  const resolvedElement = element ?? is
  const numSiz = parseFloat(String(resolvedElement).substring(1))

  if (level === 'use') {
    setNextLevel(numSiz)
  }

  const theme = useTheme()
  const targetSize =
    (size === 'auto' && getHeadingSize(theme?.brand)[numSiz]) ||
    size ||
    'xx-large'

  const context = useContext(Context)

  return (
    <E
      as={resolvedElement}
      data-flex-item-type="heading"
      internalClass={clsx(
        targetSize && `dnb-h--${targetSize}`,
        context?.theme?.surface === 'dark' && 'dnb-t--surface-dark',
        className
      )}
      {...rest}
    />
  )
}

withComponentMarkers(H, {
  _isHeadingElement: true,
  _supportsSpacingProps: true,
})

export default H
