import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./Iterate-B9FXI9Zb.js";import{Rr as i,wr as a}from"./index-Da-r8F54.js";import{t as o}from"./ComponentBox-DXeEXSK2.js";var s=t({AnimatedContainer:()=>l,ViewAndEditContainer:()=>u}),c=e(n()),l=()=>(0,c.jsx)(o,{stableName:`AnimatedContainer`,sourceImports:[`import { Button } from '@dnb/eufemia'`,`import { Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Iterate:r,Button:a},children:`<Iterate.Array value={['foo']}>
  <Iterate.AnimatedContainer>
    Item content
    <Iterate.Toolbar>
      <Button variant="tertiary">Your Tool</Button>
      <Iterate.RemoveButton />
    </Iterate.Toolbar>
  </Iterate.AnimatedContainer>
</Iterate.Array>
`}),u=()=>(0,c.jsx)(o,{stableName:`ViewAndEditContainer`,sourceImports:[`import { Button } from '@dnb/eufemia'`,`import { Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Iterate:r,Button:a},children:`<Iterate.Array value={['foo']}>
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
`});function d(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return s||p(`Examples`,!1),l||p(`Examples.AnimatedContainer`,!0),u||p(`Examples.ViewAndEditContainer`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.h3,{children:`Using AnimatedContainer`}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsx)(t.h3,{children:`Using ViewContainer and EditContainer`}),`
`,(0,c.jsx)(u,{})]})}function f(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(d,{...e})}):d(e)}function p(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as default};