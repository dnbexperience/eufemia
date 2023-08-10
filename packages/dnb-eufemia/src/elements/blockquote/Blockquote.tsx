/**
 * HTML Element
 *
 */

import React from 'react'
import classnames from 'classnames'
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
      className={classnames(
        className,
        noBackground && 'dnb-blockquote--no-background',
        direction === 'vertical' && 'dnb-blockquote--top'
      )}
      {...props}
    />
  )
)

export default Blockquote
