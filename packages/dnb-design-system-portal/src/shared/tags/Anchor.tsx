/**
 * Anchor Tag
 *
 */

import React from 'react'
import { Link } from '@dnb/eufemia/src'

const Anchor = ({ children, href, ...rest }) => {
  if (/^http/.test(href) || href[0] === '!') {
    rest.target = '_blank'
    rest.rel = 'noreferrer'
    if (href[0] === '!') {
      href = href.substr(1)
    }
  }

  return (
    <Link lang="en-GB" href={href} {...rest} scrollToHash>
      {children}
    </Link>
  )
}

export default Anchor
