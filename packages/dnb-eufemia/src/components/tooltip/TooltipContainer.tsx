/**
 * Web Tooltip Component
 *
 */

import React from 'react'
import { isTrue } from '../../shared/component-helper'
import { getOffsetLeft } from '../../shared/helpers'
import classnames from 'classnames'
import { TooltipProps } from './types'

type TooltipContainerProps = {
  targetElement: HTMLElement
  clientX?: number
  style?: React.CSSProperties
  useHover?: boolean
  internal_id?: string
  attributes?: Record<string, unknown>
}

type TooltipContainerState = {
  width: number
  height: number
  hover: boolean
  hide: boolean
  bodyWidth?: number
  bodyHeight?: number
  leaveInDOM?: boolean
}

export default class TooltipContainer extends React.PureComponent<
  TooltipProps & TooltipContainerProps,
  TooltipContainerState
> {
  _rootRef = React.createRef<HTMLElement>()
  offset = 16
  state: TooltipContainerState = {
    hide: null,
    hover: null,
    width: 0,
    height: 0,
  }

  _ddt: NodeJS.Timeout
  resizeObserver: ResizeObserver
  _style: React.CSSProperties

  static getDerivedStateFromProps(
    props: TooltipProps & TooltipContainerProps,
    state: TooltipContainerState
  ) {
    if (state.leaveInDOM && !props.active && !state.hover) {
      state.hide = true
    }
    if (props.active || state.hover) {
      state.leaveInDOM = true
      state.hide = false
    }
    return state
  }

  componentDidMount() {
    if (isTrue(this.props.active)) {
      this.updateSize()
    }

    this.addPositionObserver()
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.updateSize()
    }
  }

  componentWillUnmount() {
    this.removePositionObserver()
  }

  addPositionObserver() {
    if (this.resizeObserver || typeof document === 'undefined') {
      return // stop here
    }

    try {
      this.resizeObserver = new ResizeObserver((entries) => {
        // debounce
        clearTimeout(this._ddt)
        this._ddt = setTimeout(() => {
          // force re-render
          this.setState({
            bodyWidth: entries[0].contentRect.width,
            bodyHeight: entries[0].contentRect.height,
          })
        }, 30)
      })

      this.resizeObserver.observe(document.body)
    } catch (e) {
      //
    }
  }

  removePositionObserver() {
    clearTimeout(this._ddt)
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }
  }

  getGlobalStyle() {
    return this.makeStyle(this.props.position, this.props.arrow)
  }

  makeStyle(position, arrow) {
    if (typeof window === 'undefined') {
      return {}
    }
    let alignOffset = 0

    try {
      const {
        targetElement: target,
        align,
        fixed_position,
        clientX,
      } = this.props

      const rect = target.getBoundingClientRect()

      const targetSize = {
        width: target.offsetWidth,
        height: target.offsetHeight,
      }

      // fix for svg
      if (!target.offsetHeight) {
        targetSize.width = rect.width
        targetSize.height = rect.height
      }

      const scrollY =
        window.scrollY !== undefined ? window.scrollY : window.pageYOffset
      const scrollX =
        window.scrollX !== undefined ? window.scrollX : window.pageXOffset
      const top = (isTrue(fixed_position) ? 0 : scrollY) + rect.top

      // Use Mouse position when target is too wide
      const useMouseWhen = targetSize.width > 400
      const mousePos =
        clientX -
        getOffsetLeft(target) +
        rect.left / 2 +
        (this._rootRef.current ? this._rootRef.current.offsetWidth : 0)
      const widthBased = scrollX + rect.left
      const left =
        useMouseWhen && mousePos < targetSize.width ? mousePos : widthBased

      const style = { ...this.props.style }

      if (align === 'left') {
        alignOffset = -targetSize.width / 2
      } else if (align === 'right') {
        alignOffset = targetSize.width / 2
      }

      const stylesFromPosition = {
        left: () => {
          style.top = top + targetSize.height / 2 - this.state.height / 2
          style.left = left - this.state.width - this.offset
        },
        right: () => {
          style.top = top + targetSize.height / 2 - this.state.height / 2
          style.left = left + targetSize.width + this.offset
        },
        top: () => {
          style.left =
            left -
            this.state.width / 2 +
            targetSize.width / 2 +
            alignOffset
          style.top = top - this.state.height - this.offset
        },
        bottom: () => {
          style.left =
            left -
            this.state.width / 2 +
            targetSize.width / 2 +
            alignOffset
          style.top = top + targetSize.height + this.offset
        },
      }

      const stylesFromArrow = {
        left: () => {
          style.left =
            left + targetSize.width / 2 - this.offset + alignOffset
        },
        right: () => {
          style.left =
            left -
            this.state.width +
            targetSize.width / 2 +
            this.offset +
            alignOffset
        },
        top: () => {
          style.top = top + targetSize.height / 2 - this.offset
        },
        bottom: () => {
          style.top =
            top + targetSize.height / 2 - this.state.height + this.offset
        },
      }

      if (stylesFromPosition[position]) {
        stylesFromPosition[position]()
      }
      if (stylesFromArrow[arrow]) {
        stylesFromArrow[arrow]()
      }

      return style
    } catch (e) {
      return {}
    }
  }

  checkWindowPosition(style: React.CSSProperties) {
    if (style.left < 0) {
      style.left = this.offset
    } else {
      try {
        const rightOffset =
          parseFloat(String(style.left)) +
          this.state.width -
          window.innerWidth
        if (rightOffset > 0) {
          style.left = window.innerWidth - this.state.width - this.offset
        }
      } catch (e) {
        //
      }
    }

    return style
  }

  updateSize() {
    try {
      // to ensure we do not wrap the content before getting the height
      if (!this.state.height) {
        this._rootRef.current.style.left = ''
      }

      const width = this._rootRef.current.offsetWidth
      const height = this._rootRef.current.offsetHeight

      if (width !== this.state.width || height !== this.state.height) {
        this.setState({
          width,
          height,
        })
      }
    } catch (e) {
      //
    }
  }

  handleMouseEnter = () => {
    if (isTrue(this.props.active) && this.props.useHover !== false) {
      this.setState({ hover: true })
    }
  }

  handleMouseLeave = () => {
    if (this.props.useHover !== false) {
      this.setState({ hover: false })
    }
  }

  render() {
    const {
      internal_id,
      active,
      attributes,
      arrow,
      position,
      animate_position,
      fixed_position,
      no_animation,
      children,
    } = this.props
    const { hover, hide } = this.state

    const isActive = isTrue(active) || hover

    if (isActive) {
      this._style = this.checkWindowPosition(this.getGlobalStyle())
    }

    return (
      <span
        role="tooltip"
        aria-hidden // make sure SR does not find it in the DOM, because we use "aria-describedby" for that
        style={this._style}
        ref={this._rootRef}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...attributes}
        className={classnames(
          attributes?.className,
          isTrue(animate_position) && 'dnb-tooltip--animate_position',
          isTrue(no_animation) && 'dnb-tooltip--no-animation',
          isTrue(fixed_position) && 'dnb-tooltip--fixed',
          isActive && 'dnb-tooltip--active',
          !isActive && hide && 'dnb-tooltip--hide'
        )}
      >
        {arrow && (
          <span
            className={classnames(
              'dnb-tooltip__arrow',
              `dnb-tooltip__arrow__arrow--${arrow}`,
              `dnb-tooltip__arrow__position--${position}`
            )}
          />
        )}

        <span id={internal_id} className="dnb-tooltip__content">
          {children}
        </span>
      </span>
    )
  }
}
