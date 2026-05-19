import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({Disabled:()=>f,Empty:()=>s,IterateArray:()=>g,Label:()=>l,LabelAndValue:()=>u,LongLabel:()=>h,NonNorwegianPostalCode:()=>v,Placeholder:()=>c,SettingCountryBasedOnPath:()=>_,ValidationRequired:()=>m,WithError:()=>p,WithHelp:()=>d}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`Empty`,children:`<Field.PostalCodeAndCity
  postalCode={{
    onChange: (value) => console.log('postalCode onChange', value),
  }}
  city={{
    onChange: (value) => console.log('city onChange', value),
  }}
/>
`}),c=()=>(0,o.jsx)(r,{stableName:`Placeholder`,children:`<Field.PostalCodeAndCity
  postalCode={{
    placeholder: '????',
    onChange: (value) => console.log('postalCode onChange', value),
  }}
  city={{
    placeholder: 'Your city',
    onChange: (value) => console.log('city onChange', value),
  }}
/>
`}),l=()=>(0,o.jsx)(r,{stableName:`Label`,children:`<Field.PostalCodeAndCity
  postalCode={{
    label: 'PNR',
    onChange: (value) => console.log('postalCode onChange', value),
  }}
  city={{
    label: 'CTY',
    onChange: (value) => console.log('city onChange', value),
  }}
/>
`}),u=()=>(0,o.jsx)(r,{"data-visual-test":`postal-code-and-city-label`,stableName:`LabelAndValue`,children:`<Field.PostalCodeAndCity
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
`}),d=()=>(0,o.jsx)(r,{stableName:`WithHelp`,children:`<Field.PostalCodeAndCity
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
`}),f=()=>(0,o.jsx)(r,{stableName:`Disabled`,children:`<Field.PostalCodeAndCity
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
`}),p=()=>(0,o.jsx)(r,{"data-visual-test":`postal-code-and-city-error`,stableName:`WithError`,children:`<Field.PostalCodeAndCity
  postalCode={{}}
  city={{}}
  error={new Error('This is what is wrong...')}
/>
`}),m=()=>(0,o.jsx)(r,{stableName:`ValidationRequired`,children:`<Field.PostalCodeAndCity
  postalCode={{
    required: true,
  }}
  city={{
    required: true,
  }}
/>
`}),h=()=>(0,o.jsx)(r,{"data-visual-test":`postal-code-and-city-long-label`,stableName:`LongLabel`,children:`<Field.PostalCodeAndCity
  postalCode={{
    label: 'With a very long label',
  }}
  city={{
    label: 'With a very long label',
  }}
/>
`}),g=()=>(0,o.jsx)(r,{stableName:`IterateArray`,children:`<Iterate.Array
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
`}),_=()=>(0,o.jsx)(r,{stableName:`SettingCountryBasedOnPath`,children:`<Form.Handler>
  <Form.Card>
    <Field.SelectCountry path="/country" defaultValue="NO" />
    <Field.PostalCodeAndCity countryCode="/country" />
  </Form.Card>
</Form.Handler>
`}),v=()=>(0,o.jsx)(r,{stableName:`NonNorwegianPostalCode`,children:`<Form.Handler
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
`});function y(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components},{VisibleWhenVisualTest:n}=t;return a||x(`Examples`,!1),f||x(`Examples.Disabled`,!0),s||x(`Examples.Empty`,!0),g||x(`Examples.IterateArray`,!0),l||x(`Examples.Label`,!0),u||x(`Examples.LabelAndValue`,!0),h||x(`Examples.LongLabel`,!0),v||x(`Examples.NonNorwegianPostalCode`,!0),c||x(`Examples.Placeholder`,!0),_||x(`Examples.SettingCountryBasedOnPath`,!0),m||x(`Examples.ValidationRequired`,!0),p||x(`Examples.WithError`,!0),d||x(`Examples.WithHelp`,!0),n||x(`VisibleWhenVisualTest`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Empty`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Label`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Label and value`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Iterate over array`}),`
`,(0,o.jsxs)(t.p,{children:[`By using the `,(0,o.jsx)(t.code,{children:`itemPath`}),` property, you can iterate over an array and use the `,(0,o.jsx)(t.code,{children:`postalCode`}),` and `,(0,o.jsx)(t.code,{children:`city`}),` properties to render the fields.`]}),`
`,(0,o.jsx)(g,{}),`
`,(0,o.jsx)(t.h3,{children:`Disabled`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`With help`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Error`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsx)(t.h3,{children:`Path Based Country`}),`
`,(0,o.jsxs)(t.p,{children:[`The `,(0,o.jsx)(t.code,{children:`country`}),` property supports a field path as value. This allows you to set the `,(0,o.jsx)(t.code,{children:`country`}),` based on the value of another field.`]}),`
`,(0,o.jsx)(_,{}),`
`,(0,o.jsx)(t.h3,{children:`Non-Norwegian Postal Codes`}),`
`,(0,o.jsxs)(t.p,{children:[`If you want to allow for a postal code that is not Norwegian, just set the `,(0,o.jsx)(t.code,{children:`country`}),` property to the desired country, and add your own custom validation.`]}),`
`,(0,o.jsxs)(t.p,{children:[`NB: As of today, setting `,(0,o.jsx)(t.code,{children:`country`}),` property to anything other than `,(0,o.jsx)(t.code,{children:`NO`}),` will only remove the default norwegian postal code pattern, mask, and placeholder, but not actually set the postal code pattern, mask, and placeholder for the value provided to the `,(0,o.jsx)(t.code,{children:`country`}),` property. This functionality will hopefully be implemented in the future.`]}),`
`,(0,o.jsx)(v,{}),`
`,(0,o.jsx)(n,{children:(0,o.jsx)(h,{})})]})}function b(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(y,{...e})}):y(e)}function x(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{b as default};