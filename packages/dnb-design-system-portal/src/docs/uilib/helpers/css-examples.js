/**
 * UI lib Component Example
 *
 */

import React from 'react'
import styled from '@emotion/styled'
import CodeBlock from 'Src/shared/tags/CodeBlock'

class Example extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <CodeBlock
          reactLive
          hideCode
          caption="Reset CSS inside a wrapper by using `.dnb-core-style`"
          data-dnb-test="helper-core-style"
        >
          {/* @html */ `
<div className="dnb-core-style">
  <h3 className="dnb-h3">Wrapper with the DNB Body Style (CSS reset)</h3>
  <p className="dnb-p">
    Read more about <code className="dnb-code">.dnb-core-style</code>
    and <a href="/uilib/usage/customisation/styling#core-style" className="dnb-anchor">Use Eufemia Styles elsewhere</a>
  </p>
</div>
        `}
        </CodeBlock>
        <CodeBlock reactLive hideCode data-dnb-test="helper-tap-focus">
          {/* @html */ `
<details>
  <summary className="dnb-tab-focus">
    Try to focus me with the Tab key
  </summary>
  My main focus state has been removed and replaced by the
  helping class <code className="dnb-code">.dnb-tab-focus</code>
</details>
        `}
        </CodeBlock>
        <CodeBlock
          reactLive
          hideCode
          caption="I'm an unstyled list `.dnb-unstyled-list`"
          data-dnb-test="helper-unstyled-list"
        >
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
          caption="I'm not visible on small screens `.dnb-hide-on-mobile`"
          data-dnb-test="helper-hide-on-mobile"
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
          data-dnb-test="helper-mobile-exclusive"
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
          caption="I'm inside a `.dnb-width-limit` wrapper"
          data-dnb-test="helper-width-limit"
        >
          {/* @html */ `
<div className="dnb-width-limit">
  I'm inside a .dnb-width-limit wrapper.
</div>
          `}
        </CodeBlock>
        <CodeBlock
          reactLive
          hideCode
          caption="I'm inside a `.dnb-belt`"
          data-dnb-test="helper-belt"
        >
          {/* @html */ `
<div className="dnb-belt">I'm inside a .dnb-belt</div>
          `}
        </CodeBlock>
        <CodeBlock
          reactLive
          hideCode
          caption="I'm a nudge"
          data-dnb-test="helper-nudge"
        >
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
          caption="I am only visible to screen readers `.dnb-sr-only`"
          data-dnb-test="helper-sr-only"
        >
          {/* @html */ `
<p className="dnb-p">
  Hidden text:
  <span className="dnb-sr-only--inline">
    I am only visible to screen readers, so you probably can't see
    me.. Unless you're using a screen reader.
  </span>!
</p>
          `}
        </CodeBlock>
        <CodeBlock
          reactLive
          hideCode
          caption="`.dnb-not-sr-only` I'm the opposite of .dnb-sr-only"
          data-dnb-test="helper-not-sr-only"
        >
          {/* @html */ `
<p className="dnb-p dnb-sr-only dnb-not-sr-only">
  I'm the opposite of .dnb-sr-only, so you should be able to see
  me.
</p>
          `}
        </CodeBlock>
      </React.Fragment>
    )
  }
}

// have a limit because this page is used for screenshot tests
const Wrapper = styled.div`
  max-width: 40rem;
`

export { Example }
export default () => (
  <Wrapper className="dnb-spacing">
    <Example />
  </Wrapper>
)
