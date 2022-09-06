/**
 * Web Tooltip Component
 *
 */

import React from 'react'
import {
  combineDescribedBy,
  getInnerRef,
  warn,
} from '../../shared/component-helper'
import { injectTooltipSemantic } from './TooltipHelpers'
import TooltipPortal from './TooltipPortal'
import { TooltipProps } from './types'

type TooltipWithEventsProps = {
  target: HTMLElement
  active: boolean
  clientX: number
  internal_id: string
}

type TooltipWithEventsState = {
  isActive: boolean
  isNotSemanticElement: boolean
  _isMounted: boolean
  clientX: number
}

export default class TooltipWithEvents extends React.PureComponent<
  TooltipProps & TooltipWithEventsProps
> {
  _onEnterTimeout: NodeJS.Timeout
  _ref: HTMLElement

  state: TooltipWithEventsState = {
    isActive: false,
    isNotSemanticElement: false,
    _isMounted: false,
    clientX: null,
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
        _isMounted: true,
      },
      () => {
        this.addEvents()
        this.handleSemanticElement()
      }
    )
  }

  componentWillUnmount() {
    clearTimeout(this._onEnterTimeout)

    const domElement = getInnerRef(this._ref).current
    if (domElement) {
      try {
        domElement.removeEventListener('click', this.onMouseLeave)
        domElement.removeEventListener('focus', this.onFocus)
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

  /**
   * Make the element focus able by keyboard, if it is not a semantic element
   * This will enable keyboard access to the tooltip by adding focus posibility
   */
  handleSemanticElement = () => {
    try {
      const targetElement = document.querySelector(
        `*[aria-describedby*="${this.props.internal_id}"]`
      )
      if (targetElement) {
        const role = targetElement.getAttribute('role')
        if (
          /div|p|span/i.test(targetElement?.tagName) &&
          (!role || role === 'text')
        ) {
          this.setState({
            isNotSemanticElement: true,
          })
        }
      }
    } catch (e) {
      warn(e)
    }
  }

  addEvents = () => {
    const domElement = getInnerRef(this._ref).current
    try {
      domElement.addEventListener('click', this.onMouseLeave)
      domElement.addEventListener('focus', this.onFocus)
      domElement.addEventListener('blur', this.onMouseLeave)
      domElement.addEventListener('mouseenter', this.onMouseEnter)
      domElement.addEventListener('mouseleave', this.onMouseLeave)
      domElement.addEventListener('touchstart', this.onMouseEnter)
      domElement.addEventListener('touchend', this.onMouseLeave)
    } catch (e) {
      warn(e)
    }
  }

  isTouch = (type: string) => {
    return /touch/i.test(type)
  }

  onFocus = (e: MouseEvent) => {
    try {
      if (
        document.documentElement.getAttribute('data-whatintent') ===
        'keyboard'
      ) {
        return this.onMouseEnter(e)
      }
    } catch (e) {
      warn(e)
    }
  }

  onMouseEnter = (e: MouseEvent) => {
    try {
      const isTouch = this.isTouch(e.type)
      if (isTouch) {
        const elem = e.currentTarget as HTMLElement
        elem.style.userSelect = 'none'
      }
    } catch (e) {
      warn(e)
    }

    const run = () => {
      this.setState({ isActive: true, clientX: e.clientX })
    }

    if (this.props.no_animation || globalThis.IS_TEST) {
      run()
    } else {
      clearTimeout(this._onEnterTimeout)
      this._onEnterTimeout = setTimeout(
        run,
        parseFloat(String(this.props.show_delay)) || 1
      ) // have min 1 to make sure we are after onMouseLeave
    }
  }

  onMouseLeave = (e: MouseEvent) => {
    try {
      const isTouch = this.isTouch(e.type)
      if (isTouch) {
        const elem = e.currentTarget as HTMLElement
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
      target,
      // internal_id,// NB: Do not remove internal_id from props!
      ...props
    } = this.props

    let componentWrapper = null

    // we could also check against  && target.props && !target.props.tooltip
    if (React.isValidElement(target)) {
      const params = this.state.isNotSemanticElement
        ? injectTooltipSemantic({ className: props.className })
        : {}

      componentWrapper = React.cloneElement(target, {
        ref: this._ref,
        ...params,
        'aria-describedby': combineDescribedBy(
          target.props,
          this.props.internal_id
        ),
      })
    }

    return (
      <>
        {componentWrapper}
        {this.state._isMounted && (
          <TooltipPortal
            key="tooltip"
            active={this.state.isActive}
            target={getInnerRef(this._ref).current}
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
