import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{t as n}from"./Anchor-CUnuD5Cj.js";import{t as r}from"./ToggleButton-EPOyxk36.js";import{u as i}from"./FormStatus-BfZTTzoK.js";import{t as a}from"./Space-BTDd9blr.js";import{t as o}from"./Button-CmA8Qaoz.js";import{t as s}from"./P-DSNzygKs.js";import{t as c}from"./Section-Ba8Ez2kR.js";import{U as l}from"./index-CGxQ8PRe.js";import{t as u}from"./ComponentBox-DOwlXUSS.js";var d=e(t());function f(){return(0,d.jsx)(u,{stableName:`HeightAnimationDefault`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { HeightAnimation, ToggleButton, Section, Button, Anchor, P, Space } from '@dnb/eufemia'`],__buildScope:{ToggleButton:r,Section:c,HeightAnimation:i,P:s},noInline:!0,children:`const Example = () => {
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
`})}function p(){return(0,d.jsx)(u,{stableName:`HeightAnimationAutosizing`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { HeightAnimation, ToggleButton, Section, Button, Anchor, P, Space } from '@dnb/eufemia'`],__buildScope:{HeightAnimation:i,Button:o,Anchor:n,P:s},noInline:!0,children:`const Example = () => {
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
`})}function m(){return(0,d.jsx)(u,{stableName:`HeightAnimationKeepInDOM`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { HeightAnimation, ToggleButton, Section, Button, Anchor, P, Space } from '@dnb/eufemia'`],__buildScope:{ToggleButton:r,HeightAnimation:i,Section:c,P:s},noInline:!0,children:`const Example = () => {
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
`})}function h(){return(0,d.jsx)(u,{stableName:`HeightAnimationOpenOnFind`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { HeightAnimation, ToggleButton, Section, Button, Anchor, P, Space } from '@dnb/eufemia'`],__buildScope:{ToggleButton:r,HeightAnimation:i,Space:a,Section:c,P:s},noInline:!0,children:`const Example = () => {
  const [openState, setOpenState] = useState(false)
  return (
    <>
      <ToggleButton
        checked={openState}
        aria-expanded={openState}
        aria-controls="open-on-find-content"
        onChange={({ checked }) => setOpenState(checked)}
      >
        Open content
      </ToggleButton>

      <HeightAnimation
        id="open-on-find-content"
        open={openState}
        openOnFind
        onBeforeMatch={() => setOpenState(true)}
      >
        <Space innerSpace>
          <Section variant="information" innerSpace>
            <P space={0}>Findable banking content</P>
          </Section>
        </Space>
      </HeightAnimation>
    </>
  )
}
render(<Example />)
`})}function g(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...l(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsx)(t.h3,{children:`Animation during height changes`}),`
`,(0,d.jsxs)(t.p,{children:[`This example shows how you easily can enhance the user experience. Here we also use `,(0,d.jsx)(t.code,{children:`showOverflow`}),` to avoid hidden overflow during the animation.`]}),`
`,(0,d.jsx)(p,{}),`
`,(0,d.jsx)(t.h3,{children:`Basic open/close`}),`
`,(0,d.jsxs)(t.p,{children:[`This example removes its given children, when open is `,(0,d.jsx)(t.code,{children:`open={false}`}),`.`]}),`
`,(0,d.jsx)(f,{}),`
`,(0,d.jsx)(t.h3,{children:`Keep in DOM`}),`
`,(0,d.jsxs)(t.p,{children:[`When providing `,(0,d.jsx)(t.code,{children:`keepInDOM={true}`}),`, your nested content will never be removed from the DOM. But rather be "hidden" with `,(0,d.jsx)(t.code,{children:`visually: hidden`}),` and `,(0,d.jsx)(t.code,{children:`aria-hidden`}),`.`]}),`
`,(0,d.jsx)(m,{}),`
`,(0,d.jsx)(t.h3,{children:`Find collapsed content`}),`
`,(0,d.jsxs)(t.p,{children:[`The `,(0,d.jsx)(t.code,{children:`openOnFind`}),` prop keeps collapsed content available to the browser's find-in-page feature using `,(0,d.jsx)(t.code,{children:`hidden="until-found"`}),`. Search this page for `,(0,d.jsx)(t.strong,{children:`“Findable banking content”`}),`. HeightAnimation opens the match itself, while the optional `,(0,d.jsx)(t.code,{children:`onBeforeMatch`}),` callback synchronizes the toggle's external state.`]}),`
`,(0,d.jsx)(h,{})]})}function _(e={}){let{wrapper:t}={...l(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(g,{...e})}):g(e)}export{_ as default};