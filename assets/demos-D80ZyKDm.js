import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{H as n,t as r}from"./Anchor-VfvEVqst.js";import{t as i}from"./Button-CMFzxkr4.js";import{t as a}from"./P-avM674pJ.js";import{t as o}from"./Section-BidpVCcL.js";import{mt as s}from"./Selection-BFV7H91n.js";import{W as c}from"./index-D7e1avVt.js";import{t as l}from"./ComponentBox-CE7bpcJy.js";var u=e(t()),d=()=>(0,u.jsx)(l,{hideCode:!0,stableName:`ThemeBasis`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { P, Button, Anchor, Section, Dropdown } from '@dnb/eufemia'`,`import { Theme, ThemeNames } from '@dnb/eufemia/shared'`],__buildScope:{P:a,Dropdown:s,Theme:n},noInline:!0,children:`const MyColors = styled.div\`
  .eufemia-theme__dnb {
    --token-color-text-action: var(--color-sea-green);
  }
  .eufemia-theme__sbanken {
    --token-color-text-action: var(--sb-color-purple-alternative);
  }
\`
const MyComponent = () => {
  return (
    <P
      top
      style={{
        color: 'var(--token-color-text-action)',
      }}
    >
      Text with different color based on theme. Change the theme to see the
      effect.
    </P>
  )
}
const Demo = () => {
  const [name, setName] = useState<ThemeNames>('dnb' as ThemeNames)
  return (
    <MyColors>
      <Dropdown
        data={{
          dnb: 'DNB',
          sbanken: 'Sbanken',
        }}
        value={name}
        onChange={({ data }) => setName(data.selectedKey as ThemeNames)}
      />
      <Theme name={name}>
        <MyComponent />
      </Theme>
    </MyColors>
  )
}
render(<Demo />)
`}),f=()=>(0,u.jsx)(l,{"data-visual-test":`theme-surface-dark`,stableName:`ThemeSurfaceDark`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { P, Button, Anchor, Section, Dropdown } from '@dnb/eufemia'`,`import { Theme, ThemeNames } from '@dnb/eufemia/shared'`],__buildScope:{Theme:n,Button:i,Anchor:r},children:`<section
  style={{
    padding: '1rem',
    backgroundColor: 'var(--token-color-decorative-first-bold-static)',
  }}
>
  <Theme.Context surface="dark">
    <Button right>Primary button</Button>
    <Button variant="secondary" right>
      Secondary button
    </Button>
    <Anchor href="/">Anchor on dark surface</Anchor>
  </Theme.Context>
</section>
`}),p=()=>(0,u.jsx)(l,{"data-visual-test":`theme-surface-initial`,stableName:`ThemeSurfaceInitial`,sourceImports:[`import { useState } from 'react'`,`import styled from '@emotion/styled'`,`import { P, Button, Anchor, Section, Dropdown } from '@dnb/eufemia'`,`import { Theme, ThemeNames } from '@dnb/eufemia/shared'`],__buildScope:{Section:o,Button:i,Theme:n},children:`<Section surface="dark" innerSpace>
  <Button right>Dark surface button</Button>
  <Theme.Context surface="initial">
    <Button>Default surface button</Button>
  </Theme.Context>
</Section>
`});function m(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...c(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Basis example`}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsx)(t.h3,{children:`Surface dark`}),`
`,(0,u.jsxs)(t.p,{children:[`Use `,(0,u.jsx)(t.code,{children:`surface="dark"`}),` to adjust component styles for dark backgrounds.`]}),`
`,(0,u.jsx)(f,{}),`
`,(0,u.jsx)(t.h3,{children:`Surface initial`}),`
`,(0,u.jsxs)(t.p,{children:[`Use `,(0,u.jsx)(t.code,{children:`surface="initial"`}),` to reset components back to their default surface behavior inside a dark surface context.`]}),`
`,(0,u.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(m,{...e})}):m(e)}export{h as default};