/**
 * Sidebar menu Provider
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

const SidebarMenuContext = React.createContext()

export class SidebarMenuProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  toggleMenu = () => {
    const isOpen = !this.state.isOpen
    this.setState({
      isOpen
    })
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

  render() {
    const { children } = this.props

    return (
      <SidebarMenuContext.Provider
        value={{
          toggleMenu: this.toggleMenu,
          openMenu: this.openMenu,
          closeMenu: this.closeMenu,
          isOpen: this.state.isOpen
        }}
      >
        {children}
      </SidebarMenuContext.Provider>
    )
  }
}

export const SidebarMenuConsumer = SidebarMenuContext.Consumer
