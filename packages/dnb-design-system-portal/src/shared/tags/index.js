/**
 * All inline tags for Markdown
 */

import React from 'react'
import PropTypes from 'prop-types'
import CodeBlock from './CodeBlock'
import Table from './Table'
import Img from './Img'
import Header from './transpile/AutoLinkHeader'
import AnchorLink from 'react-anchor-link-smooth-scroll'

const Anchor = ({ children, href, ...rest }) => {
  if (/^#/.test(href)) {
    return (
      <AnchorLink offset="100" href={href} {...rest}>
        {children}
      </AnchorLink>
    )
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  )
}
Anchor.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}
export default {
  h1: props => <Header {...props} is="h1" />,
  h2: props => <Header {...props} is="h2" />,
  h3: props => <Header {...props} is="h3" />,
  h4: props => <Header {...props} is="h4" />,
  h5: props => <Header {...props} is="h5" />,
  h6: props => <Header {...props} is="h6" />,
  a: Anchor,
  table: Table,
  code: CodeBlock,
  img: Img
}
