import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import classnames from 'classnames'
import { makeSlug } from '../../uilib/utils/slug'

const anchorLinkStyle = css`
  .anchor {
    display: inline-block;
    visibility: hidden;

    width: 1em;
    margin-left: -1em;

    line-height: 1;
    text-align: center;
    border-bottom: none;

    transition: opacity 400ms ease-out 200ms;
    opacity: 0;
  }

  .anchor:hover,
  &:hover .anchor {
    visibility: visible;
    opacity: 1;
  }

  .anchor.focus {
    animation: link-attention-focus 2.2s ease-in-out 1 10ms;
  }

  @keyframes link-attention-focus {
    0%,
    100% {
      visibility: visible;
      color: var(--color-sea-green);
      background-color: transparent;
    }
    35% {
      color: var(--color-white);
      background-color: var(--color-sea-green);
    }
    0%,
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  &.focus {
    display: inline-block;
    animation: parent-attention-focus 2.2s ease-in-out 1 10ms;
    * {
      animation: parent-attention-focus 3s ease-in-out 1 150ms;
    }
  }

  @keyframes parent-attention-focus {
    0%,
    100% {
      color: currentColor;
      background-color: transparent;
    }
    35% {
      color: var(--color-white);
      background-color: var(--color-sea-green);
    }
  }
`

const AutoLinkHeader = ({
  is: Component,
  useSlug,
  children,
  className,
  ...props
}) => {
  const id = makeSlug(children, useSlug)

  if (typeof children === 'string' && /\{#(.*)\}/.test(children)) {
    children = children.replace(/\{#(.*)\}/g, '').trim()
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
      css={anchorLinkStyle}
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
  useSlug: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}
AutoLinkHeader.defaultProps = { is: 'h2', useSlug: null, className: null }

export default AutoLinkHeader
