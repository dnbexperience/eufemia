/**
 * Main App
 *
 */

import React, { PureComponent } from 'react'
import StickyMenuBar from '../shared/menu/StickyMenuBar'
import MainMenu from '../shared/menu/MainMenu'
import { MainMenuProvider } from '../shared/menu/MainMenuContext'

// react component
export default class App extends PureComponent {
  render() {
    return (
      <MainMenuProvider isActive>
        <StickyMenuBar hideSiebarToggleButton={true} />
        <MainMenu />
      </MainMenuProvider>
    )
  }
}
