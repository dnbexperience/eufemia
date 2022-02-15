/**
 * Storybook Config
 *
 */

import { addons } from '@storybook/addons'
import { create } from '@storybook/theming/create'

const theme = create({
  base: 'light',
  colorPrimary: '#007272',
  colorSecondary: '#a5e1d2',
  brandTitle: 'Eufemia dev',
  brandUrl: 'http://localhost:8002/',
})

addons.setConfig({
  theme,
  isFullscreen: false,
  isToolshown: true,
  showPanel: true,
  panelPosition: 'left',
})
