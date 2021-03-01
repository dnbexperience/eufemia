/**
 * Web Tooltip Component
 *
 */

import React from 'react'
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

export default class TooltipPortal extends React.PureComponent {
  static propTypes = {
    internal_id: PropTypes.string,
    target: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
      .isRequired,
    active: PropTypes.bool,
    group: PropTypes.string,
    hide_delay: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  static defaultProps = {
    internal_id: null,
    active: false,
    group: 'main',
    hide_delay: 500
  }

  componentDidMount() {
    this.renderPortal()
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
        document.body.insertBefore(
          tooltipPortal[this.props.group].node,
          document.body.firstChild
        )
      } catch (e) {
        console.warn('Could not create TooltipPortal!', e)
      }
    }
  }

  handleAria(elem) {
    if (elem && this.props.internal_id) {
      try {
        const describedby = makeArrayUnique(
          String(elem.getAttribute('aria-describedby') || '').split(' ')
        )
        describedby.push(this.props.internal_id)
        elem.setAttribute('aria-describedby', describedby.join(' '))
      } catch (e) {
        //
      }
    }
  }

  renderPortal(props = {}) {
    if (typeof document === 'undefined') {
      return // stop here
    }

    if (!tooltipPortal[this.props.group]) {
      this.createPortal()
    }

    const { group, target } = this.props

    const targetElement =
      typeof target === 'string' ? document.querySelector(target) : target

    if (tooltipPortal[group].timeout) {
      clearTimeout(tooltipPortal[group].timeout)
    }

    if (!this.props.active && props.active) {
      tooltipPortal[group].timeout = setTimeout(() => {
        this.renderPortal({ active: false })
      }, parseFloat(this.props.hide_delay))
    }

    ReactDOM.render(
      <TooltipContainer
        targetElement={targetElement}
        {...this.props}
        {...props}
      />,
      tooltipPortal[this.props.group].node
    )

    this.handleAria(targetElement)
  }

  render() {
    return null
  }
}

const makeArrayUnique = (array) =>
  array
    .filter(Boolean)
    .filter((value, index, self) => self.indexOf(value) === index)
