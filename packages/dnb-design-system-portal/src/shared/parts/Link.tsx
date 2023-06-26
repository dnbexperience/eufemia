/**
 * Page Component
 *
 */

import React from 'react'
import { GatsbyLinkProps, Link as GatsbyLink } from 'gatsby'
import isAbsoluteUrl from 'is-absolute-url'
import { Anchor } from '@dnb/eufemia/src'

export default function Link<TState>({
  to,
  ...rest
}: GatsbyLinkProps<TState>) {
  if (!/^\//.test(to)) {
    to = `/${to}`
  }

  const element = isAbsoluteUrl(to) ? 'a' : GatsbyLink
  const props = rest as Omit<GatsbyLinkProps<TState>, 'ref' | 'innerRef'>

  return <Anchor element={element} to={to} {...props} />
}
