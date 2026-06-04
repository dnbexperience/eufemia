import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./P-avM674pJ.js";import{t as i}from"./Form-913YPZs6.js";import{t as a}from"./Value-C2hl5_67.js";import{W as o}from"./index-D7e1avVt.js";import{t as s}from"./ComponentBox-CE7bpcJy.js";var c=e({Empty:()=>u,Inline:()=>g,Label:()=>p,LabelAndValue:()=>m,LabelAndValueFromDataContext:()=>h,Placeholder:()=>d,WithValue:()=>f}),l=t(n()),u=()=>(0,l.jsx)(s,{stableName:`Empty`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.PostalCodeAndCity showEmpty />
`}),d=()=>(0,l.jsx)(s,{stableName:`Placeholder`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.PostalCodeAndCity placeholder="The value was not filled in" />
`}),f=()=>(0,l.jsx)(s,{stableName:`WithValue`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.PostalCodeAndCity value="0010 Oslo" />
`}),p=()=>(0,l.jsx)(s,{stableName:`Label`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.PostalCodeAndCity label="Label text" showEmpty />
`}),m=()=>(0,l.jsx)(s,{stableName:`LabelAndValue`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.PostalCodeAndCity label="Label text" value="0010 Oslo" />
`}),h=()=>(0,l.jsx)(s,{stableName:`LabelAndValueFromDataContext`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Value:a},children:`<Form.Handler
  data={{
    myPostalCode: '0010',
    myCity: 'Oslo',
  }}
>
  <Value.PostalCodeAndCity
    postalCode={{
      path: '/myPostalCode',
    }}
    city={{
      path: '/myCity',
    }}
  />
</Form.Handler>
`}),g=()=>(0,l.jsx)(s,{stableName:`Inline`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{P:r,Value:a},children:`<P>
  This is before the component{' '}
  <Value.PostalCodeAndCity value="0010 Oslo" inline /> This is after the
  component
</P>
`});function _(e){let t={h2:`h2`,h3:`h3`,...o(),...e.components};return c||y(`Examples`,!1),u||y(`Examples.Empty`,!0),g||y(`Examples.Inline`,!0),p||y(`Examples.Label`,!0),m||y(`Examples.LabelAndValue`,!0),h||y(`Examples.LabelAndValueFromDataContext`,!0),d||y(`Examples.Placeholder`,!0),f||y(`Examples.WithValue`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`Demos`}),`
`,(0,l.jsx)(t.h3,{children:`Empty`}),`
`,(0,l.jsx)(u,{}),`
`,(0,l.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,l.jsx)(d,{}),`
`,(0,l.jsx)(t.h3,{children:`Value`}),`
`,(0,l.jsx)(f,{}),`
`,(0,l.jsx)(t.h3,{children:`Label`}),`
`,(0,l.jsx)(p,{}),`
`,(0,l.jsx)(t.h3,{children:`Label and value`}),`
`,(0,l.jsx)(m,{}),`
`,(0,l.jsx)(t.h3,{children:`Label and value from the DataContext`}),`
`,(0,l.jsx)(h,{}),`
`,(0,l.jsx)(t.h3,{children:`Inline`}),`
`,(0,l.jsx)(g,{})]})}function v(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as default};