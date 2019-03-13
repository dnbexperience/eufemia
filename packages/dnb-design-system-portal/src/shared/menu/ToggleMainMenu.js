/**
 * Toggle Main Menu
 *
 */

import React from 'react'
import { MainMenuContext } from './MainMenuContext'
import { Button } from 'dnb-ui-lib/src'
import { isIE11 } from 'dnb-ui-lib/src/shared/helpers'

export const MainMenuToggleButton = () => {
  if (isIE11) {
    return (
      <Button
        variant="primary"
        icon="chevron-left"
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
          icon="chevron-left"
          icon_position="left"
          aria-haspopup="true"
          // aria-controls="portal-main-menu"
          aria-expanded="false"
        />
      )}
    </MainMenuContext.Consumer>
  )
}
