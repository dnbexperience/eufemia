import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";import{Lr as r}from"./index--zEB_f_m.js";var i=e({AnimatedContainer:()=>o,ViewAndEditContainer:()=>s}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Iterate.Array value={['foo']}>
  <Iterate.AnimatedContainer>
    Item content
    <Iterate.Toolbar>
      <Button variant="tertiary">Your Tool</Button>
      <Iterate.RemoveButton />
    </Iterate.Toolbar>
  </Iterate.AnimatedContainer>
</Iterate.Array>
`}),s=()=>(0,a.jsx)(n,{children:`<Iterate.Array value={['foo']}>
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
`});function c(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||u(`Examples`,!1),o||u(`Examples.AnimatedContainer`,!0),s||u(`Examples.ViewAndEditContainer`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Using AnimatedContainer`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Using ViewContainer and EditContainer`}),`
`,(0,a.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as default};