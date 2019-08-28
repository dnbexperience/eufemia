/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox caption="Default and Medium sized icons (responsive)">
          {/* @jsx */ `
<IconPrimary icon="question" title="Give icons a title" />
<IconPrimary
  icon="question_medium"
  title="Size defined in name"
  aria-hidden
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Default Icon with custom, but fixed size (64)">
          {/* @jsx */ `
<IconPrimary
  icon="question"
  size="64"
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
