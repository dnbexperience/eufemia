/**
 * Sidebar menu Provider
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const SidebarMenuContext = React.createContext({
  // just to have som default values (to avoid destructuring error later)
  toggleMenu: null,
  openMenu: null,
  closeMenu: null,
  isOpen: null,
  isClosing: null
})

export class SidebarMenuProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired
  }
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      isClosing: false
    }
  }

  toggleMenu = () => {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(
      () => {
        const isOpen = !this.state.isOpen
        this.setState({
          isOpen,
          isClosing: false
        })
      },
      this.state.isOpen ? 260 : 0
    )
    if (this.state.isOpen)
      this.setState({
        isClosing: true
      })
    if (!this.state.isOpen && typeof window !== 'undefined') {
      try {
        window.scrollTo(0, 0)
      } catch (e) {
        console.log('Could not run scrollTo', e)
      }
    }
  }

  openMenu = () => {
    this.setState({
      isOpen: true
    })
  }

  closeMenu = () => {
    this.setState({
      isOpen: false
    })
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    const { children } = this.props

    return (
      <SidebarMenuContext.Provider
        value={{
          toggleMenu: this.toggleMenu,
          openMenu: this.openMenu,
          closeMenu: this.closeMenu,
          isOpen: this.state.isOpen,
          isClosing: this.state.isClosing
        }}
      >
        {children}
      </SidebarMenuContext.Provider>
    )
  }
}

export const SidebarMenuConsumer = SidebarMenuContext.Consumer
