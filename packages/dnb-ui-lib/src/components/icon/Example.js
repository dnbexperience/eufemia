/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import Icon from './Icon'
import { bell_medium as BellMedium, bell as Bell } from './lib'

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
        <div className="example-box">
          <Icon icon={Bell} />
          <Icon icon={BellMedium} />
          <p className="example-caption">Default Sizes (Responsive)</p>
        </div>
        <div className="example-box">
          <Icon icon={BellMedium} title="auto size" />
          <Icon icon={BellMedium} size="medium" title="size=medium" />
          <Icon icon={BellMedium} size="24" title="custom size: size=24" />
          <Icon
            icon={BellMedium}
            height="24"
            title="custom size: height=24"
          />
          <Icon
            icon={BellMedium}
            width="24"
            title="custom size: width=24"
          />
          <p className="example-caption">Explicit defined size: medium</p>
        </div>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
