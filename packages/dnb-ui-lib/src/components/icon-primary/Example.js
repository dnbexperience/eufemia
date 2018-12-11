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
        <IconPrimary icon="question" />
        <IconPrimary icon="question_medium" />
        <IconPrimary icon="question" size="medium" />
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
