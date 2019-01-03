/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import IconPrimary from './IconPrimary'
import Button from './../button'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <IconPrimary icon="question" />
        <IconPrimary icon="question_medium" />
        <IconPrimary icon="question" size="medium" />
        <Button variant="secondary" size="large">
          <IconPrimary icon="question_medium" size="large" />
        </Button>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
