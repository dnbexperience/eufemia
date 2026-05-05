import"./rolldown-runtime-BYbx6iT9.js";import{n as e,t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r,sr as i}from"./index-CMgyXmp3.js";e();var a=t();function o(){return(0,a.jsx)(n,{"data-visual-test":`span-basic`,children:`
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

`})}function s(){return(0,a.jsx)(n,{"data-visual-test":`span-modifiers`,children:`<div>
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
`})}function c(){return(0,a.jsx)(n,{scope:{SpanWrap:e=>{let t=e.size||`default`;return(0,a.jsxs)(`div`,{children:[(0,a.jsx)(i,{...e,children:t}),(0,a.jsx)(`br`,{}),(0,a.jsxs)(i,{weight:`medium`,...e,children:[t,` - Weight medium`]}),(0,a.jsx)(`br`,{}),(0,a.jsxs)(i,{weight:`bold`,...e,children:[t,` - Weight bold`]})]})}},"data-visual-test":`span-sizes`,children:`
<SpanWrap />
<SpanWrap size="xx-large" />
<SpanWrap size="x-large" />
<SpanWrap size="large" />
<SpanWrap size="medium" />
<SpanWrap size="basis" />
<SpanWrap size="small" />
<SpanWrap size="x-small" />

`})}function l(e){let t={a:`a`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components},{VisibleWhenVisualTest:n}=t;return n||d(`VisibleWhenVisualTest`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsxs)(t.p,{children:[`For more detailed examples of every property, see the `,(0,a.jsx)(t.a,{href:`/uilib/elements/paragraph/#demos`,children:`Paragraph demos`}),`.`]}),`
`,(0,a.jsx)(t.h3,{children:`Basics`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Span modifiers`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(n,{children:(0,a.jsx)(c,{})})]})}function u(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};