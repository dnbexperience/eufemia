/**
 * Anchor Tag
 *
 */

import React, { useCallback } from 'react'
import { Anchor as EufemiaAnchor } from '@dnb/eufemia/src'
import { AnchorAllProps as Props } from '@dnb/eufemia/src/components/Anchor'
import { GatsbyLinkProps, Link as GatsbyLink } from 'gatsby'
import { startPageTransition } from './Transition'

export type AnchorProps = Props &
  Omit<
    React.DetailedHTMLProps<
      React.LinkHTMLAttributes<HTMLLinkElement>,
      HTMLLinkElement
    >,
    'ref'
  >

const PortalLink = React.forwardRef(function Link<TState>(
  { href, onClick = null, ...props }: AnchorProps,
  ref,
) {
  const clickHandler = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      startPageTransition()
      if (onClick) {
        onClick(event)
      }
    },
    [onClick],
  )

  return (
    <GatsbyLink
      to={href}
      ref={ref}
      {...(props as Omit<GatsbyLinkProps<TState>, 'ref' | 'onClick'>)}
      onClick={clickHandler}
    />
  )
})

export { PortalLink as Link }

export default function Anchor({ href, to = null, ...rest }: AnchorProps) {
  if (to) {
    href = to
  }

  if (href.startsWith('!')) {
    href = href.substr(1)
  }

  const isAbsoluteUrl = href.startsWith('http')

  if (isAbsoluteUrl) {
    rest.target = '_blank'
    rest.rel = 'noreferrer'
  } else if (!/^(\/|#)/.test(href)) {
    href = `/${href}`
  }

  const element = (isAbsoluteUrl ? 'a' : PortalLink) as Props['element']

  return <EufemiaAnchor href={href} element={element} {...rest} />
}
