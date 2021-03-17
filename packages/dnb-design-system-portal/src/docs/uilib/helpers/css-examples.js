/**
 * UI lib Component Example
 *
 */

import React from 'react'
import styled from '@emotion/styled'
import ComponentBox from 'Src/shared/tags/ComponentBox'

class Example extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <ComponentBox
          reactLive
          hideCode
          caption="Reset CSS inside a wrapper by using `.dnb-core-style`"
          data-visual-test="helper-core-style"
        >
          {
            /* @html */ `
<div className="dnb-core-style">
  <h3 className="dnb-h--medium">Wrapper with the DNB Body Style (CSS reset)</h3>
  <p className="dnb-p">
    Read more about <code className="dnb-code">.dnb-core-style</code>
    and <a href="/uilib/usage/customisation/styling#core-style" className="dnb-anchor">Use Eufemia Styles elsewhere</a>
  </p>
</div>
        `
          }
        </ComponentBox>
        <ComponentBox
          reactLive
          hideCode
          data-visual-test="helper-tap-focus"
        >
          {
            /* @html */ `
<details>
  <summary className="dnb-tab-focus">
    Try to focus me with the Tab key
  </summary>
  My main focus state has been removed and replaced by the
  helping class <code className="dnb-code">.dnb-tab-focus</code>
</details>
        `
          }
        </ComponentBox>
        <ComponentBox
          reactLive
          hideCode
          caption="I'm an unstyled list `.dnb-unstyled-list`"
          data-visual-test="helper-unstyled-list"
        >
          {
            /* @html */ `
<ul className="dnb-unstyled-list">
  <li>I'm an unstyled list item</li>
  <li>Me too!</li>
</ul>
<hr className="dnb-hr" />
<ul className="dnb-ul">
  <li>But i'm not.</li>
</ul>
          `
          }
        </ComponentBox>
        <ComponentBox
          reactLive
          hideCode
          caption="I am only visible to screen readers `.dnb-sr-only`"
          data-visual-test="helper-sr-only"
        >
          {
            /* @html */ `
<p className="dnb-p">
  Hidden text:
  <span className="dnb-sr-only--inline">
    I am only visible to screen readers, so you probably can't see
    me.. Unless you're using a screen reader.
  </span>!
</p>
          `
          }
        </ComponentBox>
        <ComponentBox
          reactLive
          hideCode
          caption="`.dnb-not-sr-only` I'm the opposite of .dnb-sr-only"
          data-visual-test="helper-not-sr-only"
        >
          {
            /* @html */ `
<p className="dnb-p dnb-sr-only dnb-not-sr-only">
  I'm the opposite of .dnb-sr-only, so you should be able to see
  me.
</p>
          `
          }
        </ComponentBox>
      </React.Fragment>
    )
  }
}

// have a limit because this page is used for screenshot tests
const Wrapper = styled.div`
  max-width: 40rem;
`

export default function StyledExample() {
  return (
    <Wrapper className="dnb-spacing">
      <Example />
    </Wrapper>
  )
}
