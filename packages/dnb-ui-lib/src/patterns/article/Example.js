/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import Article from './Article'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <Article>
          <h1>
            <small>My small H1 </small>
          </h1>
          <h2>My H2</h2>
          <p>
            Vivamus litora imperdiet placerat aenean venenatis congue nec
            porttitor risus
          </p>
        </Article>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
