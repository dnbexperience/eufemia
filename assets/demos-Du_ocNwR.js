import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-C64JNWnl.js";import{Lr as n}from"./index-2AO2Cu5K.js";var r=e();function i(){return(0,r.jsx)(t,{noInline:!0,children:`const Example = () => {
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
`})}function a(){return(0,r.jsx)(t,{noInline:!0,children:`const Example = () => {
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
`})}function o(){return(0,r.jsx)(t,{noInline:!0,children:`const Example = () => {
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
`})}function s(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:`Demos`}),`
`,(0,r.jsx)(t.h3,{children:`Animation during height changes`}),`
`,(0,r.jsxs)(t.p,{children:[`This example shows how you easily can enhance the user experience. Here we also use `,(0,r.jsx)(t.code,{children:`showOverflow`}),` to avoid hidden overflow during the animation.`]}),`
`,(0,r.jsx)(a,{}),`
`,(0,r.jsx)(t.h3,{children:`Basic open/close`}),`
`,(0,r.jsxs)(t.p,{children:[`This example removes its given children, when open is `,(0,r.jsx)(t.code,{children:`open={false}`}),`.`]}),`
`,(0,r.jsx)(i,{}),`
`,(0,r.jsx)(t.h3,{children:`Keep in DOM`}),`
`,(0,r.jsxs)(t.p,{children:[`When providing `,(0,r.jsx)(t.code,{children:`keepInDOM={true}`}),`, your nested content will never be removed from the DOM. But rather be "hidden" with `,(0,r.jsx)(t.code,{children:`visually: hidden`}),` and `,(0,r.jsx)(t.code,{children:`aria-hidden`}),`.`]}),`
`,(0,r.jsx)(o,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(s,{...e})}):s(e)}export{c as default};