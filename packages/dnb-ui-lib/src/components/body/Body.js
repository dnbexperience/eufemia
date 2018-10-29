/**
 * Body Component
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  // registerElement,
  defineIsTouch
} from '../../shared/component-helper'
// import './style/dnb-body.scss' // no good solution to import the style here
// import 'focus-visible' // Polyfill for ":focus-visible" - but with a class like ".focus-visible"
import whatInput from 'what-input' // More flexible solution

// IE 11: as we don't need to change CSS Custom Properties in runtime, we don't use this for now
// import cssVars from 'css-vars-ponyfill'
// cssVars()

whatInput.specificKeys([9])

defineIsTouch(true)

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  className: PropTypes.string
}
const defaultProps = {
  children: null,
  className: null
}

export default class Body extends Component {
  // static tagName = 'dnb-body'
  static propTypes = propTypes
  static defaultProps = defaultProps

  // static enableWebComponent() {
  //   registerElement(Body.tagName, Body, defaultProps)
  // }

  render() {
    const { className, ...rest } = this.props
    return (
      <div className={classnames('dnb-body', className)} {...rest}>
        {this.props.children}
      </div>
    )
  }
}

export const pageFocus = (element = null) => {
  try {
    if (!element) {
      element = document.querySelector('.dnb-no-focus')
    }
    if (element instanceof HTMLElement) {
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1')
      }
      if (
        element.classList &&
        !element.classList.contains('dnb-no-focus')
      ) {
        element.classList.add('dnb-no-focus')
      }
      element.focus()
    }
  } catch (e) {
    // console.log('DNB pageFocus', e)
  }
}
