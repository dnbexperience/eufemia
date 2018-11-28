/**
 * Main App
 *
 */

import React, { PureComponent, Fragment } from 'react'
import StickyMenuBar from '../shared/menu/StickyMenuBar'
import MainMenu from '../shared/menu/MainMenu'

// UI Style
import 'dnb-ui-lib/src/style/patterns' // import ony patterns
import 'dnb-ui-lib/src/style' // import both all components and the defualt theme

// react component
export default class App extends PureComponent {
  render() {
    return (
      <Fragment>
        <StickyMenuBar />
        <MainMenu />
      </Fragment>
    )
  }
}
