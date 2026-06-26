import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{t as n}from"./ToggleButton-DM984GyO.js";import{y as r}from"./Table-jVxPr22l.js";import{t as i}from"./H2-DeJy7uXP.js";import{t as a}from"./H3-E108ZQIf.js";import{t as o}from"./Typography-CvEgn6zc.js";import{t as s}from"./Heading-DAtQYz9n.js";import{U as c,w as l}from"./index-kfZVC31v.js";import{t as u}from"./ComponentBox-qLaLt9T0.js";var d=e(t()),f=l.div`
  .dnb-heading {
    display: block;
    margin: 0 !important;
  }
`,p=()=>(0,d.jsx)(f,{children:(0,d.jsx)(u,{"data-visual-test":`heading-default`,stableName:`HeadingDefault`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`,`import { Typography } from '@dnb/eufemia/elements'`],__buildScope:{Heading:s},children:`<Heading.Level debug reset={1}>
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
`})}),m=()=>(0,d.jsx)(f,{children:(0,d.jsx)(u,{"data-visual-test":`heading-context`,stableName:`HeadingContext`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`,`import { Typography } from '@dnb/eufemia/elements'`],__buildScope:{Heading:s},children:`<Heading.Level debug reset={1}>
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
`})}),h=()=>(0,d.jsx)(f,{children:(0,d.jsx)(u,{stableName:`HeadingIsolation`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`,`import { Typography } from '@dnb/eufemia/elements'`],__buildScope:{Heading:s,ToggleButton:n},noInline:!0,children:`const App = () => {
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
`})}),g=()=>(0,d.jsx)(f,{children:(0,d.jsx)(u,{"data-visual-test":`heading-mixin`,stableName:`HeadingMix`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`,`import { Typography } from '@dnb/eufemia/elements'`],__buildScope:{Heading:s,H3:a},children:`<Heading.Level debug reset={1}>
  <Heading>h1</Heading>
  <Heading>h2</Heading>

  <H3 level="use">Increase to h3</H3>
  <Heading>h3</Heading>
</Heading.Level>
`})}),_=()=>(0,d.jsx)(u,{hidePreview:!0,stableName:`HeadingInfo`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`,`import { Typography } from '@dnb/eufemia/elements'`],__buildScope:{Heading:s},children:`<Heading.Level reset={1}>
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
`}),v=()=>(0,d.jsx)(u,{hidePreview:!0,stableName:`HeadingInfoSize`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`,`import { Typography } from '@dnb/eufemia/elements'`],__buildScope:{Heading:s},children:`<Heading.Level reset={2}>
  <Heading increase size="xx-large">
    h3, but looks like h1
  </Heading>
</Heading.Level>
`}),y=()=>(0,d.jsx)(u,{hidePreview:!0,stableName:`HeadingInfoLevel`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`,`import { Typography } from '@dnb/eufemia/elements'`],__buildScope:{Heading:s},children:`<Heading.Level reset={1}>
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
`}),b=()=>(0,d.jsx)(u,{hidePreview:!0,stableName:`HeadingInfoBasic`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`,`import { Typography } from '@dnb/eufemia/elements'`],__buildScope:{H1:r,H2:i},children:`<article>
  <H1 size="large">h1</H1>
  <H2 size="xx-large">h2</H2>
</article>
`}),x=()=>(0,d.jsx)(u,{"data-visual-test":`heading-prose-max-width`,stableName:`HeadingProseMaxWidthExample`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`,`import { Typography } from '@dnb/eufemia/elements'`],__buildScope:{Heading:s},children:`<Heading.Level reset={3}>
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
`});function S(){return(0,d.jsx)(u,{hideCode:!0,scope:{Typography:o},stableName:`HeadingProseMaxWidthProvider`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`,`import { Typography } from '@dnb/eufemia/elements'`],__buildScope:{Heading:s,Typography:o},children:`<Heading.Level reset={3}>
  <Typography.Context proseMaxWidth={40}>
    <Heading>
      This heading is inside a Typography.Context with proseMaxWidth=
      {40}
    </Heading>
    <Heading proseMaxWidth={20}>
      This heading overrides the provider with proseMaxWidth={20}
    </Heading>
  </Typography.Context>
</Heading.Level>
`})}function C(e){let t={code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,strong:`strong`,...c(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsxs)(t.p,{children:[(0,d.jsx)(t.strong,{children:`NB:`}),` All the demos do use `,(0,d.jsx)(t.code,{children:`<Heading.Level reset={1} ...`}),`. This way every demo does reset the global level handling. You do not need that in your app.`]}),`
`,(0,d.jsx)(t.h3,{children:`Default headings`}),`
`,(0,d.jsx)(p,{}),`
`,(0,d.jsx)(t.h3,{children:`Heading level context`}),`
`,(0,d.jsx)(m,{}),`
`,(0,d.jsx)(t.h3,{children:`Level isolation`}),`
`,(0,d.jsx)(h,{}),`
`,(0,d.jsx)(t.h3,{children:`Combine with manual heading`}),`
`,(0,d.jsx)(g,{}),`
`,(0,d.jsx)(t.h3,{children:`Prose max width`}),`
`,(0,d.jsxs)(t.p,{children:[`The `,(0,d.jsx)(t.code,{children:`proseMaxWidth`}),` property allows you to limit the width of heading text based on character count, creating optimal reading line lengths:`]}),`
`,(0,d.jsx)(x,{}),`
`,(0,d.jsx)(t.h4,{children:`Using Typography.Context`}),`
`,(0,d.jsxs)(t.p,{children:[`Use `,(0,d.jsx)(t.code,{children:`Typography.Context`}),` to apply `,(0,d.jsx)(t.code,{children:`proseMaxWidth`}),` to multiple headings at once:`]}),`
`,(0,d.jsx)(S,{})]})}function w(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(C,{...e})}):C(e)}export{w as default,v as i,b as n,y as r,_ as t};