import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{Q as n}from"./Anchor-CDwNjfi4.js";import{t as r}from"./withComponentMarkers-uxF06S8E.js";import{r as i}from"./P-CDsgVQgI.js";import{t as a}from"./P-CbimSwQH.js";import{b as o,y as s}from"./Table-D3iIoHmL.js";import{t as c}from"./H2-CDxBDFS_.js";import{t as l}from"./H3-642vV_N8.js";import{t as u}from"./H4-BRfF5hSL.js";import{t as d}from"./Section-DfvD9Xmd.js";import{t as f}from"./Heading-CDZ3ehTc.js";import{B as p,x as m}from"./index-DdG6L_K8.js";import{t as h}from"./ComponentBox-q_23Ylzi.js";var g=o,_=e(t()),v=({size:e,...t})=>(0,_.jsx)(o,{element:`h5`,size:e||`auto`,...t});r(v,{_isHeadingElement:!0,_supportsSpacingProps:!0});var y=v,b=({size:e,...t})=>(0,_.jsx)(o,{element:`h6`,size:e||`auto`,...t});r(b,{_isHeadingElement:!0,_supportsSpacingProps:!0});var x=b,S=()=>(0,_.jsx)(h,{"data-visual-test":`heading-basics`,stableName:`HeadingBasicsExample`,sourceImports:[`import { H, H1, H2, H3, H4, H5, H6, P, Section } from '@dnb/eufemia'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import styled from '@emotion/styled'`],__buildScope:{H1:s,Heading:f,H2:c,H3:l,H4:u,H5:y,H6:x,P:a},children:`
<H1>Heading 1</H1>
<H2>Heading 2</H2>
<H3>Heading 3</H3>
<H4>Heading 4</H4>
<H5>Heading 5</H5>
<H6>Heading 6</H6>
<P>Regular text</P>

`}),C=()=>(0,_.jsx)(h,{stableName:`HeadingTypographyExample`,sourceImports:[`import { H, H1, H2, H3, H4, H5, H6, P, Section } from '@dnb/eufemia'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import styled from '@emotion/styled'`],__buildScope:{H1:s,Heading:f},children:`
<H1>Heading 1 (default size 'xx-large')</H1>
<H1 size="x-large">Heading 1 style 'x-large'</H1>
<H1 size="small">Heading 1 style small</H1>

`}),w=()=>(0,_.jsx)(h,{stableName:`HeadingTypographyXLargeExample`,sourceImports:[`import { H, H1, H2, H3, H4, H5, H6, P, Section } from '@dnb/eufemia'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import styled from '@emotion/styled'`],__buildScope:{H1:s,Heading:f},children:`
<H1 size="x-large">Heading style x-large (using 'size')</H1>
<H1>
  <small>Heading style x-large (using &lt;small&gt;)</small>
</H1>

`}),T=()=>(0,_.jsx)(h,{hideCode:!0,"data-visual-test":`heading-default`,stableName:`HeadingVanillaHTMLExample`,sourceImports:[`import { H, H1, H2, H3, H4, H5, H6, P, Section } from '@dnb/eufemia'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import styled from '@emotion/styled'`],__buildScope:{Heading:f},children:`
<h1 className="dnb-h--xx-large">Heading style xx-large</h1>
<h2 className="dnb-h--x-large">Heading style x-large</h2>
<h5 className="dnb-h--large">Heading style large</h5>
<h3 className="dnb-h--small">Heading style small</h3>
<h3 className="dnb-h--basis">Heading style basis</h3>

`}),E=()=>(0,_.jsx)(h,{hideCode:!0,"data-visual-test":`heading-additional`,stableName:`HeadingModifiersExample`,sourceImports:[`import { H, H1, H2, H3, H4, H5, H6, P, Section } from '@dnb/eufemia'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import styled from '@emotion/styled'`],children:`<article>
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
`}),D=()=>(0,_.jsx)(h,{"data-visual-test":`heading-prose-max-width`,stableName:`HeadingProseMaxWidthExample`,sourceImports:[`import { H, H1, H2, H3, H4, H5, H6, P, Section } from '@dnb/eufemia'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import styled from '@emotion/styled'`],__buildScope:{H4:u},children:`
<H4>
  This is a regular heading without any width constraints. It will extend
  to the full width of its container.
</H4>
<H4 proseMaxWidth={40}>
  This heading uses proseMaxWidth={40} to limit its width to
  approximately 40 characters.
</H4>
<H4 proseMaxWidth={20}>
  This heading uses proseMaxWidth={20} for an even narrower reading
  width.
</H4>
<H4 proseMaxWidth>
  This heading uses proseMaxWidth with its default value.
</H4>

`});function O(){return(0,_.jsx)(h,{hideCode:!0,scope:{Typography:i},stableName:`HeadingProseMaxWidthProvider`,sourceImports:[`import { H, H1, H2, H3, H4, H5, H6, P, Section } from '@dnb/eufemia'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import styled from '@emotion/styled'`],__buildScope:{Provider:n,H4:u},children:`<Typography.Provider proseMaxWidth={40}>
  <H4>
    This heading is inside a Typography.Provider with proseMaxWidth=
    {40}
  </H4>
  <H4 proseMaxWidth={20}>
    This heading overrides the provider with proseMaxWidth={20}
  </H4>
</Typography.Provider>
`})}var k=()=>(0,_.jsx)(h,{stableName:`HeadingMarginCollapsingExample`,sourceImports:[`import { H, H1, H2, H3, H4, H5, H6, P, Section } from '@dnb/eufemia'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import styled from '@emotion/styled'`],__buildScope:{H1:s,P:a},children:`
<H1 size="small" top bottom="small">
  Spacing with bottom margin: small
</H1>
<P top="large" bottom="small">
  Spacing with top margin: large
</P>

`}),A=()=>{let e=m.div`
    overflow: auto; // prevent margin collapse
  `,t=({...t})=>(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(e,{children:(0,_.jsx)(s,{...t,children:t.size})}),(0,_.jsx)(e,{children:(0,_.jsx)(c,{...t,children:(0,_.jsxs)(`small`,{children:[`<small>`,` `,t.size,` `,`</small>`]})})}),(0,_.jsx)(e,{children:(0,_.jsxs)(l,{...t,children:[(0,_.jsx)(_.Fragment,{children:`Text `}),(0,_.jsxs)(`small`,{children:[`<small>`,` `,t.size,` `,`</small>`]})]})}),(0,_.jsx)(`hr`,{})]});return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(h,{scope:{HWrap:t},"data-visual-test":`heading-sizes`,stableName:`HeadingRegressionTest`,sourceImports:[`import { H, H1, H2, H3, H4, H5, H6, P, Section } from '@dnb/eufemia'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import styled from '@emotion/styled'`],children:`
<HWrap size="xx-large" />
<HWrap size="x-large" />
<HWrap size="large" />
<HWrap size="medium" />
<HWrap size="basis" />
<HWrap size="small" />
<HWrap size="x-small" />

`}),(0,_.jsx)(h,{scope:{HWrap:t},"data-visual-test":`heading-base`,stableName:`HeadingRegressionTest_2`,sourceImports:[`import { H, H1, H2, H3, H4, H5, H6, P, Section } from '@dnb/eufemia'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import styled from '@emotion/styled'`],__buildScope:{H:g},children:`
<H>default (h1 - xx-large)</H>
<H element="h2">custom level (h2 - xx-large)</H>
<H size="small">custom size (h1 - small)</H>
<H element="h2" size="small">
  custom level and size (h2 - small)
</H>

`})]})},j=()=>(0,_.jsx)(h,{stableName:`HeadingDarkSurfaceExample`,sourceImports:[`import { H, H1, H2, H3, H4, H5, H6, P, Section } from '@dnb/eufemia'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import styled from '@emotion/styled'`],__buildScope:{Section:d,H1:s,Heading:f},children:`<Section
  innerSpace={{
    block: true,
  }}
  surface="dark"
>
  <H1 size="large" top={false} bottom={false}>
    Heading on dark surface
  </H1>
</Section>
`});function M(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,...p(),...e.components},{VisibleWhenVisualTest:n}=t;return n||P(`VisibleWhenVisualTest`,!0),(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(t.h2,{children:`Demos`}),`
`,(0,_.jsx)(t.h3,{children:`The most basic use of headings`}),`
`,(0,_.jsxs)(t.p,{children:[`Just using the `,(0,_.jsx)(t.code,{children:`H1, H2, etc.`}),` components will give you the basic headings.`]}),`
`,(0,_.jsx)(S,{}),`
`,(0,_.jsx)(t.h3,{children:`Heading typography using React JSX`}),`
`,(0,_.jsxs)(t.p,{children:[`The visual size of a heading can be customized using the `,(0,_.jsx)(t.code,{children:`size`}),` property with values: `,(0,_.jsx)(t.code,{children:`xx-large | x-large | large | medium | basis | small | x-small`})]}),`
`,(0,_.jsx)(C,{}),`
`,(0,_.jsxs)(t.p,{children:[`By using the `,(0,_.jsx)(t.code,{children:`<small>`}),` element, we decrease the size one level (default size is `,(0,_.jsx)(t.code,{children:`xx-large`}),`):`]}),`
`,(0,_.jsx)(w,{}),`
`,(0,_.jsx)(t.h3,{children:`Prose max width`}),`
`,(0,_.jsxs)(t.p,{children:[`The `,(0,_.jsx)(t.code,{children:`proseMaxWidth`}),` property allows you to limit the width of heading text based on character count, creating optimal reading line lengths:`]}),`
`,(0,_.jsx)(D,{}),`
`,(0,_.jsx)(t.h4,{children:`Using Typography.Provider`}),`
`,(0,_.jsxs)(t.p,{children:[`Use `,(0,_.jsx)(t.code,{children:`Typography.Provider`}),` to apply `,(0,_.jsx)(t.code,{children:`proseMaxWidth`}),` to multiple headings at once:`]}),`
`,(0,_.jsx)(O,{}),`
`,(0,_.jsx)(t.h2,{children:`Heading styles in vanilla HTML`}),`
`,(0,_.jsx)(T,{}),`
`,(0,_.jsx)(t.h3,{children:`Additional Heading modifiers`}),`
`,(0,_.jsx)(E,{}),`
`,(0,_.jsx)(t.h3,{children:`Example of margin collapsing`}),`
`,(0,_.jsx)(t.p,{children:`Only the largest margin takes effect.`}),`
`,(0,_.jsx)(k,{}),`
`,(0,_.jsx)(t.h3,{children:`Dark surface`}),`
`,(0,_.jsxs)(t.p,{children:[`Use `,(0,_.jsx)(t.a,{href:`/uilib/components/section/demos/#dark-surface`,children:`Section`}),` or `,(0,_.jsx)(t.a,{href:`/uilib/usage/customisation/theming/theme#surface-property`,children:`Theme.Context`}),` with `,(0,_.jsx)(t.code,{children:`surface="dark"`}),` to provide dark surface context to supporting components.`]}),`
`,(0,_.jsx)(t.p,{children:`Headings automatically adapt their color when rendered on a dark surface:`}),`
`,(0,_.jsx)(j,{}),`
`,(0,_.jsx)(n,{children:(0,_.jsx)(A,{})})]})}function N(e={}){let{wrapper:t}={...p(),...e.components};return t?(0,_.jsx)(t,{...e,children:(0,_.jsx)(M,{...e})}):M(e)}function P(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{N as default};