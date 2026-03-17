/**
 * Anchor Tag
 *
 */

import React, { useCallback } from 'react'
import { Anchor as EufemiaAnchor } from '@dnb/eufemia/src'
import type { AnchorAllProps as Props } from '@dnb/eufemia/src/components/Anchor'
import { type GatsbyLinkProps, Link as GatsbyLink } from 'gatsby'
import { startPageTransition } from './Transition'

export type AnchorProps = Props &
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >

function PortalLink<TState>({
  href,
  onClick = null,
  ref,
  ...props
}: AnchorProps) {
  const clickHandler = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      startPageTransition()
      if (onClick) {
        onClick(event)
      }
    },
    [onClick]
  )

  return (
    <GatsbyLink
      to={href}
      ref={
        ref as React.Ref<GatsbyLink<TState>> & React.Ref<HTMLAnchorElement>
      }
      {...(props as Omit<GatsbyLinkProps<TState>, 'ref' | 'onClick'>)}
      onClick={clickHandler}
    />
  )
}

export { PortalLink as Link }

export default function Anchor({ href, to = null, ...rest }: AnchorProps) {
  if (to) {
    href = to
  }

  if (href?.startsWith('!')) {
    href = href.substring(1)
  }

  const isAbsoluteUrl = href?.startsWith('http')

  if (isAbsoluteUrl) {
    rest.target = '_blank'
    rest.rel = 'noreferrer'
  } else if (!/^(\/|#)/.test(href)) {
    href = `/${href}`
  }

  const element = (isAbsoluteUrl ? 'a' : PortalLink) as Props['element']

  return <EufemiaAnchor href={href} element={element} {...rest} />
}
