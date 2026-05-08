import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{et as t,t as n,tt as r}from"./ComponentBox-C64JNWnl.js";import{An as i,Lr as a,Mt as o}from"./index-2AO2Cu5K.js";var s=e(),c=()=>(0,s.jsx)(n,{"data-visual-test":`heading-basics`,children:`
<H1>Heading 1</H1>
<H2>Heading 2</H2>
<H3>Heading 3</H3>
<H4>Heading 4</H4>
<H5>Heading 5</H5>
<H6>Heading 6</H6>
<P>Regular text</P>

`}),l=()=>(0,s.jsx)(n,{children:`
<H1>Heading 1 (default size 'xx-large')</H1>
<H1 size="x-large">Heading 1 style 'x-large'</H1>
<H1 size="small">Heading 1 style small</H1>

`}),u=()=>(0,s.jsx)(n,{children:`
<H1 size="x-large">Heading style x-large (using 'size')</H1>
<H1>
  <small>Heading style x-large (using &lt;small&gt;)</small>
</H1>

`}),d=()=>(0,s.jsx)(n,{hideCode:!0,"data-visual-test":`heading-default`,children:`
<h1 className="dnb-h--xx-large">Heading style xx-large</h1>
<h2 className="dnb-h--x-large">Heading style x-large</h2>
<h5 className="dnb-h--large">Heading style large</h5>
<h3 className="dnb-h--small">Heading style small</h3>
<h3 className="dnb-h--basis">Heading style basis</h3>

`}),f=()=>(0,s.jsx)(n,{hideCode:!0,"data-visual-test":`heading-additional`,children:`<article>
  <h1 className="dnb-h--xx-large">
    .dnb-h--xx-large <small>small</small>
  </h1>
  <h2 className="dnb-h--x-large">
    .dnb-h--x-large <small>small</small>
  </h2>
  <h2 className="dnb-h--large">
    .dnb-h--large <small>small</small>
  </h2>
  <h3 className="dnb-h--medium">
    .dnb-h--medium <small>small</small>
  </h3>
  <h3 className="dnb-lead">
    .dnb-lead <small>small</small>
  </h3>
</article>
`}),p=()=>(0,s.jsx)(n,{"data-visual-test":`heading-prose-max-width`,children:`
<H2>
  This is a regular heading without any width constraints. It will extend
  to the full width of its container.
</H2>
<H2 proseMaxWidth={40}>
  This heading uses proseMaxWidth={40} to limit its width to
  approximately 40 characters.
</H2>
<H2 proseMaxWidth={20}>
  This heading uses proseMaxWidth={20} for an even narrower reading
  width.
</H2>
<H2 proseMaxWidth>
  This heading uses proseMaxWidth with its default value.
</H2>

`}),m=()=>(0,s.jsx)(n,{children:`
<H1 size="small" top bottom="small">
  Spacing with bottom margin: small
</H1>
<P top="large" bottom="small">
  Spacing with top margin: large
</P>

`}),h=()=>{let e=o.div`
    overflow: auto; // prevent margin collapse
  `,a=({...n})=>(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e,{children:(0,s.jsx)(i,{...n,children:n.size})}),(0,s.jsx)(e,{children:(0,s.jsx)(r,{...n,children:(0,s.jsxs)(`small`,{children:[`<small>`,` `,n.size,` `,`</small>`]})})}),(0,s.jsx)(e,{children:(0,s.jsxs)(t,{...n,children:[(0,s.jsx)(s.Fragment,{children:`Text `}),(0,s.jsxs)(`small`,{children:[`<small>`,` `,n.size,` `,`</small>`]})]})}),(0,s.jsx)(`hr`,{})]});return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n,{scope:{HWrap:a},"data-visual-test":`heading-sizes`,children:`
<HWrap size="xx-large" />
<HWrap size="x-large" />
<HWrap size="large" />
<HWrap size="medium" />
<HWrap size="basis" />
<HWrap size="small" />
<HWrap size="x-small" />

`}),(0,s.jsx)(n,{scope:{HWrap:a},"data-visual-test":`heading-base`,children:`
<H>default (h1 - xx-large)</H>
<H element="h2">custom level (h2 - xx-large)</H>
<H size="small">custom size (h1 - small)</H>
<H element="h2" size="small">
  custom level and size (h2 - small)
</H>

`})]})},g=()=>(0,s.jsx)(n,{children:`<Section
  innerSpace={{
    block: true,
  }}
  surface="dark"
>
  <H1 size="large" top={false} bottom={false}>
    Heading on dark surface
  </H1>
</Section>
`});function _(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...a(),...e.components},{VisibleWhenVisualTest:n}=t;return n||y(`VisibleWhenVisualTest`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`The most basic use of headings`}),`
`,(0,s.jsxs)(t.p,{children:[`Just using the `,(0,s.jsx)(t.code,{children:`H1, H2, etc.`}),` components will give you the basic headings.`]}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Heading typography using React JSX`}),`
`,(0,s.jsxs)(t.p,{children:[`The visual size of a heading can be customized using the `,(0,s.jsx)(t.code,{children:`size`}),` property with values: `,(0,s.jsx)(t.code,{children:`xx-large | x-large | large | medium | basis | small | x-small`})]}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsxs)(t.p,{children:[`By using the `,(0,s.jsx)(t.code,{children:`<small>`}),` element, we decrease the size one level (default size is `,(0,s.jsx)(t.code,{children:`xx-large`}),`):`]}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`Prose max width`}),`
`,(0,s.jsxs)(t.p,{children:[`The `,(0,s.jsx)(t.code,{children:`proseMaxWidth`}),` property allows you to limit the width of heading text based on character count, creating optimal reading line lengths:`]}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(t.h2,{children:`Heading styles in vanilla HTML`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`Additional Heading modifiers`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`Example of margin collapsing`}),`
`,(0,s.jsx)(t.p,{children:`Only the largest margin takes effect.`}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`Dark surface`}),`
`,(0,s.jsx)(t.p,{children:`Headings automatically adapt their color when rendered on a dark surface:`}),`
`,(0,s.jsx)(g,{}),`
`,(0,s.jsx)(n,{children:(0,s.jsx)(h,{})})]})}function v(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as default};