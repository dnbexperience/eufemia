/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../dnb-design-system-portal/src/shared/tags/ComponentBox'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox caption="Default and Medium sized Icons (Responsive)">
          {/* @jsx */ `
<IconPrimary icon="question" title="Give Icons a Title" />
<IconPrimary
  icon="question_medium"
  title="Size defined in name"
  aria-hidden
/>
<IconPrimary
  icon="question"
  size="medium"
  title="Size defined in size prop"
  aria-hidden
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Default Icon with custom, but fixed size">
          {/* @jsx */ `
<IconPrimary
  icon="question"
  size="40"
  title="I'm not responsive!"
/>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
