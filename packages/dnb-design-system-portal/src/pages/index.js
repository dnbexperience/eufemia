/**
 * Main App
 *
 */

import React, { Component, Fragment } from 'react'
import StickyMenuBar from '../shared/menu/StickyMenuBar'
import MainMenu from '../shared/menu/MainMenu'

// UI Style
import 'dnb-ui-lib/src/style'
import 'dnb-ui-lib/src/patterns/style'

// react component
export default class App extends Component {
  render() {
    return (
      <Fragment>
        <StickyMenuBar />
        <MainMenu />
      </Fragment>
    )
  }
}
