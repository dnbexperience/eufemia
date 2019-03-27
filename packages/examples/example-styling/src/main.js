/**
 * To showcase legacy styling with the dnb-ui-lib
 *
 */

import React from 'react'
import { render } from 'react-dom'
import App from './App'

// 2. My App styles
import './App.css'

// 3. Custom Eufemia import
import 'dnb-ui-lib/style/basis'
import 'dnb-ui-lib/style/components'
import 'dnb-ui-lib/style/themes/ui'

// 4. We dont import this, as we will have controll
// import 'dnb-ui-lib/style'; // Import the global DNB stylesheet

render(<App />, document.getElementById('app'))
