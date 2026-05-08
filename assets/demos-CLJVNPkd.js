import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-DPdYTeDv.js";import{En as n,Lr as r}from"./index--zEB_f_m.js";var i=e();function a(){return(0,i.jsx)(t,{"data-visual-test":`span-basic`,children:`
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

`})}function o(){return(0,i.jsx)(t,{"data-visual-test":`span-modifiers`,children:`<div>
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
`})}function s(){return(0,i.jsx)(t,{scope:{SpanWrap:e=>{let t=e.size||`default`;return(0,i.jsxs)(`div`,{children:[(0,i.jsx)(n,{...e,children:t}),(0,i.jsx)(`br`,{}),(0,i.jsxs)(n,{weight:`medium`,...e,children:[t,` - Weight medium`]}),(0,i.jsx)(`br`,{}),(0,i.jsxs)(n,{weight:`bold`,...e,children:[t,` - Weight bold`]})]})}},"data-visual-test":`span-sizes`,children:`
<SpanWrap />
<SpanWrap size="xx-large" />
<SpanWrap size="x-large" />
<SpanWrap size="large" />
<SpanWrap size="medium" />
<SpanWrap size="basis" />
<SpanWrap size="small" />
<SpanWrap size="x-small" />

`})}function c(e){let t={a:`a`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components},{VisibleWhenVisualTest:n}=t;return n||u(`VisibleWhenVisualTest`,!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Demos`}),`
`,(0,i.jsxs)(t.p,{children:[`For more detailed examples of every property, see the `,(0,i.jsx)(t.a,{href:`/uilib/elements/paragraph/#demos`,children:`Paragraph demos`}),`.`]}),`
`,(0,i.jsx)(t.h3,{children:`Basics`}),`
`,(0,i.jsx)(a,{}),`
`,(0,i.jsx)(t.h3,{children:`Span modifiers`}),`
`,(0,i.jsx)(o,{}),`
`,(0,i.jsx)(n,{children:(0,i.jsx)(s,{})})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as default};