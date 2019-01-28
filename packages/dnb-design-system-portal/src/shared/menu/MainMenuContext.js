/**
 * MainMenu Provider
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export const MainMenuContext = React.createContext({
  // just to have som default values (to avoid destructuring error later)
  toggleMenu: null,
  openMenu: null,
  closeMenu: null,
  isOpen: null,
  isClosing: null,
  isActive: false
})

export class MainMenuProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired
  }
  constructor(props) {
    super(props)

    this.state = {
      ...{
        isOpen: false,
        isClosing: false,
        isActive: false
      },
      ...props
    }
    // console.log('MainMenuProvider', this.state)
  }

  toggleMenu = (state = null) => {
    if (state === null) {
      state = this.state.isOpen
    }
    clearTimeout(this.timeout)
    this.timeout = setTimeout(
      () => {
        const isOpen = !state
        this.setState({
          isOpen,
          isClosing: false,
          isActive: isOpen
        })
      },
      state ? 860 : 260
    )
    this.setState({
      isClosing: state,
      isActive: true
    })
    if (!state && typeof window !== 'undefined') {
      try {
        window.scrollTo(0, 0)
      } catch (e) {
        console.log('Could not run scrollTo', e)
      }
    }
  }

  openMenu = () => {
    this.toggleMenu(false)
  }

  closeMenu = () => {
    this.toggleMenu(true)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    const { children } = this.props

    return (
      <MainMenuContext.Provider
        value={{
          toggleMenu: this.toggleMenu,
          openMenu: this.openMenu,
          closeMenu: this.closeMenu,
          ...this.state
          // isOpen: this.state.isOpen,
          // isClosing: this.state.isClosing,
          // isActive: this.state.isActive
        }}
      >
        {children}
      </MainMenuContext.Provider>
    )
  }
}

export const MainMenuConsumer = MainMenuContext.Consumer
