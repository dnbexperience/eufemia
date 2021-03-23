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

  componentDidMount() {
    const { target } = this.props

    if (Object.prototype.hasOwnProperty.call(target, 'current')) {
      this.setState(
        {
          domElement: target.current
        },
        this.addEvents
      )
    }
  }

  componentWillUnmount() {
    clearTimeout(this._onEnterTimeout)

    const { domElement } = this.state
    if (domElement) {
      domElement.removeEventListener('focus', this.onMouseEnter)
      domElement.removeEventListener('blur', this.onMouseLeave)
      domElement.removeEventListener('mouseenter', this.onMouseEnter)
      domElement.removeEventListener('mouseleave', this.onMouseLeave)
    }
  }

  addEvents = () => {
    const { domElement } = this.state
    try {
      domElement.addEventListener('focus', this.onMouseEnter)
      domElement.addEventListener('blur', this.onMouseLeave)
      domElement.addEventListener('mouseenter', this.onMouseEnter)
      domElement.addEventListener('mouseleave', this.onMouseLeave)

      // const existing = {
      //   'aria-describedby': domElement.getAttribute('aria-describedby')
      // }
      // domElement.setAttribute(
      //   'aria-describedby',
      //   combineDescribedBy(existing, this.props.internal_id)
      // )
    } catch (e) {
      warn(e)
    }
  }

  onMouseEnter = (e) => {
    clearTimeout(this._onEnterTimeout)
    this._onEnterTimeout = setTimeout(() => {
      this.setState({ isActive: true, clientX: e.clientX })
    }, this.props.show_delay || 1) // have min 1 to make sure we are after onMouseLeave
  }

  onMouseLeave = () => {
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

    const domElement = this.state.domElement

    let componentWrapper = null
    if (React.isValidElement(target)) {
      componentWrapper = (
        <span
          key="target-wrapper"
          className={classnames('dnb-tooltip__wrapper', className)}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          ref={(domElement) => this.setState({ domElement })}
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
        {domElement && (
          <TooltipPortal
            key="tooltip"
            active={this.state.isActive}
            target={domElement}
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
