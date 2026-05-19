import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-a4aOn231.js";import{zr as r}from"./index-DqqByKA2.js";var i=e(t());function a(){return(0,i.jsx)(n,{stableName:`HeightAnimationDefault`,noInline:!0,children:`const Example = () => {
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
`})}function o(){return(0,i.jsx)(n,{stableName:`HeightAnimationAutosizing`,noInline:!0,children:`const Example = () => {
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
`})}function s(){return(0,i.jsx)(n,{stableName:`HeightAnimationKeepInDOM`,noInline:!0,children:`const Example = () => {
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
`})}function c(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Demos`}),`
`,(0,i.jsx)(t.h3,{children:`Animation during height changes`}),`
`,(0,i.jsxs)(t.p,{children:[`This example shows how you easily can enhance the user experience. Here we also use `,(0,i.jsx)(t.code,{children:`showOverflow`}),` to avoid hidden overflow during the animation.`]}),`
`,(0,i.jsx)(o,{}),`
`,(0,i.jsx)(t.h3,{children:`Basic open/close`}),`
`,(0,i.jsxs)(t.p,{children:[`This example removes its given children, when open is `,(0,i.jsx)(t.code,{children:`open={false}`}),`.`]}),`
`,(0,i.jsx)(a,{}),`
`,(0,i.jsx)(t.h3,{children:`Keep in DOM`}),`
`,(0,i.jsxs)(t.p,{children:[`When providing `,(0,i.jsx)(t.code,{children:`keepInDOM={true}`}),`, your nested content will never be removed from the DOM. But rather be "hidden" with `,(0,i.jsx)(t.code,{children:`visually: hidden`}),` and `,(0,i.jsx)(t.code,{children:`aria-hidden`}),`.`]}),`
`,(0,i.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}export{l as default};