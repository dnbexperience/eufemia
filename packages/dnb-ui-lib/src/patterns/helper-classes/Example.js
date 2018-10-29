/**
 * UI lib Component Example
 *
 */

import React, { Component, Fragment } from 'react'
import { css, cx } from 'react-emotion'

class Example extends Component {
  render() {
    return (
      <Fragment>
        <details>
          <summary className="dnb-fake-focus">Try to focus me</summary>
          My main focus state has been removed and replaced by the helping
          class .dnb-fake-focus.
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
          I'm a vertical nudge. I have four nudges, which means I am 4 rem
          units tall.
        </div>
        <div className="dnb-nudge dnb-nudge--horizontal" data-nudges="6">
          I'm a horizontal nudge. I have five nudges, which means I am 5
          rem units wide.
        </div>
      </Fragment>
    )
  }
}

export { Example }
export default () => (
  <div
    className={cx(
      'dnb-body',
      // 'styleguide--padding',
      css`
        padding: 1rem;
      `
    )}
  >
    <Example />
  </div>
)
