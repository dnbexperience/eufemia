import React from 'react'
import PropTypes from 'prop-types'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import GHSlugger from 'github-slugger'
const slugger = new GHSlugger()

const AutoLinkHeader = ({ is: Component, children, ...props }) => {
  slugger.reset()
  let id
  // custom id (https://www.markdownguide.org/extended-syntax/#heading-ids)
  if (/\{#(.*)\}/.test(children)) {
    id = /\{#([^}]*)\}/.exec(children)[1]
    children = children.replace(/\{#(.*)\}/g, '').trim()
  } else {
    id = slugger.slug(children)
  }
  const clickHandler = () => {
    if (typeof window !== 'undefined') {
      try {
        window.history.replaceState(undefined, undefined, `#${id}`)
      } catch (e) {
        console.log('Could not call replaceState:', e)
      }
    }
  }
  return (
    <Component className={`dnb-${Component}`} {...props}>
      <AnchorLink
        offset="100"
        className="dnb-anchor anchor"
        title="Click to set a Anchor URL"
        id={id}
        href={`#${id}`}
        onClick={clickHandler}
        aria-hidden
      >
        #
      </AnchorLink>
      {children}
    </Component>
  )
}
AutoLinkHeader.propTypes = {
  is: PropTypes.string,
  children: PropTypes.node.isRequired
}
AutoLinkHeader.defaultProps = { is: 'h2' }

export default AutoLinkHeader
