/**
 * Toggle Main Menu
 *
 */

import React from 'react'
import { MainMenuConsumer } from './MainMenuContext'
import { Button } from 'dnb-ui-lib/src'

export const MainMenuToggleButton = () => {
  return (
    <MainMenuConsumer>
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
    </MainMenuConsumer>
  )
}
