import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{Q as n,X as r}from"./Anchor-ywdvt45E.js";import{r as i}from"./P-rCH1hroG.js";import{t as a}from"./P-DtVKLSL-.js";import{t as o}from"./Link-Dslk3vmj.js";import{t as s}from"./Section-UYj7uQy5.js";import{c}from"./ToggleButton-D3NEk3jO.js";import{G as l,W as u,j as d,m as f}from"./index-BCXtuv-b.js";import{t as p}from"./ComponentBox-B2X8809Z.js";var m=e(t()),h=f.span`
  display: block;
  padding: 0.25rem 0;
`;function g(){return(0,m.jsx)(p,{hideCode:!0,"data-visual-test":`paragraph-modifiers-weight`,stableName:`ParagraphWeightModifiers`,sourceImports:[`import styled from '@emotion/styled'`,`import Anchor from '@dnb/eufemia/components/Anchor'`,`import P from '@dnb/eufemia/elements/P'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import { Flex, Section } from '@dnb/eufemia'`],__buildScope:{P:a},children:`
<P>Default paragraph</P>
<P weight="regular">Regular weight paragraph (same as default)</P>
<P weight="medium">Medium weight paragraph</P>

`})}function _(){return(0,m.jsx)(p,{hideCode:!0,"data-visual-test":`paragraph-modifiers-size`,stableName:`ParagraphSizeModifiers`,sourceImports:[`import styled from '@emotion/styled'`,`import Anchor from '@dnb/eufemia/components/Anchor'`,`import P from '@dnb/eufemia/elements/P'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import { Flex, Section } from '@dnb/eufemia'`],__buildScope:{P:a},children:`
<P size="x-small">x-small paragraph</P>
<P size="small">small paragraph</P>
<P size="medium">medium paragraph</P>
<P size="basis">basis paragraph (same as default)</P>
<P size="large">large paragraph</P>
<P size="x-large">x-large paragraph</P>
<P size="xx-large">xx-large paragraph</P>

`})}function v(){return(0,m.jsx)(p,{hideCode:!0,"data-visual-test":`paragraph-modifiers-align`,stableName:`ParagraphAlignmentModifiers`,sourceImports:[`import styled from '@emotion/styled'`,`import Anchor from '@dnb/eufemia/components/Anchor'`,`import P from '@dnb/eufemia/elements/P'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import { Flex, Section } from '@dnb/eufemia'`],__buildScope:{P:a},children:`
<P align="right">Right aligned paragraph</P>
<P align="center">Center aligned paragraph</P>
<P align="left">Left aligned paragraph</P>

`})}function y(){return(0,m.jsx)(p,{hideCode:!0,"data-visual-test":`paragraph-modifiers-family`,stableName:`ParagraphFamilyModifiers`,sourceImports:[`import styled from '@emotion/styled'`,`import Anchor from '@dnb/eufemia/components/Anchor'`,`import P from '@dnb/eufemia/elements/P'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import { Flex, Section } from '@dnb/eufemia'`],__buildScope:{P:a,Heading:d},children:`
<P family="basis">Basis family paragraph (same as default)</P>
<P family="heading">
  Heading family paragraph (only different on some themes)
</P>
<P family="monospace">Monospace family paragraph</P>

`})}function b(){return(0,m.jsx)(p,{hideCode:!0,"data-visual-test":`paragraph-modifiers-line`,stableName:`ParagraphLineHeightModifiers`,sourceImports:[`import styled from '@emotion/styled'`,`import Anchor from '@dnb/eufemia/components/Anchor'`,`import P from '@dnb/eufemia/elements/P'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import { Flex, Section } from '@dnb/eufemia'`],__buildScope:{P:a},children:`
<P lineHeight="x-small">x-small line-height paragraph</P>
<P lineHeight="small">small line-height paragraph</P>
<P lineHeight="medium">medium line-height paragraph</P>
<P lineHeight="basis">basis line-height paragraph (same as default)</P>
<P lineHeight="large">large line-height paragraph</P>
<P lineHeight="x-large">x-large line-height paragraph</P>
<P lineHeight="xx-large">xx-large line-height paragraph</P>

`})}function x(){return(0,m.jsx)(p,{hideCode:!0,"data-visual-test":`paragraph-modifiers-other`,stableName:`ParagraphAdditionalModifiers`,sourceImports:[`import styled from '@emotion/styled'`,`import Anchor from '@dnb/eufemia/components/Anchor'`,`import P from '@dnb/eufemia/elements/P'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import { Flex, Section } from '@dnb/eufemia'`],__buildScope:{P:a},children:`<article>
  <P weight="bold">Bold weight paragraph</P>
  <P decoration="underline">Underline paragraph</P>
  <P slant="italic">Italic paragraph</P>
</article>
`})}function S(){return(0,m.jsx)(p,{scope:{Case:h},hideCode:!0,"data-visual-test":`paragraph-default`,stableName:`ParagraphDefault`,sourceImports:[`import styled from '@emotion/styled'`,`import Anchor from '@dnb/eufemia/components/Anchor'`,`import P from '@dnb/eufemia/elements/P'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import { Flex, Section } from '@dnb/eufemia'`],__buildScope:{P:a,Anchor:l,Link:o,Code:n},children:`<P>
  <Case>Here is a paragraph text</Case>
  <Case>
    <Anchor href="/">Anchor / Text Link</Anchor>
  </Case>
  <Case>
    <b>Bold paragraph (medium weight)</b>
  </Case>
  <Case>
    <strong>Strong paragraph (medium weight)</strong>
  </Case>
  {/* <i>Italic paragraph (Currently not supported by DNB UX)</i> */}
  {/* <u>Underline paragraph (Currently not supported by DNB UX)</u> */}
  <Case>Numbers 0123456789</Case>
  <Case>
    <code className="dnb-code">Code paragraph</code>
  </Case>
  <Case>
    <cite>Cite paragraph</cite>
  </Case>
  <Case>
    Text <sup>1</sup>{' '}
    <b>
      Text <sup>1</sup>
    </b>{' '}
  </Case>
  <Case>
    Text{' '}
    <sup>
      <Anchor href="/">1</Anchor>
    </sup>{' '}
    <b>
      Text{' '}
      <sup>
        <Anchor href="/">1</Anchor>
      </sup>
    </b>{' '}
  </Case>
  <Case>
    Text <sub>1</sub>{' '}
    <b>
      Text <sub>1</sub>
    </b>{' '}
  </Case>
  <Case>
    <abbr title="Bolig Sparing for Ungdom">BSU</abbr>
  </Case>
</P>
`})}function C(){return(0,m.jsx)(p,{scope:{Case:h},hideCode:!0,"data-visual-test":`paragraph-small`,stableName:`ParagraphSmall`,sourceImports:[`import styled from '@emotion/styled'`,`import Anchor from '@dnb/eufemia/components/Anchor'`,`import P from '@dnb/eufemia/elements/P'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import { Flex, Section } from '@dnb/eufemia'`],__buildScope:{P:a,Anchor:l,Link:o,Code:n},children:`<article>
  <P size="small">
    <Case>Here is a small paragraph text</Case>
    <Case>
      <Anchor href="/">Anchor / Text Link</Anchor>
    </Case>
    <Case>
      <b>Bold paragraph (medium weight)</b>
    </Case>
    <Case>
      <strong>Strong paragraph (medium weight)</strong>
    </Case>
    <Case>Numbers 0123456789</Case>
    <Case>
      <code className="dnb-code">Code paragraph</code>
    </Case>
    <Case>
      <cite>Cite paragraph</cite>
    </Case>
    <Case>
      Text <sup>1</sup>{' '}
      <b>
        Text <sup>1</sup>
      </b>{' '}
    </Case>
    <Case>
      Text{' '}
      <sup>
        <Anchor href="/">1</Anchor>
      </sup>{' '}
      <b>
        Text{' '}
        <sup>
          <Anchor href="/">1</Anchor>
        </sup>
      </b>{' '}
    </Case>
    <Case>
      Text <sub>1</sub>{' '}
      <b>
        Text <sub>1</sub>
      </b>{' '}
    </Case>
  </P>
  <P size="x-small">
    <Case>
      Here is a x-small paragraph text
      <br />
      with a new line.
    </Case>
  </P>
</article>
`})}function w(){return(0,m.jsx)(p,{hideCode:!0,"data-visual-test":`paragraph-prose-max-width`,stableName:`ParagraphProseMaxWidth`,sourceImports:[`import styled from '@emotion/styled'`,`import Anchor from '@dnb/eufemia/components/Anchor'`,`import P from '@dnb/eufemia/elements/P'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import { Flex, Section } from '@dnb/eufemia'`],__buildScope:{Flex:c,P:a},children:`<Flex.Stack>
  <P>
    This is a regular paragraph without any width constraints. It will
    extend to the full width of its container.
  </P>
  <P proseMaxWidth={60}>
    This paragraph uses proseMaxWidth={60} to limit its width to
    approximately 60 characters.
  </P>
  <P proseMaxWidth={40}>
    This paragraph uses proseMaxWidth={40} for an even narrower reading
    width.
  </P>
  <P proseMaxWidth>
    This paragraph uses proseMaxWidth with its default value.
  </P>
</Flex.Stack>
`})}function T(){return(0,m.jsx)(p,{hideCode:!0,scope:{Typography:i},stableName:`ParagraphProseMaxWidthProvider`,sourceImports:[`import styled from '@emotion/styled'`,`import Anchor from '@dnb/eufemia/components/Anchor'`,`import P from '@dnb/eufemia/elements/P'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import { Flex, Section } from '@dnb/eufemia'`],__buildScope:{Flex:c,Provider:r,P:a},children:`<Flex.Stack>
  <Typography.Provider proseMaxWidth={60}>
    <P>
      This paragraph is inside a Typography.Provider with proseMaxWidth=
      {60}
    </P>
    <P>
      This paragraph also inherits the same proseMaxWidth from the Provider
    </P>
    <P proseMaxWidth={40}>
      This paragraph overrides the Provider value with its own
      proseMaxWidth={40}
    </P>
  </Typography.Provider>
</Flex.Stack>
`})}function E(){return(0,m.jsx)(p,{scope:{Case:h},hideCode:!0,"data-visual-test":`paragraph-additional`,stableName:`ParagraphAdditional`,sourceImports:[`import styled from '@emotion/styled'`,`import Anchor from '@dnb/eufemia/components/Anchor'`,`import P from '@dnb/eufemia/elements/P'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import { Flex, Section } from '@dnb/eufemia'`],__buildScope:{P:a,Anchor:l},children:`<P>
  <Case>
    <i>Italic paragraph</i>
  </Case>
  <Case>
    <u>Underline paragraph</u>
  </Case>
  <Case>
    <Anchor title="User Experience">UX</Anchor>
  </Case>
  <Case>
    <del>Deleted paragraph</del>
  </Case>
  <Case>
    <mark>Marked paragraph</mark>
  </Case>
  <Case>
    <ins>Inserted paragraph</ins>
  </Case>
  <Case>
    Text <sup>Superscript</sup>
  </Case>
  <Case>
    Text <sub>Subscript</sub>
  </Case>
</P>
`})}function D(){return(0,m.jsx)(p,{scope:{PWrap:({customSize:e=null,...t})=>{let n=t.size||e;return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(a,{...t,children:(0,m.jsx)(h,{children:n})}),(0,m.jsx)(a,{weight:`medium`,...t,children:(0,m.jsxs)(h,{children:[n,` - Weight medium`]})}),(0,m.jsx)(a,{weight:`bold`,...t,children:(0,m.jsxs)(h,{children:[n,` - Weight bold`]})})]})}},"data-visual-test":`paragraph-sizes`,stableName:`ParagraphRegressionTests`,sourceImports:[`import styled from '@emotion/styled'`,`import Anchor from '@dnb/eufemia/components/Anchor'`,`import P from '@dnb/eufemia/elements/P'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import { Flex, Section } from '@dnb/eufemia'`],children:`
<PWrap customSize="default" />
<PWrap size="xx-large" />
<PWrap size="x-large" />
<PWrap size="large" />
<PWrap size="medium" />
<PWrap size="basis" />
<PWrap size="small" />
<PWrap size="x-small" />

`})}function O(){return(0,m.jsx)(p,{stableName:`ParagraphDarkSurface`,sourceImports:[`import styled from '@emotion/styled'`,`import Anchor from '@dnb/eufemia/components/Anchor'`,`import P from '@dnb/eufemia/elements/P'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`,`import { Flex, Section } from '@dnb/eufemia'`],__buildScope:{Section:s,P:a},children:`<Section
  innerSpace={{
    block: true,
  }}
  surface="dark"
>
  <P>This is a paragraph on a dark surface.</P>
</Section>
`})}function k(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,h5:`h5`,li:`li`,p:`p`,ul:`ul`,...u(),...e.components},{VisibleWhenVisualTest:n}=t;return n||j(`VisibleWhenVisualTest`,!0),(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(t.h2,{children:`Demos`}),`
`,(0,m.jsx)(t.h3,{children:`Paragraphs modifiers`}),`
`,(0,m.jsx)(t.p,{children:`These are the standard available modifiers for paragraph typography:`}),`
`,(0,m.jsxs)(t.ul,{children:[`
`,(0,m.jsx)(t.li,{children:(0,m.jsx)(t.a,{href:`#weight`,children:`Weight`})}),`
`,(0,m.jsx)(t.li,{children:(0,m.jsx)(t.a,{href:`#size`,children:`Size`})}),`
`,(0,m.jsx)(t.li,{children:(0,m.jsx)(t.a,{href:`#alignment`,children:`Alignment`})}),`
`,(0,m.jsx)(t.li,{children:(0,m.jsx)(t.a,{href:`#font-family`,children:`Font family`})}),`
`,(0,m.jsx)(t.li,{children:(0,m.jsx)(t.a,{href:`#line-height`,children:`Line height`})}),`
`]}),`
`,(0,m.jsxs)(t.p,{children:[`As well as some `,(0,m.jsx)(t.a,{href:`#other-modifiers`,children:`other modifiers`}),`.`]}),`
`,(0,m.jsx)(t.h4,{children:`Weight`}),`
`,(0,m.jsx)(g,{}),`
`,(0,m.jsx)(t.h4,{children:`Size`}),`
`,(0,m.jsxs)(t.p,{children:[`Also automatically sets the matching line-height (`,(0,m.jsx)(t.code,{children:`line`}),` property).`]}),`
`,(0,m.jsx)(_,{}),`
`,(0,m.jsx)(t.h4,{children:`Alignment`}),`
`,(0,m.jsx)(v,{}),`
`,(0,m.jsx)(t.h4,{children:`Font family`}),`
`,(0,m.jsx)(y,{}),`
`,(0,m.jsx)(t.h4,{children:`Line height`}),`
`,(0,m.jsxs)(t.p,{children:[`Line-height will be set automatically based on the `,(0,m.jsx)(t.code,{children:`size`}),` properties, but can also be set separately if needed.`]}),`
`,(0,m.jsx)(b,{}),`
`,(0,m.jsx)(t.h4,{children:`Other modifiers`}),`
`,(0,m.jsx)(t.p,{children:`Although bold, italic and underline are not a standard part of the Eufemia design system for typography (in particular, "medium" should be used instead of "bold"), we still include them as an option for convenience. And there are also cases where an accessibility case can be made for their use.`}),`
`,(0,m.jsx)(x,{}),`
`,(0,m.jsx)(t.h4,{children:`Prose max width`}),`
`,(0,m.jsxs)(t.p,{children:[`The `,(0,m.jsx)(t.code,{children:`proseMaxWidth`}),` property allows you to limit the width of paragraph text based on character count, creating optimal reading line lengths:`]}),`
`,(0,m.jsx)(w,{}),`
`,(0,m.jsx)(t.h4,{children:`Using Typography.Provider`}),`
`,(0,m.jsxs)(t.p,{children:[`Use `,(0,m.jsx)(t.code,{children:`Typography.Provider`}),` to apply `,(0,m.jsx)(t.code,{children:`proseMaxWidth`}),` to multiple paragraphs at once:`]}),`
`,(0,m.jsx)(T,{}),`
`,(0,m.jsx)(t.h3,{children:`Children tag styling`}),`
`,(0,m.jsxs)(t.p,{children:[`Paragraph also adds some default styling to child typography HTML elements. Like `,(0,m.jsx)(t.code,{children:`<b>`}),` or `,(0,m.jsx)(t.code,{children:`<strong>`}),`.`]}),`
`,(0,m.jsxs)(t.h4,{children:[`Paragraphs `,(0,m.jsx)(t.code,{children:`basis`}),` sized`]}),`
`,(0,m.jsx)(S,{}),`
`,(0,m.jsxs)(t.h5,{children:[`Paragraph `,(0,m.jsx)(t.code,{children:`small`}),` sized`]}),`
`,(0,m.jsx)(C,{}),`
`,(0,m.jsx)(t.h5,{children:`Additional Paragraph formatting (not defined yet)`}),`
`,(0,m.jsx)(E,{}),`
`,(0,m.jsx)(t.h3,{children:`Dark surface`}),`
`,(0,m.jsx)(t.p,{children:`Paragraphs automatically adapt their color when rendered on a dark surface:`}),`
`,(0,m.jsx)(O,{}),`
`,(0,m.jsx)(n,{children:(0,m.jsx)(D,{})})]})}function A(e={}){let{wrapper:t}={...u(),...e.components};return t?(0,m.jsx)(t,{...e,children:(0,m.jsx)(k,{...e})}):k(e)}function j(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{A as default};