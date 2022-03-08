/**
 * Web Tooltip Component
 *
 */

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { combineDescribedBy, warn } from '../../shared/component-helper'
import TooltipContainer from './TooltipContainer'

let tooltipPortal
if (typeof window !== 'undefined') {
  window.tooltipPortal = window.tooltipPortal || {}
  tooltipPortal = window.tooltipPortal
} else {
  tooltipPortal = {}
}

export default class TooltipPortal extends React.PureComponent {
  static propTypes = {
    internal_id: PropTypes.string,
    target: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
      .isRequired,
    active: PropTypes.bool,
    group: PropTypes.string,
    hide_delay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  static defaultProps = {
    internal_id: null,
    active: false,
    group: 'main',
    hide_delay: 500,
  }

  state = { isMounted: false }

  init = () => {
    const { group, active } = this.props

    tooltipPortal[group] = tooltipPortal[group] || {
      node: this.useRootElement(),
      count: 0,
    }

    tooltipPortal[group].count++

    this.setState({ isMounted: true, active }, () => {
      if (!this.isMainGorup()) {
        this.renderPortal()
      }
    })
  }

  componentDidMount() {
    if (document.readyState === 'complete') {
      this.init()
    } else if (typeof window !== 'undefined') {
      window.addEventListener('load', this.init)
    }
  }

  componentDidUpdate(prevProps) {
    const { group, active, hide_delay } = this.props

    if (tooltipPortal[group] && active !== prevProps.active) {
      if (active && !prevProps.active) {
        this.setState({ active: true }, () => {
          if (!this.isMainGorup()) {
            this.renderPortal()
          }
        })
      } else if (!active && prevProps.active) {
        this.timeout = tooltipPortal[group].timeout = setTimeout(() => {
          this.setState({ active: false }, () => {
            if (!this.isMainGorup()) {
              this.renderPortal()
            }
          })
        }, parseFloat(hide_delay))
      }
    }
  }

  isMainGorup() {
    const { group } = this.props
    return group === 'main'
  }

  componentWillUnmount() {
    const { group } = this.props

    clearTimeout(this.timeout)

    if (tooltipPortal[group]) {
      tooltipPortal[group].count--

      if (!this.isMainGorup()) {
        ReactDOM.unmountComponentAtNode(tooltipPortal[group].node)
      }

      if (tooltipPortal[group].count === 0) {
        try {
          document.body.removeChild(tooltipPortal[group].node)
        } catch (e) {
          //
        }

        tooltipPortal[group] = null
      }
    }
  }

  getTargetElement() {
    if (typeof document !== 'undefined') {
      const { target } = this.props
      return typeof target === 'string'
        ? typeof document !== 'undefined' && document.querySelector(target)
        : target
    }
  }

  useRootElement() {
    if (typeof document !== 'undefined') {
      try {
        const elem = document.createElement('div')
        elem.classList.add('dnb-tooltip__portal')
        elem.classList.add('dnb-core-style')
        document.body.appendChild(elem)

        return elem
      } catch (e) {
        warn(e)
      }
    }
  }

  handleAria(elem) {
    try {
      if (!elem.classList.contains('dnb-tooltip__wrapper')) {
        const existing = {
          'aria-describedby': elem.getAttribute('aria-describedby'),
        }
        elem.setAttribute(
          'aria-describedby',
          combineDescribedBy(existing, this.props.internal_id)
        )
      }
    } catch (e) {
      //
    }
  }

  renderPortal = () => {
    const targetElement = this.getTargetElement()
    const { group } = this.props

    if (!this.isMainGorup() && tooltipPortal[group]) {
      clearTimeout(tooltipPortal[group].timeout)
    }

    this.handleAria(targetElement)

    if (this.isMainGorup()) {
      return ReactDOM.createPortal(
        <TooltipContainer
          targetElement={targetElement}
          {...this.props}
          active={this.state.active}
        />,
        tooltipPortal[group].node
      )
    } else {
      ReactDOM.render(
        <TooltipContainer
          targetElement={targetElement}
          {...this.props}
          active={this.state.active}
        />,
        tooltipPortal[group].node
      )
    }
  }

  render() {
    if (this.state.isMounted && this.isMainGorup()) {
      return this.renderPortal()
    }

    return null
  }
}
