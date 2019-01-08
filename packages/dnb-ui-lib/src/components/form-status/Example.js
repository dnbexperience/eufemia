/**
 * UI lib Component Example
 *
 */

import React, { PureComponent } from 'react'
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
      <div className="example-box">
        <Input
          label="Input with Status:"
          status={this.state.status}
          value="Input value with status"
        />
        <p className="example-caption">A form label</p>
      </div>
    )
  }
}

export { Example }
export default () => <Example />
