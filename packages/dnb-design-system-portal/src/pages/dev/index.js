/**
 * Main App
 *
 */

import React, { PureComponent, Fragment } from 'react'
import { Button } from 'dnb-ui-lib/src'

export default class App extends PureComponent {
  render() {
    return (
      <Fragment>
        Hello <Button text="Button" />
      </Fragment>
    )
  }
}
