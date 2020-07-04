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
  ]),
  skeleton: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
    // PropTypes.func,
    // PropTypes.node
  ])
  //   elementRef: PropTypes.object
}
const defaultProps = {
  children: null,
  skeleton: null
  //   elementRef: null
}

export class AutoSize extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  componentDidMount() {
    this.add()
  }

  componentWillUnmount() {
    this.remove()
  }

  add() {
    const { skeleton, elementRef, children } = this.getProps()

    const elem = elementRef.current

    if (skeleton && elem) {
      const string = convertJsxToString(children)
      if (typeof string === 'string') {
        const countChars = string.length

        try {
          elem.setAttribute('data-skeleton-chars', String(countChars))
          elem.style.setProperty('--skeleton-chars', `${countChars}ch`)
        } catch (e) {
          //
        }
      }
    }
  }

  remove() {
    const { elementRef } = this.getProps()
    const elem = elementRef.current
    if (elem) {
      try {
        elem.removeAttribute('data-skeleton-chars')
      } catch (e) {
        //
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.skeleton !== prevProps.skeleton) {
      if (this.props.skeleton) {
        this.add()
      } else {
        this.remove()
      }
    }
  }

  getProps(props = this.props) {
    return this.context?.skeleton
      ? extendPropsWithContext(
          props,
          defaultProps,
          // this.context.skeleton,
          { skeleton: this.context.skeleton }
        )
      : props
  }

  render() {
    return this.props.children
  }
}
