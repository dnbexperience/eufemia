/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import Icon from './Icon'
import { bell_medium as Bell } from './lib'

class Example extends PureComponent {
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
        <Icon icon={Bell} size="32" />
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
