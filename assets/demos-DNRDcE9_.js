import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";import{Lr as r}from"./index--zEB_f_m.js";var i=e({CompanyName:()=>c,Composition:()=>u,FirstName:()=>o,Inline:()=>d,LastName:()=>s,Placeholder:()=>l}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Value.Name.First value="Nora" />
`}),s=()=>(0,a.jsx)(n,{children:`<Value.Name.Last value="Mørk" />
`}),c=()=>(0,a.jsx)(n,{children:`<Value.Name.Company value="DNB" />
`}),l=()=>(0,a.jsx)(n,{children:`<Value.Name.Last placeholder="Custom placeholder" />
`}),u=()=>(0,a.jsx)(n,{children:`<Value.Composition>
  <Value.Name.First value="Nora" />
  <Value.Name.Last value="Mørk" />
</Value.Composition>
`}),d=()=>(0,a.jsx)(n,{children:`<Form.Handler
  defaultData={{
    firstName: 'Nora',
    lastName: 'Mørk',
  }}
>
  <P>
    This is before the component{' '}
    <Value.Name.First path="/firstName" inline />{' '}
    <Value.Name.Last path="/lastName" inline /> This is after the component
  </P>
</Form.Handler>
`});function f(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||m(`Examples`,!1),c||m(`Examples.CompanyName`,!0),u||m(`Examples.Composition`,!0),o||m(`Examples.FirstName`,!0),d||m(`Examples.Inline`,!0),s||m(`Examples.LastName`,!0),l||m(`Examples.Placeholder`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`First name`}),`
`,(0,a.jsx)(o,{value:`Nora`}),`
`,(0,a.jsx)(t.h3,{children:`Last name`}),`
`,(0,a.jsx)(s,{value:`Mørk`}),`
`,(0,a.jsx)(t.h3,{children:`Company name`}),`
`,(0,a.jsx)(c,{value:`DNB`}),`
`,(0,a.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Value composition`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`Inline`}),`
`,(0,a.jsx)(d,{})]})}function p(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(f,{...e})}):f(e)}function m(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};