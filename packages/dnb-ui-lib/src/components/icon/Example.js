/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../dnb-design-system-portal/src/shared/tags/ComponentBox'
import { bell_medium as BellMedium, bell as Bell } from './lib'

class Example extends PureComponent {
  static AdditionalCallback = {
    info: ({ CodeRenderer }) => (
      <Fragment>
        <h3>Importing Icons</h3>
        <CodeRenderer language="jsx">{`
// Named import example
import { bell as Bell } from 'dnb-ui-lib/icons'

// In case your environment doesn't support tree-shaking, import the icons this way
import Bell from 'dnb-ui-lib/icons/bell'
        `}</CodeRenderer>
      </Fragment>
    )
  }
  render() {
    return (
      <Fragment>
        <ComponentBox
          data-dnb-test="icon-sizes"
          scope={{ Bell, BellMedium }}
          caption="Default Sizes (Responsive)"
        >
          {/* @jsx */ `
<Icon icon={Bell} title="auto size" />
<Icon icon={BellMedium} title="auto size" />
          `}
        </ComponentBox>

        <ComponentBox
          data-dnb-test="icon-medium"
          scope={{ Bell, BellMedium }}
          caption="Explicit defined size: medium"
        >
          {/* @jsx */ `
<Icon icon={BellMedium} size="16" title="force default size" />
<Icon icon={BellMedium} title="is medium anyway" />
<Icon icon={Bell} size="medium" title="force medium size" />
<Icon icon={Bell} size="24" title="custom size: size=24" />
<Icon
  icon={Bell}
  width="24"
  height="24"
  title="not responsive"
/>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
