import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-C64JNWnl.js";import{Lr as n}from"./index-2AO2Cu5K.js";var r=e(),i=()=>(0,r.jsx)(t,{"data-visual-test":`visually-hidden-default`,children:`<P>
  <span>before|</span>
  <VisuallyHidden>hidden content</VisuallyHidden>
  <span>|after</span>
</P>
`}),a=()=>(0,r.jsx)(t,{"data-visual-test":`visually-hidden-focusable`,children:`<VisuallyHidden focusable>
  <Anchor href="/">Hidden, but focusable content</Anchor>
</VisuallyHidden>
`}),o=()=>(0,r.jsx)(t,{"data-visual-test":`visually-hidden-use-case`,children:`<Anchor href="/">
  Read more <VisuallyHidden>about Eufemia</VisuallyHidden>
</Anchor>
`}),s=()=>(0,r.jsx)(t,{"data-visual-test":`visually-hidden-element`,noInline:!0,children:`const Box = styled.div\`
  width: 1rem;
  height: 1rem;
\`
const BoxBefore = styled(Box)\`
  background-color: var(--color-summer-green);
\`
const BoxAfter = styled(Box)\`
  background-color: var(--color-emerald-green);
\`
render(
  <>
    <BoxBefore />
    {/* @ts-expect-error -- strictFunctionTypes */}
    <VisuallyHidden aria-label="I'm a region" element={Section}>
      <P>but, not visible to you!</P>
    </VisuallyHidden>
    <BoxAfter />
  </>
)
`});function c(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:`Demos`}),`
`,(0,r.jsx)(t.h3,{children:`VisuallyHidden`}),`
`,(0,r.jsx)(i,{}),`
`,(0,r.jsx)(t.h3,{children:`VisuallyHidden with focusable content`}),`
`,(0,r.jsxs)(t.p,{children:[`Use `,(0,r.jsx)(t.code,{children:`VisuallyHidden`}),` with `,(0,r.jsx)(t.code,{children:`focusable={true}`}),` to visually hide an element by default, but to display it when it’s focused (e.g. by a keyboard-only user). The container will be displayed when any child element of the container receives focus.`]}),`
`,(0,r.jsx)(a,{}),`
`,(0,r.jsx)(t.h3,{children:`VisuallyHidden with example of use case`}),`
`,(0,r.jsx)(o,{}),`
`,(0,r.jsx)(t.h3,{children:`VisuallyHidden with custom element`}),`
`,(0,r.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}export{l as default};