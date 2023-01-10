/**
 * Web DrawerList Component
 *
 */

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  warn,
  getClosestScrollViewElement,
} from '../../shared/component-helper'

class DrawerListPortal extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    opened: PropTypes.bool.isRequired,
    innerRef: PropTypes.shape({
      current: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    }),
    rootRef: PropTypes.shape({
      current: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    }).isRequired,
    include_owner_width: PropTypes.bool,
    independent_width: PropTypes.bool,
    fixed_position: PropTypes.bool,
    className: PropTypes.string,
  }

  static defaultProps = {
    rootRef: { current: null },
    innerRef: null,
    include_owner_width: false,
    independent_width: false,
    fixed_position: false,
    className: null,
  }

  state = { isMounted: false }

  constructor(props) {
    super(props)
    this.ref = props.innerRef || React.createRef()
  }

  init = () => {
    this.portalElem = this.useRootElement()
    this.setState({ isMounted: true })
  }

  componentDidMount() {
    if (document.readyState === 'complete') {
      this.init()
    } else if (typeof window !== 'undefined') {
      window.addEventListener('load', this.init)
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('load', this.init)
    }

    this.removePositionObserver()
    this.portalElem = null
  }

  useRootElement() {
    if (typeof document !== 'undefined') {
      try {
        let elem = document.getElementById(`${this.props.id}-portal`)
        if (elem) {
          return elem
        }

        elem = document.createElement('div')
        elem.setAttribute('id', `${this.props.id}-portal`)
        elem.classList.add('dnb-drawer-list__portal')
        this.createMainElement().appendChild(elem)

        return elem
      } catch (e) {
        warn(e)
      }
    }
  }

  createMainElement() {
    if (typeof document !== 'undefined') {
      try {
        let elem = document.getElementById('dnb-drawer-list__portal')
        if (elem) {
          return elem
        }

        elem = document.createElement('div')
        elem.setAttribute('role', 'presentation')
        elem.setAttribute('id', 'dnb-drawer-list__portal')
        elem.classList.add('dnb-core-style')
        document.body.appendChild(elem)

        return elem
      } catch (e) {
        warn(e)
      }
    }
  }

  makeStyle() {
    if (typeof window === 'undefined' || !this.state.isMounted) {
      return // stop here
    }

    try {
      const {
        rootRef,
        include_owner_width,
        independent_width,
        fixed_position,
      } = this.props

      const rootElem = rootRef.current
      if (!rootElem) {
        return // stop here
      }
      const ownerElem = rootElem.parentElement

      // min width as a threshold
      let width = 64

      // Handle width
      const ownerWidth = window.getComputedStyle(ownerElem).width

      // fallback for too narrow width - in case there is not width -> e.g. "--is-popup"
      if (independent_width || parseFloat(ownerWidth) < 64) {
        // get min-width from CSS property
        const minWidth = parseFloat(
          window
            .getComputedStyle(document.documentElement)
            .getPropertyValue('--drawer-list-width')
        )
        width = minWidth * 16
      }

      // also check if root "has a custom width"
      const customWidth = rootElem.getBoundingClientRect().width
      if (parseFloat(customWidth || 0) >= 64) {
        width = customWidth
      }

      // Handle positions
      const rect = rootElem.getBoundingClientRect()
      const scrollY = fixed_position
        ? 0
        : window.scrollY !== undefined
        ? window.scrollY
        : window.pageYOffset
      const scrollX = fixed_position
        ? 0
        : window.scrollX !== undefined
        ? window.scrollX
        : window.pageXOffset

      let top = scrollY + rect.top
      let left =
        scrollX +
        rect.left +
        (include_owner_width ? parseFloat(ownerWidth || 0) : 0)

      if (width > window.innerWidth) {
        width = window.innerWidth
      }
      if (top < 0) {
        top = 0
      }
      if (left < 0) {
        left = 0
      }

      // NB:  before we recalculated the values to REM, but iOS rounds this and we get a wrong total value out of that!
      const style = {
        width,
        '--drawer-list-width': `${width / 16}rem`, // used by the "drawer-list-scale-in" animation
        top,
        left,
      }

      return style
    } catch (e) {
      warn(e)
    }
  }

  addPositionObserver() {
    if (this.setPosition || typeof window === 'undefined') {
      return // stop here
    }

    // debounce
    this.setPosition = () => {
      clearTimeout(this.positionTimeout)
      this.positionTimeout = setTimeout(() => {
        if (this.props.opened) {
          this.setState({
            random: Date.now(), // force re-render
          })
        }
      }, 200)
    }

    this.customElem =
      getClosestScrollViewElement(this.props.rootRef.current) || window
    this.customElem.addEventListener('scroll', this.setPosition)

    try {
      this.resizeObserver = new ResizeObserver(this.setPosition)
      this.resizeObserver.observe(document.body)
    } catch (e) {
      window.addEventListener('resize', this.setPosition)
    }
  }

  removePositionObserver() {
    clearTimeout(this.positionTimeout)
    if (typeof window !== 'undefined' && this.setPosition) {
      if (this.customElem) {
        this.customElem.removeEventListener('scroll', this.setPosition)
      }
      if (this.resizeObserver) {
        this.resizeObserver.disconnect()
        this.resizeObserver = null
      }
      window.removeEventListener('resize', this.setPosition)
    }
    this.setPosition = null
  }

  render() {
    if (!this.portalElem) {
      return null // stop here
    }

    if (typeof window !== 'undefined' && this.state.isMounted) {
      const { opened, fixed_position, className, children } = this.props

      if (opened) {
        this.addPositionObserver()
      }

      const style = opened ? this.makeStyle() : {}

      return ReactDOM.createPortal(
        <span
          className={classnames(
            'dnb-drawer-list__portal__style',
            fixed_position && 'dnb-drawer-list__portal__style--fixed',
            className
          )}
          style={style}
          ref={this.ref}
        >
          {children}
        </span>,
        this.portalElem
      )
    }

    return null
  }
}

export default React.forwardRef((props, ref) => {
  return <DrawerListPortal innerRef={ref} {...props} />
})
