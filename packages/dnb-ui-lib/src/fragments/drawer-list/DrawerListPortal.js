/**
 * Web DrawerList Component
 *
 */

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { warn, isInsideScrollView } from '../../shared/component-helper'
// import { getOffsetTop } from '../../shared/helpers'

let drawerListPortal
if (typeof window !== 'undefined') {
  window.drawerListPortal = window.drawerListPortal || {}
  drawerListPortal = window.drawerListPortal
} else {
  drawerListPortal = {}
}

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
    useWidthAddition: PropTypes.bool,
    fixedPosition: PropTypes.bool,
    useMobileView: PropTypes.bool,
    inactive: PropTypes.bool
  }

  static defaultProps = {
    rootRef: { current: null },
    innerRef: null,
    useWidthAddition: false,
    fixedPosition: false,
    useMobileView: false,
    inactive: false
  }

  constructor(props) {
    super(props)
    this.ref = props.innerRef || React.createRef()
  }

  componentDidMount() {
    if (!this.props.inactive) {
      this.renderPortal()
    }
  }

  componentWillUnmount() {
    const { id } = this.props

    if (drawerListPortal[id]) {
      ReactDOM.unmountComponentAtNode(drawerListPortal[id].node)

      try {
        document.body.removeChild(drawerListPortal[id].node)
      } catch (e) {
        //
      }

      drawerListPortal[id] = null
    }

    this.removePositionObserver()
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.renderPortal()
    }
  }

  createPortal() {
    if (typeof document !== 'undefined') {
      try {
        const elem = (drawerListPortal[this.props.id] = {
          node: document.createElement('div')
        })
        elem.node.setAttribute('role', 'presentation')
        elem.node.className = 'dnb-drawer-list__portal dnb-core-style'
        document.body.appendChild(elem.node)
      } catch (e) {
        warn('Could not create DrawerListPortal!', e)
      }
    }
  }

  makeStyle() {
    try {
      const { rootRef, useWidthAddition, fixedPosition } = this.props

      const rootElem = rootRef.current
      const ownerElem = rootElem.parentElement

      // min width as  a threshold
      let width = 64

      // Handle width
      const { width: ownerWidth } = window.getComputedStyle(ownerElem)

      // fallback for too norrow width - in case there is not width -> e.g. "--is-popup"
      if (parseFloat(ownerWidth) < 64) {
        // get min-width from CSS property
        const minWidth = parseFloat(
          window
            .getComputedStyle(document.documentElement)
            .getPropertyValue('--drawer-list-width')
        )
        width = minWidth * 16
      }

      // also check if root "has a custom width"
      const { width: customWidth } = rootElem.getBoundingClientRect()
      if (parseFloat(customWidth) >= 64) {
        width = customWidth
      }

      // Handle positions
      const rect = rootElem.getBoundingClientRect()
      const scrollY = fixedPosition
        ? 0
        : window.scrollY !== undefined
        ? window.scrollY
        : window.pageYOffset
      const scrollX = fixedPosition
        ? 0
        : window.scrollX !== undefined
        ? window.scrollX
        : window.pageXOffset
      const top = scrollY + rect.top
      // const top = scrollY + getOffsetTop(rootElem) // iOS 8 safe version
      const left =
        scrollX +
        rect.left +
        (useWidthAddition ? parseFloat(ownerWidth) : 0)

      // NB:  before we recalculated the values to REM, but iOS rounds this and we get a wrong total value out of that!
      const style = {
        width,
        '--drawer-list-width': `${width / 16}rem`, // used by the "drawer-list-scale-in" aniation
        top,
        left
      }

      return style
    } catch (e) {
      warn('Could not create makeStyle in DrawerListPortal!', e)
    }
  }

  addPositionObserver() {
    if (typeof window === 'undefined' || this.setPosition) {
      return // stop here
    }

    const renderPosition = () => {
      this.renderPortal()
    }

    // debounce
    this.setPosition = () => {
      // to ensure a smooth scrolling, we COULD avoid a debounce here
      // but this has a negative effect on performance
      // if (this.customElem) {
      //   renderPosition()
      // }

      clearTimeout(this._ddt)
      this._ddt = setTimeout(renderPosition, 30)
    }
    window.addEventListener('resize', this.setPosition)

    this.customElem = isInsideScrollView(this.props.rootRef.current, true)
    if (this.customElem) {
      this.customElem.addEventListener('scroll', this.setPosition)
    }
  }

  removePositionObserver() {
    clearTimeout(this._ddt)
    if (typeof window !== 'undefined' && this.setPosition) {
      if (this.customElem) {
        this.customElem.addEventListener('scroll', this.setPosition)
      }
      window.removeEventListener('resize', this.setPosition)
    }
  }

  renderPortal() {
    const {
      inactive,
      id,
      opened,
      fixedPosition,
      useMobileView,
      children
    } = this.props
    if (inactive) {
      return // stop here
    }

    if (!drawerListPortal[id]) {
      this.createPortal()
    }
    if (opened) {
      this.addPositionObserver()
    }

    const style = opened ? this.makeStyle() : {}

    ReactDOM.render(
      <span
        className={classnames(
          'dnb-drawer-list__portal__style',
          fixedPosition && 'dnb-drawer-list__portal__style--fixed',
          useMobileView && 'dnb-drawer-list__portal__style--mobile-view'
        )}
        style={style}
        ref={this.ref}
      >
        {children}
      </span>,
      drawerListPortal[id].node
    )
  }

  render() {
    const { inactive, children } = this.props
    return inactive ? children : null
  }
}

export default React.forwardRef(function DrawerListPortalRef(props, ref) {
  return <DrawerListPortal innerRef={ref} {...props} />
})
