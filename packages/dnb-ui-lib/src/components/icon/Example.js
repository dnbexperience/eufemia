/**
 * UI lib Component Example
 *
 */

import React, { Component, Fragment } from 'react'
import Icon from './Icon'
import IconWithAllIcons from './IconWithAllIcons'
import { bell_medium as Bell } from './lib'

class Example extends Component {
  static AdditionalCallback = {
    info: ({ CodeRenderer }) => (
      <Fragment>
        <h3>Importing Icons</h3>
        <CodeRenderer language="jsx">{`
// Named import example
import { bell } from './icons'

// In case your environment doesn't support tree-shaking, import the icons this way
import bell from './icons/bell'
        `}</CodeRenderer>
      </Fragment>
    )
  }
  render() {
    return (
      <Fragment>
        <IconWithAllIcons icon="question" />
        <IconWithAllIcons icon="chevron_right_medium" />
        <Icon icon={Bell} size="32" />
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
