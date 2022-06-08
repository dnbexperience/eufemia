/**
 * UI lib Component Example
 *
 */

import React from 'react'
import styled from '@emotion/styled'
import classnames from 'classnames'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import { useHeightAnimation } from '@dnb/eufemia/src/shared/useHeightAnimation'

// have a limit because this page is used for screenshot tests
const Wrapper = styled.div`
  max-width: 40rem;
`

export function HeightAnimationExample() {
  return (
    <ComponentBox useRender scope={{ useHeightAnimation, classnames }}>
      {
        /* jsx */ `
const AnimatedContent = ({
  open = false,
  noAnimation = false,
  ...rest
}) => {
  const animationElement = React.useRef()
  const { isOpen, isInDOM, isVisibleParallax } = useHeightAnimation(
    animationElement,
    {
      open,
      animate: !noAnimation,
    }
  )

  // Optional: You can also entirely remove it from the DOM
  // if (!isInDOM) {
  //   return null
  // }

  return (
    <AnimatedDiv
      className={classnames(
        'wrapper-element',

        // Optional: will toggle immediately
        isOpen && 'is-open',
        
        // Optional: is "true" while the element "should" be in the DOM (during animation)
        isInDOM && 'is-in-dom',
        
        // Optional: is "true" when completely opened, and "false" right after closing has started (usefull for additional CSS transitions/parallax effects)
        isVisibleParallax && 'is-in-parallax'
      )}
      style_type="lavender"
      {...rest}
    >
      {isInDOM /* <-- Optional */ && (
        <div ref={animationElement} className="animation-element">
          <P className="content-element" space={0}>Your content</P>
        </div>
      )}
    </AnimatedDiv>
  )
}

const HeightAnimation = ({ open = false, ...rest }) => {
const [openState, setOpenState] = React.useState(open)

const onChangeHandler = ({ checked }) => {
  setOpenState(checked)
}

return (
  <>
    <ToggleButton checked={openState} onChange={onChangeHandler}>
      Toggle me
    </ToggleButton>

    <AnimatedContent top open={openState} />
  </>
)
}

const AnimatedDiv = styled(Section)\`
  .animation-element {
    overflow: hidden;
    transition: height 1s var(--easing-default);
  }

  .content-element {
    transition: transform 1s var(--easing-default);
    transform: translateY(-2rem);
  }

  &.is-in-parallax .content-element {
    transform: translateY(0);
  }

  .content-element {
    padding: 4rem 0;
  }
\`

render(<HeightAnimation />)
    `
      }
    </ComponentBox>
  )
}

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
