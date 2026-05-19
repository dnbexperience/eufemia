import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({AnimatedContainer:()=>s,ViewAndEditContainer:()=>c}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`AnimatedContainer`,children:`<Iterate.Array value={['foo']}>
  <Iterate.AnimatedContainer>
    Item content
    <Iterate.Toolbar>
      <Button variant="tertiary">Your Tool</Button>
      <Iterate.RemoveButton />
    </Iterate.Toolbar>
  </Iterate.AnimatedContainer>
</Iterate.Array>
`}),c=()=>(0,o.jsx)(r,{stableName:`ViewAndEditContainer`,children:`<Iterate.Array value={['foo']}>
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
`});function l(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||d(`Examples`,!1),s||d(`Examples.AnimatedContainer`,!0),c||d(`Examples.ViewAndEditContainer`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Using AnimatedContainer`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Using ViewContainer and EditContainer`}),`
`,(0,o.jsx)(c,{})]})}function u(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};