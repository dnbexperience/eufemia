/**
 * Storybook Config
 *
 */

import { create } from '@storybook/theming/create'
import { addParameters, configure } from '@storybook/react'
import stories from '../stories'

addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: 'Eufemia dev',
      brandUrl: 'http://localhost:8000/'
    }),
    isFullscreen: true,
    showNav: false,
    showPanel: false,
    panelPosition: 'right'
  }
})

configure(() => stories, module)
