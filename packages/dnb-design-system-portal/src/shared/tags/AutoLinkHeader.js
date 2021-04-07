import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import { AnchorLink } from './Anchor'
import { Heading } from '@dnb/eufemia/src'
import { makeSlug } from '../../uilib/utils/slug'
// import { convertJsxToString } from '@dnb/eufemia/src/shared/component-helper'
import { Location } from '@reach/router'

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
  level,
  element,
  useSlug,
  children,
  title,
  className,
  addToSearchIndex,
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
    <Heading
      level={level}
      element={element}
      className={className}
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
      <Location>
        {({ location }) => {
          if (typeof addToSearchIndex === 'function') {
            addToSearchIndex({
              location,
              title: React.isValidElement(children) ? title : children,
              hash: id
            })
          }
          return children
        }}
      </Location>
    </Heading>
  )
}
AutoLinkHeader.propTypes = {
  level: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string,
  element: PropTypes.string,
  useSlug: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  addToSearchIndex: PropTypes.func
}
AutoLinkHeader.defaultProps = {
  level: '1',
  title: null,
  element: null,
  useSlug: null,
  className: null,
  addToSearchIndex: null
}

export default AutoLinkHeader
