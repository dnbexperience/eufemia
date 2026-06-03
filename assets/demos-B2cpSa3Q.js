import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Button-2YHZk8Pc.js";import{t as i}from"./Iterate-BEyV0dg2.js";import{W as a}from"./index-BCXtuv-b.js";import{t as o}from"./ComponentBox-B2X8809Z.js";var s=e({AnimatedContainer:()=>l,ViewAndEditContainer:()=>u}),c=t(n()),l=()=>(0,c.jsx)(o,{stableName:`AnimatedContainer`,sourceImports:[`import { Button } from '@dnb/eufemia'`,`import { Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Iterate:i,Button:r},children:`<Iterate.Array value={['foo']}>
  <Iterate.AnimatedContainer>
    Item content
    <Iterate.Toolbar>
      <Button variant="tertiary">Your Tool</Button>
      <Iterate.RemoveButton />
    </Iterate.Toolbar>
  </Iterate.AnimatedContainer>
</Iterate.Array>
`}),u=()=>(0,c.jsx)(o,{stableName:`ViewAndEditContainer`,sourceImports:[`import { Button } from '@dnb/eufemia'`,`import { Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Iterate:i,Button:r},children:`<Iterate.Array value={['foo']}>
  <Iterate.ViewContainer>
    Item view content
    <Iterate.Toolbar>
      <Button variant="tertiary">Your Tool</Button>
      <Iterate.ViewContainer.EditButton />
      <Iterate.ViewContainer.RemoveButton />
    </Iterate.Toolbar>
  </Iterate.ViewContainer>

  <Iterate.EditContainer>
    Item edit content
    <Iterate.Toolbar>
      <Button variant="tertiary">Your Tool</Button>
      <Iterate.EditContainer.DoneButton />
      <Iterate.EditContainer.CancelButton />
    </Iterate.Toolbar>
  </Iterate.EditContainer>
</Iterate.Array>
`});function d(e){let t={h2:`h2`,h3:`h3`,...a(),...e.components};return s||p(`Examples`,!1),l||p(`Examples.AnimatedContainer`,!0),u||p(`Examples.ViewAndEditContainer`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.h3,{children:`Using AnimatedContainer`}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsx)(t.h3,{children:`Using ViewContainer and EditContainer`}),`
`,(0,c.jsx)(u,{})]})}function f(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(d,{...e})}):d(e)}function p(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as default};