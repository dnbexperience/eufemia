/**
 * Page Component
 *
 */

import React from 'react'
import { GatsbyLinkProps, Link as GatsbyLink } from 'gatsby'
import isAbsoluteUrl from 'is-absolute-url'
import { Anchor } from '@dnb/eufemia/src'
import { ElementIsType } from '@dnb/eufemia/src/elements/Element'

export default function Link<TState>({
  to,
  ...rest
}: GatsbyLinkProps<TState>) {
  if (!/^\//.test(to)) {
    to = `/${to}`
  }

  const element = (isAbsoluteUrl(to) ? 'a' : GatsbyLink) as ElementIsType
  const props = rest as Omit<
    GatsbyLinkProps<TState>,
    'ref' | 'innerRef' | 'children'
  >

  return <Anchor element={element} to={to} {...props} />
}
