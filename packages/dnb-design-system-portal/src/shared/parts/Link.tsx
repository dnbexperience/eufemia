/**
 * Page Component
 *
 */

import React from 'react'
import { GatsbyLinkProps, Link as GatsbyLink } from 'gatsby'
import isAbsoluteUrl from 'is-absolute-url'

export default function Link<TState>({
  to,
  children,
  ...props
}: GatsbyLinkProps<TState>) {
  if (isAbsoluteUrl(to)) {
    return (
      <a href={to} {...props}>
        {children}
      </a>
    )
  }

  if (!/^\//.test(to)) {
    to = `/${to}`
  }

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <GatsbyLink to={to} {...props}>
      {children}
    </GatsbyLink>
  )
}
