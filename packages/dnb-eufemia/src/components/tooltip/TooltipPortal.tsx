/**
 * Web Tooltip Component
 *
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { combineDescribedBy, warn } from '../../shared/component-helper'
import TooltipContainer from './TooltipContainer'
import { TooltipProps } from './types'

type TooltipType = {
  node: HTMLElement
  count: number
  timeout?: NodeJS.Timeout
}

let tooltipPortal: Record<string, TooltipType>
if (typeof globalThis !== 'undefined') {
  globalThis.tooltipPortal = globalThis.tooltipPortal || {}
  tooltipPortal = globalThis.tooltipPortal
} else {
  tooltipPortal = {}
}

type TooltipPortalProps = {
  target: HTMLElement
  active: boolean
  group?: string
  internal_id?: string
}

type TooltipPortalState = {
  isMounted: boolean
  isActive: boolean
}

export default class TooltipPortal extends React.PureComponent<
  TooltipProps & TooltipPortalProps,
  TooltipPortalState
> {
  state: TooltipPortalState = { isMounted: false, isActive: null }

  init = () => {
    const { group, active } = this.props

    tooltipPortal[group] = tooltipPortal[group] || {
      node: this.useRootElement(),
      count: 0,
    }

    tooltipPortal[group].count++

    this.setState({ isMounted: true, isActive: active }, () => {
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

  componentDidUpdate(prevProps: TooltipProps & TooltipPortalProps) {
    const { group, active, hide_delay } = this.props

    if (this.props.children !== prevProps.children) {
      this.renderPortal()
    }

    if (tooltipPortal[group] && active !== prevProps.active) {
      clearTimeout(tooltipPortal[group].timeout)

      if (active && !prevProps.active) {
        this.setState({ isActive: true }, () => {
          if (!this.isMainGorup()) {
            this.renderPortal()
          }
        })
      } else if (!active && prevProps.active) {
        tooltipPortal[group].timeout = setTimeout(() => {
          this.setState({ isActive: false }, () => {
            if (!this.isMainGorup()) {
              this.renderPortal()
            }
          })
        }, parseFloat(String(hide_delay)))
      }
    }
  }

  isMainGorup() {
    const { group } = this.props
    return group.includes('main')
  }

  componentWillUnmount() {
    const { group } = this.props

    if (tooltipPortal[group]) {
      tooltipPortal[group].count--

      if (!this.isMainGorup()) {
        clearTimeout(tooltipPortal[group].timeout)
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

  handleAria(elem: HTMLElement) {
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
          active={this.state.isActive}
        />,
        tooltipPortal[group].node
      )
    } else {
      ReactDOM.render(
        <TooltipContainer
          targetElement={targetElement}
          {...this.props}
          active={this.state.isActive}
        />,
        tooltipPortal[group].node
      )
    }
  }

  render() {
    if (this.state.isMounted && this.isMainGorup()) {
      return this.renderPortal()
    }

    return <></>
  }
}
