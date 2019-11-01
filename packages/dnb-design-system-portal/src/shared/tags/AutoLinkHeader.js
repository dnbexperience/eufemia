import React from 'react'
import PropTypes from 'prop-types'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import GHSlugger from 'github-slugger'
const slugger = new GHSlugger()

const AutoLinkHeader = ({ is: Component, children, ...props }) => {
  slugger.reset()
  let id = null
  // custom id (https://www.markdownguide.org/extended-syntax/#heading-ids)
  if (Array.isArray(children)) {
    const { _id, _children } = children.reduce(
      (acc, cur) => {
        if (typeof cur === 'string') {
          if (/\{#(.*)\}/.test(cur)) {
            acc._id = String(acc._id + /\{#([^}]*)\}/.exec(cur)[1]).trim()

            // do not return the children
            return acc
          } else {
            acc._id = String(acc._id + cur).trim()
          }
        }
        acc._children.push(cur)
        return acc
      },
      { _id: '', _children: [] }
    )
    id = slugger.slug(_id)
    children = _children
  } else if (typeof children === 'string') {
    if (/\{#(.*)\}/.test(children)) {
      id = /\{#([^}]*)\}/.exec(children)[1]
    } else {
      id = slugger.slug(children)
    }
    children = children.replace(/\{#(.*)\}/g, '').trim()
  }

  const clickHandler = () => {
    if (typeof window !== 'undefined' && id) {
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
        href={id ? `#${id}` : ''}
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
