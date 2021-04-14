/**
 * Web Tooltip Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { combineDescribedBy, warn } from '../../shared/component-helper'
import TooltipPortal from './TooltipPortal'

export default class TooltipWithEvents extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    internal_id: PropTypes.string,
    show_delay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    target: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.func,
      PropTypes.node
    ]),
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ])
  }

  static defaultProps = {
    className: '',
    internal_id: null,
    show_delay: 1,
    target: null,
    children: null
  }

  state = {
    isActive: false
  }

  constructor(props) {
    super(props)

    this._ref = Object.prototype.hasOwnProperty.call(
      props.target,
      'current'
    )
      ? props.target
      : React.createRef()
  }

  componentDidMount() {
    this.setState(
      {
        _isMounted: true
      },
      () => (this.addEvents(), this.addFocusHelper())
    )
  }

  componentWillUnmount() {
    clearTimeout(this._onEnterTimeout)

    const domElement = this._ref.current
    if (domElement) {
      try {
        domElement.removeEventListener('focus', this.onMouseEnter)
        domElement.removeEventListener('blur', this.onMouseLeave)
        domElement.removeEventListener('mouseenter', this.onMouseEnter)
        domElement.removeEventListener('mouseleave', this.onMouseLeave)
        domElement.removeEventListener('touchstart', this.onMouseEnter)
        domElement.removeEventListener('touchend', this.onMouseLeave)
      } catch (e) {
        warn(e)
      }
    }
  }

  addEvents = () => {
    const domElement = this._ref.current
    try {
      domElement.addEventListener('focus', this.onMouseEnter)
      domElement.addEventListener('blur', this.onMouseLeave)
      domElement.addEventListener('mouseenter', this.onMouseEnter)
      domElement.addEventListener('mouseleave', this.onMouseLeave)
      domElement.addEventListener('touchstart', this.onMouseEnter)
      domElement.addEventListener('touchend', this.onMouseLeave)
    } catch (e) {
      warn(e)
    }
  }

  addFocusHelper = () => {
    const domElement = this._ref.current
    try {
      // Make the element focus able by keyboard, if it is not a semantic element
      const targetElement = document.querySelector(
        `*[aria-describedby*="${this.props.internal_id}"]`
      )
      if (targetElement) {
        const role = targetElement.getAttribute('role')
        if (
          /div|span/i.test(targetElement.tagName) &&
          (!role || role === 'text')
        ) {
          domElement.setAttribute('tabindex', '0')
        }
      }
    } catch (e) {
      warn(e)
    }
  }

  isTouch = (e) => {
    return /touch/i.test(e.type)
  }

  onMouseEnter = (e) => {
    try {
      const isTouch = this.isTouch(e)
      if (isTouch) {
        const elem = e.currentTarget
        elem.style.userSelect = 'none'
      }
    } catch (e) {
      warn(e)
    }

    clearTimeout(this._onEnterTimeout)
    this._onEnterTimeout = setTimeout(
      () => {
        this.setState({ isActive: true, clientX: e.clientX })
      },
      typeof window !== 'undefined' && !window.IS_TEST
        ? parseFloat(this.props.show_delay) || 1
        : 1
    ) // have min 1 to make sure we are after onMouseLeave
  }

  onMouseLeave = (e) => {
    try {
      const isTouch = this.isTouch(e)
      if (isTouch) {
        const elem = e.currentTarget
        elem.style.userSelect = ''
      }
    } catch (e) {
      warn(e)
    }

    clearTimeout(this._onEnterTimeout)
    this.setState({ isActive: false })
  }

  render() {
    const {
      children,
      className,
      target,
      // internal_id,// NB: Do not remove internal_id from props!
      ...props
    } = this.props

    let componentWrapper = null
    if (React.isValidElement(target)) {
      componentWrapper = (
        <span
          key="target-wrapper"
          className={classnames(
            'dnb-tooltip__wrapper',
            'dnb-tab-focus',
            className
          )}
          // onMouseEnter={this.onMouseEnter}
          // onMouseLeave={this.onMouseLeave}
          // onFocus={this.onMouseEnter}
          // onBlur={this.onMouseLeave}
          ref={this._ref}
        >
          {React.cloneElement(target, {
            'aria-describedby': combineDescribedBy(
              target.props,
              this.props.internal_id
            )
          })}
        </span>
      )
    }

    return (
      <>
        {componentWrapper}
        {this.state._isMounted && (
          <TooltipPortal
            key="tooltip"
            active={this.state.isActive}
            target={this._ref.current}
            clientX={this.state.clientX}
            {...props}
          >
            {children}
          </TooltipPortal>
        )}
      </>
    )
  }
}
