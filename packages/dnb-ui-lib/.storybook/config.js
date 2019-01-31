/**
 * Storybook Config
 *
 */

import { addDecorator, configure } from '@storybook/react'
import { withOptions } from '@storybook/addon-options'

addDecorator(
  withOptions({
    name: 'Eufemia',
    url: 'https://eufemia.dnb.no',
    goFullScreen: false,
    showStoriesPanel: true,
    showAddonPanel: false,
    showSearchBox: false,
    addonPanelInRight: false,
    sortStoriesByKind: false
  })
)

configure(() => require('../stories'), module)
