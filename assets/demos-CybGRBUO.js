import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{Ut as n}from"./forms-CFi5-4x5.js";import{t as r}from"./Span-BcY87oLt.js";import{t as i}from"./P-CtWu9WHu.js";import{t as a}from"./H4-DYQuAhgu.js";import{t as o}from"./Heading-DAtQYz9n.js";import{U as s}from"./index-kfZVC31v.js";import{t as c}from"./ComponentBox-qLaLt9T0.js";var l=e(t());function u(){return(0,l.jsx)(c,{"data-visual-test":`span-basic`,stableName:`SpanBasic`,sourceImports:[`import Anchor from '@dnb/eufemia/components/Anchor'`,`import { Span, P, H4 } from '@dnb/eufemia/elements'`],__buildScope:{P:i,Span:r,H4:a,Heading:o,Anchor:n},children:`
<P>
  Here is a paragraph with a <Span size="x-small">x-small</Span> word and
  some <Span weight="medium">medium weight text</Span> in it.
</P>
<H4>
  Heading 4 with <Span size="x-large">x-large</Span> word
</H4>
<Anchor href="/">
  Anchor with <Span weight="medium">medium weight</Span> words
</Anchor>

`})}function d(){return(0,l.jsx)(c,{"data-visual-test":`span-modifiers`,stableName:`SpanModifiers`,sourceImports:[`import Anchor from '@dnb/eufemia/components/Anchor'`,`import { Span, P, H4 } from '@dnb/eufemia/elements'`],__buildScope:{Span:r},children:`<div>
  <Span>Default span</Span>
  <br />
  <Span weight="medium">Medium weight span</Span>
  <br />
  <Span size="basis">Basis size span</Span>
  <br />
  <Span weight="medium" size="x-small">
    X-small span with medium weight
  </Span>
</div>
`})}function f(){return(0,l.jsx)(c,{scope:{SpanWrap:e=>{let t=e.size||`default`;return(0,l.jsxs)(`div`,{children:[(0,l.jsx)(r,{...e,children:t}),(0,l.jsx)(`br`,{}),(0,l.jsxs)(r,{weight:`medium`,...e,children:[t,` - Weight medium`]}),(0,l.jsx)(`br`,{}),(0,l.jsxs)(r,{weight:`bold`,...e,children:[t,` - Weight bold`]})]})}},"data-visual-test":`span-sizes`,stableName:`SpanRegressionTests`,sourceImports:[`import Anchor from '@dnb/eufemia/components/Anchor'`,`import { Span, P, H4 } from '@dnb/eufemia/elements'`],children:`
<SpanWrap />
<SpanWrap size="xx-large" />
<SpanWrap size="x-large" />
<SpanWrap size="large" />
<SpanWrap size="medium" />
<SpanWrap size="basis" />
<SpanWrap size="small" />
<SpanWrap size="x-small" />

`})}function p(e){let t={a:`a`,h2:`h2`,h3:`h3`,p:`p`,...s(),...e.components},{VisibleWhenVisualTest:n}=t;return n||h(`VisibleWhenVisualTest`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`Demos`}),`
`,(0,l.jsxs)(t.p,{children:[`For more detailed examples of every property, see the `,(0,l.jsx)(t.a,{href:`/uilib/elements/paragraph/#demos`,children:`Paragraph demos`}),`.`]}),`
`,(0,l.jsx)(t.h3,{children:`Basics`}),`
`,(0,l.jsx)(u,{}),`
`,(0,l.jsx)(t.h3,{children:`Span modifiers`}),`
`,(0,l.jsx)(d,{}),`
`,(0,l.jsx)(n,{children:(0,l.jsx)(f,{})})]})}function m(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};