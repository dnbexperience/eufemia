/**
 * HTML Element
 *
 */

import React from 'react'
import clsx from 'clsx'
import type { SpacingProps } from '../../shared/types'
import E from '../Element'
import { Theme } from '../../shared'
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
  children,
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
        direction === 'vertical' && 'dnb-blockquote--top',
      )}
      {...props}
    >
      <svg
        className="dnb-blockquote__quote-icon"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden
      >
        <path d="M37.5 27.496a9 9 0 1 0 0-18 9 9 0 0 0 0 18M13.5 27.496a9 9 0 1 0 0-18 9 9 0 0 0 0 18" />
        <path
          d="M46.5 18.496a21 21 0 0 1-21 21m-3-21a21 21 0 0 1-21 21"
          fill="none"
        />
      </svg>

      <Theme.Context surface={noBackground ? 'initial' : 'dark'}>
        {children}
      </Theme.Context>
    </E>
  )
}

withComponentMarkers(Blockquote, {
  _supportsSpacingProps: true,
})

export default Blockquote
