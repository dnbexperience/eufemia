/**
 * Web Skeleton Helpers
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { convertJsxToString, isTrue } from '../../shared/component-helper'
import classnames from 'classnames'
import { IS_IE11 } from '../../shared/helpers'

export const skeletonDOMAttributes = (
  params,
  skeleton,
  context = null
) => {
  if (isTrue(skeleton) || (skeleton !== false && context?.skeleton)) {
    params.disabled = true
    params['aria-disabled'] = true
    params['aria-label'] = context?.translation?.Skeleton?.aria_busy
  }

  return params
}

export const createSkeletonClass = (
  method,
  skeleton,
  context = null,
  className = null
) => {
  // We could extend this like so:
  // if (method === 'auto' && typeof skeleton === 'string') {
  //   method = skeleton
  // }

  if (isTrue(skeleton) || (skeleton !== false && context?.skeleton)) {
    return classnames(
      className,
      'dnb-skeleton',
      method && `dnb-skeleton--${method}`
    )
  }

  return className
}

export class AutoSize extends React.PureComponent {
  static propTypes = {
    __element: PropTypes.node,
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
  }
  static defaultProps = {
    __element: null,
    children: null,
    className: null,
    style: null,
  }

  render() {
    const {
      className,
      children,
      __element: Comp,
      style,
      ...props
    } = this.props

    const string = convertJsxToString(children)

    if (typeof string === 'string') {
      const countChars = string.trim().length

      if (countChars > 0) {
        return React.createElement(
          Comp,
          {
            className: classnames(
              className,
              'dnb-skeleton',
              'dnb-skeleton--font'
            ),
            'data-skeleton-chars': String(countChars),
            style: {
              ...(style || {}),
              [IS_IE11
                ? 'maxWidth'
                : '--skeleton-chars']: `${countChars}ch`,
            },
            ...props,
          },
          children
        )
      }
    }

    return <Comp {...props} className={className} style={style} />
  }
}
