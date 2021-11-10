/**
 * Main App
 *
 */

import React from 'react'
import MainMenu from 'dnb-design-system-portal/src/shared/menu/MainMenu'
import { MainMenuProvider } from 'dnb-design-system-portal/src/shared/menu/MainMenuContext'

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
