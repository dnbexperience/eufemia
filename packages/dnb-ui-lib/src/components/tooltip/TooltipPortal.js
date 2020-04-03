/**
 * Web Tooltip Component
 *
 */

import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import TooltipContainer from './TooltipContainer'

let tooltipPortal
if (typeof window !== 'undefined') {
  window.tooltipPortal = window.tooltipPortal || {}
  tooltipPortal = window.tooltipPortal
} else {
  tooltipPortal = {}
}

export default class TooltipPortal extends PureComponent {
  static propTypes = {
    parent: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
      .isRequired,
    active: PropTypes.bool,
    group: PropTypes.string,
    hide_delay: PropTypes.number
  }

  static defaultProps = {
    active: false,
    group: 'main',
    hide_delay: 500
  }

  componentDidMount() {
    if (!this.props.active) {
      return
    }

    this.renderPortal(this.props)
  }

  componentDidUpdate(props) {
    if (
      !tooltipPortal[this.props.group] ||
      (this.props.active && props.active)
    ) {
      return
    }

    this.renderPortal({ active: true })
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
          timeout: null
        }
        tooltipPortal[this.props.group].node.className = 'TooltipPortal'
        document.body.appendChild(tooltipPortal[this.props.group].node)
      } catch (e) {
        console.warn('Could not create TooltipPortal!', e)
      }
    }
  }

  renderPortal(props = {}) {
    if (!tooltipPortal[this.props.group]) {
      this.createPortal()
    }

    const { group, parent } = this.props
    const parentElement =
      typeof parent === 'string' ? document.querySelector(parent) : parent

    if (tooltipPortal[group].timeout) {
      clearTimeout(tooltipPortal[group].timeout)
    }

    if (!this.props.active && props.active) {
      tooltipPortal[group].timeout = setTimeout(() => {
        this.renderPortal({ active: false })
      }, this.props.hide_delay)
    }

    ReactDOM.render(
      <TooltipContainer
        parentElement={parentElement}
        {...this.props}
        {...props}
      />,
      tooltipPortal[this.props.group].node
    )
  }

  render() {
    return null
  }
}
