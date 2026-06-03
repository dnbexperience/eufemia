import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{t as n}from"./withComponentMarkers-awRs7Lr9.js";import{t as r}from"./P-DtVKLSL-.js";import{d as i,f as a}from"./HelpButton-sV5p6bwJ.js";import{t as o}from"./H2-DT2jDb2-.js";import{t as s}from"./H3-BwNJxJzd.js";import{t as c}from"./H4-06ptY6OB.js";import{t as l}from"./Section-UYj7uQy5.js";import{W as u,j as d,m as f}from"./index-BCXtuv-b.js";import{t as p}from"./ComponentBox-B2X8809Z.js";var m=a,h=e(t()),g=({size:e,...t})=>(0,h.jsx)(a,{element:`h5`,size:e||`auto`,...t});n(g,{_isHeadingElement:!0,_supportsSpacingProps:!0});var _=g,v=({size:e,...t})=>(0,h.jsx)(a,{element:`h6`,size:e||`auto`,...t});n(v,{_isHeadingElement:!0,_supportsSpacingProps:!0});var y=v,b=()=>(0,h.jsx)(p,{"data-visual-test":`heading-basics`,stableName:`HeadingBasicsExample`,sourceImports:[`import { H, H1, H2, H3, H4, H5, H6, P, Section } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],__buildScope:{H1:i,Heading:d,H2:o,H3:s,H4:c,H5:_,H6:y,P:r},children:`
<H1>Heading 1</H1>
<H2>Heading 2</H2>
<H3>Heading 3</H3>
<H4>Heading 4</H4>
<H5>Heading 5</H5>
<H6>Heading 6</H6>
<P>Regular text</P>

`}),x=()=>(0,h.jsx)(p,{stableName:`HeadingTypographyExample`,sourceImports:[`import { H, H1, H2, H3, H4, H5, H6, P, Section } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],__buildScope:{H1:i,Heading:d},children:`
<H1>Heading 1 (default size 'xx-large')</H1>
<H1 size="x-large">Heading 1 style 'x-large'</H1>
<H1 size="small">Heading 1 style small</H1>

`}),S=()=>(0,h.jsx)(p,{stableName:`HeadingTypographyXLargeExample`,sourceImports:[`import { H, H1, H2, H3, H4, H5, H6, P, Section } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],__buildScope:{H1:i,Heading:d},children:`
<H1 size="x-large">Heading style x-large (using 'size')</H1>
<H1>
  <small>Heading style x-large (using &lt;small&gt;)</small>
</H1>

`}),C=()=>(0,h.jsx)(p,{hideCode:!0,"data-visual-test":`heading-default`,stableName:`HeadingVanillaHTMLExample`,sourceImports:[`import { H, H1, H2, H3, H4, H5, H6, P, Section } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],__buildScope:{Heading:d},children:`
<h1 className="dnb-h--xx-large">Heading style xx-large</h1>
<h2 className="dnb-h--x-large">Heading style x-large</h2>
<h5 className="dnb-h--large">Heading style large</h5>
<h3 className="dnb-h--small">Heading style small</h3>
<h3 className="dnb-h--basis">Heading style basis</h3>

`}),w=()=>(0,h.jsx)(p,{hideCode:!0,"data-visual-test":`heading-additional`,stableName:`HeadingModifiersExample`,sourceImports:[`import { H, H1, H2, H3, H4, H5, H6, P, Section } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],children:`<article>
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
`}),T=()=>(0,h.jsx)(p,{"data-visual-test":`heading-prose-max-width`,stableName:`HeadingProseMaxWidthExample`,sourceImports:[`import { H, H1, H2, H3, H4, H5, H6, P, Section } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],__buildScope:{H2:o},children:`
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

`}),E=()=>(0,h.jsx)(p,{stableName:`HeadingMarginCollapsingExample`,sourceImports:[`import { H, H1, H2, H3, H4, H5, H6, P, Section } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],__buildScope:{H1:i,P:r},children:`
<H1 size="small" top bottom="small">
  Spacing with bottom margin: small
</H1>
<P top="large" bottom="small">
  Spacing with top margin: large
</P>

`}),D=()=>{let e=f.div`
    overflow: auto; // prevent margin collapse
  `,t=({...t})=>(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(e,{children:(0,h.jsx)(i,{...t,children:t.size})}),(0,h.jsx)(e,{children:(0,h.jsx)(o,{...t,children:(0,h.jsxs)(`small`,{children:[`<small>`,` `,t.size,` `,`</small>`]})})}),(0,h.jsx)(e,{children:(0,h.jsxs)(s,{...t,children:[(0,h.jsx)(h.Fragment,{children:`Text `}),(0,h.jsxs)(`small`,{children:[`<small>`,` `,t.size,` `,`</small>`]})]})}),(0,h.jsx)(`hr`,{})]});return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p,{scope:{HWrap:t},"data-visual-test":`heading-sizes`,stableName:`HeadingRegressionTest`,sourceImports:[`import { H, H1, H2, H3, H4, H5, H6, P, Section } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],children:`
<HWrap size="xx-large" />
<HWrap size="x-large" />
<HWrap size="large" />
<HWrap size="medium" />
<HWrap size="basis" />
<HWrap size="small" />
<HWrap size="x-small" />

`}),(0,h.jsx)(p,{scope:{HWrap:t},"data-visual-test":`heading-base`,stableName:`HeadingRegressionTest_2`,sourceImports:[`import { H, H1, H2, H3, H4, H5, H6, P, Section } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],__buildScope:{H:m},children:`
<H>default (h1 - xx-large)</H>
<H element="h2">custom level (h2 - xx-large)</H>
<H size="small">custom size (h1 - small)</H>
<H element="h2" size="small">
  custom level and size (h2 - small)
</H>

`})]})},O=()=>(0,h.jsx)(p,{stableName:`HeadingDarkSurfaceExample`,sourceImports:[`import { H, H1, H2, H3, H4, H5, H6, P, Section } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],__buildScope:{Section:l,H1:i,Heading:d},children:`<Section
  innerSpace={{
    block: true,
  }}
  surface="dark"
>
  <H1 size="large" top={false} bottom={false}>
    Heading on dark surface
  </H1>
</Section>
`});function k(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...u(),...e.components},{VisibleWhenVisualTest:n}=t;return n||j(`VisibleWhenVisualTest`,!0),(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(t.h2,{children:`Demos`}),`
`,(0,h.jsx)(t.h3,{children:`The most basic use of headings`}),`
`,(0,h.jsxs)(t.p,{children:[`Just using the `,(0,h.jsx)(t.code,{children:`H1, H2, etc.`}),` components will give you the basic headings.`]}),`
`,(0,h.jsx)(b,{}),`
`,(0,h.jsx)(t.h3,{children:`Heading typography using React JSX`}),`
`,(0,h.jsxs)(t.p,{children:[`The visual size of a heading can be customized using the `,(0,h.jsx)(t.code,{children:`size`}),` property with values: `,(0,h.jsx)(t.code,{children:`xx-large | x-large | large | medium | basis | small | x-small`})]}),`
`,(0,h.jsx)(x,{}),`
`,(0,h.jsxs)(t.p,{children:[`By using the `,(0,h.jsx)(t.code,{children:`<small>`}),` element, we decrease the size one level (default size is `,(0,h.jsx)(t.code,{children:`xx-large`}),`):`]}),`
`,(0,h.jsx)(S,{}),`
`,(0,h.jsx)(t.h3,{children:`Prose max width`}),`
`,(0,h.jsxs)(t.p,{children:[`The `,(0,h.jsx)(t.code,{children:`proseMaxWidth`}),` property allows you to limit the width of heading text based on character count, creating optimal reading line lengths:`]}),`
`,(0,h.jsx)(T,{}),`
`,(0,h.jsx)(t.h2,{children:`Heading styles in vanilla HTML`}),`
`,(0,h.jsx)(C,{}),`
`,(0,h.jsx)(t.h3,{children:`Additional Heading modifiers`}),`
`,(0,h.jsx)(w,{}),`
`,(0,h.jsx)(t.h3,{children:`Example of margin collapsing`}),`
`,(0,h.jsx)(t.p,{children:`Only the largest margin takes effect.`}),`
`,(0,h.jsx)(E,{}),`
`,(0,h.jsx)(t.h3,{children:`Dark surface`}),`
`,(0,h.jsx)(t.p,{children:`Headings automatically adapt their color when rendered on a dark surface:`}),`
`,(0,h.jsx)(O,{}),`
`,(0,h.jsx)(n,{children:(0,h.jsx)(D,{})})]})}function A(e={}){let{wrapper:t}={...u(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(k,{...e})}):k(e)}function j(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{A as default};