import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({CompanyName:()=>l,Composition:()=>d,FirstName:()=>s,Inline:()=>f,LastName:()=>c,Placeholder:()=>u}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`FirstName`,children:`<Value.Name.First value="Nora" />
`}),c=()=>(0,o.jsx)(r,{stableName:`LastName`,children:`<Value.Name.Last value="Mørk" />
`}),l=()=>(0,o.jsx)(r,{stableName:`CompanyName`,children:`<Value.Name.Company value="DNB" />
`}),u=()=>(0,o.jsx)(r,{stableName:`Placeholder`,children:`<Value.Name.Last placeholder="Custom placeholder" />
`}),d=()=>(0,o.jsx)(r,{stableName:`Composition`,children:`<Value.Composition>
  <Value.Name.First value="Nora" />
  <Value.Name.Last value="Mørk" />
</Value.Composition>
`}),f=()=>(0,o.jsx)(r,{stableName:`Inline`,children:`<Form.Handler
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
`});function p(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||h(`Examples`,!1),l||h(`Examples.CompanyName`,!0),d||h(`Examples.Composition`,!0),s||h(`Examples.FirstName`,!0),f||h(`Examples.Inline`,!0),c||h(`Examples.LastName`,!0),u||h(`Examples.Placeholder`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`First name`}),`
`,(0,o.jsx)(s,{value:`Nora`}),`
`,(0,o.jsx)(t.h3,{children:`Last name`}),`
`,(0,o.jsx)(c,{value:`Mørk`}),`
`,(0,o.jsx)(t.h3,{children:`Company name`}),`
`,(0,o.jsx)(l,{value:`DNB`}),`
`,(0,o.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Value composition`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Inline`}),`
`,(0,o.jsx)(f,{})]})}function m(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};