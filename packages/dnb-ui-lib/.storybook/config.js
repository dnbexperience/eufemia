/**
 * Storybook Config
 *
 */

import { addParameters, addDecorator, configure } from '@storybook/react'

addParameters({
  options: {
    brandTitle: 'Eufemia',
    brandUrl: 'https://eufemia.dnb.no'
  }
})

configure(() => require('../stories'), module)
