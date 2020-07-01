/**
 * Web Skeleton Helpers
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  //   isTrue,
  convertJsxToString,
  extendPropsWithContext
} from '../../shared/component-helper'
import Context from '../../shared/Context'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ])
  //   skeleton: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.bool,
  //     PropTypes.func,
  //     PropTypes.node
  //   ]),
  //   elementRef: PropTypes.object
}
const defaultProps = {
  children: null
  //   skeleton: null,
  //   elementRef: null
}

export class AutoSize extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  componentDidMount() {
    const { skeleton, elementRef, children } = this.getProps()

    const elem = elementRef.current

    if (skeleton && elem) {
      const string = convertJsxToString(children)
      if (typeof string === 'string') {
        const countChars = string.length

        try {
          this.skeletonElem = document.createElement('span')
          this.skeletonElem.classList.add(
            'dnb-skeleton',
            'dnb-skeleton__inner'
          )

          this.skeletonElem.setAttribute(
            'data-skeleton-chars',
            String(countChars)
          )
          this.skeletonElem.style.setProperty(
            '--skeleton-chars',
            `${countChars}ch`
          )

          elem.appendChild(this.skeletonElem)
        } catch (e) {
          //
        }
      }
    }
  }

  componentWillUnmount() {
    const { skeleton, elementRef } = this.getProps()
    const elem = elementRef.current

    if (skeleton && elem) {
      try {
        elem.removeAttribute('data-skeleton-chars')
        elem.removeChild(this.skeletonElem)
      } catch (e) {
        //
      }
    }
  }

  //   componentDidUpdate(prevProps) {
  //     if (this.props.skeleton !== prevProps.skeleton) {
  //     }
  //   }

  getProps() {
    return this.context?.skeleton
      ? extendPropsWithContext(
          this.props,
          defaultProps,
          this.context.skeleton,
          { skeleton: this.context.skeleton }
        )
      : this.props
  }

  render() {
    return this.props.children
  }
}
