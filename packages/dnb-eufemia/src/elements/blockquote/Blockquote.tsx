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
     * Hides the blockquote background by making it transperant
     */
    noBackground?: boolean
    /**
     * Forces blockquote align the graphics on top of the element,
     * making the text content come below the graphic instead of next to it
     */
    showGraphicsOnTop?: boolean
  }

const Blockquote = React.forwardRef(
  (
    {
      noBackground,
      showGraphicsOnTop,
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
        showGraphicsOnTop && 'dnb-blockquote--top'
      )}
      {...props}
    />
  )
)

export default Blockquote
