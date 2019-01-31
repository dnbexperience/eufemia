/**
 * Storybook Entry
 *
 */

import { storiesOf } from '@storybook/react'

import components from './componentsStories'
import typography from './typographyStories'
import elements from './elementsStories'

// ATTENTION: for testing with IE11, we have to use the build version - make sure to run `yarn build` first
// import '../style'

// UI style + theme
import '../src/style'

components
  .sort(([a], [b]) => (a > b ? 1 : -1))
  .forEach(props => storiesOf('Components', module).add(...props))

typography
  .sort(([a], [b]) => (a > b ? 1 : -1))
  .forEach(props => storiesOf('Typography', module).add(...props))

elements
  .sort(([a], [b]) => (a > b ? 1 : -1))
  .forEach(component => storiesOf('Elements', module).add(...component))
