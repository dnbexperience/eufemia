/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import Input from '../input/Input'

class Example extends PureComponent {
  state = {
    status: null
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        status: 'You have to fill in this field'
      })
    }, 400)
  }
  render() {
    return (
      <Fragment>
        <div className="example-box">
          <Input
            label="Input with Status:"
            status={this.state.status}
            value="Input value with status"
          />
          <p className="example-caption">A form status</p>
        </div>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
