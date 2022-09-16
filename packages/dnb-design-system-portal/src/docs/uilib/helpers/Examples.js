/**
 * UI lib Component Example
 *
 */

import React from 'react'
import styled from '@emotion/styled'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

// have a limit because this page is used for screenshot tests
const Wrapper = styled.div`
  max-width: 40rem;
`

export function CoreStyleExample() {
  return (
    <Wrapper className="dnb-spacing">
      <ComponentBox hideCode data-visual-test="helper-core-style">
        {
          /* jsx */ `
<div className="dnb-core-style">
  <h3 className="dnb-h--medium">Wrapper with the DNB Body Style (CSS reset)</h3>
  <p className="dnb-p">
    Read more about <code className="dnb-code">.dnb-core-style</code>{' '}
    and <a href="/uilib/usage/customisation/styling#core-style" className="dnb-anchor">Use Eufemia Styles elsewhere</a>
  </p>
</div>
        `
        }
      </ComponentBox>
    </Wrapper>
  )
}

export function TabFocusExample() {
  return (
    <Wrapper className="dnb-spacing">
      <ComponentBox hideCode data-visual-test="helper-tap-focus">
        {
          /* jsx */ `
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
    </Wrapper>
  )
}

export function UnstyledListExample() {
  return (
    <Wrapper className="dnb-spacing">
      <ComponentBox hideCode data-visual-test="helper-unstyled-list">
        {
          /* jsx */ `
<ul className="dnb-unstyled-list">
  <li>I'm an unstyled list item</li>
  <li>Me too!</li>
</ul>
<hr className="dnb-hr" />
<ul className="dnb-ul">
  <li>But I'm not.</li>
</ul>
        `
        }
      </ComponentBox>
    </Wrapper>
  )
}

export function ScreenReaderOnlyExample() {
  return (
    <Wrapper className="dnb-spacing">
      <ComponentBox hideCode data-visual-test="helper-sr-only">
        {
          /* jsx */ `
<p className="dnb-p">
  Hidden text
  <span className="dnb-sr-only--inline">
    I am only visible to screen readers, so you probably can't see
    me. Unless you're using a screen reader.
  </span>!
</p>
        `
        }
      </ComponentBox>
    </Wrapper>
  )
}

export function NoScreenReaderExample() {
  return (
    <Wrapper className="dnb-spacing">
      <ComponentBox hideCode data-visual-test="helper-not-sr-only">
        {
          /* jsx */ `
<p className="dnb-p dnb-sr-only dnb-not-sr-only">
  I'm the opposite of .dnb-sr-only, so you should be able to see
  me.
</p>
        `
        }
      </ComponentBox>
    </Wrapper>
  )
}

export function SelectionExample() {
  return (
    <Wrapper className="dnb-spacing">
      <ComponentBox hideCode data-visual-test="helper-selection">
        {
          /* jsx */ `
<p className="dnb-selection dnb-p__size--basis">
  If you select a part of this text, you will see the selection highlight is green.
</p>
        `
        }
      </ComponentBox>
    </Wrapper>
  )
}
