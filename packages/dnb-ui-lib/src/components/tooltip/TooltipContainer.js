/**
 * Web Tooltip Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { isTrue } from '../../shared/component-helper'
import classnames from 'classnames'

export default class TooltipContainer extends PureComponent {
  static propTypes = {
    parentElement: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.object,
      PropTypes.node
    ]),
    active: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    arrow: PropTypes.oneOf([
      null,
      'center',
      'top',
      'right',
      'bottom',
      'left'
    ]),
    align: PropTypes.oneOf([null, 'center', 'right', 'left']),
    useHover: PropTypes.bool,
    attributes: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ])
  }

  static defaultProps = {
    parentElement: null,
    active: false,
    position: 'center',
    arrow: null,
    align: null,
    useHover: true,
    attributes: null,
    children: null
  }

  state = {
    hover: null,
    width: 0,
    height: 0
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

  offset = 16
  _rootRef = React.createRef()

  getGlobalStyle() {
    if (!this.props.parentElement) {
      return { display: 'none' }
    }

    const style = {
      ...this.makeStyle(this.props.position, this.props.arrow)
    }

    return style
  }

  makeStyle(position, arrow) {
    let alignOffset = 0
    const parent = this.props.parentElement
    const align = this.props.align
    const tooltipPosition = parent.getBoundingClientRect()
    const scrollY =
      window.scrollY !== undefined ? window.scrollY : window.pageYOffset
    const scrollX =
      window.scrollX !== undefined ? window.scrollX : window.pageXOffset
    const top = scrollY + tooltipPosition.top
    const left = scrollX + tooltipPosition.left
    const style = {}

    const parentSize = {
      width: parent.offsetWidth,
      height: parent.offsetHeight
    }

    // fix for svg
    if (!parent.offsetHeight && parent.getBoundingClientRect) {
      parentSize.width = parent.getBoundingClientRect().width
      parentSize.height = parent.getBoundingClientRect().height
    }

    if (align === 'left') {
      alignOffset = -parentSize.width / 2
    } else if (align === 'right') {
      alignOffset = parentSize.width / 2
    }

    const stylesFromPosition = {
      left: () => {
        style.top = top + parentSize.height / 2 - this.state.height / 2
        style.left = left - this.state.width - this.offset
      },
      right: () => {
        style.top = top + parentSize.height / 2 - this.state.height / 2
        style.left = left + parentSize.width + this.offset
      },
      top: () => {
        style.left =
          left - this.state.width / 2 + parentSize.width / 2 + alignOffset
        style.top = top - this.state.height - this.offset
      },
      bottom: () => {
        style.left =
          left - this.state.width / 2 + parentSize.width / 2 + alignOffset
        style.top = top + parentSize.height + this.offset
      }
    }

    const stylesFromArrow = {
      left: () => {
        style.left =
          left + parentSize.width / 2 - this.offset + alignOffset
      },
      right: () => {
        style.left =
          left -
          this.state.width +
          parentSize.width / 2 +
          this.offset +
          alignOffset
      },
      top: () => {
        style.top = top + parentSize.height / 2 - this.offset
      },
      bottom: () => {
        style.top =
          top + parentSize.height / 2 - this.state.height + this.offset
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

  handleMouseEnter = () => {
    isTrue(this.props.active) &&
      this.props.useHover &&
      this.setState({ hover: true })
  }

  handleMouseLeave = () => {
    this.setState({ hover: false })
  }

  updateSize() {
    const width = this._rootRef.current.offsetWidth
    const height = this._rootRef.current.offsetHeight

    if (width !== this.state.width || height !== this.state.height) {
      this.setState({
        width,
        height
      })
    }
  }

  render() {
    const { attributes, arrow, position } = this.props
    const style = this.checkWindowPosition(this.getGlobalStyle())

    return (
      <div
        style={style}
        ref={this._rootRef}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...attributes}
        className={classnames(
          attributes.className,
          ((isTrue(this.props.active) && this.state.hover !== false) ||
            this.state.hover) &&
            'dnb-tooltip--active'
        )}
      >
        {this.props.arrow && (
          <span
            className={classnames(
              'dnb-tooltip__arrow',
              `dnb-tooltip__arrow__arrow--${arrow}`,
              `dnb-tooltip__arrow__position--${position}`
            )}
          />
        )}

        <div className="dnb-tooltip__content">{this.props.children}</div>
      </div>
    )
  }
}
