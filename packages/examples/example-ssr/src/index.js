/**
 * To showcase the usage of the dnb-ui-lib in React
 *
 */

import React from 'react'
import { render } from 'react-dom'
import App from './App.jsx'

// Custom Eufemia import, instead of effecting the body reset with 'dnb-ui-lib/style'
// import 'dnb-ui-lib/style' // Import the global DNB stylesheet
import 'dnb-ui-lib/style/basis'
import 'dnb-ui-lib/style/components'
import 'dnb-ui-lib/style/themes/ui'

import './App.css'

render(<App />, document.getElementById('app'))
