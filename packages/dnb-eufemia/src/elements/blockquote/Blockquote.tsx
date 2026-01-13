/**
 * HTML Element
 *
 */

import React from 'react'
import clsx from 'clsx'
import { SpacingProps } from '../../components/space/types'
import E from '../Element'

type BlockquoteProps = SpacingProps &
  React.HTMLAttributes<HTMLElement> & {
    /**
     * Hides the blockquote background by making it transparent
     */
    noBackground?: boolean
    /**
     * Determines the flow direction of the content inside of blockquote. Can be either `horizontal` or `vertical`
     * Default: `horizontal`
     */
    direction?: 'horizontal' | 'vertical'
  }

const Blockquote = React.forwardRef(
  (
    {
      noBackground,
      direction = 'horizontal',
      className,
      ...props
    }: BlockquoteProps,
    ref
  ) => (
    <E
      as="blockquote"
      skeletonMethod="font"
      innerRef={ref}
      className={clsx(
        className,
        noBackground && 'dnb-blockquote--no-background',
        direction === 'vertical' && 'dnb-blockquote--top'
      )}
      {...props}
    />
  )
)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - Adding custom property to component for spacing detection
Blockquote._supportsSpacingProps = true

export default Blockquote
