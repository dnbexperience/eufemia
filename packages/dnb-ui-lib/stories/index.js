/**
 * Storybook Entry
 *
 */

import { storiesOf } from '@storybook/react'
import { components } from './storybookExamples'

const stories = storiesOf('UI Components', module)
components.forEach(component => stories.add(...component))
