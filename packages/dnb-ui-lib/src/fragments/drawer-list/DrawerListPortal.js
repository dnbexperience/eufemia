/**
 * Web DrawerList Component
 *
 */

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { isInsideScrollView } from '../../shared/component-helper'

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
    ownerRef: PropTypes.shape({
      current: PropTypes.oneOfType([PropTypes.node, PropTypes.object])
    }).isRequired,
    inactive: PropTypes.bool
  }

  static defaultProps = {
    ownerRef: { current: null },
    innerRef: null,
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
        drawerListPortal[this.props.id] = {
          node: document.createElement('div')
        }
        drawerListPortal[this.props.id].node.className =
          'dnb-drawer-list__portal dnb-core-style'
        document.body.appendChild(drawerListPortal[this.props.id].node)
      } catch (e) {
        console.warn('Could not create DrawerListPortal!', e)
      }
    }
  }

  makeStyle() {
    try {
      const { ownerRef } = this.props
      const ownerElem = ownerRef.current

      const rect = ownerElem.getBoundingClientRect()
      const scrollY =
        window.scrollY !== undefined ? window.scrollY : window.pageYOffset
      const scrollX =
        window.scrollX !== undefined ? window.scrollX : window.pageXOffset

      const { width } = window.getComputedStyle(ownerElem.parentElement)

      const top = scrollY + rect.top
      const left = scrollX + rect.left

      // const listElem = targetElem.querySelector('.dnb-drawer-list__list')
      // const { minWidth } = window.getComputedStyle(listElem)

      return {
        width,
        top,
        left
      }
    } catch (e) {
      console.warn('Could not create makeStyle in DrawerListPortal!', e)
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

    this.customElem = isInsideScrollView(this.props.ownerRef.current, true)
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
    const { inactive, id, opened, children } = this.props
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
        className="dnb-drawer-list__portal__style"
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
