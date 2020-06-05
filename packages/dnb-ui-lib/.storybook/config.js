/**
 * Storybook Config
 *
 */

import { addParameters, addDecorator, configure } from '@storybook/react'
import stories from '../stories'

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

configure(() => stories, module)
