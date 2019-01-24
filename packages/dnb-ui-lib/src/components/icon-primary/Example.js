/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import IconPrimary from './IconPrimary'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <IconPrimary icon="question" title="default size" />
        <IconPrimary
          icon="question_medium"
          title="medium size in icon name"
        />
        <IconPrimary
          icon="question"
          size="medium"
          title="medium size defined in size prop"
        />
        <IconPrimary
          icon="question"
          size="40"
          title="default sized icon with custom size"
        />
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
