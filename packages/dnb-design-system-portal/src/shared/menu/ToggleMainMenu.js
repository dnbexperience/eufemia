/**
 * Toggle Main Menu
 *
 */

import React from 'react'
import { MainMenuContext } from './MainMenuContext'
import { Button } from '@dnb/eufemia/src'
import { IS_IE11 } from '@dnb/eufemia/src/shared/helpers'

export const MainMenuToggleButton = () => {
  if (IS_IE11) {
    return (
      <Button
        variant="primary"
        icon="chevron_left"
        icon_position="left"
        text="Home"
        href="/"
      />
    )
  }
  return (
    <MainMenuContext.Consumer>
      {({ openMenu }) => (
        <Button
          id="toggle-main-menu"
          variant="primary"
          text="Home"
          title="Eufemia main sections"
          on_click={openMenu}
          icon="chevron_left"
          icon_position="left"
          aria-haspopup="true"
          // aria-controls="portal-main-menu"
          aria-expanded="false"
        />
      )}
    </MainMenuContext.Consumer>
  )
}
