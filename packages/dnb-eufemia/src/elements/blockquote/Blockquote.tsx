/**
 * HTML Element
 *
 */

import React from 'react'
import clsx from 'clsx'
import type { SpacingProps } from '../../components/space/types'
import E from '../Element'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

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

function Blockquote({
  noBackground,
  direction = 'horizontal',
  className,
  ref,
  ...props
}: BlockquoteProps & { ref?: React.Ref<HTMLQuoteElement> }) {
  return (
    <E
      as="blockquote"
      skeletonMethod="font"
      ref={ref}
      className={clsx(
        className,
        noBackground && 'dnb-blockquote--no-background',
        direction === 'vertical' && 'dnb-blockquote--top'
      )}
      {...props}
    />
  )
}

withComponentMarkers(Blockquote, {
  _supportsSpacingProps: true,
})

export default Blockquote
