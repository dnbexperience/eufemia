import React from 'react'
import PropTypes from 'prop-types'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import GHSlugger from 'github-slugger'
import classnames from 'classnames'
const slugger = new GHSlugger()

const AutoLinkHeader = ({
  is: Component,
  useId,
  children,
  className,
  ...props
}) => {
  slugger.reset()
  let id = useId
  // custom id (https://www.markdownguide.org/extended-syntax/#heading-ids)
  if (!id && Array.isArray(children)) {
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
  } else if (!id && typeof children === 'string') {
    if (/\{#(.*)\}/.test(children)) {
      id = /\{#([^}]*)\}/.exec(children)[1]
    } else {
      id = slugger.slug(children)
    }
    children = children.replace(/\{#(.*)\}/g, '').trim()
  }
  if (!id && typeof children === 'object' && children.props.source) {
    id = slugger.slug(children.props.source)
  }

  const clickHandler =
    className && /skip-anchor/g.test(String(className))
      ? null
      : () => {
          if (typeof window !== 'undefined' && id) {
            try {
              window.history.replaceState(undefined, undefined, `#${id}`)
            } catch (e) {
              console.log('Could not call replaceState:', e)
            }
          }
        }

  return (
    <Component
      className={classnames(`dnb-${Component}`, className)}
      {...props}
    >
      {clickHandler && id && (
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
      )}
      {children}
    </Component>
  )
}
AutoLinkHeader.propTypes = {
  is: PropTypes.string,
  useId: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}
AutoLinkHeader.defaultProps = { is: 'h2', useId: null, className: null }

export default AutoLinkHeader
