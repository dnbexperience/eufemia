/**
 * Web Tooltip Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TooltipPortal from './TooltipPortal'

export default class TooltipWithEvents extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    internal_id: PropTypes.string,
    show_delay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    target: PropTypes.oneOfType([
      PropTypes.string,
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

  componentWillUnmount() {
    clearTimeout(this._onEnterTimeout)
  }

  onMouseEnter = () => {
    clearTimeout(this._onEnterTimeout)
    this._onEnterTimeout = setTimeout(() => {
      this.setState({ isActive: true })
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

    return (
      <>
        <span
          key="target-wrapper"
          ref={(target) => this.setState({ target })}
          className={className}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          {React.cloneElement(target, {
            'aria-describedby': this.props.internal_id
          })}
        </span>

        {this.state.target && (
          <TooltipPortal
            key="tooltip"
            active={this.state.isActive}
            target={this.state.target}
            {...props}
          >
            {children}
          </TooltipPortal>
        )}
      </>
    )
  }
}
