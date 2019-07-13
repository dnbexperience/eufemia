/**
 * Main App
 *
 */

import React, { PureComponent } from 'react'
import MainMenu from 'Src/shared/menu/MainMenu'
import { MainMenuProvider } from 'Src/shared/menu/MainMenuContext'

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
