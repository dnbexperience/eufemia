import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{d as n}from"./HelpButton-sV5p6bwJ.js";import{t as r}from"./H2-DT2jDb2-.js";import{t as i}from"./H3-BwNJxJzd.js";import{t as a}from"./ToggleButton-D3NEk3jO.js";import{W as o,j as s,m as c}from"./index-BCXtuv-b.js";import{t as l}from"./ComponentBox-B2X8809Z.js";var u=e(t()),d=c.div`
  .dnb-heading {
    display: block;
    margin: 0 !important;
  }
`,f=()=>(0,u.jsx)(d,{children:(0,u.jsx)(l,{"data-visual-test":`heading-default`,stableName:`HeadingDefault`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`],__buildScope:{Heading:s},children:`<Heading.Level debug reset={1}>
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
`})}),p=()=>(0,u.jsx)(d,{children:(0,u.jsx)(l,{"data-visual-test":`heading-context`,stableName:`HeadingContext`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`],__buildScope:{Heading:s},children:`<Heading.Level debug reset={1}>
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
`})}),m=()=>(0,u.jsx)(d,{children:(0,u.jsx)(l,{stableName:`HeadingIsolation`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`],__buildScope:{Heading:s,ToggleButton:a},noInline:!0,children:`const App = () => {
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
`})}),h=()=>(0,u.jsx)(d,{children:(0,u.jsx)(l,{"data-visual-test":`heading-mixin`,stableName:`HeadingMix`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`],__buildScope:{Heading:s,H3:i},children:`<Heading.Level debug reset={1}>
  <Heading>h1</Heading>
  <Heading>h2</Heading>

  <H3 level="use">Increase to h3</H3>
  <Heading>h3</Heading>
</Heading.Level>
`})}),g=()=>(0,u.jsx)(l,{hidePreview:!0,stableName:`HeadingInfo`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`],__buildScope:{Heading:s},children:`<Heading.Level reset={1}>
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
`}),_=()=>(0,u.jsx)(l,{hidePreview:!0,stableName:`HeadingInfoSize`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`],__buildScope:{Heading:s},children:`<Heading.Level reset={2}>
  <Heading increase size="xx-large">
    h3, but looks like h1
  </Heading>
</Heading.Level>
`}),v=()=>(0,u.jsx)(l,{hidePreview:!0,stableName:`HeadingInfoLevel`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`],__buildScope:{Heading:s},children:`<Heading.Level reset={1}>
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
`}),y=()=>(0,u.jsx)(l,{hidePreview:!0,stableName:`HeadingInfoBasic`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { Heading, H3, ToggleButton, H1, H2 } from '@dnb/eufemia'`],__buildScope:{H1:n,H2:r},children:`<article>
  <H1 size="large">h1</H1>
  <H2 size="xx-large">h2</H2>
</article>
`});function b(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...o(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`NB:`}),` All the demos do use `,(0,u.jsx)(t.code,{children:`<Heading.Level reset={1} ...`}),`. This way every demo does reset the global level handling. You do not need that in your app.`]}),`
`,(0,u.jsx)(t.h3,{children:`Default headings`}),`
`,(0,u.jsx)(f,{}),`
`,(0,u.jsx)(t.h3,{children:`Heading level context`}),`
`,(0,u.jsx)(p,{}),`
`,(0,u.jsx)(t.h3,{children:`Level isolation`}),`
`,(0,u.jsx)(m,{}),`
`,(0,u.jsx)(t.h3,{children:`Combine with manual heading`}),`
`,(0,u.jsx)(h,{})]})}function x(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(b,{...e})}):b(e)}export{x as default,_ as i,y as n,v as r,g as t};