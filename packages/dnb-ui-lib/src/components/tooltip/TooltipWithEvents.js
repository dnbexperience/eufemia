/**
 * Web Tooltip Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
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

  componentWillUnmount() {
    clearTimeout(this._onEnterTimeout)
    clearTimeout(this._targetTimeout)
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

    if (!this.state.target && typeof target.current !== 'undefined') {
      this._targetTimeout = setTimeout(() => {
        if (!target.current) return
        try {
          const elem = target.current
          elem.addEventListener('mouseenter', this.onMouseEnter)
          elem.addEventListener('mouseleave', this.onMouseLeave)

          const describedby = [this.props.internal_id]
          const db = elem.getAttribute('aria-describedby')
          if (db) {
            describedby.unshift(db)
          }
          elem.setAttribute('aria-describedby', describedby.join(' '))
        } catch (e) {
          console.warn('Tooltip: Could not add event listeners', e)
        }
        this.setState({
          target: target.current
        })
      }, 1)
      return null
    }

    let componentWrapper
    if (React.isValidElement(target)) {
      const describedby = [this.props.internal_id]

      if (target.props && target.props['aria-describedby']) {
        describedby.unshift(target.props['aria-describedby'])
      }

      componentWrapper = (
        <span
          key="target-wrapper"
          ref={(target) => this.setState({ target })}
          className={className}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          {React.cloneElement(target, {
            'aria-describedby': describedby.join(' ')
          })}
        </span>
      )
    }

    return (
      <>
        {componentWrapper}

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
