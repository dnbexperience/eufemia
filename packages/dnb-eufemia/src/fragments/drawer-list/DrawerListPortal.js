/**
 * Web DrawerList Component
 *
 */

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { warn, isInsideScrollView } from '../../shared/component-helper'

class DrawerListPortal extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    opened: PropTypes.bool.isRequired,
    innerRef: PropTypes.shape({
      current: PropTypes.oneOfType([PropTypes.node, PropTypes.object])
    }),
    rootRef: PropTypes.shape({
      current: PropTypes.oneOfType([PropTypes.node, PropTypes.object])
    }).isRequired,
    include_owner_width: PropTypes.bool,
    independent_width: PropTypes.bool,
    fixed_position: PropTypes.bool,
    use_drawer_on_mobile: PropTypes.bool,
    className: PropTypes.string
  }

  static defaultProps = {
    rootRef: { current: null },
    innerRef: null,
    include_owner_width: false,
    independent_width: false,
    fixed_position: false,
    use_drawer_on_mobile: false,
    className: null
  }

  constructor(props) {
    super(props)
    this.ref = props.innerRef || React.createRef()
  }

  init = () => {
    this.portalElem = this.useRootElement()
    if (this._isMounted) {
      this.renderPortal()
    }
  }

  componentDidMount() {
    this._isMounted = true
    if (document.readyState === 'complete') {
      this.init()
    } else if (typeof window !== 'undefined') {
      window.addEventListener('load', this.init)
    }
  }

  componentWillUnmount() {
    this._isMounted = false
    if (typeof window !== 'undefined') {
      window.removeEventListener('load', this.init)
    }

    this.removePositionObserver()
    ReactDOM.unmountComponentAtNode(this.portalElem)

    if (typeof document !== 'undefined') {
      try {
        document.body.removeChild(this.portalElem)
      } catch (e) {
        //
      }
      this.portalElem = null
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this._isMounted &&
      this.portalElem &&
      (this.props.opened || prevProps.opened)
    ) {
      this.renderPortal()
    }
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
    if (typeof window === 'undefined' || !this._isMounted) {
      return // stop here
    }

    try {
      const {
        rootRef,
        include_owner_width,
        independent_width,
        fixed_position
      } = this.props

      const rootElem = rootRef.current
      if (!rootElem) {
        return // stop here
      }
      const ownerElem = rootElem.parentElement

      // min width as  a threshold
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
      const top = scrollY + rect.top
      // const top = scrollY + getOffsetTop(rootElem) // iOS 8 safe version
      const left =
        scrollX +
        rect.left +
        (include_owner_width ? parseFloat(ownerWidth || 0) : 0)

      if (width > window.innerWidth) {
        width = window.innerWidth
      }

      // NB:  before we recalculated the values to REM, but iOS rounds this and we get a wrong total value out of that!
      const style = {
        width,
        '--drawer-list-width': `${width / 16}rem`, // used by the "drawer-list-scale-in" aniation
        top,
        left
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
      clearTimeout(this._ddt)
      this._ddt = setTimeout(this.renderPortal, 30)
    }

    this.customElem = isInsideScrollView(this.props.rootRef.current, true)
    if (this.customElem) {
      this.customElem.addEventListener('scroll', this.setPosition)
    }

    try {
      this.resizeObserver = new ResizeObserver(this.setPosition)
      this.resizeObserver.observe(document.body)
    } catch (e) {
      window.addEventListener('resize', this.setPosition)
    }
  }

  removePositionObserver() {
    clearTimeout(this._ddt)
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

  renderPortal = () => {
    const {
      opened,
      fixed_position,
      use_drawer_on_mobile,
      className,
      children
    } = this.props

    if (!this.portalElem) {
      return // stop here
    }

    if (opened) {
      this.addPositionObserver()
    }

    const style = opened ? this.makeStyle() : {}

    ReactDOM.render(
      <span
        // id={this.props.id && `${this.props.id}-portal`}
        className={classnames(
          'dnb-drawer-list__portal__style',
          fixed_position && 'dnb-drawer-list__portal__style--fixed',
          use_drawer_on_mobile &&
            'dnb-drawer-list__portal__style--mobile-view',
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

  render() {
    return null
  }
}

export default React.forwardRef((props, ref) => {
  return <DrawerListPortal innerRef={ref} {...props} />
})
