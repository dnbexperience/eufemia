import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-a4aOn231.js";import{zr as r}from"./index-DqqByKA2.js";var i=e(t()),a=()=>(0,i.jsx)(n,{"data-visual-test":`visually-hidden-default`,stableName:`VisuallyHiddenDefault`,children:`<P>
  <span>before|</span>
  <VisuallyHidden>hidden content</VisuallyHidden>
  <span>|after</span>
</P>
`}),o=()=>(0,i.jsx)(n,{"data-visual-test":`visually-hidden-focusable`,stableName:`VisuallyHiddenFocusable`,children:`<VisuallyHidden focusable>
  <Anchor href="/">Hidden, but focusable content</Anchor>
</VisuallyHidden>
`}),s=()=>(0,i.jsx)(n,{"data-visual-test":`visually-hidden-use-case`,stableName:`VisuallyHiddenUseCase`,children:`<Anchor href="/">
  Read more <VisuallyHidden>about Eufemia</VisuallyHidden>
</Anchor>
`}),c=()=>(0,i.jsx)(n,{"data-visual-test":`visually-hidden-element`,stableName:`VisuallyHiddenSection`,noInline:!0,children:`const Box = styled.div\`
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
`});function l(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Demos`}),`
`,(0,i.jsx)(t.h3,{children:`VisuallyHidden`}),`
`,(0,i.jsx)(a,{}),`
`,(0,i.jsx)(t.h3,{children:`VisuallyHidden with focusable content`}),`
`,(0,i.jsxs)(t.p,{children:[`Use `,(0,i.jsx)(t.code,{children:`VisuallyHidden`}),` with `,(0,i.jsx)(t.code,{children:`focusable={true}`}),` to visually hide an element by default, but to display it when it’s focused (e.g. by a keyboard-only user). The container will be displayed when any child element of the container receives focus.`]}),`
`,(0,i.jsx)(o,{}),`
`,(0,i.jsx)(t.h3,{children:`VisuallyHidden with example of use case`}),`
`,(0,i.jsx)(s,{}),`
`,(0,i.jsx)(t.h3,{children:`VisuallyHidden with custom element`}),`
`,(0,i.jsx)(c,{})]})}function u(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}export{u as default};