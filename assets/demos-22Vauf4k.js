import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{s as r}from"./ToggleButton-DfKpi57X.js";import{j as i,w as a}from"./forms-D54jfDKN.js";import{U as o}from"./index-BsJ3GLEw.js";import{t as s}from"./ComponentBox-sLMgHvLi.js";var c=e({CompanyName:()=>f,Composition:()=>m,FirstName:()=>u,FormHandler:()=>h,InvalidSyntax:()=>_,LastName:()=>d,Placeholder:()=>p,ValidationRequired:()=>y,WithError:()=>v,WithHelp:()=>g}),l=t(n()),u=()=>(0,l.jsx)(s,{stableName:`FirstName`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:i},children:`<Field.Name.First
  value="Nora"
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,l.jsx)(s,{stableName:`LastName`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:i},children:`<Field.Name.Last
  value="Mørk"
  onChange={(value) => console.log('onChange', value)}
/>
`}),f=()=>(0,l.jsx)(s,{stableName:`CompanyName`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:i},children:`<Field.Name.Company
  value="DNB"
  onChange={(value) => console.log('onChange', value)}
/>
`}),p=()=>(0,l.jsx)(s,{stableName:`Placeholder`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:i},children:`<Field.Name.Last
  placeholder="Custom placeholder"
  onChange={(value) => console.log('onChange', value)}
/>
`}),m=()=>(0,l.jsx)(s,{stableName:`Composition`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:i},children:`<Field.Composition width="large">
  <Field.Name.First
    value="Nora"
    onChange={(value) => console.log('onChange', value)}
  />
  <Field.Name.Last
    value="Mørk"
    onChange={(value) => console.log('onChange', value)}
  />
</Field.Composition>
`}),h=()=>(0,l.jsx)(s,{stableName:`FormHandler`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Form:a,Flex:r,Field:i},children:`<Form.Handler
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
`}),g=()=>(0,l.jsx)(s,{stableName:`WithHelp`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:i},children:`<Field.Name.First
  value="Nora"
  help={{
    title: 'Help is available',
    content:
      'Use your gifts to teach and help others. Acknowledge them as gifts (even if only in your mind). Take some time to list your strengths as well as the ways in which you could share them with the world around you and how that truly is a gift to others.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),_=()=>(0,l.jsx)(s,{stableName:`InvalidSyntax`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:i},children:`<Field.Name.First
  value="Invalid @ syntax"
  onChange={(value) => console.log('onChange', value)}
  validateInitially
/>
`}),v=()=>(0,l.jsx)(s,{stableName:`WithError`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:i},children:`<Field.Name.First
  value="Nora"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),y=()=>(0,l.jsx)(s,{stableName:`ValidationRequired`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:i},children:`<Field.Name.First
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`});function b(e){let t={h2:`h2`,h3:`h3`,...o(),...e.components};return c||S(`Examples`,!1),f||S(`Examples.CompanyName`,!0),m||S(`Examples.Composition`,!0),u||S(`Examples.FirstName`,!0),h||S(`Examples.FormHandler`,!0),_||S(`Examples.InvalidSyntax`,!0),d||S(`Examples.LastName`,!0),p||S(`Examples.Placeholder`,!0),y||S(`Examples.ValidationRequired`,!0),v||S(`Examples.WithError`,!0),g||S(`Examples.WithHelp`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`Demos`}),`
`,(0,l.jsx)(t.h3,{children:`First name`}),`
`,(0,l.jsx)(u,{}),`
`,(0,l.jsx)(t.h3,{children:`Last name`}),`
`,(0,l.jsx)(d,{}),`
`,(0,l.jsx)(t.h3,{children:`Company name`}),`
`,(0,l.jsx)(f,{}),`
`,(0,l.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,l.jsx)(p,{}),`
`,(0,l.jsx)(t.h3,{children:`Field composition`}),`
`,(0,l.jsx)(m,{}),`
`,(0,l.jsx)(t.h3,{children:`Data Context`}),`
`,(0,l.jsx)(h,{}),`
`,(0,l.jsx)(t.h3,{children:`With help`}),`
`,(0,l.jsx)(g,{}),`
`,(0,l.jsx)(t.h3,{children:`Invalid syntax`}),`
`,(0,l.jsx)(_,{}),`
`,(0,l.jsx)(t.h3,{children:`Error message`}),`
`,(0,l.jsx)(v,{}),`
`,(0,l.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,l.jsx)(y,{})]})}function x(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(b,{...e})}):b(e)}function S(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};