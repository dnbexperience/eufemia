/**
 * Toggle Main Menu
 *
 */

import React from 'react'
import { MainMenuConsumer } from './MainMenuContext'
// import { ToggleMenu } from './MainMenuGraphics'
import {
  // Icon,
  Button
} from 'dnb-ui-lib/src'

export const MainMenuToggleButton = () => {
  return (
    <MainMenuConsumer>
      {({ openMenu }) => (
        <Button
          variant="primary"
          text="Home"
          title="Eufemia main sections"
          on_click={openMenu}
          // icon={ToggleMenu}
          icon="chevron-left"
          icon_position="left"
        />
      )}
    </MainMenuConsumer>
  )
}

// //
// <Button
//   title="Eufemia main sections"
//   className="main-menu-toggle dnb-button--reset"
//   on_click={openMenu}
//   >
//   <Icon icon={ToggleMenu} size={24} aria-hidden />
//   <span className="dnb-button__text" aria-hidden>
//     Startsite
//   </span>
// </Button>
