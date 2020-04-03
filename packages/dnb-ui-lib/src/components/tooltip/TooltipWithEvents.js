/**
 * Web Tooltip Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TooltipAnimated from './TooltipPortal'

export default class TooltipWithEvents extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    parent: PropTypes.oneOfType([
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
    parent: null,
    children: null
  }

  constructor(props) {
    super(props)

    this.state = {
      isVisible: false
    }

    this._parent = React.createRef()
  }

  onMouseEnter = () => {
    this.setState({ isVisible: true })
  }

  onMouseLeave = () => {
    this.setState({ isVisible: false })
  }

  render() {
    const { children, className, parent, ...props } = this.props

    return (
      <>
        <span
          key="parent-wrapper"
          ref={this._parent}
          className={className}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          {parent}
        </span>

        {this._parent.current && (
          <TooltipAnimated
            key="tooltip"
            active={this.state.isVisible}
            parent={this._parent.current}
            {...props}
          >
            {children}
          </TooltipAnimated>
        )}
      </>
    )
  }
}
