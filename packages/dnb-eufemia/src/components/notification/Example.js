/**
 * UI lib Component Example
 *
 */

import React from 'react'
import Notification from './Notification'

class Example extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
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
      </React.Fragment>
    )
  }
}

export { Example }
export default Example
