import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({CompanyName:()=>l,Composition:()=>d,FirstName:()=>s,FormHandler:()=>f,InvalidSyntax:()=>m,LastName:()=>c,Placeholder:()=>u,ValidationRequired:()=>g,WithError:()=>h,WithHelp:()=>p}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`FirstName`,children:`<Field.Name.First
  value="Nora"
  onChange={(value) => console.log('onChange', value)}
/>
`}),c=()=>(0,o.jsx)(r,{stableName:`LastName`,children:`<Field.Name.Last
  value="Mørk"
  onChange={(value) => console.log('onChange', value)}
/>
`}),l=()=>(0,o.jsx)(r,{stableName:`CompanyName`,children:`<Field.Name.Company
  value="DNB"
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,o.jsx)(r,{stableName:`Placeholder`,children:`<Field.Name.Last
  placeholder="Custom placeholder"
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,o.jsx)(r,{stableName:`Composition`,children:`<Field.Composition width="large">
  <Field.Name.First
    value="Nora"
    onChange={(value) => console.log('onChange', value)}
  />
  <Field.Name.Last
    value="Mørk"
    onChange={(value) => console.log('onChange', value)}
  />
</Field.Composition>
`}),f=()=>(0,o.jsx)(r,{stableName:`FormHandler`,children:`<Form.Handler
  defaultData={{
    firstName: 'Nora',
    lastName: 'Mørk',
  }}
  onChange={(value) => console.log('onChange', value)}
>
  <Flex.Stack>
    <Field.Name.First path="/firstName" />
    <Field.Name.Last path="/lastName" />
  </Flex.Stack>
</Form.Handler>
`}),p=()=>(0,o.jsx)(r,{stableName:`WithHelp`,children:`<Field.Name.First
  value="Nora"
  help={{
    title: 'Help is available',
    content:
      'Use your gifts to teach and help others. Acknowledge them as gifts (even if only in your mind). Take some time to list your strengths as well as the ways in which you could share them with the world around you and how that truly is a gift to others.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),m=()=>(0,o.jsx)(r,{stableName:`InvalidSyntax`,children:`<Field.Name.First
  value="Invalid @ syntax"
  onChange={(value) => console.log('onChange', value)}
  validateInitially
/>
`}),h=()=>(0,o.jsx)(r,{stableName:`WithError`,children:`<Field.Name.First
  value="Nora"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),g=()=>(0,o.jsx)(r,{stableName:`ValidationRequired`,children:`<Field.Name.First
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`});function _(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||y(`Examples`,!1),l||y(`Examples.CompanyName`,!0),d||y(`Examples.Composition`,!0),s||y(`Examples.FirstName`,!0),f||y(`Examples.FormHandler`,!0),m||y(`Examples.InvalidSyntax`,!0),c||y(`Examples.LastName`,!0),u||y(`Examples.Placeholder`,!0),g||y(`Examples.ValidationRequired`,!0),h||y(`Examples.WithError`,!0),p||y(`Examples.WithHelp`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`First name`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Last name`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Company name`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Field composition`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Data Context`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`With help`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`Invalid syntax`}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsx)(t.h3,{children:`Error message`}),`
`,(0,o.jsx)(h,{}),`
`,(0,o.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,o.jsx)(g,{})]})}function v(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as default};