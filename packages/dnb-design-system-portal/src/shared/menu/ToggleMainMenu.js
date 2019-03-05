/**
 * Toggle Main Menu
 *
 */

import React from 'react'
import { MainMenuContext } from './MainMenuContext'
import { Button } from 'dnb-ui-lib/src'

export const MainMenuToggleButton = () => {
  return (
    <MainMenuContext.Consumer>
      {({ openMenu }) => (
        <Button
          id="toggle-main-menu"
          variant="primary"
          text="Home"
          title="Eufemia main sections"
          on_click={openMenu}
          icon="chevron-left"
          icon_position="left"
          aria-haspopup="true"
          aria-controls="portal-main-menu"
          aria-expanded="false"
        />
      )}
    </MainMenuContext.Consumer>
  )
}
