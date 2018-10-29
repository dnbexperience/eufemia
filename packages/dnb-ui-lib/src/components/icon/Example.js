/**
 * UI lib Component Example
 *
 */

import React, { Component, Fragment } from 'react'
import Icon from './Icon'
import IconWithAllIcons from './IconWithAllIcons'
// import IconWithLib from '../../icon-with-lib/IconWithLib'
import { bell } from './lib'

class Example extends Component {
  // componentDidMount() {
  //   Icon.enableWebComponent()
  //   IconWithLib.enableWebComponent()
  // }
  static AdditionalCallback = {
    info: ({ CodeRenderer }) => (
      <Fragment>
        <h3>Importing Icons</h3>
        <CodeRenderer language="jsx">{`
// Named import example
import { bell } from './icons'

// In case your environment doesn't support tree-shaking, import the icons is the following way
import bell from './icons/bell'
        `}</CodeRenderer>
      </Fragment>
    )
  }
  render() {
    return (
      <Fragment>
        <IconWithAllIcons icon="question" />
        <IconWithAllIcons icon="chevron_right" width="40" height="40" />
        <Icon icon={bell} modifier="active" size="40" />
      </Fragment>
    )
  }
}

// {/* <Bell width="40" />
// <dnb-icon size="40">
// <Bell width="40" />
// </dnb-icon>
// <dnb-icon-with-lib icon="save" size="40" /> */}
// {/* TODO: Nested Web Components generates an error */}
// {/* <dnb-button
//   variant="secondary"
//   title="Web Component Button with Icon as a child"
//   >
//   <dnb-icon icon="question" height="40" />
// </dnb-button> */}

export { Example }
export default () => <Example />
