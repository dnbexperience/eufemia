/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import Notification from './Notification'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <Notification
          notification_amount={2}
          title_text="Du har {amount} notifications"
        />
        <Notification
          notification_amount={2}
          title_text="Du har {amount} notifications"
        />
        <Notification
          notification_amount={0}
          title_text="Du har ingen notifications"
        />
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
