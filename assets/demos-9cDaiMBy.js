import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{t as n}from"./Anchor-VfvEVqst.js";import{u as r}from"./FormStatus-DyD2Q-ji.js";import{t as i}from"./Button-CMFzxkr4.js";import{t as a}from"./P-avM674pJ.js";import{t as o}from"./Section-BidpVCcL.js";import{t as s}from"./ToggleButton-BtQrsiHY.js";import{W as c}from"./index-D7e1avVt.js";import{t as l}from"./ComponentBox-CE7bpcJy.js";var u=e(t());function d(){return(0,u.jsx)(l,{stableName:`HeightAnimationDefault`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { HeightAnimation, ToggleButton, Section, Button, Anchor, P } from '@dnb/eufemia'`],__buildScope:{ToggleButton:s,Section:o,HeightAnimation:r,P:a},noInline:!0,children:`const Example = () => {
  const [openState, setOpenState] = useState(false)
  const [contentState, setContentState] = useState(false)
  const onChangeHandler = ({ checked }) => {
    setOpenState(checked)
  }
  return (
    <>
      <ToggleButton checked={openState} onChange={onChangeHandler} right>
        Open/close
      </ToggleButton>
      <ToggleButton
        checked={contentState || !openState}
        disabled={!openState}
        onChange={({ checked }) => {
          setContentState(checked)
        }}
        space={{
          top: true,
          bottom: true,
        }}
      >
        Change height inside
      </ToggleButton>

      <Section variant="information" top>
        <HeightAnimation open={openState}>
          <Section
            innerSpace={{
              block: 'large',
            }}
            variant="information"
          >
            <P space={0}>Your content</P>
          </Section>
          {contentState && <P space={0}>More content</P>}
        </HeightAnimation>
      </Section>

      <P top>Look at me 👀</P>
    </>
  )
}
render(<Example />)
`})}function f(){return(0,u.jsx)(l,{stableName:`HeightAnimationAutosizing`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { HeightAnimation, ToggleButton, Section, Button, Anchor, P } from '@dnb/eufemia'`],__buildScope:{HeightAnimation:r,Button:i,Anchor:n,P:a},noInline:!0,children:`const Example = () => {
  const [showMe, setShowMe] = useState(true)
  return (
    <>
      <HeightAnimation showOverflow>
        {showMe ? (
          <Button
            onClick={() => {
              setShowMe(!showMe)
            }}
          >
            Click me!
          </Button>
        ) : (
          <Anchor
            onClick={() => {
              setShowMe(!showMe)
            }}
          >
            No, click me!
          </Anchor>
        )}
      </HeightAnimation>

      <P top>Look at me 👀</P>
    </>
  )
}
render(<Example />)
`})}function p(){return(0,u.jsx)(l,{stableName:`HeightAnimationKeepInDOM`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { HeightAnimation, ToggleButton, Section, Button, Anchor, P } from '@dnb/eufemia'`],__buildScope:{ToggleButton:s,HeightAnimation:r,Section:o,P:a},noInline:!0,children:`const Example = () => {
  const [openState, setOpenState] = useState(true)
  const [contentState, setContentState] = useState(false)
  const onChangeHandler = ({ checked }) => {
    setOpenState(checked)
  }
  return (
    <>
      <ToggleButton checked={openState} onChange={onChangeHandler} right>
        Open/close
      </ToggleButton>
      <ToggleButton
        checked={contentState || !openState}
        disabled={!openState}
        onChange={({ checked }) => {
          setContentState(checked)
        }}
        space={{
          top: true,
          bottom: true,
        }}
      >
        Change height inside
      </ToggleButton>

      <StyledSection variant="information" top>
        <HeightAnimation open={openState} keepInDOM={true} duration={1000}>
          <Section
            innerSpace={{
              block: 'large',
            }}
            variant="information"
          >
            <P space={0}>Your content</P>
          </Section>
          {contentState && <P space={0}>More content</P>}
        </HeightAnimation>
      </StyledSection>
    </>
  )
}
const StyledSection = styled(Section)\`
  .content-element {
    transition: transform 1s var(--easing-default);
    transform: translateY(-2rem);

    padding: 4rem 0;
  }

  .dnb-height-animation--parallax .content-element {
    transform: translateY(0);
  }
\`
render(<Example />)
`})}function m(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...c(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Animation during height changes`}),`
`,(0,u.jsxs)(t.p,{children:[`This example shows how you easily can enhance the user experience. Here we also use `,(0,u.jsx)(t.code,{children:`showOverflow`}),` to avoid hidden overflow during the animation.`]}),`
`,(0,u.jsx)(f,{}),`
`,(0,u.jsx)(t.h3,{children:`Basic open/close`}),`
`,(0,u.jsxs)(t.p,{children:[`This example removes its given children, when open is `,(0,u.jsx)(t.code,{children:`open={false}`}),`.`]}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsx)(t.h3,{children:`Keep in DOM`}),`
`,(0,u.jsxs)(t.p,{children:[`When providing `,(0,u.jsx)(t.code,{children:`keepInDOM={true}`}),`, your nested content will never be removed from the DOM. But rather be "hidden" with `,(0,u.jsx)(t.code,{children:`visually: hidden`}),` and `,(0,u.jsx)(t.code,{children:`aria-hidden`}),`.`]}),`
`,(0,u.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(m,{...e})}):m(e)}export{h as default};