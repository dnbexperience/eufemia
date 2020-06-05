/**
 * Web Tooltip Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { isTrue } from '../../shared/component-helper'
import classnames from 'classnames'

export default class TooltipContainer extends React.PureComponent {
  static propTypes = {
    internal_id: PropTypes.string,
    targetElement: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.object,
      PropTypes.node
    ]),
    active: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    position: PropTypes.string,
    arrow: PropTypes.string,
    align: PropTypes.string,
    animate_position: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    useHover: PropTypes.bool,
    attributes: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ])
  }

  static defaultProps = {
    internal_id: null,
    targetElement: null,
    active: false,
    position: 'center',
    arrow: null,
    align: null,
    animate_position: null,
    useHover: true,
    attributes: null,
    children: null
  }

  _rootRef = React.createRef()
  offset = 16
  state = {
    hide: null,
    hover: null,
    width: 0,
    height: 0
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (state.wasActive && !props.active && !state.hover) {
        state.hide = true
      }
      if (props.active || state.hover) {
        state.wasActive = true
        state.hide = false
      }
    }
    state._listenForPropChanges = true
    return state
  }

  componentDidMount() {
    if (isTrue(this.props.active)) {
      this.updateSize()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.updateSize()
    }
  }

  getGlobalStyle() {
    if (!this.props.targetElement) {
      return { display: 'none' }
    }

    const style = {
      ...this.makeStyle(this.props.position, this.props.arrow)
    }

    return style
  }

  makeStyle(position, arrow) {
    if (typeof window === 'undefined') {
      return {}
    }
    let alignOffset = 0
    const target = this.props.targetElement
    const align = this.props.align
    const tooltipPosition = target.getBoundingClientRect()
    const scrollY =
      window.scrollY !== undefined ? window.scrollY : window.pageYOffset
    const scrollX =
      window.scrollX !== undefined ? window.scrollX : window.pageXOffset
    const top = scrollY + tooltipPosition.top
    const left = scrollX + tooltipPosition.left
    const style = {}

    const targetSize = {
      width: target.offsetWidth,
      height: target.offsetHeight
    }

    // fix for svg
    if (!target.offsetHeight && target.getBoundingClientRect) {
      targetSize.width = target.getBoundingClientRect().width
      targetSize.height = target.getBoundingClientRect().height
    }

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
          left - this.state.width / 2 + targetSize.width / 2 + alignOffset
        style.top = top - this.state.height - this.offset
      },
      bottom: () => {
        style.left =
          left - this.state.width / 2 + targetSize.width / 2 + alignOffset
        style.top = top + targetSize.height + this.offset
      }
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
      }
    }

    if (stylesFromPosition[position]) {
      stylesFromPosition[position]()
    }
    if (stylesFromArrow[arrow]) {
      stylesFromArrow[arrow]()
    }

    return style
  }

  checkWindowPosition(style) {
    if (style.left < 0) {
      style.left = this.offset
    } else {
      try {
        const rightOffset =
          style.left + this.state.width - window.innerWidth
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
    const width = this._rootRef.current.offsetWidth
    const height = this._rootRef.current.offsetHeight

    if (width !== this.state.width || height !== this.state.height) {
      this.setState({
        width,
        height,
        _listenForPropChanges: false
      })
    }
  }

  handleMouseEnter = () => {
    isTrue(this.props.active) &&
      this.props.useHover &&
      this.setState({ hover: true })
  }

  handleMouseLeave = () => {
    this.props.useHover && this.setState({ hover: false })
  }

  render() {
    const {
      internal_id,
      active,
      attributes,
      arrow,
      position,
      animate_position,
      children
    } = this.props
    const { hover, hide } = this.state

    const style = this.checkWindowPosition(this.getGlobalStyle())
    const isActive = isTrue(active) || hover

    return (
      <div
        role="tooltip"
        aria-hidden // make sure SR does not find it in the DOM, because we use "aria-describedby" for that
        style={style}
        ref={this._rootRef}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...attributes}
        className={classnames(
          attributes.className,
          isTrue(animate_position) && 'dnb-tooltip--animate_position',
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

        <div id={internal_id} className="dnb-tooltip__content">
          {children}
        </div>
      </div>
    )
  }
}
