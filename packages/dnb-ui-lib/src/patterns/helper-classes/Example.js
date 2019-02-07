/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import styled from '@emotion/styled'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <div className="example-box">
          <details>
            <summary className="fake-focus">Try to focus me</summary>
            My main focus state has been removed and replaced by the
            helping class .fake-focus.
          </details>
          <div className="dnb-sr-only">
            I am only visible to screen readers, so you probably can't see
            me.. Unless you're using a screen reader.
          </div>
          <br />
          <div className="dnb-not-sr-only">
            I'm the opposite of .dnb-sr-only, so you should be able to see
            me.
          </div>
          <br />
          <ul className="dnb-unstyled-list">
            <li>I am an unstyled list item</li>
            <li>Me too!</li>
          </ul>
          <br />
          <ul>
            <li>But i'm not.</li>
          </ul>
          <br />
          <div className="dnb-hide-on-mobile">
            Try minimizing your browser window. I'm not visible on small
            screens.
          </div>
          <br />
          <div className="dnb-mobile-exclusive">
            I'm ONLY visible on small screens.
          </div>
          <br />
          <div className="dnb-width-limit">
            I'm inside a .dnb-width-limit wrapper.
          </div>
          <br />
          <div className="dnb-belt">I'm inside a .dnb-belt</div>
          <br />
          <div className="dnb-nudge dnb-nudge--vertical" data-nudges="4">
            I'm a vertical nudge. I have four nudges, which means I am 4
            rem units tall.
          </div>
          <div
            className="dnb-nudge dnb-nudge--horizontal"
            data-nudges="10"
          >
            I'm a horizontal nudge. I have ten nudges, which means I am 10
            rem units wide.
          </div>
          <p className="example-caption">Helper classes</p>
        </div>
      </Fragment>
    )
  }
}

const Wrapper = styled.div`
  padding: 1rem;
`

export { Example }
export default () => (
  <Wrapper className="dnb-spacing">
    <Example />
  </Wrapper>
)
