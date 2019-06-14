/**
 * Storybook Config
 *
 */

import { addParameters, addDecorator, configure } from '@storybook/react'

addParameters({
  options: {
    brandTitle: 'Eufemia',
    brandUrl: 'https://eufemia.dnb.no',
    isFullscreen: true,
    showNav: false,
    showPanel: false,
    panelPosition: 'right'
  }
})

configure(() => require('../stories'), module)
