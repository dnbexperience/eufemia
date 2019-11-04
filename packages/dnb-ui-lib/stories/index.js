/**
 * Storybook Entry
 *
 */

import { storiesOf } from '@storybook/react'

import components from './componentsStories'
import typography from './typographyStories'
import elements from './elementsStories'
import helpers from './helperStories'

// only for testing
// import './legacy'

// for .dnb-core-style usage
import 'dnb-ui-lib/src/style/basis'
import 'dnb-ui-lib/src/style/components'
import 'dnb-ui-lib/src/style/themes/ui'

/* ATTENTION: for testing with IE11, we have to use the build version - make sure to run `yarn build` first */
// import 'dnb-ui-lib/style/dnb-ui-basis.css'
// import 'dnb-ui-lib/style/dnb-ui-components.css'
// // import 'dnb-ui-lib/style/theme-ui/dnb-theme-ui.css'
// // import 'dnb-ui-lib/style/basis'
// // import 'dnb-ui-lib/style/components'
// import 'dnb-ui-lib/style/themes/ui'

/* UI style + theme */
// import '../src/style'
// import '../src/style/elements'

/* only import a component scope style, like Button */
// import '../src/components/button/style'
// import '../src/components/button/style/themes/ui'
// import '../src/style/themes/ui'
/* or use the compiled version */
// import '../style/basis'
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

helpers
  .sort(([a], [b]) => (a > b ? 1 : -1))
  .forEach(component => storiesOf('Helpers', module).add(...component))
