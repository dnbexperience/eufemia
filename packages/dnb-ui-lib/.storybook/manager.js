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
  brandUrl: 'http://localhost:8000/'
})

addons.setConfig({
  theme,
  isFullscreen: true,
  panelPosition: 'right',
  isToolshown: true
})
