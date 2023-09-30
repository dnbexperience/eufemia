/**
 * Anchor Tag
 *
 */

import React from 'react'
import { Anchor as EufemiaAnchor } from '@dnb/eufemia/src'
import {
  AnchorAllProps as Props,
  scrollToHashHandler,
} from '@dnb/eufemia/src/components/Anchor'
import { GatsbyLinkProps, Link as GatsbyLink } from 'gatsby'
import { ElementIsType } from '@dnb/eufemia/src/elements/Element'
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
  return (
    <GatsbyLink
      to={href}
      ref={ref}
      {...(props as Omit<GatsbyLinkProps<TState>, 'ref' | 'onClick'>)}
      onClick={clickHandler}
    />
  )

  function clickHandler(event: React.MouseEvent<HTMLAnchorElement>) {
    startPageTransition()
    if (onClick) {
      onClick(event)
    }
  }
})

export { PortalLink as Link }

export default function Anchor({
  href,
  to = null,
  onClick = null,
  ...rest
}: AnchorProps) {
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

  const element = (isAbsoluteUrl ? 'a' : PortalLink) as ElementIsType

  return (
    <EufemiaAnchor
      href={href}
      element={element}
      {...rest}
      onClick={clickHandler}
    />
  )

  function clickHandler(event: React.MouseEvent<HTMLAnchorElement>) {
    if (onClick) {
      onClick(event)
    }
    try {
      const element = scrollToHashHandler(event).element?.parentElement

      if (element) {
        element.classList.add('focus')
        setTimeout(() => element.classList.remove('focus'), 3000)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
