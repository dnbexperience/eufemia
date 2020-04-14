/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'

class Example extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <ComponentBox title="Default and Medium sized icons (responsive)">
          {/* @jsx */ `
<IconPrimary icon="question" title="Give icons a title" />
<IconPrimary
  icon="question_medium"
  title="Size defined in name"
  aria-hidden
/>
          `}
        </ComponentBox>
        <ComponentBox title="Default Icon with custom, but fixed size (64)">
          {/* @jsx */ `
<IconPrimary
  icon="question"
  size="64"
  title="I'm not responsive!"
/>
          `}
        </ComponentBox>
      </React.Fragment>
    )
  }
}

export default Example
