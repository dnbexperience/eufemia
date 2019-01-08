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
        <div className="example-box">
          <Notification
            notification_amount={0}
            title_text="Du har ingen notifications"
          />
          <Notification
            notification_amount={2}
            title_text="Du har {amount} notifications"
          />
          <p className="example-caption">
            Left: No notifications. Right 2 notifications
          </p>
        </div>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
