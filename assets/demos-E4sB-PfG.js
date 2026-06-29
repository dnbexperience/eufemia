import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{t as n}from"./Anchor-BPx9fjvj.js";import{t as r}from"./P-CVKBz4XO.js";import{t as i}from"./Section-_oyssAWe.js";import{t as a}from"./VisuallyHidden-BmXg6HC8.js";import{U as o}from"./index-BsJ3GLEw.js";import{t as s}from"./ComponentBox-sLMgHvLi.js";var c=e(t()),l=()=>(0,c.jsx)(s,{"data-visual-test":`visually-hidden-default`,stableName:`VisuallyHiddenDefault`,sourceImports:[`import styled from '@emotion/styled'`,`import { VisuallyHidden, Section, Anchor, P } from '@dnb/eufemia'`],__buildScope:{P:r,VisuallyHidden:a},children:`<P>
  <span>before|</span>
  <VisuallyHidden>hidden content</VisuallyHidden>
  <span>|after</span>
</P>
`}),u=()=>(0,c.jsx)(s,{"data-visual-test":`visually-hidden-focusable`,stableName:`VisuallyHiddenFocusable`,sourceImports:[`import styled from '@emotion/styled'`,`import { VisuallyHidden, Section, Anchor, P } from '@dnb/eufemia'`],__buildScope:{VisuallyHidden:a,Anchor:n},children:`<VisuallyHidden focusable>
  <Anchor href="/">Hidden, but focusable content</Anchor>
</VisuallyHidden>
`}),d=()=>(0,c.jsx)(s,{"data-visual-test":`visually-hidden-use-case`,stableName:`VisuallyHiddenUseCase`,sourceImports:[`import styled from '@emotion/styled'`,`import { VisuallyHidden, Section, Anchor, P } from '@dnb/eufemia'`],__buildScope:{Anchor:n,VisuallyHidden:a},children:`<Anchor href="/">
  Read more <VisuallyHidden>about Eufemia</VisuallyHidden>
</Anchor>
`}),f=()=>(0,c.jsx)(s,{"data-visual-test":`visually-hidden-element`,stableName:`VisuallyHiddenSection`,sourceImports:[`import styled from '@emotion/styled'`,`import { VisuallyHidden, Section, Anchor, P } from '@dnb/eufemia'`],__buildScope:{VisuallyHidden:a,Section:i,P:r},noInline:!0,children:`const Box = styled.div\`
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
`});function p(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...o(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.h3,{children:`VisuallyHidden`}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsx)(t.h3,{children:`VisuallyHidden with focusable content`}),`
`,(0,c.jsxs)(t.p,{children:[`Use `,(0,c.jsx)(t.code,{children:`VisuallyHidden`}),` with `,(0,c.jsx)(t.code,{children:`focusable={true}`}),` to visually hide an element by default, but to display it when it’s focused (e.g. by a keyboard-only user). The container will be displayed when any child element of the container receives focus.`]}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsx)(t.h3,{children:`VisuallyHidden with example of use case`}),`
`,(0,c.jsx)(d,{}),`
`,(0,c.jsx)(t.h3,{children:`VisuallyHidden with custom element`}),`
`,(0,c.jsx)(f,{})]})}function m(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(p,{...e})}):p(e)}export{m as default};