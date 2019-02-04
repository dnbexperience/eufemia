/**
 * Storybook Entry
 *
 */

import { storiesOf } from '@storybook/react'

import components from './componentsStories'
import typography from './typographyStories'
import elements from './elementsStories'

/* ATTENTION: for testing with IE11, we have to use the build version - make sure to run `yarn build` first */
// import '../style'

/* UI style + theme */
import '../src/style'

/* only import a component scope style, like Button */
// import '../src/components/button/style/dnb-button.scss'
// import '../src/components/button/style/themes/dnb-button-theme-ui.scss'
// import '../src/style/themes/dnb-theme-ui.scss'
/* or use the compiled version */
// import '../components/button/style/dnb-button.css'
// import '../components/button/style/themes/dnb-button-theme-ui.css'
// import '../style/themes/dnb-theme-ui.css'

components
  .sort(([a], [b]) => (a > b ? 1 : -1))
  .forEach(props => storiesOf('Components', module).add(...props))

typography
  .sort(([a], [b]) => (a > b ? 1 : -1))
  .forEach(props => storiesOf('Typography', module).add(...props))

elements
  .sort(([a], [b]) => (a > b ? 1 : -1))
  .forEach(component => storiesOf('Elements', module).add(...component))
