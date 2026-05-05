import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r}from"./index-CMgyXmp3.js";var i=e({Disabled:()=>d,Empty:()=>o,IterateArray:()=>h,Label:()=>c,LabelAndValue:()=>l,LongLabel:()=>m,NonNorwegianPostalCode:()=>_,Placeholder:()=>s,SettingCountryBasedOnPath:()=>g,ValidationRequired:()=>p,WithError:()=>f,WithHelp:()=>u}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Field.PostalCodeAndCity
  postalCode={{
    onChange: (value) => console.log('postalCode onChange', value),
  }}
  city={{
    onChange: (value) => console.log('city onChange', value),
  }}
/>
`}),s=()=>(0,a.jsx)(n,{children:`<Field.PostalCodeAndCity
  postalCode={{
    placeholder: '????',
    onChange: (value) => console.log('postalCode onChange', value),
  }}
  city={{
    placeholder: 'Your city',
    onChange: (value) => console.log('city onChange', value),
  }}
/>
`}),c=()=>(0,a.jsx)(n,{children:`<Field.PostalCodeAndCity
  postalCode={{
    label: 'PNR',
    onChange: (value) => console.log('postalCode onChange', value),
  }}
  city={{
    label: 'CTY',
    onChange: (value) => console.log('city onChange', value),
  }}
/>
`}),l=()=>(0,a.jsx)(n,{"data-visual-test":`postal-code-and-city-label`,children:`<Field.PostalCodeAndCity
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
`}),u=()=>(0,a.jsx)(n,{children:`<Field.PostalCodeAndCity
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
`}),d=()=>(0,a.jsx)(n,{children:`<Field.PostalCodeAndCity
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
`}),f=()=>(0,a.jsx)(n,{"data-visual-test":`postal-code-and-city-error`,children:`<Field.PostalCodeAndCity
  postalCode={{}}
  city={{}}
  error={new Error('This is what is wrong...')}
/>
`}),p=()=>(0,a.jsx)(n,{children:`<Field.PostalCodeAndCity
  postalCode={{
    required: true,
  }}
  city={{
    required: true,
  }}
/>
`}),m=()=>(0,a.jsx)(n,{"data-visual-test":`postal-code-and-city-long-label`,children:`<Field.PostalCodeAndCity
  postalCode={{
    label: 'With a very long label',
  }}
  city={{
    label: 'With a very long label',
  }}
/>
`}),h=()=>(0,a.jsx)(n,{children:`<Iterate.Array
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
`}),g=()=>(0,a.jsx)(n,{children:`<Form.Handler>
  <Form.Card>
    <Field.SelectCountry path="/country" defaultValue="NO" />
    <Field.PostalCodeAndCity countryCode="/country" />
  </Form.Card>
</Form.Handler>
`}),_=()=>(0,a.jsx)(n,{children:`<Form.Handler
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
`});function v(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components},{VisibleWhenVisualTest:n}=t;return i||b(`Examples`,!1),d||b(`Examples.Disabled`,!0),o||b(`Examples.Empty`,!0),h||b(`Examples.IterateArray`,!0),c||b(`Examples.Label`,!0),l||b(`Examples.LabelAndValue`,!0),m||b(`Examples.LongLabel`,!0),_||b(`Examples.NonNorwegianPostalCode`,!0),s||b(`Examples.Placeholder`,!0),g||b(`Examples.SettingCountryBasedOnPath`,!0),p||b(`Examples.ValidationRequired`,!0),f||b(`Examples.WithError`,!0),u||b(`Examples.WithHelp`,!0),n||b(`VisibleWhenVisualTest`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Empty`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Label`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Label and value`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Iterate over array`}),`
`,(0,a.jsxs)(t.p,{children:[`By using the `,(0,a.jsx)(t.code,{children:`itemPath`}),` property, you can iterate over an array and use the `,(0,a.jsx)(t.code,{children:`postalCode`}),` and `,(0,a.jsx)(t.code,{children:`city`}),` properties to render the fields.`]}),`
`,(0,a.jsx)(h,{}),`
`,(0,a.jsx)(t.h3,{children:`Disabled`}),`
`,(0,a.jsx)(d,{}),`
`,(0,a.jsx)(t.h3,{children:`With help`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`Error`}),`
`,(0,a.jsx)(f,{}),`
`,(0,a.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,a.jsx)(p,{}),`
`,(0,a.jsx)(t.h3,{children:`Path Based Country`}),`
`,(0,a.jsxs)(t.p,{children:[`The `,(0,a.jsx)(t.code,{children:`country`}),` property supports a field path as value. This allows you to set the `,(0,a.jsx)(t.code,{children:`country`}),` based on the value of another field.`]}),`
`,(0,a.jsx)(g,{}),`
`,(0,a.jsx)(t.h3,{children:`Non-Norwegian Postal Codes`}),`
`,(0,a.jsxs)(t.p,{children:[`If you want to allow for a postal code that is not Norwegian, just set the `,(0,a.jsx)(t.code,{children:`country`}),` property to the desired country, and add your own custom validation.`]}),`
`,(0,a.jsxs)(t.p,{children:[`NB: As of today, setting `,(0,a.jsx)(t.code,{children:`country`}),` property to anything other than `,(0,a.jsx)(t.code,{children:`NO`}),` will only remove the default norwegian postal code pattern, mask, and placeholder, but not actually set the postal code pattern, mask, and placeholder for the value provided to the `,(0,a.jsx)(t.code,{children:`country`}),` property. This functionality will hopefully be implemented in the future.`]}),`
`,(0,a.jsx)(_,{}),`
`,(0,a.jsx)(n,{children:(0,a.jsx)(m,{})})]})}function y(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(v,{...e})}):v(e)}function b(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};