/**
 * Storybook Entry
 *
 */

import { storiesOf } from '@storybook/react'
import { components } from './components'

const stories = storiesOf('UI Components', module)
components.forEach(component => stories.add(...component))
