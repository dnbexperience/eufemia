/**
 * To showcase the usage of the dnb-ui-lib with Web Components
 *
 */

import React from 'react'
import { render } from 'react-dom'
import App from './App.jsx'

import 'dnb-ui-lib/style' // Import the global DNB stylesheet
import './App.css'

render(<App />, document.getElementById('app'))
