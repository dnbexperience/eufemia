/**
 * SidebarMenu Provider
 *
 */

import React from 'react'

export const SidebarMenuContext = React.createContext({
  // just to have some default values (to avoid destructuring error later)
  toggleMenu: null,
  openMenu: null,
  closeMenu: null,
  isOpen: null,
  isClosing: null,
})

type Props = {
  children: React.ReactNode
}

export class SidebarMenuProvider extends React.PureComponent<Props> {
  state = {
    isOpen: false,
    isClosing: false,
  }

  timeout: NodeJS.Timeout
  lastScrollPosition: number

  toggleMenu = () => {
    clearTimeout(this.timeout)
    // scroll to top on opening the menu, and back again
    if (!this.state.isOpen && typeof window !== 'undefined') {
      try {
        // use "window.pageYOffset" instead of "window.scrollY" because IE
        this.lastScrollPosition = window.pageYOffset
      } catch (e) {
        console.log('Could not get scrollY', e)
      }
    }
    this.timeout = setTimeout(
      () => {
        const isOpen = !this.state.isOpen
        this.setState({
          isOpen,
          isClosing: false,
        })
        setTimeout(() => {
          try {
            if (!isOpen && typeof window !== 'undefined') {
              const top = this.lastScrollPosition
              window.scrollTo({
                top,
                behavior: 'smooth',
              })
            }
          } catch (e) {
            console.log('Could not run scrollTo', e)
          }
        }, 100) // after animation is done
      },
      this.state.isOpen ? 260 : 10,
    )
    if (this.state.isOpen) {
      this.setState({
        isClosing: true,
      })
    } else if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
      })
    }
  }

  openMenu = () => {
    this.setState({
      isOpen: true,
    })
  }

  closeMenu = () => {
    this.setState({
      isOpen: false,
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
          ...this.state,
        }}
      >
        {children}
      </SidebarMenuContext.Provider>
    )
  }
}
