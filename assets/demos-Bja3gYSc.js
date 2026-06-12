import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Card-Dsou21Li.js";import{t as i}from"./Form-B9l6EvGx.js";import{t as a}from"./Field-DHicZJEj.js";import{t as o}from"./Iterate-B2rVv1xi.js";import{K as s}from"./index-CsG353ar.js";import{t as c}from"./ComponentBox-Cb1rLw_D.js";var l=e({Disabled:()=>g,Empty:()=>d,IterateArray:()=>b,Label:()=>p,LabelAndValue:()=>m,LongLabel:()=>y,NonNorwegianPostalCode:()=>S,Placeholder:()=>f,SettingCountryBasedOnPath:()=>x,ValidationRequired:()=>v,WithError:()=>_,WithHelp:()=>h}),u=t(n()),d=()=>(0,u.jsx)(c,{stableName:`Empty`,sourceImports:[`import { Field, Form, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a},children:`<Field.PostalCodeAndCity
  postalCode={{
    onChange: (value) => console.log('postalCode onChange', value),
  }}
  city={{
    onChange: (value) => console.log('city onChange', value),
  }}
/>
`}),f=()=>(0,u.jsx)(c,{stableName:`Placeholder`,sourceImports:[`import { Field, Form, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a},children:`<Field.PostalCodeAndCity
  postalCode={{
    placeholder: '????',
    onChange: (value) => console.log('postalCode onChange', value),
  }}
  city={{
    placeholder: 'Your city',
    onChange: (value) => console.log('city onChange', value),
  }}
/>
`}),p=()=>(0,u.jsx)(c,{stableName:`Label`,sourceImports:[`import { Field, Form, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a},children:`<Field.PostalCodeAndCity
  postalCode={{
    label: 'PNR',
    onChange: (value) => console.log('postalCode onChange', value),
  }}
  city={{
    label: 'CTY',
    onChange: (value) => console.log('city onChange', value),
  }}
/>
`}),m=()=>(0,u.jsx)(c,{"data-visual-test":`postal-code-and-city-label`,stableName:`LabelAndValue`,sourceImports:[`import { Field, Form, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a},children:`<Field.PostalCodeAndCity
  postalCode={{
    label: 'Pnr.',
    value: '0788',
    onChange: (value) => console.log('postalCode onChange', value),
  }}
  city={{
    value: 'Oslo',
    onChange: (value) => console.log('city onChange', value),
  }}
/>
`}),h=()=>(0,u.jsx)(c,{stableName:`WithHelp`,sourceImports:[`import { Field, Form, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a},children:`<Field.PostalCodeAndCity
  postalCode={{
    onChange: (value) => console.log('postalCode onChange', value),
  }}
  city={{
    onChange: (value) => console.log('city onChange', value),
  }}
  help={{
    title: 'Help is available',
    content:
      'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
  }}
/>
`}),g=()=>(0,u.jsx)(c,{stableName:`Disabled`,sourceImports:[`import { Field, Form, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a},children:`<Field.PostalCodeAndCity
  postalCode={{
    value: '1234',
    disabled: true,
    onChange: (value) => console.log('postalCode onChange', value),
  }}
  city={{
    value: 'Oslo',
    disabled: true,
    onChange: (value) => console.log('city onChange', value),
  }}
/>
`}),_=()=>(0,u.jsx)(c,{"data-visual-test":`postal-code-and-city-error`,stableName:`WithError`,sourceImports:[`import { Field, Form, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a},children:`<Field.PostalCodeAndCity
  postalCode={{}}
  city={{}}
  error={new Error('This is what is wrong...')}
/>
`}),v=()=>(0,u.jsx)(c,{stableName:`ValidationRequired`,sourceImports:[`import { Field, Form, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a},children:`<Field.PostalCodeAndCity
  postalCode={{
    required: true,
  }}
  city={{
    required: true,
  }}
/>
`}),y=()=>(0,u.jsx)(c,{"data-visual-test":`postal-code-and-city-long-label`,stableName:`LongLabel`,sourceImports:[`import { Field, Form, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a},children:`<Field.PostalCodeAndCity
  postalCode={{
    label: 'With a very long label',
  }}
  city={{
    label: 'With a very long label',
  }}
/>
`}),b=()=>(0,u.jsx)(c,{stableName:`IterateArray`,sourceImports:[`import { Field, Form, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Iterate:o,Field:a},children:`<Iterate.Array
  value={[
    {
      postalCode: '0788',
      city: 'Oslo',
    },
    {
      postalCode: '0789',
      city: 'Bergen',
    },
  ]}
>
  <Field.PostalCodeAndCity
    postalCode={{
      itemPath: '/postalCode',
    }}
    city={{
      itemPath: '/city',
    }}
  />
</Iterate.Array>
`}),x=()=>(0,u.jsx)(c,{stableName:`SettingCountryBasedOnPath`,sourceImports:[`import { Field, Form, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Card:r,Field:a},children:`<Form.Handler>
  <Form.Card>
    <Field.SelectCountry path="/country" defaultValue="NO" />
    <Field.PostalCodeAndCity countryCode="/country" />
  </Form.Card>
</Form.Handler>
`}),S=()=>(0,u.jsx)(c,{stableName:`NonNorwegianPostalCode`,sourceImports:[`import { Field, Form, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Field:a},children:`<Form.Handler
  translations={{
    'nb-NO': {
      'PostalCode.errorPattern':
        'Dette er ikke et gyldig postnummer (fem siffer).',
    },
    'en-GB': {
      'PostalCode.errorPattern':
        'This is not a valid postal code (five-digits).',
    },
  }}
>
  <Field.PostalCodeAndCity
    countryCode="DE"
    postalCode={{
      pattern: '^[0-9]{5}$',
      onBlurValidator: undefined,
      mask: [/\\d/, /\\d/, /\\d/, /\\d/, /\\d/],
      placeholder: '00000',
      width: '5.4rem',
    }}
    city={{
      pattern: '^[a-zA-ZäöüÄÖÜß -]+$',
      width: 'stretch',
    }}
  />
</Form.Handler>
`});function C(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...s(),...e.components},{VisibleWhenVisualTest:n}=t;return l||T(`Examples`,!1),g||T(`Examples.Disabled`,!0),d||T(`Examples.Empty`,!0),b||T(`Examples.IterateArray`,!0),p||T(`Examples.Label`,!0),m||T(`Examples.LabelAndValue`,!0),y||T(`Examples.LongLabel`,!0),S||T(`Examples.NonNorwegianPostalCode`,!0),f||T(`Examples.Placeholder`,!0),x||T(`Examples.SettingCountryBasedOnPath`,!0),v||T(`Examples.ValidationRequired`,!0),_||T(`Examples.WithError`,!0),h||T(`Examples.WithHelp`,!0),n||T(`VisibleWhenVisualTest`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Empty`}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,u.jsx)(f,{}),`
`,(0,u.jsx)(t.h3,{children:`Label`}),`
`,(0,u.jsx)(p,{}),`
`,(0,u.jsx)(t.h3,{children:`Label and value`}),`
`,(0,u.jsx)(m,{}),`
`,(0,u.jsx)(t.h3,{children:`Iterate over array`}),`
`,(0,u.jsxs)(t.p,{children:[`By using the `,(0,u.jsx)(t.code,{children:`itemPath`}),` property, you can iterate over an array and use the `,(0,u.jsx)(t.code,{children:`postalCode`}),` and `,(0,u.jsx)(t.code,{children:`city`}),` properties to render the fields.`]}),`
`,(0,u.jsx)(b,{}),`
`,(0,u.jsx)(t.h3,{children:`Disabled`}),`
`,(0,u.jsx)(g,{}),`
`,(0,u.jsx)(t.h3,{children:`With help`}),`
`,(0,u.jsx)(h,{}),`
`,(0,u.jsx)(t.h3,{children:`Error`}),`
`,(0,u.jsx)(_,{}),`
`,(0,u.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,u.jsx)(v,{}),`
`,(0,u.jsx)(t.h3,{children:`Path Based Country`}),`
`,(0,u.jsxs)(t.p,{children:[`The `,(0,u.jsx)(t.code,{children:`country`}),` property supports a field path as value. This allows you to set the `,(0,u.jsx)(t.code,{children:`country`}),` based on the value of another field.`]}),`
`,(0,u.jsx)(x,{}),`
`,(0,u.jsx)(t.h3,{children:`Non-Norwegian Postal Codes`}),`
`,(0,u.jsxs)(t.p,{children:[`If you want to allow for a postal code that is not Norwegian, just set the `,(0,u.jsx)(t.code,{children:`country`}),` property to the desired country, and add your own custom validation.`]}),`
`,(0,u.jsxs)(t.p,{children:[`NB: As of today, setting `,(0,u.jsx)(t.code,{children:`country`}),` property to anything other than `,(0,u.jsx)(t.code,{children:`NO`}),` will only remove the default norwegian postal code pattern, mask, and placeholder, but not actually set the postal code pattern, mask, and placeholder for the value provided to the `,(0,u.jsx)(t.code,{children:`country`}),` property. This functionality will hopefully be implemented in the future.`]}),`
`,(0,u.jsx)(S,{}),`
`,(0,u.jsx)(n,{children:(0,u.jsx)(y,{})})]})}function w(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(C,{...e})}):C(e)}function T(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{w as default};