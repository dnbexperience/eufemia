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

  componentDidMount() {
    this.renderPortal()
  }

  componentDidUpdate(props) {
    if (
      tooltipPortal[this.props.group] &&
      this.props.active !== props.active
    ) {
      this.renderPortal({ active: true })
    }
  }

  componentWillUnmount() {
    if (tooltipPortal[this.props.group]) {
      ReactDOM.unmountComponentAtNode(tooltipPortal[this.props.group].node)
      clearTimeout(tooltipPortal[this.props.group].timeout)

      try {
        document.body.removeChild(tooltipPortal[this.props.group].node)
      } catch (e) {
        //
      }

      tooltipPortal[this.props.group] = null
    }
  }

  createPortal() {
    if (typeof document !== 'undefined') {
      try {
        tooltipPortal[this.props.group] = {
          node: document.createElement('div'),
          timeout: null,
        }
        const elem = tooltipPortal[this.props.group].node
        elem.classList.add('TooltipPortal')
        elem.classList.add('dnb-core-style')
        document.body.appendChild(elem)
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

  renderPortal(props = {}) {
    if (!tooltipPortal[this.props.group]) {
      this.createPortal()
    }

    const { group, target } = this.props

    const targetElement =
      typeof target === 'string'
        ? typeof document !== 'undefined' && document.querySelector(target)
        : target

    if (targetElement) {
      if (tooltipPortal[group].timeout) {
        clearTimeout(tooltipPortal[group].timeout)
      }

      if (!this.props.active && props.active) {
        tooltipPortal[group].timeout = setTimeout(() => {
          this.renderPortal({ active: false })
        }, parseFloat(this.props.hide_delay))
      }

      this.handleAria(targetElement)

      const component = (
        <TooltipContainer
          targetElement={targetElement}
          {...this.props}
          {...props}
        />
      )

      ReactDOM.render(component, tooltipPortal[this.props.group].node)
    }
  }

  render() {
    return null
  }
}
