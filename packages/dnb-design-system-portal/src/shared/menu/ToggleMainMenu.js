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
          variant="primary"
          text="Home"
          title="Eufemia main sections"
          on_click={openMenu}
          icon="chevron-left"
          icon_position="left"
        />
      )}
    </MainMenuContext.Consumer>
  )
}
