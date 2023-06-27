/**
 * Anchor Tag
 *
 */

import React from 'react'
import { Link } from '@dnb/eufemia/src'
import { scrollToHashHandler } from '@dnb/eufemia/src/components/Anchor'

const Anchor = ({ children, href, onClick, ...rest }) => {
  if (/^http/.test(href) || href[0] === '!') {
    rest.target = '_blank'
    rest.rel = 'noreferrer'
    if (href[0] === '!') {
      href = href.substr(1)
    }
  }

  function clickHandler(event: React.MouseEvent<HTMLAnchorElement>) {
    onClick()
    scrollToHashHandler(event)
  }

  return (
    <Link lang="en-GB" href={href} {...rest} onClick={clickHandler}>
      {children}
    </Link>
  )
}

export default Anchor
