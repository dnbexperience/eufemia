/**
 * Main App
 *
 */

import React from 'react'
import MainMenu from 'Src/shared/menu/MainMenu'
import { MainMenuProvider } from 'Src/shared/menu/MainMenuContext'

// react component
export default class App extends React.PureComponent {
  render() {
    return (
      <main aria-label="Choose a menu section">
        <MainMenuProvider isActive>
          <MainMenu />
        </MainMenuProvider>
      </main>
    )
  }
}
