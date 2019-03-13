/**
 * Main App
 *
 */

import React, { PureComponent } from 'react'
import MainMenu from '../shared/menu/MainMenu'
import { MainMenuProvider } from '../shared/menu/MainMenuContext'

// react component
export default class App extends PureComponent {
  render() {
    return (
      <MainMenuProvider isActive>
        <MainMenu />
      </MainMenuProvider>
    )
  }
}
