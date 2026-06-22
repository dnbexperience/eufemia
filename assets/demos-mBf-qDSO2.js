import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{Q as n}from"./Anchor-CDwNjfi4.js";import{t as r}from"./ToggleButton-DoxBGtHF.js";import{r as i}from"./P-CDsgVQgI.js";import{y as a}from"./Table-D3iIoHmL.js";import{t as o}from"./H2-CDxBDFS_.js";import{t as s}from"./H3-642vV_N8.js";import{t as c}from"./Heading-CDZ3ehTc.js";import{B as l,x as u}from"./index-DdG6L_K8.js";import{t as d}from"./ComponentBox-q_23Ylzi.js";var f=e(t()),p=u.div`
  .dnb-heading {
    display: block;
    margin: 0 !important;
  }
`,m=()=>(0,f.jsx)(p,{children:(0,f.jsx)(d,{"data-visual-test":`heading-default`,stableName:`HeadingDefault`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`],__buildScope:{Heading:c},children:`<Heading.Level debug reset={1}>
  <Heading>h1</Heading>
  <Heading>h2</Heading>
  <Heading increase>h3</Heading>
  <Heading increase>h4</Heading>
  <Heading decrease>h3</Heading>
  <Heading level="2" size="x-large">
    h2
  </Heading>
  <Heading skipCorrection level={4}>
    h4
  </Heading>
</Heading.Level>
`})}),h=()=>(0,f.jsx)(p,{children:(0,f.jsx)(d,{"data-visual-test":`heading-context`,stableName:`HeadingContext`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`],__buildScope:{Heading:c},children:`<Heading.Level debug reset={1}>
  <Heading>h1</Heading>
  <Heading>h2</Heading>

  <Heading.Increase>
    <Heading>h3</Heading>
    <Heading>h3</Heading>
  </Heading.Increase>

  <Heading inherit>h3</Heading>

  <Heading.Decrease inherit>
    <Heading>h2</Heading>
    <Heading>h2</Heading>
    <Heading increase>h3</Heading>
    <Heading>h3</Heading>
  </Heading.Decrease>
</Heading.Level>
`})}),g=()=>(0,f.jsx)(p,{children:(0,f.jsx)(d,{stableName:`HeadingIsolation`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`],__buildScope:{Heading:c,ToggleButton:r},noInline:!0,children:`const App = () => {
  const [showHeading, setShowHeading] = useState(false)
  return (
    <Heading.Level debug reset={1}>
      <Heading>h1</Heading>
      <Heading>h2</Heading>

      <Heading.Increase>
        <ToggleButton
          text="Toggle h3"
          checked={showHeading}
          onChange={() => setShowHeading((c) => !c)}
        />
        {showHeading && (
          <>
            <Heading>h3</Heading>
            <Heading>h3</Heading>
            <Heading>h3</Heading>
          </>
        )}
      </Heading.Increase>

      <Heading.Level>
        <Heading>h2</Heading>
      </Heading.Level>
    </Heading.Level>
  )
}
render(<App />)
`})}),_=()=>(0,f.jsx)(p,{children:(0,f.jsx)(d,{"data-visual-test":`heading-mixin`,stableName:`HeadingMix`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`],__buildScope:{Heading:c,H3:s},children:`<Heading.Level debug reset={1}>
  <Heading>h1</Heading>
  <Heading>h2</Heading>

  <H3 level="use">Increase to h3</H3>
  <Heading>h3</Heading>
</Heading.Level>
`})}),v=()=>(0,f.jsx)(d,{hidePreview:!0,stableName:`HeadingInfo`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`],__buildScope:{Heading:c},children:`<Heading.Level reset={1}>
  <Heading>h1</Heading>
  <Heading>h2</Heading>
  <Heading increase>h3</Heading>
  <Heading>still h3</Heading>
  <Heading increase>h4</Heading>
  <Heading increase>h5</Heading>
  <Heading decrease>h4</Heading>
  <Heading level={2}>back to h2</Heading>
  <Heading increase>h3</Heading>
</Heading.Level>
`}),y=()=>(0,f.jsx)(d,{hidePreview:!0,stableName:`HeadingInfoSize`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`],__buildScope:{Heading:c},children:`<Heading.Level reset={2}>
  <Heading increase size="xx-large">
    h3, but looks like h1
  </Heading>
</Heading.Level>
`}),b=()=>(0,f.jsx)(d,{hidePreview:!0,stableName:`HeadingInfoLevel`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`],__buildScope:{Heading:c},children:`<Heading.Level reset={1}>
  <Heading>h1</Heading>
  <Heading.Level level="2">
    <Heading>h2</Heading>
    <Heading increase>h3</Heading>
    <Heading>still h3</Heading>
    <Heading.Increase>
      <Heading>h4</Heading>
      <Heading>still h4</Heading>
    </Heading.Increase>
  </Heading.Level>
</Heading.Level>
`}),x=()=>(0,f.jsx)(d,{hidePreview:!0,stableName:`HeadingInfoBasic`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`],__buildScope:{H1:a,H2:o},children:`<article>
  <H1 size="large">h1</H1>
  <H2 size="xx-large">h2</H2>
</article>
`}),S=()=>(0,f.jsx)(d,{"data-visual-test":`heading-prose-max-width`,stableName:`HeadingProseMaxWidthExample`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`],__buildScope:{Heading:c},children:`<Heading.Level reset={3}>
  <Heading>
    This is a regular heading without any width constraints. It will extend
    to the full width of its container.
  </Heading>
  <Heading proseMaxWidth={40}>
    This heading uses proseMaxWidth={40} to limit its width to
    approximately 40 characters.
  </Heading>
  <Heading proseMaxWidth={20}>
    This heading uses proseMaxWidth={20} for an even narrower reading
    width.
  </Heading>
  <Heading proseMaxWidth>
    This heading uses proseMaxWidth with its default value.
  </Heading>
</Heading.Level>
`});function C(){return(0,f.jsx)(d,{hideCode:!0,scope:{Typography:i},stableName:`HeadingProseMaxWidthProvider`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`,`import Typography from '@dnb/eufemia/elements/typography/Typography'`],__buildScope:{Heading:c,Provider:n},children:`<Heading.Level reset={3}>
  <Typography.Provider proseMaxWidth={40}>
    <Heading>
      This heading is inside a Typography.Provider with proseMaxWidth=
      {40}
    </Heading>
    <Heading proseMaxWidth={20}>
      This heading overrides the provider with proseMaxWidth={20}
    </Heading>
  </Typography.Provider>
</Heading.Level>
`})}function w(e){let t={code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,strong:`strong`,...l(),...e.components};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(t.h2,{children:`Demos`}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsx)(t.strong,{children:`NB:`}),` All the demos do use `,(0,f.jsx)(t.code,{children:`<Heading.Level reset={1} ...`}),`. This way every demo does reset the global level handling. You do not need that in your app.`]}),`
`,(0,f.jsx)(t.h3,{children:`Default headings`}),`
`,(0,f.jsx)(m,{}),`
`,(0,f.jsx)(t.h3,{children:`Heading level context`}),`
`,(0,f.jsx)(h,{}),`
`,(0,f.jsx)(t.h3,{children:`Level isolation`}),`
`,(0,f.jsx)(g,{}),`
`,(0,f.jsx)(t.h3,{children:`Combine with manual heading`}),`
`,(0,f.jsx)(_,{}),`
`,(0,f.jsx)(t.h3,{children:`Prose max width`}),`
`,(0,f.jsxs)(t.p,{children:[`The `,(0,f.jsx)(t.code,{children:`proseMaxWidth`}),` property allows you to limit the width of heading text based on character count, creating optimal reading line lengths:`]}),`
`,(0,f.jsx)(S,{}),`
`,(0,f.jsx)(t.h4,{children:`Using Typography.Provider`}),`
`,(0,f.jsxs)(t.p,{children:[`Use `,(0,f.jsx)(t.code,{children:`Typography.Provider`}),` to apply `,(0,f.jsx)(t.code,{children:`proseMaxWidth`}),` to multiple headings at once:`]}),`
`,(0,f.jsx)(C,{})]})}function T(e={}){let{wrapper:t}={...l(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(w,{...e})}):w(e)}export{T as default,y as i,x as n,b as r,v as t};