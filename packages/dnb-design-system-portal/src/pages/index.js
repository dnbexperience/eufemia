/**
 * Main App
 *
 */

import React, { PureComponent, Fragment } from 'react'
import StickyMenuBar from '../shared/menu/StickyMenuBar'
import MainMenu from '../shared/menu/MainMenu'

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
