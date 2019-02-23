/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import CodeBlock from '../../../shared/tags/CodeBlock'
import styled from '@emotion/styled'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <CodeBlock reactLive hideCode>
          {/* @html */ `
<div className="dnb-section">
  Visuall DNB Section
</div>
<div className="dnb-section dnb-section--content">
  Visuall DNB Section, declared with <code className="dnb-code">.dnb-section--content</code>
</div>
        `}
        </CodeBlock>
        <CodeBlock reactLive hideCode>
          {/* @html */ `
<div class="dnb-core-style">
  <h3 className="dnb-h3">Wrapper with the DNB Body Style (CSS reset)</h3>
</div>
        `}
        </CodeBlock>
        <CodeBlock reactLive hideCode>
          {/* @html */ `
<details>
  <summary className="dnb-tab-focus">
    Try to focus me with the Tab key
  </summary>
  My main focus state has been removed and replaced by the
  helping class .fake-focus.
</details>
        `}
        </CodeBlock>
        <CodeBlock reactLive hideCode>
          {/* @html */ `
<ul className="dnb-unstyled-list">
  <li>I'm an unstyled list item</li>
  <li>Me too!</li>
</ul>
<hr className="dnb-hr" />
<ul className="dnb-ul">
  <li>But i'm not.</li>
</ul>
          `}
        </CodeBlock>
        <CodeBlock
          reactLive
          hideCode
          caption="I'm not visible on small screens"
        >
          {/* @html */ `
<div className="dnb-hide-on-mobile">
  Try minimizing your browser window. I'm not visible on small screens.
</div>
          `}
        </CodeBlock>
        <CodeBlock
          reactLive
          hideCode
          caption="I'm ONLY visible on small screens"
        >
          {/* @html */ `
<div className="dnb-mobile-exclusive">
  I'm ONLY visible on small screens.
</div>
          `}
        </CodeBlock>
        <CodeBlock
          reactLive
          hideCode
          caption="I'm inside a .dnb-width-limit wrapper"
        >
          {/* @html */ `
<div className="dnb-width-limit">
  I'm inside a .dnb-width-limit wrapper.
</div>
          `}
        </CodeBlock>
        <CodeBlock reactLive hideCode caption="I'm inside a .dnb-belt">
          {/* @html */ `
<div className="dnb-belt">I'm inside a .dnb-belt</div>
          `}
        </CodeBlock>
        <CodeBlock reactLive hideCode caption="I'm a nudge">
          {/* @html */ `
<div className="dnb-nudge dnb-nudge--vertical" data-nudges="4">
I'm a vertical nudge. I have four nudges, which means I am 4rem units tall.
</div>
<div
  className="dnb-nudge dnb-nudge--horizontal"
  data-nudges="10"
>
  I'm a horizontal nudge. I have ten nudges, which means I am 10rem units wide.
</div>
          `}
        </CodeBlock>
        <CodeBlock
          reactLive
          hideCode
          caption="I am only visible to screen readers"
        >
          {/* @html */ `
<div className="dnb-sr-only">
  I am only visible to screen readers, so you probably can't see
  me.. Unless you're using a screen reader.
</div>
          `}
        </CodeBlock>
        <CodeBlock
          reactLive
          hideCode
          caption="I'm the opposite of .dnb-sr-only"
        >
          {/* @html */ `
<div className="dnb-not-sr-only">
  I'm the opposite of .dnb-sr-only, so you should be able to see
  me.
</div>
          `}
        </CodeBlock>
      </Fragment>
    )
  }
}

const Wrapper = styled.div`
  /*
  *
  * Helper Classes - some of them need
  * visualising to see their effect
  */

  .dnb-nudge--vertical {
    background-color: var(--color-mint-green-50);
  }

  .dnb-nudge--horizontal {
    background-color: var(--color-mint-green-50);
  }
`

export { Example }
export default () => (
  <Wrapper className="dnb-spacing">
    <Example />
  </Wrapper>
)
