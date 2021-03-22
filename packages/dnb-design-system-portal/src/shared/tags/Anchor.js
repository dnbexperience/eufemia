/**
 * Anchor Tag
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@dnb/eufemia/src/elements'

export class AnchorLink extends React.PureComponent {
  static propTypes = {
    element: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    onClick: PropTypes.func,
    offset: PropTypes.string
  }

  static defaultProps = {
    element: 'a',
    onClick: null,
    offset: null
  }

  onClickHandler = (e) => {
    e.preventDefault()

    let offset = () => 0
    if (this.props.offset !== null) {
      if (
        this.props.offset &&
        this.props.offset.constructor &&
        this.props.offset.apply
      ) {
        offset = this.props.offset
      } else {
        offset = () => parseInt(this.props.offset)
      }
    }

    const id = e.currentTarget.getAttribute('href').slice(1)
    const anchorElem = document.getElementById(id)
    const offsetTop =
      anchorElem.getBoundingClientRect().top + window.pageYOffset

    window.scroll({
      top: offsetTop - offset(),
      behavior: 'smooth'
    })

    if (this.props.onClick) {
      this.props.onClick(e)
    }
  }

  render() {
    const {
      element,
      offset, // eslint-disable-line
      ...rest
    } = this.props

    rest.onClick = this.onClickHandler
    const Element = element || 'a'

    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <Element {...rest} />
  }
}

const Anchor = ({ children, href, ...rest }) => {
  if (/^#/.test(href)) {
    return (
      <AnchorLink element={Link} offset="100" href={href} {...rest}>
        {children}
      </AnchorLink>
    )
  }
  if (/^http/.test(href) || href[0] === '!') {
    rest.target = '_blank'
    rest.rel = 'noreferrer'
    if (href[0] === '!') {
      href = href.substr(1)
    }
  }
  return (
    <AnchorLink element={Link} href={href} {...rest}>
      {children}
    </AnchorLink>
  )
}
Anchor.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node
}
Anchor.defaultProps = {
  children: null
}

export default Anchor
